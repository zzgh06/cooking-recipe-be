const Recipe = require("../models/Recipe");

const recipeController = {};

recipeController.createRecipe = async (req, res) => {
  try {
    const { userId } = req;
    const { name, descriptions, category, image } = req.body;
    const recipe = new Recipe({
      name,
      descriptions,
      category,
      image,
      userId,
    });
    await recipe.save();
    res.status(200).json({ status: "success", recipe });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};
const PAGE_SIZE = 5;
recipeController.getRecipes = async (req, res) => {
  try {
    const { page, name } = req.query;
    const cond = name //대소문자 구별 안함
      ? { name: { $regex: name, $options: "i" }, isDeleted: false }
      : { isDeleted: false };
    let query = Recipe.find(cond);

    let response = { status: "success" };
    if (page) {
      query.skip((page - 1) * PAGE_SIZE).limit(PAGE_SIZE);
      const totalItemNum = await Recipe.find(cond).count();
      const totalPageNum = Math.ceil(totalItemNum / PAGE_SIZE);
      response.totalPageNum = totalPageNum;
    }
    const recipeList = await query.exec();
    response.data = recipeList;
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

recipeController.editRecipe = async (req, res) => {};

recipeController.deleteRecipe = async (req, res) => {};

recipeController.getRecipeById = async (req, res) => {};

module.exports = recipeController;
