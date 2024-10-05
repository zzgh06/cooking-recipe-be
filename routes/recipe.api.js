const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");
const recipeController = require("../controllers/recipe.controller");

router.post("/", authController.authenticate, recipeController.createRecipe); 
router.get("/", recipeController.getRecipes); 
router.put(
  "/:id",
  authController.authenticate,
  authController.checkRecipeUpdatePermission,
  recipeController.editRecipe
); 

router.delete(
  "/:id",
  authController.authenticate,
  authController.checkRecipeUpdatePermission,
  recipeController.deleteRecipe
);
router.get("/category", recipeController.getRecipesByCategory);
// router.get("/frige", recipeController.getFrigeRecipes);
router.get("/:id", recipeController.updateViewCount, recipeController.getRecipeById);
router.get("/frige/recommend", recipeController.getRecommendedRecipes);
module.exports = router;
