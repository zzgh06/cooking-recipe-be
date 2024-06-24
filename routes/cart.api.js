const express = require("express");
const authController = require("../controllers/auth.controller");
const cartController = require("../controllers/cart.controller");
const router = express.Router();

router.get('/', authController.authenticate, cartController.getCart);
router.post('/', authController.authenticate, cartController.addItemToCart);
router.put('/:id', authController.authenticate);
router.delete('/:id', authController.authenticate);

module.exports = router;