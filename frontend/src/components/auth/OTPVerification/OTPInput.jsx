// OTPInput.jsx - Modified with GlassmorphismLayout
import { useState, useRef } from "react";
import verifyOtp from "./VerifyOTP";
import LoaderButton from "../../util/LoaderButton";
import { useSelector } from "react-redux";
import handleSignUp from "../util/SignUpfun";
import { useNavigate } from "react-router-dom";
import Notification from "../../util/Notification";
import sendOtp from "./SendOtp";
import GlassmorphismLayout from "../../util/Glassmorphismlayout";

function OTPInput() {
  const [interOtp, setInterOtp] = useState(new Array(6).fill(""));
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef([]);
  const signUpData = useSelector((store) => store.signUpData);
  const [notify, setNotify] = useState({
    open: false,
    type: "",
    message: "",
  });
  const navigate = useNavigate();

  // Handle manual typing
  function handleChange(event, index) {
    const value = event.target.value;
    if (isNaN(value)) return;

    const updatedOtp = [...interOtp];
    updatedOtp[index] = value.substring(value.length - 1);
    setInterOtp(updatedOtp);

    // Move to next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  }

  // Handle Backspace
  function handleKeyDown(event, index) {
    if (event.key === "Backspace") {
      if (!interOtp[index] && index > 0) {
        inputRefs.current[index - 1].focus();
      }
      const updatedOtp = [...interOtp];
      updatedOtp[index] = "";
      setInterOtp(updatedOtp);
    }
  }

  // Handle Paste Event
  function handlePaste(event) {
    event.preventDefault();
    const pastedData = event.clipboardData.getData("text").trim();

    // Validation: must be numeric and length matches or is less than 6
    if (isNaN(pastedData) || pastedData.length === 0) return;

    const pastedArray = pastedData.split("").slice(0, 6);
    const updatedOtp = [...interOtp];

    pastedArray.forEach((digit, index) => {
      updatedOtp[index] = digit;
    });

    setInterOtp(updatedOtp);

    // Focus the last filled input or the next empty one
    const nextFocusIndex = pastedArray.length < 6 ? pastedArray.length : 5;
    inputRefs.current[nextFocusIndex]?.focus();
  }

  async function handleVerify() {
    setIsVerifying(true);
    const otp = interOtp.join("");

    try {
      if (otp.length !== 6) {
        throw new Error({
          message: "please check opt wrong otp",
        });
      }
      await verifyOtp(signUpData.email, otp);

      await handleSignUp(signUpData, setNotify, navigate);

      setNotify({
        open: true,
        type: "success",
        message: "signUp successfully",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setNotify({
        open: true,
        type: "error",
        message:
          error?.response?.data?.message ||
          "please check opt it not currect",
      });
    } finally {
      setIsVerifying(false);
    }
  }

  async function handleResend() {
    try {
      await sendOtp(signUpData.email);
      setNotify({
        open: true,
        type: "success",
        message: "otp send successfully",
      });
    } catch (error) {
      setNotify({
        open: true,
        type: "error",
        message:
          error.response.data.message ||
          error.message ||
          "unable to send otp please check email",
      });
    }
    setInterOtp(new Array(6).fill(""));
    inputRefs.current[0]?.focus();
  }

  return (
    <GlassmorphismLayout
      backgroundImage="/assets/hero-bg.jpg"
      mobileBackgroundImage="/assets/hero-sm-bg.png"
      overlayStyle="warm"
      loaderDuration={2800}
      showShutterEffect={true}
    >
      <div className="min-h-screen w-full flex items-center justify-center p-6">
        {/* Main Glass Card - Premium Style */}
        <div
          className="w-full max-w-md backdrop-blur-2xl bg-white/5 border border-white/10 shadow-2xl p-8"
          style={{
            opacity: 0,
            animation: "fadeInUp 1s ease-out 0.5s forwards",
          }}
        >
          <div className="flex flex-col items-center text-center">
            {/* Icon Header */}
            <div className="w-16 h-16 bg-white/10 border border-white/20 text-white flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>

            {/* Title */}
            <h2 className="text-white text-3xl md:text-4xl tracking-tight font-light mb-2">
              Verify Account
            </h2>
            <p className="text-white/40 text-xs uppercase tracking-[0.4em] font-sans mb-8">
              Security Code
            </p>

            <p className="text-white/60 text-sm mb-10 font-serif">
              We've sent a 6-digit security code to your email.
            </p>

            {/* OTP Input Grid - Premium No-Radius Style */}
            <div className="flex gap-2 sm:gap-3 justify-center mb-10">
              {interOtp.map((data, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  value={data}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  className="w-11 h-14 sm:w-14 sm:h-16 text-center text-2xl font-light
                           bg-white/5 border border-white/20 text-white
                           focus:border-white/40 focus:bg-white/10 focus:outline-none
                           transition-all duration-300 placeholder-white/20"
                  placeholder="0"
                  maxLength={1}
                />
              ))}
            </div>

            {/* Verify Button - Matching Landing Page Style */}
            <button
              onClick={handleVerify}
              disabled={isVerifying || interOtp.includes("")}
              className="w-full px-8 py-4 border border-white/20 bg-white/10 backdrop-blur-2xl
                       uppercase tracking-[0.4em] text-[10px] text-white font-semibold
                       transition-all duration-700 font-sans
                       hover:bg-white hover:text-black hover:border-white
                       shadow-lg hover:shadow-2xl hover:scale-105
                       disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white/10
                       disabled:hover:text-white disabled:hover:scale-100"
            >
              {isVerifying ? <LoaderButton /> : "Confirm & Authorize"}
            </button>

            {/* Footer Actions */}
            <div className="mt-10 flex flex-col items-center gap-3">
              <p className="text-white/40 text-[9px] uppercase tracking-[0.5em] font-sans">
                Didn't receive the email?
              </p>
              <button
                onClick={handleResend}
                className="text-white/60 text-sm hover:text-white transition-colors duration-300 font-serif"
              >
                Request New Code
              </button>
            </div>
          </div>
        </div>

        <Notification
          open={notify.open}
          type={notify.type}
          message={notify.message}
          duration={2000}
          onClose={() => setNotify((p) => ({ ...p, open: false }))}
        />
      </div>

      <style>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </GlassmorphismLayout>
  );
}

export default OTPInput;
