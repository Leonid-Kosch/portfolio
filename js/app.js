const screenHeight = window.screen.height
let navLinksAll = document.querySelectorAll('.nav__links a');
let mainBoxAll = document.querySelectorAll('header > div');
let length = navLinksAll.length;
let knowMoreButton = document.querySelector('.main-box__start button');
let body = document.querySelector('body');
let image = document.querySelector('#aboutMeImage');
let wheelActive = true;
let sectionActive;
let inputs = document.querySelectorAll('.input');
let inputsText = document.querySelectorAll('.input-text');
let iframe = document.querySelector('iframe');
let submitWrapper = document.querySelector('.submit-wrapper');
let hamburger = document.querySelector('.hamburger');
let navLinks = document.querySelector('.nav__links');
console.log(mainBoxAll)

body.addEventListener('mousemove', function(e){
    let x = e.clientX / window.innerWidth;
    let y = e.clientY / window.innerHeight;
    image.style.transform = 'translate('+ x * -20 + 'px, ' + y * -20 + 'px)';
});
for(let inputNumber = 0; inputNumber < inputs.length; inputNumber++){
    inputs[inputNumber].onfocus  = function() {
        inputsText[inputNumber].classList.add('span_active');
    };
    inputs[inputNumber].onblur = function() {
        if(inputs[inputNumber].value == ''){
            inputsText[inputNumber].classList.remove('span_active');
        }
    };
}

iframe.onload = function(){
    submitWrapper.classList.add('submit-wrapper_active');
    setTimeout(() => {
        document.forms.submit.reset();
        for(let textNumber = 0; textNumber < 3; textNumber++){
            inputsText[textNumber].classList.remove('span_active');
        }
        submitWrapper.classList.remove('submit-wrapper_active');
    }, 3000);
};

if (screenHeight > 800){
    let startTouchPosition = null; //создаем переменную для стартовой позиции нажатия
    let moveTouchPosition = null; //создаем переменную в которую будут попадать позиции при движении палцьа
    body.addEventListener('touchstart', function(e) { // запускаем функцию в момент нажатия 
    startTouchPosition = e.touches[0].pageY; //получаем координаты нажатия по Y и помещяем в переменную start touch position 
    });
    body.addEventListener('touchmove', function(e){
        moveTouchPosition = e.touches[0].pageY; //координаты которые палец прошел будут поподать в эту переменную
        if(wheelActive == true){
            wheelActive = false;
            for(let sectionNumber = 0; sectionNumber < 3; sectionNumber++){
                if(mainBoxAll[sectionNumber].classList.contains('main-box_active')){
                    sectionActive = sectionNumber;
                }
            }
            if(startTouchPosition > moveTouchPosition){ //если стартовая позиция больше чем позиция при двжиении это значит что палец идет вверх а страница должна идти вниз
                //вперед
                if(sectionActive < 3){
                    mainBoxAll[sectionActive].classList.remove('main-box_active');
                    navLinksAll[sectionActive].classList.remove('nav__links_active');
                    sectionActive++;
                    mainBoxAll[sectionActive].classList.add('main-box_active');
                    navLinksAll[sectionActive].classList.add('nav__links_active');
                }
            } else{
                //назад
                if(sectionActive > 0){
                    mainBoxAll[sectionActive].classList.remove('main-box_active');
                    navLinksAll[sectionActive].classList.remove('nav__links_active');
                    sectionActive--;
                    mainBoxAll[sectionActive].classList.add('main-box_active');
                    navLinksAll[sectionActive].classList.add('nav__links_active');
                }
            }
        }
    })
    body.addEventListener('touchend', function(){
        startTouchPosition = null;
        moveTouchPosition = null;
        wheelActive = true;
    })
    
    for(let navLinkNumber = 0; navLinkNumber < length; navLinkNumber++){
        navLinksAll[navLinkNumber].onclick = function() {
            for(let divNumber = 0; divNumber < length; divNumber++){
                mainBoxAll[divNumber].classList.remove('main-box_active');
                navLinksAll[divNumber].classList.remove('nav__links_active');
            }
            mainBoxAll[navLinkNumber].classList.add('main-box_active');
            navLinksAll[navLinkNumber].classList.add('nav__links_active');
        }
    }
    
    knowMoreButton.onclick = function() {
        mainBoxAll[0].classList.remove('main-box_active');
        navLinksAll[0].classList.remove('nav__links_active');
        mainBoxAll[1].classList.add('main-box_active');
        navLinksAll[1].classList.add('nav__links_active');
        
    };
    body.onwheel = function(event) { //функция запускаеться в момент когда над body крутиться колесико
        if(wheelActive == true){ //если активация прокрутки включена
            wheelActive = false; //выключаем активацию прокрутки
            for(let navLinkNumber = 0; navLinkNumber < length; navLinkNumber++){ //цикл который повторяеться столько раз сколько всего секции есть на сайте
                if (navLinksAll[navLinkNumber].classList.contains('nav__links_active')){ //если мы нашли ссылку у которой класс active 
                    navLinksAll[navLinkNumber].classList.remove('nav__links_active'); //удаляем у этой ссылки класс active
                    mainBoxAll[navLinkNumber].classList.remove('main-box_active'); // удаляем у соответствуещей секции класс active
                    if (event.deltaY > 0 && navLinkNumber < 3){ // если колесико прокрутили на себя и индекс активнйо ссылки меньше 3
                        sectionActive = navLinkNumber + 1; //тогда в переменную sectionActive подстовляем число равное индексу ссылки на которой мы находились +1                 
                    } else if(event.deltaY < 0 && navLinkNumber > 0){ //иначе если колесико крутиться от себя и индекс активной ссылки больше 0
                        sectionActive = navLinkNumber - 1; //подствялем число равное индексу ссылки на которой мы находились -1
                    }
                }
            }    //конец цикла                
            navLinksAll[sectionActive].classList.add('nav__links_active'); // добавляем нужной ссылке класс active
            mainBoxAll[sectionActive].classList.add('main-box_active'); // добавляем нужной секции класс active
            setTimeout(() => { // ждем 1 сек
                wheelActive = true; //вкл активацию прокрутки
            }, 1000);
        }
    }
}

new Swiper ('.swiper',{                                                         
    effect:'coverflow',                                                         
    autoplay:{                                                         
        delay:3000,                                                         
        stopOnLastSlide:false,                                                         
        disableOnInteraction:false,                                                          
    },                                                         
    speed:1500,                                                         
    loop:true,                                                         
    navigation:{                                                         
        nextEl:'.swiper-button-next',                                                         
        prevEl:'.swiper-button-prev',                                                         
    },                                                         
    pagination:{                                                         
        el:'.swiper-pagination',                                                         
        type:'bullets',                                                         
        dynamicBullets:true,                                                         
        clickable:true,                                                         
    }                                                         
});

hamburger.onclick = function() {
    hamburger.classList.toggle('hamburger_active');
    navLinks.classList.toggle('nav__links_active');
    body.classList.toggle('scroll-none');
}
for(let number = 0; number < 4; number++){
    navLinksAll[number].onclick = function() {
        for(let number = 0; number < 4; number++){
            navLinksAll[number].classList.remove('nav__links_active');
        }
        navLinksAll[number].classList.add('nav__links_active');
        hamburger.classList.remove('hamburger_active');
        navLinks.classList.remove('nav__links_active');
        body.classList.remove('scroll-none');
    }
}

