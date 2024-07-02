const express = require("express");
const router = express.Router();
const frigeApi = require("./frige.api");
const authApi = require("./auth.api");
const userApi = require("./user.api");
const passwordApi = require('./password.api');
const recipeApi = require("./recipe.api");
const ingredientApi = require("./ingredient.api");
const cartApi = require("./cart.api");
const reviewApi = require("./review.api");
const orderApi = require("./order.api");

router.use("/auth", authApi);
router.use("/user", userApi);
router.use('/password', passwordApi);
router.use("/recipe", recipeApi);
router.use("/frige", frigeApi);
router.use("/ingredient", ingredientApi);
router.use("/cart", cartApi);
router.use("/review", reviewApi);
router.use("/order", orderApi);

module.exports = router;
