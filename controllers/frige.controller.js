const User = require("../models/User");
const Frige = require("../models/Frige");
const frigeController = {};

//냉장고에 재료 추가
frigeController.addIngredient = async(req, res) =>{
    try{
        const {userId} = req;
        let userFrige = await Frige.findOne({userId});
        //냉장고 없으면 만들기
        if(!userFrige){
            userFrige = new Frige({ userId, items: [] });
        }

        const addIngredients = req.body.items; //items:[ {ingfedientId:"id"}, {ingfedientId:"id"}]
        addIngredients.forEach((addIngredient)=>{
            //냉장고에 재료가 이미 있는지 확인
            const alreadyExists = userFrige.items.find(item => item.ingredientId.toString() === addIngredient.ingredientId.toString());
            if(alreadyExists) throw new Error("냉장고에 재료가 이미 있습니다.");

            userFrige.items.push({ ingredientId: addIngredient.ingredientId});
        });
        await userFrige.save();

        res.status(200).json({status: "success", userFrige});
    }catch(error){
        res.status(400).json({status: "fail", error: error.message});
    }
};

//유저의 냉장고 반환
frigeController.getUserFrige = async(req, res) =>{
    try{
        const {userId} = req;
        const userFrige = await Frige.findOne({userId}).populate('items.ingredientId');
        if(!userFrige) throw new Error("냉장고가 존재하지 않습니다.");

        res.status(200).json({status: "success", userFrige});
    }catch(error){
        res.status(400).json({status: "fail", error: error.message});
    }
};

//냉장고에 있는 재료 삭제
frigeController.deleteIngredient = async(req, res) =>{
    try{
        const {userId} = req;
        const userFrige = await Frige.findOne({userId});
        if(!userFrige) throw new Error("냉장고가 존재하지 않습니다.");

        //유저냉장고.item = 유저냉장고.item - 삭제할 재료
        const deleteIngredients = req.body.items;
        deleteIngredients.forEach(deleteIngredient => {
            userFrige.items = userFrige.items.filter(item => {
                return item.ingredientId.toString() !== deleteIngredient.ingredientId.toString();
            });
        });
        await userFrige.save();

        res.status(200).json({status: "success", userFrige});
    }catch(error){
        res.status(400).json({status: "fail", error: error.message});
    }
};


module.exports = frigeController;