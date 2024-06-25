const Order = require("../models/Order");
const ingredientController = require("./ingredient.controller");
const {randomStringGenerator} = require("../utils/radomStringGenerator");
const orderController = {};
const PAGE_SIZE = 5;

orderController.createOrder = async(req, res) =>{
    try{
        const {userId} = req;
        const {contactInfo, totalPrice, status, items} = req.body;

        const insufficientStockItems = await ingredientController.checkItemListStock(items);

        if(insufficientStockItems.length>0){
            let ingredient = "";
            insufficientStockItems.forEach((item, index)=>{
                ingredient += item.message;
                if(index !== insufficientStockItems.length-1) ingredient += ", ";
            });
            throw new Error(ingredient + "의 재고가 부족합니다.");
        }

        const newOrder = new Order({
            userId,
            contactInfo,
            totalPrice,
            status,
            items,
            orderNum: randomStringGenerator()
        });
        await newOrder.save();

        res.status(200).json({status:"success", orderNum:newOrder.orderNum});
    }catch(error){
        res.status(400).json({status:"fail", error:error.message});
    }
}

orderController.getOrder = async(req, res) =>{
    try{
        const {userId} = req;
        const {page=1, orderNum} = req.query;
        let query = {userId};

        if(orderNum){
            query.orderNum = new RegExp(orderNum, 'i');
        }

        const orderList = await Order.find(query).populate({
            path: "items.ingredientId"
        })
        .skip((page - 1) * PAGE_SIZE)
        .limit(PAGE_SIZE);

    const totalItemNum = await Order.find(query).count();
    const totalPageNum = Math.ceil(totalItemNum / PAGE_SIZE);

    res.status(200).json({status: "success", data: orderList, totalPageNum});
    }catch(error){
        res.status(400).json({status:"fail", error:error.message});
    }
}

orderController.getOrderList = async(req, res) =>{
    try{
        const {page=1, orderNum} = req.query;
        let query = {};

        if(orderNum){
            query.orderNum = new RegExp(orderNum, 'i');
        }

        const orderList = await Order.find(query)
            .populate("userId")
            .populate({
                path: "items.ingredientId",
            })
            .skip((page - 1) * PAGE_SIZE)
            .limit(PAGE_SIZE);
        const totalItemNum = await Order.find(query).count();
        const totalPageNum = Math.ceil(totalItemNum / PAGE_SIZE);

        res.status(200).json({status: "success", data: orderList, totalPageNum});    
    }catch(error){
        res.status(400).json({status:"fail", error:error.message});
    }
}

orderController.updateOrder = async(req, res) =>{
    try{
        const {id} = req.params;
        const {status} = req.body;
        const order = await Order.findByIdAndUpdate(
            id,
            {status: status},
            {new: true}
        );

        res.status(200).json({status:"success", data:order});
    }catch(error){
        res.status(400).json({status:"fail", error:error.message});
    }
}

module.exports = orderController;