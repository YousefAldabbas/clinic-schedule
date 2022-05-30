const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// @route   POST api/users
// @desc    Register user
// @access  Public
const register = asyncHandler(async (req, res, next) => {
  let { name, email, password } = req.body;
  email = email.toLowerCase();
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all fields");
  }
  const userExist = await User.findOne({ email });
  if (userExist) {
    throw new Error("User already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({ name, email, password: hashedPassword });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: tokenGenerator(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not created");
  }
});

// @route   POST api/users/login
// @desc    login user
// @access  Public
const login = asyncHandler(async (req, res, next) => {
  let { email, password } = req.body;
  email = email.toLowerCase();
  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter all fields");
  }
  console.log(email, password)
  const user = await User.findOne({ email });
  const isMatch = await bcrypt.compare(password, user.password);
  if (user && isMatch) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: tokenGenerator(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

const tokenGenerator = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  return token;
};

module.exports = {
    register,
    login
}