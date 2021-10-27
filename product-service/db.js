const { MongoClient } = require('mongodb');
require('dotenv').config();

const dbAuth = process.env.DB_AUTH; 
const dbName = process.env.DB_NAME;

const uri = `mongodb+srv://${dbAuth}/youverify?retryWrites=true&w=majority`

/**
 * seed some data for the products
 * @param {Object[]} products 
 */
exports.seedProducts = (products) => {
    const dbClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    dbClient.connect(async err => {      
        if(!err){            
                try{
                    const collection = dbClient.db(dbName).collection("products");
                    const logResult = await collection.insertMany(products);
                    console.log('Seeding products to DB...')
                    dbClient.close();
                }catch(e){
                    console.log('Error writing to DB');
                }
            
        }else{
              console.log('DB connection failed!');
        }        
      });
}