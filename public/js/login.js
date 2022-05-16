document.getElementById("signuplog").addEventListener("click", function signupWithEmail(event) {
    event.preventDefault()
    alert("hi")
    let uname = document.getElementById("sign-up-username").value;
    let email = document.getElementById("sign-up-email").value;
    let password = window.btoa(document.getElementById("sign-up-pass").value);

    if (true) {
        alert('hi')
        let data = {}
        data.name = uname;
        data.email = email;
        data.password = password;

        createUserAPI(data).then(function (res) {
            if (res == "SUCCESS")
                iziToast.error({
                    message: "Signing in",
                    position: "topRight"
                })
            console.log("logged in")
            window.location.href = "/dashboard"
        })
    } else {
        iziToast.error({
            message: "Enter correct email",
            position: "topRight"
        })
    }
})

document.getElementById("signinlog").addEventListener("click", function loginWithEmail(event) {
    event.preventDefault()
    alert("hi")
    let email = document.getElementById("sign-in-email").value;
    let password = window.btoa(document.getElementById("sign-in-pass").value);

    if (true) {
        alert('hi')
        let data = {}
        data.email = email;
        data.password = password;

        getUserAPI(data).then(function (res) {
            console.log(res)
            if (res == "SUCCESS")
                iziToast.error({
                    message: "Signing in",
                    position: "topRight"
                })
            console.log("logged in")

            if (email = "admin@shopify.com") {
                window.location.href = "/admin"
            } else {
                window.location.href = "/dashboard"

            }
        })
    } else {
        iziToast.error({
            message: "Enter correct email",
            position: "topRight"
        })
    }
});

