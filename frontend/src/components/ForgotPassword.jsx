import React, { useState } from "react";
import { toast } from "react-toastify";

import { Link, useNavigate } from "react-router-dom";
import { useSendOtpMutation } from "../features/auth/authApi"; 

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [sendOtp] = useSendOtpMutation(); 


  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await sendOtp({ email }).unwrap(); 
    toast.success(res.message || "OTP sent successfully");
    localStorage.setItem("resetEmail", email);
    navigate("/verify-otp");
  } catch (err) {
    const message = err?.data?.message || "Failed to send OTP";
    toast.error(message);
  }
};

  return (
   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-indigo-500 px-4 py-12">
  <form
    onSubmit={handleSubmit}
    className="w-full max-w-md bg-white/20 backdrop-blur-xl border border-white/30 text-white p-8 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.25)] space-y-6"
  >
    <h2 className="text-3xl font-bold text-center">Forgot Password</h2>
    <p className="text-center text-sm text-white/80">
      Enter your registered email to receive an OTP
    </p>

    <input
      type="email"
      placeholder="you@example.com"
      value={email}
      required
      onChange={(e) => setEmail(e.target.value)}
      className="w-full px-4 py-3 rounded-xl bg-white text-black border border-gray-300 shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
    />

    <button
      type="submit"
      className="w-full py-3 font-semibold rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:brightness-110 shadow-md transition-all duration-300"
    >
      Send OTP
    </button>

    <p className="text-center text-sm text-white/80 mt-2">
      <Link to="/" className="underline hover:text-white">
        Back to Login
      </Link>
    </p>
  </form>
</div>

  );
};

export default ForgotPassword;
