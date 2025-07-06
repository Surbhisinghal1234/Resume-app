import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    <form
      onSubmit={handleReset}
         className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white p-8 rounded-xl shadow-lg max-w-lg mx-auto mt-20 space-y-5"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>

      <input
        type="email"
        placeholder="Email"
         className="w-full p-3 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="New Password"
         className="w-full p-3 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="password"
        placeholder="Confirm Password"
          className="w-full p-3 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button
        type="submit"
       className="w-full bg-white text-indigo-700 hover:bg-gray-100 font-bold py-3 rounded transition duration-300"
      >
        Reset Password
      </button>
    </form>
  );
};

export default ResetPassword;
