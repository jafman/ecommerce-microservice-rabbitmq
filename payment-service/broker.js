const amqplib = require('amqplib');

var amqp_url = process.env.CLOUDAMQP_URL;

/**
 * Get order item from Order Queue and Publish to Transactions Queue.
 */
exports.consumeAndPublish =  async () =>  {
    var conn = await amqplib.connect(amqp_url);
    var ch = await conn.createChannel()
    var queue = "yOrders";
    await ch.assertQueue(queue);

    ch.consume(queue, data => {
        let receivedData = data.content;
        console.log(`Data is in: ${receivedData}`);
        ch.ack(data);
        publish(JSON.parse(receivedData));
    })    
     
}

/**
 * Publish message to Transaction Queue
 * @param {Object} msg - Transaction Details
 */
const publish = async (msg) => {
    console.log("Publishing to Transactions Queue"); 
    var conn = await amqplib.connect(amqp_url);
    var ch = await conn.createChannel();
    var queue = "yTransactions"
    await ch.assertQueue(queue); 
    await ch.sendToQueue( queue,Buffer.from(JSON.stringify(msg))); 
    await ch.close();
    await conn.close();
}