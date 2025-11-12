import jwt from "jsonwebtoken";
import Joi from "joi";
import User from "../models/User.js";

const signToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES || "7d"
  });

export const register = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid("buyer", "seller")
  });
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const exists = await User.findOne({ email: value.email });
  if (exists) return res.status(409).json({ message: "Email already in use" });

  const user = await User.create(value);
  const token = signToken(user);
  res
    .cookie("token", token, { httpOnly: true, sameSite: "lax", secure: false })
    .status(201)
    .json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password)))
    return res.status(401).json({ message: "Invalid credentials" });

  const token = signToken(user);
  res
    .cookie("token", token, { httpOnly: true, sameSite: "lax", secure: false })
    .json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } });
};

export const me = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json({ user });
};

export const logout = (req, res) => {
  res.clearCookie("token").json({ message: "Logged out" });
};
