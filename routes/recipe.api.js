const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");
const recipeController = require("../controllers/recipe.controller");
//recipe
router.post("/", authController.authenticate, recipeController.createRecipe);
router.get("/", recipeController.getRecipes);

module.exports = router;
