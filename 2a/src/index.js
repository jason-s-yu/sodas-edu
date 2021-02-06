const express = require('express');
const { PrismaClient } = require('@prisma/client'); // require imports "JS Module" -> basically an Object

const PORT = 3000;

const server = express();
const prisma = new PrismaClient();

server.use(express.json()); // body parser

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});
