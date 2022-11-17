import express = require('express');
const paymentsController = require('./../controllers/payments.controller');
const router = express.Router();

router.post('/checkout', paymentsController.checkout);
router.post('/success/auth', paymentsController.authenticatePurchase);

module.exports = router;
