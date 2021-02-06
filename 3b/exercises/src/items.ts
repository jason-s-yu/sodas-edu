// using arrays as our mock databases
// we export them so we can access them in users.ts and items.ts, which contain our helper functions
// IMPORTANT: you should ALWAYS define the types for arrays,
// because TypeScript can't infer the type of an empty array! Nothing to infer from.
export const ITEMS: Item[] = [];

export interface Item {
  id: number;
  name: string;
  price: number;
  description: string;
};

// we'll implement incremental serial ID numbers
// increment this variable each time a new account is created
let CURRENT_ID = 0;

export const createItem = (name: string, price: number, description: string): Item => {
  const item: Item = {
    id: CURRENT_ID++,
    name,
    price,
    description
  };

  ITEMS.push(item);

  return item;
};
