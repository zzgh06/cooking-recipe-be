const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userSchema = Schema(
  {
    // user info
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    id: { type: String, required: true },
    level: { type: String, default: "customer" }, //2types: customer, admin
    name: { type: String },
    shipTo: { type: Object },
    contact: { type: Object },
    isDeleted: { type: Boolean, default: false },

    // 비밀번호 재설정 토큰
    resetPasswordToken: { type: String, default: undefined },
    // 비밀번호 재설정 토큰 만료 시간
    resetPasswordExpires: { type: Date, default: undefined },

    // profile
    image: { type: String, default: '' },
  },
  { timestamps: true }
);
userSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.password;
  delete obj.updatedAt;
  delete obj.createAt;
  delete obj.__v;
  return obj;
};
userSchema.methods.generateToken = async function () {
  const token = await jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  return token;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
