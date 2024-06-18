const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Product = require("./Ingredient");
const User = require("./User");
const Cart = require("./Cart");
const orderSchema = Schema(
  {
    contactInfo: {
      userId: { type: mongoose.ObjectId, ref: User },
      shipTo: { type: Object, required: true },
      contact: { type: Object },
    },
    totalPrice: { type: Number, required: true, default: 0 },
    status: { type: String, default: "preparing" },
    orderNum: { type: String },
    items: [
      {
        ingredientId: { type: mongoose.ObjectId, ref: Ingredient },
        qty: { type: Number, required: true, default: 1 },
        price: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);
orderSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.updatedAt;
  delete obj.createAt;
  delete obj.__v;
  return obj;
};
orderSchema.post("save", async function () {
  //카트를 비워주자
  const cart = await Cart.findOne({ userId: this.userId });
  cart.items = [];
  await cart.save();
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
