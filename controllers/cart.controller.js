const Cart = require("../models/Cart");
const User = require("../models/User");

const cartController = {};

cartController.getCart = async (req, res) => {
  try {
    const { userId } = req;
    const cart = await Cart.findOne({ userId }).populate({
      path: "items",
      populate: {
        path: "ingredientId",
        model: "Ingredient",
      },
    });

    console.log("Cart items from DB:", cart);

    res.status(200).json({ status: "success", data: cart.items });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

cartController.addItemToCart = async (req, res) => {
  try {
    const { userId } = req;
    const { ingredientId, qty } = req.body;

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
      await cart.save();
    }

    const existItem = cart.items.find((item) => {
      return item.ingredientId.equals(ingredientId);
    });
    if (existItem) throw new Error("상품이 이미 카트에 담겨 있습니다!");

    cart.items = [...cart.items, { ingredientId, qty }];
    await cart.save();

    await cart.populate("items.ingredientId");
    const lastAddedItem = cart.items[cart.items.length - 1];

    res.status(200).json({ status: "success", data: lastAddedItem });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(400).json({ status: "fail", error: error.message });
  }
};

cartController.updateCartItem = async (req, res) => {
  try {
    const { userId } = req;
    const { id } = req.params;
    const { qty } = req.body;

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.ingredientId",
    });
    if (!cart) throw new Error("카트가 존재하지 않습니다.");

    const index = cart.items.findIndex((item) => item.ingredientId.equals(id));
    if (index === -1) throw new Error("카트에서 상품을 찾을 수 없습니다.");

    cart.items[index].qty = qty;
    await cart.save();

    res.status(200).json({ status: "success", data: cart.items[index] });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

cartController.deleteCartItem = async (req, res) => {
  try {
    const { userId } = req;
    const { id } = req.params;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      throw new Error("카트를 찾을 수 없습니다.");
    }

    const itemIndex = cart.items.findIndex((item) => item.ingredientId.equals(id));
    if (itemIndex === -1) {
      throw new Error("카트에서 상품을 찾을 수 없습니다.");
    }

    cart.items.splice(itemIndex, 1);
    await cart.save();

    await cart.populate("items.ingredientId");

    console.log("deleteCartItem - updated cart items:", cart.items);

    res.status(200).json({ status: "success", data: cart.items });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    res.status(400).json({ status: "fail", error: error.message });
  }
};

module.exports = cartController;
