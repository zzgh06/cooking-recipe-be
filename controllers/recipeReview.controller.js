const recipeReviewController = {};
const RecipeReview = require("../models/RecipeReview");
const User = require("../models/User");
recipeReviewController.createReview = async (req, res) => {
  try {
    let { userId } = req;
    let userId_obj = userId;
    const user = await User.findOne({ _id: userId_obj, isDeleted: false });

    const userId_str = user?.id;
    let { comment, rating, recipeId } = req.body;
    const newRecipeReview = new RecipeReview({
      userId_str,
      userId_obj,
      recipeId,
      comment,
      rating,
    });
    await newRecipeReview.save();
    res.status(200).json({ status: "success", data: newRecipeReview });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

recipeReviewController.getReviews = async (req, res) => {
  try {
    const recipeId = req.params.id;

    const reviews = await RecipeReview.find({ recipeId });
    if (reviews) {
      return res.status(200).json({ status: "success", reviews });
    }
    throw new Error("getReview error");
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

recipeReviewController.deleteReview = async (req, res) => {
  try {
    const recipeReviewId = req.params.id;
    await RecipeReview.deleteOne({ _id: recipeReviewId });
    res.status(200).json({ status: "success" });
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
