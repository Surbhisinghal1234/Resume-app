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
    <form autoComplete="on"
      onSubmit={handleLogin}
      className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white p-8 rounded-xl shadow-lg max-w-lg mx-auto mt-20 space-y-5"
    >
      <h2 className="text-2xl font-semibold mb-6 text-center">Sign in</h2>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={input}
        autoComplete="email"
        onChange={(e) => setInput(e.target.value)}
         className="w-full p-3 rounded-xl bg-white text-black shadow-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"

      />
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-4 text-black"
        >
          {showPassword ? <FaEye /> : < FaEyeSlash/>}
        </button>
        
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-white text-indigo-700 hover:bg-gray-100 font-bold py-3 rounded transition duration-300"
      >
        {isLoading ? <ClipLoader color="#000" size={20} />: "Login"}
      </button>

      <div className="text-right text-sm underline hover:text-gray-300">
        <Link to="/forgot-password">Forgot Password?</Link>
      </div>
      <p className="text-center text-sm mt-3">
        Don’t have an account?{" "}
        <Link to="/signup" className="underline hover:text-gray-300">
          Sign up
        </Link>
      </p>
    </form>
  );
};

export default Login;
