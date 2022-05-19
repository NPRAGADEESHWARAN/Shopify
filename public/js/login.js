document.getElementById("signuplog").addEventListener("click", function signupWithEmail(event) {
    event.preventDefault()
    let uname = document.getElementById("sign-up-username").value;
    let email = document.getElementById("sign-up-email").value;
    let password = window.btoa(document.getElementById("sign-up-pass").value);

    if (email && password) {
        let data = {}
        data.name = uname;
        data.email = email;
        data.password = password;

        createUserAPI(data).then(function (res) {
            if (res == "SUCCESS")
            {
                iziToast.error({
                    message: "Signing in",
                    position: "topRight"
                })
            console.log("signup successuful")

            setCookie(email)
            
            if (email = "admin@shopify.com") {
                window.location.href = "/admin"
            } else {
                window.location.href = "/dashboard"

            }
            }
            else
            {
                alert('incorrect username and password')
            }
                
        })
    } else {
        alert('email and password should not be empty')

        iziToast.error({
            message: "Enter correct email",
            position: "topRight"
        })
    }
})

document.getElementById("signinlog").addEventListener("click", function loginWithEmail(event) {
    event.preventDefault()
    let email = document.getElementById("sign-in-email").value;
    let password = window.btoa(document.getElementById("sign-in-pass").value);

    if (email && password) {
        let data = {}
        data.email = email;
        data.password = password;

        getUserAPI(data)
    }
    else{
        alert('email and password should not be empty')
    }
});

function postLogin(email)
{
    console.log("logged in")
    setCookie(email)

    if (email == "admin@shopify.com") {
        window.location.href = "/admin"
    } else {
        window.location.href = "/dashboard"

    }
}