const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ingredientSchema = Schema(
  {
    name: { type: String },
    description: { type: String },
    image: { type: String, required: true },
    price: { type: Number },
    category: { type: String, default: "기타" },
    stock: { type: Number, required: true },
    status: { type: String, default: "active" },
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
