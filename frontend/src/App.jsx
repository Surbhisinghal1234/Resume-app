import "./App.css";
import Signup from "./components/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserFromStorage } from "./features/auth/authSlice";
import { useEffect } from "react";
import Login from "./components/Login";

import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import VerifyOtp from "./components/VerifyOtp";
import ProtectedLayout from "./components/ProtectedLayout";
// import Home from "./pages/Home";
import CreateResume from "./pages/CreateResume";
import { ToastContainer } from "react-toastify"; 
// import "react-toastify/dist/ReactToastify.css";


function App() {
  const dispatch = useDispatch();


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setUserFromStorage());
    }
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        
          <Route element={<ProtectedLayout />}>
          {/* <Route path="/home" element={<Home />} /> */}
          <Route path="/create-resume" element={<CreateResume />}/>
        </Route>
           </Routes>
           </BrowserRouter>
            <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}

export default App;
