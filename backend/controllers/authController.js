const { User } = require("../models/schema");
const passwordHash = require("../utils/passwordHash");
const { signUpSchema } = require("../models/types");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secret = process.env.JWT_SECRET;

const signup = async (req, res) => {
  try {
    signUpSchema.parse(req.body);
    let { name, gmail, username, password } = req.body;
    const profilePic = req.file?.path || "";

    let userExists = await User.findOne({ username: username });
    if (userExists) {
      return res.status(401).json({ message: "User already Exists" });
    }

    let gmailExists = await User.findOne({ gmail: gmail });
    if (gmailExists) {
      return res.status(401).json({ message: "Gmail already registered" });
    }

    let hashedPassword = await passwordHash(password);
    let user = new User({
      name: name,
      gmail: gmail,
      username: username,
      password: hashedPassword,
      profilePic: profilePic,
    });
    await user.save();
    res.json({ message: "signup successful", user });

  } catch (err) {
    if (err.errors && err.errors.length > 0) {
      return res.status(400).json({ message: err.errors[0].message });
    }
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