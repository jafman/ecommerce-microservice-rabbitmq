const amqplib = require('amqplib');
const db = require('./db')

var amqp_url = process.env.CLOUDAMQP_URL;

/**
 * Listen to transactions publish on Transaction Queue and Save to Database
 */
exports.consumeAndSaveToDB =  async () =>  {
    var conn = await amqplib.connect(amqp_url);
    var ch = await conn.createChannel()
    var queue = "yTransactions";
    await ch.assertQueue(queue);

    ch.consume(queue, data => {
        let receivedData = data.content;
        console.log(`Data is in: ${receivedData}`);
        ch.ack(data);
        saveToDB(JSON.parse(receivedData));
    })    
}

/**
 * Save Transaction Details to Database
 * @param {Object} data 
 */
const saveToDB = (data) => {
    db.saveTransaction(data);
} 