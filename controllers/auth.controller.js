const User = require("../models/User");
const Recipe = require("../models/Recipe");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const axios = require('axios');
const RecipeReview = require("../models/RecipeReview");
const IngredientReview = require("../models/IngredientReview");
require("dotenv").config();
const authController = {};

authController.loginWithId = async (req, res) => {
  try {
    const { id, password } = req.body;
    let user = await User.findOne({ id }, "-createdAt -updatedAt -__v");
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = await user.generateToken();
        return res.status(200).json({ status: "success", user, token });
      }
    }
    throw new Error("아이디 혹은 비밀번호를 확인해주세요");
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

authController.authenticate = async (req, res, next) => {
  try {
    const tokenString = req.headers.authorization;
    if (!tokenString) throw new Error("Token not found");
    const token = tokenString.replace("Bearer ", "");
    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, payload) => {
      if (error) throw new Error("invalid token");
      req.userId = payload._id;
    });
    next();
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

authController.checkAdminPermission = async (req, res, next) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);
    if (user.level !== "admin") throw new Error("no permission");
    next();
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};
authController.loginWithGoogle = async (req, res) => {
  try {
    const { token } = req.body;
    const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { email, name } = ticket.getPayload();

    let user = await User.findOne({ email });
    if (!user) {
      const randomPassword = "" + Math.floor(Math.random() * 1000000);
      const salt = await bcrypt.genSalt(10);
      const newPassword = await bcrypt.hash(randomPassword, salt);
      user = new User({
        name,
        email,
        password: newPassword,
        id: email,
      });
      await user.save();
    }

    const sessionToken = await user.generateToken();
    res.status(200).json({ status: "success", user, token: sessionToken });
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};

authController.loginWithKakao = async (req, res) => {
  const { token } = req.body;
  try {
    const kakaoResponse = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const kakaoProfile = kakaoResponse.data;
    const { kakao_account, properties } = kakaoProfile;
    const email = kakao_account.email;
    const name = properties.nickname;

    let user = await User.findOne({ email });
    if (!user) {
      const randomPassword = "" + Math.floor(Math.random() * 1000000);
      const salt = await bcrypt.genSalt(10);
      const newPassword = await bcrypt.hash(randomPassword, salt);
      user = new User({
        name,
        email,
        password: newPassword,
        id: email,
      });
      await user.save();
    }

    const sessionToken = await user.generateToken();
    res.status(200).json({ status: 'success', user, token: sessionToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '카카오 로그인에 실패하였습니다.' });
  }
};

authController.checkRecipeUpdatePermission = async (req, res, next) => {
  try {
    const recipeId = req.params.id;
    const recipe = await Recipe.findById(recipeId);
    const { userId } = req;
    const user = await User.findById(userId);

    if (!user._id.equals(recipe.userId) && user.level !== "admin")
      throw Error("no recipe update permission");
    next();
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};

authController.checkUserUpdatePermission = async (req, res, next) => {
  try {
    const { userId } = req; 
    const user = await User.findById(userId);
    const userIdFromParams = req.params.id;
    if (!(userId === userIdFromParams) && user.level !== "admin")
      throw Error("no user update permission");
    next();
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};

authController.checkRecipeReviewUpdatePermission = async (req, res, next) => {
  try {
    const { userId } = req;
    const user = await User.findOne({ _id: userId, isDeleted: false });
    const reviewId = req.params.id;
    const review = await RecipeReview.findById(reviewId);
    if (
      !(userId.toString() === review.userId.toString()) &&
      user.level !== "admin"
    )
      throw Error("no review update permission");
    next();
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};

authController.checkIngredientReviewUpdatePermission = async (
  req,
  res,
  next
) => {
  try {
    const { userId } = req;
    const user = await User.findOne({ _id: userId, isDeleted: false });
    const reviewId = req.params.id;
    const review = await IngredientReview.findById(reviewId);
    if (
      !(userId.toString() === review.userId.toString()) &&
      user.level !== "admin"
    )
      throw Error("no review update permission");
    next();
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};
module.exports = authController;
