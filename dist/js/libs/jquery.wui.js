// modal open
(function($) {
	function wmodalSet(o){
		return $.extend({
			modal: '.modal_container',
			over: '.modal',
			close: '.modal_close',
			animate: 1,
			animateOpen: 'fadeInDown',
			animateClose: 'fadeOutDown',
			closeOther: 1,
		}, o);
	}
	function wmodalOpen(e, o){
		var e = typeof e == 'string' ? $(e) : $($(e).attr('href')),
			over = e.closest(o.over);
		if (o.closeOther && $('body').css('overflow-y') == 'hidden'){
			$(o.modal).fadeOut('fast');
			$(o.over).fadeOut('fast');
		}
		if (e.length > 0)
			$('body').css({'overflow-y': 'hidden'});
		over.click(function(ev) {
			var	el = ev.target || window.event.target;
			if (this == el){
				wmodalClose(e, o);
				return false;
			}
		})
		over.find(o.close).click(function() {
			wmodalClose(e, o);
			return false;
		})
		over.fadeIn('fast', function(){
			e.removeAttr('style').removeClass(o.animateClose).fadeIn().addClass('is-active '+o.animateOpen);
		})
	}
	function wmodalClose(e, o){
		var e = $(o.modal),
			over = $(o.over);
		$('body').css({'overflow-y': 'auto'});
		e.removeClass('is-active '+o.animateOpen).addClass(o.animateClose);
		e.fadeOut('fast',function(){
			over.fadeOut('fast');
		})
	}
	$.fn.wmodal = function(s){
		var o = wmodalSet(s),
			sel = typeof this.selector != 'undefined' ? this.selector : s;
		o.animateOpen = o.animate ? 'animated '+o.animateOpen : '';
		o.animateClose = o.animate ? 'animated '+o.animateClose : '';
		if (typeof s == 'string' && s == 'close')
			wmodalClose(sel, o);
		else if (typeof sel == 'string' && sel.charAt(0) == '#' && this.length > 0)
			wmodalOpen(sel, o);
		else 
			$(this).click(function(){
				wmodalOpen(this, o);
				return false;
			})
		if (location.hash.length > 0 && $(location.hash).hasClass(o.modal.replace(/\./g,'')))
			wmodalOpen(location.hash, o);
	}
})(jQuery);

// modal informer
(function($) {
	$.fn.wmodalinf = function(options){
		var o = $.extend({
				event: 'hover',
				modal: '.w-modalinf',
				close: '.w-modalinf_close',
				animate: 0,
				animateOpen: 'fadeInDown',
				animateClose: 'fadeOutDown',
				delay: 200,
				timer: null
			}, options);
		o.animateOpen = o.animate ? 'animated '+o.animateOpen : '';
		o.animateClose = o.animate ? 'animated '+o.animateClose : '';
		$(this).each(function(){
			var e = $(this),
				mod = e.find(o.modal).length > 0 ? e.find(o.modal) : e.siblings(o.modal);
			mod.hide();
			if (o.event == 'hover'){
				e.hover(function(){
					wmodalInfShow(e, o);
				}, function(){
					wmodalInfHide(e, o);
				})
				e.siblings(o.modal).hover(function(){
					if (o.timer != null)
						clearInterval(o.timer);
				}, function(){
					wmodalInfHide(e, o);
				})
			} else {
				$(this).on(o.event, function(){
					wmodalInfShow(e, o);
					return false;
				})
			}
		});
		if (o.event != 'hover')
			wmodalInfWclick(o);
		function wmodalInfShow(e, o){
			var mod = e.find(o.modal).length > 0 ? e.find(o.modal) : e.siblings(o.modal);
			$('.is-open + ' + o.modal).each(function(){
				if (this != mod[0])
					wmodalInfClose($(this).siblings('.is-open'), o);
			})
			if (mod.length > 0 && o.event != 'hover' && e.hasClass('is-open'))
				wmodalInfClose(e, o);
			else if (mod.length > 0){
				e.addClass('is-open');
				mod.removeClass(o.animateClose).fadeIn('fast').addClass(o.animateOpen).find(o.close).click(function() {
					wmodalInfClose(e, o);
					return false;
				})
			}else return false;
		}
		function wmodalInfHide(e, o){
			var mod = e.find(o.modal).length > 0 ? e.find(o.modal) : e.siblings(o.modal);
			o.timer = setTimeout(function(){
				 wmodalInfClose(e, o);
			}, o.delay);
		}
		function wmodalInfClose(e, o){
			var mod = e.find(o.modal).length > 0 ? e.find(o.modal) : e.siblings(o.modal);
			e.removeClass('is-open');
			mod.removeClass(o.animateOpen).addClass(o.animateClose).fadeOut('fast');
		}
		function wmodalInfWclick(o){
			if(navigator.userAgent.match(/(iPad|iPhone|iPod)/g))
				$('body').css({'cursor': 'pointer', '-webkit-tap-highlight-color': 'rgba(0, 0, 0, 0)'});
			$(document).on('click', function(ev) {
				var ev = ev || window.event,
					el = ev.target;
				if ($(el).closest(o.modal).length == 0 && $(el).siblings(o.modal).length == 0 && $(el).parent().length > 0)
					$(o.modal).fadeOut('fast').siblings('.is-open').removeClass('is-open');
			})
		}
	}
})(jQuery);