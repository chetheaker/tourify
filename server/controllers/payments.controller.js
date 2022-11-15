require('dotenv').config();
const stripe = require('stripe')(
  'sk_test_51M4LnHGsIQQOt2gpj414ybQB2ZUJpucP2DLHw6wAkdEZuE2zaMKQCKwahXjeWO07rI0R93i6vbnQ22ZBPDk56hSI00qsQh6Vrb'
);

const items = new Map([
  ['price_1M4MZeGsIQQOt2gpVjyaZI0N', { priceInCents: 500, name: 'Tourify Pro' }]
]);

const checkout = async (req, res) => {
  try {
    if (req.user) {
      const priceId = req.body.items[0].id;
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'subscription',
        success_url: `${process.env.CLIENT_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}/dashboard`,
        line_items: [
          {
            price: priceId,
            quantity: 1
          }
        ]
      });
      res.status(201);
      res.send({ url: session.url });
    } else {
      res.send({ user: false });
    }
  } catch (e) {
    console.log('Error in checkout controller', e);
  }
};

module.exports = { checkout };
