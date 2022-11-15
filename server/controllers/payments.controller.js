require('dotenv').config();
const usersModel = require('../models/users.model');

const stripe = require('stripe')(process.env.STRIPE_TEST_KEY);

const checkout = async (req, res) => {
  try {
    if (req.user) {
      const priceId = req.body.items[0].id;
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'subscription',
        success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
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

const authenticatePurchase = async (req, res) => {
  try {
    if (req.user) {
      const { session_id } = req.body;
      const session = await stripe.checkout.sessions.retrieve(session_id);
      if (session.payment_status !== 'paid') {
        res.send({ authenticated: false });
        return;
      }
      await usersModel.upgradeAccountToPro(req.user.email);
      res.send({ authenticated: true });
    } else {
      res.send({ user: false });
    }
  } catch (e) {
    console.log('Error authenticating purchase', e);
    res.send({ authenticated: false });
  }
};

module.exports = { checkout, authenticatePurchase };
