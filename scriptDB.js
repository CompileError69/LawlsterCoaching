/* Database */

$(document).ready(function() {
    const APIKEY = "63dfe1ab3bc6b255ed0c46bf";
    getContacts();

    // Function to GET data
    function getContacts() {
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
          
        $.ajax(settings).done(function (response) {
            console.log(response);
        });
    }

    // Funtion to POST data
    $("#signupSubmit").on("click", function(e) {
        e.preventDefault();
    
        //[STEP 2]: let's retrieve form data
        //for now we assume all information is valid
        //you are to do your own data validation
        let signupEmail = $("#signupEmail").val();
        let signupUsername = $("#signupUsername").val();
        let signupPassword = $("#signupPassword").val();
    
        //[STEP 3]: get form values when user clicks on send
        //Adapted from restdb api
        let jsondata = {
          "email": signupEmail,
          "username": signupUsername,
          "password": signupPassword
        };

        // POST Data
        var settings = {
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
    
        /* Password validation (Testing. Not finalized)
        $('#signupPassword, #signupConfirmPassword').on('keyup', function () {
            if ($('#signupPassword').val() == $('#signupConfirmPassword').val()) {
              $('.form__input-error-message').html('Password Matches)').css('color', 'green');
              $.ajax(settings).done(function (response) {
                console.log(response);
                getContacts();
            });
            } else 
              $('.form__input-error-message').html('Not Matching').css('color', 'red');
        });*/
        
        $.ajax(settings).done(function (response) {
            console.log(response);
            getContacts();
        });
    });
})