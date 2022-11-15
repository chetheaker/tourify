require('dotenv').config();
const stripe = require('stripe')();

const items = new Map([[1, { priceInCents: 500, name: 'Tourify Pro' }]]);

const checkout = async (req, res) => {
  try {
    if (req.user) {
      console.log('client url', process.env.CLIENT_URL);
      // const session = await stripe.checkout.sessions.create({
      //   payment_method_types: ['card'],
      //   mode: 'subscription',
      //   success_url: `${process.env.CLIENT_URL}/dashboard`,
      //   cancel_url: `${process.env.CLIENT_URL}/dashboard`
      // });
      // res.status(201);
      res.send({ url: 'stripe.com' });
    } else {
      res.send({ user: false });
    }
  } catch (e) {
    console.log('Error in checkout controller', e);
  }
};

module.exports = { checkout };
