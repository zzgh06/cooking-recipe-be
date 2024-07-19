const ingredientController = require("./ingredient.controller");
const ingredientReviewController = {};
const IngredientReview = require("../models/IngredientReview");
const User = require("../models/User");
const Ingredient = require("../models/Ingredient");
ingredientReviewController.createReview = async (req, res) => {
  try {
    let { userId } = req;

    let { comment, rating, recipeId } = req.body;
    let ingredientId = recipeId;
    const newIngredientReview = new IngredientReview({
      userId,
      ingredientId,
      comment,
      rating,
    });
    await newIngredientReview.save();
    await ingredientController.updateReviewCnt(ingredientId, 1);
    res.status(200).json({ status: "success", data: newIngredientReview });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

ingredientReviewController.getReviews = async (req, res) => {
  try {
    const ingredientId = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const reviews = await IngredientReview.find({ ingredientId })
      .populate("userId")
      .skip(skip)
      .limit(limit);

    const totalReviews = await IngredientReview.countDocuments({ ingredientId });
    const allReviews = await IngredientReview.find({ ingredientId });

    if (reviews) {
      return res.status(200).json({ status: "success", reviews, totalReviews, allReviews });
    }
    throw new Error("getReviews error");
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};


ingredientReviewController.deleteReview = async (req, res) => {
  try {
    const ingredientReviewId = req.params.id;
    const _review = await IngredientReview.findById(ingredientReviewId);
    //console.log(_review);

    const review = await IngredientReview.deleteOne({
      _id: ingredientReviewId,
    });
    await ingredientController.updateReviewCnt(_review.ingredientId, -1);

    res
      .status(200)
      .json({ status: "success", deletedCount: review.deletedCount });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

ingredientReviewController.updateReview = async (req, res) => {
  try {
    const ingredientReviewId = req.params.id;
    const { rating, comment } = req.body;
    const review = await IngredientReview.findByIdAndUpdate(
      { _id: ingredientReviewId },
      { comment, rating },
      { new: true }
    );
    if (!review) throw new Error("review doesn't exist");
    res.status(200).json({ status: "success", data: review });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};
module.exports = ingredientReviewController;
