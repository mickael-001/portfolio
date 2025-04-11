( function( $ ) {

	// WidgetTestimonialCarouselHandler
	var WidgetTestimonialCarouselHandler = function($scope, $) {
		var $swiperElements = $scope.find('.dtr-testimonial-carousel');

		$swiperElements.each(function() {
			var $this = $(this);

			// Ensure swiper is not initialized multiple times
			if ($this.hasClass('swiper-initialized')) return;

			// Get the settings from the data attributes
			var autoplaySetting = $this.data('swiper-autoplay') || 'on';
			var autoplayDelay = $this.data('swiper-autoplay-delay') || 5000;
			var loopSetting = String($this.data('swiper-loop')) === 'true'; // Ensure it's a boolean
			var columns = $this.data('swiper-columns') || 1;  // Determine columns setting (1, 2, or 3)

			// Cache selectors for pagination and navigation to avoid multiple DOM queries
            var $pagination = $this.find('.swiper-pagination.dtr-testimonial__dots');
            var $nextNav = $this.find('.swiper-button-next.dtr-testimonial__next');
            var $prevNav = $this.find('.swiper-button-prev.dtr-testimonial__prev');

			// Initialize Swiper Configuration
			var swiperConfig = {
				slidesPerView: 1,  // Default to 1 slide per view
				spaceBetween: 20,
				loop: loopSetting,  // Looping enabled if true
				autoplay: autoplaySetting === 'on' ? {
					delay: autoplayDelay,
					disableOnInteraction: false,
					pauseOnMouseEnter: true
				} : false,
				pagination: {
                    el: $pagination[0],  // Use cached reference
                    clickable: true,
                },
                navigation: {
                    nextEl: $nextNav[0],  // Use cached reference
                    prevEl: $prevNav[0],  // Use cached reference
                },
				breakpoints: {
					980: {
						slidesPerView: columns === 1 ? 1 : 2,
						spaceBetween: 20,
					},
				},
			};

			// Initialize Swiper instance
			var swiper = new Swiper($this[0], swiperConfig);

			// Update swiper after initialization
			swiper.update();

			// Mark this element as initialized to avoid reinitializing
			$this.addClass('swiper-initialized');
		});
	}; // WidgetTestimonialCarouselHandler

	// recent post carousel
    var WidgetPostCarouselHandler = function($scope, $) {
        var $swiperElements = $scope.find('.dtr-recentposts-carousel');

        $swiperElements.each(function() {
            var $this = $(this);

            // Ensure swiper is not initialized multiple times
            if ($this.hasClass('swiper-initialized')) return;

            // Get the settings
            var autoplaySetting = $this.data('swiper-autoplay') || 'on';
            var autoplayDelay = $this.data('swiper-autoplay-delay') || 7000;
            var loopSetting = String($this.data('swiper-loop')) === 'true'; // Ensure it's a boolean
            loopSetting = String(loopSetting) === 'true';
            
            // Cache selectors for pagination and navigation to avoid multiple DOM queries
            var $pagination = $this.find('.swiper-pagination.dtr-recentposts__dots');
            var $nextNav = $this.find('.swiper-button-next.dtr-recentposts__next');
            var $prevNav = $this.find('.swiper-button-prev.dtr-recentposts__prev');

            // Make sure to do all DOM reading first, then apply changes
            // Example of optimization: 
            var swiperConfig = {
                slidesPerView: 1,
                spaceBetween: 0,
                loop: loopSetting,  // Should be boolean
                pagination: {
                    el: $pagination[0],  // Use cached reference
                    clickable: true,
                },
                navigation: {
                    nextEl: $nextNav[0],  // Use cached reference
                    prevEl: $prevNav[0],  // Use cached reference
                },
                autoplay: autoplaySetting === 'on' ? {
                    delay: autoplayDelay,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                } : false,
                breakpoints: {
                    782: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    1280: {
                        slidesPerView: 3,
                        spaceBetween: 20
                    }
                },
            };

            // Initialize Swiper only once the configuration is fully assembled
            var swiper = new Swiper($this[0], swiperConfig);

            // Mark this element as initialized to avoid reinitializing it
            $this.addClass('swiper-initialized');
            
        });
    }; // WidgetPostCarouselHandler

    // Portfolio masonry	
	var WidgetPortfolioMasonryHandler = function( $scope, $ ) {
		var dtr_portfolio_grid = $scope.find('.dtr-portfolio-masonry');
		dtr_portfolio_grid.imagesLoaded( function () {
			dtr_portfolio_grid.isotope( 
			{
				itemSelector: '.dtr-portfolio-item',
				masonry: { columnWidth: '.dtr-portfolio-masonry .dtr-portfolio-item' }
			});
			});
			$('.dtr-filter-nav a').on('click', function () {
				$('.dtr-filter-nav a').removeClass('active');
				$(this).addClass('active');
				var selector = $(this).attr('data-filter');
				dtr_portfolio_grid.isotope({
					filter: selector
				});
				return false;
			});
	}; // WidgetPortfolioMasonryHandler
	
	// Portfolio Grid	
	var WidgetPortfolioGridHandler = function( $scope, $ ) {
		var dtr_portfolio_grid = $scope.find('.dtr-portfolio-fitrows');
		dtr_portfolio_grid.imagesLoaded( function () {
			dtr_portfolio_grid.isotope( 
			{
				itemSelector: '.dtr-portfolio-item',
				masonry: {},
				layoutMode : 'fitRows',
			});
			});
			$('.dtr-filter-nav a').on('click', function () {
				$('.dtr-filter-nav a').removeClass('active');
				$(this).addClass('active');
				var selector = $(this).attr('data-filter');
				dtr_portfolio_grid.isotope({
					filter: selector
				});
				return false;
			});
	}; // WidgetPortfolioGridHandler
          
	// Make sure you run this code under Elementor.
	$( window ).on( 'elementor/frontend/init', function() {
        elementorFrontend.hooks.addAction( 'frontend/element_ready/dtr-testimonial-carousel.default', WidgetTestimonialCarouselHandler );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/dtr-posts-carousel.default', WidgetPostCarouselHandler );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/dtr-grid-portfolio.default', WidgetPortfolioGridHandler );
		elementorFrontend.hooks.addAction( 'frontend/element_ready/dtr-grid-portfolio.default', WidgetPortfolioMasonryHandler );
	} );

} )( jQuery );