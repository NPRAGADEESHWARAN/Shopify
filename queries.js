const Pool = require('pg').Pool
const pool = new Pool({
    user: 'praga',
    host: 'localhost',
    database: 'shopify',
    password: '',
    port: 5432,
})

const createUser = async (request, response) => {
    const name = request.body.data.name;
    const email = request.body.data.email;
    const password = request.body.data.password;


    console.log(request.body)
    await pool.query('INSERT INTO customer (name, email, password) VALUES ($1, $2, $3)', [name, email, password], (error, results) => {
        if (error) {
            throw error
        }
        console.log(response)
        return response.status(201).send('SUCCESS')
    })
}

const getUser = async (request, response) => {
    const email = request.query.email;
    console.log(email)
    await pool.query('SELECT * FROM customer WHERE email = $1', [email], (error, results) => {
        if (error) {
            throw error
        }
        console.log(results.rows[0])
        return response.status(201).send(results.rows[0])
    })
}


const getProducts = async (request, response) => {
    await pool.query('SELECT * FROM product INNER JOIN brand ON product.brandid = brand.brandid', (error, results) => {
        if (error) {
            throw error
        }
        console.log("product rows")
        let data = results.rows
        console.log(data)
        return response.status(201).send(data)
    })
}

const addProduct = async (request, response) => {

    console.log("inside")
    console.log(request.body)
    let brandName = request.body.data.brandName;
    let productName = request.body.data.productName;
    let productPrice = request.body.data.productPrice;
    let inStock = request.body.data.inStock;
    let productDescription = request.body.data.productDescription;
    let imageURL = request.body.data.imageURL;


    console.log(request.body)
    await pool.query('INSERT INTO brand (brandname) VALUES ($1) RETURNING *', [brandName], (error, results) => {
        if (error) {
            throw error
        }
        console.log(results)
        console.log(results.rows)

        let brandID = results.rows[0].brandid;
        pool.query('INSERT INTO product (productname, brandid, price, stock, description, image) VALUES ($1, $2, $3, $4, $5, $6)', [productName, brandID, productPrice, inStock, productDescription, imageURL], (error, results) => {
            if (error) {
                throw error
            }
            console.log(response)
            return response.status(201).send('SUCCESS')
        })
    })
}


module.exports = {
    createUser,
    getUser,
    getProducts,
    addProduct
}