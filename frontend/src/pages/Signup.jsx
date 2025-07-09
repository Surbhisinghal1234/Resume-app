import { useDispatch, useSelector } from "react-redux";
import {
  setName,
  setEmail,
  setPassword,
  setConfirmPassword,
  setMobile,
  setAgreedToTerms,
  setUser,
} from "../features/auth/authSlice";
import { useSignupUserMutation } from "../features/auth/authApi";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useState } from "react";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signupUser, { isLoading }] = useSignupUserMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { name, email, password, confirmPassword, mobile, agreedToTerms } =
    useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreedToTerms) {
      toast.warn("You must agree to Terms and Conditions");
      return;
    }

    if (password !== confirmPassword) {
      toast.warn("Passwords do not match");
      return;
    }

    try {
      const res = await signupUser({ name, email, password, mobile }).unwrap();
      toast.success("Signup successful!");

      if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        dispatch(setUser(res.user));
        // toast.success("Signup successful!");
        navigate("/create-resume");
      } else {
        toast.error("Signup failed. Token not received.");
      }
    } catch (err) {
      toast.error("Signup failed:", err);

      const message = err?.data?.message || "Signup failed. Try again.";

      const lowerMessage = message.toLowerCase();

      if (lowerMessage.includes("email and mobile")) {
        toast.error("user with this email and mobile number already exists.");
      } else if (lowerMessage.includes("email")) {
        toast.error("This email is already registered.");
      } else if (lowerMessage.includes("mobile")) {
        toast.error("This mobile number is already registered.");
      } else {
        toast.error(message);
      }
    }
  };

  return (
 

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-indigo-500 px-4 py-12">
  <form
    onSubmit={handleSubmit}
    autoComplete="on"
    className="w-full max-w-lg bg-white/20 backdrop-blur-lg text-white p-8 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.25)] border border-white/30 space-y-5"
  >
    <h2 className="text-3xl font-bold text-center">Create an Account</h2>

    {/* Name */}
    <div>
      <label className="block mb-1 text-white/90">Full Name *</label>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        autoComplete="name"
        onChange={(e) => dispatch(setName(e.target.value))}
        className="w-full p-3 rounded-xl bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    </div>

    {/* Email */}
    <div>
      <label className="block mb-1 text-white/90">Email</label>
      <input
        type="email"
        placeholder="Email"
        autoComplete="email"
        name="email"
        value={email}
        onChange={(e) => dispatch(setEmail(e.target.value))}
        className="w-full p-3 rounded-xl bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    </div>

    {/* Password */}
    <div className="relative">
      <label className="block mb-1 text-white/90">Password</label>
      <input
        type={showPassword ? "text" : "password"}
        autoComplete="new-password"
        placeholder="Password"
        name="password"
        value={password}
        onChange={(e) => dispatch(setPassword(e.target.value))}
        className="w-full p-3 rounded-xl bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 bottom-3 text-gray-700"
      >
        {showPassword ? <FaEye /> : <FaEyeSlash />}
      </button>
    </div>

    {/* Confirm Password */}
    <div className="relative">
      <label className="block mb-1 text-white/90">Confirm Password</label>
      <input
        type={showConfirmPassword ? "text" : "password"}
        autoComplete="new-password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => dispatch(setConfirmPassword(e.target.value))}
        className="w-full p-3 rounded-xl bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <button
        type="button"
        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        className="absolute right-3 bottom-3 text-gray-700"
      >
        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>

    {/* Mobile */}
    <div>
      <label className="block mb-1 text-white/90">Mobile No.</label>
      <input
        type="tel"
        name="tel"
        autoComplete="tel"
        placeholder="Mobile"
        value={mobile}
        onChange={(e) => dispatch(setMobile(e.target.value))}
        className="w-full p-3 rounded-xl bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    </div>

    {/* Terms Checkbox */}
    <label className="flex items-center text-sm text-white/90 space-x-2">
      <input
        type="checkbox"
        checked={agreedToTerms}
        onChange={(e) => dispatch(setAgreedToTerms(e.target.checked))}
        className="w-4 h-4"
      />
      <span>
        I agree to the{" "}
        <a href="/terms" className="underline text-blue-200 hover:text-blue-300">
          Terms and Conditions
        </a>
      </span>
    </label>

    {/* Submit Button */}
    <button
      type="submit"
      disabled={!agreedToTerms || isLoading}
      className={`w-full py-3 font-semibold rounded-xl ${
        !agreedToTerms || isLoading
          ? "bg-white text-black cursor-not-allowed"
          : "bg-gradient-to-r from-purple-600 to-pink-600 hover:brightness-110 shadow-lg transition-all duration-300"
      }`}
    >
      {isLoading ? <ClipLoader color="#000" size={20} /> : "Signup"}
    </button>

    
    <p className="text-center text-sm text-white/90 mt-3">
      Already a member?{" "}
      <Link to="/create-resume" className="underline hover:text-white transition">
        Sign In
      </Link>
    </p>
  </form>
</div>

  );
};

export default Signup;
