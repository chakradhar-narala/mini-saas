const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getModels } = require("../models");

exports.signup = async (req, res) => {
  const { User } = getModels();
  const { email, password } = req.body;

  const exists = await User.findOne({ where: { email } });
  if (exists) return res.status(400).json({ message: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashed });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  res.json({ token });
};

exports.login = async (req, res) => {
  const { User } = getModels();
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(400).json({ message: "Invalid email" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Wrong password" });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  res.json({ token });
};