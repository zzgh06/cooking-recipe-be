const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const nodemailer = require('nodemailer');
require('dotenv').config();
// const FRONTEND_URL = 'https://whats-is-your-fridge.netlify.app';
const FRONTEND_URL = 'http://localhost:3000';
const passwordController = {};

// 비밀번호 재발급 요청
passwordController.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('해당 이메일로 가입된 사용자가 없습니다.');
    }

    console.log("user", user)

    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 36000000; // 1시간 유효
    await user.save();

    // nodemailer 로 이메일 보내기
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      to: user.email,
      from: 'passwordreset@demo.com',
      subject: '비밀번호 재설정 요청',
      text: `다음 링크를 클릭하여 비밀번호를 재설정하세요:\n\n
        ${FRONTEND_URL}/reset-password/${token}\n\n
        만약 본인이 요청한 것이 아니라면 이 이메일을 무시하세요.`,
    };

    await transporter.sendMail(mailOptions);
    res
      .status(200)
      .json({ status: 'success', message: '재설정 이메일이 발송되었습니다.' });
  } catch (error) {
    res.status(400).json({ status: 'error', error: error.message });
  }
};



// 비밀번호 재설정
passwordController.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    console.log("password", password)
    if (!user) {
      return res.status(400).json({
        status: 'error',
        error: '토큰이 유효하지 않거나 만료되었습니다.',
      });
    }

    const salt = await bcrypt.genSaltSync(10);
    user.password = await bcrypt.hash(password, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    console.log('Saved user with token:', user.resetPasswordToken, user.resetPasswordExpires);

    res.status(200).json({
      status: 'success',
      message: '비밀번호가 성공적으로 재설정되었습니다.',
    });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
};

// 비밀번호 재설정 임시 토큰 확인
passwordController.checkResetToken = async (req, res, next) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
      isDeleted: false,
    });

    console.log('Found user:', user);

    if (!user) {
      return res.status(400).json({
        status: 'error',
        error: '토큰이 유효하지 않거나 만료되었습니다.',
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
};

// 현재 비밀번호 확인
passwordController.verifyCurrentPassword = async (req, res) => {
  try {
    const { userId } = req;
    const { currentPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ status: 'error', error: '사용자를 찾을 수 없습니다.' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ status: 'error', error: '현재 비밀번호가 올바르지 않습니다.' });
    }

    res.status(200).json({
      status: 'success',
      message: '현재 비밀번호가 확인되었습니다.',
      isAuthenticated: true,
    });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
};

// 비밀번호 변경
passwordController.changePassword = async (req, res) => {
  try {
    const { userId } = req;
    const { newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ status: 'error', error: '사용자를 찾을 수 없습니다.' });
    }
    // 새로운 비밀번호 설정
    const salt = await bcrypt.genSaltSync(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();
    res.status(200).json({
      status: 'success',
      message: '비밀번호가 성공적으로 변경되었습니다.',
    });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
};

module.exports = passwordController;