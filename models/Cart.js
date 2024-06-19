const mongoose = require("mongoose");
const User = require("./User");
const Ingredient = require("./Ingredient");
const Schema = mongoose.Schema;
const cartSchema = Schema(
  {
    userId: { type: mongoose.ObjectId, ref: User },
    items: [
      {
        ingredientId: { type: mongoose.ObjectId, ref: Ingredient },
        qty: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);
cartSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.updatedAt;
  delete obj.createAt;
  delete obj.__v;
  return obj;
};
const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
