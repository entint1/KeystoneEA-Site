/* ============================================================
   Keystone EA™ — Methodology page
   ============================================================ */
(function () {
  'use strict';
  if (!window.KEA) return;
  var K = window.KEA, PH = K.PHASES;

  /* ---- stats ---- */
  (function () {
    var host = document.getElementById('method-stats');
    if (!host) return;
    var c = K.methodologyCounts();
    var stats = [
      { n: c.phases, l: 'Phases' },
      { n: c.capabilities, l: 'Capabilities' },
      { n: c.tracks, l: 'Parallel tracks' },
      { n: c.ai, l: 'AI-enabled workflows' },
    ];
    host.innerHTML = stats.map(function (s) {
      return '<div class="card ms"><div class="ms-n">' + s.n + '</div><div class="ms-l">' + s.l + '</div></div>';
    }).join('');
  })();

  /* ---- phase rail ---- */
  var rail = document.getElementById('phase-rail');
  var panel = document.getElementById('phase-panel');
  if (!rail || !panel) return;

  rail.innerHTML = PH.map(function (p, i) {
    var total = countItems(p);
    return '<button class="phase-btn' + (i === 0 ? ' active' : '') + '" data-i="' + i + '" style="--pc:' + p.pc + '" aria-pressed="' + (i === 0) + '">'
      + '<div class="pb-top"><span class="pb-num">' + p.n + '</span><span class="pb-name">' + p.name + '</span></div>'
      + '<div class="pb-count">' + total + ' capabilities</div></button>';
  }).join('');

  function countItems(p) {
    return p.content.concat(p.arch).reduce(function (n, g) { return n + g.items.length; }, 0);
  }

  function trackHTML(groups, pc) {
    return groups.map(function (g) {
      var items = g.items.map(function (it) {
        return '<div class="subtask">'
          + '<div class="st-row" role="button" tabindex="0" aria-expanded="false">'
          + '<span class="st-dot" style="background:' + (it.ai ? 'var(--l-data)' : pc) + '"></span>'
          + '<span class="st-name">' + it.name + (it.ai ? ' <span class="ai-badge">AI</span>' : '') + '</span>'
          + '<svg class="chev" width="15" height="15" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 5l4 4 4-4"/></svg>'
          + '</div><div class="st-desc"><div class="st-desc-inner">' + it.desc + '</div></div></div>';
      }).join('');
      return '<div class="task-group"><div class="tg-name">' + g.task + '</div>' + items + '</div>';
    }).join('');
  }

  function renderPanel(i) {
    var p = PH[i];
    var ct = p.content.reduce(function (n, g) { return n + g.items.length; }, 0);
    var at = p.arch.reduce(function (n, g) { return n + g.items.length; }, 0);
    panel.innerHTML =
      '<div class="phase-panel" style="--pc:' + p.pc + ';--pc-soft:' + p.soft + '">'
      + '<div class="pp-head"><div class="pp-num">' + p.n + '</div>'
      + '<div><div class="pp-name">' + p.name + '</div><div class="pp-tag">' + p.tag + '</div>'
      + '<div class="pp-meta">' + ct + ' content · ' + at + ' architecture readiness</div></div></div>'
      + '<div class="tracks">'
      + '<div class="track"><span class="track-label" style="--pc:' + p.pc + '"><span class="tl-dot" style="background:' + p.pc + '"></span>Content</span>' + trackHTML(p.content, p.pc) + '</div>'
      + '<div class="track"><span class="track-label" style="--pc:' + p.pc + '"><span class="tl-dot" style="border:1.5px solid ' + p.pc + '"></span>Architecture Readiness</span>' + trackHTML(p.arch, p.pc) + '</div>'
      + '</div></div>';
    attachToggles();
  }

  function attachToggles() {
    panel.querySelectorAll('.st-row').forEach(function (row) {
      var fn = function () {
        var item = row.parentElement;
        var open = item.classList.toggle('open');
        row.setAttribute('aria-expanded', open);
        var desc = item.querySelector('.st-desc');
        desc.style.maxHeight = open ? desc.firstElementChild.scrollHeight + 28 + 'px' : '0px';
      };
      row.addEventListener('click', fn);
      row.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fn(); }
      });
    });
  }

  function activate(i) {
    rail.querySelectorAll('.phase-btn').forEach(function (b, j) {
      var on = j === i;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', on);
    });
    renderPanel(i);
  }

  rail.querySelectorAll('.phase-btn').forEach(function (b) {
    b.addEventListener('click', function () { activate(+b.dataset.i); });
  });

  document.querySelectorAll('[data-jump]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      activate(+a.dataset.jump);
      rail.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  renderPanel(0);
})();
