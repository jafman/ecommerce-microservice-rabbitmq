const express = require('express');
const app = express();
const mq = require('./broker');
require('dotenv').config();
const port = process.env.PORT || 9091;


// listen for message publish on rabbitMQ Queue 
mq.consumeAndSaveToDB();

app.listen(port, ()=>{
    console.log(`Worker is listening on port ${port}`)
})