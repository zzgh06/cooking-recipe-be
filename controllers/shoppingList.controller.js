const ShoppingList = require("../models/ShoppingList");

const shoppingListController = {};

shoppingListController.addItems = async (req, res) => {
  try {
    const { userId } = req;
    const { items } = req.body;

    let shoppingList = await ShoppingList.findOne({ userId });

    if (!shoppingList) {
      shoppingList = new ShoppingList({
        userId,
        items: [],
      });
    }

    const existingItemIds = shoppingList.items.map((item) => item._id.toString());
    const itemsToAdd = items
      .filter((item) => !existingItemIds.includes(item._id.toString()))
      .map((item) => ({
        ...item,
        completed: false,
      }));

    if (itemsToAdd.length > 0) {
      shoppingList.items.push(...itemsToAdd);
      await shoppingList.save();
    }

    res.status(200).json({ status: "success", data: shoppingList.items });
  } catch (error) {
    res.status(400).json({ status: "error", error: error.message });
  }
};


shoppingListController.getShoppingList = async (req, res) => {
  try {
    const { userId } = req;
    const shoppingList = await ShoppingList.findOne({ userId }).populate(
      "items"
    );

    if (!shoppingList) {
      return res.status(404).json({ message: "Shopping list not found" });
    }

    res.status(200).json({
      status: "success",
      data: shoppingList.items,
    });
  } catch (error) {
    res.status(400).json({ status: "error", error: error.message });
  }
};

shoppingListController.removeItems = async (req, res) => {
  try {
    const { userId } = req;
    const { itemId } = req.body;

    const shoppingList = await ShoppingList.findOne({ userId });

    if (!shoppingList) {
      return res.status(400).json({ status: "error", message: "Shopping list not found" });
    }

    shoppingList.items = shoppingList.items.filter(
      (item) => item._id.toString() !== itemId
    );

    await shoppingList.save();

    res.status(200).json({ status: "success", data: shoppingList.items });
  } catch (error) {
    res.status(400).json({ status: "error", error: error.message });
  }
};


shoppingListController.moveToCompletedList = async (req, res) => {
  try {
    const { userId } = req;
    const { item } = req.body;

    const shoppingList = await ShoppingList.findOne({ userId });

    if (!shoppingList) {
      return res
        .status(400)
        .json({ status: "error", message: "Shopping list not found" });
    }

    shoppingList.items = shoppingList.items.filter(
      (i) => i._id.toString() !== item._id.toString()
    );

    shoppingList.items.push({
      _id: item._id,
      name: item.name,
      completed: true,
    });

    await shoppingList.save();

    res.status(200).json({ status: "success", data: shoppingList.items });
  } catch (error) {
    res.status(400).json({ status: "error", error: error.message });
  }
};

module.exports = shoppingListController;
