// Preview-only colour and font picker. Remove this file (and its <script> tag) before going live.
(function () {
  var palettes = {
    'Navy':      { bg: '#f7f6f2', card: '#ffffff', text: '#1c1c1c', muted: '#666660', accent: '#1f4e79', soft: '#e6eef6', border: '#e2e0da' },
    'Forest':    { bg: '#f4f6f2', card: '#ffffff', text: '#1b201b', muted: '#5f665f', accent: '#2f6b45', soft: '#e3efe6', border: '#dde3dc' },
    'Burgundy':  { bg: '#f8f5f3', card: '#ffffff', text: '#1f1a1a', muted: '#6b6060', accent: '#8a2c3b', soft: '#f5e6e8', border: '#e6dedb' },
    'Slate':     { bg: '#f3f4f6', card: '#ffffff', text: '#16181d', muted: '#5c6370', accent: '#3b4a6b', soft: '#e5e8f0', border: '#dfe2e8' },
    'Teal':      { bg: '#f2f6f6', card: '#ffffff', text: '#162021', muted: '#5a6869', accent: '#0f6e74', soft: '#e0f0f0', border: '#d9e4e4' },
    'Dark':      { bg: '#141518', card: '#1d1f23', text: '#e9e9e6', muted: '#9a9ca3', accent: '#8fb4ff', soft: '#26324a', border: '#2c2f36' }
  };
  var fonts = {
    'Source Serif + Inter':    { body: '"Source Serif 4", Georgia, serif', ui: '"Inter", system-ui, sans-serif', q: 'Source+Serif+4:ital,wght@0,400;0,600;1,400&family=Inter:wght@400;600' },
    'EB Garamond + Inter':     { body: '"EB Garamond", Georgia, serif', ui: '"Inter", system-ui, sans-serif', q: 'EB+Garamond:ital,wght@0,400;0,600;1,400&family=Inter:wght@400;600' },
    'Newsreader + IBM Plex Sans': { body: '"Newsreader", Georgia, serif', ui: '"IBM Plex Sans", system-ui, sans-serif', q: 'Newsreader:ital,wght@0,400;0,600;1,400&family=IBM+Plex+Sans:wght@400;600' },
    'Inter only (sans)':       { body: '"Inter", system-ui, sans-serif', ui: '"Inter", system-ui, sans-serif', q: 'Inter:ital,wght@0,400;0,600;1,400' },
    'IBM Plex Sans + Mono':    { body: '"IBM Plex Sans", system-ui, sans-serif', ui: '"IBM Plex Mono", monospace', q: 'IBM+Plex+Sans:ital,wght@0,400;0,600;1,400&family=IBM+Plex+Mono:wght@400;600' },
    'System (no downloads)':   { body: 'Charter, Georgia, serif', ui: 'system-ui, -apple-system, "Segoe UI", sans-serif', q: '' }
  };

  var root = document.documentElement.style;
  var link = document.getElementById('font-link');
  var state = { palette: 'Navy', font: 'Source Serif + Inter' };

  function apply() {
    var p = palettes[state.palette], f = fonts[state.font];
    root.setProperty('--bg', p.bg); root.setProperty('--card', p.card); root.setProperty('--text', p.text);
    root.setProperty('--muted', p.muted); root.setProperty('--accent', p.accent); root.setProperty('--accent-soft', p.soft);
    root.setProperty('--border', p.border);
    root.setProperty('--font-body', f.body); root.setProperty('--font-ui', f.ui);
    if (link && f.q) link.href = 'https://fonts.googleapis.com/css2?family=' + f.q + '&display=swap';
    out.textContent = 'Colours: ' + state.palette + ' · Fonts: ' + state.font;
  }

  function select(label, options, key) {
    var wrap = document.createElement('label');
    wrap.textContent = label;
    var s = document.createElement('select');
    Object.keys(options).forEach(function (k) {
      var o = document.createElement('option'); o.value = k; o.textContent = k; s.appendChild(o);
    });
    s.value = state[key];
    s.addEventListener('change', function () { state[key] = s.value; apply(); });
    wrap.appendChild(s);
    return wrap;
  }

  var box = document.createElement('details');
  box.id = 'picker';
  box.open = window.innerWidth > 600;
  box.setAttribute('aria-label', 'Style picker (preview only)');
  box.innerHTML = '<summary>Try a style</summary>';
  box.appendChild(select('Colours', palettes, 'palette'));
  box.appendChild(select('Fonts', fonts, 'font'));
  var out = document.createElement('p');
  out.className = 'picker-out';
  box.appendChild(out);
  var hint = document.createElement('p');
  hint.className = 'picker-hint';
  hint.textContent = 'Tell me the line above, or any custom colours.';
  box.appendChild(hint);

  var css = document.createElement('style');
  css.textContent =
    '#picker{position:fixed;right:1rem;bottom:1rem;z-index:50;width:15rem;background:#fff;color:#1c1c1c;' +
    'border:1px solid #ccc;border-radius:8px;padding:.8rem .9rem;font:13px/1.4 system-ui,sans-serif}' +
    '#picker summary{font-weight:600;cursor:pointer}#picker label{display:block;margin-top:.5rem}#picker select{display:block;width:100%;margin-top:.2rem;font:inherit;padding:.25rem}' +
    '#picker .picker-out{margin:.7rem 0 0;font-weight:600}#picker .picker-hint{margin:.2rem 0 0;color:#666}' +
    '@media (max-width:36rem){#picker{left:.5rem;right:.5rem;width:auto;bottom:.5rem}}';
  document.head.appendChild(css);
  document.body.appendChild(box);
  apply();
})();
