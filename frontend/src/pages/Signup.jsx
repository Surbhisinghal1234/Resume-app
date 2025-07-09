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
    <form
      onSubmit={handleSubmit}
      autoComplete="on"
      className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600  text-white p-8 rounded-xl shadow-lg max-w-lg mx-auto mt-10 space-y-5"
    >
      <h2 className="text-3xl font-bold text-center mb-4">Create an Account</h2>

      <div>
        <label className="block mb-1">Full Name *</label>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          autoComplete="name"
          onChange={(e) => dispatch(setName(e.target.value))}
          className="w-full p-3 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      <div>
        <label className="block mb-1"> Email</label>
        <input
          type="email"
          placeholder="Email"
          autoComplete="email"
          name="email"
          value={email}
          onChange={(e) => dispatch(setEmail(e.target.value))}
          className="w-full p-3 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>
      <div className="relative">
        <label className="block mb-1"> Password</label>
        <input
          type={showPassword ? "text" : "password"}
          autoComplete="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => dispatch(setPassword(e.target.value))}
          className="w-full p-3 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-11 text-black"
        >
          {showPassword ? <FaEye /> : <FaEyeSlash />}
        </button>
      </div>
      <div className="relative">
        <label className="block mb-1">Confirm Password</label>
        <input
          type={showConfirmPassword ? "text" : "password"}
          autoComplete="confirm-password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => dispatch(setConfirmPassword(e.target.value))}
          className="w-full p-3 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-11 text-black"
        >
          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      <div>
        <label htmlFor="">Mobile No.</label>
        <input
          type="tel"
          name="tel"
          autoComplete="tel"
          placeholder="Mobile"
          value={mobile}
          onChange={(e) => dispatch(setMobile(e.target.value))}
          className="w-full p-3 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>
      <label className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={agreedToTerms}
          onChange={(e) => dispatch(setAgreedToTerms(e.target.checked))}
          className="mr-2"
        />
        <span>
          I agree to the{" "}
          <a href="/terms" className="text-blue-600 underline">
            Terms and Conditions
          </a>
        </span>
      </label>

      <button
        type="submit"
        disabled={!agreedToTerms || isLoading}
        className={`w-full py-2  rounded ${
          !agreedToTerms || isLoading
            ? "bg-white text-black cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isLoading ? <ClipLoader color="#000" size={20} /> : "Signup"}
      </button>
      <p className="text-center text-sm mt-3">
        Already a member?{" "}
        <Link to="/" className="underline hover:text-gray-300">
          Sign In
        </Link>
      </p>
    </form>
  );
};

export default Signup;
