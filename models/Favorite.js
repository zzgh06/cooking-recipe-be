const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
  userId: { type: mongoose.ObjectId, ref: 'User', required: true },
  recipes: [{ type: mongoose.ObjectId, ref: 'Recipe' }],
  ingredients: [{ type: mongoose.ObjectId, ref: 'Ingredient' }],
}, { timestamps: true });

favoriteSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

const Favorite = mongoose.model('Favorite', favoriteSchema);
module.exports = Favorite;
