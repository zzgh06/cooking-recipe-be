const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User");
const Ingredient = require("./Ingredient");

const frigeSchema = Schema(
  {
    userId: { type: mongoose.ObjectId, ref: User },
    items: [{ingredientId: { type: mongoose.ObjectId, ref: Ingredient } }],
  },
  { timestamps: true }
);
frigeSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.updatedAt;
  delete obj.createAt;
  delete obj.__v;
  return obj;
};

const Frige = mongoose.model("Frige", frigeSchema);
module.exports = Frige;

