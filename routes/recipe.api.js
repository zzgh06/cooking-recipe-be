const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");
const recipeController = require("../controllers/recipe.controller");
//recipe

router.post("/", authController.authenticate, recipeController.createRecipe); //test
router.get("/", recipeController.getRecipes); //test
router.put(
  "/:id",
  authController.authenticate,
  recipeController.checkUpdatePermission,
  recipeController.editRecipe
); //test

router.delete(
  "/:id",
  authController.authenticate,
  recipeController.checkUpdatePermission,
  recipeController.deleteRecipe
); //test
router.get("/:id", recipeController.getRecipeById); //test

module.exports = router;
