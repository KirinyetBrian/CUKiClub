const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;


  const uri =
    "mongodb+srv://brad-kabecha:LfmLb9K9SC7Cjnft@cluster0.bvlyn.gcp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  
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
  