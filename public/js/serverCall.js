async function createUserAPI(data) {
    console.log('createUserapi')
    await fetch("/addCustomer", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({data}),
    })
        .then(function (res) {
            console.log(res)
            return res
        })
        .catch(function (error) {
            console.log(error)
            iziToast.error({
                message: error.message,
                position: "topRight"
            })
        });
}

async function getUserAPI(data) {
    console.log('getUserAPI')
    await fetch("/getCustomer?email=" + data.email)
        .then(function (res) {
            console.log("inside")
            console.log(res)
            if (res.password == data.password)
                return 'SUCCESS'
        })
        .catch(function (error) {
            iziToast.error({
                message: error.message,
                position: "topRight"
            })
        });
}

async function getAllProductsAPI() {
    console.log('getAllProudctsAPI')
    await fetch("/getProducts")
        .then(res=>res.json())
        .then(res => productLoader(this.formatResponse(res)))

        .catch(function (error) {
            console.log(error)

            iziToast.error({
                message: error.message,
                position: "topRight"
            })
        });
}


async function addProductServerCall(data) {
    console.log('addProductServerCall')
    await fetch("/addProduct", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({data}),
    })
        .then(function (res) {
            console.log(res)
            return res
        })
        .catch(function (error) {
            iziToast.error({
                message: error.message,
                position: "topRight"
            })
        });
}


function formatResponse(res) {
    alert("hi")
    const ta = Object.keys(res).map(key => ({
        ...res[key],
        tournamentID: key
    }));
    console.log("after formatting response ==>", ta)
    return ta;
}

