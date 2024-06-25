const express = require("express");
const router = express.Router();
const recipeReviewController = require("../controllers/recipeReview.controller");
const ingredientReviewController = require("../controllers/ingredientReview.controller");
const authController = require("../controllers/auth.controller");

//recipe
router.post(
  "/recipe",
  authController.authenticate,
  recipeReviewController.createReview
); //test
router.get("/recipe/:id", recipeReviewController.getReviews); //test
router.delete(
  "/recipe/:id",
  authController.authenticate,
  authController.checkRecipeReviewUpdatePermission,
  recipeReviewController.deleteReview
); //test
router.put(
  "/recipe/:id",
  authController.authenticate,
  authController.checkRecipeReviewUpdatePermission,
  recipeReviewController.updateReview
); //test

//ingredient
router.post(
  "/ingredient",
  authController.authenticate,
  ingredientReviewController.createReview
); //test
router.get("/ingredient/:id", ingredientReviewController.getReviews); //test
router.delete(
  "/ingredient/:id",
  authController.authenticate,
  authController.checkIngredientReviewUpdatePermission,
  ingredientReviewController.deleteReview
); //test
router.put(
  "/ingredient/:id",
  authController.authenticate,
  authController.checkIngredientReviewUpdatePermission,
  ingredientReviewController.updateReview
); //test

module.exports = router;
