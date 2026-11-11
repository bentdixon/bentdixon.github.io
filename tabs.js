// Show one section at a time, chosen by the URL hash (#about, #projects ...).
// Without JavaScript every section shows, one after another.
(function () {
  document.documentElement.classList.add('js');
  var panels = Array.prototype.slice.call(document.querySelectorAll('.panel'));
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tabs a'));
  var ids = panels.map(function (p) { return p.id; });

  function show() {
    var id = location.hash.slice(1);
    if (ids.indexOf(id) === -1) id = ids[0];
    panels.forEach(function (p) { p.hidden = p.id !== id; });
    tabs.forEach(function (t) {
      var on = t.getAttribute('href') === '#' + id;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      if (on) t.setAttribute('aria-current', 'page'); else t.removeAttribute('aria-current');
    });
  }

  // Switch tabs without the browser jumping down to the section.
  tabs.forEach(function (t) {
    t.addEventListener('click', function (e) {
      e.preventDefault();
      var href = t.getAttribute('href');
      if (location.hash !== href) history.pushState(null, '', href);
      show();
      window.scrollTo(0, 0);
    });
  });
  window.addEventListener('hashchange', show);
  window.addEventListener('popstate', show);
  show();
  // Opening a link like /#projects starts at the top, with the header in view.
  window.addEventListener('load', function () { setTimeout(function () { window.scrollTo(0, 0); }, 0); });
})();
