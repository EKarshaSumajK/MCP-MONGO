# MongoDB MCP Server

A Model Context Protocol (MCP) server implementation that enables AI models to interact with MongoDB databases.

## Overview
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/EKarshaSumajK/MCP-MONGO)

This MCP server provides a standardized interface for AI models to perform MongoDB operations, including:

- Database connection management
- CRUD operations on documents
- Collection and database administration
- Query capabilities

## Installation

```bash
# Clone the repository
git clone (https://github.com/EKarshaSumajK/MCP-MONGO.git)
cd mcp-mongo

# Install dependencies
npm install
```

## Configuration

Create a `.env` file to store your MongoDB connection details (optional):

```
MONGO_URL=mongodb://localhost:27017
```

## Usage

### Starting the Server

```bash
node index.ts
```

### Available Tools

The server exposes the following MongoDB operations as MCP tools:

#### Connection Management
- `connect-to-mongo`: Establish a connection to MongoDB
- `close-connection`: Close the MongoDB connection

#### Database Operations
- `create-database`: Create a new database
- `drop-database`: Drop an existing database
- `collections-available-in-db`: List collections in a database

#### Collection Operations
- `create-collection`: Create a new collection
- `drop-collection`: Drop an existing collection

#### Document Operations
- `insert-document`: Insert a single document
- `insert-documents`: Insert multiple documents
- `update-document`: Update a single document
- `update-documents`: Update multiple documents
- `delete-document`: Delete a single document
- `delete-documents`: Delete multiple documents

#### Query Operations
- `find-document`: Find a single document
- `find-documents`: Find multiple documents
- `count-documents`: Count documents matching a query
- `distinct-values`: Get distinct values for a field


## Project Structure

- `index.js` - Main server entry point that defines all MCP tools
- `src/mongo.ts` - MongoDB connection and operation implementation
- `package.json` - Project dependencies and metadata

## Dependencies

- `@modelcontextprotocol/sdk`: ^1.10.2 - MCP implementation
- `dotenv`: ^16.5.0 - Environment variable management
- `mongodb`: 6.16 - MongoDB driver
- `process`: ^0.11.10 - Node.js process management
- `typescript`: ^5.8.3 - TypeScript support

## Development Dependencies

- `@types/node`: ^22.15.3 - TypeScript definitions for Node.js

## Security Notes

- This server should only be used in trusted environments
- Connection URLs with credentials should be handled securely
- Access control should be implemented at the MongoDB level
- Consider using environment variables for sensitive connection details

## License

None



## Screenshots
<img width="1710" alt="Screenshot 2025-04-28 at 4 56 55 PM" src="https://github.com/user-attachments/assets/3797d133-2fd0-45f6-81fc-63be93840009" />

<img width="1710" alt="Screenshot 2025-04-28 at 4 57 01 PM" src="https://github.com/user-attachments/assets/308e324e-dcf6-4403-b50a-a3ce9e6277a6" />

<img width="1710" alt="Screenshot 2025-04-28 at 4 57 06 PM" src="https://github.com/user-attachments/assets/af0f7dc4-298b-4cbb-b2a0-76888bd3637f" />

<img width="1710" alt="Screenshot 2025-04-28 at 4 57 10 PM" src="https://github.com/user-attachments/assets/9314798a-80ca-498b-af07-227180478b4a" />

<img width="1710" alt="Screenshot 2025-04-28 at 4 57 15 PM" src="https://github.com/user-attachments/assets/f1ce94fa-0898-4a0f-8382-94cf4f1ac1a8" />


