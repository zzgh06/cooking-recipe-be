const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ingredientSchema = Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    category: { type: Array, required: true },
    stock: { type: Number, required: true },
    unit: { type: String },
    status: { type: String, default: "active" },
    reviewCnt: { type: Number, default: 0 },
    totalSales: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);
ingredientSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.updatedAt;
  delete obj.createAt;
  delete obj.__v;
  return obj;
};

const Ingredient = mongoose.model("Ingredient", ingredientSchema);

module.exports = Ingredient;
