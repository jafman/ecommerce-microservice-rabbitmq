const { MongoClient } = require('mongodb');
require('dotenv').config();

const dbAuth = process.env.DB_AUTH; 
const dbName = process.env.DB_NAME;

const uri = `mongodb+srv://${dbAuth}/youverify?retryWrites=true&w=majority`

/**
 * Save Order To the Database
 * @param {Object} order - Details of incoming Order
 */
exports.saveToDatabase = (order) => {
    const dbClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    dbClient.connect(async err => {      
        if(!err){            
                try{
                    const collection = dbClient.db(dbName).collection("orders");
                    const logResult = await collection.insertOne(order); 
                    console.log(`A document with id ${logResult.insertedId} inserted into Orders!`);
                    dbClient.close();
                }catch(e){
                    console.log('Error writing to DB');
                }
            
        }else{
              console.log('DB connection failed!');
        }        
      });
}