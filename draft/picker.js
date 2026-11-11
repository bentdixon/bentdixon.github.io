// Preview-only colour and font picker. Remove this file (and its <script> tag) before going live.
(function () {
  var palettes = {
    'Plum':     { bg: '#ffffff', card: '#f2f2f2', text: '#2b2b2b', muted: '#6e6e6e', accent: '#3a1e3f', soft: '#f2f2f2', border: '#dcdcdc' },
    'Navy':     { bg: '#ffffff', card: '#f1f3f6', text: '#262a30', muted: '#6a707a', accent: '#1f3a68', soft: '#f1f3f6', border: '#d9dde3' },
    'Forest':   { bg: '#ffffff', card: '#f1f4f1', text: '#262b27', muted: '#6a716b', accent: '#2f5d3f', soft: '#f1f4f1', border: '#d8ded9' },
    'Burgundy': { bg: '#ffffff', card: '#f5f1f1', text: '#2d2626', muted: '#736a6a', accent: '#7a2433', soft: '#f5f1f1', border: '#e0d8d8' },
    'Charcoal': { bg: '#ffffff', card: '#f2f2f2', text: '#222222', muted: '#6b6b6b', accent: '#222222', soft: '#f2f2f2', border: '#d6d6d6' },
    'Warm paper': { bg: '#fbf9f4', card: '#f0ece2', text: '#2b2924', muted: '#716c61', accent: '#5b4636', soft: '#f0ece2', border: '#ddd6c8' },
    'Dark':     { bg: '#16171a', card: '#24262b', text: '#e6e6e3', muted: '#9a9ca3', accent: '#c9a7d6', soft: '#24262b', border: '#33363d' }
  };
  var fonts = {
    'Source Serif Pro':  { body: '"Source Serif Pro", serif', ui: '"Source Serif Pro", serif', q: 'Source+Serif+Pro:ital,wght@0,300;0,400;0,600;1,400' },
    'EB Garamond':       { body: '"EB Garamond", Georgia, serif', ui: '"EB Garamond", Georgia, serif', q: 'EB+Garamond:ital,wght@0,400..600;1,400' },
    'Newsreader':        { body: '"Newsreader", Georgia, serif', ui: '"Newsreader", Georgia, serif', q: 'Newsreader:ital,opsz,wght@0,6..72,300..600;1,6..72,400' },
    'Crimson Pro':       { body: '"Crimson Pro", Georgia, serif', ui: '"Crimson Pro", Georgia, serif', q: 'Crimson+Pro:ital,wght@0,300..600;1,400' },
    'Inter (sans)':      { body: '"Inter", system-ui, sans-serif', ui: '"Inter", system-ui, sans-serif', q: 'Inter:ital,wght@0,300..600;1,400' },
    'IBM Plex Sans':     { body: '"IBM Plex Sans", system-ui, sans-serif', ui: '"IBM Plex Sans", system-ui, sans-serif', q: 'IBM+Plex+Sans:ital,wght@0,300;0,400;0,600;1,400' },
    'System (no downloads)': { body: 'Charter, Georgia, serif', ui: 'Charter, Georgia, serif', q: '' }
  };

  var root = document.documentElement.style;
  var link = document.getElementById('font-link');
  var state = { palette: 'Burgundy', font: 'Crimson Pro' };

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
