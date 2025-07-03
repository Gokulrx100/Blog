const { User } = require("../models/schema");
const passwordHash = require("../utils/passwordHash");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secret = "123random";

const signup = async (req, res) => {
  try {
    let { name, username, password } = req.body;
    let userExists = await User.findOne({ username: username });
    if (userExists) {
      return res.status(401).json({ message: "User already Exists" });
    }
    let hashedPassword = await passwordHash(password);
    let user = new User({
      name: name,
      username: username,
      password: hashedPassword,
    });
    await user.save();
    res.json({ message: "signup successful" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const signin = async (req, res) => {
  try {
    let { username, password } = req.body;
    let user = await User.findOne({ username: username });
    if (!user) {
      return res.status(401).json({ message: "invalid username" });
    }
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "invalid password" });
    }
    let token = jwt.sign({ username }, secret);
    res.json({ message: "signin successful", token: token });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  signup,
  signin,
};
