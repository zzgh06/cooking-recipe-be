const User = require("../models/User");
const bycrypt = require("bcryptjs");

const userController = {};

//새로운 유저 생성 (회원가입)
userController.createUser = async (req, res) => {
  try {
    let { email, password, id, level, shipTo, contact, name } = req.body;

    //유저 테이블에 이메일나 아이디가 존재할 경우
    const userWithEmail = await User.findOne({ email });
    if (userWithEmail) throw new Error("이미 등록된 이메일입니다.");

    const userWithId = await User.findOne({ id });
    if (userWithId) throw new Error("중복된 아이디입니다.");

    //비밀번호 암호화
    const salt = await bycrypt.genSaltSync(10);
    password = await bycrypt.hash(password, salt);

    //유저 생성
    const newUser = new User({
      email,
      password,
      id,
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
    res.status(400).json({ status: "error", message: error.message });
  }
};
//모든 user 정보 리턴
userController.getUsers = async (res, req) => {
  try {
    const { page, name } = req.query;
    const cond = name
      ? { name: { $regex: name, $options: "i" }, isDeleted: false }
      : { isDeleted: false };
    let query = User.find(cond);
    let response = { status: "success" };
    if (page) {
      query.skip((page - 1) * PAGE_SIZE).limit(PAGE_SIZE);
      const totalItemNum = await User.find(cond).count();
      const totalPageNum = Math.ceil(totalItemNum / PAGE_SIZE);
      response.totalPageNum = totalPageNum;
    }
    const userList = await query.exec();
    response.data = userList;
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};
userController.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { email, password, id, name, shipTo, contact } = req.body;
    const currentUser = await User.findById(userId);
    if (!currentUser) throw new Error("User not found");
    const updatedShipTo = shipTo !== undefined ? shipTo : currentUser.shipTo;
    const user = await User.findByIdAndUpdate(
      { _id: userId },
      { email, password, id, name, shipTo: updatedShipTo, contact },
      { new: true }
    );
    if (!user) throw new Error("recipe doesn't exist");
    res.status(200).json({ status: "success", data: user });
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
