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
        .then(res=>res.json())
        .then(function (res) {
            console.log("inside")
            console.log(res.password)
            console.log(data.password)
            if (res.password == data.password)
            {
                console.log("password matching")
            }
            else
            {
                throw "invalid username or password"
            }
        })
        .then(res => postLogin(data.email))
        .catch(function (error) {
            alert("invalid username or password")
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

async function getAllBrandsForAdminAPI() {
    console.log('getAllBrandsAPI')
    await fetch("/getBrands")
        .then(res=>res.json())
        .then(res => adminBrandLoader(this.formatResponse(res)))

        .catch(function (error) {
            console.log(error)

            iziToast.error({
                message: error.message,
                position: "topRight"
            })
        });
}

async function getAllBrandsForDashAPI() {
    console.log('getAllBrandsAPI')
    await fetch("/getBrands")
        .then(res=>res.json())
        .then(res => loadBrandInFilter(this.formatResponse(res)))

        .catch(function (error) {
            console.log(error)

            iziToast.error({
                message: error.message,
                position: "topRight"
            })
        });
}

async function getProudctsOfBrandForAdminAPI(data) {
    console.log('getProudctsOfBrandAPI')
    await fetch("/getBrandProduct?brandid=" + data)
        .then(res=>res.json())
        .then(res => adminProductLoader(this.formatResponse(res)))

        .catch(function (error) {
            console.log(error)

            iziToast.error({
                message: error.message,
                position: "topRight"
            })
        });
}

async function getProudctsOfBrandForDashAPI(data) {
    console.log('getProudctsOfBrandAPI')
    await fetch("/getBrandProduct?brandid=" + data)
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

async function getSpecificProductForAdminAPI(data) {
    console.log('getSpecificProductAPI')
    await fetch("/getSpecificProduct?productid=" + data)
    .then(res=>res.json())
    .then(res => adminLoadFullProduct(res))

        .catch(function (error) {
            console.log(error)

            iziToast.error({
                message: error.message,
                position: "topRight"
            })
        });
}


async function getSpecificProductForDashAPI(data) {
    console.log('getSpecificProductAPI')
    await fetch("/getSpecificProduct?productid=" + data)
    .then(res=>res.json())
    .then(res => addToMyCart(res))

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
            alert("added successfully - later be moved to toast msg")
            return res
        })
        .catch(function (error) {
            iziToast.error({
                message: error.message,
                position: "topRight"
            })
        });
}

async function updateProductServerCall(data) {
    console.log('updateProductServerCall')
    await fetch("/updateProduct", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({data}),
    })
        .then(function (res) {
            console.log(res)
            alert("updated successfully - later be moved to toast msg")
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
    const ta = Object.keys(res).map(key => ({
        ...res[key],
        tournamentID: key
    }));
    console.log("after formatting response ==>", ta)
    return ta;
}

