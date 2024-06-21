const User = require("../models/User");
const Recipe = require("../models/Recipe");

const recipeController = {};
recipeController.createRecipe = async (req, res) => {
  try {
    const { userId } = req;
    const { name, ingredients, descriptions, category, image } = req.body;
    const recipe = new Recipe({
      name,
      ingredients,
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

recipeController.editRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const { name, descriptions, category, image } = req.body;
    const recipe = await Recipe.findByIdAndUpdate(
      { _id: recipeId },
      { name, descriptions, category, image },
      { new: true } //업데이트 된 문서 반환
    );
    if (!recipe) throw new Error("recipe doesn't exist");
    res.status(200).json({ status: "success", data: recipe });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

recipeController.deleteRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const recipe = await Recipe.findByIdAndUpdate(
      { _id: recipeId },
      { isDeleted: true }
    );
    if (!recipe) throw new Error("No recipe found");
    res.status(200).json({ state: "success" });
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};

recipeController.getRecipeById = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) throw new Error("No recipe found");
    res.status(200).json({ status: "success", data: recipe });
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};
//글 작성자 이거나 admin이면 update 허용
// recipeController.checkUpdatePermission = async (req, res, next) => {
//   try {
//     const recipeId = req.params.id;
//     const recipe = await Recipe.findById(recipeId);
//     const { userId } = req;
//     const user = await User.findById(userId);

//     if (!user._id.equals(recipe.userId) && user.level !== "admin")
//       throw Error("no update permission");
//     next();
//   } catch (error) {
//     return res.status(400).json({ status: "fail", error: error.message });
//   }
// };
module.exports = recipeController;
