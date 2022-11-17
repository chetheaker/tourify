"use strict";
var express = require('express');
var paymentsController = require('./../controllers/payments.controller');
var router = express.Router();
router.post('/checkout', paymentsController.checkout);
router.post('/success/auth', paymentsController.authenticatePurchase);
module.exports = router;
