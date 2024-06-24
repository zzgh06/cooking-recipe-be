const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Recipe = require("./Recipe");
const User = require("./User");
const recipeReviewSchema = Schema(
  {
    recipeId: { type: mongoose.ObjectId, ref: Recipe, required: true },
    userId_str: { type: String, required: true }, //user의 id 저장 (문자열임, objectId 아님)
    userId_obj: { type: mongoose.ObjectId, ref: User, required: true },
    comment: { type: String, required: true },
    rating: { type: Number },
  },
  { timestamps: true }
);
recipeReviewSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.updatedAt;
  delete obj.createAt;
  delete obj.__v;
  return obj;
};

const RecipeReview = mongoose.model("RecipeReview", recipeReviewSchema);
module.exports = RecipeReview;
