import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useResetPasswordMutation } from "../features/auth/authApi";

const ResetPassword = () => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [resetPassword] = useResetPasswordMutation();

const handleReset = async (e) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    await resetPassword({ email, password }).unwrap();
    toast.success("Password reset successful!");
    navigate("/");
  } catch (err) {
    const message = err?.data?.message || "Error resetting password";
    toast.error(message);
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-indigo-500 px-4 py-12">
  <form
    onSubmit={handleReset}
    className="w-full max-w-md bg-white/20 backdrop-blur-xl border border-white/30 text-white p-8 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.25)] space-y-6"
  >
    <h2 className="text-3xl font-bold text-center">Reset Password</h2>
    <p className="text-center text-sm text-white/80">
      Please enter your email and new password below
    </p>

    {/* Email */}
    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full px-4 py-3 rounded-xl bg-white text-black border border-gray-300 shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
    />

    {/* New Password */}
    <input
      type="password"
      placeholder="New Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full px-4 py-3 rounded-xl bg-white text-black border border-gray-300 shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
    />

    {/* Confirm Password */}
    <input
      type="password"
      placeholder="Confirm Password"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      className="w-full px-4 py-3 rounded-xl bg-white text-black border border-gray-300 shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
    />

    {/* Submit */}
    <button
      type="submit"
      className="w-full py-3 font-semibold rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:brightness-110 shadow-md transition-all duration-300"
    >
      Reset Password
    </button>

    <p className="text-center text-sm text-white/80 mt-2">
      <Link to="/" className="underline hover:text-white transition">
        Back to Login
      </Link>
    </p>
  </form>
</div>

  );
};

export default ResetPassword;
