const form = document.querySelector('.registration-form');
const login = document.querySelector('.user-name');
const password = document.querySelector('.user-password');
const object = {};
const swiperWrapper = document.querySelector('.swiper-wrapper');
const swiperContainer = document.querySelector('.swiper-container');
form.addEventListener('submit', formSubmit);
let markup;

function formSubmit(e) {
    e.preventDefault();
    object.login = login.value;
    object.password = password.value;
    swiperContainer.classList.remove('none');
    fetch('https://venify.herokuapp.com/user/login', {
        method: 'POST',
        body: JSON.stringify(object),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
    })
        .then(response => response.json())
        .then(post => {
            form.innerHTML = '';
            getMatchedList();
            console.log(post)
        })
        .catch(error => console.log(error));

}


function getMatchedList() {
    fetch('https://venify.herokuapp.com/user/mathchedList', {
        headers: {
            authorization: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZV9udW1iZXIiOiIwNTAwNzExNTg0IiwiYWdlIjoiMTkiLCJpYXQiOjE1ODMzNDU0MjN9.cnXdZSyaT3R_Pacd8y9sgf-ihw2G73JyvGi-aNvCkp2EBlr2Znd3-KgnNydc12TJkzbVaXNZD-cXNZtB_LLpcw"
        }
    }) .then(response => response.json()).then(posts => {
        markup = posts.map(post=>renderMarkup(post)).join('');
        swiperWrapper.insertAdjacentHTML('beforeend', markup);
        initSwiper();
    })
}


function renderMarkup(posts) {
    return `<img class="swiper-slide" src="${posts.image_list[0]}">`
}

function initSwiper() {
    let mySwiper = new Swiper ('.swiper-container', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
        effect: 'cube',
        grabCursor:true,
        autoplay: {
            delay: 5000,
        },
        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // And if we need scrollbar
        scrollbar: {
            el: '.swiper-scrollbar',
        },
    });
}