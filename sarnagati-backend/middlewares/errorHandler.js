const logger = require("../utils/logger");

const errorHandler = (err, req, res, next) => {

  logger.error(err.message);

  let statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
};

module.exports = errorHandler;