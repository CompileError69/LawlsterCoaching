
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

/* -------------------- Handling Database -------------------- */
$(document).ready(function() {
  const APIKEY = "63dfe1ab3bc6b255ed0c46bf";

  // Function to GET data (For user accounts)
  function getContacts() {
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
                  $("#signupSubmit").prop("disabled", false);
                  getContacts();
              });
          }
      });
  });

  // Function to GET data (For user bookings)
  function getContacts() {
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
  $("#signupSubmit").on("click", function(e) {
      e.preventDefault();

      // Get the values from the fields
      let signupEmail = $("#signupEmail").val();
      let signupUsername = $("#signupUsername").val();
      let signupPassword = $("#signupPassword").val();
      let signupConfirmPassword = $("#signupConfirmPassword").val();
  
      let jsondata = {

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
      
      //GET request to retrieve data from the database
      $.ajax(getSettings).done(function (response) {
          let usernameExists = false;
          
          // Create an array of usernames from the database
          usernameExists = response.map(user => user.username);

          // Check if input username exists
          if (usernameExists.includes(signupUsername)) {
              $(".form__input-error-message").html("Username already exists").css("color", "var(--color-error)");
          } else {
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
                      $("#signupSubmit").prop("disabled", true);
                      $("#createAccount").trigger("reset");
                  }
              }

              $.ajax(postSettings).done(function (response) {
                  console.log(response);
                  $("#signupSubmit").prop("disabled", false);
                  getContacts();
              });
          }
      });
  });
})