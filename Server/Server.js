const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./Src/Routes/userRoutes");
const errorMiddleWare = require("./Src/Middlewares/errorMiddlewares");
dotenv.config();

const PORT = process.env.PORT || 3000;
const server = express();

// Middleware to parse JSON and form data
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Routes
server.use("/users", userRoutes);

// Error handling middleware
server.use(errorMiddleWare);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
