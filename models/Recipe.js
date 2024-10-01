const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Ingredient = require("./Ingredient");
const User = require("./User");
const recipeSchema = Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    ingredients: [
      {
        ingredientId: { type: mongoose.ObjectId, ref: Ingredient },
        name: { type: String },
        qty: { type: String },
        unit: { type: String },
      },
    ],
    steps: [
      {
        description: { type: String },
        image: { type: String },
      },
    ],
    categories: {
      food: { type: String },
      mood: { type: String }, 
      method: { type: String }, 
      ingredient: { type: String }, 
      etc: { type: String }, 
    },

    images: [{ type: String }],
    userId: { type: mongoose.ObjectId, ref: User },
    time: { type: String },
    servings: { type: String },
    difficulty: { type: String },
    isDeleted: { type: Boolean, default: false },
    reviewCnt: { type: Number, default: 0 },
    viewCnt: { type: Number, default: 0 },
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
