const Favorite = require("../models/Favorite");
favoriteController = {}

favoriteController.getRecipeFavorites = async (req, res) => {
  try {
    const { userId } = req;
    const favorites = await Favorite.findOne({ userId });
    res.status(200).json({status : "success",  data : favorites});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

favoriteController.addRecipeFavorites = async (req, res) => {
  try {
    const { userId } = req;
    const recipeId = req.params.id;
    const favorite = await Favorite.findOne({ userId });
    if (!favorite) {
      const newFavorite = new Favorite({
        userId: userId,
        recipes: [recipeId],
        ingredients: []
      });
      await newFavorite.save();
    } else {
      favorite.recipes.push(recipeId);
      await favorite.save();
    }
    res.status(200).json({status : "success"});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

favoriteController.deleteRecipeFavorites = async (req, res) => {
  try {
    const { userId } = req;
    const recipeId = req.params.id;
    const favorite = await Favorite.findOne({ userId });
    if (favorite) {
      favorite.recipes.pull(recipeId);
      await favorite.save();
    }
    res.status(200).json({status : "success"});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = favoriteController;
