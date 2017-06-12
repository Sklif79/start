$(document).ready(function () {

// function phoneMask(){
//     $(".phone-mask").mask("+375 (99) 999-99-99");
// }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	

    // var currentMonth = moment().format('YYYY-MM');
    // var nextMonth    = moment().add('month', 1).format('YYYY-MM');

    // format('YYYY-MM-DD');
    // var evs = [
    //     {"date": "2017-04-10", "title": "Persian Kitten Auction", "url": "http://kylestetz.github.io/CLNDR/"},
    //     {"date": "2017-04-19", "title": "Cat Frisbee", "url": "http://kylestetz.github.io/CLNDR/"},
    //     {"date": "2017-04-23", "title": "Kitten Demonstration", "url": "http://kylestetz.github.io/CLNDR/"}
    // ];
    //
    //
    // console.log(evs);

    var evs = $.ajax({
            url:'/assets/js/data-event.json',
            dataType: 'json',
            success: function(data){
                // console.log(data);
            }
        });
    console.log(evs);


    var lang = $('.dropbtn-lang').attr('data-lang');
    console.log(lang);

    var daysLocale;

    switch (lang) {
        case 'ru':
            moment.locale('ru');
            daysLocale = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
            break;

        case 'ger':
            moment.locale('de');
            daysLocale = ["SO", "MO", "DI", "MI", "DO", "FR", "SA"];
            break;

        case 'sp':
            moment.locale('es');
            daysLocale = ["D", "L", "M", "X", "J", "V", "S"];
            break;

        default:
            moment.locale('en');
    }

    $('#mini-clndr').clndr({
        template: $('#mini-clndr-template').html(),
        events: evs,
        weekOffset: 1,
        daysOfTheWeek: daysLocale,
        // multiDayEvents: {
        //     endDate: 'end',
        //     startDate: 'start'
        // },
        clickEvents: {
            click: function (target) {
                if (target.events.length) {
                    var daysContainer = $('#mini-clndr').find('.days-container');
                    daysContainer.toggleClass('show-events', true);
                    $('#mini-clndr').find('.x-button').click(function () {
                        daysContainer.toggleClass('show-events', false);
                    });
                }
            }
        },
        adjacentDaysChangeMonth: true,
        moment: moment
        // forceSixRows: true
    });
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	

    // $('a.modalbox').fancybox({
    //     closeBtn: true,
    //     padding: 0,
    //     helpers: {
    //         overlay: {
    //             css: {
    //                 'background': 'rgba(0,0,0,0.5)'
    //             }
    //         }
    //     }
    // });

    // $(".expo__item-news, .news-item__text").dotdotdot({
    //     ellipsis: "",
    //     tolerance: 1
    // });

    // $("#datepicker").datepicker();
    // datapickerLang();

    //doubleRange();

    //$('.expo__item-title').setMaxHeights();

    //validatePopups();


    //************************** sliders *********************************
    $('.slider-partners').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        dots: false,
        nextArrow: '<div class="slider-next"></div>',
        prevArrow: '<div class="slider-prev"></div>',
        arrows: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4
                }
            },

            {
                breakpoint: 690,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

});

//яндекс карта
function mapFooter() {
    var myMap;
    ymaps.ready(function () {
        myMap = new ymaps.Map('mapFooter', {
            center: [53.71382238397995, 23.82329127007925],
            zoom: 16,
            controls: []
        }, {
            searchControlProvider: 'yandex#search'
        }),
            myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
                hintContent: '',
                balloonContent: ''
            }, {
                // Опции.
                // Необходимо указать данный тип макета.
                iconLayout: 'default#image',
                // Своё изображение иконки метки.
                iconImageHref: '/assets/images/map-marker.png',
                // Размеры метки.
                iconImageSize: [25, 37]
                // Смещение левого верхнего угла иконки относительно
                // её "ножки" (точки привязки).
                //iconImageOffset: [-3, -42]
            });

        myMap.geoObjects.add(myPlacemark);
    });
}


//двойной ползунок
//http://jqueryui.com/slider/#range
function doubleRange() {
    $("#slider-range").slider({
        range: true,
        min: 80,
        max: 500,
        values: [120, 400],
        slide: function (event, ui) {
            $("#range-min").val(ui.values[0]);
            $("#range-max").val(ui.values[1]);
        }
    });

    $("#range-min").val($("#slider-range").slider("values", 0));
    $("#range-max").val($("#slider-range").slider("values", 1));
}


