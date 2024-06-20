const express = require("express");
const router = express.Router();
const frigeApi = require("./frige.api");
const authApi = require("./auth.api");
const userApi = require("./user.api");
const recipeApi = require("./recipe.api");

router.use("/auth", authApi);
router.use("/user", userApi);
router.use("/recipe", recipeApi);
router.use("/frige", frigeApi);

module.exports = router;
