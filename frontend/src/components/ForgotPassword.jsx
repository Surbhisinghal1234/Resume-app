import React, { useState } from "react";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { useSendOtpMutation } from "../features/auth/authApi"; 

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [sendOtp] = useSendOtpMutation(); 


  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await sendOtp({ email }).unwrap(); // input = email or mobile
    toast.success(res.message || "OTP sent successfully");
    localStorage.setItem("resetEmail", email);
    navigate("/verify-otp");
  } catch (err) {
    const message = err?.data?.message || "Failed to send OTP";
    toast.error(message);
  }
};

  return (
    <form onSubmit={handleSubmit}  className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white p-8 rounded-xl shadow-lg max-w-lg mx-auto mt-20 space-y-5">
      <h2 className="text-3xl font-bold text-center mb-4">Forgot Password</h2>
      <input
        type="email"
          placeholder="Enter your email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Send OTP
      </button>
    </form>
  );
};

export default ForgotPassword;
