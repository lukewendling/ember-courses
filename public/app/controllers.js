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
				console.log(response);
				console.log(response.authToken);
				if(response.authToken) {
					self.set('authToken', response.authToken);		
				}
			})
			.fail(function(jqXHR) {
				console.log(jqXHR.responseText);
				var response = JSON.parse(jqXHR.responseText);
				self.set('errorMessage', response.errorMessage);
				console.log('failed: errorMessage: ' + response.errorMessage);
			});
	}
});