const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;


  const uri =
    "";//TODO 
  
   async function addUser(data) {
    const client = new MongoClient(uri, {
      useNewUrlParser: true
    });
    try {
      await client.connect()
      let db = client.db("CUKICLUB")
      let users = db.collection("members")
      let result = await users.insertOne(data)
      if (result.insertedId) return true;
      else throw error;;
  
    } catch (error) {
  
    } finally {
      await client.close()
    }
  }
  exports.addUser = addUser
  
