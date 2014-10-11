aspe.Registration = Backbone.Model.extend({
	url: 		"/api/v2/auth/signup/",

	initialize: function (){},


	fetch: function(user_obj){
		var that = this;
		this.set(user_obj)

		$.ajax({
			type: 'POST',
			url:  _.toSafeUrl(this.url),
			dataType: 'json',
			data: {
				login : user_obj.login, 
				passw : user_obj.password,
				first_name: user_obj.first_name,
				last_name: user_obj.last_name
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
				aspe.error('Registration', resp.error);
				if (resp.error.code == "API_AlreadyInUse") {
					this.trigger("error", {type:"login", description: aspe.localize("This email already registered", 'auth')});
				} else if (resp.error.code == "API_BadParams") {
					this.trigger("error", {description: aspe.localize("Enter your first and last name", 'auth')});
				} else if (resp.error.code == "API_PendingConfirmation") {
					this.trigger("error", {description: aspe.localize("We have sent you an e-mail to confirm", 'auth')});
				} else {
					this.trigger("error", {description: aspe.localize("Something went wrong...", 'misc')});
				}
			} else if(!!resp.state && resp.state == "PENDING_CONFIRMATION"){
				this.trigger("registration:pending", {login: this.get('login')});
			} else {
				this.trigger("auth:success", 
					{
						response: resp,
						user: resp.user, 
						session:{ token: resp.user.token, uid: resp.user.id }
					}
				);
				this.trigger("registration:success");
			}
		} else {
			aspe.error('Registration', 'sww');
			this.trigger("error", {description: aspe.localize("Something went wrong...", 'misc')});
		}
		// WHP.controller.setTitle();
	},

	error : function(xhr, status) {
		aspe.error('Registration', status);
		this.trigger("error", {description: aspe.localize("Something went wrong...", 'misc')});
	}
});