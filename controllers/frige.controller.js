const User = require("../models/User");
const Frige = require("../models/Frige");
const frigeController = {};

//냉장고에 재료 추가
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

//유저의 냉장고 재료 반환
PAGE_SIZE = 12;
frigeController.getUserFrige = async (req, res) => {
  try {
    const { userId } = req;
    const { page = 1, name } = req.query;
    let query = {};
    let totalItems = 0;

    // 냉장고 조회
    let userFrige = await Frige.findOne({ userId }).populate(
      "items.ingredientId"
    );
    if (!userFrige) throw new Error("냉장고가 존재하지 않습니다.");

    // 총 재료 수
    totalItems = userFrige.items.length;

    // 이름으로 필터링된 경우 해당 필터링 적용
    if (name) {
      const regex = new RegExp(name, "i");
      userFrige.items = userFrige.items.filter((ingredient) =>
        regex.test(ingredient.ingredientId.name)
      );
      totalItems = userFrige.items.length;
    }

    // 페이징 처리
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

//냉장고에 있는 재료 삭제
frigeController.deleteIngredient = async (req, res) => {
  try {
    const { userId } = req;
    const { id } = req.params;
    const userFrige = await Frige.findOne({ userId });
    if (!userFrige) throw new Error("냉장고가 존재하지 않습니다.");

    //유저냉장고.item = 유저냉장고.item - 삭제할 재료
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
