const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");

router.post("/", userController.createUser); //회원가입
router.get("/me", authController.authenticate, userController.getUser); //토큰이 valid한 토큰인지, 이 토큰가지고 유저를 차장서 리턴
router.get("/admin", authController.authenticate, authController.checkAdminPermission, userController.getUsers); //admin인지 확인 후 맞으면 모든 user 정보 리턴

module.exports = router;
