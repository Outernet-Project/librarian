// Generated by CoffeeScript 1.10.0
(function(window, $, templates) {
  var container, onclick, selectors, spinnerIcon;
  selectors = {
    container: '.dashboard-sections',
    button: '.o-collapsible-section-title',
    collapsibleSection: '.o-collapsible-section',
    collapsibleArea: '.o-collapsible-section-panel'
  };
  spinnerIcon = window.templates.spinnerIcon;
  onclick = function(e) {
    var clicked, panel, res, section, url;
    clicked = $(e.target);
    section = clicked.parents(selectors.collapsibleSection);
    panel = section.find(selectors.collapsibleArea);
    if ($.trim(panel.html())) {
      return;
    }
    panel.html(spinnerIcon);
    section.trigger('remax');
    url = clicked.attr('href');
    res = $.get(url);
    res.done(function(data) {
      panel.html(data);
      section.trigger('dashboard-plugin-loaded');
      section.trigger('remax');
      return $(document).trigger('data-bind');
    });
    res.fail(function() {
      panel.html(templates.dashboardLoadError);
      return section.trigger('remax');
    });
    return res;
  };
  container = $(selectors.container);
  container.collapsible();
  return container.on('click', selectors.button, onclick);
})(this, this.jQuery, this.templates);
