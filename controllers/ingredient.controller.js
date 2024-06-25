const Ingredient = require("../models/Ingredient");

const ingredientController = {};

//삭제되지 않은 모든 재료를 리턴
const PAGE_SIZE = 5;
ingredientController.getIngredients = async (req, res) => {
    //"채소", "과일", "육류", "해산물", "유제품 및 달걀", "곡류 및 빵", "조미료 및 소스", "냉장 및 냉동식품", "기타"
    try{
        const {page=1, name, category} = req.query;
        const query = {isDeleted: false};

        if(name){            
            query.name = new RegExp(name, 'i');
        }

        if(category){
            query.category = new RegExp(category, 'i');
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
            discountPrice,
            category,
            stock,
            unit,
            status="active",
            isDeleted=false
        } = req.body;

        const ingredient = new Ingredient({name,description,image,price,discountPrice,category,stock,unit,status,isDeleted});
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
            discountPrice,
            category,
            stock,
            unit,
            status,
            isDeleted
        } = req.body;

        const ingredient = await Ingredient.findByIdAndUpdate(
            ingredientId,
            {name,description,image,price,discountPrice,category,stock,unit,status,isDeleted},
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

//재고 하나 체크
ingredientController.checkStock = async(item) =>{
    const ingredient = await Ingredient.findById(item.ingredientId);
    if(ingredient.stock < item.qty){
        return {isVerify:false, message:ingredient.name}
    }

    ingredient.stock -= item.qty;
    await ingredient.save();

    return {isVerify:true}
}

//재고 전부 체크
ingredientController.checkItemListStock = async (items) =>{
    const insufficientStockItems = [];
    await Promise.all(
        items.map(async(item)=>{
            const stockCheck = await ingredientController.checkStock(item);
            if(!stockCheck.isVerify){
                insufficientStockItems.push({items, message:stockCheck.message});
            }
            return stockCheck;
        })
    );
    
    return insufficientStockItems;
}

module.exports = ingredientController;