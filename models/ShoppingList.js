const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User");
const Ingredient = require("./Ingredient");

const shoppingListSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        ingredientId: { type: mongoose.ObjectId, ref: Ingredient },
        name: { type: String },
        completed : { type: Boolean },
      },
    ],
  },
  { timestamps: true }
);

shoppingListSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.updatedAt;
  delete obj.createAt;
  delete obj.__v;
  return obj;
};

const ShoppingList = mongoose.model('ShoppingList', shoppingListSchema);
module.exports = ShoppingList;