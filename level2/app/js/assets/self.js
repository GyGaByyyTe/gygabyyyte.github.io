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
        anchors: ['fp-best', 'fp-we', 'fp-burgers', 'fp-team',
            'fp-menu', 'fp-reviews', 'fp-order', 'fp-contacts'],
        //Скроллинг
        scrollingSpeed: 700,
        //Настроить селекторы
        sectionSelector: '.section',
        slideSelector: '.fp-slide'
    });

    var array_links = ['best', 'we', 'burgers', 'team', 'menu', 'reviews', 'order', 'contacts',];

    for (var i = 0; i < array_links.length; i++) {
        const j = i;
        $("a[href='#" + array_links[j] + "']").click(function (e) {
            e.preventDefault();
            $.fn.fullpage.moveTo(j + 1);
        });
    }

    //overlay reviews 
    const reviews__container = $(".reviews__container");
    const template = $("#overlayTemplate");

    function openOverlay(header_content, text_content) {

        const overlayElement = document.createElement("div");
        overlayElement.classList.add("overlay");

        overlayElement.innerHTML = template.get(0).innerHTML;

        const closeElement = overlayElement.querySelector(".overlay__close");
        closeElement.addEventListener("click", function (e) {
            e.preventDefault();
            reviews__container.get(0).removeChild(overlayElement);
        });

        const header_contentElement = overlayElement.querySelector(".overlay__header");
        header_contentElement.innerHTML = header_content;

        const text_contentElement = overlayElement.querySelector(".overlay__text");
        text_contentElement.innerHTML = text_content;

        return overlayElement;
    }

    $('.button--more').click(function (e) {
        e.preventDefault();
        const header_content = e.currentTarget.parentElement.children[0].innerHTML;
        const text_content = e.currentTarget.parentElement.children[1].innerHTML;
        const overlay = openOverlay(header_content, text_content);
        reviews__container.get(0).append(overlay);
    });

    //form action
    $('#order-form').on('submit', submitForm);

    // map realization
    ymaps.ready(initMap);
    var myMap;

    function initMap() {

        ymaps.geolocation.get().then(function (res) {

            var $container = $('#map'),
                bounds = res.geoObjects.get(0).properties.get('boundedBy'),
                mapState = ymaps.util.bounds.getCenterAndZoom(
                    bounds,
                    [$container.width() / 20, $container.height() / 20]
                );
            mapState.controls = ['zoomControl', 'rulerControl', 'searchControl'];
            mapState.zoom = 13;
            myMap = new ymaps.Map('map', mapState);
            myMap.behaviors.disable('scrollZoom');

            var deltaCoord = 0.02;

            var myPlacemark1 = new ymaps.Placemark([mapState.center[0] + deltaCoord, mapState.center[1] + deltaCoord], {}, {
                iconLayout: 'default#image',
                iconImageHref: './img/icons/map-marker.svg',
                iconImageSize: [46, 57],
                iconImageOffset: [-3, -42]
            }),
                myPlacemark2 = new ymaps.Placemark([mapState.center[0] - deltaCoord, mapState.center[1] + deltaCoord], {}, {
                    iconLayout: 'default#image',
                    iconImageHref: './img/icons/map-marker.svg',
                    iconImageSize: [46, 57],
                    iconImageOffset: [-3, -42]
                }),
                myPlacemark3 = new ymaps.Placemark([mapState.center[0] + deltaCoord, mapState.center[1] - deltaCoord], {}, {
                    iconLayout: 'default#image',
                    iconImageHref: './img/icons/map-marker.svg',
                    iconImageSize: [46, 57],
                    iconImageOffset: [-3, -42]
                });
            myMap.geoObjects.add(myPlacemark1);
            myMap.geoObjects.add(myPlacemark2);
            myMap.geoObjects.add(myPlacemark3);

        }, function (e) {
            console.log(e);
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

function submitForm(ev) {
    ev.preventDefault();

    var overlay = $('.order__overlay');
    var overlayText = $('.order__popup-header');
    var overlayClose = $('.order__popup-close');

    var form = $(ev.target),
        data = form.serialize(),
        url = form.attr('action'),
        type = form.attr('method');

    ajaxForm(form).done(function (msg) {

        overlay.css({'display':'flex'});
        overlayClose.on('click', function(e){
            overlay.css({'display':'none'});
        });

        var mes = msg.mes,
            status = msg.status;

        if (status === 'OK') {
            overlayText.get(0).innerHTML = 'Сообщение отправлено';
        } else {
            overlayText.get(0).innerHTML = 'Произошла ошибка';
        }
    }).fail(function (jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
    });

};

// Универсальная функция для работы с формами
var ajaxForm = function (form) {
    var data = form.serialize(),
        url = form.attr('action');

    return $.ajax({
        type: 'POST',
        url: url,
        dataType: 'JSON',
        data: data
    })
};