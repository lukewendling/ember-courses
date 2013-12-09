App.Router.map(function () {
  this.route('login');
  this.resource('courses', function () {
    this.resource('course', { path: '/:course_id' });
  });
});

App.CoursesRoute = Ember.Route.extend({
  model: function () {
    return App.Course.fetch();
  }
});