const express = require('express');
const cors = require('cors');
const { v4: uuid } = require('uuid');
const mq = require('./broker');
const app = express();
const dbUtil = require('./db')
require('dotenv').config();


const port = process.env.PORT || 8091;


app.use(cors());
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

/**
 * Order Endpoint
 */
app.post('/order', (req, res)=>{ 
    const orderDetails = req.body;
    if(orderDetails.customerId && orderDetails.productId && orderDetails.amount && !isNaN(orderDetails.amount)){
         
            // save request details to database
            let orderId = uuid(); 
            dbUtil.saveToDatabase({
                customerId: orderDetails.customerId,
                productId: orderDetails.productId,
                orderId: orderId,
                amount: orderDetails.amount,
                orderStatus: "pending"
            });

            // send request data to payment service via rabbit MQ async comm.
            mq.publish({
                customerId: orderDetails.customerId,
                orderId: orderId,
                amount: orderDetails.amount
            });
            
            // send response back to user
            res.status(201).json({
                customerId: orderDetails.customerId,
                orderId: orderId,
                productId: orderDetails.productId,
                orderStatus: "pending"
            })            
        
    }else{
        res.status(400).json({
            status: "error",
            message: "Invalid order details"
        })
    }
    
});

app.listen(port, ()=>{
    console.log(`Order service is listening on port ${port}`)
})