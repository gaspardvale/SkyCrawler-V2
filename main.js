/* SkyCrawler V2 — shared behaviour: nav, footer, language, reveal */
(function () {
  'use strict';

  /* ─── FOOTER INJECTION ─────────────────────────────────────────── */
  var footer = document.querySelector('footer');
  if (footer) {
    footer.className = 'footer';
    footer.innerHTML =
      '<div class="footer-inner">' +
        '<div class="footer-grid">' +
          '<div class="footer-brand-col">' +
            '<div class="footer-brand-name">SkyCrawler</div>' +
            '<div class="footer-tagline"><span class="t" data-nl="Autonome gevelreiniging voor de hoogste gebouwen ter wereld." data-en="Autonomous façade cleaning for the world’s tallest buildings.">Autonome gevelreiniging voor de hoogste gebouwen ter wereld.</span></div>' +
          '</div>' +
          '<div>' +
            '<div class="footer-col-hd"><span class="t" data-nl="Verkennen" data-en="Explore">Verkennen</span></div>' +
            '<ul class="footer-links">' +
              '<li><a href="index.html">Home</a></li>' +
              '<li><a href="techniek.html"><span class="t" data-nl="Techniek" data-en="Technology">Techniek</span></a></li>' +
              '<li><a href="tarieven.html"><span class="t" data-nl="Tarieven" data-en="Pricing">Tarieven</span></a></li>' +
            '</ul>' +
          '</div>' +
          '<div>' +
            '<div class="footer-col-hd"><span class="t" data-nl="Bedrijf" data-en="Company">Bedrijf</span></div>' +
            '<ul class="footer-links">' +
              '<li><a href="businessplan.html"><span class="t" data-nl="Over Ons" data-en="About Us">Over Ons</span></a></li>' +
              '<li><a href="contact.html">Contact</a></li>' +
            '</ul>' +
          '</div>' +
          '<div>' +
            '<div class="footer-col-hd">Social</div>' +
            '<ul class="footer-links">' +
              '<li><a href="https://www.linkedin.com/" target="_blank" rel="noopener">LinkedIn</a></li>' +
              '<li><a href="https://x.com/" target="_blank" rel="noopener">X (Twitter)</a></li>' +
              '<li><a href="https://www.instagram.com/" target="_blank" rel="noopener">Instagram</a></li>' +
              '<li><a href="mailto:contact@skycrawler.com">Email</a></li>' +
            '</ul>' +
          '</div>' +
        '</div>' +
        '<a class="footer-vale" href="https://vale.codes" target="_blank" rel="noopener">' +
          '<span class="horse" role="img" aria-label="VALE logo"></span>' +
          '<span><span class="t" data-nl="Mogelijk gemaakt door" data-en="Powered by">Mogelijk gemaakt door</span> <strong>VALE</strong></span>' +
        '</a>' +
        '<div class="footer-btm">' +
          '<span class="t" data-nl="© 2026 SkyCrawler — Alle rechten voorbehouden." data-en="© 2026 SkyCrawler — All rights reserved.">© 2026 SkyCrawler — Alle rechten voorbehouden.</span>' +
          '<span class="t" data-nl="Gebouwd in Gent, België." data-en="Built in Ghent, Belgium.">Gebouwd in Gent, België.</span>' +
        '</div>' +
      '</div>';

    /* ── City skyline above the footer — homepage only ── */
    if (document.querySelector('.hero-full')) {
      footer.classList.add('footer-city');
      var NS = 'http://www.w3.org/2000/svg';
      var VW = 1440, VH = 370, GY = 358, BLDG_C = '#1a2f52';
      var svg = document.createElementNS(NS, 'svg');
      svg.setAttribute('viewBox', '0 0 ' + VW + ' ' + VH);
      svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
      svg.setAttribute('aria-hidden', 'true');
      svg.setAttribute('class', 'city-svg');

      function el(tag, attrs) {
        var e = document.createElementNS(NS, tag);
        for (var k in attrs) e.setAttribute(k, attrs[k]);
        svg.appendChild(e);
        return e;
      }

      /* Two-layer skyline: light back row peeking above a navy front row —
         minimal depth on white. [x, width, topY]; lower topY = taller. */
      function drawBldg(x, w, top, color) {
        var bH = GY - top;
        var s = Math.max(5, Math.floor(w * 0.13));
        var h1 = Math.max(12, Math.floor(bH * 0.09));
        var h2 = Math.max(8, Math.floor(bH * 0.06));
        var pts = [
          x + ',' + GY, (x + w) + ',' + GY,
          (x + w) + ',' + (top + h1 + h2), (x + w - s) + ',' + (top + h1 + h2),
          (x + w - s) + ',' + (top + h2), (x + w - 2 * s) + ',' + (top + h2),
          (x + w - 2 * s) + ',' + top, (x + 2 * s) + ',' + top,
          (x + 2 * s) + ',' + (top + h2), (x + s) + ',' + (top + h2),
          (x + s) + ',' + (top + h1 + h2), x + ',' + (top + h1 + h2)
        ].join(' ');
        el('polygon', { points: pts, fill: color });
      }

      var BACK = [
        [40, 76, 138], [166, 92, 82], [318, 64, 168], [452, 84, 112],
        [618, 104, 62], [800, 72, 150], [922, 94, 98], [1084, 72, 160],
        [1204, 102, 88], [1356, 82, 130]
      ];
      var FRONT = [
        [96, 84, 196], [232, 62, 248], [372, 96, 142], [524, 72, 216],
        [682, 88, 158], [844, 112, 118], [1014, 78, 228], [1148, 92, 172],
        [1286, 66, 254], [1382, 58, 206]
      ];

      BACK.forEach(function (b) { drawBldg(b[0], b[1], b[2], '#c8d6ea'); });
      FRONT.forEach(function (b) { drawBldg(b[0], b[1], b[2], BLDG_C); });

      footer.insertBefore(svg, footer.firstChild);
    }
  }

  /* ─── NAV: scrolled state ──────────────────────────────────────── */
  var nav = document.querySelector('.nav');
  if (nav) {
    var heroFull = document.querySelector('.hero-full');
    var onScroll = function () {
      var overHero = heroFull && heroFull.getBoundingClientRect().bottom > 52;
      nav.classList.toggle('nav-clear', !!overHero);
      nav.classList.toggle('scrolled', !overHero && window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ─── MOBILE MENU ──────────────────────────────────────────────── */
  var burger = document.querySelector('.hamburger');
  var menu = document.querySelector('.mobile-menu');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      burger.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('open');
        burger.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ─── ACTIVE NAV LINK ──────────────────────────────────────────── */
  var page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(function (a) {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  /* ─── LANGUAGE TOGGLE ──────────────────────────────────────────── */
  function setLang(lang) {
    try { localStorage.setItem('sc-lang', lang); } catch (e) {}
    document.documentElement.lang = lang;
    document.querySelectorAll('.lang-btn').forEach(function (b) {
      b.classList.toggle('active', b.dataset.lang === lang);
    });
    document.querySelectorAll('[data-nl]').forEach(function (el) {
      el.textContent = lang === 'nl' ? el.dataset.nl : (el.dataset.en || el.dataset.nl);
    });
    /* placeholders */
    document.querySelectorAll('[data-nl-placeholder]').forEach(function (el) {
      el.placeholder = lang === 'nl' ? el.dataset.nlPlaceholder : (el.dataset.enPlaceholder || el.dataset.nlPlaceholder);
    });
    document.dispatchEvent(new CustomEvent('sc:lang', { detail: lang }));
  }
  var saved = 'nl';
  try { saved = localStorage.getItem('sc-lang') || 'nl'; } catch (e) {}
  setLang(saved);
  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () { setLang(btn.dataset.lang); });
  });

  /* ─── REVEAL ON SCROLL ─────────────────────────────────────────── */
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('vis'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (el) { obs.observe(el); });

  /* ─── BAR CHART ANIMATION ──────────────────────────────────────── */
  var chartObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.querySelectorAll('.bar').forEach(function (bar, i) {
        setTimeout(function () { bar.classList.add('animated'); }, i * 250);
      });
      chartObs.unobserve(e.target);
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('[data-chart]').forEach(function (el) { chartObs.observe(el); });

  /* ─── FAQ ACCORDION ────────────────────────────────────────────── */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-question');
    if (!q) return;
    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (o) {
        o.classList.remove('open');
        o.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) { item.classList.add('open'); q.setAttribute('aria-expanded', 'true'); }
    });
  });

})();
