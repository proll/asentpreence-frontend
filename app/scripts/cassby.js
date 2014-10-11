if (typeof console == "undefined") window.console = { log: function() {}, error: function() {}}; 
window.aspe = window.aspe || {};
window.aspe = _.extend(window.aspe, {
	fbapp: 			_.getURLParameter('fbapp') == 1 || _.getURLParameter('fb_appcenter') == 1,
	maindomain: 	'weheartpics.com',
	domain: 		window.location.protocol + '//' + window.location.host,
	language: 		_.getLangFromDomain(window.location.host) || _.getCookie('lang') || (navigator.language || navigator.systemLanguage || navigator.browserLanguage || navigator.userLanguage || 'en').substr(0, 2).toLowerCase(),
	available_languages: ['en', 'ru', 'ko', 'ja', 'zh', 'es', 'pt'],
	l10n: {},

	preloadTemplates: function(){
		if(!!window.aspe_dev) {
			var files = [];
			_.each(window.templates.files, function(templateName){
				var file = window.templates.path + "/" + templateName + "." + window.templates.ext;
				files.push( $.get(file, function(templateData){
					aspe.Templates.add(templateName, templateData);
				}));
			});
			return files;
		} else {
			return [];
		}
	},
	init: function() {
		var lang_cnt = 0,
			that = this;
		_.forEach(this.available_languages, function(lang, i) {
			if (that.language !== lang) {
				lang_cnt++;
			}
		});

		if(lang_cnt === this.available_languages.length) {
			this.language = 'en';
		}

		_.setCookie('lang', this.language);

		$.when.apply(this, this.preloadTemplates())
			.done(function(){
				/**
				 * aspe app initialization
				 */
				aspe.app = new aspe.App({ 
					debug: true,
				});
				// Init Backbone history
				Backbone.history.start({pushState: true});

			});

		// Catch links and trigger router
		$(document).on("click", "a", function(e){
			if (e.metaKey || e.ctrlKey) return true;
			var $this = $(this);
			if($this.attr("target")) return true;
			
			e.stopPropagation();
			e.preventDefault();

			if($this.attr('type') == 'event') {
				aspe.trigger($this.attr('href'));
			} else {
				aspe.app.router.context = $this.data();
				aspe.app.router.navigate($this.attr("href"), {trigger: true});
			}
			return false;
		});
	},

	log: function (txt) {
		console.log(txt);
	},

	error: function(source, desc) {
		console.error(source, desc);
		if(!aspe.app || !aspe.app.statistic) return;
		if(typeof desc === 'object') {
			if(!!desc.code) {
				aspe.app.statistic.trackError(source, desc.code + ':' + desc.info);
			} else {
				aspe.app.statistic.trackError(source, 'unknown:response:structure');
			}
		} else {
			aspe.app.statistic.trackError(source, desc);
		}
	},

	navigate: function (path, options) {
		if(!!options && options.trigger === false) {
			aspe.app.statistic.trackCurrentPageChange();
			aspe.app.trigger('need:meta:update');
		}
		aspe.app.router.navigate(path, options);
	},

	is_needauth: function() {
		if(!aspe.is_authed()) {
			aspe.trigger("auth:show");
			return true;
		} else {
			return false;
		}
	},

	is_authed: function() {
		return (!!aspe.user && aspe.user.is_auth());
	},

	authUrl: function(url) {
		var credentials = {};
		if(!!aspe.app && !!aspe.app.user.get("uid")) {
			credentials = {
				uid: aspe.app.user.get("uid"),
				token: aspe.app.user.get("token")
			}
		} else {
			return url;
		}

		if(url.indexOf('?')==-1) {
			url+='?';
		}
		return url + _.map(credentials, function(value, key){ return key+"="+value}).join("&")
	},

	warning: function(phrase, context){
		var wrn = new aspe.WarningView({content: aspe.localize(phrase, context)});
	},

	localize: function(phrase, context) {
		return Handlebars.helpers._(phrase, context).toString();
	},

	speedScrollTop: function(s_t, time) {
		$("html, body").animate({ 
			scrollTop: s_t || 0 
		}, time || 300);
	},
});

window.aspe.Templates = window.aspe.Templates || {};
window.aspe.Templates =  _.extend(
	window.aspe.Templates,
	{
		templates: {},
		compiled: {},
		// ptemplates: {},
		add: function(name, template){
			this.templates[name] = template;
		},
		get: function(name){
			// if it is dev environment - compile on runtime
			if(!!window.aspe_dev) {			
				if(this.compiled[name]){
					return this.templates[name];
				}else if(this.templates[name]){
					this.templates[name] = Handlebars.compile(this.templates[name]);
					this.compiled[name] = true;
					return this.templates[name];
				}else{
					console.error("Can't find template \"" + name + "\"");
					return function(){ return "" }
				}
			} else {
			// if it is prod environment - get from precompiled
				if(this.ptemplates) {
					var ptemplate = this.ptemplates[name];
					if(ptemplate) {
						return ptemplate;
					} else {
						console.error("Can't find template \"" + name + "\"");
						return function() { return "" }
					}
				} else {
					console.error("Can't find templates at all");
					return function() { return "" }
				}
			}
		}
	}
);

Backbone._sync = Backbone.sync;

Backbone.sync = function(method, model, options){
	options = options || {};
	var credentials = {};
	if(options.userData){
		credentials = {
			uid: options.userData.uid,
			token: options.userData.token,
			lang: aspe.language
		}
	}else{
		if(!!aspe.app && !!aspe.app.user.get("uid")) {
			credentials = {
				uid: 	aspe.app.user.get("uid"),
				token: 	aspe.app.user.get("token"),
				lang: 	aspe.language
			}
		} else {
			credentials = {
				lang: 	aspe.language
			}
		}
	}
	options.url = (options.url || (model.url && _.result(model, 'url'))) + "?" + _.map(credentials, function(value, key){ return key+"="+value}).join("&");
    return Backbone._sync(method, model, options);
}

$(document).ready(function(){
	_.extend(aspe, Backbone.Events);
	aspe.init();

	// $(document).on('keyup', function(e){console.log(e)})
});
