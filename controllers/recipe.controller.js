const User = require("../models/User");
const Recipe = require("../models/Recipe");

const recipeController = {};
recipeController.createRecipe = async (req, res) => {
  try {
    const { userId } = req;
    const {
      name,
      description,
      ingredients,
      steps,
      categories,
      images,
      time,
      servings,
      difficulty,
    } = req.body;
    const recipe = new Recipe({
      name,
      description,
      ingredients,
      steps,
      categories,
      images,
      userId,
      time,
      servings,
      difficulty,
    });
    await recipe.save();
    res.status(200).json({ status: "success", recipe });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

recipeController.getRecipes = async (req, res) => {
  try {
    const { page, name } = req.query;
    const cond = name 
      ? { name: { $regex: name, $options: "i" }, isDeleted: false }
      : { isDeleted: false };
    let query = Recipe.find(cond);
    const sortField = "reviewCnt";
    query = query.sort({ [sortField]: -1 });

    let response = { status: "success" };
    if (page) {
      query = query.skip((page - 1) * PAGE_SIZE).limit(PAGE_SIZE);
      const totalItemNum = await Recipe.countDocuments(cond);
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

recipeController.getRecipesByCategory = async (req, res) => {
  try {
    const { food, mood, method, ingredient, etc, page, limit = 12 } = req.query;
    let query = {};
    if (food) query["categories.food"] = food;
    if (mood) query["categories.mood"] = mood;
    if (method) query["categories.method"] = method;
    if (ingredient) query["categories.ingredient"] = ingredient;
    if (etc) query["categories.etc"] = etc;

    const recipeList = page ? 
      await Recipe.find(query).skip((page - 1) * limit).limit(Number(limit)) :
      await Recipe.find(query);

    const totalRecipes = await Recipe.countDocuments(query);
    const totalPages = Math.ceil(totalRecipes / limit);

    res.status(200).json({
      status: "success",
      recipeList,
      totalPages,
      currentPage: page
    });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};


recipeController.editRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const {
      name,
      description,
      ingredients,
      steps,
      categories,
      images,
      time,
      servings,
      difficulty,
    } = req.body;
    const recipe = await Recipe.findByIdAndUpdate(
      { _id: recipeId },
      {
        name,
        description,
        ingredients,
        steps,
        categories,
        images,
        time,
        servings,
        difficulty,
      },
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
    res.status(200).json({ status: "success" });
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};

recipeController.updateViewCount = async (req, res, next) => {
  const recipeId = req.params.id;

  try {
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      throw new Error('Recipe not found');
    }

    // 조회수 증가
    recipe.viewCnt += 1;
    await recipe.save();

    next(); // 다음 미들웨어나 라우트 핸들러로 넘어감
  } catch (error) {
    res.status(400).json({ status: 'fail', error: error.message });
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

recipeController.getFrigeRecipes = async (req, res) => {
  try {
    const { name } = req.query;
    let response = { status: "success" };

    if (name) {
      const regex = new RegExp(name, "i");

      const recipes = await Recipe.find({
        isDeleted: false,
        $or: [
          { name: { $regex: regex } },
          { "ingredients.name": { $regex: regex } },
        ],
      });

      response.recipeList = recipes;
    } else {
      response.recipeList = [];
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};


recipeController.updateReviewCnt = async (recipeId, num) => {
  const recipe = await Recipe.findById(recipeId);
  //console.log(recipeId);
  if (!recipe) throw new Error("update reviewCnt error");
  if (typeof recipe.reviewCnt !== "number") recipe.reviewCnt = 0;
  recipe.reviewCnt += num;
  await recipe.save();
};

recipeController.getRecommendedRecipes = async (req, res) => {
  try {
    const { checkedItems } = req.query;

    if (!checkedItems || checkedItems.length === 0) {
      return res
        .status(400)
        .json({ status: "fail", message: "No ingredients provided" });
    }

    // 재료명이 "호두 500g"이런 식으로 되어있을 경우 분리해서 "호두"만 전달
    const normalizedCheckedItems = checkedItems
      .split(",")
      .map((item) => item.split(" ")[0]);
    const ingredientsSet = new Set(normalizedCheckedItems);
    const recipes = await Recipe.find({ isDeleted: false });

    // 가장 일치하는 레시피 계산 : 일치하는 재료가 있는 레시피만 리턴
    const rankedRecipes = recipes
      .map((recipe) => {
        const recipeIngredients = recipe.ingredients.map((ing) => ing.name);
        const commonIngredients = recipeIngredients.filter((ing) =>
          ingredientsSet.has(ing)
        );
        return commonIngredients.length > 0
          ? { recipe, score: commonIngredients.length }
          : null;
      })
      .filter(Boolean);

    // 일치하는 재료가 있는 레시피 중 순서대로 정렬
    rankedRecipes.sort((a, b) => b.score - a.score);

    res
      .status(200)
      .json({
        status: "success",
        recipeList: rankedRecipes.map((r) => r.recipe),
      });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};
module.exports = recipeController;