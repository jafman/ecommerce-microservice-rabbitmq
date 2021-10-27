const amqplib = require('amqplib');
require('dotenv').config()

var amqp_url = process.env.CLOUDAMQP_URL;

/**
 * Publish Order Details to Order Queue
 * @param {Object} orderDetails - Details of incoming Order
 */
exports.publish = async (orderDetails) => {
    console.log("Publishing to Orders Queue..."); 
    var conn = await amqplib.connect(amqp_url);
    var ch = await conn.createChannel();
    var queue = "yOrders"
    await ch.assertQueue(queue); 
    await ch.sendToQueue( queue,Buffer.from(JSON.stringify(orderDetails))); 
    await ch.close();
    await conn.close();
}
 