$(document).ready(() => {
    //Фукции при загрузке страницы
    changeHeader();
    firstChangeSelectUrl();

    //Изменние хедера при скролле
    $(window).on('scroll', () => {
        changeHeader();
    });

    //Маска для инпутов
    IMask(document.getElementById('phone'), {
        mask: '+{7}-000-000-00-00',
    });

    IMask(document.getElementById('phoneModal'), {
        mask: '+{7} (000) 000-00-00',
    });
    
    IMask(document.querySelector('.phone2'), {
        mask: '+{7}-000-000-00-00',
    });

    //Отслеживание измения url для назначения выбранного пункта в heder
    window.addEventListener('hashchange', function(e) {
        changeSelectUrl(e.newURL);
    });
    $('.header__logo').on('click', (e) => {
        e.preventDefault();
        $(window).scrollTop(0);
        $('.header__menu-link.active').removeClass('active');
    })

    //Слайдеры
    new Swiper('.etap__content-wrapper', {
        loop: false,
        spaceBetween: 17,
        slidesPerView: 1,
        navigation: {
            nextEl: '.etap__arrow-next',
            prevEl: '.etap__arrow-back'
        },
        breakpoints:{
            960:{
                slidesPerView: 3,
            }
        }
    })

    //Модальные окна
    //Открытие
    $('.js-open-modal').on('click', function(e){
        e.preventDefault();

        openModal($(this).data('modal'));
    })
    //Закрытие
    $('.js-close-modal').on('click', function(e){
        e.preventDefault();

        closeModal();
    })
    $('.modal').on('click', function(e){

        if(e.target === document.querySelector('.modal')){
            closeModal();
        }

    })
    $('.modal__exit').on('click', () => {
        closeModal();
    })

    $('.modal__form').on('submit', (e) => {
        e.preventDefault();

        axios.post('/email.php',{
            "name": $('#nameModal').val(),
            "phone": $('#phoneModal').val()
        }).then(() => {
            closeModal();
            openModal('thanks');
        });
    })

    $('.goZayv__right').on('submit', (e)=>{
        e.preventDefault();

        axios.post('/email.php',{
            "name": $('#name').val(),
            "phone": $('#phone').val()
        }).then((res) => {
            console.log(res);
            openModal('thanks');
        });
    })

    $('.header__menu-button').on('click', function(e) {
        $(this).toggleClass('active');
        $('.header__mobileMenu').toggleClass('active');
        if($(this).hasClass('active')){
            $('.header').addClass('black');
        } else {
            $('.header').removeClass('black');
        }
    })
    $('.header__mobileMenu-link').on('click', function(e){
        $('.header__menu-button').toggleClass('active');
        $('.header__mobileMenu').toggleClass('active');
        if($('.header__menu-button').hasClass('active')){
            $('.header').addClass('black');
        } else {
            $('.header').removeClass('black');
        }
    })
})

const changeHeader = () => {
    if($(window).scrollTop() > 100){
        $('.header').addClass('black');
    } else {
        $('.header').removeClass('black');
    }
}

const firstChangeSelectUrl = () => {
    const id = location.hash || '';

    $('.header .header__menu-link').each(function(){
        if($(this).attr('href') == id){
            $(this).addClass('active');
        }
    })
}

const changeSelectUrl = (url) => {
    url = '#' + url.split('#')[1];
    $('.header__menu-link.active').removeClass('active');

    $('.header .header__menu-link').each(function(){
        if($(this).attr('href') == url){
            $(this).addClass('active');
        }
    })
}

//Модальные окна
//Открытие
function openModal(id){
    $('.modal#'+id).addClass('active');
    $('.modal__background').addClass('active');
    $('body').addClass('noScroll');
}

//Закрытие
function closeModal() {
    $('.modal.active').removeClass('active');
    $('.modal__background').removeClass('active');
    $('body').removeClass('noScroll');
}

//Закрытие одного модального окна и открытие другого
function reOpenModal(id) {
    $('.modal.active').removeClass('active');
    $('.modal#'+id).addClass('active');
}