// function dataPickerRu() {
//     $.datepicker.regional['ru'] = {
//         closeText: 'Закрыть',
//         prevText: '&#x3c;Пред',
//         nextText: 'След&#x3e;',
//         currentText: 'Сегодня',
//         monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
//             'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
//         monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
//             'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
//         dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
//         dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
//         dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
//         dateFormat: 'dd.mm.yy',
//         firstDay: 1,
//         isRTL: false
//     };
//     $.datepicker.setDefaults($.datepicker.regional['ru']);
// }
//
// function dataPickerGer() {
//     $.datepicker.regional['de'] = {
//         closeText: "Schließen",
//         prevText: "&#x3C;Zurück",
//         nextText: "Vor&#x3E;",
//         currentText: "Heute",
//         monthNames: ["Januar", "Februar", "März", "April", "Mai", "Juni",
//             "Juli", "August", "September", "Oktober", "November", "Dezember"],
//         monthNamesShort: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun",
//             "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
//         dayNames: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
//         dayNamesShort: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
//         dayNamesMin: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
//         weekHeader: "KW",
//         dateFormat: "dd.mm.yy",
//         firstDay: 1,
//         isRTL: false
//     };
//     $.datepicker.setDefaults($.datepicker.regional['de']);
// }
//
// function dataPickerEsp() {
//     $.datepicker.regional['es'] = {
//         closeText: "Cerrar",
//         prevText: "&#x3C;Ant",
//         nextText: "Sig&#x3E;",
//         currentText: "Hoy",
//         monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio",
//             "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
//         monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun",
//             "jul", "ago", "sep", "oct", "nov", "dic"],
//         dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
//         dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
//         dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
//         weekHeader: "Sm",
//         dateFormat: "dd/mm/yy",
//         firstDay: 1,
//         isRTL: false
//     };
//     $.datepicker.setDefaults($.datepicker.regional['es']);
// }








//плагин обрезки текста
$(document).ready(function () {
    //плагин
    jQuery.fn.liTextLength = function (options) {
        // настройки по умолчанию
        var o = jQuery.extend({
            length: 150,                                    //Видимое кол-во символов
            afterLength: '...',                                //Текст после видимого содержания
            fullText: true,                                    //Добавить ссылку для отображения скрытого текста
            moreText: '<br>полный&nbsp;текст',                //Текст ссылки до показа скрытого содержания
            lessText: '<br>скрыть&nbsp;полный&nbsp;текст'    //Текст ссылки после показа скрытого содержания
        }, options);
        return this.each(function () {
            var
                $el = $(this),
                elText = $.trim($el.text()),
                elLength = elText.length;
            if (elLength > o.length) {
                var
                    textSlice = $.trim(elText.substr(0, o.length)),
                    textSliced = $.trim(elText.substr(o.length));
                if (textSlice.length < o.length) {
                    var
                        textVisible = textSlice,
                        textHidden = $.trim(elText.substr(o.length));
                } else {
                    var
                        arrSlice = textSlice.split(' '),
                        popped = arrSlice.pop(),
                        textVisible = arrSlice.join(' ') + ' ',
                        textHidden = popped + textSliced + ' ';
                }
                ;
                var
                    $elTextHidden = $('<span>').addClass('elTextHidden').html(textHidden),
                    $afterLength = $('<span>').addClass('afterLength').html(o.afterLength + ' '),
                    $more = $('<span>').addClass('more').html(o.moreText);
                $el.text(textVisible).append($afterLength).append($elTextHidden);
                var displayStyle = $elTextHidden.css('display');
                $elTextHidden.hide();
                if (o.fullText) {
                    $el.append($more);
                    $more.click(function () {
                        if ($elTextHidden.is(':hidden')) {
                            $elTextHidden.css({display: displayStyle});
                            $more.html(o.lessText);
                            $afterLength.hide();
                        } else {
                            $elTextHidden.hide();
                            $more.html(o.moreText);
                            $afterLength.show();
                        }
                        ;
                        return false;
                    });
                } else {
                    $elTextHidden.remove();
                }
                ;
            }
            ;
        });
    };

    if ($(window).width() < 497) {
        //инициализация
        $('#tab-description').liTextLength({
            length: 597,                                    //Видимое кол-во символов
            afterLength: '...',                                //Текст после видимого содержания
            fullText: true,                                    //Добавить ссылку для отображения скрытого текста
            moreText: '<div class="description-more"><span>Подробнее</span></div>',                //Текст ссылки до показа скрытого содержания
            lessText: '<div class="description-more"><span>Свернуть</span></div>'    //Текст ссылки после показа скрытого содержания
        });
    }

});


