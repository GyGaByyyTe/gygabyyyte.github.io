var slideNow = 1;
var slideCount = $('.carousel__wrapper').children().length;
var translateWidth = 0;

$(document).ready(function () {

    //slider burgers
    $(window).resize(function () {
        updateSlide();
    });

    $('.carousel__btn--next').click(function () {
        nextSlide();
    });

    $('.carousel__btn--prev').click(function () {
        prevSlide();
    });

    // menu overlay
    var sliderOverlay = $(".nav");
    $('.hamburger').click(function (e) {
        e.preventDefault();
        $(this).toggleClass('hamburger--pressed');
        sliderOverlay.slideToggle(500);
    });

    // accordion vertical 
    $('.team__accordeon-item .team__item-header').click(function (e) {
        e.preventDefault();
        $('.team__accordeon-item').not($(this).parent()).removeClass("team__accordeon-item--active");
        $(this).parent().toggleClass('team__accordeon-item--active');
    });

    // accordion horizontal 
    $('.menu__accordeon-item .menu__accordeon-trigger').click(function (e) {
        e.preventDefault();
        $('.menu__accordeon-item').not($(this).parent()).removeClass("menu__accordeon-item--active");
        // $('.menu__accordeon-item .menu__item-content').not($(this).next()).css('width', '0');
        $(this).parent().toggleClass('menu__accordeon-item--active');
        // $(this).next().animate('width', '100%');

    });

    // one page scroll 
    $('#fullpage').fullpage({
        //Навигация
        menu: '#global-menu',
        // lockAnchors: false,
        anchors:['fp-best','fp-we', 'fp-burgers', 'fp-team', 
        'fp-menu', 'fp-reviews','fp-order', 'fp-contacts'],
        // navigation: false,
        // navigationPosition: 'right',
        // navigationTooltips: ['firstSlide', 'secondSlide'],
        // showActiveTooltip: false,
        // slidesNavigation: false,
        // slidesNavPosition: 'bottom',

        //Скроллинг
        // css3: true,
        // scrollingSpeed: 700,
        // autoScrolling: true,
        // fitToSection: true,
        // fitToSectionDelay: 1000,
        // scrollBar: false,
        // easing: 'easeInOutCubic',
        // easingcss3: 'ease',
        // loopBottom: false,
        // loopTop: false,
        // loopHorizontal: true,
        // continuousVertical: false,
        // continuousHorizontal: false,
        // scrollHorizontally: false,
        // interlockedSlides: false,
        // dragAndMove: false,
        // offsetSections: false,
        // resetSliders: false,
        // fadingEffect: false,
        // normalScrollElements: '#element1, .element2',
        // scrollOverflow: false,
        // scrollOverflowReset: false,
        // scrollOverflowOptions: null,
        // touchSensitivity: 15,
        // normalScrollElementTouchThreshold: 5,
        // bigSectionsDestination: null,

        //Дизайн
        // controlArrows: true,
        // verticalCentered: true,
        // sectionsColor : ['#ccc', '#fff'],
        // paddingTop: '3em',
        // paddingBottom: '10px',
        // fixedElements: '#header, .footer',
        // responsiveWidth: 0,
        // responsiveHeight: 0,
        // responsiveSlides: false,
        // parallax: false,
        // parallaxOptions: {type: 'reveal', percentage: 62, property: 'translate'},

        //Настроить селекторы
        sectionSelector: '.section',
        slideSelector: '.fp-slide',

        lazyLoading: true,

    });

    var array_links = ['best','we','burgers','team','menu','reviews','order','contacts',];

    for (var i=0;i<array_links.length;i++) {
        const j = i;
        $("a[href='#"+array_links[j]+"']").click(function(e){
            e.preventDefault();
            $.fn.fullpage.moveTo(j+1);
        });
    }   

});


function nextSlide() {
    if (slideNow == slideCount || slideNow <= 0 || slideNow > slideCount) {
        $('.carousel__wrapper').css('transform', 'translate(0, 0)');
        slideNow = 1;
    } else {
        translateWidth = Math.ceil(-$('.carousel__viewport').width() * (slideNow));
        $('.carousel__wrapper').css({
            'transform': 'translate(' + translateWidth + 'px, 0)',
            '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
            '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
        });
        slideNow++;
    }
}

function prevSlide() {
    if (slideNow == 1 || slideNow <= 0 || slideNow > slideCount) {
        translateWidth = -$('.carousel__viewport').width() * (slideCount - 1);
        $('.carousel__wrapper').css({
            'transform': 'translate(' + translateWidth + 'px, 0)',
            '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
            '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
        });
        slideNow = slideCount;
    } else {
        translateWidth = -$('.carousel__viewport').width() * (slideNow - 2);
        $('.carousel__wrapper').css({
            'transform': 'translate(' + translateWidth + 'px, 0)',
            '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
            '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
        });
        slideNow--;
    }
}

function updateSlide() {

    if (slideNow != 1) {
        translateWidth = -$('.carousel__viewport').width() * (slideNow - 1);
        $('.carousel__wrapper').css({
            'transform': 'translate(' + translateWidth + 'px, 0)',
            '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
            '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
        });
    }
}