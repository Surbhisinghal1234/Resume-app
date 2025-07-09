import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../features/auth/authSlice";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const [isMounted, setIsMounted] = useState(false); // Track when useEffect completes
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false); 

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      navigate("/"); // if Token/user nahi mil raha
    } else {
      setIsMounted(true); 
    }
  }, [navigate]);

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  if (!isMounted) {
    return <div className="text-center mt-10">Loading...</div>; 
  }

  return (
    <>
  <nav className="bg-white/70 backdrop-blur-md shadow-md border-b border-gray-300 px-6 py-4 sticky top-0 z-50">
  <div className="flex justify-between items-center">
    {/* Logo */}
    <Link
      to="/create-resume"
      state={{ tab: "form" }}
      className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tight"
    >
      Resume Builder
    </Link>

    {/* Hamburger Menu */}
    <div className="md:hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="text-2xl text-gray-700">
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
    </div>

    {/* Desktop Menu */}
    <ul className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
      <li className="hover:text-purple-600 transition">{user?.name}</li>
      <li className="hover:text-purple-600 transition">{user?.email}</li>
      <li>
        <Link
          to="/create-resume"
          state={{ tab: "form" }}
          className="hover:text-purple-600 transition"
        >
          Create Resume
        </Link>
      </li>
      <button
        onClick={handleLogout}
        className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-md shadow hover:shadow-lg transition-all duration-300"
      >
        Logout
      </button>
    </ul>
  </div>

  {/* Mobile Menu */}
  {isOpen && (
    <ul className="md:hidden mt-4 space-y-3 text-gray-700 font-medium">
      <li>{user?.name}</li>
      <li>{user?.email}</li>
      <li>
        <Link
          to="/create-resume"
          state={{ tab: "form" }}
          onClick={() => setIsOpen(false)}
          className="block hover:text-purple-600 transition"
        >
          Create Resume
        </Link>
      </li>
      <button
        onClick={() => {
          handleLogout();
          setIsOpen(false);
        }}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-md shadow hover:shadow-lg transition-all duration-300"
      >
        Logout
      </button>
    </ul>
  )}
</nav>

    </>
  );
};

export default Navbar;
