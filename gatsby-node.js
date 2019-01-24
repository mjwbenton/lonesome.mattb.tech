require("ts-node/register");
require("dotenv").config();

module.exports.createPages = require("./src/createPages");
module.exports.onCreateNode = require("./src/onCreateNode");
