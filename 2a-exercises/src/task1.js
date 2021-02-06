const express = require('express');

const server = express();
server.use(express.json()); // body parser

const objects = [];

// /api/mutation
server.post('/api/mutation', (req, res) => {
  // input is a string
  const { sentence } = req.body;

  let newString = '';
  for (let i = 0; i < sentence.length; i += 3) {
    newString += sentence[i]; // returns the character at this index
  }

  res.send(newString);
});


