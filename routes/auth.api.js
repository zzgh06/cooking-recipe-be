const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
router.post("/login", authController.loginWithId);
router.post("/google", authController.loginWithGoogle);
module.exports = router;
