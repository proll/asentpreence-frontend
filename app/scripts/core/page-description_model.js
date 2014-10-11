aspe.PageDescription = Backbone.Model.extend({
	$head: 				null,

	$title: 			null,
	$facebook_title: 	null,
	$desc: 				null,
	$facebook_desc: 	null,
	$facebook_url: 		null,
	$facebook_image: 	null,

	$hreflang: 			[],

	initialize: function(options) {
		this.$title = $('title');
		this.$facebook_title = $('#og_title');
		this.$desc = $('#pg_description');
		this.$facebook_desc = $('#og_description');
		this.$facebook_url = $('#og_url');
		this.$facebook_image = $('#og_image');

		this.$head = $('head');
	},

	setDescrition: function(desc_obj, set_default) {
		if(!!desc_obj) {
			var def = {
				title: 'Pics - the best addition to your camera and much more!',
				description: 'Торговое оборудование нового поколения. Запуск весной 2014 года. Отвечает всем требованиям налоговых органов и прост в использовании.',
				url: 'http://aspe.com',
				image: 'http://aspe.com/images_static/share.png',
			};
			
			if(!desc_obj.title && set_default) {
				desc_obj.title = def.title;
			}
			if(!!desc_obj.title) {
				this.$title.text(desc_obj.title);
				this.$facebook_title.attr('content', desc_obj.title);
			}

			if(!desc_obj.description && set_default) {
				desc_obj.description = def.description;
			}
			if(!!desc_obj.description) {
				this.$desc.attr('content', desc_obj.description);
				this.$facebook_desc.attr('content', desc_obj.description);
			}

			if(!desc_obj.url && set_default) {
				desc_obj.url = def.url;
			}
			if(!!desc_obj.url) {
				this.$facebook_url.attr('content', desc_obj.url);
			}

			if(!desc_obj.image && set_default) {
				desc_obj.image = def.image;	
			}
			if(!!desc_obj.image) {
				this.$facebook_image.attr('content', desc_obj.image);
			}
		}
	},


	updateMeta: function() {
		var router = aspe.app.router.current_route,
			that = this,
			path = window.location.pathname;
		if (path.charAt(0)!="/") {
			path = "/"+path;
		}

		_.forEach(aspe.available_languages, function(lang, i) {
			if(lang == 'en') return;
			if(!that.$hreflang[lang]) {
				that.$hreflang[lang] = that.$head.find('#lang_' + lang)
			}
			that.$hreflang[lang].attr('href', window.location.protocol + '//' + lang + '.' + aspe.maindomain + path);
		})

		var descr_obj = (Handlebars.helpers._('items','header').string)[router] || {};

		this.setDescrition({
			title: 			!!descr_obj.title ? descr_obj.title + ' - We Heart Pics' : '',
			description: 	!!descr_obj.description ? descr_obj.description : '',
			url: 			window.location.href
		}, true)
	},
});