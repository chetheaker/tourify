const stripe = require('stripe')();

const items = new Map([[1, { priceInCents: 500, name: 'Tourify Pro' }]]);

const checkout = async (req, res) => {
  try {
    if (req.user) {
      console.log(req.body);
      res.status(201);
      res.send({ url: 'https://stripe.com' });
    } else {
      res.send({ user: false });
    }
  } catch (e) {
    console.log('Error in checkout controller', e);
  }
};

module.exports = { checkout };
