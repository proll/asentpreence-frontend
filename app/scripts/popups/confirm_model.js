aspe.Confirm = Backbone.Model.extend({
	url: '/',
	defaults: {
		url: '/',
		data: {},

		content: '?',
		ok_title: 'Ok',
		close_title: 'Cancel',
		success_title: 'Allset',
		error_title: 'Something went wrong...',

		backreload: false,
	},

	initialize: function (options) {
		if(!!options && !!options.url) {
			this.url = options.url;
		}
		this.view = new aspe.ConfirmView({model: this});
	},

	fetch: function (options) {
		options = options || {};
		options.type = 'post';
		options.data = this.get('data');

		options.success  	= _.bind(this.success, this);
		options.error  		= _.bind(this.error, this);

		this.trigger('load:start');

		return Backbone.Model.prototype.fetch.call(this, options);
	},


	success: function (model, response, options) {
		response = _.toJSON(response);
		if(!response.error) {
			this.trigger('confirm:success');
		} else {
			aspe.error('Confirm', response.error);
			this.trigger('confirm:error');
		}
	},

	error: function (model, xhr, options) {
		aspe.error('Confirm', xhr.status);
		this.trigger('confirm:error')
	},
});