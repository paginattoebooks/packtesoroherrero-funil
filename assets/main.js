document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', function () {

  // Reveal on scroll
  var revealEls = document.querySelectorAll('.reveal, .reveal-scale');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  // Countdown to local midnight (honest daily-reset promo window)
  var countdownEl = document.getElementById('countdown-time');
  if (countdownEl) {
    var tick = function () {
      var now = new Date();
      var midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
      var diff = Math.max(0, midnight - now);
      var h = Math.floor(diff / 3600000);
      var m = Math.floor((diff % 3600000) / 60000);
      var s = Math.floor((diff % 60000) / 1000);
      var pad = function (n) { return String(n).padStart(2, '0'); };
      countdownEl.textContent = pad(h) + ':' + pad(m) + ':' + pad(s);
    };
    tick();
    setInterval(tick, 1000);
  }

  // Sticky mobile CTA — show after hero
  var stickyCta = document.getElementById('sticky-cta');
  var hero = document.getElementById('hero');
  if (stickyCta && hero) {
    var toggleSticky = function () {
      var heroBottom = hero.getBoundingClientRect().bottom;
      if (heroBottom < 0) {
        stickyCta.classList.add('show');
      } else {
        stickyCta.classList.remove('show');
      }
    };
    window.addEventListener('scroll', toggleSticky, { passive: true });
    toggleSticky();
  }

});
