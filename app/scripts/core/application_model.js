aspe.App = Backbone.Model.extend({
	_didScroll: false,

	initialize: function () {

		var that = this,
			aspe = window.aspe;

		this.config 	 = new aspe.Config;

		this.dataStorage 	= new aspe.DataStorage;
		aspe.dataStorage 	= this.dataStorage;

		this.statistic = new aspe.Statistic;
		// this.page_description = new aspe.PageDescription;

		this.router = new aspe.Router;
		this.pages 	= new aspe.PagesCollection;


		this.user = new aspe.User;
		aspe.user = this.user;

		
		// GLOBAL objects
		aspe.config = this.config;


		// Pages create
		// 404 page
		this.pages.add(new aspe.Page({
			name:'404',
			template:'pages/404-page'
		}));

		this.pages.add(new aspe.Page({
			name:'403',
			template:'pages/403-page'
		}));

		this.landing = new aspe.LandingPage({
			name: 'landing',
			template: 'pages/landing-page'
		});
		this.pages.add(this.landing);

		// Pages render on route
		this.router.on('404', function () {
			that.pages.getPage('404').render();
		});

		this.router.on('route', function (router, route, params) {
			console.log('route:' + router);

			if(this.router.route_passed > 1) {
				this.statistic.trackCurrentPageChange();
			}
			
			aspe.trigger('route', router, route, params);


			switch (router) {
				case 'er404': 
					this.pages.getPage('404').render();
					break;

				case 'er403':
					this.pages.getPage('403').render();
					break;

				case 'landing':
					this.landing.render();
					break;				

				case 'landing-video':
					this.landing.render({show_video: true});
					break;
				default:
					if(!!route[0] && !this.router.previousWasPopup()) {
					}
					break;
			}

			this.trigger('need:meta:update');
		}, this);

		

		

		// Clear pages - sleep
		this.router.on('reset', function (prev_route, dest_route) {
			console.log(prev_route, dest_route)

			if(!this.router.isPopup(dest_route)) {
				if(!this.router.isPopup(prev_route)) {
					// Magic scroll to top onchange page
					aspe.speedScrollTop(0, 1);
				}

				switch (prev_route) {
					case 'landing':
						console.log('reset:landing');
						this.landing.sleep();
						break;
					case 'landing-video':
						console.log('reset:landing');
						this.landing.sleep();
						break;

					default:
						break;
				}
			}

			// every page sleeps when we quit popup
			if(this.router.isPopup(prev_route)) {
				_.forEach(this.pages.models, function(page, i) {
					if(!!page.sleep && page.get('name') != dest_route) {
						page.sleep();
					}
				})
			}

		}, this);

		// this.on('need:meta:update', function(){
		// 	this.page_description.updateMeta();
		// }, this);


		aspe.on('historyback', function(){
			// TODO: mess with double popups
			if(!aspe.app.router.previousWasPopup()) {
				aspe.navigate(this.router.back_path, {trigger: true});
			} else {
				aspe.navigate('/photofeed', {trigger: true});
			}
		}, this);


		aspe.on('historyback:reload', function(){
			aspe.trigger('historyback');
			window.location.reload();
		}, this);


		aspe.on('auth:clear', function(){
			aspe.navigate('/logout', {trigger: true});
		});



		// this.router.on('reset', function(prev, destination){
		// 	var prevPage = this.pages.getPage(prev)
		// 	if(this.pages.havePage(prev)){
		// 		this.pages.getPage(prev).remove();	
		// 	}
		// }, this);

		






		/**
		 * Global event list
		 */
		// 'twitter:hi', 	{token, uid, secret} - twitter auth success ;
		// 'vkontakte:hi', 	{token, uid} - vkontakte auth success
		// 'vkontakte:linker:hi', {token, uid} - strange sheet from vkontakte;
		this.on('twitter:hi', function (user_obj) {
			this.auth.trigger('twitter:hi', user_obj);
		}, this);

		this.on('vkontakte:hi', function (user_obj) {
			this.auth.trigger('vkontakte:hi', user_obj);
		}, this);

		/**
		 * Global event casting
		 */

		/**
		 * USER AUTH EVENTS
		 */

		this.user.on('user:error', function(err){
			aspe.trigger('auth:clear');
		}, this)


		


		/**
		 * Scroll handler
		 */
		var $win = $(window),
			$doc = $(document);

		$(window).scroll(function(){
			var s_top = $win.scrollTop(),
				d_h = $doc.height(),
				w_h = $win.height();
			aspe.trigger('scroll', {
				s_top: s_top,
				d_h: d_h,
				w_h: w_h
			});
			if( s_top+150 >= (d_h - w_h) ) {
				aspe.trigger('pagebottom:reached');
			}
		});


		/**
		 * APPLICATION READY
		 */
		aspe.trigger('app:init');
	}
});
