const Joi = require("joi");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const generateToken = (getId) => {
  return jwt.sign({ getId }, "DEFAULT_SECRET_KEY", {
    expiresIn: 3 * 24 * 60 * 60,
  });
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const { error } = registerSchema.validate({ name, email, password });

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  try {
    const isUserEmailAlreadyExists = await User.findOne({ email });

    if (isUserEmailAlreadyExists) {
      return res.status(400).json({
        success: false,
        message: "Email already exists! Please try with a different email.",
      });
    } else {
      const hashPassword = await bcrypt.hash(password, 12);
      const newlyCreatedUser = await User.create({
        name,
        email,
        password: hashPassword,
      });

      const token = generateToken(newlyCreatedUser?._id);
      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
      });

      return res.status(201).json({
        success: true,
        message: "User registration successful",
        userData: {
          name: newlyCreatedUser.name,
          email: newlyCreatedUser.email,
          _id: newlyCreatedUser._id,
        },
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again.",
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const { error } = loginSchema.validate({ email, password });

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  try {
    const getUser = await User.findOne({ email });

    if (!getUser) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email",
      });
    }

    const checkAuth = await bcrypt.compare(password, getUser.password);

    if (!checkAuth) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }

    const token = generateToken(getUser?._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    return res.status(200).json({
      success: true,
      message: "User logged in",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again.",
    });
  }
};

const logout = async (req, res) => {
  res.cookie("token", "", {
    withCredentials: true,
    httpOnly: false,
  });

  return res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};

module.exports = { registerUser, loginUser, logout };
