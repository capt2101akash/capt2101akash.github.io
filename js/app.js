(function ($) {
    'use strict';
    $(function () {
        /**
         * =======================================
         * Function: SMOOTH SCROLLING
         * =======================================
         */
        $('a[href*="#"]:not([href="#"]):not(.accordion-toggle):not([data-toggle])').on('click', function () {
            if (!($(this).closest('ul').hasClass('navbar-nav'))) {
                if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    if (target.length) {
                        $('html, body').animate({
                            scrollTop: target.offset().top
                        }, 1000);
                        return false;
                    }
                }
            }
        });
        /**
         * =======================================
         * Function: TESTIMONIALS LOOP
         * =======================================
         */
        $('.testimonials-loop').owlCarousel({
            center: false,
            items: 1,
            loop: true
        });
        /**
         * =======================================
         * Function: CLIENTS LOOP
         * =======================================
         */
        $('.clients-loop').owlCarousel({
            center: false,
            items: 6,
            loop: true,
            autoplay: true,
            autoplayHoverPause: true,
            dots: false,
            responsive: {
                320: {
                    items: 2
                },
                480: {
                    items: 3
                },
                767: {
                    items: 5
                },
                992: {
                    items: 6
                }
            }
        });
        /**
         * =======================================
         * Function: SCREENSHOT LOOP
         * =======================================
         */
        $('.loop').owlCarousel({
            center: true,
            items: 6,
            loop: true,
            margin: 10,
            autoWidth: true
        });
        /**
         * =======================================
         * Function: SCREENSHOT POPUP
         * =======================================
         */
        $('.loop').magnificPopup({
            delegate: 'a',
            type: 'ajax',
            mainClass: 'mfp-no-margins mfp-with-zoom',
            gallery: {
                enabled: true
            },
            zoom: {
                enabled: true,
                duration: 300 // don't foget to change the duration also in CSS
            }
        });
        /**
         * =======================================
         * Function: DEFAULT AJAX POPUP
         * =======================================
         */
        $('.ajax').magnificPopup({
            type: 'ajax',
            mainClass: 'mfp-no-margins mfp-with-zoom',
            zoom: {
                enabled: true,
                duration: 300 // don't foget to change the duration also in CSS
            }
        });
        /**
         * =======================================
         * Function: FEATURES-BOTTOM VIDEO POPUP
         * =======================================
         */
        $('.play').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            srcAction: 'iframe_src'
        }



        );
        /**
         * =======================================
         * Function: NAVBAR 
         * =======================================
         */
        $('.navbar').onePageNav({
            currentClass: 'active',
            changeHash: false,
            scrollSpeed: 750,
            scrollThreshold: 0.5,
            //scrollOffset: 50,
            filter: ':not(.external)',
            easing: 'swing',
            begin: function () {
                //I get fired when the animation is starting
                //Hack so you can click other menu items after the initial click
                $('body').append('<div id="device-dummy" style="height: 1px;"></div>');
            },
            end: function () {
                //I get fired when the animation is ending
                $('#device-dummy').remove();
            },
            scrollChange: function ($currentListItem) {
                //I get fired when you enter a section and I pass the list item of the section
            }
        });


        /*BOOTSTRAP TOOLTIP*/
        $('[data-toggle="tooltip"]').tooltip();
        /*BOOTSTRAP POPOVER*/
        $('[rel="popover"]').popover().on('click', function (e) {
            e.preventDefault();
        });

        /**
         * =======================================
         * Function: CONTACT FORM VALIDATION
         * =======================================
         */

        $("#contact-form").validate({
            highlight: function (element) {
                $(element).parent().addClass("field-error");
            },
            unhighlight: function (element) {
                $(element).parent().removeClass("field-error");
            },
            submitHandler: function (form) {
                $.ajax({
                    type: "POST",
                    url: "submit.php",
                    data: $(form).serialize(),
                    success: function (response) {
                        console.log(response);
                        var result;
                        if (response == 'OK')
                        {
                            result = '<div style="color:green;">Message sent. Thank you!.</div>';
                        }
                        else
                        {
                            result = '<div style="color:red;">' + response + '</div>'
                        }

                        $('#response').html(result).fadeIn("slow");

                        $('#response').html(result);
                    }
                });

                return false; // required to block normal submit since you used ajax
            }

        });


        /**
         * =======================================
         * Function: VIEWPORTCHECKER FOR COUNTER
         * =======================================
         */
        $('.counter').viewportChecker({
            callbackFunction: function (elem, action) {
                $(elem).countTo({
                    from: 0,
                    speed: 3000,
                    refreshInterval: 50
                });
            }
        });

        /**
         * =======================================
         * Function: VIEWPORTCHECKER FOR PROGRESS BAR
         * =======================================
         */
        $('.progress-bar').viewportChecker({
            callbackFunction: function (elem, action) {
                $(elem).css('width', $(elem).find('.progress-box > span').data('to') + '%');
                $(elem).find('.progress-box > span').countTo({
                    from: 0,
                    speed: 3000,
                    refreshInterval: 50,
                });
            },
        });

        /**
         * =======================================
         * Function: VIEWPORTCHECKER FOR PRICING TABLE
         * =======================================
         */
        var timeout = 0;

        function show(elem) {
            var $elem = $(elem);
            var animation = $elem.data('animation') || 'fadeInDown';
            var dataTimeout = $elem.data('timeout') || 300;
            setTimeout(function () {
                $elem.addClass('animated ' + animation);
            }, timeout);
            timeout += dataTimeout;
        }
        ;
        $('.item-header').viewportChecker({
            //classToAdd: 'animated flipInX',
            offset: ['5%'],
            callbackFunction: function (elem, action) {
                show(elem);
            }
        });

        /* hiden colors settings on site load*/
        setTimeout(function () {
            $('#color-settings').trigger('click');
        }, 2000);

    });

    /**
     * =======================================
     * Function: HEDER ON SCROLL NAVBAR
     * =======================================
     */
    $(window).on('scroll', function () {
        var offsetTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        if (offsetTop > 60)
        {
            $('.navbar').addClass('nav-bg');
        } else {
            $('.navbar').removeClass('nav-bg');
        }
    });
    
    $(window).on('load', function (e) {

        /**
         * =======================================
         * Function: SITE LOADER
         * =======================================
         */
        $('.loader').fadeOut(function () {
            /**
             * =======================================
             * Function: VIEWPORTCHECKER FOR DEFFAULT SOCIAL ICONS
             * =======================================
             */
            var timeout = 0;
            window.show = function (elem) {
                var $elem = $(elem);
                var animation = $elem.data('animation') || 'fadeInDown';
                var dataTimeout = $elem.data('timeout') || 300;
                setTimeout(function () {
                    $elem.addClass('animated ' + animation);
                }, timeout);
                timeout += dataTimeout;
            };
            $('#intro').find('.default-social a, h1, p').viewportChecker({
                //classToAdd: 'animated flipInX',
                offset: ['10%'],
                callbackFunction: function (elem, action) {
                    show(elem);
                }
            });
        });
    });


})(jQuery);

