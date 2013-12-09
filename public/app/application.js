var App = Ember.Application.create({
  LOG_TRANSITIONS_INTERNAL: true
});

App.RESTAdapter = RL.RESTAdapter.create({
  url: 'http://localhost:4000'
});
// App.ApplicationAdapter = App.RESTAdapter;
App.Client = RL.Client.create({
  adapter: App.RESTAdapter
});

Ember.RSVP.configure('onerror', function(error) {
  Ember.Logger.assert(false, error);
});