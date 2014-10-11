aspe.LandingPage = aspe.Page.extend({
	url: '/api/v1/lead',
	visited: false,
	defaults: {
		img_num: 0,
		lang: 'en',
	},

	initialize: function(options){
		this.set('lang', aspe.language);
		options 		= options || {};
		// this.set('img_num', Math.round(Math.random()*3))
	},

	render: function(options) {
		if(!this.visited) {

			this.visited = true;
			this.view = new aspe.LandingPageView({
				model: this, 
				template:"pages/landing-page"
			});
			this.view.render();
		} else {
			this.view.render();
		}
		var that = this;
		if(options && options.show_video) {
			setTimeout(function(){
				that.view.showVideo();
			}, 500)
		}
	},


	signupEmail: function(email) {
		// aspe.trigger("auth:show", {email: email});
		this.addEmail(email);
		return false;
	},

	addEmail: function(email) {
		var options = {};
		options.url = this.url;
		options.type = 'post';
		options.contentType =  "application/json";
		options.data = _.toJSONString({
			leadsource: 'upper',
			email: email
		});

		options.success  	= _.bind(this.addSuccess, this);
		options.error  		= _.bind(this.addError, this);

		this.trigger("addemail:start");

		return Backbone.Model.prototype.fetch.call(this, options);	
	},

	addSuccess: function (model, response, options) {
		response = _.toJSON(response);
		if(!response.error) {
			this.trigger("addemail:success");
			aspe.app.statistic.trackPreregister();
		} else {
			this.trigger("addemail:error");
			aspe.app.statistic.trackPreregisterError();
		}
	},

	addError: function (model, response, options) {
		this.trigger("addemail:error")
		aspe.app.statistic.trackPreregisterError();
	},



	sleep: function () {
		if(this.view) this.view.sleep();
	}
});