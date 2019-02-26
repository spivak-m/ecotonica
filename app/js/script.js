$(document).ready(function() {

	// SCROLL ON CLICK MENU LINK

	$('.site-nav').on('click', '.site-nav_link', function(e) {
		e.preventDefault();

		var id = $(this).attr('href'),
			top = $(id).offset().top;

		$('body,html').animate({scrollTop: top}, 700);

	});

	// MODALS

	$('.mopen').wmodal();

	// MOBILE MENU

	$('.js-m-menu-open').on('click', function(e) {
		e.preventDefault();
		$('#mobile-menu').addClass('__is-show');
		$('body').css({'overflow-y': 'hidden'});
	});

	$('#mobile-menu').on('click', '.mobile-menu_close', function(e) {
		e.preventDefault();
		$(this).closest('#mobile-menu').removeClass('__is-show');
		$('body').css({'overflow-y': 'auto'});
	});

	// VALIDATION

	$('.js-validate').off().blur( function(){

		var field = $(this);
		var val = $(this).val();

		if( field.hasClass('__tel-or-email') ) {

			var rv_emaiOrlTel = /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}|((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

			if(val != '' && rv_emaiOrlTel.test(val)) {
				$(this).removeClass('__no-valid');
			} else {
				$(this).addClass('__no-valid');
			};

		} else if( field.hasClass('__email') ) {

			var rv_email = /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/;

			if(val != '' && rv_email.test(val)) {
				$(this).removeClass('__no-valid');
			} else {
				$(this).addClass('__no-valid');
			};

		} else if( field.hasClass('__tel') ) {

			var rv_tel = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

			if(val != '' && rv_email.test(val)) {
				$(this).removeClass('__no-valid');
			} else {
				$(this).addClass('__no-valid');
			};

		} else {

			if(val != '') {
				$(this).removeClass('__no-valid');
			} else {
				$(this).addClass('__no-valid');
			};

		}

	}); 

	$('.form').submit(function(e) {

		e.preventDefault();

		if( !$(this).find('.js-validate').val() || $(this).find('.__no-valid').length > 0 ) {
			console.log('unsend');
			$(this).find('.js-validate').each(function(){
				if( !$(this).val() ) { $(this).addClass('__no-valid'); }
			});
		} else {
			var modal = $('#done-msg');

			if( $(this).data('type') == 'get-price' ) {
				modal.find('.modal_title').html('Получить Прайс');
			} else if( $(this).data('type') == 'send-msg' ) {
				modal.find('.modal_title').html('Сообщение отправлено');
			} else {
				modal.find('.modal_title').html('Спасибо за обращение');
			};

			console.log('send');
			//$(this).unbind('submit').submit();
			modal.wmodal();
			return false;
		}

	});

});
