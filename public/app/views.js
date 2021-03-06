App.ChapterView = Ember.View.extend({
  templateName: 'chapter',
  click: function (e) {
    var $target = $(e.target);
    var url = $target.data('url');
    if (url) $('iframe.content').attr('src', url);
    e.preventDefault();
  },
  didInsertElement: function () {
    // init jquery plugins here
  }
});

App.ChaptersView = Ember.View.extend({
  templateName: 'chapters',
  didInsertElement: function () {
    this.$('#chapters-menu').popover('show');
  }
});