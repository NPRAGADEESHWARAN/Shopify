
function addProductInJS()
{
    alert("inside js")
    let data = {}
    data.brandName = document.getElementById("brandName").value;
    data.productName = document.getElementById("productName").value;
    data.productPrice = document.getElementById("productPrice").value;
    data.inStock = document.getElementById("inStock").value;
    data.productDescription = document.getElementById("productDescription").value;
    data.imageURL = document.getElementById("imageURL").value;

    console.log(data)


    addProductServerCall(data).then(function (res) {
        if(res == "SUCCESS")
            iziToast.error({
                message: "Signing in",
                position: "topRight"
            })
        console.log("added successfully")
    })

}