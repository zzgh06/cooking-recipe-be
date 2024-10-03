const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const passwordController = require('../controllers/password.controller');

router.post('/forgot-password', passwordController.forgotPassword);

router.post(
  '/reset-password/:token',
  passwordController.checkResetToken,
  passwordController.resetPassword,
);

router.post(
  '/verify-password',
  authController.authenticate,
  passwordController.verifyCurrentPassword,
);

router.put(
  '/change-password',
  authController.authenticate,
  passwordController.changePassword,
);

module.exports = router;