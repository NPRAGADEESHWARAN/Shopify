const express = require('express')
const bodyParser = require('body-parser')
const path = require("path");
const app = express()
const port = 3030
const db = require('./queries')


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
    console.log("dashboard")
    response.sendFile(path.join(__dirname+'/html/dashboard.html'));
})

app.get('/admin', (request, response) => {
    response.sendFile(path.join(__dirname+'/html/admin.html'));
})

app.get('/getCustomer', db.getUser)

app.get('/getProducts', db.getProducts)

app.get('/loadEarphone', (request, response) => {
    response.sendFile(path.join(__dirname+'/public/earphones.webp'));
})

app.get('/loadPhone', (request, response) => {
    response.sendFile(path.join(__dirname+'/public/phone.png'));
})


// POST API's

app.post('/addCustomer', db.createUser)

app.post('/addProduct', db.addProduct)


//  WEB APP LISTENER

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})