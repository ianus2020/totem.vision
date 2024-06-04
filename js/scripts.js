$(function(){
	
	/*start sub menu in header*/
	if($('.sub-menu').is('.sub-menu')) {
		$('.header-menu > li.has-child > a').on('click', function(){
			event.preventDefault();
			var sub_menu = $(this).closest('li').find('.sub-menu');
			if(!sub_menu.is(':visible')) {
				sub_menu.slideDown(300);
				$(this).addClass('active');
			}
			else {
				sub_menu.slideUp(300);
				$(this).removeClass('active');
			}
		});
		document.addEventListener('click', function(event) {
			var e = $('.header-menu > li.has-child');
			for(var i=0; i < e.length; i++) {
				if(!e.get(i).contains(event.target)) {
					$(e.get(i)).find('.sub-menu').slideUp('300');
					$(e.get(i)).find('a').removeClass('active');
				}
			}
		});
	}
	/*end sub menu in header*/

	/*start menu mob hide outer click*/
	if($('.header-collapse').is('.header-collapse')) {
		document.addEventListener('click', function(event) {
			var e = $('.header-collapse');
			for(var i=0; i < e.length; i++) {
				if(!e.get(i).contains(event.target)) {
					$(e.get(i)).collapse('hide');
				}
			}
		});
	}
	/*end menu mob hide outer click*/

	/*start timer*/

	function own_timer(end_date, container){
		var countDownDate = new Date(end_date).getTime();

		var x = setInterval(function() {

			var now = new Date().getTime();

			var distance = countDownDate - now;

			var days = Math.floor(distance / (1000 * 60 * 60 * 24));
			var day_text = 'days'
			if(days == 1){day_text = 'day';}
			if(days < 10){days = '0' + days;}
			var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			var hour_text = 'hours'
			if(hours == 1){hour_text = 'hour';}
			if(hours < 10){hours = '0' + hours;}
			var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			if(minutes < 10){minutes = '0' + minutes;}
			var seconds = Math.floor((distance % (1000 * 60)) / 1000);
			if(seconds < 10){seconds = '0' + seconds;}

			container.html("<div class='timer-item timer-item_day'><span class='timer-item__number'>" + days + "</span><span class='timer-item__text'>" + day_text + "</span></div>" + "<div class='timer-item timer-item_hours'><span class='timer-item__number'>" + hours + "</span><span class='timer-item__text'>" + hour_text + "</span></div>"
				+ "<div class='timer-item timer-item_minutes'><span class='timer-item__number'>" + minutes + "</span><span class='timer-item__text'>min</span></div>" + "<div class='timer-item timer-item_seconds'><span class='timer-item__number'>" + seconds + "</span><span class='timer-item__text'>sec</span></div>");

			if (distance < 0) {
				clearInterval(x);
				container.html('EXPIRED');
			}
		}, 1000);
	}

	if($('.global-timer').is('.global-timer')) {
		$('.global-timer').each(function(){
			var date_end = $(this).find('.global-timer-cont').attr('data-date');
			var container_timer = $(this).find('.global-timer-cont');
			own_timer(date_end, container_timer);
		});
	}
	/*end timer*/

	/*start main eco slider*/
	if($('.main-eco-slider').is('.main-eco-slider')) {
		new Swiper(".main-eco-slider .swiper", {
			loop: true,
			navigation: {
				nextEl: ".main-eco-slider .swiper-button-next",
				prevEl: ".main-eco-slider .swiper-button-prev",
			},

			breakpoints: {
				320: {
					slidesPerView: 3,
				},
				768: {
					slidesPerView: 4,
				},
				1430: {
					slidesPerView: 5,
				}
			}
		});
	}
	/*end main eco slider*/

	/*start scroll to element*/
	if($('.anchor').is('.anchor')) {
		$('.anchor').on('click', function(){
			event.preventDefault();
			var id_el_scroll = $(this).attr('href');
			$('html, body').animate({
				scrollTop: $(id_el_scroll).offset().top
			}, 1500);
		});
	}
	/*end scroll to element*/

	/*start show global-top link*/
	if($('.global-top').is('.global-top')) {
		window.onscroll = function(){
			if (window.pageYOffset > $(window).height()) {
				$('.global-top').addClass('active');
			} else {
				$('.global-top').removeClass('active');
			}
		};
	}
	/*end show global-top link*/

	/*start init perfect-scrollbar*/
	if($('.global-ps').is('.global-ps')) {
		var arr_ps = [];
		$('.global-ps').each(function(){
			var id_el = $(this).attr('id');
			var ps = new PerfectScrollbar('#'+id_el, {
				suppressScrollX: true,
			});
			arr_ps.push([id_el, ps]);
		});
	}
	/*end init perfect-scrollbar*/

	$('#modal-rules').on('shown.bs.modal', function (e) {
		if($('#modal-rules .global-ps').is('#modal-rules .global-ps')) {
			var this_el = $('#modal-rules .global-ps').attr('id');
			$.each( arr_ps, function( i ) {
				if(arr_ps[i][0] == this_el){
					arr_ps[i][1].update();
				}
			});
		}
	})

	/*start header lang menu*/
	if($('.header-lang-collapse').is('.header-lang-collapse')) {
		document.addEventListener('click', function(event) {
			var e = $('.header-lang-collapse');
			for(var i=0; i < e.length; i++) {
				if(!e.get(i).contains(event.target)) {
					$(e.get(i)).collapse('hide');
				}
			}
		});
	}
	/*end header lang menu*/

	/*start global-range init*/
	if($('.global-range').is('.global-range')) {
		$('.global-range').each(function(){
			var min = Number($(this).attr('data-min'));
			var max = Number($(this).attr('data-max'));
			var val = Number($(this).attr('data-value'));
			var valuta = $(this).attr('data-valuta');
			var changediv = $(this).attr('data-changediv');
			var input = $(this).find('input[type="hidden"]');
			var handle = $(this).find('.ui-slider-handle');
			$(this).find('.global-range-wrap').slider({
				range: "min",
				value: val,
				min: min,
				max: max,
				create: function() {
					handle.html( '<span>' + $( this ).slider( "value" ) + ' ' + valuta + '</span>' );
				},
				slide: function( event, ui ) {
					input.val( ui.value );
					handle.html( '<span>' + ui.value + ' ' + valuta + '</span>' );
					if(changediv){
						$(changediv).text( ui.value );
					}
				}
			});
			input.val( $(this).find('.global-range-wrap').slider( "value" ) );
			handle.html( '<span>' + $(this).find('.global-range-wrap').slider( "value" ) + ' ' + valuta + '</span>' );
			if(changediv){
				$(changediv).text( $(this).find('.global-range-wrap').slider( "value" ) );
			}
		});
	}
	/*end global-range init*/

	/*start tooltip init*/
	if($('[data-toggle="tooltip"]').is('[data-toggle="tooltip"]')) {
		$('[data-toggle="tooltip"]').tooltip();
	}
	/*end tooltip init*/

	/*start clipboard init*/
	if($('.global-copy__link').is('.global-copy__link')) {
		$('.global-copy__link').on('click', function(){
			event.preventDefault();
			var this_el = $(this);
			setTimeout(function(){
				this_el.tooltip('hide');
			}, 1500);
		});
		new ClipboardJS('.global-copy__link');
	}
	/*end clipboard init*/

});