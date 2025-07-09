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



export const sendOtp = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const existing = otpStore[email];

  // If OTP already exists and is valid (not expired), prevent resend
  const now = Date.now();
  if (existing && existing.expiresAt > now) {
    const secondsLeft = Math.ceil((existing.expiresAt - now) / 1000);
    return res.status(429).json({
      message: `OTP already sent. Please wait ${secondsLeft}s before requesting a new one.`,
    });
  }

  // Generate new OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Save with 5 minute expiry
  otpStore[email] = {
    otp,
    expiresAt: now + 5 * 60 * 1000, 
  };

  // Send via email
  await transporter.sendMail({
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
  });

  res.status(200).json({ message: "OTP sent successfully" });
};
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const record = otpStore[email];

  if (!record)
    return res.status(400).json({ message: "No OTP found for this email" });

  if (Date.now() > record.expiresAt)
    return res.status(410).json({ message: "OTP has expired" });

  if (record.otp !== otp)
    return res.status(401).json({ message: "Invalid OTP" });

  // OTP valid - clear from store
  delete otpStore[email];

  res.status(200).json({ message: "OTP verified successfully" });
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
