/* ============================================================
   Keystone EA™ — Metamodel page
   ============================================================ */
(function () {
  'use strict';
  if (!window.KEA) return;
  var K = window.KEA;
  var slug = function (s) { return s.replace(/\s+/g, '-').toLowerCase(); };
  var relColor = {};
  K.RELATIONSHIPS.forEach(function (r) { relColor[r.name] = r.color; });
  var REL_ORDER = K.RELATIONSHIPS.map(function (r) { return r.name; });

  /* ---- Object types, grouped by layer ---- */
  (function () {
    var host = document.getElementById('object-layers');
    if (!host) return;
    host.innerHTML = K.LAYERS.map(function (L) {
      var objs = K.OBJECTS.filter(function (o) { return o.layer === L.id; });
      var cards = objs.map(function (o) {
        return '<article class="obj-card" id="obj-' + slug(o.name) + '">'
          + '<div class="obj-card-head" style="background:' + o.head + '"><span class="glyph"></span><h4>' + o.name + '</h4></div>'
          + '<div class="obj-card-body"><div class="short">' + o.short + '</div><p class="long">' + o.long + '</p></div>'
          + '</article>';
      }).join('');
      return '<div class="layer-group reveal">'
        + '<div class="layer-head"><span class="layer-pill" style="--accent:' + L.accent + ';--accent-soft:' + L.soft + '">' + L.name + '</span>'
        + '<p>' + L.desc + '</p></div>'
        + '<div class="obj-cards">' + cards + '</div></div>';
    }).join('');
  })();

  /* ---- Relationship cards ---- */
  (function () {
    var host = document.getElementById('rel-cards');
    if (!host) return;
    host.innerHTML = K.RELATIONSHIPS.map(function (r) {
      return '<article class="card rel-card reveal">'
        + '<div class="rel-glyph">' + window.KEA_GLYPH(r.glyph, r.color) + '</div>'
        + '<h4>' + r.name + ' <span class="rel-code">' + r.code + '</span></h4>'
        + '<p>' + r.long + '</p></article>';
    }).join('');
  })();

  /* ---- Rules matrix ---- */
  (function () {
    var R = window.KEA_RULES;
    var table = document.getElementById('rules-matrix');
    if (!R || !table) return;
    var objs = R.objects, matrix = R.matrix;
    var objMeta = {};
    K.OBJECTS.forEach(function (o) { objMeta[o.name] = o; });

    /* header row */
    var thead = table.querySelector('thead');
    var headCells = '<th class="corner"><span>Source ↓ / Target →</span></th>';
    headCells += objs.map(function (t) {
      return '<th scope="col"><div class="rot">' + t + '</div></th>';
    }).join('');
    thead.innerHTML = '<tr>' + headCells + '</tr>';

    /* body */
    var tbody = table.querySelector('tbody');
    tbody.innerHTML = objs.map(function (s) {
      var rowMeta = objMeta[s] || {};
      var cells = objs.map(function (t) {
        var rels = (matrix[s] && matrix[s][t]) ? matrix[s][t] : [];
        var ordered = REL_ORDER.filter(function (rn) { return rels.indexOf(rn) !== -1; });
        var dots = ordered.map(function (rn) {
          return '<span class="rdot" data-rel="' + rn + '" style="background:' + relColor[rn] + '"></span>';
        }).join('');
        var cls = 'cell' + (s === t ? ' diag' : '');
        return '<td class="' + cls + '" data-src="' + s + '" data-tgt="' + t + '" data-rels="' + ordered.join(',') + '">'
          + (dots ? '<div class="dots">' + dots + '</div>' : '') + '</td>';
      }).join('');
      var sw = rowMeta.head ? '<span class="swatch" style="background:' + rowMeta.head + '"></span>' : '';
      return '<tr><th scope="row" class="rowhead"><span class="rh">' + sw + s + '</span></th>' + cells + '</tr>';
    }).join('');

    /* filter toggles */
    var togHost = document.getElementById('rel-toggles');
    if (togHost) {
      togHost.innerHTML = K.RELATIONSHIPS.map(function (r) {
        return '<button class="chip-toggle" data-rel="' + r.name + '" aria-pressed="true" '
          + 'style="--c:' + r.color + '"><span class="swatch" style="background:' + r.color + '"></span>' + r.name + '</button>';
      }).join('');
    }
    var active = {};
    REL_ORDER.forEach(function (rn) { active[rn] = true; });

    function applyFilter() {
      var allOn = REL_ORDER.every(function (rn) { return active[rn]; });
      table.querySelectorAll('td.cell').forEach(function (td) {
        var rels = (td.getAttribute('data-rels') || '').split(',').filter(Boolean);
        var anyVisible = false;
        td.querySelectorAll('.rdot').forEach(function (d) {
          var on = active[d.getAttribute('data-rel')];
          d.style.display = on ? '' : 'none';
          if (on) anyVisible = true;
        });
        td.classList.toggle('dim', !allOn && !anyVisible && rels.length > 0);
      });
      // style chips
      document.querySelectorAll('.chip-toggle[data-rel]').forEach(function (btn) {
        var rel = btn.getAttribute('data-rel');
        if (rel === '__all') { btn.setAttribute('aria-pressed', allOn); btn.style.background = allOn ? 'var(--ink)' : ''; btn.style.color = allOn ? 'var(--bg)' : ''; return; }
        var on = active[rel];
        btn.setAttribute('aria-pressed', on);
        btn.style.background = on ? btn.style.getPropertyValue('--c') : '';
        btn.style.color = on ? '#fff' : '';
      });
    }

    document.querySelectorAll('.chip-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var rel = btn.getAttribute('data-rel');
        if (rel === '__all') {
          var allOn = REL_ORDER.every(function (rn) { return active[rn]; });
          REL_ORDER.forEach(function (rn) { active[rn] = !allOn; });
        } else {
          active[rel] = !active[rel];
          if (!REL_ORDER.some(function (rn) { return active[rn]; })) active[rel] = true; // never all-off
        }
        applyFilter();
      });
    });
    applyFilter();

    /* tooltip */
    var tip = document.getElementById('cell-tip');
    function showTip(td, ev) {
      var src = td.getAttribute('data-src'), tgt = td.getAttribute('data-tgt');
      var rels = (td.getAttribute('data-rels') || '').split(',').filter(Boolean);
      var body = rels.length
        ? '<span class="rels">' + rels.map(function (rn) {
            return '<span style="display:inline-flex;align-items:center;gap:5px;margin-right:8px"><span style="width:8px;height:8px;border-radius:50%;background:' + relColor[rn] + ';display:inline-block"></span>' + rn + '</span>';
          }).join('') + '</span>'
        : '<span class="rels" style="opacity:.7">No relationship permitted</span>';
      tip.innerHTML = '<span class="pair">' + src + ' → ' + tgt + '</span>' + body;
      tip.classList.add('show');
      positionTip(ev);
    }
    function positionTip(ev) {
      var pad = 14, w = tip.offsetWidth, h = tip.offsetHeight;
      var x = ev.clientX + pad, y = ev.clientY + pad;
      if (x + w > window.innerWidth - 8) x = ev.clientX - w - pad;
      if (y + h > window.innerHeight - 8) y = ev.clientY - h - pad;
      tip.style.left = x + 'px'; tip.style.top = y + 'px';
    }
    table.addEventListener('mouseover', function (e) {
      var td = e.target.closest('td.cell'); if (td) showTip(td, e);
    });
    table.addEventListener('mousemove', function (e) {
      if (tip.classList.contains('show')) positionTip(e);
    });
    table.addEventListener('mouseleave', function () { tip.classList.remove('show'); });
  })();
})();
