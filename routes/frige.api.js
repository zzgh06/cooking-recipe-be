const express = require("express");
const frigeController = require("../controllers/frige.controller");
const authController = require("../controllers/auth.controller");
const router = express.Router();

router.post("/", authController.authenticate, frigeController.addIngredient);
router.get("/", authController.authenticate, frigeController.getUserFrige);
router.delete("/", authController.authenticate, frigeController.deleteIngredient);

module.exports = router;