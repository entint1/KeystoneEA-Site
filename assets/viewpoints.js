/* ============================================================
   Keystone EA™ — Viewpoints page
   ============================================================ */
(function () {
  'use strict';
  if (!window.KEA) return;
  var K = window.KEA;
  var objMeta = {};
  K.OBJECTS.forEach(function (o) { objMeta[o.name] = o; });

  /* ---- Viewpoint cards ---- */
  (function () {
    var host = document.getElementById('vp-cards');
    if (!host) return;
    host.innerHTML = K.VIEWPOINTS.map(function (v) {
      var tags = v.objects.map(function (name) {
        var o = objMeta[name] || {};
        var L = K.layerById[o.layer] || {};
        return '<span class="lvl-tag" style="border-color:color-mix(in srgb,' + (o.head||'#999') + ' 32%,transparent);background:color-mix(in srgb,' + (o.head||'#999') + ' 9%,var(--card));color:var(--ink-2)">'
          + '<span class="swatch" style="background:' + (o.head||'#999') + '"></span>' + name + '</span>';
      }).join('');
      var span = v.id === 'master' ? ' style="grid-column:1/-1"' : '';
      return '<article class="card vp-card reveal"' + span + ' style="--accent:' + v.accent + ';--accent-soft:' + v.soft + '">'
        + '<div class="vp-head"><div class="vp-kicker"><span class="vp-name">' + v.name + '</span>'
        + '<span class="vp-count">' + v.objects.length + ' object type' + (v.objects.length !== 1 ? 's' : '') + '</span></div>'
        + '<p class="vp-desc">' + v.desc + '</p></div>'
        + '<div class="vp-body"><div class="vp-obj-label">Object types in this view</div>'
        + '<div class="vp-tags">' + tags + '</div></div></article>';
    }).join('');
  })();

  /* ---- Coverage matrix ---- */
  (function () {
    var table = document.getElementById('vp-matrix');
    if (!table) return;
    var vps = K.VIEWPOINTS;
    var inVp = {};
    vps.forEach(function (v) { inVp[v.id] = {}; v.objects.forEach(function (n) { inVp[v.id][n] = true; }); });

    var thead = table.querySelector('thead');
    thead.innerHTML = '<tr><th class="obj-col">Object type</th>' + vps.map(function (v) {
      return '<th data-vp="' + v.id + '" style="--accent:' + v.accent + '"><span class="vph">' + v.name + '</span></th>';
    }).join('') + '</tr>';

    var tbody = table.querySelector('tbody');
    tbody.innerHTML = K.OBJECTS.map(function (o) {
      var cells = vps.map(function (v) {
        var on = inVp[v.id][o.name];
        return '<td data-vp="' + v.id + '" style="--accent:' + v.accent + '">'
          + (on ? '<span class="vpm-check">✓</span>' : '<span class="vpm-dot">·</span>') + '</td>';
      }).join('');
      return '<tr><th scope="row"><span class="rh"><span class="swatch" style="background:' + o.head + '"></span>' + o.name + '</span></th>' + cells + '</tr>';
    }).join('');

    /* column highlight on header hover */
    table.querySelectorAll('th[data-vp]').forEach(function (th) {
      var vp = th.getAttribute('data-vp');
      th.style.cursor = 'default';
      th.addEventListener('mouseenter', function () { highlight(vp, true); });
      th.addEventListener('mouseleave', function () { highlight(vp, false); });
    });
    function highlight(vp, on) {
      table.querySelectorAll('[data-vp="' + vp + '"]').forEach(function (el) {
        el.style.background = on ? 'color-mix(in srgb, ' + el.style.getPropertyValue('--accent') + ' 12%, transparent)' : '';
      });
    }
  })();
})();
