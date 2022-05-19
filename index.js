const express = require('express')
const bodyParser = require('body-parser')
const path = require("path");
const app = express()
const port = 3030
const db = require('./queries');
const { cookie } = require('express/lib/response');


app.use(express.static(__dirname + '/public'));
app.use(express.static('static'));

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)


// GET API's

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname+'/html/index.html'));
})

app.get('/dashboard', (request, response) => {
    console.log(request.headers.cookie)
    if(checkIfValidUser(request.headers.cookie) == 1)
    {
        response.send("Sorry! As of now admins can only view admin panel")
    }
    else if(checkIfValidUser(request.headers.cookie)==2)
    {
        response.sendFile(path.join(__dirname+'/html/dashboard.html'));
    }
    else
    {
        response.send("Sorry! Kindly login and use")
    }
})

app.get('/admin', (request, response) => {
    if(checkIfValidUser(request.headers.cookie) == 1)
    {
        response.sendFile(path.join(__dirname+'/html/admin.html'));
    }
    else if(checkIfValidUser(request.headers.cookie)==2)
    {
        response.send("Sorry! You are not authorized to view admin panel")
    }
    else
    {
        response.send("Sorry! Kindly login and use")
    }
})

app.get('/getCustomer', db.getUser)

app.get('/getProducts', db.getProducts)

app.get('/getBrands', db.getBrands)

app.get('/getBrandProduct', db.getBrandProduct)

app.get('/getSpecificProduct', db.getSpecificProduct)




// POST API's

app.post('/addCustomer', db.createUser)

app.post('/addProduct', db.addProduct)

app.post('/updateProduct', db.updateProduct)


//  WEB APP LISTENER

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})


function checkIfValidUser(cookie)
{
    if(cookie)
    {
        if(cookie == "SESSION=admin@shopify.com")
        {
            return 1;
        }
        else if(cookie.includes("SESSION"))
        {
            return 2;
        }
        else
        {
            return 0;
        }
    }
    else
    return 0;
   
}