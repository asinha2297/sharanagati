
const mongoose = require("mongoose"); 
const logger = require("../utils/logger");

const connectDB = async () => { 
  try { 
    await mongoose.connect(process.env.MONGO_URI); 
    logger.info("MongoDB Connected"); 
  } catch (error) { 
    logger.warn("MongoDB Connection Failed - running in JSON-only mode", error); 
  } 
};

module.exports = connectDB;