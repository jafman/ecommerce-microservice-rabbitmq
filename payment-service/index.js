const express = require('express');
const app = express();
const mq = require('./broker');
require('dotenv').config();
const port = process.env.PORT || 9090;

// listen for message published on Order Queue and push payments Details to Transactions Queue
mq.consumeAndPublish();

app.listen(port, ()=>{
    console.log(`Payment service is listening on port ${port}`)
})