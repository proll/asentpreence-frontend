aspe.Signin = Backbone.Model.extend({
	url: 		"/api/v2/auth/signin/",

	initialize: function (){},

	login: function(user_obj){
		this.fetch(user_obj);
		return false;
	},

	fetch: function(user_obj){
		var that = this;
		$.ajax({
			type: 'GET',
			url:  _.toSafeUrl(this.url),
			dataType: 'json',
			data: {
				login : user_obj.login, 
				passw : user_obj.password
			}
		})
		.success(function(response, status, xhr){
			that.success(response, status, xhr);
		})
		.error(function(xhr, status){
			that.error(xhr, status);
		})
	},

	success: function(response, status, xhr){
		var resp = _.toJSON(response);
		if (!!resp) {
			if (!!resp.error) {
				aspe.error('Signin', resp.error);
				if (resp.error.code == "API_BadParams") {
					this.trigger("error", {description: aspe.localize("Wrong e-mail and password combination :(", 'auth')});
				} else if (resp.error.code == "API_AuthFailed") {
					this.trigger("error", {description: aspe.localize("Wrong e-mail and password combination :(", 'auth')});
				} else if (resp.error.code == "API_PendingConfirmation") {
					this.trigger("error", {description: aspe.localize("We have sent you an e-mail to confirm", 'auth')});
				} else {
					this.trigger("error", {description: aspe.localize("Something went wrong...", 'misc')});
				}
			} else {
				this.trigger("auth:success", 
					{
						response: resp, 
						user: resp.user, 
						session:{ token: resp.user.token, uid: resp.user.id }
					}
				);
			}
		}
		// WHP.controller.setTitle();
	},

	error : function(xhr, status) {
		aspe.error('Signin', status);
		this.trigger("error", {description: aspe.localize("Something went wrong...", 'misc')});
	}
});