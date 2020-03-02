const form = document.querySelector("form");
const phone = document.querySelector(".user-phone");
const password = document.querySelector(".user-password");
const age = document.querySelector(".user-age");
const obj = {};
const re = /^\d+$/;

form.addEventListener("submit", formDataCollect);
document.body.addEventListener("click", removeClassFromFormElements);

function formDataCollect(e) {
    e.preventDefault();
    Array.from(form.elements).forEach(element => {
        if (element.value === "") {
            element.classList.add("required");
        } else {
            element.classList.add("done");
        }
    });
    testPassword(password);
    testAge(age);
    testPhone(phone);
    prepareData();
}

function removeClassFromFormElements() {
    Array.from(form.elements).forEach(element => {
        if (element.classList.contains("required")) {
            element.classList.remove("required");
        } else if (element.classList.contains("done")) {
            element.classList.remove("done");
        }
    });
}

function testPhone(phoneInput) {
    if (phoneInput.value.match(re)) {
        phoneInput.classList.add("done");
    } else {
        phoneInput.classList.add("required");
        phoneInput.classList.remove("done");
    }
}

function testPassword(passInput) {
    if (
        passInput.value.match(/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])/g)
    ) {
        passInput.classList.add("done");
    } else {
        passInput.classList.add("required");
        passInput.classList.remove("done");
    }
}
function testAge(inputAge) {

    if (inputAge.value.match(re)) {
        inputAge.classList.add("done");
    } else {
        inputAge.classList.remove("done");
        inputAge.classList.add("required");
    }
}

function prepareData() {
    if (!document.querySelector('.user-password').classList.contains('required') &&
        Array.from(form.elements).every(element => { return element.classList.contains("done");})){
        let formData = new FormData(form);
        for (let [name, value] of formData) {
            obj[name] = value;
        }
        sendData(obj);
        alert('Account created');
        form.reset();
    }
}

function sendData(object) {
    object.geo_location = '1111';
    fetch('https://venify.herokuapp.com/user/register', {
        method: 'POST',
        body: JSON.stringify(object),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
    }).then(response => response.json())
        .then(post => console.log(post))
        .catch(error => console.log(error));
}




//




// const { name, login, sex, age, phone, password } = form.elements;
//     // const result = {
//     //     login: login.value,
//     //     name: name.value,
//     //     sex: sex.value,
//     //     age: age.value,
//     //     phone: phone.value,
//     //     password: password.value
//     // };
//     // console.log(result);
// navigator.geolocation.watchPosition(position => console.log(position));

//  result = Array.from(form.elements).reduce((acc,element)=>{
//     console.log(element);
//     const key = element.getAttribute("name");
//     console.log(acc[key] = element.value);
//     return acc;
//     // return acc[key] = element.value;
// },{});
//  console.log(result);