(function (window, $) {
  var win = $(window);
  var contentList = $('#content-list');

  win.on('listUpdate', resetTagForm);
  contentList.on('click', '.tag-button', openTagForm);
  contentList.on('click', '.tag-close-button', closeTagForm);
  contentList.on('submit', '.tag-form', updateTags);

  initTagUIState.call(contentList);

  function resetTagForm(e, newItems) {
    initTagUIState.call(newItems);
  }

  function initTagUIState() {
    var el = $(this).find('.data');
    var form = el.find('.tag-form');
    form.find('p:first').append(templates.closeTagButton);
    form.hide();
    el.find('.tags').append(templates.tagButton);
  }

  function openTagForm(e) {
    var el = $(this);
    var tags = el.parent();
    tags.hide();
    tags.next('.tag-form').show();
    contentList.masonry();
  }

  function closeTagForm() {
    var el = $(this);
    var form = el.parents('.tag-form');
    var tags = form.prev();
    form.hide();
    tags.show();
    form.find('input').val(getTags(tags));
    contentList.masonry();
  }

  function updateTags(e) {
    var xhr;
    var form = $(this);
    var url = form.attr('action');
    var tags = form.find('input').val();
    var tagList = form.prev();
    var buttons = form.find('button');

    e.preventDefault();
    buttons.prop('disabled', true);

    xhr = $.post(url, {tags: tags});
    xhr.done(function (res) {
      tagList.html(res + templates.tagButton);
      form.data('original', getTags(tagList));
      closeTagForm.call(buttons);
    });
    xhr.fail(updateError);
    xhr.always(function () { buttons.prop('disabled', false); });
  }

  function updateError() {
    alert(templates.tagsUpdateError);
  }

  function getTags(el) {
    return el.find('a').map(function () {
      return $(this).text();
    }).get().join(', ');
  }
}(this, jQuery));