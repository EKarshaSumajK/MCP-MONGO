// import { MongoClient, ServerApiVersion } from 'mongodb'
// const uri = "mongodb+srv://ekarshasumajkotikalapoodi:kvljvnlkeskos@cluster0.8lierja.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri)

// async function connect() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// connect().catch(console.dir);

import { MongoClient, Db } from 'mongodb'
const uri = "mongodb+srv://ekarshasumajkotikalapoodi:kvljvnlkeskos@cluster0.8lierja.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

let client: MongoClient;

export async function connect(url: string) {
  try {
    client = new MongoClient(url);
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.error("Connection error:", error);
    throw error;
  }
}

export async function checkDB(dbName: string, url: string) {
  try {
    if (!client) {
      await connect(url);
    }
    const db: Db = client.db(dbName);
    const collections = await db.listCollections().toArray();
    return collections.map(collection => collection.name);
  } catch (error) {
    console.error("Error checking DB:", error);
    throw error;
  } finally {
}
}

connect(uri).catch(console.dir);

