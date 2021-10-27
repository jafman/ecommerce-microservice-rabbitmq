const express = require('express');
const app = express();
require('dotenv').config();
const db = require('./db');
const port = process.env.PORT || 9080;



const products = [
    {
        productID: 'p01',
        productName: 'Mac Book Pro',
        amount: 15000
    },
    {
        productID: 'p02',
        productName: 'HP Zbook Pro',
        amount: 12000
    },
    {
        productID: 'p03',
        productName: 'Lenovo Think Pad',
        amount: 8500
    }
]

 
db.seedProducts(products); //seed some data for the products


app.listen(port, ()=>{
    console.log(`Product Service is listening on port ${port}`)
})