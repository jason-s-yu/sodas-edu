const express = require('express');
const argon2 = require('argon2');

const PORT = 3000;

const server = express();

server.use(express.json());

// list of users (this is our mock database)
// it is a list of objects (object literals)
const users = [];

server.post('/login', async (req, res) => {
  const { email, username, password } = req.body;

  let success;
  if (email) {
    success = await loginWithEmail(email, password);
  } else if (username) {
    success = await loginWithUsername(username, password);
  }

  if (success === undefined) {
    res.json({
      success: false,
      message: `Could not find account with ${email ? `email: ${email}` : `username: ${username}`}.`
    });
  } else {
    res.json({
      success,
      // ternary statement
      message: `Authentication ${success ? 'succeeded' : 'failed'}.`
    });
  }
});

// helper function to login and verify users
const loginWithEmail = async (email, password) => {
  for (const user of users) {
    if (user.email === email) {
      return await argon2.verify(user.password, password);
    }
  }

  return;
};

const loginWithUsername = async (username, password) => {
  const user = users.find((user) => { // returns undefined if user is not found
    return user.username === username;
  });

  if (user) {
    return await argon2.verify(user.password, password);
  }
  
  return;
};

// CREATING AN ACCOUNT
server.post('/register', async (req, res) => {
  const { email, username, password, firstName, lastName } = req.body;

  const newUser = await createAccount(email, username, password, firstName, lastName);

  res.json(newUser);
});

// helper function to create the account
// this function needs to be asynchronous
const createAccount = async (email, username, password, firstName, lastName) => {
  // check if the user's email or username already exists
  for (const user of users) {
    if (user.email === email) {
      return false;
    } else if (user.username === username) {
      return false;
    }
  }

  password = await argon2.hash(password);

  // Object "literal"
  const user = {
    email,
    username,
    password,
    firstName,
    lastName
  };

  users.push(user);

  return user;
};

///////////////////
//// EXERCISES ////
///////////////////

server.post('/search', (req, res) => {
  // input is (json) either username or email

  const { username, email } = req.body;

  if (username) {
    for (const user of users) {
      if (user.username === username) {
        res.json({
          username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName
        });
      }
    }
  } else if (email) {
    const foundUser = users.find((user) => user.email === email);

    delete foundUser.password;

    res.json(foundUser);
  }
});


server.listen(PORT, () => {
  // TEMPLATE STRINGS: backtick (`)
  // allows to escape the string and include JavaScript "literals"
  console.log(`Listening on port: ${PORT}.`);
});
