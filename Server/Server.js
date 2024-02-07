const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT;
const server = express();

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
