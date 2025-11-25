const User = require("../models/User.Model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// User Registration
const registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const exitUser = await User.findOne({ email });
    if (exitUser) {
      return res.status(401).json({ message: "User Already Exits!" });
    }
    console.log("exit user", exitUser);
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    console.log({ newUser });
    res
      .status(201)
      .json({ message: "User Registered Successfully", newUser: newUser });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// User Login
const loginUser = async (req, res) => {
  try {
    const { password, email } = req.body;
    console.log("email", email);
    const user = await User.findOne({ email });
    console.log("user 1", user);
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    console.log("user 2", user);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password is not Matching" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    res.status(200).json({ message: "Login Successful", token });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { registerUser, loginUser };
