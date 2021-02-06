// import stuff
// import java.lang.Math;

// import the express library

// unfortunately we can't use import yet
// import express from 'express';
const express = require('express');

const app = express();

app.use(express.json());

// make a function here next to the comma
// that takes two parameters
// req, res
// req -> request
// res -> response
app.get('/', (_req, res) => {
  res.send('Hello, world!');
});

app.get('/hello', (_req, res) => {
  res.send('Hello there!');
});

// HTTP hypertext transfer protocol
// defines a framework for web requests
// CREATE, READ, UPDATE, DELETE -> "CRUD"
// POST,   GET
app.post('/add', (req, res) => {
  res.send(`${req.body.a} + ${req.body.b} = ${req.body.a + req.body.b}`);
});

app.listen(3000, () => {
  console.log('Listening!');
});
