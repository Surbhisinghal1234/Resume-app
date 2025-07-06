import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../features/auth/authSlice";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const [isMounted, setIsMounted] = useState(false); // Track when useEffect completes
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      <nav>
        <div className="flex justify-between text-black items-center bg-gray-200 shadow-amber-200 px-[3rem] py-2 gap-[2rem] ">
          <h2 className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600  bg-clip-text text-transparent font-bold tracking-tight hover:text-gray-800 transition">
            {" "}
            <Link to="/create-resume">Resume Builder</Link>{" "}
          </h2>
          <ul className="flex gap-[2rem] items-center font-medium">
            <li> {user?.name}</li>
            <li> {user?.email}</li>

            <li>
              {" "}
              <Link to="/create-resume">Create Resume</Link>
            </li>
            <button
            className="bg-gradient-to-r from-purple-600 to-pink-600  font-semibold hover:bg-gray-300 text-black px-4 py-2 rounded-md shadow transition duration-200"
            onClick={handleLogout}
          >
            Logout
          </button>
          </ul>
          
        </div>
      </nav>
    </>
  );
};

export default Navbar;
