import User from "./user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CustomError } from "../../utils/customError.js";

export const registerUser = async (req, res, next) => {
  try {
    const { email, password, name, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) throw new CustomError("Email already registered", 409);

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      role,
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) throw new CustomError("Invalid email or password", 401);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new CustomError("Invalid email or password", 401);

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ message: "Login Success!", token });
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    res.status(200).json({
      message: "User profile retrieved successfully",
      user: req.user,
    });
  } catch (err) {
    next(err);
  }
};
