/**
 * Conversión automática de moneda según el país del visitante.
 * Módulo aislado: no depende de main.js ni de otras funciones del sitio.
 * Usa la detección de país compartida en /assets/geo.js (window.PTH_GEO).
 * Si algo falla (geolocalización, cotización, formato), se conserva el precio
 * por defecto en USD que ya está escrito en el HTML.
 */
(function () {
  "use strict";

  var RATES_CACHE_KEY = "pth_rates_v1";
  var RATES_TTL = 6 * 60 * 60 * 1000; // 6h
  var FETCH_TIMEOUT = 4000;

  function fetchWithTimeout(url, timeout) {
    if (typeof AbortController === "undefined") {
      return fetch(url);
    }
    var controller = new AbortController();
    var timer = setTimeout(function () {
      controller.abort();
    }, timeout);
    return fetch(url, { signal: controller.signal }).then(
      function (res) {
        clearTimeout(timer);
        return res;
      },
      function (err) {
        clearTimeout(timer);
        throw err;
      }
    );
  }

  function readCache(key, ttl) {
    try {
      var raw = localStorage.getItem(key);
      if (!raw) return null;
      var data = JSON.parse(raw);
      if (!data || !data.ts || Date.now() - data.ts > ttl) return null;
      return data.value;
    } catch (e) {
      return null;
    }
  }

  function writeCache(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify({ value: value, ts: Date.now() }));
    } catch (e) {
      /* almacenamiento no disponible: continuar sin caché */
    }
  }

  function detectCountry() {
    if (!window.PTH_GEO || typeof window.PTH_GEO.detect !== "function") {
      return Promise.reject(new Error("PTH_GEO no disponible"));
    }
    return window.PTH_GEO.detect();
  }

  // Devuelve un objeto de tasas { USD: 1, BRL: 5.4, ... } o rechaza la promesa.
  function getRates() {
    var cached = readCache(RATES_CACHE_KEY, RATES_TTL);
    if (cached) return Promise.resolve(cached);

    function fromOpenErApi() {
      return fetchWithTimeout("https://open.er-api.com/v6/latest/USD", FETCH_TIMEOUT)
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (!data || data.result !== "success" || !data.rates) throw new Error("open.er-api: sin tasas");
          return data.rates;
        });
    }

    function fromExchangerateApi() {
      return fetchWithTimeout("https://api.exchangerate-api.com/v4/latest/USD", FETCH_TIMEOUT)
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (!data || !data.rates) throw new Error("exchangerate-api: sin tasas");
          return data.rates;
        });
    }

    return fromOpenErApi()
      .catch(fromExchangerateApi)
      .then(function (rates) {
        writeCache(RATES_CACHE_KEY, rates);
        return rates;
      });
  }

  function resolveLocale(countryCode) {
    if (countryCode) {
      var candidate = "und-" + countryCode;
      try {
        new Intl.NumberFormat(candidate);
        return candidate;
      } catch (e) {
        /* código de país no válido para Intl: seguir con el idioma del navegador */
      }
    }
    return navigator.language || "en-US";
  }

  // Separa el valor formateado en símbolo/prefijo ("cur") y número ("num")
  // para no romper el maquetado existente (spans .cur y .num).
  function splitFormat(amount, currency, locale) {
    var formatter = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
      currencyDisplay: "symbol"
    });
    var parts = formatter.formatToParts(amount);
    var symbol = "";
    var number = "";
    parts.forEach(function (part) {
      if (part.type === "currency") {
        symbol += part.value;
      } else if (part.type !== "literal") {
        number += part.value;
      }
    });
    return { symbol: symbol.trim(), number: number.trim() };
  }

  function fullFormat(amount, currency, locale) {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
      currencyDisplay: "symbol"
    }).format(amount);
  }

  // Recargo cambiario de la plataforma de pago (8,76%): se aplica una sola vez,
  // DESPUÉS de convertir a la moneda local, para acercar el precio mostrado al del checkout.
  var CHECKOUT_FX_MARKUP = 1.0876;

  // USD base → moneda local (+ recargo), redondeado a los decimales de esa moneda.
  function localAmount(usd, rate, currency, locale) {
    var converted = usd * rate;
    var final = converted * CHECKOUT_FX_MARKUP;
    var digits = new Intl.NumberFormat(locale, { style: "currency", currency: currency })
      .resolvedOptions().maximumFractionDigits;
    var factor = Math.pow(10, digits);
    return Math.round((final + Number.EPSILON) * factor) / factor;
  }

  // Cada precio a convertir vive en un elemento con [data-usd] (y opcionalmente
  // [data-old-usd] para el precio tachado). Soporta múltiples planes en la página.
  function applyPriceElement(el, currency, locale, rate) {
    var baseUsd = parseFloat(el.getAttribute("data-usd"));
    if (!baseUsd) return;

    var target = el.classList.contains("price-new") ? el : el.querySelector(".price-new");
    if (target) {
      var split = splitFormat(localAmount(baseUsd, rate, currency, locale), currency, locale);
      var curEl = target.querySelector(".cur");
      var numEl = target.querySelector(".num");
      if (curEl) curEl.textContent = split.symbol;
      if (numEl) numEl.textContent = split.number;
    }

    var oldUsdAttr = el.getAttribute("data-old-usd");
    if (oldUsdAttr) {
      var oldEl = el.querySelector(".price-old");
      if (oldEl) oldEl.textContent = fullFormat(localAmount(parseFloat(oldUsdAttr), rate, currency, locale), currency, locale);
    }
  }

  function applyPrices(currency, locale, rate) {
    var nodes = document.querySelectorAll("[data-usd]");
    for (var i = 0; i < nodes.length; i++) {
      applyPriceElement(nodes[i], currency, locale, rate);
    }
  }

  function init() {
    detectCountry()
      .then(function (geo) {
        if (geo.currency === "USD") return; // ya está en USD por defecto
        return getRates().then(function (rates) {
          var rate = rates[geo.currency];
          if (!rate || typeof rate !== "number") throw new Error("sin tasa para " + geo.currency);
          var locale = resolveLocale(geo.countryCode);
          applyPrices(geo.currency, locale, rate);
        });
      })
      .catch(function () {
        // Cualquier fallo (red, país, cotización o formato): se mantienen los precios en USD del HTML.
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
