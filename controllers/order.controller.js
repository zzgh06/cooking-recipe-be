const Order = require("../models/Order");
const ingredientController = require("./ingredient.controller");
const { randomStringGenerator } = require("../utils/randomStringGenerator");
const Ingredient = require("../models/Ingredient");
const orderController = {};
const PAGE_SIZE = 5;

orderController.createOrder = async (req, res) => {
  try {
    const { userId } = req;
    const { contactInfo, totalPrice, items } = req.body;
    const insufficientStockItems =
      await ingredientController.checkItemListStock(items);

    if (insufficientStockItems.length > 0) {
      let ingredient = "";
      insufficientStockItems.forEach((item, index) => {
        ingredient += item.message;
        if (index !== insufficientStockItems.length - 1) ingredient += ", ";
      });
      throw new Error(ingredient + "의 재고가 부족합니다.");
    }

    const newOrder = new Order({
      userId,
      contactInfo,
      totalPrice,
      items,
      orderNum: randomStringGenerator(),
    });

    for (const item of items) {
      const ingredient = await Ingredient.findById(item.ingredientId);
      ingredient.totalSales += item.qty;
      await ingredient.save();
    }

    await newOrder.save();

    res.status(200).json({ status: "success", orderNum: newOrder.orderNum });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

orderController.getOrder = async (req, res) => {
  try {
    const { userId } = req;
    const { page = 1, orderNum, startDate, endDate  } = req.query;
    let query = { userId };

    if (orderNum) {
      query.orderNum = new RegExp(orderNum, "i");
    }

    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const orderList = await Order.find(query)
      .populate({
        path: "items.ingredientId",
      })
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE);

    const totalItemNum = await Order.countDocuments(query);
    const totalPageNum = Math.ceil(totalItemNum / PAGE_SIZE);

    res.status(200).json({ status: "success", data: orderList, totalPageNum });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

orderController.getOrderList = async (req, res) => {
  try {
    const { page = 1, orderNum, startDate, endDate } = req.query;
    const condition = {};

    if (orderNum) {
      condition.orderNum = { $regex: orderNum, $options: "i" };
    }
    if (startDate && endDate) {
      condition.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const totalItemNum = await Order.countDocuments(condition);
    const totalPageNum = Math.ceil(totalItemNum / PAGE_SIZE);

    if (page < 1) {
      return res.status(400).json({ status: "fail", error: "Page must be greater than 0" });
    }

    if (totalPageNum > 0 && page > totalPageNum) {
      return res.status(200).json({ status: "success", data: [], totalPageNum });
    }

    const orderList = await Order.find(condition)
      .populate("userId")
      .populate({
        path: "items.ingredientId",
      })
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE);

    res.status(200).json({ status: "success", data: orderList, totalPageNum });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

orderController.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );

    res.status(200).json({ status: "success", data: order });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

module.exports = orderController;
