const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const shoppingListController = require("../controllers/shoppingList.controller");

router.post('/add', authController.authenticate, shoppingListController.addItems);
router.get('/me', authController.authenticate, shoppingListController.getShoppingList);
router.post('/remove', authController.authenticate, shoppingListController.removeItems);
router.post('/moveToShoppingList', authController.authenticate, shoppingListController.moveToCompletedList);

module.exports = router;