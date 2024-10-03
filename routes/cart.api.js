const express = require("express");
const authController = require("../controllers/auth.controller");
const cartController = require("../controllers/cart.controller");
const router = express.Router();

router.get('/', authController.authenticate, cartController.getCart);
router.post('/', authController.authenticate, cartController.addItemToCart);
router.put('/:id', authController.authenticate, cartController.updateCartItem);
router.delete('/:id', authController.authenticate, cartController.deleteCartItem);
module.exports = router;