const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");

router.post("/", userController.createUser); 

router.get("/me", authController.authenticate, userController.getUser); 

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
