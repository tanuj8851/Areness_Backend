const bcrypt = require("bcrypt");
const User = require("../models/User");
const { generateToken } = require("../utils/generateToken");

exports.signup = async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    user = new User({ firstName, lastName, username, email, password });
    await user.save();

    const token = generateToken(user._id);
    const activeUser={
      firstName:user.firstName,
      lastName:user.lastName,
      username:user.username,
      email:user.email
    }
    res.status(201).json({ token, message: "SignUp SuccessFully" ,activeUser});
  } catch (err) {
    res.status(500).send("Server error");
    console.log(err);
    
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = generateToken(user._id);
    const activeUser={
      firstName:user.firstName,
      lastName:user.lastName,
      username:user.username,
      email:user.email
    }
    res.json({ token, message: "Login Successfully",activeUser });
  } catch (err) {
    res.status(500).send("Server error");
  }
};

exports.logout = (req, res) => {
  res.json({ msg: "Logged out successfully" });
};
