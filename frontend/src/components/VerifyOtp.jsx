import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useVerifyOtpMutation } from "../features/auth/authApi";
import { toast } from "react-toastify";

const VerifyOtp = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const email = localStorage.getItem("resetEmail");

  const [verifyOtp] = useVerifyOtpMutation();

  const handleChange = (e, index) => {
    const value = e.target.value;

    // Allow only numbers
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      toast.warn("Please enter the 6-digit OTP");
      return;
    }

    try {
      await verifyOtp({ email, otp: otpValue }).unwrap();
      toast.success("OTP verified successfully!");
      navigate("/reset-password");
    } catch (err) {
      console.error("Invalid OTP error:", err);
      const message = err?.data?.message || "Invalid OTP";
      toast.error(message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white p-8 rounded-xl shadow-lg max-w-lg mx-auto mt-20 space-y-5"
    >
      <h2 className="text-3xl font-bold text-center mb-4">Verify OTP</h2>

      <div className="flex justify-center gap-2 ">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            inputMode="numeric"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => (inputRefs.current[index] = el)}
            className="w-10 h-10 text-center text-white border-white text-xl rounded border focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        ))}
      </div>

      <button
        type="submit"
        className="w-full bg-white text-indigo-700 hover:bg-gray-100 font-bold py-3 rounded transition duration-300"
      >
        Verify
      </button>
    </form>
  );
};

export default VerifyOtp;
