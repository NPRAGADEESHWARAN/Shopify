getAllBrandsForAdminAPI();

function addProductInJS()
{
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

function updateProductInJS()
{
    let data = {}
    data.brandid = document.getElementById("brandLister").value;
    data.productid = document.getElementById("productLister").value;
    data.brandName = document.getElementById("brandName1").value;
    data.productName = document.getElementById("productName1").value;
    data.productPrice = document.getElementById("productPrice1").value;
    data.inStock = document.getElementById("inStock1").value;
    data.productDescription = document.getElementById("productDescription1").value;
    data.imageURL = document.getElementById("imageURL1").value;

    console.log(data)


    updateProductServerCall(data).then(function (res) {
        if(res == "SUCCESS")
            iziToast.error({
                message: "Signing in",
                position: "topRight"
            })
        console.log("updated successfully")
    })

}


function adminBrandLoader(result)
{
    console.log("Admin Brand loader=>")
    console.log(result)
    let brandLister = document.getElementById("brandLister");
    for (let i = 0; i < result.length; i++) {
        console.log(i)
        console.log(result[i])
        let brand = result[i]
        let newDropDown = document.createElement("option");
        newDropDown.value=brand.brandid;
        newDropDown.innerHTML = brand.brandname;
        brandLister.appendChild(newDropDown)
    }
}

function adminProductLoader(result)
{
    console.log("Admin Brand loader=>")
    console.log(result)
    let brandLister = document.getElementById("productLister");
    for (let i = 0; i < result.length; i++) {
        console.log(i)
        console.log(result[i])
        let product = result[i]
        let newDropDown = document.createElement("option");
        newDropDown.value = product.productid;
        newDropDown.innerHTML = product.productname;
        brandLister.appendChild(newDropDown)
    }
}

function adminLoadFullProduct(result)
{
    console.log("Admin Brand loader=>")
    console.log(result.brandname)

    document.getElementById("brandName1").value = result.brandname;
    document.getElementById("productName1").value = result.productname;
    document.getElementById("productPrice1").value = result.price;
    document.getElementById("inStock1").value = result.stock;
    document.getElementById("productDescription1").value = result.description;
    document.getElementById("imageURL1").value = result.image;
   
}

function ifBrandChanged()
{
    const myNode = document.getElementById("productLister");
    while (myNode.firstChild) {
      console.log(myNode.lastChild)
    myNode.removeChild(myNode.lastChild);
  }
  let defaultValue = document.createElement('option');

  defaultValue.setAttribute('disabled','true');
  defaultValue.setAttribute('selected','true');
  defaultValue.innerHTML='Select'
  myNode.appendChild(defaultValue)


  document.getElementById("brandName1").value = '';
  document.getElementById("productName1").value = '';
  document.getElementById("productPrice1").value = '';
  document.getElementById("inStock1").value ='';
  document.getElementById("productDescription1").value = '';
  document.getElementById("imageURL1").value = '';
}

document.getElementById("brandLister").addEventListener("change", function adminBrandSelected(event) {
    event.preventDefault()
    let brandLister = document.getElementById("brandLister");
    console.log(brandLister.value)
   
   ifBrandChanged()

    getProudctsOfBrandForAdminAPI(brandLister.value)
});




document.getElementById("productLister").addEventListener("change", function adminProductSelected(event) {
    event.preventDefault()
    let productLister = document.getElementById("productLister");
    getSpecificProductForAdminAPI(productLister.value)
});