aspe.LandingPageView = aspe.PageView.extend({
	indent: 66,
	$window: $(window),
	events: {
		'click .landing__form-a': 'submitForm',
		'submit .landing-section__form': 'signupEmail',
		'click .landing__sound-control': 'toggleMute',
		'click .landing__meaining-video-open': 'openVideo'
	},


	render: function(){
		var that = this;
		if (this.renderedHtml) {
			this.$el.append(this.renderedHtml);
		} else {
			var tmpDiv = $('<div></div>')
				.addClass('page-' + this.model.get('name'))
				.html(this.template(this.model.toJSON()));
			this.trigger("page:preRender", tmpDiv);
			this.$el.html(tmpDiv);
		}


		$('body').attr('class', 'body__page-' + this.model.get('name'));

		/**
		 * описываем в модели метод enterDocument
		 * выполнится после того как page отрисован
		 */
		this.model.enterDocument();
		this.trigger("page:render", this.model);
		this.trigger("enterDocument", this.model);

		this.model.on('addemail:success', this.toggleSentOn, this);


		this.$window.on('resize.landing.page', _.bind(this.repositionPage, this));
		this.$sec1 = this.$el.find('.landing-section1');
		this.$sec3 = this.$el.find('.landing-section3');
		this.$email_input_sec1 = this.$sec1.find('input[name=email]');
		this.$video_sec1 = this.$sec1.find('.landing-section1__video');
		this.$video_sec1.on('play loadedmetadata', function(e){
			that.updateZ(e);
		})


		this.repositionPage();
		// if(_.isPhone()) {
		// 	$('html, body').animate({
		// 		 scrollTop: 0
		// 	 }, 100);
		// }


		this.delegateEvents();
	},

	updateZ: function(e) {
		// GREAT hack of video upon all
		var that = this;
		setTimeout(function(){
			that.$email_input_sec1.blur();
		}, 500)
		// setTimeout(function(){
		// 	that.$email_input_sec1.focus();
		// }, 510)
	},

	toggleMute: function(e) {
		if(this.$el.hasClass('unmute')) {
			this.mute();
		} else {
			this.unmute();
		}
		return false;
	},

	mute: function() {
		this.$video_sec1.prop('muted', true);
		this.$el.toggleClass('unmute', false);
	},
	unmute: function() {
		this.$video_sec1.prop('muted', false);
		this.$el.toggleClass('unmute', true);
	},

	openVideo: function(e) {
		if(e && e.preventDefault) {
			e.preventDefault();
			e.stopPropagation();
		}
		this.mute();
		if(!_.isPhone()) {
			new aspe.LandingVideoPopupView({src: '//www.youtube.com/embed/0i3MwtSkNhQ?rel=0&autohide=1&autoplay=1'})
		} else {
			window.location.href = 'https://www.youtube.com/watch?v=0i3MwtSkNhQ';
		}
	},

	showVideo: function() {
		var top = this.$sec3.offset().top,
			that = this;
		aspe.speedScrollTop(top, 1000);
		setTimeout(function(){
			that.openVideo();
		}, 1000);
	},


	repositionPage: function() {
		var h = 0,
			ww = $(window).width();


		this.indent = 0;
		h = this.$window.innerHeight() - this.indent;
		var section_h = Math.max(h, 540);
		this.$sec1.height(section_h);
		this.updateZ();
	},

	submitForm: function(e) {
		e.preventDefault();
		var $this = $(e.currentTarget);
		$this.parents('form').submit();
		return false;
	},

	signupEmail: function(e) {
		e.preventDefault();
		var $form = $(e.currentTarget);
		var $email = $form.find('input[name=email]'),
		email = $email.val();
		if(!_.isEmpty(email) && _.isEmail(email)) {
			this.model.signupEmail(email);
		}
		return false;
	},

	toggleSentOn: function() {
		var $email = this.$el.find('input[name=email]');
		$email.val('');
		this.$el.toggleClass('sent');

		setTimeout(_.bind(this.toggleSentOff, this), 8000);
	},

	toggleSentOff: function() {
		var $email = this.$el.find('input[name=email]');
		$email.val('');
		this.$el.toggleClass('sent', false);
	},

	sleep: function() {
		this.$window.off('resize.landing.page');
		this.undelegateEvents();
	}
});