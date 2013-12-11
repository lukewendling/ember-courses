App.LoginController = Ember.Controller.extend({
  
  reset: function() {
    this.setProperties({
      username: "",
      password: "",
      errorMessage: ""
    });
  },

  login: function() {
    var self = this, data = this.getProperties('username', 'password');

    Ember.$.post('/login', data)
      .done(function(response) {
        if (response.authToken) {
          self.set('authToken', response.authToken);
          self.transitionToRoute('chapters');
        }
      })
      .fail(function(jqXHR) {
        var response = JSON.parse(jqXHR.responseText);
        self.set('errorMessage', response.errorMessage);
        console.log('failed: errorMessage: ' + response.errorMessage);
      });
  }
});