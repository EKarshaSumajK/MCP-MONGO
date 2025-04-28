import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { connect, checkDB } from "./src/mongo.ts";

// Create an MCP server
const server = new McpServer({
  name: "Demo",
  version: "1.0.0"
});


// Add an addition tool
server.tool("collections-available-in-db",
  { url: z.string(), db: z.string() },
  async ({ url, db }) => {
    await connect(url);
    const collections = await checkDB(db, url);
    return {
      content: [{ type: "text", text: String(collections) }]
    };
  }
);

server.tool("connect-to-mongo",
    { url: z.string() },
    async ({ url }) => {
      await connect(url);
      return {
        content: [{ type: "text", text: "connected to mongo" }]
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