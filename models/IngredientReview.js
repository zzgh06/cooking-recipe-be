const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Ingredient = require("./Ingredient");
const User = require("./User");
const ingredientReviewSchema = Schema(
  {
    ingredientId: { type: mongoose.ObjectId, ref: Ingredient, required: true },
    userId: { type: mongoose.ObjectId, ref: User, required: true },
    comment: { type: String, required: true },
    rating: { type: Number },
  },
  { timestamps: true }
);
ingredientReviewSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.updatedAt;
  delete obj.createAt;
  delete obj.__v;
  return obj;
};

const IngredientReview = mongoose.model(
  "IngredientReview",
  ingredientReviewSchema
);
module.exports = IngredientReview;
