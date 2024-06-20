const Ingredient = require("../models/Ingredient");

const ingredientController = {};

//삭제되지 않은 모든 재료를 리턴
const PAGE_SIZE = 5;
ingredientController.getIngredients = async (req, res) => {
    try{
        const {page=1, name} = req.query;
        const query = {isDeleted: false};
        let ingredients = await Ingredient.find(query)
            .skip((page-1) * PAGE_SIZE)
            .limit(PAGE_SIZE);

        const totalItems = await Ingredient.find(query).count();

        if(name){
            const regex = new RegExp(name, 'i');
            ingredients = ingredients.filter((ingredient) => regex.test(ingredient.name)); 
        };

        res.status(200).json({
            data:{
                status:"success", 
                ingredients,
                totalPageNum: Math.ceil(totalItems / PAGE_SIZE)
            }
        });
    }catch(error){
        res.status(400).json({status:"fail", error:error.message});
    }
} 

//재료 하나 리턴
ingredientController.getIngredient = async (req, res) =>{
    try{
        const ingredientId = req.params.id;
        const ingredient = await Ingredient.findById(ingredientId);

        res.status(200).json({status:"success", ingredient});
    }catch(error){
        res.status(400).json({status:"fail", error:error.message});
    }
}

//재료 생성
ingredientController.createIngredient = async (req, res) => {
    try{
        const {
            name,
            description,
            image,
            price,
            category,
            stock,
            status="active",
            isDeleted=false
        } = req.body;

        const ingredient = new Ingredient({name,description,image,price,category,stock,status,isDeleted});
        await ingredient.save();
        res.status(200).json({status:"success", ingredient});
    }catch(error){
        res.status(400).json({status:"fail", error:error.message});
    }
}

//재료 수정
ingredientController.updateIngredient = async (req, res) => {
    try{
        const ingredientId = req.params.id;
        const {
            name,
            description,
            image,
            price,
            category,
            stock,
            status,
            isDeleted
        } = req.body;

        const ingredient = await Ingredient.findByIdAndUpdate(
            ingredientId,
            {name,description,image,price,category,stock,status,isDeleted},
            {new: true}
        );
        res.status(200).json({status:"success", ingredient});
    }catch(error){
        res.status(400).json({status:"fail", error:error.message});
    }
}

//재료 삭제
ingredientController.deleteIngredient = async (req, res) => {
    try{
        const ingredientId = req.params.id;
        const ingredient = await Ingredient.findByIdAndUpdate(
            ingredientId,
            {isDeleted: true},
            {new: true}
        );
        res.status(200).json({status:"success", ingredient});
    }catch(error){
        res.status(400).json({status:"fail", error:error.message});
    }
}

module.exports = ingredientController;