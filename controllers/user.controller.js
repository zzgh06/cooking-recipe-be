const User = require("../models/User");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const userController = {};

//새로운 유저 생성 (회원가입)
userController.createUser = async (req, res) => {
  try {
    let { email, password, id, level, image, shipTo, contact, name } = req.body;

    // 이메일 중복검사
    const userWithEmail = await User.findOne({ email });
    if (userWithEmail) throw new Error("이미 등록된 이메일입니다.");

    // 중복 아이디 검사
    const userWithId = await User.findOne({ id });
    if (userWithId) throw new Error("중복된 아이디입니다.");

    //비밀번호 암호화
    const salt = await bcrypt.genSaltSync(10);
    password = await bcrypt.hash(password, salt);

    //유저 생성
    const newUser = new User({
      email,
      password,
      id,
      image,
      level: level ? level : "customer",
      shipTo,
      contact,
      name,
    });
    await newUser.save();

    return res.status(200).json({ status: "success" });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

userController.getUser = async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findOne({ _id: userId, isDeleted: false });
    if (user) {
      return res.status(200).json({ status: "success", user });
    }
    throw new Error("Invalid token");
  } catch (error) {
    res.status(400).json({ status: "error", error: error.message });
  }
};

const PAGE_SIZE = 10;

userController.getUsers = async (req, res) => {
  try {
    const { page, name } = req.query; 
    const cond = { isDeleted: false };

    if (name) {
      cond.name = { $regex: name, $options: "i" };  
    }

    let query = User.find(cond);
    let response = { status: "success" };

    if (!page) {
      const userList = await query.exec();
      response.data = userList;
      response.totalPageNum = 1; 
    } else {
      query.skip((page - 1) * PAGE_SIZE).limit(PAGE_SIZE);
      const totalItemNum = await User.countDocuments(cond);  
      const totalPageNum = Math.ceil(totalItemNum / PAGE_SIZE);
      response.totalPageNum = totalPageNum;

      const userList = await query.exec();
      response.data = userList;
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

userController.updateUser = async (req, res) => {
  try {
    const { userId } = req;  
    const { email, name, shipTo, contact, image } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      { email, name, shipTo, contact, image },
      { new: true }
    );

    if (!updatedUser) throw new Error("User not found");
    res.status(200).json({ status: "success", data: updatedUser });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

userController.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndUpdate(
      { _id: userId },
      { isDeleted: true }
    );
    if (!user) throw new Error("User not found");
    res.status(200).json({ state: "success" });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};
module.exports = userController;
