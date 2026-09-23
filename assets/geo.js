/**
 * Geolocalización compartida (IP aproximada) — módulo aislado.
 * Usado tanto por i18n.js (idioma de reserva) como por currency.js (moneda).
 * Expone window.PTH_GEO.detect() -> Promise<{ currency, countryCode }>
 */
(function () {
  "use strict";

  var CACHE_KEY = "pth_geo_v1";
  var CACHE_TTL = 12 * 60 * 60 * 1000; // 12h
  var FETCH_TIMEOUT = 4000;
  var pendingPromise = null;

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

  function readCache() {
    try {
      var raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      var data = JSON.parse(raw);
      if (!data || !data.ts || Date.now() - data.ts > CACHE_TTL) return null;
      return data.value;
    } catch (e) {
      return null;
    }
  }

  function writeCache(value) {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ value: value, ts: Date.now() }));
    } catch (e) {
      /* almacenamiento no disponible: continuar sin caché */
    }
  }

  function fromIpwhoIs() {
    return fetchWithTimeout("https://ipwho.is/", FETCH_TIMEOUT)
      .then(function (res) { return res.json(); })
      .then(function (data) {
        var code = data && data.currency && data.currency.code;
        if (!data || data.success === false || !code) throw new Error("ipwho.is: sin datos");
        return { currency: code, countryCode: data.country_code || null };
      });
  }

  function fromIpapiCo() {
    return fetchWithTimeout("https://ipapi.co/json/", FETCH_TIMEOUT)
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (!data || data.error || !data.currency) throw new Error("ipapi.co: sin datos");
        return { currency: data.currency, countryCode: data.country_code || data.country || null };
      });
  }

  function detect() {
    var cached = readCache();
    if (cached) return Promise.resolve(cached);
    if (pendingPromise) return pendingPromise;

    pendingPromise = fromIpwhoIs()
      .catch(fromIpapiCo)
      .then(function (info) {
        writeCache(info);
        pendingPromise = null;
        return info;
      })
      .catch(function (err) {
        pendingPromise = null;
        throw err;
      });

    return pendingPromise;
  }

  window.PTH_GEO = { detect: detect };
})();
