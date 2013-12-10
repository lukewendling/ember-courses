App.Router.map(function () {
  this.route('login');
  this.resource('chapters', function () {
    this.resource('chapter', { path: '/:chapter_id' }, function () {
      this.resource('lessons', function () {
        this.resource('lesson', { path: '/:lesson_id' }, function () {
        });
      });
    });
  });
});

App.ChaptersRoute = Ember.Route.extend({
  model: function () {
    return App.Chapter.fetch();
  }
});