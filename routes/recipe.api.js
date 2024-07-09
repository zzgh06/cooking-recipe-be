const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");
const recipeController = require("../controllers/recipe.controller");
//recipe

router.post("/", authController.authenticate, recipeController.createRecipe); //test
router.get("/", recipeController.getRecipes); //레시피 검색용//test
router.put(
  "/:id",
  authController.authenticate,
  authController.checkRecipeUpdatePermission,
  recipeController.editRecipe
); //test

router.delete(
  "/:id",
  authController.authenticate,
  authController.checkRecipeUpdatePermission,
  recipeController.deleteRecipe
);
router.get("/category", recipeController.getRecipesByCategory);
router.get("/frige", recipeController.getFrigeRecipes); //냉장고 재료 기반 검색용 //test
router.get("/:id", recipeController.getRecipeById); //test
router.get("/frige/recommend", recipeController.getRecommendedRecipes);
module.exports = router;
