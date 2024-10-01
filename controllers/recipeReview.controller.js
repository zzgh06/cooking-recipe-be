const recipeReviewController = {};
const recipeController = require("./recipe.controller");
const RecipeReview = require("../models/RecipeReview");
const User = require("../models/User");
const Recipe = require("../models/Recipe");
recipeReviewController.createReview = async (req, res) => {
  try {
    let { userId } = req;

    let { comment, rating, recipeId } = req.body;
    const newRecipeReview = new RecipeReview({
      userId,
      recipeId,
      comment,
      rating,
    });
    await newRecipeReview.save();
    await recipeController.updateReviewCnt(recipeId, 1);
    res.status(200).json({ status: "success", data: newRecipeReview });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

recipeReviewController.getReviews = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const reviews = await RecipeReview.find({ recipeId })
      .populate("userId")
      .skip(skip)
      .limit(limit);

    const totalReviews = await RecipeReview.countDocuments({ recipeId });
    const allReviews = await RecipeReview.find({ recipeId });

    if (reviews) {
      return res.status(200).json({ status: "success", reviews, totalReviews, allReviews });
    }
    throw new Error("getReviews error");
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};


recipeReviewController.deleteReview = async (req, res) => {
  try {
    const recipeReviewId = req.params.id;
    const _review = await RecipeReview.findById(recipeReviewId);
    const review = await RecipeReview.deleteOne({ _id: recipeReviewId });
    await recipeController.updateReviewCnt(_review.recipeId, -1);
    res
      .status(200)
      .json({ status: "success", deletedCount: review.deletedCount });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

recipeReviewController.updateReview = async (req, res) => {
  try {
    const recipeReviewId = req.params.id;
    const { rating, comment } = req.body;
    const review = await RecipeReview.findByIdAndUpdate(
      { _id: recipeReviewId },
      { comment, rating },
      { new: true }
    );
    if (!review) throw new Error("review doesn't exist");
    res.status(200).json({ status: "success", data: review });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};
module.exports = recipeReviewController;
