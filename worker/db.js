const { MongoClient } = require('mongodb');
require('dotenv').config();

const dbAuth = process.env.DB_AUTH; 
const dbName = process.env.DB_NAME;

const uri = `mongodb+srv://${dbAuth}/youverify?retryWrites=true&w=majority`

/**
 * Save Transaction Details to Database
 * @param {Object} transaction 
 */
exports.saveTransaction = (transaction) => {
    const dbClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    dbClient.connect(async err => {      
        if(!err){            
                try{
                    const collection = dbClient.db(dbName).collection("transactions");
                    const logResult = await collection.insertOne(transaction); 
                    console.log(`A document with id ${logResult.insertedId} inserted into Transactions!`);
                    dbClient.close();
                }catch(e){
                    console.log('Error writing to DB');
                }
            
        }else{
              console.log('DB connection failed!');
        }        
      });
}