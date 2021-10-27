const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');
const port = process.env.PORT || 8090

const orderServiceUrl = "http://localhost:8091/order"

app.use(cors());
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


/**
 * order endpoint 
 */
app.post('/order', (req, res)=>{
    console.log("A new Order is in!");
    const orderDetails = req.body;
    if(orderDetails.customerId && orderDetails.productId && orderDetails.amount && !isNaN(orderDetails.amount)){
            // forward this order to the order service using RESTful based communication
             axios.post(orderServiceUrl, orderDetails)
             .then((response)=>{ 
                 res.status(response.status).json(response.data)
             })
             .catch((err)=>{
                 console.log(err)
                 res.status(500).json({status: "error", message: "error occured!"})
             });
             
        
    }else{
        res.status(400).json({
            status: "error",
            message: "Invalid order details"
        })
    }
    
});

app.listen(port, ()=>{
    console.log(`Customer service is listening on port ${port}`)
})