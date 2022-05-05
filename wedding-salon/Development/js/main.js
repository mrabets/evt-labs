(function () {
    "use strict";

     function initMainSlider() {
         var mainSlider = $( '.main-slider' ).slitslider({
            speed : 1500,
            optOpacity : false,
            translateFactor : 230,
            maxAngle : 25,
            maxScale : 2,
            autoplay : true,
            keyboard : false,
            interval : 5000,
            onBeforeChange : function( slide, idx ) { return false; },
            onAfterChange : function( slide, idx ) { return false; }
         });

         window.onscroll = function() {
             var targetOffset = $(".wrap").offset().top-200;
             ($(window).scrollTop() <= targetOffset) ? (mainSlider.play()) : (mainSlider.pause());
         };
     }


     $(document).on("click", ".nav-trigger, .main-nav .button-close a", function(){
        $('body').toggleClass('nav-active');
     });

     $(document).on("click", '.main-nav a[href*="#"]', function(e){
        if ( !$(this).parent().hasClass('social-icons') ) {
            $('body').toggleClass('nav-active');

            e.preventDefault();

            $('html, body').animate({
                 scrollTop: $($(this).attr("href")).offset().top
             }, 1000);
        }
     });

     $(document).on("click", ".state-enter", function(){
        $('html, body').animate({
            scrollTop: $(".wrap").offset().top - $('.top-bar').height()
        }, 1000);
     });

     $(document).on("click", ".tabs-nav a", function(e){
        e.preventDefault();

        $(this).on('shown', function (e) {
            $('html, body').animate({
                scrollTop: $(this).closest('.container').find('.tab-content').offset().top - $('.top-bar').height()
            }, 200, function(){
                $.waypoints('refresh');
            });
        });
     });

     var wpOffset = 80;
     if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
        wpOffset = 100;
     }
     $.fn.waypoint.defaults = {
        context: window,
        continuous: true,
        enabled: true,
        horizontal: false,
        offset: 0,
        triggerOnce: false
     };
     $('.animated').waypoint(function(direction) {
        var elem = $(this);
        var animation = elem.data('animation');
        if ( !elem.hasClass('visible') ) {
            if ( elem.attr('data-animation-delay') !== undefined ) {
                var timeout = elem.data('animation-delay');

                setTimeout(function(){
                    elem.addClass( animation + " visible" );
                }, timeout);
            } else {
                elem.addClass( elem.data('animation') + " visible" );
            }
        }
     }, { offset: wpOffset+'%' });

     $('input, textarea').placeholder();

     $('.tab-pane .flexslider').closest('.tab-pane').css('display', 'block');

     $(".section-wrap:odd").addClass('odd');

     $(document).on("click", ".portfolio-link, .article-link, .modal-page-load", function(e) {
        e.preventDefault();

        $('body').addClass('modal-active');

        $('.modal-content').html();

        $('.modal-page').addClass('modal-loading');

        var spinnerOpts = {
            lines: 9, 
            length: 0, 
            width: 5,
            radius: 11,
            corners: 1,
            rotate: 0,
            direction: 1, 
            color: '#000',
            speed: 1, 
            trail: 60, 
            shadow: false, 
            hwaccel: true,
            className: 'spinner', 
            zIndex: 2e9, 
            top: '0',
            left: '0'
        };
        var modalSpinner = new Spinner(spinnerOpts).spin( $('.modal-spinner')[0] );

        $('.modal-page .modal-content').load($(this).attr('href'), function() {

            $('.modal-page').removeClass('modal-loading').addClass('modal-loaded');

            $('.modal-spinner').html('');

            initFlexSliders();

            cbpBGSlideshow.init();

            var spinnerOpts = {
                lines: 9, 
                length: 0,
                width: 10, 
                radius: 11, 
                corners: 1, 
                rotate: 0,
                direction: 1, 
                color: '#fff',
                speed: 1,
                trail: 60, 
                shadow: false, 
                hwaccel: true,
                className: 'spinner', 
                zIndex: 99, 
                top: '0', 
                left: '0'
            };
            var slideshowSpinner = new Spinner(spinnerOpts).spin( $('.portfolio-slider')[0] );
        });
     });


     $(document).on("click", ".modal-top-bar .button-close", function(e) {
        e.preventDefault();
        $(this).closest('.modal-page').removeClass('slider-active');

        $('.modal-content').html('');

        $('body').removeClass('modal-active');
        $('.modal-page').removeClass('modal-loading modal-loaded');

        $.waypoints('refresh');
     });


     $(document).on("click", ".modal-page .content-switcher a", function(e) {
        var clickedElem = $(this);
        var containerModal = clickedElem.closest('.modal-page');

        e.preventDefault();

        clickedElem.closest('.content-switcher').find('.active').removeClass('active');
        clickedElem.addClass('active');

        if( clickedElem.hasClass('switcher-slider') ) {
            containerModal.find('.portfolio-slider').addClass('visible');

            containerModal.addClass('slider-active');
        }
        else {
            containerModal.find('.portfolio-slider').removeClass('visible');

            containerModal.removeClass('slider-active');
        }
     });



     $('.wrap').find('.toggle .toggle-content').stop().slideToggle(0);
     $('.wrap').find('.toggle-open').find('.toggle-content').stop().slideToggle(0);

     $('.toggle .toggle-header').click(function(){
        $(this).parent().toggleClass('toggle-open').find('.toggle-content').stop().slideToggle(200);
     });



     setupExpandable($('.expandable-active'));
     $(document).on("click", ".expandable-trigger", function(){
        setupExpandable( $(this) );
     });

     function setupExpandable(obj) {
        var exHolder = obj.closest('.expandable-holder');
        var exElem = obj.closest('.expandable');
        var exContent = exElem.find('.expandable-content');

        $('.expandable-active').closest('.expandable-holder').attr('style', '').removeAttr('style');
        $('.expandable-active').toggleClass('expandable-active');

        exElem.toggleClass('expandable-active');

        var exHolderHeight = exHolder.height();
        var exContentHeight = exContent.height();

        exContent.css('top', exHolderHeight + 'px');

        exHolder.css('margin-bottom', exContentHeight+45 + 'px');
     }

     $(window).load(function(){
        initFlexSliders();


        initMainSlider();


        initIsotope();



        $('.overlay-trigger').each(function(){
            $(this).setupContentOverlay();
        });


        $('[data-spy="scroll"]').each(function () {
            var $spy = $(this).scrollspy('refresh');
        });

        $('.button-status').removeClass('state-loading').addClass('state-enter');
     });

     $(window).resize(function(){
        reLayoutIsotope();

        $('.overlay-trigger').recalculateClip();

        $('[data-spy="scroll"]').each(function () {
            var $spy = $(this).scrollspy('refresh');
        });

        $.waypoints('refresh');
     });

     jQuery.fn.setupContentOverlay = function() {
        var triggerElem = $(this);
        var overlayId = $(this).data('trigger-overlay');
        var overlayElem = $('#' + overlayId);

        $(this).fadeIn(0, function(){
            var clipRect =
            [
                triggerElem.position().top,
                triggerElem.position().left+triggerElem.outerWidth(),
                triggerElem.position().top+triggerElem.outerHeight(),
                triggerElem.position().left
            ];
            if ( !$('html').hasClass('cssanimations') ) {
                overlayElem.animate({
                    clip: 'rect('+ clipRect[0] +'px, '+ clipRect[1] +'px, '+ clipRect[2] +'px, '+ clipRect[3] +'px)'
                }, 400);
            } else {
                overlayElem.css('clip', 'rect('+ clipRect[0] +'px, '+ clipRect[1] +'px, '+ clipRect[2] +'px, '+ clipRect[3] +'px)');
            }
        }).hide().delay(400).fadeIn(500, function(){
            overlayElem.removeClass('overlay-active');
        });
    };

    $(document).on("click", ".overlay-trigger", function(){
        var triggerElem = $(this);
        var overlayId = $(this).data('trigger-overlay');
        var overlayElem = $('#' + overlayId);
        var overlayElemContainer = overlayElem.closest('.section-divider');

        overlayElem.addClass('overlay-active');

        var clipRect =
        [
            0,
            overlayElemContainer.outerWidth(),
            overlayElemContainer.outerHeight(),
            0
        ];
        $(this).fadeOut(500, function(){
            if ( !$('html').hasClass('cssanimations') ) {
                overlayElem.animate({
                    clip: 'rect('+ clipRect[0] +'px, '+ clipRect[1] +'px, '+ clipRect[2] +'px, '+ clipRect[3] +'px)'
                }, 400);
            } else {
                overlayElem.css('clip', 'rect('+ clipRect[0] +'px, '+ clipRect[1] +'px, '+ clipRect[2] +'px, '+ clipRect[3] +'px)');
            }
        });

        var videoElem = overlayElem.find('.vimeo-autoplay');
        if(videoElem.length > 0) {
            setTimeout(
                function playVimeo() {
                    var iframe = videoElem[0],
                    player = $f(iframe);
                    player.api('play');
                },
            900);
        }
    });

    $(document).on("click", ".container-overlay .button-close", function(){
        var overlayElem = $(this).closest('.overlay-active');
        $(this).closest('.section-divider').find('.overlay-trigger').setupContentOverlay();

        var videoElem = overlayElem.find('.vimeo-autoplay');
        if(videoElem.length > 0) {
            setTimeout(
                function pauseVimeo() {
                    var iframe = videoElem[0],
                    player = $f(iframe);
                    player.api('pause');
                },
            400);
        }
    });

    jQuery.fn.recalculateClip = function() {
        return this.each(function() {
            var triggerElem = $(this);
            var overlayId = triggerElem.data('trigger-overlay');
            var overlayElem = $('#' + overlayId);
            var overlayElemContainer = overlayElem.closest('.section-divider');
            var clipRect;

            if(overlayElem.hasClass('overlay-active')) {
                clipRect =
                [
                    0,
                    overlayElemContainer.outerWidth(),
                    overlayElemContainer.outerHeight(),
                    0
                ];
            }
            else {
                clipRect =
                [
                    triggerElem.position().top,
                    triggerElem.position().left+triggerElem.outerWidth(),
                    triggerElem.position().top+triggerElem.outerHeight(),
                    triggerElem.position().left
                ];
            }

            overlayElem.css('clip', 'rect('+ clipRect[0] +'px, '+ clipRect[1] +'px, '+ clipRect[2] +'px, '+ clipRect[3] +'px)');
        });
     };

     function initFlexSliders() {
        $('.flexslider').flexslider({
            animation: "slide",
            nextText: "",
            prevText: "",
            keyboard: false,
            slideshow: false,
            smoothHeight: true,
            start: function(){
                $('.tab-content>.tab-pane, .pill-content>.pill-pane').attr('style', '').removeAttr('style');
                $.waypoints('refresh');
                reLayoutIsotope();
            },
            after: function(){
                reLayoutIsotope();
            }
        });
    }

    function initIsotope() {
        var $container = $('.portfolio-container');
        $container.isotope({
            resizable: false,
            masonry: {
                columnWidth: 1
            }
        });
        $(document).on("click", ".filter-portfolio a", function(e) {
            e.preventDefault();
            $(this).closest('.filters').find('a').removeClass('selected');
            $(this).toggleClass('selected');

            var selector = $(this).attr('data-filter');
            $('.portfolio-container').isotope({
                filter: selector,
                masonry: {
                    columnWidth: 1
                }
            }, function() {
                $.waypoints('refresh');
            });

            return false;
        });


        $('.entries-container').isotope({
            itemSelector : '.blog-entry'
        });
    }

    function reLayoutIsotope() {
        $('.isotope').isotope( 'reLayout' );
    }

    var spinnerOpts = {
        lines: 9,
        length: 0,
        width: 5,
        radius: 11,
        corners: 1,
        rotate: 0,
        direction: 1, 
        color: '#000', 
        speed: 1, 
        trail: 60, 
        shadow: false, 
        hwaccel: true,
        className: 'spinner',
        zIndex: 2e9, 
        top: '0', 
        left: '0'
    };
    var targetSpinner = $('.spinner-holder').hide();
    var spinner = new Spinner(spinnerOpts).spin(targetSpinner[0]);

    var v = $("#contactForm").validate({
        submitHandler: function(form) {
            var feedbackElem = $(form).find('.feedback-text').hide();
            var spinnerElem = $(form).find('.spinner-holder').fadeIn(300);

            jQuery(form).ajaxSubmit({
                success: function() {
                    spinnerElem.fadeOut(300, function(){
                        feedbackElem.fadeIn(300).text("Спасибо за обращение");
                    });

                    $(form).find('input[type="submit"]').attr('disabled', 'disabled');
                }
            });

            return false;
        }
    });
}());