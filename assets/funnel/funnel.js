/**
 * Funnel Upsell/Downsell — módulo aislado.
 *
 * Flujo:
 *   Página principal → botón "Kit Básico" → /upsell1/ (Combo Premium US$9.90)
 *     ├─ Acepta  → CHECKOUT_UPSELL_URL
 *     └─ Rechaza → /downsell1/ (Combo Premium US$4.90)
 *                    ├─ Acepta  → CHECKOUT_DOWNSELL_URL
 *                    └─ Rechaza → CHECKOUT_MAIN_URL (Kit Básico, elección original)
 *
 * Seguridad: mientras CHECKOUT_UPSELL_URL esté vacío, el botón del Kit Básico
 * de la página principal sigue yendo directo a su checkout (el funnel queda
 * inactivo). Si CHECKOUT_DOWNSELL_URL está vacío, el rechazo del upsell va
 * directo al checkout del Kit Básico (se salta el downsell).
 *
 * Uso en el HTML:
 *   [data-funnel-entry]            → botón de la página principal que inicia el funnel
 *   [data-funnel-link="accept"]    → CTA de aceptar la oferta de esta página
 *   [data-funnel-link="decline"]   → enlace de rechazo de esta página
 *   <html data-funnel-page="upsell|downsell">
 */
(function () {
  "use strict";

  // ============================================================
  // CONFIGURACIÓN — URLs de checkout de cada etapa
  // ============================================================

  // Kit Básico — US$1.99 (oferta original elegida en la página principal)
  var CHECKOUT_MAIN_URL = "https://pay.hotmart.com/U107656847J?off=rm1or1g1";

  // Combo Premium — US$9.90 (upsell)
  var CHECKOUT_UPSELL_URL = "https://pay.hotmart.com/B107672021A?off=e6v5dm5s&checkoutMode=10";

  // Combo Premium — US$4.90 (downsell)
  var CHECKOUT_DOWNSELL_URL = "https://pay.hotmart.com/B107672021A?off=io5svurf&checkoutMode=10";

  var UPSELL_PATH = "/upsell1/";
  var DOWNSELL_PATH = "/downsell1/";

  // Parámetros de rastreo que se conservan entre etapas y hacia el checkout.
  var TRACK_KEYS = [
    "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "utm_id",
    "gclid", "gbraid", "wbraid", "fbclid", "ttclid", "src", "sck", "xcod"
  ];

  // ============================================================

  function trackingParams() {
    var out = [];
    var params;
    try {
      params = new URLSearchParams(window.location.search);
    } catch (e) {
      return out;
    }
    params.forEach(function (value, key) {
      if (TRACK_KEYS.indexOf(key) !== -1 || key.indexOf("utm_") === 0) out.push([key, value]);
    });
    return out;
  }

  // Agrega los parámetros de rastreo actuales sin pisar los que ya tiene la URL (ej. ?off= de Hotmart).
  function withParams(url) {
    if (!url) return url;
    try {
      var target = new URL(url, window.location.origin);
      trackingParams().forEach(function (pair) {
        if (!target.searchParams.has(pair[0])) target.searchParams.append(pair[0], pair[1]);
      });
      return target.origin === window.location.origin
        ? target.pathname + target.search + target.hash
        : target.toString();
    } catch (e) {
      return url;
    }
  }

  // Eventos: solo usa herramientas que ya estén cargadas en la página (no instala nada).
  // Cada evento se envía una sola vez por carga de página (Utmify re-dispara el clic en los enlaces).
  var sent = {};
  function track(name, data) {
    if (sent[name]) return;
    sent[name] = true;
    var payload = data || {};
    try { if (typeof window.fbq === "function") window.fbq("trackCustom", name, payload); } catch (e) { /* noop */ }
    try { if (typeof window.gtag === "function") window.gtag("event", name, payload); } catch (e) { /* noop */ }
    try { if (Array.isArray(window.dataLayer)) window.dataLayer.push(Object.assign({ event: name }, payload)); } catch (e) { /* noop */ }
    try { document.dispatchEvent(new CustomEvent("funnel:event", { detail: { name: name, data: payload } })); } catch (e) { /* noop */ }
  }

  function routes(page) {
    if (page === "upsell") {
      return {
        accept: CHECKOUT_UPSELL_URL,
        decline: CHECKOUT_DOWNSELL_URL ? DOWNSELL_PATH : CHECKOUT_MAIN_URL
      };
    }
    if (page === "downsell") {
      return { accept: CHECKOUT_DOWNSELL_URL, decline: CHECKOUT_MAIN_URL };
    }
    return null;
  }

  function setupEntry() {
    var entries = document.querySelectorAll("[data-funnel-entry]");
    if (!entries.length || !CHECKOUT_UPSELL_URL) return; // funnel inactivo: se mantiene el checkout original
    for (var i = 0; i < entries.length; i++) {
      entries[i].setAttribute("href", withParams(UPSELL_PATH));
      entries[i].removeAttribute("target");
      entries[i].removeAttribute("rel");
    }
  }

  function setupFunnelPage(page) {
    var r = routes(page);
    if (!r) return;

    var accepts = document.querySelectorAll('[data-funnel-link="accept"]');
    for (var i = 0; i < accepts.length; i++) {
      var a = accepts[i];
      if (r.accept) {
        a.setAttribute("href", withParams(r.accept));
        a.addEventListener("click", function () { track("accept_" + page); });
      } else {
        // Sin URL configurada: nunca se inventa un checkout. Botón deshabilitado y visible como pendiente.
        // (Utmify agrega href a todos los enlaces, por eso también se bloquea el clic/teclado.)
        a.removeAttribute("href");
        a.setAttribute("aria-disabled", "true");
        a.setAttribute("tabindex", "-1");
        a.classList.add("is-pending");
        a.addEventListener("click", function (ev) { ev.preventDefault(); });
        if (window.console) console.warn("[funnel] Falta configurar el checkout de: " + page);
      }
    }

    var declines = document.querySelectorAll('[data-funnel-link="decline"]');
    for (var j = 0; j < declines.length; j++) {
      declines[j].setAttribute("href", withParams(r.decline));
      declines[j].addEventListener("click", function () { track("decline_" + page); });
    }

    track("view_" + page);
  }

  // Acordeón accesible (FAQ): botones con aria-expanded / aria-controls.
  function setupAccordion() {
    var triggers = document.querySelectorAll(".fn-faq-trigger");
    for (var i = 0; i < triggers.length; i++) {
      triggers[i].addEventListener("click", function () {
        var expanded = this.getAttribute("aria-expanded") === "true";
        var panel = document.getElementById(this.getAttribute("aria-controls"));
        this.setAttribute("aria-expanded", expanded ? "false" : "true");
        if (panel) panel.hidden = expanded;
      });
    }
  }

  function init() {
    var page = document.documentElement.getAttribute("data-funnel-page");
    setupEntry();
    if (page) {
      setupFunnelPage(page);
      setupAccordion();
    }
  }

  window.PTH_FUNNEL = { track: track, withParams: withParams };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
