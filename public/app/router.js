App.Router.map(function () {
  this.route('login');
  //this.route('index');
  this.resource('chapters', function () {
    this.resource('chapter', { path: '/:chapter_id' }, function () {
      this.resource('lessons', function () {
        this.resource('lesson', { path: '/:lesson_id' }, function () {
        });
      });
    });
  });
});

App.AuthenticatedRoute = Ember.Route.extend({
  getAuthToken: function() {
    return this.controllerFor('login').get('authToken');
  },
  events: {
    error: function(reason, transition) {
      if(reason.status === 401) {
        //alert("You must log in to use our app");
        this.transitionTo('login');
      } else {
        alert("something went wrong");
      }
    }
  }
});

App.ChaptersRoute = App.AuthenticatedRoute.extend({
  model: function () {
    return App.Chapter.fetch({token: this.getAuthToken()});
  }

});

App.LoginRoute = Ember.Route.extend({
  setupController: function(controller, context) {
    controller.reset();
  }
});

App.IndexRoute = App.AuthenticatedRoute.extend({

  beforeModel: function() {
    if (!this.getAuthToken()) {
      this.transitionTo('login');
    }
  }
});

