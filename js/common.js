jQuery(function() {
	jQuery(document).ready(function() {

		function headerHandler() {
			var _self = this,
					$searchField = $('.header-search__label'),
					$window = $(window),
					$header = $('.header'),
					$burger = $('.header-burger'),
					headerHeight = $header.height(),
					$search = $('.header-search'),
					$body = $('.md-body'),
					$html = $('.md-html'),
					$cover = $('.md-cover'),
					$menu = $('.header-menu'),
					$regButton = $('.header-enter-popup #reg-button'),
					$enterButton = $('.header-enter-popup #enter-button'),
					$favourites = $('.header-favourites'),
					$favButton = $('.header-favourites a');

			this.init = function() {
				this.events();
				this.scrollDetect();
			},
			this.events = function() {
				$search.on('click', this.searchClick);
				$body.on('click', this.bodyClick);
				$regButton.on('click', this.regClick);
				$enterButton.on('click', this.enterClick);
				// $favourites.on('mouseleave', this.favOut);
				$window.on('scroll', this.winScroll);
				$burger.on('click', this.burgerClick);
				$favButton.on('click', this.favClick);

			},
			this.searchClick = function(e) {
				e.stopPropagation();
				_self.coverShow();
				_self.searchShow();

				// $menu.addClass('invisible');
				return false;
			},
			this.bodyClick = function() {
				_self.coverHide(); 
				_self.searchHide(); 
				_self.closeFavourites(); 
			},
			this.searchShow = function() {
				$searchField.fadeIn();
				$html.addClass('header-search-open');
			},
			this.searchHide= function() {
				$searchField.fadeOut();
				$html.removeClass('header-search-open');
			},
			this.coverShow = function() {
				$html.addClass('cover-in');
			},
			this.coverHide = function() {
				$html.removeClass('cover-in');
			},

			this.regClick = function() {
				$(this).closest('.header-popup')
					.addClass('autorization');
				// var $parent = $(this).closest('.md-form');

				// $parent.fadeOut(function() {
				// 	$parent.siblings('.md-form').fadeIn();
				// });
				return false;
			},

			this.enterClick = function() {
				$(this).closest('.header-popup')
					.removeClass('autorization');
				return false;
			},
			this.favOut = function() {
				$('.header-enter-popup').removeClass('autorization');
				_self.closeFavourites();
			},
			this.winScroll = function() {
				if($(this).scrollTop() > headerHeight){
					$html.addClass('header-scroll');
				}else{
					$html.removeClass('header-scroll');
					$html.removeClass('header-expanded');
					_self.closeFavourites();
				}
			},
			this.scrollDetect = function() {
				if($(window).scrollTop() > headerHeight){
					$html.addClass('header-scroll');
				}
			},
			this.burgerClick = function() {
				$html.toggleClass('header-expanded cover-in');
			},
			this.favClick = function() {
				if($html.hasClass('header-expanded')){
					$('html, body').animate({scrollTop: 0}, 800, function(){
						setTimeout(function() {
							_self.openFavourites();

						}, 1000);
					});
					return false;
					
				}
			},
			this.openFavourites = function() {
				$html.addClass('favourites-open');
			}
			this.closeFavourites = function() {
				$html.removeClass('favourites-open');
			}
		}

		var handler = new headerHandler();
		handler.init();

		// main-slider
			if($('.main-slider').length > 0){
				$('.main-slider').slick({
					dots: true,
					fade: true,
					speed: 600,
					arrows: true
				});
				
			}
		// end main-slider

		// scroll to anchores
			$('.md-anchor-link').click(function(e){
				e.preventDefault();
				var location = $(this).attr('href'), //секция с id, равным href текущей ссылки
					sectionCoord = $(location).offset().top;
				$('html, body').animate({scrollTop: sectionCoord - 103}, 800);
			});
		// end scroll to anchores

		// cards-slider

			if($('.cards-slider').length > 0){
				$('.cards-slider').each(function(i, elem) {
					var $th = $(elem),
						$slider = $th.find('.cards-slider__carousel'),
						slidesLength,
						$slidesOveral = $th.find('.slides-overal'),
						$slidesCurrent = $th.find('.slides-current');

					$($slider).on('init', function(event, slick, direction){
						slidesLength = slick.$slides.length;
						$slidesOveral.text(slick.$slides.length);
						$slidesCurrent.text(slick.currentSlide + 1);
					});

					$($slider).on('afterChange', function(event, slick, currentSlide, nextSlide){
					  $slidesCurrent.text(currentSlide + 1);
					});

					$($slider).on('lazyLoaded', function (e, slick, image, imageSource) {
						
					 	image.parent().css('background-image', 'url("' + imageSource + '")');
					  	image.hide(); 
					 	// image.parent().find('.md-photo-preloader').hide();
					});

					$($slider).slick({
						rows: 2,
						slidesToScroll: 1,
						slidesPerRow: 4,
						lazyLoad: 'ondemand',
						prevArrow: $th.find('.md-slider-prev'),
						nextArrow: $th.find('.md-slider-next'),
						responsive: [

						{
							breakpoint: 992,
							settings: {

								slidesPerRow: 3

							}	
						},
						{
							breakpoint: 576,
							settings: {
								slidesPerRow: 2
							}	
						},
						{
							breakpoint: 375,
							settings: {
								slidesPerRow: 1
							}	
						}
						]
					});

					
				});
				
			}
		// end cards-slider
		
		// photo-slider
			if($('.chapter-photos').length > 0){
				$('.chapter-photos').each(function(i, elem) {
					var $th = $(elem),
						$slider = $th.find('.chapter-photos__slider');

					$($slider).on('lazyLoaded', function (e, slick, image, imageSource) {
						console.log('lazy');
					 	image.parent().css('background-image', 'url("' + imageSource + '")');
					  image.hide(); 
					});

					$($slider).slick({
						slidesToScroll: 1,
						slidesToShow: 5,
						lazyLoad: 'ondemand',
						prevArrow: $th.find('.md-slider-prev'),
						nextArrow: $th.find('.md-slider-next')
					});

				});
			}

		// end photo-slider

		// photo-popups
			$('.chapter-photos__slider, .decisions-slider').each(function(i, item) {
				var $that = $(this);
				
				$that.magnificPopup({
					delegate: '.slick-active .from-photo-popup',
					type: 'image',
					tLoading: 'Loading image #%curr%...',
					mainClass: 'mfp-img-mobile static-gallery-popup',
					gallery: {
						enabled: true,
						navigateByImgClick: true,
						tCounter: '<span class="mfp-counter">%curr% / %total%</span>',
						// arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir% mfp-prevent-close"><svg class="icon icon-arrow-right "><use xlink:href="img/icons-svg/symbol/sprite.svg#arrow-right"></use></svg><button>',
						preload: [0,1] // Will preload 0 - before current, and 1 after the current image
					},
					callbacks: {
						buildControls: function() {

				        // re-appends controls inside the main container
				        // this.contentContainer.append(this.arrowLeft.add(this.arrowRight));
				      }
			    },
			    
			    image: {
			    	tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
			    	// titleSrc: function(item) {
			    	// 	return $('#'+item.el.attr('data-caption')+'').clone().removeAttr('id');
			     //  }
			    }
			  });
			});
		//end photo-popups

		//video-popups
			$('.video-previw').magnificPopup({
				disableOn: 700,
				type: 'iframe',
				mainClass: 'mfp-fade',
				removalDelay: 160,
				preloader: false,

				fixedContentPos: false
			});
		//end video-popups

		//articles-popups
			if($('.articles').length > 0){

				$('.articles-content').magnificPopup({
					delegate: '.md-article__img',
					type: 'image',
					tLoading: 'Loading image #%curr%...',
					mainClass: 'mfp-img-mobile md-articles-popup',
					gallery: {
						enabled: true,
						navigateByImgClick: true,
						tCounter: '<span class="mfp-counter">%curr% / %total%</span>',
						// arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir% mfp-prevent-close"><svg class="icon icon-arrow-right "><use xlink:href="img/icons-svg/symbol/sprite.svg#arrow-right"></use></svg><button>',
						preload: [0,1] // Will preload 0 - before current, and 1 after the current image
					},
					callbacks: {
						buildControls: function() {

			        // re-appends controls inside the main container
			        // this.contentContainer.append(this.arrowLeft.add(this.arrowRight));
			      }
			    },
			    
			    image: {
			    	tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
			    	titleSrc: function(item) {
			    		return $('#'+item.el.attr('data-caption')+'').clone();
			        // return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
			      }
			    }
			  });
			}
		//end articles-popups

		// chapters hover
			if($('.md-chapter').length > 0){
				$('.md-chapter__icon .md-arrow-rounded').hover(function() {
					var $parent = $(this).closest('.md-chapter'),
							$sibls = $parent.siblings();

					$parent.addClass('link-hover');
				},
				function() {
					var $parent = $(this).closest('.md-chapter'),
							$sibls = $parent.siblings();

					$parent.removeClass('link-hover');
				
				});
				
			}
		// end chapters hover

		// cards slider hover
			$('.cards-slider__card-wrap .md-card').hover(function() {
				$(this).closest('.cards-slider')
					.addClass('up-on-stack');
					
			}, 
			function() {
				$(this).closest('.cards-slider')
					.removeClass('up-on-stack');
			});
		// end cards slider hover

		// scrollpane
			if($('.scroll-pane').length > 0){
				var scrollArr = [];
				
				$('.scroll-pane').each(function(ind, elem) {
					scrollPane = $(elem).jScrollPane({
						verticalDragMaxHeight : 44,
						animateScroll : true
					});
					var scrollPaneApi = scrollPane.data('jsp');
					scrollArr.push(scrollPaneApi);
				});

			}
		// end scrollpane

		// masonry
			if($('.articles-content').length > 0){
				$('.articles-content').masonry({
				  itemSelector: '.md-article',
				  columnWidth: '.grid-sizer',
					percentPosition: true,
					horizontalOrder: true,
					 singleMode: true ,
					gutter: 18
				});
				
			}
			if($('.catalog-content__tiles').length > 0){
				var $catTiles = $('.catalog-content__tiles').masonry({
			  itemSelector: '.md-card',
			  percentPosition: true,
		    columnWidth: '.card-sizer',
		    horizontalOrder: true,
		    gutter: 20
	
			});

			 $(document).on( 'resize', function() {
				$(this).toggleClass('gigante');
			  // trigger layout after item size changes
			   $catTiles.masonry('layout');
			 });

			function onLayout() {
			 	console.log('layout done');
			 }
			 $catTiles.on( 'layoutComplete', onLayout );
		}
		// end masonry

		// range
			function Range() {
				var _self = this,
					format = wNumb({
						thousand: ' '
					}),
					sliders = document.querySelectorAll('.md-range'),
					readySlidersArr = [];

				this.init = function() {
					console.log('init');
					this.slidersInit();
					$(sliders).find('.minvalinp').on('change', this.minValType);
					$(sliders).find('.maxvalinp').on('change', this.maxValType);
					$('.minvalinp').on('input', this.input);
				},
				this.synchBuffer = function($input) {
					var $buffer = $input.next('.input-buffer');
						
					// console.log($that);
					$buffer.text($input.val());
					$input.width($buffer.width() + 1);
				},
				this.input = function() {
					_self.synchBuffer($(this));
				}
				this.slidersInit = function() {
					sliders.forEach(function(elem,i ) {
						var slider = elem.querySelector('.md-range__slider'),
							startValue = +elem.getAttribute('data-startval'),
							endValue = +elem.getAttribute('data-endval'),
							minValue = +elem.getAttribute('data-minval'),
							maxValue = +elem.getAttribute('data-maxval');
						
						var noUi = noUiSlider.create(slider, {
							connect: true,
							behaviour: 'tap',
							start: [startValue, endValue],
							range: {
						        min: minValue,
						        max: maxValue 
						    },
						    format: wNumb({
						    	decimals: 0,
						    	thousand: ' '
						    	
						    }),
						});

						readySlidersArr.push(noUi);
						$(elem).find('.minvalinp').val(format.to(startValue));

						_self.synchBuffer($(elem).find('.minvalinp'));

						$(elem).find('.maxvalinp').val(format.to(endValue));

						slider.noUiSlider.on('change', _self.sliderChange);
						
					});

				},
				this.minValType = function(e) {
					var ind = $(sliders).index($(this).closest('.md-range')),
						value = +$(this).val();

					readySlidersArr[ind].set([value, null]);
					$(this).val(format.to(value));
					_self.synchBuffer($(this));

				},
				this.maxValType = function(e) {
					var ind = $(sliders).index($(this).closest('.md-range')),
						value = +$(this).val();

					readySlidersArr[ind].set([null, value]);
					$(this).val(format.to(value));
					_self.synchBuffer($(this));

				},
				this.sliderChange = function() {
					var rangeIndex = readySlidersArr.indexOf(this),
						values = this.get();
					_self.inputsRender($(sliders).eq(rangeIndex), values);
					_self.synchBuffer($(sliders).eq(rangeIndex).find('.minvalinp'));
				},
				this.inputsRender =	function($currentRange, values) {
					$currentRange.find('.minvalinp')
						.val(values[0])
						.css('width', _self.setInputWith(values[0]));
					$currentRange.find('.maxvalinp')
						.val(values[1]);
				},
				this.setInputWith = function(value){
					return (value.toString().length + 1) * 8 + 'px';
				}
			}

			if($('.md-range').length > 0){

				var rangeSlider = new Range();
				rangeSlider.init();
			}
		// end range

		// selectmenu
			if($('.md-select').length > 0){
				$('.md-select').selectmenu({
					// position: {my : "bottom+10 center", at: "left center" },
					open: function( event, ui ) {

					}
				});
				
			}
		// end selectmenu

		// timer
			if($('.md-timer').length > 0){
				var myDate = new Date();
				dateEnd = new Date(2021, 0, 1);// ДАТА ОКОНЧАНИЯ АКЦИИ!

				function correctDate(d, h, m) {
					myDate.setDate(myDate.getDate() + d);
					myDate.setHours(myDate.getHours() + h);
					myDate.setMinutes(myDate.getMinutes() + m);

					return myDate;
				}

				if($.cookie("timer")){
					var dateEnd = $.cookie('timer');
				  
				  }else{
				  	// var dateEnd = correctDate(3, 8, 35);
				  	$.cookie('timer', dateEnd, {expires: 365});
			  }
			function getTime(){
				
			  var date1 = new Date(); //текущая дата
			  var date2 = new Date(dateEnd);
				console.log('date1  ' + date1 );
				console.log('date2  ' + date2 );
				// var date2 = new Date(2018, 7, 6, 15, 0, 0, 0); //дата окончания
				var timeDiff = date2.getTime() - date1.getTime();//разница м/у датами в ms
				var seconds = Math.floor((timeDiff / 1000 ) % 60);
				var minutes = Math.floor( (timeDiff /1000/60) % 60 );
				var hours = Math.floor( (timeDiff/(1000*60*60)) % 24);
				var days = Math.floor( timeDiff/(1000*60*60*24) );

				return {
					remaining: timeDiff,
					days: days,
					hours: hours,
					minutes: minutes,
					seconds: seconds

				}
			}
		// render();
		var interval = setInterval(render, 1000);
		function render(){
			var hourField = document.getElementById('hour-field'),
			minField = document.getElementById('min-field'),
			secField = document.getElementById('sec-field'),
			daysField = document.getElementById('days-field'),

			day = getTime().days,
			hour = getTime().hours,
			minutes = getTime().minutes,
			seconds = getTime().seconds;

			// добавление нулей, если одгозначная цифра в поле
			if(hour < 10) hour = '0' + hour;
			if(minutes < 10) minutes= '0' + minutes; 
			if(seconds < 10) seconds= '0' + seconds;

			daysField.innerHTML = day;
			hourField.innerHTML = hour;
			minField.innerHTML= minutes;
			secField.innerHTML= seconds;

			if(getTime().remaining < 0 ){
				$('.md-timer').addClass('await');
				clearInterval(interval);
				daysField.innerHTML = '00';
				hourField.innerHTML = '00';
				minField.innerHTML= '00';
				secField.innerHTML= '00';
			} 
		}
	}
	// end timer

	// decisions
	if($('.decisions-slider').length > 0){
		$('.decisions-slider').slick({
			fade: true,
			prevArrow: '<div class="md-arrow-rounded slick-arrow slick-arrow-prev" style="display: inline-block;"><svg class="icon icon-arrow-left "><use xlink:href="img/icons-svg/symbol/sprite.svg#arrow-left"></use></svg></div>',
			nextArrow: '<div class="md-arrow-rounded slick-arrow slick-arrow-next" style="display: inline-block;"><svg class="icon icon-arrow-right "><use xlink:href="img/icons-svg/symbol/sprite.svg#arrow-right"></use></svg></div>'
			// nextArrow: $('.result .slider-arrow--next')
		});
	}
	// end decisions

	// static-gallery
	if($('.static-gallery').length > 0){
		$('.static-gallery').each(function(i, item) {
			$(item).find('.from-photo-popup').magnificPopup({
				// delegate: '.slick-active .from-photo-popup',
				type: 'image',
				tLoading: 'Loading image #%curr%...',
				mainClass: 'mfp-img-mobile static-gallery-popup',
				gallery: {
					enabled: true,
					navigateByImgClick: true,
					tCounter: '<span class="mfp-counter">%curr% / %total%</span>',
					// arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir% mfp-prevent-close"><svg class="icon icon-arrow-right "><use xlink:href="img/icons-svg/symbol/sprite.svg#arrow-right"></use></svg><button>',
					preload: [0,1] // Will preload 0 - before current, and 1 after the current image
				},
				callbacks: {
					buildControls: function() {

			        // re-appends controls inside the main container
			        // this.contentContainer.append(this.arrowLeft.add(this.arrowRight));
			      }
			    },
			    
			    image: {
			    	tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
			    	// titleSrc: function(item) {
			    	// 	return $('#'+item.el.attr('data-caption')+'').clone().removeAttr('id');

			     //  }
			    }
			  });

		});
	}
	// endstatic-gallery

		// product-display
		if($('.product-display').length > 0){

			$('.product-view').on('lazyLoaded', function(e, slick, image, imageSource){
				image.parent().css('background-image', 'url("' + imageSource + '")');
				image.hide(); 
			});
			
			$('.product-nav').on('lazyLoaded', function(e, slick, image, imageSource){
				image.parent().css('background-image', 'url("' + imageSource + '")');
				image.hide(); 
			});

			 $('.product-view').slick({
				arrows: false,
				fade: true,
				lazyLoad: 'ondemand',
				asNavFor: '.product-nav'
			});
			$('.product-nav').slick({
				slidesToShow: 4,
	  			slidesToScroll: 1,
	  			lazyLoad: 'ondemand',
				asNavFor: '.product-view',
				prevArrow:'<button type="button" class="slick-prev"><svg class="icon icon-arrow-left "><use xlink:href="img/icons-svg/symbol/sprite.svg#arrow-left"></use></svg></button>',
				nextArrow:'<button type="button" class="slick-next"><svg class="icon icon-arrow-right "><use xlink:href="img/icons-svg/symbol/sprite.svg#arrow-right"></use></svg></button>',
				// centerMode: true
				focusOnSelect: true
			});
		}
		// end product-display

	});//document(ready)
	



	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	};

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });
	
});

