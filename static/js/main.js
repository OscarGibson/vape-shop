"use strict";

// Global variables
window.productimages;
var price_block = jQuery('#block-price');
var quantity_block = jQuery('#block-quantity');

//Esc Key 
$.fn.escape = function(callback) {
    return this.each(function() {
        jQuery(document).on("keydown", this, function(e) {
            var keycode = ((typeof e.keyCode != 'undefined' && e.keyCode) ? e.keyCode : e.which);
            if (keycode === 27) {
                callback.call(this, e);
            };
        });
    });
};

//Menu Navigation Hamburger
var navigationRight = jQuery('.menu-wrap');

function Navigation() {
    var bodyEl = document.body,
        content = document.querySelector('#close-button'),
        openbtn = document.getElementById('open-button'),
        closebtn = document.getElementById('close-button'),
        cart_box = jQuery('#cart-box'),
        isOpen = false;

    function init() {
        initEvents();
    }

    function initEvents() {
        openbtn.addEventListener('click', toggleMenu);
        if (closebtn) {
            closebtn.addEventListener('click', toggleMenu);
        }

        // close the menu element if the target it´s not the menu element or one of its descendants..
        content.addEventListener('click', function(ev) {
            var target = ev.target;
            if (isOpen && target !== openbtn) {
                toggleMenu();
            }
        });
    }

    function toggleMenu() {
        if (isOpen) {
            cart_box.removeClass('cart-toggled');
            classie.remove(bodyEl, 'show-menu');
        } else {
            classie.add(bodyEl, 'show-menu');
            setTimeout(function() {
                cart_box.addClass('cart-toggled');
            }, 800);
        }
        isOpen = !isOpen;
    }

    navigationRight.escape(function() {
        if (isOpen) {
            classie.remove(bodyEl, 'show-menu');
            classie.remove(openbtn, 'active')
        }
        isOpen = !isOpen;
    });

    init();
};

//Tabs
function Tabs() {
    [].slice.call(document.querySelectorAll('.ef-tabs')).forEach(function(el) {
        new CBPFWTabs(el);
    });
};

//Dribble 
function getDribbbleThumbs() {
    jQuery.jribbble.setToken(dribbbleToken);
    jQuery.jribbble.users(dribbbleName).shots({
        per_page: numberOfItems
    }).then(function(shots) {
        var html = [];
        shots.forEach(function(shot) {
            html.push('<div class="col-md-4 col-sm-4 col-xs-12 mix">');
            html.push('<div class="img dribbble-shot">');
            html.push('<img src="' + shot.images.normal + '">');
            html.push('<div class="overlay-thumb">');
            html.push('<div class="details">');
            html.push('<span class="title">' + shot.title + '</span>');
            html.push('</div>');
            html.push('<span class="btnBefore"></span><span class="btnAfter"></span>');
            html.push('<a class="main-portfolio-link" href="' + shot.html_url + '" target="_blank">');
            html.push('</div>');
            html.push('</div>');
            html.push('</div>');
        });
        jQuery('#work-grid').html(html.join(''));
    });
};

//Social Share Buttons
function getSocialButtons() {
    var socialButtonsEx = jQuery('.social-buttons');
    if (socialButtonsEx.length > 0) {
        jQuery('[data-social]').socialButtons();
    }
};

//Scroll Top 
$.fn.scrollToTop = function() {
    jQuery(this).hide().removeAttr('href');
    if (jQuery(window).scrollTop() != '0') {
        jQuery(this).fadeIn('slow')
    }
    var scrollDiv = jQuery(this);
    jQuery(window).scroll(function() {
        if (jQuery(window).scrollTop() == '0') {
            jQuery(scrollDiv).fadeOut('slow')
        } else {
            jQuery(scrollDiv).fadeIn('slow')
        }
    });
    jQuery(this).on('click', function() {
        jQuery('html, body').animate({
            scrollTop: 0
        }, 'slow')
    })
};

//Detect Mobile
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

//Parallax Scroll
function parallaxScroll() {
    var scrolledY = jQuery(window).scrollTop();
    var headerImage = jQuery('.ef-parallax-bg');
    headerImage.css('background-position', 'center -' + ((scrolledY * 0.4)) + 'px');
};

//History Slider
function historySlider() {
    //History Images slide
    var historyimages = jQuery('#history-images');
    if (historyimages.length > 0) {
        historyimages.owlCarousel({
            singleItem: true,
            pagination: false,
            autoPlay: 2000,
            slideSpeed: 300
        });
    }
};

//Product Slider
function productSlider() {
    //History Images slide
    if (!window.productimages) {
        window.productimages = jQuery('#product-images');
    }
    if (window.productimages.length > 0) {
        window.productimages.owlCarousel({
            singleItem: true,
            pagination: false,
            autoPlay: 10000,
            slideSpeed: 300,
        });
    };
    jQuery('.slider-preview div').on('click',function() {
        window.productimages.data('owlCarousel').goTo($(this).data('target'));
    });
};

