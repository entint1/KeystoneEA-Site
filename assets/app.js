/* ============================================================
   Keystone EA™ — shared behaviour
   ============================================================ */
(function () {
  'use strict';

  /* ---- Theme ---- */
  const root = document.documentElement;
  window.toggleTheme = function () {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('kea-theme', next); } catch (e) {}
  };

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    /* nav: scroll shadow */
    const nav = document.querySelector('.nav');
    if (nav) {
      const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    /* nav: mobile toggle */
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    if (toggle && links) {
      toggle.addEventListener('click', () => {
        const open = links.classList.toggle('open');
        toggle.setAttribute('aria-expanded', open);
      });
      links.querySelectorAll('a').forEach(a =>
        a.addEventListener('click', () => links.classList.remove('open')));
    }

    /* active link by filename */
    const here = (location.pathname.split('/').pop() || 'index.html');
    document.querySelectorAll('.nav-link').forEach(a => {
      const href = a.getAttribute('href');
      if (href === here || (here === '' && href === 'index.html')) a.classList.add('active');
    });

    /* reveal on scroll */
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
      reveals.forEach((el, i) => {
        el.style.transitionDelay = Math.min(i % 6, 5) * 45 + 'ms';
        io.observe(el);
      });
    } else {
      reveals.forEach(el => el.classList.add('in'));
    }

    /* footer year */
    const y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  });

  /* ---- Relationship glyph SVGs (shared) ---- */
  window.KEA_GLYPH = function (type, color) {
    const c = color || 'var(--ink-3)';
    const id = 'g' + Math.random().toString(36).slice(2, 8);
    switch (type) {
      case 'composition':
        return `<svg width="104" height="20" viewBox="0 0 104 20" aria-hidden="true">
          <defs>
            <marker id="${id}d" viewBox="0 0 16 10" refX="15" refY="5" markerWidth="13" markerHeight="9" orient="auto-start-reverse"><polygon points="8,0 16,5 8,10 0,5" fill="${c}"/></marker>
            <marker id="${id}a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><polygon points="0,1 9,5 0,9" fill="${c}"/></marker>
          </defs>
          <line x1="16" y1="10" x2="88" y2="10" stroke="${c}" stroke-width="1.6" marker-start="url(#${id}d)" marker-end="url(#${id}a)"/></svg>`;
      case 'connection':
        return `<svg width="104" height="20" viewBox="0 0 104 20" aria-hidden="true"><line x1="6" y1="10" x2="98" y2="10" stroke="${c}" stroke-width="1.6"/></svg>`;
      case 'crud':
        return `<svg width="104" height="20" viewBox="0 0 104 20" aria-hidden="true">
          <defs><marker id="${id}a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><polygon points="0,1 9,5 0,9" fill="${c}"/></marker></defs>
          <line x1="6" y1="10" x2="90" y2="10" stroke="${c}" stroke-width="1.6" stroke-dasharray="8 6" marker-end="url(#${id}a)"/></svg>`;
      case 'realization':
        return `<svg width="104" height="20" viewBox="0 0 104 20" aria-hidden="true">
          <defs><marker id="${id}a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><polygon points="0,1 9,5 0,9" fill="${c}"/></marker></defs>
          <line x1="6" y1="10" x2="90" y2="10" stroke="${c}" stroke-width="1.6" marker-end="url(#${id}a)"/></svg>`;
      case 'flow':
        return `<svg width="104" height="20" viewBox="0 0 104 20" aria-hidden="true">
          <defs><marker id="${id}f" viewBox="0 0 12 10" refX="11" refY="5" markerWidth="10" markerHeight="9" orient="auto"><polygon points="0,0 11,5 0,10" fill="var(--card)" stroke="${c}" stroke-width="1.3"/></marker></defs>
          <line x1="6" y1="10" x2="86" y2="10" stroke="${c}" stroke-width="1.6" marker-end="url(#${id}f)"/></svg>`;
      case 'supporting':
        return `<svg width="104" height="20" viewBox="0 0 104 20" aria-hidden="true">
          <defs><marker id="${id}o" viewBox="0 0 12 10" refX="10" refY="5" markerWidth="10" markerHeight="9" orient="auto"><path d="M0 1 L10 5 L0 9" fill="none" stroke="${c}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>
          <line x1="6" y1="10" x2="88" y2="10" stroke="${c}" stroke-width="1.6" marker-end="url(#${id}o)"/></svg>`;
      default: return '';
    }
  };
})();
