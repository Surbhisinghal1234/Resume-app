import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";

export const signupUser = async (req, res) => {
  const { name, email, password, mobile } = req.body;

  try {
    // 1.  Check if email or mobile already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { mobile }],
    });

    if (existingUser) {
      const isEmailSame = existingUser.email === email;
      const isMobileSame = existingUser.mobile === mobile;

      if (isEmailSame && isMobileSame) {
        return res
          .status(400)
          .json({ message: "User with this email and mobile already exists" });
      } else if (isEmailSame) {
        return res.status(400).json({ message: "Email already exists" });
      } else if (isMobileSame) {
        return res
          .status(400)
          .json({ message: "Mobile number already exists" });
      }
    }

    // 2. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create new user
    const newUser = await User.create({
      uid: uuidv4(),
      name,
      email,
      password: hashedPassword,
      mobile,
    });
    // 4. Generate JWT token
    const token = jwt.sign(
      { uid: newUser.uid, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 5. Respond
    res.status(201).json({
      message: "User created successfully",
      user: {
        uid: newUser.uid,
        name: newUser.name,
        email: newUser.email,
        mobile: newUser.mobile,
      },
      token,
    });
    console.log(user, "user");
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const loginUser = async (req, res) => {
  const { input, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ email: input }, { mobile: input }],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        uid: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