function destroyProductSlider() {
    console.log('wer',window.productimages);
    if (window.productimages) {
        window.productimages
            //.trigger('destroy.owl.carousel')
            .data('owlCarousel').destroy()
        window.productimages
            .removeClass('owl-carousel owl-loaded');
        window.productimages
            .find('.owl-stage-outer')
            .children()
            .unwrap();
        console.log('wer',window.productimages);
    }
    
}

//Like
function likeEf() {
    jQuery('.like-product').on('click',  function() {
        jQuery(this).find('i').toggleClass('press');
        jQuery(this).find('i').removeClass('ion-ios-heart-outline');
        jQuery(this).find('span.like-product').toggleClass('press');
        if (jQuery(this).find('i').hasClass('press') || jQuery(this).find('i').hasClass('ion-ios-heart-outline')) {
            jQuery(this).find('.output').html(function(i, val) {
                return val * 1 + 1
            });
            jQuery(this).find('i').addClass('ion-ios-heart');
            jQuery(this).find('i').removeClass('ion-ios-heart-outline');
        } else {
            jQuery(this).find('.output').html(function(i, val) {
                return val * 1 - 1
            });
            jQuery(this).find('i').removeClass('ion-ios-heart');
            jQuery(this).find('i').addClass('ion-ios-heart-outline');

        }
    });
};

//Product display
function getProductData(url) {
    var product_data, images_data, product_variations, product_variations_name;
    jQuery.get(
        "/product-api/"+url, 
        [], 
        function(data) {
            if (data.header.code == 200) {
                try {
                    product_data = JSON.parse(data.body.context);
                    images_data = JSON.parse(data.body.images);
                    // product_variations2 = JSON.parse(data.body.variations2);
                    product_variations = data.body.variations;
                    product_variations_name = data.body.variations_name;
                } catch (err) {
                    console.log(err);
                    return -1;
                }

                showProduct(
                    product_data[0].fields,
                    images_data,
                    product_variations,
                    product_variations_name
                    );
                for (var i = 0; i < product_variations.length; i++) {
                    console.log(product_variations[i]);
                }
                // for (var i = 0; i < product_variations2.length; i++) {
                //     console.log('lal2',product_variations2[i]);
                // }
            }
            else {
                console.log('status', data.header.code);
                console.log('message', data.header.message);
            }
        });
}

function showProduct(data, images, variations, var_name) {
    var container = jQuery('#product-popup');
    container.find('#product-title').text(data.title);

    if (data.sale_price) {
        container.find('#product-price').text(data.sale_price);
        container.find('#product-old-price').text(data.unit_price);
    }
    else {
        container.find('#product-price').text(data.unit_price);
    }

    container.find('#product-description').text(data.description);
    container.find('#product-option-label').text(var_name);

    container.find('#product-slug').val(data.slug);//data.slug;

    let options = container.find('#product-option');
    options.html('').attr('name', "option1");

    for (var i = 0; i < variations.length; i++) {
        options.append('<option value="'+variations[i]+'">'+variations[i]+'</option>');
    }

    console.log('data', data);

    destroyProductSlider();
    showImages(container, images);
    productSlider();

    container.addClass('show-product');
    jQuery('.product-bg').addClass('show-product');

}
function showImages(container, images) {
    container.find('#product-images')
        .html('')
        .attr('class','')
        .attr('style','')
        .addClass('owl-carousel');
    container.find('#slider-preview').html('');
    for (var i = 0; i < images.length; i++) {
        var image = jQuery('<img>');
        var block = jQuery('<div></div>');
        // var image_prew = jQuery('<img>');
        var block_prew = jQuery('<div class="block-prew-item"></div>');

        image.attr('src','/static/media/'+images[i].fields.file)
             .addClass('img-responsive','center-block');

        block_prew.attr('data-target',images[i].fields._order);
        block_prew.attr('style', 'background-image: url("/static/media/'+images[i].fields.file+'")');
        // image_prew.attr('src','/static/media/'+images[i].fields.file)
        //           .addClass('img-responsive')
        //           .addClass('center-block');

        container.find('#product-images')
                 .append(block.append(image));
        container.find('#slider-preview')
                 .append(block_prew);

    }
}

