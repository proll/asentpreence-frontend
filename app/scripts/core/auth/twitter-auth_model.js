aspe.TW = Backbone.Model.extend({
	url: 		 "/api/v2/auth/",
	url_link :   "/api/v2/auth/link/",
	url_unlink : "/api/v2/auth/unlink/",

	inited : false,
	curWind : null,

	initialize: function () {
		var js, fjs = document.getElementsByTagName('script')[0];
		if (document.getElementById('twitter-jssdk')) {return;}
		js = document.createElement('script');
		js.id = 'twitter-jssdk';
		$(js).load(function(e){/*console.log("hello twitter platform")*/});
		js.src = "//platform.twitter.com/widgets.js";
		fjs.parentNode.insertBefore(js, fjs);

		this.inited = true;

		this.on("error", function (obj) {
			console.error(obj)
		}, this)
	},

	login : function (){
		aspe.log("login tw >");
		this.curWind = _.openWindow2("Twitter auth", 640, 480);
		this.curWind.location.href = "/go/open_tw.html";
		return false;
	},


	fetch: function(user_obj){
		aspe.log("GET TW AUTH = ["+user_obj.uid+" : "+user_obj.token+" : "+user_obj.secret+"]");
		aspe.log("WHP/auth/TW : get auth...");

		var that = this;
		$.ajax({
			type: 'GET',
			url:  _.toSafeUrl(this.url),
			dataType: 'json',
			data: {
				social: 'tw', 
				access_token : user_obj.token, 
				access_token_secret : user_obj.secret
			}
		})
		.success(function(response, status, xhr){
			that.success(response, status, xhr)
		})
		.error(function(xhr, status){
			that.error(xhr, status)
		})
	},

	success: function(response, status, xhr){
		var resp = _.toJSON(response);
		if (resp.error){
			aspe.error('TW', resp.error);
			if (resp.error.code == "API_AuthFailed"){
				this.trigger("error", {description:"This account isn't linked with WeHeartPics"});
			} else {
				this.trigger("error", {description:"Something went wrong"});
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
	},

	error: function(xhr, status){
		aspe.error('TW', status);
		this.trigger("error", {description:"WHP/auth/TW : error while logging in!"})
	},


	link: function() {
		this.curWind = _.openWindow2("Twitter auth", 640, 480);
		this.curWind.location.href = "/go/open_tw.html";
	},


	linkFinal : function(user_obj){
		$.ajax({
			url: _.toSafeUrl(this.url_link),
			data : { 
				social : 			 'twitter', 
				access_token : 		 user_obj.token,
				access_token_secret: user_obj.secret
			},
			success:_.bind(this.updateSettings, this),
			error: 	_.bind(this.error, this)
		});
	},

	updateSettings: function(response) {
		var resp = _.toJSON(response);

		if (resp.error) {
			aspe.error('TW', resp.error);
			if (resp.error.code == "API_AlreadyInUse"){
				aspe.warning('This account is already linked with WeHeartPics!', 'auth');
			}else{
				aspe.warning('Something went wrong...', 'misc');
			}
			return false;
		} else {
			this.trigger('link:success', {
				twitter: true
			});
		}
	},



	unlink : function() {
		$.ajax({
			url: _.toSafeUrl(this.url_unlink),
			data : {
				social : 'twitter' 
			},
			success:_.bind(this.onUnlink, this),
			error: 	_.bind(this.error, this)
		});
	},

	onUnlink : function(response) {
		var resp = _.toJSON(response);
		if (resp.error) {
			aspe.error('TW', resp.error);
			if (resp.error.code == 'API_UnlinkLastAccount') {
				aspe.warning('You can&#39;t unlink all accounts!', 'auth');
			}else{
				aspe.warning('Something went wrong...', 'misc');
			}
		} else {
			this.trigger('unlink:success', {
				twitter: false
			})
		}
	},
});