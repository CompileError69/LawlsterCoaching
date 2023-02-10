
/* Open login form */
document.querySelector("#login-btn").onclick = () => {
    document.querySelector(".login-form-container").classList.toggle("active");
  };
  
  document.querySelector("#close-login-form").onclick = () => {
    document.querySelector(".login-form-container").classList.remove("active");
  };
  
  let header = document.querySelector("header");
  
  window.addEventListener("scroll", () => {
    header.classList.toggle("shadow", window.scrollY > 0);
  });
  
  let menu = document.querySelector(".navbar");
  
  document.querySelector("#menu-icon").onclick = () => {
    menu.classList.toggle("active");
  };
  /* remove shadow on scroll */
  window.onscroll = () => {
    menu.classList.remove("active");
  };

  /* Open Booking page */
  document.querySelector('#book-btn').onclick = () =>{
    document.querySelector('.book-form-container').classList.toggle('active');
  }
  
  
  document.querySelector('#close-book-form').onclick = () =>{
    document.querySelector('.book-form-container').classList.remove('active');
  }
  
  

  /* New login */
  function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

/* Validation for input fields */
function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    /*
    loginForm.addEventListener("submit", e => {
        e.preventDefault();

        // Perform your AJAX/Fetch login

        //setFormMessage(loginForm, "error", "Invalid username/password combination");
    });*/
    
    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10) {
                setInputError(inputElement, "Username must be at least 10 characters in length");
            }

            if ((e.target.id === "signupPassword" && e.target.value.length > 0) || (e.target.id === "signupConfirmPassword" && e.target.value.length > 0)) {
              if (e.target.value.length < 8) {
                  setInputError(inputElement, "Password must contain at least 8 characters");
              } 
              
              if (e.target.id === "signupConfirmPassword") {
                  let signupPassword = document.querySelector("#signupPassword").value;
                  let signupConfirmPassword = document.querySelector("#signupConfirmPassword").value;
  
                  if (signupPassword !== signupConfirmPassword) {
                      setInputError(inputElement, "Password does not match");
                  }
              }
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
});

/* Loader */
fadeOut();
function loader(){
    document.querySelector('.loader-container').classList.add('active');
}

function fadeOut(){
    setTimeout(loader,1000);
}

/* Reviews */
var swiper = new Swiper(".reviews-slider", {
    spaceBetween: 10,
    grabCursor:true,
    loop:true,
    centeredSlides: true,
    autoplay: {
      delay: 9500,
      disableOnInteraction: false,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
});

/* Database */
const APIKEY = "63dfe1ab3bc6b255ed0c46bf";

// GET Data
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://lawlstercoachingdb-781d.restdb.io/rest/user-info",
  "method": "GET",
  "headers": {
    "content-type": "application/json",
    "x-apikey": APIKEY,
    "cache-control": "no-cache"
  }
}

let jsondata = {
  "name": contactName,
  "email": contactEmail,
  "password": contactMessage
};

$.ajax(settings).done(function (response) {
  console.log(response);
});

// POST Data
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://lawlstercoachingdb-781d.restdb.io/rest/user-info",
  "method": "POST",
  "headers": {
    "content-type": "application/json",
    "x-apikey": "<your CORS apikey here>",
    "cache-control": "no-cache"
  },
  "processData": false,
  "data": JSON.stringify(jsondata)
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

/* Contact us send email */
function sendEmail(){
   
  Email.send({
    Host : "smtp.elasticemail.com",
    Username : 'vernonkoh123@gmail.com',
    Password : "F3067591595AB4C402CB0B5A3FF33C715A30",
    To : 'lawlsters03@gmail.com',
    From : document.getElementById("email").value,
    Subject :  "New Contact Us Enquiry",
    Body : "Name: " + document.getElementById("name").value
        + "<br> Email: " + document.getElementById("email").value
        + "<br> Subject: " + document.getElementById("subject").value
        + "<br> Message: " + document.getElementById("message").value
        
}).then(
  message => alert("Message Sent Succesfully")
);
}


/* Booking page sending emails */
function sendBooking(){
  
  Email.send({
    Host : "smtp.elasticemail.com",
    Username : 'vernonkoh123@gmail.com',
    Password : "F3067591595AB4C402CB0B5A3FF33C715A30",
    To : document.getElementById("bookingEmail").value,
    From : 'vernonkoh123@gmail.com',
    Subject :  "Your Valorant Coaching Date",
    Body : "Name: " + document.getElementById("userName").value
        + "<br> Email: " + document.getElementById("bookingEmail").value
        + "<br> Date of Booking: " + document.getElementById("bookingDate").value
        + "<br> Message: Thank you for Ordering a Coaching Service From Us! "
        
}).then(
  message => alert("Message Sent Succesfully")
);
}

/* Newsletter Subscribe send emails */
function sendNews(){
  
  Email.send({
    Host : "smtp.elasticemail.com",
    Username : 'vernonkoh123@gmail.com',
    Password : "F3067591595AB4C402CB0B5A3FF33C715A30",
    To : document.getElementById("newsEmail").value,
    From : 'vernonkoh123@gmail.com',
    Subject :  "Subscription on Updates of discounts",
    Body : "Email: " + document.getElementById("newsEmail").value
        + "<br> Message: We will update you on future discount codes for Valorant Coaching Services "
        
}).then(
  message => alert("Message Sent Succesfully")
);
}