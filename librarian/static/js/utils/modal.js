// Generated by CoffeeScript 1.10.0
(function(window, $, templates) {
  var ESCAPE, body, defaultFailure, defaultSuccess, win;
  defaultSuccess = templates.modalContent;
  defaultFailure = templates.modalLoadFailure;
  body = $(document.body);
  win = $(window);
  ESCAPE = 27;
  $.fn.closeModal = function() {
    var elem, modal;
    elem = $(this);
    if (elem.hasClass('o-modal-overlay')) {
      modal = elem;
    } else {
      modal = elem.parents('.o-modal-overlay');
    }
    if (!modal.length) {
      return;
    }
    modal.remove();
    win.trigger('modalclose');
  };
  body.on('click', '.o-modal-overlay', function(e) {
    return ($(this)).closeModal();
  });
  body.on('click', '.o-modal-close', function(e) {
    return ($(this)).closeModal();
  });
  body.on('click', '.o-modal-window', function(e) {
    return e.stopPropagation();
  });
  body.on('keydown', '.o-modal-window', function(e) {
    if (e.which === ESCAPE) {
      return ($(this)).closeModal();
    }
  });
  $.modalDialog = function(template) {
    var modal;
    ($('.o-modal-overlay')).closeModal();
    modal = $(template);
    modal.appendTo(body);
    win.trigger('modalcreate');
    return modal;
  };
  return $.modalContent = function(contentUrl, options) {
    var failureTemplate, fullScreen, modal, panel, res, successTemplate;
    if (options == null) {
      options = {};
    }
    if (options.successTemplate == null) {
      options.successTemplate = defaultSuccess;
    }
    if (options.failureTemplate == null) {
      options.failureTemplate = defaultFailure;
    }
    if (options.fullScreen == null) {
      options.fullScreen = false;
    }
    successTemplate = options.successTemplate, failureTemplate = options.failureTemplate, fullScreen = options.fullScreen;
    modal = $.modalDialog(successTemplate);
    window = modal.find('.o-modal-window');
    panel = modal.find('.o-modal-panel');
    if (fullScreen) {
      window.addClass('o-full-screen');
    }
    window.focus();
    res = $.get(contentUrl);
    res.done(function(data) {
      panel.html(data);
      return win.trigger('modalload');
    });
    res.fail(function() {
      panel.html(failureTemplate);
      return win.trigger('modalloaderror');
    });
    return res;
  };
})(this, this.jQuery, this.templates);