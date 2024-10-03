const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
router.post("/login", authController.loginWithId);
router.post("/google", authController.loginWithGoogle);
router.post('/kakao', authController.loginWithKakao);
module.exports = router;