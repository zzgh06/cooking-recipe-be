const express = require("express");
const ingredientController = require("../controllers/ingredient.controller");
const authController = require("../controllers/auth.controller");
const router = express.Router();

router.get("/:id", ingredientController.getIngredient);
router.get("/", ingredientController.getIngredients);

router.post("/", 
    authController.authenticate,
    authController.checkAdminPermission,
    ingredientController.createIngredient
);

router.put("/:id", 
    authController.authenticate,
    authController.checkAdminPermission,
    ingredientController.updateIngredient
);

router.delete("/:id", 
    authController.authenticate,
    authController.checkAdminPermission,
    ingredientController.deleteIngredient
);

module.exports = router;