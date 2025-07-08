import User from "../models/User.js";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs"; 

let otpStore = {}; //memory store 

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

// Send OTP
export const sendOtp = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = otp;

  await transporter.sendMail({
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}`,
  });

  res.status(200).json({ message: "OTP sent successfully" });
};

//  Verify OTP
export const verifyOtp = (req, res) => {
  const { email, otp } = req.body;
  if (otpStore[email] === otp) {
    return res.status(200).json({ message: "OTP verified" });
  }
  res.status(400).json({ message: "Invalid OTP" });
};

//  Reset Password
export const resetPassword = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  //  HASH the new password before saving
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  user.password = hashedPassword;
  await user.save();
  console.log("Resetting password for:", email);
console.log("New hashed password:", hashedPassword);


  delete otpStore[email]; 
  res.status(200).json({ message: "Password reset successful" });
};
