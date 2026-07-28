import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import sendEmail from "../utils/sendEmail.js";


export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } =
      req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    if (user.isBlocked) {
  return res.status(403).json({
    success: false,
    message: "Your account is blocked",
  });
}

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = generateToken(
      user._id
    );

    res.status(200).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCurrentUser = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};


export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    user.resetOtp = otp;

    user.resetOtpExpire = Date.now() + 10 * 60 * 1000;

    await user.save();

    await sendEmail(
      user.email,
      "Password Reset OTP",
      `Your OTP is ${otp}. It expires in 10 minutes.`
    );

    res.json({
      success: true,
      message: "OTP sent to email",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const resetPassword = async (req, res) => {
  try {
    const {
      email,
      token,
      password,
    } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (
      user.resetOtp !== token ||
      user.resetOtpExpire < Date.now()
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    user.resetOtp = undefined;
    user.resetOtpExpire = undefined;

    await user.save();

    res.json({
      success: true,
      message: "Password updated successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};