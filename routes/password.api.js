const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const passwordController = require('../controllers/password.controller');

// 비밀번호 재발급 요청
router.post('/forgot-password', passwordController.forgotPassword);

// 비밀번호 재설정 토큰 확인 및 비밀번호 재설정
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