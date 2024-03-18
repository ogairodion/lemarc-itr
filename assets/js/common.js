jQuery.expr[':'].contains = function(a, i, m) {
	return jQuery(a).text().toUpperCase()
		.indexOf(m[3].toUpperCase()) >= 0
}
$(document).ready(function() {
	const header = document.querySelector('header');
	const headerTop = header.querySelector('.top .inner');
	const headerMain = header.querySelector('.main-row .inner');
	const menuTop = headerTop.querySelector('.menu');
	const menu = headerMain.querySelector('.menu');
	const catalogBtn = header.querySelector('.catalog-btn');
	const catalog = header.querySelector('.catalog');
	const favorites = header.querySelector('.favorites');
	const cart = header.querySelector('.cart');
	const search = header.querySelector('.search');
	const headerMobileContent = header.querySelector('.header-mobile__content');
	const headerMobileSearch = header.querySelector('.header-mobile__search');
	const actions = header.querySelector('.actions');
	const burger = document.querySelector('.burger');

	const lkExit = document.querySelector('#lk .exit');
	const lkNews = document.querySelector('#lk .email');
	const lkMobile = document.querySelector('#lk .lk-mobile');
	const lkLayoutExit = document.querySelector('#lk .layout-main ul');
	const lkLayoutEmail = document.querySelector('#lk .layout-main aside');

	let windowWidth = 0;

	windowWidth = window.innerWidth;
	adaptiveMenu();

	if (lkMobile) {
		adaptiveLk();
	}

	window.addEventListener('resize', () => {
		windowWidth = window.innerWidth

		adaptiveMenu();

		if (lkMobile) {
			adaptiveLk();
		}
	});

	function adaptiveMenu() {
		switch (true) {
			case windowWidth < 959 && !headerMobileSearch.contains(search):
				headerMobileContent.append(catalogBtn);
				headerMobileContent.append(catalog);
				headerMobileContent.append(menu);
				headerMobileContent.append(favorites);
				headerMobileContent.append(cart);
				headerMobileContent.append(menuTop);
				headerMobileSearch.append(search);
				break;
			case windowWidth >= 960 && headerMobileSearch.contains(search):
				headerMain.append(catalogBtn);
				header.append(catalog);
				headerMain.append(menu);
				actions.append(favorites);
				actions.append(cart);
				headerTop.append(menuTop);
				headerMain.append(search);

				header.classList.remove('open');
				break;
		}
	}

	function adaptiveLk() {
		switch (true) {
			case windowWidth < 959 && !lkMobile.contains(lkExit):
				lkMobile.append(lkNews);
				lkMobile.append(lkExit);
				break;
			case windowWidth > 959 && lkMobile.contains(lkExit):
				lkLayoutEmail.append(lkNews);
				lkLayoutExit.append(lkExit);
				break;
		}
	}

	burger.addEventListener('click', () => {
		header.classList.toggle('open');
	});

	if (window.Scrollbar) {
		Scrollbar.initAll();
	}

	$("a.anchor").click(function(event) {
		event.preventDefault();
		const id = $(this).attr('href'),
			top = $(id).offset().top - 160;
		$('body,html').animate({
			scrollTop: top
		}, 1000);
	});
	if ($('#office-auth-form').length) {

		$('.forgot_pass').click(function() {
			$('.office-auth-login-wrapper h4').html('Сброс пароля');
			$('#office-login-form-password').val('');
			$('#office-login-form-password').parent().slideUp();
			$('.needreg').slideUp();
			$('#office-auth-form .btn-login').html('Сбросить пароль').addClass('resetpass');
			$(this).hide();
		});
		$('.needreg').click(function() {
			$('.office-auth-login-wrapper').toggle();
			$('.office-auth-register-wrapper').toggle();
		});
		$('.tologin').click(function() {
			$('.office-auth-register-wrapper').hide();
			$('.office-auth-login-wrapper').show();
			$('.social-login-block').show();
			$('.auth-nav *').toggleClass('active');
		});
		$('.toregister').click(function() {
			$('.office-auth-login-wrapper').hide();
			$('.social-login-block').hide();
			$('.office-auth-register-wrapper').show();
			$('.auth-nav *').toggleClass('active');
		});
		if (location.hash == '#office-auth-form') {
			$.fancybox({
				helpers: {
					media: true
				},
				padding: 0,
				margin: 0,
				fitToView: true,
				width: "100%",
				height: "100%",
				autoSize: false,
				scrolling: false,
				afterLoad: function() {
					$(".fancybox-inner").addClass('no-radius');
					$(".fancybox-outer").addClass('big');
				},
				href: '#office-auth-form'
			});
		}
	}

	if ($('.popup-wrap').length) {
		var wrap = $('.popup-wrap');
		var date;
		$('.popup-wrap .fade').click(function() {
			wrap.removeClass('toggled');
		});
		$('.popup-wrap .close').click(function() {
			wrap.removeClass('toggled');
		});
	}

	$('.options-filter input').on('input', function() {
		$(`.filter-options label`).hide()
		$(`.filter-options span:contains(${$(this).val()})`).parent().show()
	})

	$(".catalog-btn").click(function() {
		$(this).toggleClass('opened');
		$('#catalog-menu').toggleClass('opened')

		$('.header-mobile__content').addClass('levels');

		if ($('.header-mobile__content').hasClass('levels')) {
			$('.header-mobile__top').removeClass('hidden');
		} else {
			$('.header-mobile__top').addClass('hidden');
		}
	});

	$('.oil-selection-link').click(function() {
		if (windowWidth < 960) {
			$('ul', $(this)).addClass('open');

			$('.header-mobile__content').addClass('levels');

			if ($('.header-mobile__content').hasClass('levels')) {
				$('.header-mobile__top').removeClass('hidden');
			} else {
				$('.header-mobile__top').addClass('hidden');
			}
		}
	});

	$('.tab-name').click(function() {
		if (windowWidth < 960) {
			$('ul', $(this).parent()).addClass('open');

			$('.header-mobile__content').addClass('levels');

			if ($('.header-mobile__content').hasClass('levels')) {
				$('.header-mobile__top').removeClass('hidden');
			} else {
				$('.header-mobile__top').addClass('hidden');
			}
		}
	});

	$('.tab-name').click(function() {
		if (windowWidth < 960) {
			$('ul', $(this).parent()).addClass('open');

			$('.header-mobile__content').addClass('levels');

			if ($('.header-mobile__content').hasClass('levels')) {
				$('.header-mobile__top').removeClass('hidden');
			} else {
				$('.header-mobile__top').addClass('hidden');
			}
		}
	});

	$('.subtab-name').click(function() {
		if (windowWidth < 960) {
			$('ul', $(this).parent()).addClass('open');

			$('.header-mobile__content').addClass('levels');

			if ($('.header-mobile__content').hasClass('levels')) {
				$('.header-mobile__top').removeClass('hidden');
			} else {
				$('.header-mobile__top').addClass('hidden');
			}
		}
	});

	$('.header-mobile__arrow').click(function() {
		const subs1 = $('.sub1 .open');
		const subs2 = $('.sub2 .open');

		switch (true) {
			case subs2.length > 0 && subs1.length > 0:
				$(subs2[0]).removeClass('open');
				break;
			case subs2.length <= 0 && subs1.length > 0:
				$(subs1[0]).removeClass('open');
				break;
			case subs2.length <= 0 && subs1.length <= 0:
				$('.catalog').removeClass('opened');
				$('.catalog-btn').removeClass('opened');
				$('ul').removeClass('open');
				$('.header-mobile__top').addClass('hidden');
				$('.header-mobile__content').removeClass('levels');
				break;
		}
	})

	$('#auth-toggler').click(() => {
		authapp.open()
	})

	$('#genuine .header, .faq-list .header').click(function() {
		$('#genuine .header').removeClass('active')
		$(this).toggleClass('active')
	})
	$('#genuine .image .point').click(function() {
		$('#genuine .header').removeClass('active')
		$('#genuine .header[data-id="' + $(this).attr('data-id') + '"]').addClass('active')
	})
	$(document).on('click', '.product-card .favorite', function(e) {
		$(this).toggleClass('active')
	})
	$(document).on('click', '.category-switch .item', function(e) {
		$('.category-switch .item').removeClass('active')
		$(this).toggleClass('active')
	})

	if ($('.category-switch-slider').length) {
		const categorySlider = new Swiper('.category-switch-slider', {
			slidesPerView: 'auto',
			freeMode: true,
		});
	}

	if ($('.parameters-slider').length) {
		const parametersSlider = new Swiper('.parameters-slider', {
			slidesPerView: 'auto',
			freeMode: true,
			scrollbar: {
				el: '.parameters-description .parameters-scrollbar',
				draggable: true,
			}
		});
	}

	if ($('.selection-slider').length) {
		const selectionSlider = new Swiper('.selection-slider', {
			slidesPerView: 'auto',
			spaceBetween: 8,
		});
	}

	if ($('.breadcrumbs-slider').length) {
		const breadcrumbsSlider = new Swiper('.breadcrumbs-slider', {
			slidesPerView: 'auto',
			freeMode: true,
			resistance: true,
			resistanceRatio: 0,
		});

		breadcrumbsSlider.slideTo($('.breadcrumbs-slider .swiper-slide').length);
	}

	if ($('.filters-mobile__main')) {
		$('.filters-mobile__main').click(function() {
			$('.filters').addClass('open');
			$('.filters-mobile').hide();
			$('.filters-more').show();
		});
	}

	if ($('.filters__burger')) {
		$('.filters__burger').click(function() {
			$('.filters').removeClass('open');
			$('.filters-mobile').show();
			$('.filters-more').hide();
		});
	}

	$(document).on('mse2_load', function() {
		$('#mse2_sort .selected').html($('#mse2_sort .sort.active').html())
	});

	$(".custom-select.no-vue .toggler").click(function() {
		$(this).parent().toggleClass('open')
	})
	$(".custom-select.no-vue .selected").click(function() {
		$(this).parent().toggleClass('open')
	})
	$(".custom-select.no-vue").blur(function() {
		$(this).removeClass('open')
	})
	$('#mse2_filters fieldset h4').click(function() {
		$(this).toggleClass('closed')
	})

	// Страница товара

	if ($('#product').length) {
		$('.product-to-cart .amount span').html($('.product-to-cart input[name=count]').val())
		$('.tocart-btn').click(function() {
			const newval = +$('.product-to-cart input[name=count]').val() + +$(this).attr('data-delta')
			if (newval > 0) {
				$('.product-to-cart input[name=count]').val(newval)
				$('.product-to-cart .amount span').html($('.product-to-cart input[name=count]').val())
			}
		})
	}

	$(document).on('click', '.product-to-cart .favorite', function(e) {
		$(this).toggleClass('active')
	})

	// cart

	if ($('#cart').length) {
		$('.overall').each(function() {
			const val = +$(this).attr('data-price') * $(this).parent().parent().parent().find('input[name=count]').val()
			$(this).attr('data-price') * $(this).parent().parent().parent().find('.amount span').html($(this).parent().parent().parent().find('input[name=count]').val())
			$(this).find('span').html(val.toLocaleString())
		})
		$('.addcart-btn').click(function() {
			const newval = +$(this).parent().parent().find('input[name=count]').val() + +$(this).attr('data-delta')
			if (newval > 0) {
				$(this).parent().parent().find('input[name=count]').val(newval)
				$(this).siblings('.amount').find('span').html(newval)
				$(this).closest('tr').find('.overall span').html((newval * $(this).closest('tr').find('.overall').attr('data-price')).toLocaleString())
			}
		})

		function scrollToId(id) {
			$([document.documentElement, document.body]).animate({
				scrollTop: $("#" + id).offset().top - 100
			}, 500)
		}
		$('.cart-ready').click(function() {
			$('#cart').hide()
			$('#place-order').show()
			scrollToId('place-order')
		})
		$('.overall-order').click(function() {
			$('#cart').show()
			$('#place-order').hide()
			scrollToId('cart')
		})

		// fio
		$('[name=ln],[name=fn],[name=mn]').on('input', () => {
			$('[name=receiver]').val(`${$('[name=ln]').val()} ${$('[name=fn]').val()} ${$('[name=mn]').val()}`)
		})

		$('[name=delivery]').on('change', () => {
			const delivery = $('[name=delivery]:checked').val()
			if (delivery == 1) {
				$('.pvz').fadeIn()
				$('.client-address').hide()
			} else {
				$('.pvz').hide()
				$('.client-address').fadeIn()
			}
		})
	}

	// service

	if ($('#service').length) {
		const tabs = ['delivery', 'payment', 'return', 'faq']
		const query = new URLSearchParams(window.location.search)
		let section = 'delivery'
		if (query.has('section') && tabs.includes(query.get('section'))) {
			section = query.get('section')
		}
		$(`[data-for=${section}]`).addClass('active')
		$(`[data-target=${section}]`).addClass('active')
		$('aside .button-rounded').click(function() {
			if (history.pushState) {
				const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + `?section=` + $(this).attr('data-for');
				window.history.pushState({
					path: newurl
				}, '', newurl);
			}
			$('aside .button-rounded').removeClass('active');
			$('.content .section').removeClass('active');
			$(this).addClass('active')
			$(`[data-target=${$(this).attr('data-for')}]`).addClass('active')
		})
	}

	if ($('#main-banner .slider').length) {
		const mainBannerSlider = new Swiper('#main-banner .slider', {
			slidesPerView: 1,
			autoplay: {
				delay: 2500,
				disableOnInteraction: false,
			},
			navigation: {
				nextEl: "#main-banner .swiper-button-next",
				prevEl: "#main-banner .swiper-button-prev",
			},
			pagination: {
				el: "#main-banner .slider-pagination",
				clickable: true,
				renderBullet: function(i, className) {
					return `
					<button class="${className}">
						<svg class="progress" width="16" height="16"><circle class="circle-origin" r="7" cx="8" cy="8"></circle></svg></span>
					</button>
					`;
				},
			},
			speed: 1500,
		});
	}
	// slick удален
	// if ($('.article-slider').length) {
	// 	$('.article-slider').slick({
	// 		infinite: true,
	// 		slidesToShow: 1,
	// 		slidesToScroll: 1,
	// 		swipeToSlide: true,
	// 		autoplay: true,
	// 		autoplaySpeed: 5000,
	// 		speed: 1500,
	// 		arrows: true,
	// 		dots: true,
	// 	})
	// }
	$('footer .dropdown').click(function() {
		$(this).toggleClass('open');
	});
	// dadata + ymaps
	if (window?.ymaps && $('#place-order').length) {
		ymaps.ready(() => {

			$(".client-address .dadata-input input").suggestions({
				token: '70459346f866f68a3b0a4c947cb5114045564096',
				type: "ADDRESS",
				hint: false,
				formatResult: formatResult,
				formatSelected: formatSelected,
				onSelect: function(suggestion) {
					console.log($('[name=address_full]').val())
				}
			})

			$('.switcher .tab').click(function(el) {
				$('.switcher .tab').removeClass('active');
				$(this).addClass('active')
				if ($(this).attr('data-mode') == 'list') {
					$('.pvz-list').fadeIn()

					if (windowWidth < 959) {
						$('#map').hide();
					}
				} else {
					$('.pvz-list').fadeOut()

					if (windowWidth < 959) {
						$('#map').show();
					}
				}
			})

			const defaultFormatResult = $.Suggestions.prototype.formatResult;

			function formatResult(value, currentValue, suggestion, options) {
				const newValue = suggestion.data.city;
				suggestion.value = newValue;
				return defaultFormatResult.call(this, newValue, currentValue, suggestion, options);
			}

			function formatSelected(suggestion) {
				return suggestion.data.city;
			}

			//map

			$(document).on('click', '.pvz-list .tr', function() {
				selectPVZ($(this).attr('data-id'))
			})
			$(document).on('click', '.pvz-info .button-rounded', function() {
				$('[name=order_pvz_id]').val($(this).parent().attr('data-id'))
				$(this).parent().addClass('selected')
			})
			$(document).on('click', '.pvz-info .btn-red', function() {
				$('[name=order_pvz_id]').val(null)
				$(this).parent().removeClass('selected')
				clearMap()
				if ($('.tab[data-mode=list]').hasClass('active')) {
					$('.pvz-list').fadeIn()
				}
			})
			$('.shadow').click(function() {
				clearMap();
			});

			$('.pvz .burger').click(function() {
				clearMap();
			});

			const selectedLayout = ymaps.templateLayoutFactory.createClass('<div class="placemark_layout_container"><img src="/assets/img/icons/map-marker.svg" width=48 height=55/></div>');

			ymaps.ready(init);

			function init() {
				const myMap = new ymaps.Map("map", {
					center: [55.76, 37.64],
					controls: [],
					zoom: 10
				}, {})
				const opts = {
					iconLayout: 'default#image',
					iconImageHref: '/assets/img/icons/map-marker.svg',
					hideIconOnBalloonOpen: false,
					openBalloonOnClick: false
				}
				const pointsLayer = new ymaps.GeoObjectCollection({}, opts);
				myMap.geoObjects.add(pointsLayer)
				myRectangle = new ymaps.Rectangle([
					[0, 0],
					[179, 179]
				], {}, {
					fillColor: '#000',
					fillOpacity: 0.8
				});
				myMap.geoObjects.events.add('click', function(e) {
					if (e.get('target').geometry.getType() === 'Rectangle') {
						clearMap()
						return
					}
					selectPVZ(e.get('target').properties.getAll().balloonContent);
				})
				window.cartMap = myMap
				window.cartMap.rect = myRectangle
				window.cartMap.opts = opts
				window.cartMap.pointsLayer = pointsLayer
				updateMap()
			}

			const cities = [
				[{
						address: 'Смоленск, ул Ново-Московская, д. 2/8',
						coords: [55.684758, 37.738521],
						workhours: 'с 9:00 до 21:00',
						ready: '25 Декабря',
						id: 1
					},
					{
						address: 'Смоленск, ул Ново-Московская, д. 3/8',
						coords: [55.833436, 37.715175],
						workhours: 'с 9:00 до 21:00',
						ready: '26 Декабря',
						id: 2
					},
					{
						address: 'Смоленск, ул Ново-Московская, д. 4/8',
						coords: [55.687086, 37.529789],
						workhours: 'с 9:00 до 21:00',
						ready: '22 Декабря',
						id: 3
					},
					{
						address: 'Смоленск, ул Ново-Московская, д. 5/8',
						coords: [55.787086, 37.529789],
						workhours: 'с 9:00 до 21:00',
						ready: '22 Декабря',
						id: 4
					},
				],
				[{
						address: 'Смоленск, ул Ново-Московская, д. 2/8',
						coords: [55.782392, 37.614924],
						workhours: 'с 9:00 до 21:00',
						ready: '25 Декабря',
						id: 1
					},
					{
						address: 'Смоленск, ул Ново-Московская, д. 3/8',
						coords: [55.642063, 37.656123],
						workhours: 'с 9:00 до 21:00',
						ready: '26 Декабря',
						id: 2
					},
				],
			]

			let currentCity = 0
			let cityData = cities[currentCity]
			window.cityData = cityData
			updatePVZlist()
			$(".pvz .dadata-input input").suggestions({
				token: '70459346f866f68a3b0a4c947cb5114045564096',
				type: "ADDRESS",
				hint: false,
				bounds: "city",
				constraints: {
					locations: {
						city_type_full: "город"
					}
				},
				formatResult: formatResult,
				formatSelected: formatSelected,
				onSelect: function(suggestion) {
					currentCity = (currentCity + 1) % 2
					cityData = cities[currentCity]
					updatePVZlist()
					updateMap()
				}
			})

			function clearMap() {
				window.cartMap.pointsLayer.each((el) => {
					el.options.set({
						iconLayout: 'default#image'
					})
				})
				window.cartMap.geoObjects.remove(window.cartMap.rect)
				$('#map').removeClass('shaded')
				$('.pvz-info').fadeOut()
				$('.shadow').hide();
			}

			function selectPVZ(id) {
				let target
				window.cartMap.pointsLayer.each((el) => {
					if (el.properties.getAll().balloonContent == id) {
						el.options.set({
							iconLayout: selectedLayout,
						})
						target = el
					} else {
						el.options.set({
							iconLayout: 'default#image'
						})
					}
				})
				window.cartMap.panTo([target.geometry.getCoordinates()[0], target.geometry.getCoordinates()[1] + 0.2]);
				$('#map').addClass('shaded')
				if (window.cartMap.geoObjects.indexOf(window.cartMap.rect) === -1) {
					window.cartMap.geoObjects.add(window.cartMap.rect)
				}

				const selected = cityData.find((el) => el.id == id)
				$('.pvz-info').attr('data-id', selected.id)
				$('.pvz-info .pvz-address').html(selected.address)
				$('.pvz-info .pvz-time').html(selected.workhours)
				$('.pvz-info .pvz-delivery').html(selected.ready)
				$('.pvz-info').css("display", "flex").hide().fadeIn();
				$('.pvz-list').fadeOut()

				if (windowWidth < 959) {
					$('.shadow').show();
				}
			}

			function updateMap() {
				$('[name="order_pvz_id"]').val(null)

				window.cartMap.pointsLayer.removeAll()
				if (window.cartMap.geoObjects) {
					window.cartMap.geoObjects.remove(window.cartMap.rect)
					$('#map').removeClass('shaded')
				}

				for (const point of cityData) {
					window.cartMap.pointsLayer
						.add(new ymaps.Placemark(point.coords, {
							balloonContent: point.id,
						}, window.cartMap.opts))
				}
				window.cartMap.setBounds(window.cartMap.geoObjects.getBounds())
				window.cartMap.setZoom(window.cartMap.getZoom() - 1)
			}

			function updatePVZlist() {
				$('.pvz-list .tbody .tr').empty()
				let template
				for (const point of cityData) {
					template = $("#pvz-list-template").clone();
					template.removeAttr("id");
					template.attr('data-id', point.id);
					template.appendTo(".pvz-list .tbody .scroll-content");
					template.find('.name').html(point.address)
					template.find('.ready').html(point.ready)
					template.find('.time span').html(point.workhours)
				}
			}
		})
	}

	// lk 
	$('.over').click(function () {
		const parent = $(this).closest('.order-card');
		const full = $('.full', $(parent));
		const short = $('.short', $(parent));
		const shadow = $('.shadow', $(parent));

		if (windowWidth >= 960) {
			full.toggle();
			short.toggle();
		} else {
			full.toggle();
			shadow.toggle();
		}
	});

	$('.order-card .toggle').click(function () {
		const parent = $(this).closest('.order-card');
		const full = $('.full', $(parent));
		const short = $('.short', $(parent));
		const shadow = $('.shadow', $(parent));

		if (windowWidth >= 960) {
			full.toggle();
			short.toggle();
		} else {
			full.toggle();
			shadow.toggle();
		}
	});

	$('.order-card .shadow').click(function () {
		const parent = $(this).closest('.order-card');
		const full = $('.full', $(parent));

		full.hide();
		$(this).hide();
	});

	$('.order-card .bottom-more').click(function () {
		const parent = $(this).closest('.order-card');
		const full = $('.full', $(parent));
		const shadow = $('.shadow', $(parent));

		full.toggle();
		shadow.toggle();
	});

	$('.order-card .burger').click(function () {
		const parent = $(this).closest('.order-card');
		const full = $('.full', $(parent));
		const shadow = $('.shadow', $(parent));

		full.hide();
		shadow.hide()
	});

	// catalog 
	$('.filters-mobile__sort').click(function () {
		$('#mse2_sort').toggle();
		$('.shadow').toggle();
	});

	$('#mse2_sort .burger').click(function () {
		$('#mse2_sort').toggle();
		$('.shadow').toggle();
	});

	$('#catalog .shadow').click(function () {
		$('#mse2_sort').toggle();
		$('.shadow').toggle();
	});
});