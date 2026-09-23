/**
 * Motor de i18n — módulo aislado e independiente del resto del sitio.
 * Detecta el idioma preferido del navegador (con el país/IP como respaldo),
 * aplica las traducciones definidas en /assets/i18n/*.js mediante atributos
 * data-i18n / data-i18n-html / data-i18n-alt, y agrega un selector manual
 * de idioma cuya elección se guarda en localStorage.
 */
(function () {
  "use strict";

  var SUPPORTED = ["es", "en", "pt", "de", "fr", "it"];
  var DEFAULT_LANG = "es";
  var STORAGE_KEY = "pth_lang";
  var LABELS = { es: "ES", en: "EN", pt: "PT", de: "DE", fr: "FR", it: "IT" };

  var COUNTRY_LANG_MAP = {
    BR: "pt",
    US: "en", GB: "en", CA: "en", AU: "en", NZ: "en", IE: "en", ZA: "en",
    DE: "de", AT: "de", CH: "de",
    FR: "fr", BE: "fr",
    IT: "it"
    // Los demás países hispanohablantes (MX, AR, CO, ES, etc.) usan el
    // idioma por defecto ("es") cuando no hay coincidencia en este mapa.
  };

  function getDict(lang) {
    return (window.PTH_I18N && window.PTH_I18N[lang]) || null;
  }

  function detectFromBrowser() {
    var langs = navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language || navigator.userLanguage || ""];
    for (var i = 0; i < langs.length; i++) {
      var code = (langs[i] || "").toLowerCase().split("-")[0];
      if (SUPPORTED.indexOf(code) !== -1) return code;
    }
    return null;
  }

  function detectFromCountry(countryCode) {
    if (!countryCode) return null;
    return COUNTRY_LANG_MAP[countryCode.toUpperCase()] || null;
  }

  function getSavedLang() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function saveLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* almacenamiento no disponible: la elección no persistirá */
    }
  }

  function setMeta(selector, attr, value) {
    var el = document.querySelector(selector);
    if (el && value) el.setAttribute(attr, value);
  }

  function applyTranslations(lang) {
    var dict = getDict(lang);
    if (!dict) return false;

    document.documentElement.setAttribute("lang", lang);

    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute("data-i18n");
      if (dict[key] !== undefined) nodes[i].textContent = dict[key];
    }

    var htmlNodes = document.querySelectorAll("[data-i18n-html]");
    for (var j = 0; j < htmlNodes.length; j++) {
      var hkey = htmlNodes[j].getAttribute("data-i18n-html");
      if (dict[hkey] !== undefined) htmlNodes[j].innerHTML = dict[hkey];
    }

    var altNodes = document.querySelectorAll("[data-i18n-alt]");
    for (var k = 0; k < altNodes.length; k++) {
      var akey = altNodes[k].getAttribute("data-i18n-alt");
      if (dict[akey] !== undefined) altNodes[k].setAttribute("alt", dict[akey]);
    }

    if (dict["meta.title"]) document.title = dict["meta.title"];
    setMeta('meta[name="description"]', "content", dict["meta.description"]);
    setMeta('meta[property="og:title"]', "content", dict["og.title"]);
    setMeta('meta[property="og:description"]', "content", dict["og.description"]);
    setMeta('meta[name="twitter:title"]', "content", dict["og.title"]);
    setMeta('meta[name="twitter:description"]', "content", dict["og.description"]);

    updateSwitcherUI(lang);
    return true;
  }

  function buildSwitcher() {
    if (document.getElementById("pth-lang-switcher")) return;
    var wrap = document.createElement("div");
    wrap.id = "pth-lang-switcher";
    wrap.className = "pth-lang-switcher";
    wrap.setAttribute("role", "group");
    wrap.setAttribute("aria-label", "Idioma / Language");

    SUPPORTED.forEach(function (code) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "pth-lang-btn";
      btn.setAttribute("data-lang", code);
      btn.setAttribute("aria-label", LABELS[code]);
      btn.textContent = LABELS[code];
      btn.addEventListener("click", function () {
        var chosen = this.getAttribute("data-lang");
        saveLang(chosen);
        applyTranslations(chosen);
      });
      wrap.appendChild(btn);
    });

    (document.body || document.documentElement).appendChild(wrap);
  }

  function updateSwitcherUI(lang) {
    var wrap = document.getElementById("pth-lang-switcher");
    if (!wrap) return;
    var buttons = wrap.querySelectorAll(".pth-lang-btn");
    for (var i = 0; i < buttons.length; i++) {
      var isActive = buttons[i].getAttribute("data-lang") === lang;
      buttons[i].classList.toggle("is-active", isActive);
    }
  }

  function init() {
    buildSwitcher();

    var saved = getSavedLang();
    if (saved && SUPPORTED.indexOf(saved) !== -1) {
      applyTranslations(saved);
      return;
    }

    var browserLang = detectFromBrowser();
    if (browserLang) {
      applyTranslations(browserLang);
      return;
    }

    if (window.PTH_GEO && typeof window.PTH_GEO.detect === "function") {
      window.PTH_GEO.detect()
        .then(function (geo) {
          var lang = detectFromCountry(geo && geo.countryCode) || DEFAULT_LANG;
          applyTranslations(lang);
        })
        .catch(function () {
          applyTranslations(DEFAULT_LANG);
        });
    } else {
      applyTranslations(DEFAULT_LANG);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
