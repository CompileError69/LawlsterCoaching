/* Database */

$(document).ready(function() {
    const APIKEY = "63dfe1ab3bc6b255ed0c46bf";
    getContacts();

    // Function to GET data
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

    // Funtion to handle click event and POS data
    $("#signupSubmit").on("click", function(e) {
        e.preventDefault();

        // Get the values from the fields
        let signupEmail = $("#signupEmail").val();
        let signupUsername = $("#signupUsername").val();
        let signupPassword = $("#signupPassword").val();
        let signupConfirmPassword = $("#signupConfirmPassword").val();

        // Check if passwords in both fields match
        if (signupPassword !== signupConfirmPassword) {
            $(".form__input-error-message").html("Passwords do not match").css("color", "red");
            return false;
        }
    
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
                    getContacts();
                });
            }
        });
    });
})