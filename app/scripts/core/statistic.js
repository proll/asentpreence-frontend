aspe.Statistic = Backbone.Model.extend({
	active: true,


	initialize : function() {
		this.active = !_.browser.phantom;
	},

	trackCurrentPageChange : function(_url) {
		if(!this.active) return false;
		this.trackPageChange(window.location.pathname);
		return true;
	},

	trackPageChange : function(_url) {
		if(!this.active) return false;
		var str = (_url).toString();
		if (str.charAt(0)!="/") {
			str = "/"+str;
		}
		ga('send', 'pageview', str);
	},

	trackLike: function(){
		if(!this.active) return false;
		var counter = _.getLS("aspe_likec");
		if (_.isNaN(counter)) {
			counter = 0;
		}
		counter++;
		_.setLS("aspe_likec", counter, 60*1000);
	},

	trackPreregister: function(_reply) {
		if(!this.active) return false;
		ga('send', 'event', 'Preregister', 'post');
	},

	trackPreregister: function(_reply) {
		if(!this.active) return false;
		ga('send', 'event', 'Preregister', 'error');
	},

	trackApprove: function(_reply) {
		if(!this.active) return false;
		ga('send', 'event', 'Photo', 'approve');
	},

	trackComment: function(_reply) {
		if(!this.active) return false;
		var counter = _.getLS("aspe_comc");
		if (_.isNaN(counter)) {
			counter = 0;
		}
		counter++;
		_.setLS("aspe_comc", counter, 60*1000);

		var reply = _reply == true;
		if (reply) {
			ga('send', 'event', 'Photo', 'reply');
		} else {
			ga('send', 'event', 'Photo', 'comment');
		}
	},

	trackShare : function(_param, _id) {
		if(!this.active) return false;
		if (_param == "SHARE_FACEBOOK") {
			var counter = _.getLS("aspe_shrc");
			if (_.isNaN(counter)) {
				counter = 0;
			}
			counter++;
			_.setLS("aspe_shrc", counter, 60*1000);
		}

		 ga('send', 'event', 'Photo', 'share', _param);
	},

	trackTimeline : function(_main, _N) {
		if(!this.active) return false;
		var mainStr = "USER_TIMELINE_";
		if (_main) {
			mainStr = "MAIN_TIMELINE_";
		}

		 ga('send', 'event', 'Timeline', 'PagesLoaded', mainStr+_N, _N);
	},

	trackNotifications : function(_N) {
		if(!this.active) return false;
		 ga('send', 'event', 'Notifications', 'PagesLoaded', "PAGES_LOADED_"+_N, _N);
	},

	trackDownload : function(_param) {
		 ga('send', 'event', 'Download', 'click', _param);
	},

	trackEmptyTimeline : function(_main) {
		if(!this.active) return false;
		var mainStr = "SHOW_TIMELINE_USER_EMPTY";
		if (_main) {
			mainStr = "SHOW_TIMELINE_MAIN_EMPTY";
		}

		 ga('send', 'event', 'Download', 'Views', mainStr);
	},

	trackPhotoPlateShow : function() {
		if(!this.active) return false;
		 ga('send', 'event', 'Download', 'Views', "SHOW_PHOTO_PAGE_PLATE");
	},

	trackDownloadButtonMenu : function(_new) {
		if(!this.active) return false;
		var mainStr = "SHOW_DOWNLOAD_MENU_NEW";
		if (!_new) {
			mainStr = "SHOW_DOWNLOAD_MENU"
		}
		 ga('send', 'event', 'Download', 'Views', mainStr);
	},

	trackEmptyStories : function() {
		if(!this.active) return false;
		 ga('send', 'event', 'Download', 'Views', "SHOW_EMPTYSTORIES_DOWNLOAD");
	},

	trackShowMainButton : function() {
		if(!this.active) return false;
		 ga('send', 'event', 'Download', 'Views', "SHOW_MAIN_DOWNLOAD");
	},

	trackXclick : function() {
		if(!this.active) return false;
		 ga('send', 'event', 'Download', 'Views', "SHOW_CLICK_CLOSE_PLATE");
	},

	trackShuffle : function() {
		if(!this.active) return false;
		var N = parseInt(_.getLS("aspesc"));
		if (_.isNaN(N)) {
			N = 0;
		}
		N++;
		_.setLS("aspesc", N, 1000);
		ga('send', 'event', 'Other', 'Shuffle', "click", N);
	},


	trackError : function(url, desc) {
		if(!this.active) return false;
		 ga('send', 'event', 'Error', url, desc);
	},

});