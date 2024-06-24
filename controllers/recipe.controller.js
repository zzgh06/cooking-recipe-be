const User = require("../models/User");
const Recipe = require("../models/Recipe");

const recipeController = {};
recipeController.createRecipe = async (req, res) => {
  try {
    const { userId } = req;
    const { name, ingredients, descriptions, categories, images } = req.body;
    const recipe = new Recipe({
      name,
      ingredients,
      descriptions,
      categories,
      images,
      userId,
    });
    await recipe.save();
    res.status(200).json({ status: "success", recipe });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};
//데이터 테스트
// {
//   "name": "소떡강정",
//   "ingredients": [
//       {
//           "name": "비엔나소세지",
//           "qty": "",
//           "unit": ""
//       },
//       {
//           "name": "떡볶이떡",
//           "qty": "",
//           "unit": ""
//       },
//       {
//           "name": "식용유",
//           "qty": "",
//           "unit": ""
//       }
//   ],
//   "descriptions": [
//       {
//           "description": "분량의 강정 양념을 만들어주세요"
//       },
//       {
//           "description": "팬에 기름을 넉넉하게 두르고 떡과 소세지를 넣어주세요"
//       },
//       {
//           "description": "양념이 잘 베이게 볶았다면 통깨를 뿌려주세요"
//       },
//       {
//           "description": "된장국 완성"
//       }
//   ],
//   "categories": {
//       "foodCategory": "메인반찬",
//       "moodCategory": "일상",
//       "methodCategory": "볶음",
//       "ingredientCategory": "가공식품류"
//   },
//   "images": [
//       {
//           "image": "123"
//       }
//   ]
// }
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
    const { name, descriptions, categories, images } = req.body;
    const recipe = await Recipe.findByIdAndUpdate(
      { _id: recipeId },
      { name, descriptions, categories, images },
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

recipeController.getFrigeRecipes = async (req, res) => {
  try {
    const { ingredient } = req.query;
    let response = { status: "success" };
    if (ingredient) {
      const ingredientNames = ingredient.split(" "); //냉장고에 있는 재료

      //모든 레시피 조회
      const recipes = await Recipe.find();
      //각 레시피를 검사하여 포함된 재료 갯수를 셈
      const filteredRecipes = recipes.filter((recipe) => {
        const recipeIngredientNames = recipe.ingredients.map((ing) => ing.name); //레시피에 필요한 재료
        const matchingIngredientsCount = ingredientNames.filter((name) =>
          recipeIngredientNames.includes(name)
        ).length; //냉장고에 있는 재료 중에 레시피에 쓰이는 재료 갯수
        return (
          matchingIngredientsCount >= Math.ceil(ingredientNames.length / 2)
        ); //냉장고 재료 중 절반이상이 쓰여야 관련된 레시피로 반환
      });
      response.recipeList = filteredRecipes;
    } else {
      const recipes = await Recipe.find();
      response.recipeList = recipes;
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};
recipeController.getRecipesByCategory = async (req, res) => {
  try {
    const {
      foodCategory,
      moodCategory,
      methodCategory,
      ingredientCategory,
      etcCategory,
    } = req.query;
    let query = {};
    if (foodCategory) query["categories.foodCategory"] = foodCategory;
    if (moodCategory) query["categories.moodCategory"] = moodCategory;
    if (methodCategory) query["categories.methodCategory"] = methodCategory;
    if (ingredientCategory)
      query["categories.ingredientCategory"] = ingredientCategory;
    let recipeList = await Recipe.find(query);
    if (etcCategory) {
      const etcCategoryArray = etcCategory.split(" "); //검색 카테고리
      const filteredRecipes = recipeList.filter((recipe) => {
        const etcArray = recipe.categories.etcCategory; //레시피
        //etcArray에 etcCategoryArray가 다 포함되어있을 경우 반환
        return (
          etcArray &&
          etcCategoryArray.every((category) => etcArray.includes(category))
        );
      });
      recipeList = filteredRecipes;
    }

    res.status(200).json({ status: "success", recipeList: recipeList });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};
module.exports = recipeController;
