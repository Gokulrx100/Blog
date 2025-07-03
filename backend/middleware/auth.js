const jwt=require("jsonwebtoken");
const secret = "123random";
const {User}=require("../models/schema")

async function Auth(req, res, next) {
  try {
    let { token } = req.headers;
    if (!token) {
      return res.status(401).json("token not found");
    }
    let payload = jwt.verify(token, secret);
    let user = await User.findOne({ username: payload.username });
    if (!user) {
      return res.status(401).json({ message: "Authentication error" });
    }
    req.username = payload.username;
    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports=Auth;