import React, { useState } from "react";
import { useLoginUserMutation } from "../features/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const Login = () => {
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!input || !password) {
      toast.warn("Please fill in all fields");
      return;
    }

    try {
      const res = await loginUser({ input, password }).unwrap();

      if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        dispatch(setUser(res.user));
        toast.success("Login successful!");
        navigate("/create-resume");
      } 
      
      else {
        toast.error("Login failed");
      }
    } catch {
      toast.error("Invalid credentials");
    }
  };

  return (
 

 <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#7e5bef] to-[#fb66c9] px-4 py-10">
  <form
    onSubmit={handleLogin}
    autoComplete="on"
    className="w-full max-w-md bg-white/20 backdrop-blur-xl border border-white/30 text-white p-8 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] space-y-6"
  >
    <h2 className="text-3xl font-bold text-center drop-shadow-sm tracking-wide">Welcome Back 👋</h2>
    <p className="text-center text-sm text-white/80">Login to continue building your resume</p>

    {/* Email */}
    <input
      type="email"
      value={input}
      name="email"
      onChange={(e) => setInput(e.target.value)}
      autoComplete="email"
      placeholder="📧 Email Address"
      className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/70 border border-white/30 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50 transition"
    />

    {/* Password */}
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
        placeholder="🔒 Password"
        className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/70 border border-white/30 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50 transition"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-4 bottom-3 text-white/70"
      >
        {showPassword ? <FaEye /> : <FaEyeSlash />}
      </button>
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      disabled={isLoading}
      className="w-full py-3 font-semibold rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:brightness-110 hover:scale-[1.02] shadow-lg transition-all duration-300"
    >
      {isLoading ? <ClipLoader color="#fff" size={20} /> : "Login"}
    </button>

    {/* Links */}
    <div className="text-right text-sm">
      <Link
        to="/forgot-password"
        className="text-white/80 hover:underline hover:text-white transition"
      >
        Forgot Password?
      </Link>
    </div>

    <p className="text-center text-sm text-white/80 mt-3">
      Don’t have an account?{" "}
      <Link to="/signup" className="underline hover:text-white transition">
        Sign up
      </Link>
    </p>
  </form>
</div>



  );
};

export default Login;
