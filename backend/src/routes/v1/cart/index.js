'use strict';

const express = require('express');
const CartController = require('~/controllers/cart.controller');
const asyncHandler = require('~/middleware/async.middleware');
const router = express.Router();

router.post('', asyncHandler(CartController.addToCart));
router.post('/update', asyncHandler(CartController.updateCart));
router.delete('', asyncHandler(CartController.deleteCart));
router.get('', asyncHandler(CartController.listCart));

module.exports = router;
