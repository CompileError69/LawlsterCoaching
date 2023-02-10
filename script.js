
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

document.querySelector('#book-btn').onclick = () =>{
  document.querySelector('.book-form-container').classList.toggle('active');
};
  
  
document.querySelector('#close-book-form').onclick = () =>{
  document.querySelector('.book-form-container').classList.remove('active');
};

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
    
let validForm = false;

document.querySelectorAll(".form__input").forEach(inputElement => {
  /* For login page */
  inputElement.addEventListener("blur", e => {
    if (e.target.id === "username-input" && e.target.value.length > 0 && e.target.value.length === 0) {
      setInputError(inputElement, "Username cannot be blank");
      validForm = false;
    } 

    document.querySelector("#loginSubmit").disabled = !validForm;
  });

  /* For create account page */
  inputElement.addEventListener("blur", e => {
    if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10) {
      setInputError(inputElement, "Username must be at least 10 characters in length");
      validForm = false;
    }

    if ((e.target.id === "signupPassword" && e.target.value.length > 0) || (e.target.id === "signupConfirmPassword" && e.target.value.length > 0)) {
      if (e.target.value.length < 8) {
        setInputError(inputElement, "Password must contain at least 8 characters");
        validForm = false;
      } 
              
      if (e.target.id === "signupConfirmPassword") {
        let signupPassword = document.querySelector("#signupPassword").value;
        let signupConfirmPassword = document.querySelector("#signupConfirmPassword").value;

        if (signupPassword !== signupConfirmPassword) {
          setInputError(inputElement, "Password does not match");
          validForm = false;
        }
      }
    }
      
    document.querySelector("#signupSubmit").disabled = !validForm;
  });

  /* For booking page */
  inputElement.addEventListener("blur", e => {
    if (e.target.id === "userName" && e.target.value.length > 0 && e.target.value.length === 0) {
      setInputError(inputElement, "Name cannot be blank");
      validForm = false;
    } 

    if (e.target.id === "bookingEmail" && e.target.value.length > 0 && e.target.value.length === 0) {
      setInputError(inputElement, "Email cannot be blank");
      validForm = false;
    }

    if (e.target.id === "bookingDate" && e.e.target.value.length > 0 && e.target.value.length === 0) {
      setInputError(inputElement, "Date cannot be blank");
      validForm = false;
    }

    if (e.target.id === "msgDetails" && e.e.target.value.length > 0 && e.target.value.length === 0) {
      setInputError(inputElement, "Message cannot be blank");
      validForm = false;
    }

    document.querySelector("#bookingSubmit").disabled = !validForm;
  });

  inputElement.addEventListener("input", e => {
    clearInputError(inputElement);
    validForm = true;
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

/* -------------------- Handling Database -------------------- */
$(document).ready(function() {
  const APIKEY = "63dfe1ab3bc6b255ed0c46bf";

  $(".loginAlert").hide();

  // Function to GET data (For user accounts)
  function getAccounts() {
    var getSettings = {
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

    $.ajax(getSettings).done(function (response) {
      console.log(response);
    });
  }

  // Funtion to handle click event and POST data (After user creates an account)
  $("#signupSubmit").on("click", function(e) {
      e.preventDefault();

      // Get the values from the fields
      let signupEmail = $("#signupEmail").val();
      let signupUsername = $("#signupUsername").val();
      let signupPassword = $("#signupPassword").val();
      let signupConfirmPassword = $("#signupConfirmPassword").val();

      let jsondata = {
        "email": signupEmail,
        "username": signupUsername,
        "password": signupPassword
      };

      // GET request settings
      var getSettings = {
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

      //GET request to retrieve data from the database
      $.ajax(getSettings).done(function (response) {
        let usernameExists = false;

        // Create an array of usernames from the database
        usernameExists = response.map(user => user.username);

        // Check if input username exists
        if (usernameExists.includes(signupUsername)) {
          $(".form__input-error-message").html("Username already exists").css("color", "red");
          return false;
        } else {
          // POST request settings
          var postSettings = {
            "async": true,
            "crossDomain": true,
            "url": "https://lawlstercoachingdb-781d.restdb.io/rest/user-info",
            "method": "POST",
            "headers": {
            "content-type": "application/json",
            "x-apikey": APIKEY,
            "cache-control": "no-cache"
            },
            "processData": false,
            "data": JSON.stringify(jsondata),
            "beforeSend": function() {
                $("#signupSubmit").prop("disabled", true);
                $("#createAccount").trigger("reset");
            }
          }

          $.ajax(postSettings).done(function (response) {
            console.log(response);
            $(".loginAlert").show().fadeOut(3000);
            $("#signupSubmit").prop("disabled", false);
          });
        }
      });
    });
  });

  // Function to GET data (For user bookings)
  function getBooking() {
      var getSettings = {
          "async": true,
          "crossDomain": true,
          "url": "https://lawlstercoachingdb-781d.restdb.io/rest/user-booking",
          "method": "GET",
          "headers": {
            "content-type": "application/json",
            "x-apikey": APIKEY,
            "cache-control": "no-cache"
          }
      }

      $.ajax(getSettings).done(function (response) {
          console.log(response);
      });
  }

  // Funtion to handle click event and POST data (After user make a booking)
  $("#bookingSubmit").on("click", function(e) {
    e.preventDefault();

    // Get the values from the fields
    let userName = $("#userName").val();
    let bookingEmail = $("#bookingEmail").val();
    let bookingDate = $("#bookingDate").val();
    let msgDetails = $("#msgDetails").val();

    let jsondata = {
      "name": userName,
      "email": bookingEmail,
      "date": bookingDate,
      "message": msgDetails
    };

    // GET request settings
    var getSettings = {
      "async": true,
      "crossDomain": true,
      "url": "https://lawlstercoachingdb-781d.restdb.io/rest/user-booking",
      "method": "GET",
      "headers": {
      "content-type": "application/json",
      "x-apikey": APIKEY,
      "cache-control": "no-cache"
      } 
    }

    // POST request settings
    var postSettings = {
      "async": true,
      "crossDomain": true,
      "url": "https://lawlstercoachingdb-781d.restdb.io/rest/user-booking",
      "method": "POST",
      "headers": {
      "content-type": "application/json",
      "x-apikey": APIKEY,
      "cache-control": "no-cache"
      },
      "processData": false,
      "data": JSON.stringify(jsondata),
      "beforeSend": function() {
        $("#bookingSubmit").prop("disabled", true);
        $("#createBooking").trigger("reset");
      }
    }

    $.ajax(postSettings).done(function (response) {
      console.log(response);
      $(".loginAlert").show().fadeOut(3000);
      $("#bookingSubmit").prop("disabled", false);
    });
  });

  // Funtion to handle click event (Account login)
  $("#loginSubmit").on("click", function(e) {
    e.preventDefault();

    // Get the values from the fields
    let usernameOrEmail = $("#user-input").val();
    let password = $("#password-input").val();

    let jsondata = {
      "email": usernameOrEmail,
      "username": usernameOrEmail,
      "password": password
    };

    // GET request settings
    var getSettings = {
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

    // POST request settings
    var postSettings = {
      "async": true,
      "crossDomain": true,
      "url": "https://lawlstercoachingdb-781d.restdb.io/rest/user-info",
      "method": "POST",
      "headers": {
      "content-type": "application/json",
      "x-apikey": APIKEY,
      "cache-control": "no-cache"
      },
      "processData": false,
      "data": JSON.stringify(jsondata),
      "beforeSend": function() {
          $("#loginSubmit").prop("disabled", true);
          $("#close-login-form").trigger("reset");
      }
    }

    $.ajax(postSettings).done(function (response) {
      console.log(response);
      getAccounts();

      let userExists = false;
        
      for (let i = 0; i < response.length; i++) {
        if ((response[i].username === usernameOrEmail || response[i].email === usernameOrEmail) && response[i].password === password) {
          userExists = true;
          break;
        }
      }

      if (!userExists) {
        alert("Invalid username or password");
      }

      $(".loginAlert").show().fadeOut(3000);
      $("#loginSubmit").prop("disabled", false);
    });
  });
})

function sendEmail() {
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