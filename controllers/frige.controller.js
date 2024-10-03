const User = require("../models/User");
const Frige = require("../models/Frige");
const frigeController = {};

frigeController.addIngredient = async (req, res) => {
  try {
    const { userId } = req;
    let userFrige = await Frige.findOne({ userId });

    if (!userFrige) {
      userFrige = new Frige({ userId, items: [] });
    }

    const addIngredients = req.body.items;
    addIngredients.forEach((addIngredient) => {
      const alreadyExists = userFrige.items.find(
        (item) =>
          item.ingredientId.toString() === addIngredient.ingredientId.toString()
      );
      if (alreadyExists) throw new Error("냉장고에 재료가 이미 있습니다.");

      userFrige.items.push({ ingredientId: addIngredient.ingredientId });
    });
    await userFrige.save();

    await userFrige.populate("items.ingredientId");
    res.status(200).json({ status: "success", userFrige: userFrige.items });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

PAGE_SIZE = 12;
frigeController.getUserFrige = async (req, res) => {
  try {
    const { userId } = req;
    const { page = 1, name } = req.query;
    let query = {};
    let totalItems = 0;

    let userFrige = await Frige.findOne({ userId }).populate(
      "items.ingredientId"
    );
    
    if (!userFrige) throw new Error("냉장고가 존재하지 않습니다.");
    
    totalItems = userFrige.items.length;

    if (name) {
      const regex = new RegExp(name, "i");
      userFrige.items = userFrige.items.filter((ingredient) =>
        regex.test(ingredient.ingredientId.name)
      );
      totalItems = userFrige.items.length;
    }

    userFrige.items = userFrige.items.slice(
      (page - 1) * PAGE_SIZE,
      page * PAGE_SIZE
    );

    res.status(200).json({
      data: {
        status: "success",
        userFrige: userFrige.items,
        totalPageNum: Math.ceil(totalItems / PAGE_SIZE),
      },
    });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

frigeController.deleteIngredient = async (req, res) => {
  try {
    const { userId } = req;
    const { id } = req.params;
    const userFrige = await Frige.findOne({ userId });
    
    if (!userFrige) throw new Error("냉장고가 존재하지 않습니다.");

    userFrige.items = userFrige.items.filter(
      (item) => item._id.toString() !== id.toString()
    );
    await userFrige.save();

    res.status(200).json({ status: "success", userFrige: userFrige.items });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

module.exports = frigeController;
