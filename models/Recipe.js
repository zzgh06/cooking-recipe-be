const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Ingredient = require("./Ingredient");
const User = require("./User");
const recipeSchema = Schema(
  {
    ingredients: [
      {
        ingredientId: { type: mongoose.ObjectId, ref: Ingredient },
        qty: { type: String },
      },
    ],
    descriptions: [
      {
        description: { type: String, required: true },
        image: { type: String },
      },
    ],
    category: { type: String },
    image: { type: String, required: true },
    userId: { type: mongoose.ObjectId, ref: User },
  },
  { timestamps: true }
);
recipeSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.updatedAt;
  delete obj.createAt;
  delete obj.__v;
  return obj;
};

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
