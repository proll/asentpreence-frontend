aspe.LandingVideoPopupView = Backbone.View.extend({
	template: "popups/landing-video-popup",
	className: 'landing-video-popup-cont',
	events: {
		"click .landing-video-popup__close": "close",
	},
	options: {
		content: ':")',
		src: '//www.youtube.com/embed/0i3MwtSkNhQ?rel=0'
	},

	initialize: function(options) {
		this.options = options;

		this.template = aspe.Templates.get(this.template);
		this.popup_view = new aspe.PopupView({klass: "landing-video-popup"});

		this.popup_view.on('hide', this.clear, this);
		this.render();
	},

	render: function() {
		this.$el.append(this.template(this.options));

		this.popup_view.setContent(this.$el);
		this.popup_view.show();

		return this.$el;
	},

	close: function() {
		this.popup_view.hide();
		return false;
	},

	clear: function() {
		this.popup_view.remove();
		this.remove();
		return false;
	}
});