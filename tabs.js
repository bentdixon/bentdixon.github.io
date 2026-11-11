// Show one tab at a time, chosen by the URL hash (#home, #research, #projects).
// Without JavaScript every section shows, one after another.
(function () {
  document.documentElement.classList.add('js');
  var panels = Array.prototype.slice.call(document.querySelectorAll('.panel'));
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tabs a:not(.external)'));
  var ids = panels.map(function (p) { return p.id; });

  function show() {
    var id = location.hash.slice(1);
    if (ids.indexOf(id) === -1) id = ids[0];
    panels.forEach(function (p) { p.hidden = p.id !== id; });
    tabs.forEach(function (t) {
      if (t.getAttribute('href') === '#' + id) t.setAttribute('aria-current', 'page');
      else t.removeAttribute('aria-current');
    });
  }

  // Switch tabs without the browser jumping down the page.
  Array.prototype.slice.call(document.querySelectorAll('a[href^="#"]')).forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = a.getAttribute('href');
      if (ids.indexOf(href.slice(1)) === -1) return;
      e.preventDefault();
      if (location.hash !== href) history.pushState(null, '', href);
      show();
      window.scrollTo(0, 0);
    });
  });
  window.addEventListener('hashchange', show);
  window.addEventListener('popstate', show);
  show();
  window.addEventListener('load', function () { setTimeout(function () { window.scrollTo(0, 0); }, 0); });
})();
