const { PrismaClient } = require("@prisma/client");

// Initialize the Prisma client
const Prisma = new PrismaClient();

// Now you can use 'prisma' to interact with your database
module.exports = Prisma;