//Document Ready
jQuery(document).ready(function($) {
    jQuery('.product-button').on('click', function() {
        getProductData(jQuery(this).data('slug'));
    });
    
    //Navigation Sub Menu Triggering
    jQuery('.menu-item-has-children, .page_item_has_children').hover(function() {
        jQuery(this).children('.sub-menu').stop().slideDown(200);
    }, 
    function() {
        jQuery(this).children('.sub-menu').stop().slideUp(200);
    });

    //Mobile Menu Open/Close 
    jQuery('#open-mobile-menu').on('click', function() {
        var self = jQuery(this);
        var mobileMenu = jQuery('.menu-wrap-2');

        if (mobileMenu.hasClass('is-open')) {
            self.removeClass('active');
            mobileMenu.removeClass('is-open');
        } else {
            mobileMenu.addClass('is-open');
            self.addClass('active');
        }
    });

    //Dribbble
    if (jQuery('.dribble-grid').length > 0) {
        getDribbbleThumbs();
    };

    //Menu Right Side
    if (navigationRight.length > 0) {
        Navigation();
    };

    //Parallax Background on Desktop
    if (!isMobile.any()) {
        jQuery(window).on('scroll', function() {
            parallaxScroll();
        });
    };

    // Switch class on filter
    var showfilter = jQuery('.works-filter');
    jQuery('button.nav').on('click', function() {
        var self = jQuery(this);
        self.toggleClass('open');
        showfilter.toggleClass('open');
    });

    //Architecure Slider
    var archSlider = jQuery('#arch-slider');
    var prev = jQuery('.prev-slide');
    var next = jQuery('.next-slide');
    //Arch slider
    if (archSlider.length > 0) {
        archSlider.owlCarousel({
            singleItem: true,
            pagination: false,
            autoPlay: 5000,
            slideSpeed: 300,

        });
        prev.on('click', function() {
            archSlider.trigger('owl.prev');
        });
        next.on('click', function() {
            archSlider.trigger('owl.next');
        });
    };

    //Single Project Slider
    var singleProjectSlider = jQuery('.single-slider');
    if (singleProjectSlider.length > 0) {
        singleProjectSlider.owlCarousel({
            singleItem: true,
            pagination: false,
            autoPlay: 5000,
            slideSpeed: 300,

        });
        prev.on('click', function() {
            singleProjectSlider.trigger('owl.prev');
        });
        next.on('click', function() {
            singleProjectSlider.trigger('owl.next');
        });
    };

    //Team Slider
    var teamMembers = jQuery('.team');
    if (teamMembers.length > 0) {
        teamMembers.owlCarousel({
            pagination: true,
            items: 3,
            margin: 20,
            autoHeight: true,
            itemsDesktop: [1199, 3],
            itemsDesktopSmall: [980, 2],
            itemsTablet: [768, 2],
            itemsMobile: [479, 1]
        });
    };

    //Tabs Slider
    var tabsSlider = jQuery('#tabs-slider');
    if (tabsSlider.length > 0) {
        tabsSlider.owlCarousel({
            singleItem: true,
            pagination: false,
            autoPlay: 3000,
            slideSpeed: 600,
        });
    };

    //Search
    var wrap = jQuery('.js-ui-search');
    var close = jQuery('.js-ui-close');
    var input = jQuery('.js-ui-text');
    close.on('click', function() {
        wrap.toggleClass('open');
    });
    input.on('transitionend webkitTransitionEnd oTransitionEnd', function() {
        if (wrap.hasClass('open')) {
            input.focus();
        } else {
            return;
        }
    });

    //Finished loader
    Pace.on("done", function() {
        jQuery(".cover").addClass('animated fadeOutRight').fadeOut(1000);
    });

    //Magnific Popup  
    jQuery('.popup-video').magnificPopup({
        type: 'iframe',
        closeOnContentClick: true,
        closeBtnInside: false,
        fixedContentPos: true,
        mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
        image: {
            verticalFit: true
        },
        zoom: {
            enabled: true,
            duration: 300 // don't foget to change the duration also in CSS
        }
    });

    //Kenburnsy Slides
    jQuery('#slider-ef').kenburnsy();

    //Scroll Top
    jQuery('#scroll-top').scrollToTop();

    //Like
    likeEf();

    //Slider 
    historySlider();

    //productSlider();

    //Get social sharing
    getSocialButtons();

    //Init Tabs
    Tabs();

    //WOW Animation init 
    new WOW().init();

});

//Window Load
jQuery(window).load(function($) {
    
    /*Init Portfolio*/
    var container = jQuery("#work-grid");
    if (container.length > 0) {
        container.isotope({
            layoutMode: 'masonry',
            transitionDuration: '0.7s',
            columnWidth: 60
        });
    };

    //Filter Portfolio
    jQuery('a.filter').on('click', function() {
        var to_filter = jQuery(this).attr('data-filter');
        if (to_filter == 'all') {
            container.isotope({
                filter: '.mix'
            });
        } else {
            container.isotope({
                filter: '.' + to_filter
            });
        }
    });

    //Switch Classes portfolio
    jQuery('.filter').on('click', function() {
        jQuery('a.filter').removeClass('active');
        jQuery(this).addClass('active');
    });

    jQuery('#close-button-product').on('click', function() {
        jQuery('.product-popup').removeClass('show-product');
        jQuery('.product-bg').removeClass('show-product');
    });

    jQuery('#add-cart-api').on('submit', function(e) {
        e.preventDefault();
        console.log('form data: ', jQuery(this).serialize());
        jQuery.ajax({
            type:'POST',
            url:'/en/product-api/add/',
            data: jQuery(this).serialize(),
            contentType: "application/x-www-form-urlencoded",
            success:function(response){
                alert("Added");
                price_block.text(
                    price_block
                    .text()
                    .replace(/\d+\.*\d*/g, response.total_price)
                    );
                quantity_block.text(
                    quantity_block
                    .text()
                    .replace(/\d+\.*\d*/g, response.total_quantity)
                    );
            }
        });
        return false;
    });


});