const Ingredient = require("../models/Ingredient");

const ingredientController = {};

const PAGE_SIZE = 8;
ingredientController.getIngredients = async (req, res) => {
  try {
    const { page, name, category } = req.query;

    const query = { isDeleted: false };

    if (name) {
      query.name = new RegExp(name, "i");
    }

    if (category) {
      query.category = new RegExp(category, "i");
    }

    let ingredients;
    let totalItems;

    if (page) {
      totalItems = await Ingredient.find(query).count();
      ingredients = await Ingredient.find(query)
        .skip((page - 1) * PAGE_SIZE)
        .limit(PAGE_SIZE);
    } else {
      ingredients = await Ingredient.find(query);
      totalItems = ingredients.length;
    }

    res.status(200).json({
      status: "success",
      data: {
        ingredients,
        totalPageNum: page ? Math.ceil(totalItems / PAGE_SIZE) : 1,
      },
    });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

//재료 하나 리턴
ingredientController.getIngredient = async (req, res) => {
  try {
    const ingredientId = req.params.id;
    const ingredient = await Ingredient.findById(ingredientId);
    if (!ingredient) throw new Error("해당 재료를 찾을 수 없습니다.");

    res.status(200).json({ status: "success", ingredient });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};


//재료 생성
ingredientController.createIngredient = async (req, res) => {
  try {
    const {
      name,
      description,
      images,
      price,
      discountPrice,
      category,
      stock,
      unit,
      status = "active",
      isDeleted = false,
    } = req.body;

    const ingredient = new Ingredient({
      name,
      description,
      images,
      price,
      discountPrice,
      category,
      stock,
      unit,
      status,
      isDeleted,
    });
    await ingredient.save();
    res.status(200).json({ status: "success", ingredient });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

//재료 수정
ingredientController.updateIngredient = async (req, res) => {
  try {
    const ingredientId = req.params.id;
    const {
      name,
      description,
      image,
      price,
      discountPrice,
      category,
      stock,
      unit,
      status,
      isDeleted,
    } = req.body;

    const ingredient = await Ingredient.findByIdAndUpdate(
      ingredientId,
      {
        name,
        description,
        image,
        price,
        discountPrice,
        category,
        stock,
        unit,
        status,
        isDeleted,
      },
      { new: true }
    );
    res.status(200).json({ status: "success", ingredient });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

//재료 삭제
ingredientController.deleteIngredient = async (req, res) => {
  try {
    const ingredientId = req.params.id;
    const ingredient = await Ingredient.findByIdAndUpdate(
      ingredientId,
      { isDeleted: true },
      { new: true }
    );
    res.status(200).json({ status: "success", ingredient });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

//재고 하나 체크
ingredientController.checkStock = async (item) => {
  const ingredient = await Ingredient.findById(item.ingredientId);
  if (ingredient.stock < item.qty) {
    return { isVerify: false, message: ingredient.name };
  }

  ingredient.stock -= item.qty;
  await ingredient.save();

  return { isVerify: true };
};

//재고 전부 체크
ingredientController.checkItemListStock = async (items) => {
  const insufficientStockItems = [];
  await Promise.all(
    items.map(async (item) => {
      const stockCheck = await ingredientController.checkStock(item);
      if (!stockCheck.isVerify) {
        insufficientStockItems.push({ items, message: stockCheck.message });
      }
      return stockCheck;
    })
  );

  return insufficientStockItems;
};

ingredientController.updateReviewCnt = async (ingredientId, num) => {
  const ingredient = await Ingredient.findById(ingredientId);

  if (!ingredient) throw new Error("update reviewCnt error");
  if (typeof ingredient.reviewCnt !== "number") recipe.reviewCnt = 0;
  ingredient.reviewCnt += num;
  await ingredient.save();
};

module.exports = ingredientController;
