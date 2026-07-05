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

      /* [x, width, topY] — lower topY = taller building */
      var BLDGS = [
        [0, 42, 92], [50, 60, 34], [118, 38, 115], [164, 54, 52], [226, 32, 140],
        [266, 66, 25], [340, 44, 88], [392, 30, 158], [430, 56, 58], [494, 36, 108],
        [538, 74, 16], [620, 42, 94], [670, 50, 62], [728, 28, 148], [764, 60, 44],
        [832, 40, 90], [880, 68, 26], [956, 34, 120], [998, 54, 60], [1060, 42, 95],
        [1110, 64, 30], [1182, 36, 125], [1226, 56, 52], [1290, 38, 88], [1336, 62, 40],
        [1406, 34, 82]
      ];

      BLDGS.forEach(function (b, i) {
        var x = b[0], w = b[1], top = b[2];
        var bH = GY - top;
        var s = Math.max(4, Math.floor(w * 0.13));
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
        el('polygon', { points: pts, fill: BLDG_C });

        var h = GY - top - h1 - h2;
        if (h > 0) el('rect', { x: x + w - 2, y: top + h1 + h2, width: 2, height: h, fill: '#0f1f38', opacity: 0.45 });

        var cx = x + w * 0.5;
        if (top < 45) {
          var antH = 30 + (i % 4) * 10;
          el('rect', { x: cx - 1.5, y: top - antH, width: 3, height: antH, fill: BLDG_C });
          el('rect', { x: cx - 0.8, y: top - antH - 10, width: 1.6, height: 10, fill: '#243d6a' });
          el('rect', { x: cx - 7, y: top - antH + 5, width: 14, height: 1.5, fill: '#243d6a' });
        } else if (top < 70) {
          var spH = 22 + (i % 3) * 8;
          el('rect', { x: cx - 2, y: top - spH, width: 4, height: spH, fill: BLDG_C });
        }
      });

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
