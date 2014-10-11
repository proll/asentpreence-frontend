aspe.FB = Backbone.Model.extend({
	url : "/api/v2/auth/",
	url_link : "/api/v2/auth/link/",
	url_unlink : "/api/v2/auth/unlink/",
	app_id: 205868409437437,
	inited : false,
	access_token : null,

	initialize: function (){
		$.getScript('//connect.facebook.net/en_US/all.js#xfbml=1', _.bind(function () {
			//facebook functions
			FB.init({
				appId: this.app_id,
				cookie: true,
				status: true,
				xfbml:  true,
				oauth : false });
			FB.Event.subscribe('edge.create', this.fbShareEvents);
			if (_.browser.opera){
				FB.XD._transport="postmessage";
				FB.XD.PostMessage.init();
			}
			FB.getLoginStatus(_.bind(function (response) {
				if (response && response.status == "connected"){
					aspe.log("Facebook : user was succesfully connected! :)");
				}else{
					aspe.log("Facebook : user was not connected! :(");
				}
				if(aspe.fbapp && !aspe.is_authed()) {
					this.onFBData(response);
				}
			}, this));

			this.inited = true;
		}, this));
	},


	fetch: function(){
		if (this.access_token!=null) {
			var that = this;
			$.ajax({
				type: 'GET',
				url: _.toSafeUrl(this.url),
				data: { 
					social : 'fb',  
					access_token : this.access_token 
				},
				dataType: 'json'
			})
			.success(function(response, status, xhr){
				that.success(response, status, xhr);
			})
			.error(function(xhr, status){
				that.error(xhr, status);
			})
		}
	},

	success: function(response, status, xhr){
		var resp = _.toJSON(response);
		if (resp!=null)
		if (resp.error)
		{
			aspe.error('FB', resp.error);
			if (resp.error.code == "API_AuthFailed") {
				this.trigger("error", {description:"This account isn't linked with WeHeartPics"})
			} else {
				this.trigger("error", {description:"Something went wrong"});
			}
		}else{
			this.trigger("auth:success", 
				{
					response: resp, 
					user: resp.user, 
					session:{ token: resp.user.token, uid: resp.user.id }
				}
			);
		}
	},

	error: function(xhr, status) {
		aspe.error('FB', status);
		this.trigger("error", {description:"WHP/auth/FB : error while logging in!"})
	},

	

	login : function (e){
		this.access_token = "";
		FB.login(
			_.bind(this.onFBData, this), 
			{ scope: 'publish_actions,publish_stream,user_photos,offline_access,email,user_birthday'}
		);
		return false;
	},

	loginOG : function (e, _func){
		this.access_token = "";
		FB.login(
			_func, 
			{ scope:'publish_actions,publish_stream,user_photos,offline_access,email,user_birthday'}
		);
	},

	fbShareEvents : function(e){
		aspe.log("CreateEdge");
		// TODO:надо слушать это событие гдето
		this.trigger("fb:like", e);
	},

	onFBData: function(response){
		var response = _.toJSON(response);

		if (response && response.status == "connected"){
			aspe.log("Facebook : user was succesfully connected! :)");
			var token = response.authResponse.accessToken;
			if (this.access_token!=token){
				aspe.log("Facebook : token = [" + token + "]");
				this.access_token = token;
				this.fetch();
			}else{
				aspe.error('FB', 'Facebook : user was not connected! :(');
			}
		}
		// WHP.controller.setTitle();
	},


	link: function() {
		FB.login(
			_.bind(this.onFBLinkData, this), 
			{ 
				scope:'publish_actions,publish_stream,user_photos,offline_access,email,user_birthday'
			}
		);
	},

	// linkOG : function (){
	// 	FB.login(
	// 		_func, 
	// 		{ scope:'publish_actions,publish_stream,user_photos,offline_access,email,user_birthday'}
	// 	);
	// },

	onFBLinkData: function(response){
		var response = _.toJSON(response);

		if (response.status == "connected"){
			aspe.log("Facebook : user was succesfully connected! :)");
			var token = response.authResponse.accessToken;
			if (token){
				aspe.log("Facebook : link token = ["+token+"]");
				this.access_token = token;
				this.linkFinal(token);
			}else{
				aspe.error('FB', 'Facebook : user was not connected! :(');
			}
		}
	},

	linkFinal : function(_token){
		$.ajax({
			url: _.toSafeUrl(this.url_link),
			data : { 
				social : 'facebook', 
				access_token : _token 
			},
			success:_.bind(this.updateSettings, this),
			error: 	_.bind(this.error, this)
		});
	},


	updateSettings: function(response) {
		var resp = _.toJSON(response);

		if (resp.error) {
			aspe.error('FB', resp.error);
			if (resp.error.code == "API_AlreadyInUse"){
				aspe.warning('This account is already linked with WeHeartPics!', 'auth');
			}else{
				aspe.warning('Something went wrong...', 'misc');
			}
			return false;
		} else {
			this.trigger('link:success', {
				facebook: true
			});

			//get opengraph status
			FB.api('/me/permissions', _.bind(function(e) {
				if(e && !!e.data && !!e.data[0]){
					var hasOGpermission = e.data[0].publish_actions == 1;
					if (hasOGpermission) {
						// TODO: maby listen that or we've disconnected OG
						this.trigger('opengraph')
					}
				}
			},this));
		}
	},


	unlink : function() {
		$.ajax({
			url: _.toSafeUrl(this.url_unlink),
			data : {
				social : 'facebook' 
			},
			success:_.bind(this.onUnlink, this),
			error: 	_.bind(this.error, this)
		});
	},

	onUnlink : function(response) {
		var resp = _.toJSON(response);
		if (resp.error) {
			aspe.error('FB', resp.error);
			if (resp.error.code == 'API_UnlinkLastAccount') {
				aspe.warning('You can&#39;t unlink all accounts!', 'auth');
			}else{
				aspe.warning('Something went wrong...', 'misc');
			}
		} else {
			this.trigger('unlink:success', {
				facebook: false
			})
		}
	},


})