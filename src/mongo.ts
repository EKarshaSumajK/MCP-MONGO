import { MongoClient, Db, Sort, FindOptions } from 'mongodb';
import type { IndexDirection, InsertOneResult, InsertManyResult, DeleteResult, UpdateResult, Document, AnyBulkWriteOperation } from 'mongodb';
import 'dotenv/config';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';

let client: MongoClient | null = null;

export async function connect(url: string = uri): Promise<void> {
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

export async function checkDB(dbName: string, url: string = uri): Promise<string[]> {
  try {
    if (!client) {
      await connect(url);
    }
    const db: Db = client!.db(dbName);
    const collections = await db.listCollections().toArray();
    return collections.map((collection) => collection.name);
  } catch (error) {
    console.error("Error checking DB:", error);
    throw error;
  }
}

export async function insertOne(
  dbName: string,
  collectionName: string,
  document: Document,
  url: string = uri
): Promise<InsertOneResult<Document>> {
  try {
    if (!client) {
      await connect(url);
    }
    const db: Db = client!.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(document);
    return result;
  } catch (error) {
    console.error("Error inserting Document:", error);
    throw error;
  }
}

export async function insertMany(
  dbName: string,
  collectionName: string,
  documents: Document[],
  url: string = uri
): Promise<InsertManyResult<Document>> {
  try {
    if (!client) {
      await connect(url);
    }
    const db: Db = client!.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.insertMany(documents);
    return result;
  } catch (error) {
    console.error("Error inserting Documents:", error);
    throw error;
  }
}

export async function deleteOne(
  dbName: string,
  collectionName: string,
  query: Document,
  url: string = uri
): Promise<DeleteResult> {
  try {
    if (!client) {
      await connect(url);
    }
    const db: Db = client!.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.deleteOne(query);
    return result;
  } catch (error) {
    console.error("Error deleting Document:", error);
    throw error;
  }
}

export async function deleteMany(
  dbName: string,
  collectionName: string,
  query: Document,
  url: string = uri
): Promise<DeleteResult> {
  try {
    if (!client) {
      await connect(url);
    }
    const db: Db = client!.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.deleteMany(query);
    return result;
  } catch (error) {
    console.error("Error deleting Documents:", error);
    throw error;
  }
}

export async function updateOne(
  dbName: string,
  collectionName: string,
  filter: Document,
  update: Document,
  url: string = uri
): Promise<UpdateResult> {
  try {
    if (!client) {
      await connect(url);
    }
    const db: Db = client!.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.updateOne(filter, update);
    return result;
  } catch (error) {
    console.error("Error updating document:", error);
    throw error;
  }
}

export async function updateMany(
  dbName: string,
  collectionName: string,
  filter: Document,
  update: Document,
  url: string = uri
): Promise<UpdateResult> {
  try {
    if (!client) {
      await connect(url);
    }
    const db: Db = client!.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.updateMany(filter, update);
    return result;
  } catch (error) {
    console.error("Error updating documents:", error);
    throw error;
  }
}

export async function findOne(
  dbName: string,
  collectionName: string,
  query: Document,
  url: string = uri
): Promise<Document | null> {
  try {
    if (!client) {
      await connect(url);
    }
    const db: Db = client!.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.findOne(query);
    return result;
  } catch (error) {
    console.error("Error finding document:", error);
    throw error;
  }
}

export async function findMany(
  dbName: string,
  collectionName: string,
  query: Document,
  url: string = uri
): Promise<Document[]> {
  try {
    if (!client) {
      await connect(url);
    }
    const db: Db = client!.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.find(query).toArray();
    return result;
  } catch (error) {
    console.error("Error finding documents:", error);
    throw error;
  }
}

export async function aggregate(
  dbName: string,
  collectionName: string,
  pipeline: Document[],
  url: string = uri
): Promise<Document[]> {
  try {
    if (!client) {
      await connect(url);
    }
    const db: Db = client!.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.aggregate(pipeline).toArray();
    return result;
  } catch (error) {
    console.error("Error performing aggregation:", error);
    throw error;
  }
}

export async function createIndex(
  dbName: string,
  collectionName: string,
  indexSpec: Document,
  url: string = uri
): Promise<string> {
  try {
    if (!client) {
      await connect(url);
    }
    const db: Db = client!.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.createIndex(indexSpec as { [key: string]: IndexDirection });
    return result;
  } catch (error) {
    console.error("Error creating index:", error);
    throw error;
  }
}

export async function listIndexes(
  dbName: string,
  collectionName: string,
  url: string = uri
): Promise<Document[]> {
  try {
    if (!client) {
      await connect(url);
    }
    const db: Db = client!.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.listIndexes().toArray();
    return result;
  } catch (error) {
    console.error("Error listing indexes:", error);
    throw error;
  }
}

export async function closeConnection(): Promise<void> {
  try {
    if (client) {
      await client.close();
      client = null;
      console.log("MongoDB connection closed.");
    }
  } catch (error) {
    console.error("Error closing connection:", error);
    throw error;
  }
}

export async function pingServer(url: string = uri): Promise<Document> {
  try {
    if (!client) {
      await connect(url);
    }
    const result = await client!.db("admin").command({ ping: 1 });
    return result;
  } catch (error) {
    console.error("Error pinging server:", error);
    throw error;
  }
}

export async function countDocuments(
  dbName: string,
  collectionName: string,
  query: Document,
  url: string = uri
): Promise<number> {
  try {
    if (!client) {
      await connect(url);
    }
    const db: Db = client!.db(dbName);
    const collection = db.collection(collectionName);
    const count = await collection.countDocuments(query);
    return count;
  } catch (error) {
    console.error("Error counting documents:", error);
    throw error;
  }
}

export async function distinct(
  dbName: string,
  collectionName: string,
  fieldName: string,
  query: Document = {},
  url: string = uri
): Promise<any[]> {
  try {
    if (!client) {
      await connect(url);
    }
    const db: Db = client!.db(dbName);
    const collection = db.collection(collectionName);
    const uniqueValues = await collection.distinct(fieldName, query);
    return uniqueValues;
  } catch (error) {
    console.error("Error retrieving unique values:", error);
    throw error;
  }
}

export async function createCollection(
  dbName: string,
  collectionName: string,
  url: string = uri,
  options: Document = {}
): Promise<Db> {
  try {
    if (!client) {
      await connect(url);
    }
    const db: Db = client!.db(dbName);
    await db.createCollection(collectionName, options);
    console.log(`Collection "${collectionName}" created successfully.`);
    return db;
  } catch (error) {
    console.error(`Error creating collection "${collectionName}":`, error);
    throw error;
  }
}

export async function dropCollection(
  dbName: string,
  collectionName: string,
  url: string = uri
): Promise<boolean> {
  try {
    if (!client) {
      await connect(url);
    }
    const db: Db = client!.db(dbName);
    const result = await db.dropCollection(collectionName);
    console.log(`Collection "${collectionName}" dropped successfully.`);
    return result;
  } catch (error) {
    console.error(`Error dropping collection "${collectionName}":`, error);
    throw error;
  }
}

export async function createDatabase(
  dbName: string,
  url: string = uri
): Promise<Db> {
  try {
    if (!client) {
      await connect(url);
    }
    const db: Db = client!.db(dbName);
    // Create a dummy collection to ensure the database is created
    await db.createCollection("dummy");
    await db.dropCollection("dummy");
    console.log(`Database "${dbName}" created/accessed successfully.`);
    return db;
  } catch (error) {
    console.error(`Error creating/accessing database "${dbName}":`, error);
    throw error;
  }
}

export async function dropDatabase(
  dbName: string,
  url: string = uri
): Promise<boolean> {
  try {
    if (!client) {
      await connect(url);
    }
    const db: Db = client!.db(dbName);
    const result = await db.dropDatabase();
    console.log(`Database "${dbName}" dropped successfully.`);
    return result;
  } catch (error) {
    console.error(`Error dropping database "${dbName}":`, error);
    throw error;
  }
}

// Additional aggregation operations
export async function group(
  dbName: string,
  collectionName: string,
  groupKey: string,
  accumulationOperator: string,
  accumulationField: string,
  url: string = uri
): Promise<Document[]> {
  try {
    if (!client) {
      await connect(url);
    }
    const db: Db = client!.db(dbName);
    const collection = db.collection(collectionName);
    const pipeline = [
      { $group: { _id: `$${groupKey}`, result: { [`$${accumulationOperator}`]: `$${accumulationField}` } } }
    ];
    const result = await collection.aggregate(pipeline).toArray();
    return result;
  } catch (error) {
    console.error("Error performing group operation:", error);
    throw error;
  }
}

export async function project(
  dbName: string,
  collectionName: string,
  projection: Document,
  url: string = uri
): Promise<Document[]> {
  try {
    if (!client) {
      await connect(url);
    }
    const db: Db = client!.db(dbName);
    const collection = db.collection(collectionName);
    const pipeline = [{ $project: projection }];
    const result = await collection.aggregate(pipeline).toArray();
    return result;
  } catch (error) {
    console.error("Error performing projection:", error);
    throw error;
  }
}

export async function sort(
  dbName: string,
  collectionName: string,
  sortSpec: Document,
  url: string = uri
): Promise<Document[]> {
  try {
    if (!client) {
      await connect(url);
    }
    const db: Db = client!.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.find({}).sort(sortSpec as Sort).toArray();
    return result;
  } catch (error) {
    console.error("Error sorting documents:", error);
    throw error;
  }
}

export async function limit(
  dbName: string,
  collectionName: string,
  limitCount: number,
  url: string = uri
): Promise<Document[]> {
  try {
    if (!client) {
      await connect(url);
    }
    const db: Db = client!.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.find({}).limit(limitCount).toArray();
    return result;
  } catch (error) {
    console.error("Error limiting documents:", error);
    throw error;
  }
}

export async function skip(
  dbName: string,
  collectionName: string,
  skipCount: number,
  url: string = uri
): Promise<Document[]> {
  try {
    if (!client) {
      await connect(url);
    }
    const db: Db = client!.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.find({}).skip(skipCount).toArray();
    return result;
  } catch (error) {
    console.error("Error skipping documents:", error);
    throw error;
  }
}

export async function lookup(
  dbName: string,
  collectionName: string,
  fromCollection: string,
  localField: string,
  foreignField: string,
  as: string,
  url: string = uri
): Promise<Document[]> {
  try {
    if (!client) {
      await connect(url);
    }
    const db: Db = client!.db(dbName);
    const collection = db.collection(collectionName);
    const pipeline = [
      {
        $lookup: {
          from: fromCollection,
          localField: localField,
          foreignField: foreignField,
          as: as
        }
      }
    ];
    const result = await collection.aggregate(pipeline).toArray();
    return result;
  } catch (error) {
    console.error("Error performing lookup:", error);
    throw error;
  }
}

// Drop index function
export async function dropIndex(
  dbName: string,
  collectionName: string,
  indexName: string,
  url: string = uri
): Promise<Document> {
  try {
    if (!client) {
      await connect(url);
    }
    const db: Db = client!.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.dropIndex(indexName);
    return result;
  } catch (error) {
    console.error("Error dropping index:", error);
    throw error;
  }
}

// List all databases
export async function listDatabases(url: string = uri): Promise<string[]> {
  try {
    if (!client) {
      await connect(url);
    }
    const databasesList = await client!.db().admin().listDatabases();
    return databasesList.databases.map((db: any) => db.name);
  } catch (error) {
    console.error("Error listing databases:", error);
    throw error;
  }
}

// Authentication and Authorization functions
export async function createUser(
  dbName: string,
  username: string,
  password: string,
  roles: Document[],
  url: string = uri
): Promise<Document> {
  try {
    if (!client) {
      await connect(url);
    }
    const db: Db = client!.db(dbName);
    const result = await db.command({ createUser: username, pwd: password, roles: roles });
    console.log(`User "${username}" created successfully.`);
    return result;
  } catch (error) {
    console.error(`Error creating user "${username}":`, error);
    throw error;
  }
}

export async function updateUser(
  dbName: string,
  username: string,
  userData: Document,
  url: string = uri
): Promise<Document> {
  try {
    if (!client) {
      await connect(url);
    }
    const db: Db = client!.db(dbName);
    const command = { updateUser: username, ...userData };
    const result = await db.command(command);
    console.log(`User "${username}" updated successfully.`);
    return result;
  } catch (error) {
    console.error(`Error updating user "${username}":`, error);
    throw error;
  }
}

export async function removeUser(
  dbName: string,
  username: string,
  url: string = uri
): Promise<Document> {
  try {
    if (!client) {
      await connect(url);
    }
    const db: Db = client!.db(dbName);
    const result = await db.removeUser(username);
    console.log(`User "${username}" removed successfully.`);
    return result as unknown as Document;
  } catch (error) {
    console.error(`Error removing user "${username}":`, error);
    throw error;
  }
}

export async function grantRolesToUser(
  dbName: string,
  username: string,
  roles: Document[],
  url: string = uri
): Promise<Document> {
  try {
    if (!client) {
      await connect(url);
    }
    const db: Db = client!.db(dbName);
    const command = { grantRolesToUser: username, roles: roles };
    const result = await db.command(command);
    console.log(`Roles granted to user "${username}" successfully.`);
    return result;
  } catch (error) {
    console.error(`Error granting roles to user "${username}":`, error);
    throw error;
  }
}

// Advanced query operations
export async function findWithOptions(
  dbName: string,
  collectionName: string,
  query: Document,
  options: FindOptions,
  url: string = uri
): Promise<Document[]> {
  try {
    if (!client) {
      await connect(url);
    }
    const db: Db = client!.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.find(query, options).toArray();
    return result;
  } catch (error) {
    console.error("Error finding documents with options:", error);
    throw error;
  }
}

export async function findOneAndUpdate(
  dbName: string,
  collectionName: string,
  filter: Document,
  update: Document,
  options: Document = { returnDocument: 'after' },
  url: string = uri
): Promise<Document | null> {
  try {
    if (!client) {
      await connect(url);
    }
    const db: Db = client!.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.findOneAndUpdate(filter, update, options);
    return result;
  } catch (error) {
    console.error("Error finding and updating document:", error);
    throw error;
  }
}

export async function findOneAndDelete(
  dbName: string,
  collectionName: string,
  filter: Document,
  options: Document = {},
  url: string = uri
): Promise<Document | null> {
  try {
    if (!client) {
      await connect(url);
    }
    const db: Db = client!.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.findOneAndDelete(filter, options);
    return result;
  } catch (error) {
    console.error("Error finding and deleting document:", error);
    throw error;
  }
}

export async function bulkWrite(
  dbName: string,
  collectionName: string,
  operations: Document[],
  options: Document = {},
  url: string = uri
): Promise<Document> {
  try {
    if (!client) {
      await connect(url);
    }
    const db: Db = client!.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.bulkWrite(operations as AnyBulkWriteOperation<Document>[], options);
    return result;
  } catch (error) {
    console.error("Error performing bulk write operations:", error);
    throw error;
  }
}

// Initialize the connection (optional, can be called explicitly)
connect(uri).catch(console.error);
