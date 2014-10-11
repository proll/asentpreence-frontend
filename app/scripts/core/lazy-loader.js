aspe.LazyLoader = Backbone.Model.extend({


	onImageLoad: function () {
		var $this = $(this);
		$this.parents('.load-bg')
			.toggleClass('img-loaded', true);

		if(!$this.data('bg')) {
			$this.attr('src', $this.data('orig'));
		} else {
			$this.css({
				'background-image': 'url('+ $this.data('orig') +')'
			});
		}
	},

	onImageLoad0: function (e) {
		var img = e.srcElement;
		var $this = $(this);
		$this.parents('.load-bg')
			.toggleClass('img-loaded', true);

		if(!$this.data('bg')) {
			$this.attr('src', $this.data('smpl'));
		} else {
			$this.css({
				'background-image': 'url('+ $this.data('smpl') +')'
			});
		}


		img.onload = _.bind($this.data('handler'), $this);
		img.src = $this.data('orig');
	},

	onImageError: function () {
		this.trigger('load:error');
	},

	load: function ($image_cont) {
		var $images = $image_cont.find('img.lazy'),
			_this = this;

		_.forEach($images, function(el, index) {
			var $el = $(el);
			if(!$el.data('smpl')) {
				var image = new Image();
					image.src = $el.data('orig');
					image.onload = _.bind(_this.onImageLoad, $el);
					image.onerror = _.bind(_this.onImageError, _this);
			} else {
				var image0 = new Image();
					image0.src = $el.data('smpl');
					$el.data('handler', _this.onImageLoad);
					image0.onload = _.bind(_this.onImageLoad0, $el);
					image0.onerror = _.bind(_this.onImageError, _this);
			}

		})
	}
});