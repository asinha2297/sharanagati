
const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require("mongodb");
const logger = require("../utils/logger");

const connectDB = async () => {
  const uri = process.env.MONGO_URI || process.env.Mongo_URI;

  if (!uri) {
    logger.warn("MONGO_URI is not set - running in JSON-only mode");
    return;
  }

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    // Startup ping using the MongoDB Stable API settings.
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    logger.info("Pinged MongoDB deployment successfully");

    // Keep mongoose as the app ODM for existing models/routes.
    await mongoose.connect(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    logger.info("MongoDB Connected");
  } catch (error) {
    logger.warn("MongoDB Connection Failed - running in JSON-only mode", error);
  } finally {
    await client.close();
  }
};

module.exports = connectDB;