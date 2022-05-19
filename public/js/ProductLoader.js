const { getSpecificProduct } = require("../../queries");

function loadBrandInFilter(result)
{
    console.log("Loading brands in filter")

    let brandFilter = document.getElementById("brandFilter")
    
    for (let i = 0; i < result.length; i++) {
        console.log(i)
        console.log(result[i])
        let brand = result[i]
        let input = document.createElement("input");
        input.type="checkbox"
        // input.setAttribute("class","custom-control-input ")
        input.id = "BRANDFILTER"+brand.brandid;
        brandFilter.appendChild(input)
        let label = document.createElement("label");
        label.setAttribute("class"," small w-100 card-link-secondary px-2 py-1");
        label.setAttribute("for","BRANDFILTER"+brand.brandid);
        label.innerHTML=brand.brandname;
        brandFilter.appendChild(label)
    }
}

function productListener() {
    getAllBrandsForDashAPI();
    getAllProductsAPI()
        .then(function (result) {
        }).catch(function (error) {
        console.log(error)
    });
}

function productLoader(result) {
    console.log("product loader=>")
    deleteAllCards("tournamentCards")
    console.log(result)
    for (let i = 0; i < result.length; i++) {
        console.log(i)
        console.log(result[i])
        let product = result[i]
        loadProductInNewCard(product,"tournamentCards")
        //todo create a new product and load in cards
    }
}

function loadProductInNewCard(product,parentID) {
    $("#tournamentLoader").hide();
    console.log("inside load product" ,product)
    let ids = "PRODUCT" + product.productid;
    const cardParent = document.getElementById(parentID)
    console.log(cardParent)


    let carddiv = document.createElement("div");
    carddiv.className = " col-12 col-md-3 px-3 py-2"

    let card = document.createElement("div");
    card.className = "card";
    card.id = ids
    card.setAttribute("onclick","loadSpecificMovie(this)");


    let image = document.createElement("img");
    image.src = product.image
    image.className = "card-img-top";
    // image.setAttribute("width","50%");
    // image.setAttribute("height","50%");


    let productName = document.createElement("h5");
    productName.id = ids + "PRODUCT_NAME" + product.id;
    productName.className = "text-upper";
    productName.innerText = product.productname;

    let productBrand = document.createElement("h5");
    productBrand.id = ids + "PRODUCT_BRAND" + product.id;
    productBrand.className = "text-upper";
    productBrand.innerText = product.brandname;

    let cardBody = document.createElement("div");
    cardBody.className = "card-body bg-dark rounded-lg p-2";

    let price = document.createElement("span")
    // price.className = "fa fa-star text-primary fa-xs"
    price.innerText = "AMOUNT: " + product.price;

    cardBody.appendChild(productName);
    cardBody.appendChild(price)


    card.appendChild(productBrand);
    card.appendChild(image);
    card.appendChild(cardBody);
    if(parentID=="tournamentCards")
    {
        let mycart = document.createElement("button");
        mycart.id = "PRODUCT_BUTTON"+product.productid;
        mycart.setAttribute("onClick","addToMyCartListener(this.id)");
        mycart.innerHTML="add to cart"
        mycart.setAttribute("class","btD")
        card.appendChild(mycart)
    }
    else
    {
        let productDesc = document.createElement("p");
        productDesc.id = ids + "PRODUCT_DESC" + product.id;
        productDesc.innerText = product.description;
        card.appendChild(productDesc)
    }

    carddiv.appendChild(card);
    cardParent.appendChild(carddiv);
}


function applyFilter() 
{
    var selected = [];
    $('#brandFilter input:checked').each(function() {
        selected.push($(this).attr('id').split("BRANDFILTER")[1]);
    });
   
    console.log(selected)

    if(selected.length!=0)
    {
        getProudctsOfBrandForDashAPI(selected)
    }
    else
    {
        getAllProductsAPI()
    }
}

function deleteAllCards(id) {
    document.getElementById(id).remove();
    let newParent = document.createElement("div");
    newParent.className = "d-flex  flex-wrap col-12"
    newParent.id = id;
    document.getElementById("tournamentBody").appendChild(newParent);
}


function addToMyCartListener(id)
{
    let productID = id.split('PRODUCT_BUTTON')[1];

    getSpecificProductForDashAPI(productID)
}

function addToMyCart(data)
{
    loadProductInNewCard(data,"myTournamentCards")
}


function buy()
{
    var selected = [];
    $('#myTournamentCards div').each(function() {
        selected.push($(this).attr('id'));
    });
   
    if(selected.length==0)
    {
        alert("please add your items to your cart and then buy")
    }
    else{
        alert("huraaay! you have successfuly purchased the item")
        deleteAllCards("myTournamentCards")     
    }
}