const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");

//회원가입
router.post("/", userController.createUser); 

//토큰이 valid한 토큰인지, 이 토큰가지고 유저를 차장서 리턴
router.get("/me", authController.authenticate, userController.getUser); 

//admin인지 확인 후 맞으면 모든 user 정보 리턴
router.get(
  "/admin",
  authController.authenticate,
  authController.checkAdminPermission,
  userController.getUsers
);


router.put(
  "/me",
  authController.authenticate,
  userController.updateUser
);

router.delete(
  "/:id",
  authController.authenticate,
  authController.checkUserUpdatePermission,
  userController.deleteUser
);
module.exports = router;
