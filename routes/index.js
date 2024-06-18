const express = require("express");
const authApi = require("./auth.api");
const router = express.Router();

router.use("/auth", authApi);

module.exports = router;
