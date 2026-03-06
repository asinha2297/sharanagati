const { v4: uuidv4 } = require("uuid");

const generateToken = () => {
  return uuidv4().replace(/-/g, "").substring(0, 10).toUpperCase();
};

module.exports = generateToken;