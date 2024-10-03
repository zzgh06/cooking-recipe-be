const express = require("express");
const router = express.Router();
const recipeReviewController = require("../controllers/recipeReview.controller");
const ingredientReviewController = require("../controllers/ingredientReview.controller");
const authController = require("../controllers/auth.controller");

router.post(
  "/recipe",
  authController.authenticate,
  recipeReviewController.createReview
); 

router.get("/recipe/:id", recipeReviewController.getReviews);

router.delete(
  "/recipe/:id",
  authController.authenticate,
  authController.checkRecipeReviewUpdatePermission,
  recipeReviewController.deleteReview
); 

router.put(
  "/recipe/:id",
  authController.authenticate,
  authController.checkRecipeReviewUpdatePermission,
  recipeReviewController.updateReview
);

router.post(
  "/ingredient",
  authController.authenticate,
  ingredientReviewController.createReview
); 

router.get("/ingredient/:id", ingredientReviewController.getReviews); 

router.delete(
  "/ingredient/:id",
  authController.authenticate,
  authController.checkIngredientReviewUpdatePermission,
  ingredientReviewController.deleteReview
);

router.put(
  "/ingredient/:id",
  authController.authenticate,
  authController.checkIngredientReviewUpdatePermission,
  ingredientReviewController.updateReview
); 

module.exports = router;
