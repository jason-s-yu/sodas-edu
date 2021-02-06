import argon2 from 'argon2';
import { Item } from './items';

// using arrays as our mock databases
// we export them so we can access them in users.ts and items.ts, which contain our helper functions
// IMPORTANT: you should ALWAYS define the types for arrays,
// because TypeScript can't infer the type of an empty array! Nothing to infer from.
export const USERS: User[] = [];

/**
 * User interface that defines the type for user accounts
 */
export interface User {
  id: number;
  email: string;
  password: string;
  cart: Item[];
};

// we'll implement incremental serial ID numbers
// increment this variable each time a new account is created
let CURRENT_ID = 0;

/**
 * Creates a user account, appends it to the USERS list, creates the database
 * @param email the user's email address
 * @param password the user's password (unhashed)
 */
export const createUser = async (email: string, password: string): Promise<User> => {
  const user = {
    id: CURRENT_ID++,  
    email,
    password: await argon2.hash(password),
    cart: [] // initialize the user's cart here; should start empty
  };

  USERS.push(user);

  return user;
};

export const getCart = async (email: string, password: string) => {
  // first, search for the user in the array 
  const { user } = getUser(email);
  // verify the hash
  if (await argon2.verify(user.password, password)) {
    return user.cart;
  } else {
    return false;
  }
};

/**
 * Searches for a user and returns the element and index it is found in
 * @param email the user's email to search for
 */
const getUser = (email: string) => {
  // search for the user, but extract the index in the array instead of the object itself
  // so that we can return BOTH the index and object
  // this is more useful than just the object, since the index is required to mutate the object
  // remember that .find() or for-each loops extract "copies" of the object you're searching for
  const index = USERS.findIndex((user) => user.email === email);

  // we return an object
  return {
    index,
    user: USERS[index]
  };
};
