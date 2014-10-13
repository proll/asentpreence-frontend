$(function() {
	var $overlay = $('.overlay'),
		$body = $('body');
	$overlay.find('.overlay__close').on('touchstart click', function(e) {
			if(e && e.preventDefault) {
				e.preventDefault();
			}
			$body.toggleClass('overlay-visible', false);
			return false;
		}
	);

	$('.collection__item-mark-a').on('touchstart click', function(e) {
			if(e && e.preventDefault) {
				e.preventDefault();
			}
			$body.toggleClass('overlay-visible', true);
			return false;
		}
	);

	$('.header__menu').on('touchstart click', function(e) {
			if(e && e.preventDefault) {
				e.preventDefault();
			}
			$body.toggleClass('menu-visible');
			return false;
		}
	);

	// contact - edits
	// consol
	$('.contact__inp').on('touchstart click focus', function(e) {
		var $edit = $(e.currentTarget);
		$edit.attr('placeholder', '');
		return true;
	})
	$('.contact__edit').on('blur', function(e) {
		var $edit = $(e.currentTarget),
			placeholder_text = $edit.attr('placeholdertext');
		$edit.attr('placeholder', placeholder_text);
		return true;
	})
})