const express = require('express');
const argon2 = require('argon2');

// always lowercase or camelcase where possible
// EXCEPT for constant non-objects (i.e. numbers, strings)
const PORT = 3000;

// a constant is immutable (can't mutate)
const server = express();

// .use allows us to import and apply MIDDLEWARES
// middlewares just "sit in the middle" of requests
// basically think of it as a man in the middle
// intercepting and doing something with all of the requests
// in this case we're using the body parser to transform request bodies into JSON
server.use(express.json());

// GET, POST are the two HTTP request types
// GET -> carries over request parameters from the server
// POST -> carries over request parameters from the CLIENT (aka you can specify stuff)

// global variable to store accounts
const users = [];

// IMPORTANT LIST FUNCTIONS
// push() - add an element to the end
// pop() - remove an element from the end (and return it)
// length - returns the length

// LOGINS
server.post('/login', async (req, res) => {
  const { email, username, password } = req.body;

  const success = await loginWithEmail(email, password);

  // TRUTHY and FALSEY
  // anything falsey:
  // undefined, null, false, '', 0, NaN (imaginary number)

  if (success === undefined) {
    res.json({
      success: false,
      message: `Could not find account with email ${email}.`
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
  // for each loop
  // in java: for (String s : list) {}
  for (const user of users) {
    // in JS, three equal signs is the way to go
    // two equal signs: will check by conversion
    if (user.email == email) {
      // check if the passwords match
      return await argon2.verify(user.password, password);
    }
  }

  return;
};

const loginWithUsername = async (username, password) => {

};

// CREATING AN ACCOUNT
server.post('/register', async (req, res) => {
  // unpack operator
  const { email, username, password, firstName, lastName } = req.body;

  const newUser = await createAccount(email, username, password, firstName, lastName);

  res.json(newUser);
});

// helper function to create the account
// this function needs to be asynchronous
const createAccount = async (email, username, password, firstName, lastName) => {
  // encrypt the password

  // hash() is an ASYNCHRONOUS command
  // aka. does not run in the expected order
  password = await argon2.hash(password);

  // Object "literal"
  const user = {
    email,
    username,
    password,
    firstName,
    lastName
  };

  // ACCESSING PROPERTIES INSIDE AN OBJECT
  // the two are equivalent.
  // user.email;
  // user['email'];

  // so why would we use the second method over the first?
  // const propertyWeWantToAccess = someFunction();
  // user[propertyWeWantToAccess];

  users.push(user);

  return user;
};

server.listen(PORT, () => {
  // TEMPLATE STRINGS: backtick (`)
  // allows to escape the string and include JavaScript "literals"
  console.log(`Listening on port: ${PORT}.`);
});
