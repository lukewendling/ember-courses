App.LoginController = Ember.Controller.extend({
	login: function() {
		var self = this, data = this.getProperties('username', 'password');

		Ember.$.post('/login', data).then(function(response){
			alert("got a response: " + response);
		});
	}
});