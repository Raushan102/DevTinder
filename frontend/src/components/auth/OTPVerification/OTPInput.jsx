import { useState, useRef } from "react";
import verifyOtp from "./VerifyOTP";
import LoaderButton from "../../util/LoaderButton";
import { useSelector } from "react-redux";
import handleSignUp from "../util/SignUpfun";
import { useNavigate } from "react-router-dom";
import Notification from "../../util/Notification";
import sendOtp from './SendOtp'
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
        message: error?.response?.data?.message || "please check opt it not currect",
      });
    } finally {
      setIsVerifying(false);
    }
  }

  async function handleResend() {
    try {
      await sendOtp(signUpData.email)
      setNotify({
        open: true,
        type: "success",
        message: "otp send successfully",
      });
    } catch (error) {
      setNotify({
        open: true,
        type: "error",
        message: error.response.data.message || error.message || "unable to send otp please check email",
      });
    }
    setInterOtp(new Array(6).fill(""));
    inputRefs.current[0]?.focus();
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-base-300 relative overflow-hidden">
      {/* 1. Background Ambient Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-secondary/20 rounded-full blur-[100px] animate-pulse delay-700" />

      {/* 2. Main Glass Card */}
      <div className="card w-full max-w-md bg-base-100/40 backdrop-blur-xl border border-white/20 shadow-2xl z-10">
        <div className="card-body p-8 items-center text-center">
          {/* Header */}
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-4 shadow-inner">
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
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>

          <h2 className="text-3xl font-black tracking-tight text-base-content">
            Verify Account
          </h2>
          <p className="text-base-content/60 text-sm mt-2 mb-8">
            We've sent a 6-digit security code to your email.
          </p>

          {/* 3. OTP Input Grid */}
          <div className="flex gap-2 sm:gap-3 justify-center mb-8">
            {interOtp.map((data, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                value={data}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className="w-11 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold
                           bg-base-100 border-b-4 border-base-300 rounded-xl
                           focus:border-primary focus:bg-base-200 focus:outline-none
                           focus:-translate-y-1 transition-all duration-200
                           text-primary shadow-sm"
                placeholder="○"
              />
            ))}
          </div>

          {/* 4. Action Button */}
          <button
            onClick={handleVerify}
            disabled={isVerifying || interOtp.includes("")}
            className="btn btn-primary btn-block btn-lg shadow-lg shadow-primary/20 normal-case"
          >
            {isVerifying ? <LoaderButton /> : "Confirm & Authorize"}
          </button>

          {/* Footer Actions */}
          <div className="mt-8 flex flex-col items-center gap-2">
            <p className="text-xs text-base-content/50 uppercase tracking-widest font-bold">
              Didn't receive the email?
            </p>
            <button
              onClick={handleResend}
              className="btn btn-ghost btn-sm text-primary hover:bg-primary/10 transition-colors"
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

      {/* Decorative Bottom Shadow */}
      <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-base-300 to-transparent pointer-events-none" />
    </div>
  );
}

export default OTPInput;
