import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { 
  connect, 
  checkDB, 
  insertOne, 
  insertMany, 
  updateOne, 
  updateMany, 
  deleteOne, 
  deleteMany, 
  findOne, 
  findMany, 
  countDocuments, 
  distinct,
  createCollection,
  dropCollection,
  createDatabase,
  dropDatabase,
  closeConnection
} from "./src/mongo.ts";

// Create an MCP server
const server = new McpServer({
  name: "Demo",
  version: "1.0.0"
});

// Tool to connect to MongoDB
server.tool("connect-to-mongo",
  { url: z.string() },
  async ({ url }) => {
    await connect(url);
    return {
      content: [{ type: "text", text: "Connected to MongoDB!" }]
    };
  }
);

// Tool to list collections in a database
server.tool("collections-available-in-db",
  { url: z.string().optional(), db: z.string() },
  async ({ url, db }) => {
    const collections = await checkDB(db, url);
    return {
      content: [{ type: "text", text: `Collections in ${db}: ${collections.join(", ")}` }]
    };
  }
);

// Tool to insert a single document
server.tool("insert-document",
  { url: z.string().optional(), db: z.string(), collection: z.string(), document: z.object({}).passthrough() },
  async ({ url, db, collection, document }) => {
    const result = await insertOne(db, collection, document, url);
    return {
      content: [{ type: "text", text: `Inserted document with ID: ${result.insertedId}` }]
    };
  }
);

// Tool to insert multiple documents
server.tool("insert-documents",
  { url: z.string().optional(), db: z.string(), collection: z.string(), documents: z.array(z.object({}).passthrough()) },
  async ({ url, db, collection, documents }) => {
    const result = await insertMany(db, collection, documents, url);
    return {
      content: [{ type: "text", text: `Inserted ${result.insertedCount} documents` }]
    };
  }
);

// Tool to update a single document
server.tool("update-document",
  { url: z.string().optional(), db: z.string(), collection: z.string(), filter: z.object({}).passthrough(), update: z.object({}).passthrough() },
  async ({ url, db, collection, filter, update }) => {
    const result = await updateOne(db, collection, filter, update, url);
    return {
      content: [{ type: "text", text: `Updated ${result.modifiedCount} document(s)` }]
    };
  }
);

// Tool to update multiple documents
server.tool("update-documents",
  { url: z.string().optional(), db: z.string(), collection: z.string(), filter: z.object({}).passthrough(), update: z.object({}).passthrough() },
  async ({ url, db, collection, filter, update }) => {
    const result = await updateMany(db, collection, filter, update, url);
    return {
      content: [{ type: "text", text: `Updated ${result.modifiedCount} document(s)` }]
    };
  }
);

// Tool to delete a single document
server.tool("delete-document",
  { url: z.string().optional(), db: z.string(), collection: z.string(), query: z.object({}).passthrough() },
  async ({ url, db, collection, query }) => {
    const result = await deleteOne(db, collection, query, url);
    return {
      content: [{ type: "text", text: `Deleted ${result.deletedCount} document(s)` }]
    };
  }
);

// Tool to delete multiple documents
server.tool("delete-documents",
  { url: z.string().optional(), db: z.string(), collection: z.string(), query: z.object({}).passthrough() },
  async ({ url, db, collection, query }) => {
    const result = await deleteMany(db, collection, query, url);
    return {
      content: [{ type: "text", text: `Deleted ${result.deletedCount} document(s)` }]
    };
  }
);

// Tool to find a single document
server.tool("find-document",
  { url: z.string().optional(), db: z.string(), collection: z.string(), query: z.object({}).passthrough() },
  async ({ url, db, collection, query }) => {
    const result = await findOne(db, collection, query, url);
    return {
      content: [{ type: "text", text: `Found document: ${JSON.stringify(result)}` }]
    };
  }
);

// Tool to find multiple documents
server.tool("find-documents",
  { url: z.string().optional(), db: z.string(), collection: z.string(), query: z.object({}).passthrough() },
  async ({ url, db, collection, query }) => {
    const result = await findMany(db, collection, query, url);
    return {
      content: [{ type: "text", text: `Found documents: ${JSON.stringify(result)}` }]
    };
  }
);

// Tool to count documents
server.tool("count-documents",
  { url: z.string().optional(), db: z.string(), collection: z.string(), query: z.object({}).passthrough() },
  async ({ url, db, collection, query }) => {
    const count = await countDocuments(db, collection, query, url);
    return {
      content: [{ type: "text", text: `Total documents: ${count}` }]
    };
  }
);

// Tool to get distinct values for a field
server.tool("distinct-values",
  { url: z.string().optional(), db: z.string(), collection: z.string(), field: z.string(), query: z.object({}).passthrough().optional() },
  async ({ url, db, collection, field, query = {} }) => {
    const values = await distinct(db, collection, field, query, url);
    return {
      content: [{ type: "text", text: `Distinct values for ${field}: ${values.join(", ")}` }]
    };
  }
);

// Tool to create a collection
server.tool("create-collection",
  { 
    url: z.string().optional(), 
    db: z.string(), 
    collection: z.string(), 
    options: z.object({}).passthrough().optional() 
  },
  async ({ url, db, collection, options = {} }) => {
    const result = await createCollection(db, collection, url, options);
    return {
      content: [{ type: "text", text: `Collection "${collection}" created successfully.` }]
    };
  }
);

// Tool to drop a collection
server.tool("drop-collection",
  { 
    url: z.string().optional(), 
    db: z.string(), 
    collection: z.string() 
  },
  async ({ url, db, collection }) => {
    const result = await dropCollection(db, collection, url);
    return {
      content: [{ type: "text", text: `Collection "${collection}" dropped successfully.` }]
    };
  }
);

// Tool to create a database
server.tool("create-database",
  { 
    url: z.string().optional(), 
    db: z.string() 
  },
  async ({ url, db }) => {
    const result = await createDatabase(db, url);
    return {
      content: [{ type: "text", text: `Database "${db}" created successfully.` }]
    };
  }
);

// Tool to drop a database
server.tool("drop-database",
  { 
    url: z.string().optional(), 
    db: z.string() 
  },
  async ({ url, db }) => {
    const result = await dropDatabase(db, url);
    return {
      content: [{ type: "text", text: `Database "${db}" dropped successfully.` }]
    };
  }
);

server.tool("close-connection",
  { 
  },
  async ({  }) => {
    await closeConnection()
    return {
      content: [{ type: "text", text: `connection closed` }]
    };
  }
);

// Add a dynamic greeting resource
server.resource(
  "greeting",
  new ResourceTemplate("greeting://{name}", { list: undefined }),
  async (uri, { name }) => ({
    contents: [{
      uri: uri.href,
      text: `Hello, ${name}!`
    }]
  })
);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);

console.error(JSON.stringify({ error: "Connection failed" }));