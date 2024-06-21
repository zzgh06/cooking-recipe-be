const Ingredient = require("../models/Ingredient");

const ingredientController = {};

//삭제되지 않은 모든 재료를 리턴
const PAGE_SIZE = 5;
ingredientController.getIngredients = async (req, res) => {
    try{
        const {page=1, name} = req.query;
        const query = {isDeleted: false};

        if (name) {
            const regex = new RegExp(name, 'i');
            query.name = regex;
        }

        const totalItems = await Ingredient.find(query).count();

        const ingredients = await Ingredient.find(query)
            .skip((page - 1) * PAGE_SIZE)
            .limit(PAGE_SIZE);

        res.status(200).json({
            status:"success",
            data:{
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
        if(!ingredient) throw new Error("해당 재료를 찾을 수 없습니다.");

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

//카테고리 종류 리턴, 쿼리 있을 경우 카테고리에 해당하는 재료 리턴
ingredientController.getCategory = async (req, res) => {
  try{
    const {page=1, category} = req.query;
    const query = {isDeleted: false, category: category};
    const categoryTypes = ["채소", "과일", "육류", "해산물", "유제품 및 달걀", "곡류 및 빵", "조미료 및 소스", "냉장 및 냉동식품", "기타"];

    if(!category) return res.status(200).json({ status: "success", categoryTypes }); //카테고리 없을 경우 카테고리 종류 리턴

    const totalItems = await Ingredient.find(query).count();

    const ingredients = await Ingredient.find(query)
        .skip((page - 1) * PAGE_SIZE)
        .limit(PAGE_SIZE);

    res.status(200).json({
        status:"success",
        data:{
            ingredients,
            totalPageNum: Math.ceil(totalItems / PAGE_SIZE)
        }
    });
  }catch(error){
    res.status(400).json({ status: "fail", error: error.message });
  }
}
module.exports = ingredientController;