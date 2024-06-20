const express = require("express");
const router = express.Router();

const authApi = require("./auth.api");
const userApi = require("./user.api");
const frigeApi = require("./frige.api");

router.use("/auth", authApi);
router.use("/user", userApi);
router.use("/frige", frigeApi);

module.exports = router;
