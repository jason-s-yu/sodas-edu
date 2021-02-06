import express from 'express';
import { createItem, Item } from './items';
import { createUser, getCart, User } from './users';

const app = express();
app.use(express.json());


app.post('/createUser', async (req, res) => {
  console.log('Received');
  const { email, password } = req.body;

  const user = await createUser(email, password);
  if (user) {
    res.json(user.id);
  }
});

app.post('/createItem', async (req, res) => {
  const { name, price, description } = req.body;

  const item = createItem(name, price, description);
  res.json({
    success: Boolean(item)  // convert the item from its truthy/falsy value to a real boolean to respond with
  });
});

app.post('/cart', async (req, res) => {
  const { email, password } = req.body;

  const cart = await getCart(email, password);
  if (cart) res.json(cart);
  else {
    res.json({
      success: false
    });
  }
});

app.listen(3000, () => {
  console.log('Listening on port 3000!');
});
