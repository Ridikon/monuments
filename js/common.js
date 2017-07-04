$(document).ready(function() {

	//Активні кнопки меню
	$("#nav li a").click(function(){
		$(".menu__link-current").removeClass("menu__link-current");//Удаляем класс у прошлого выделенного
		$(this).addClass("menu__link-current");//добовляем класс
	});

	//Таймер обратного отсчета
	//Документация: http://keith-wood.name/countdown.html
	//<div class="countdown" date-time="2015-01-07"></div>
	var austDay = new Date($(".countdown").attr("date-time"));
	$(".countdown").countdown({until: austDay, format: 'yowdHMS'});

	//Попап менеджер FancyBox
	//Документация: http://fancybox.net/howto
	//<a class="fancybox"><img src="image.jpg" /></a>
	//<a class="fancybox" data-fancybox-group="group"><img src="image.jpg" /></a>
	$(".fancybox").fancybox();

	//Навигация по Landing Page
	//$(".top_mnu") - это верхняя панель со ссылками.
	//Ссылки вида <a href="#contacts">Контакты</a>
	$(".top_mnu").navigation();

	//Добавляет классы дочерним блокам .block для анимации
	//Документация: http://imakewebthings.com/jquery-waypoints/
	$(".block").waypoint(function(direction) {
		if (direction === "down") {
			$(".class").addClass("active");
		} else if (direction === "up") {
			$(".class").removeClass("deactive");
		};
	}, {offset: 100});

	//Плавный скролл до блока .div по клику на .scroll
	//Документация: https://github.com/flesler/jquery.scrollTo
	$("a.scroll").click(function() {
		$.scrollTo($(".div"), 800, {
			offset: -90
		});
	});

	/*Вспливаюча форма*/
	$('.popup').magnificPopup();
	/*Кінець вспливаючої форми*/
	/*-----------Каруселька галерея------------*/
	$('.popup-gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			tCounter: '<span class="mfp-counter">%curr%/%total%</span>', // markup of counter
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tCounter: '<span class="mfp-counter">%curr% із %total%</span>', // markup of counter
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
			titleSrc: function(item) {
				return item.el.attr('title') + '<small></small>';
			}
		}
	});
	/*-----------кінець Каруселька галерея------------*/

	/*__________Активні вкладки галереї ____START_____*/
	$('.catalog__menu a').click(function(e) {
		e.preventDefault();
		$('.catalog__menu .catalog__menu-active').removeClass('catalog__menu-active');
		$(this).addClass('catalog__menu-active');
		var tab = $(this).attr('href');
		$('.tab').not(tab).css({'display':'none'});
		$(tab).fadeIn(500);
	});
	/*__________Активні вкладки галереї ____END_____*/

	//Каруселька
	$(".slide-one").owlCarousel({
		items: 1,
		nav:true,
		loop: true,
		autoplay: true,
		navText: ['<span class="cataloge__prev">Назад</span>','<span class="cataloge__next">Наступна</span>'],
	});
	$(".slide-two").owlCarousel({
		items: 1,
		loop: true,
		nav: true,
		autoplay: true,
		navText: ['<img src="images/arrow-left.png" width="18" height="31" alt="arrow-left.png"/>','<img src="images/arrow-right.png" width="18" height="31" alt="arrow-right.png"/>'],
	});
	//Кнопка "Наверх"
	//Документация:
	//http://api.jquery.com/scrolltop/
	//http://api.jquery.com/animate/
	$("#top").click(function () {
		$("body, html").animate({
			scrollTop: 0
		}, 800);
		return false;
	});
	
	//Аякс отправка форм
	//E-mail Ajax Send
    $("form").submit(function() { //Change
        var th = $(this);
        $.ajax({
            type: "POST",
            url: "../mail.php", //Change
            data: th.serialize()
        }).done(function() {
            alert("Дякуємо!");
            setTimeout(function() {
                // Done Functions
                th.trigger("reset");
            }, 1000);
        });
        return false;
    });

	/*Липке меню ___START*/
	var navPos, winPos, navHeight;

	function refreshVar() {
		navPos = $('.header__wrap').offset().top;
		navHeight = $('.header__wrap').outerHeight(true);
	}

	refreshVar();
	$(window).resize(refreshVar);

	$('<div class="clone-header__wrap"></div>').insertBefore('.header__wrap').css('height', navHeight).hide();

	$(window).scroll(function() {
		winPos = $(window).scrollTop();

		if (winPos >= navPos) {
			$('.header__wrap').addClass('fixed shadow');  
			$('.clone-header__wrap').show();
		}  
		else {
			$('.header__wrap').removeClass('fixed shadow');
			$('.clone-header__wrap').hide();
		}
	});
	/*Липке меню ___END*/
	/*mobile menu _____START*/


	$('.header__menu-trigeret').click(function() {
		$('nav ul').slideToggle(300);
  	});//end slide toggle

	$(window).resize(function() {
		if (  $(window).width() > 992 ) {
			$('nav ul').removeAttr('style');
		}
	});//end resize

	
	/*mobile menu _____END*/

	// GO UP BUTTON
	const MAX_HEIGHT = 80;
	const TIME_SCROL = 1000;

	$(window).scroll(function() {
	    if ($(this).scrollTop() > MAX_HEIGHT) {
	        $('.scrollUp').fadeIn();
	    }
	    else {
	        $('.scrollUp').fadeOut();
	    }
	});

	$('.scrollUp').click(function() {
	    $('html, body').animate({
	        scrollTop: 0
	    }, TIME_SCROL);
	    return false;
	});

	// SMOOTH-CSROLL 
	$(function() {
	    $('.smooth').on('click', function(event) {
	        var target = $(this.getAttribute('href'));
	        if (target.length) {
	            event.preventDefault();
	            $('html, body').stop().animate({
	                scrollTop: target.offset().top
	            }, 1000);
	        }
	    });
	});


});