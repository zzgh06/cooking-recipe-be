const express = require("express");
const router = express.Router();
const recipeReviewController = require("../controllers/recipeReview.controller");
const authController = require("../controllers/auth.controller");
router.post(
  "/",
  authController.authenticate,
  recipeReviewController.createReview
); //test
router.get("/:id", recipeReviewController.getReviews); //test
router.delete(
  "/:id",
  authController.authenticate,
  authController.checkRecipeReviewUpdatePermission,
  recipeReviewController.deleteReview
); //test
router.put(
  "/:id",
  authController.authenticate,
  authController.checkRecipeReviewUpdatePermission,
  recipeReviewController.updateReview
); //test
module.exports = router;