//выравнивание элементов по высоте
$.fn.setMaxHeights = function () {
    var maxHeight = this.map(function (i, e) {
        return $(e).height();
    }).get();

    return this.height(Math.max.apply(this, maxHeight));
};

//валидатор формы попап
function validatePopups() {
    var myLanguage = {
        errorTitle: "Ошибка отправки формы!",
        requiredField: "Это обязательное поле",
        requiredFields: "Вы задали не все обязательные поля",
        badTime: "Вы задали некорректное время",
        badEmail: "Вы задали некорректный e-mail",
        badTelephone: "Вы задали некорректный номер телефона",
        badSecurityAnswer: "Вы задали некорректный ответ на секретный вопрос",
        badDate: "Вы задали некорректную дату",
        lengthBadStart: "Значение должно быть в диапазоне",
        lengthBadEnd: " символов",
        lengthTooLongStart: "Значение длинее, чем ",
        lengthTooShortStart: "Значение меньше, чем ",
        notConfirmed: "Введённые значения не могут быть подтверждены",
        badDomain: "Некорректное значение домена",
        badUrl: "Некорретный URL",
        badCustomVal: "Введённое значение неверно",
        andSpaces: " и пробелы ",
        badInt: "Значение - не число",
        badSecurityNumber: "Введённый защитный номер - неправильный",
        badUKVatAnswer: "Некорректный UK VAT номер",
        badStrength: "Пароль не достаточно надёжен",
        badNumberOfSelectedOptionsStart: "Вы должны выбрать как минимум ",
        badNumberOfSelectedOptionsEnd: " ответов",
        badAlphaNumeric: "Значение должно содержать только числа и буквы ",
        badAlphaNumericExtra: " и ",
        wrongFileSize: "Загружаемый файл слишком велик (максимальный размер %s)",
        wrongFileType: "Принимаются файлы следующих типов %s",
        groupCheckedRangeStart: "Выберите между ",
        groupCheckedTooFewStart: "Выберите как минимум ",
        groupCheckedTooManyStart: "Выберите максимум из ",
        groupCheckedEnd: " элемент(ов)",
        badCreditCard: "Номер кредитной карты некорректен",
        badCVV: "CVV номер некорректно",
        wrongFileDim: "Неверные размеры графического файла,",
        imageTooTall: "изображение не может быть уже чем",
        imageTooWide: "изображение не может быть шире чем",
        imageTooSmall: "изображение слишком мало",
        min: "минимум",
        max: "максимум",
        imageRatioNotAccepted: "Изображение с таким соотношением сторон не принимается",
        badBrazilTelephoneAnswer: "Введённый номер телефона неправильный",
        badBrazilCEPAnswer: "CEP неправильный",
        badBrazilCPFAnswer: "CPF неправильный"
    };

    $.validate({
        language: myLanguage
    });
}

//определяем IE
function getInternetExplorerVersion()
{
    var rv = -1;
    if (navigator.appName == 'Microsoft Internet Explorer')
    {
        var ua = navigator.userAgent;
        var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat( RegExp.$1 );
    }
    else if (navigator.appName == 'Netscape')
    {
        var ua = navigator.userAgent;
        var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat( RegExp.$1 );
    }
    return rv;
}

//предзагрузка погрузчика
function preloadImg() {
    var preload = document.getElementsByClassName('preload')[0];
    var img = document.createElement('img');

    if(getInternetExplorerVersion()!==-1){
        //Значит это IE
        img.src = 'assets/images/1.svg';
        img.className += 'svg svg-ie';
        preload.appendChild(img);
        return false;
    }

    //устранили кеширование
    img.src = 'assets/images/1_animated.svg' + '?' + Math.random();
    img.className += 'svg';

        preload.appendChild(img);
}