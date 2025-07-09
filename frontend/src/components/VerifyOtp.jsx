import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useVerifyOtpMutation, useSendOtpMutation } from "../features/auth/authApi";
import { toast } from "react-toastify";

const VerifyOtp = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const email = localStorage.getItem("resetEmail");

  const [verifyOtp] = useVerifyOtpMutation();
  const [sendOtp] = useSendOtpMutation();

  const [resendDisabled, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState(60);

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

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
      toast.success("OTP verified successfully");
      navigate("/reset-password");
    } catch (err) {
      const message = err?.data?.message || "Invalid OTP";
      toast.error(message);
    }
  };

  const handleResendOtp = async () => {
    try {
      await sendOtp({ email }).unwrap();
      toast.success("OTP resent successfully");
      setResendDisabled(true);
      setTimer(60);

      const countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            clearInterval(countdown);
            setResendDisabled(false);
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
    } catch  {
      toast.error("Failed to resend OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-pink-500  px-4 py-12">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/20 backdrop-blur-xl border border-white/30 text-white p-8 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.25)] space-y-6"
      >
        <h2 className="text-3xl font-bold text-center">Verify OTP</h2>
        <p className="text-center text-sm text-white/80">
          Enter the 6-digit code sent to your email
        </p>

        <div className="flex justify-center gap-3 mt-2">
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
              className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/70 border border-white/30 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50 transition"
            />
          ))}
        </div>

        <button
          type="submit"
          className="w-full py-3 font-semibold rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:brightness-110 shadow-lg transition-all duration-300"
        >
          Verify
        </button>

        <p className="text-center text-sm text-white/80 mt-2">
          Didn’t receive the code?{" "}
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={resendDisabled}
            className={`underline ${
              resendDisabled ? "opacity-50 cursor-not-allowed" : "hover:text-white"
            }`}
          >
            Resend OTP {resendDisabled && `(${timer}s)`}
          </button>
        </p>
      </form>
    </div>
  );
};

export default VerifyOtp;
