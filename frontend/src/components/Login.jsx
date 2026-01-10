import React, { useState, useRef } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../util/userSlice";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "./constent";
import ErrorModal from "./ErrorModal";
import {
  Mail,
  Lock,
  LogIn,
  Flame,
  Shield,
  User,
  UserCircle,
} from "lucide-react";
import Notification from "./Notification";
import Loader from "./loader";
import LoaderButton from "./loaderButton";

function Login({ signUp = false }) {
  const [loading, isLoading] = useState(false);

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const genderRef = useRef(null);

  const [showModal, setShowModal] = useState({
    open: false,
    errorMessage: null,
  });

  const [notify, setNotify] = useState({
    open: false,
    type: "",
    message: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleLoginSignUp() {
    isLoading(true);
    try {
      if (signUp) {
        let res = await axios.post(
          `${BASE_URL}/signUp`,
          {
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            gender: genderRef.current.value,
          },
          { withCredentials: true }
        );

        setNotify({
          open: true,
          type: "success",
          message: "Signup successful!",
        });

        navigate("/login");
      } else {
        let res = await axios.post(
          `${BASE_URL}/login`,
          {
            email: emailRef.current.value,
            password: passwordRef.current.value,
          },
          { withCredentials: true }
        );

        dispatch(addUser(res.data.data));
        navigate("/");
      }

      isLoading(false);
    } catch (error) {
      setShowModal({
        open: true,
        errorMessage: error.response?.data?.message || "Invalid Credentials",
      });

      setNotify({
        open: true,
        type: "error",
        message:
          error.response?.data?.message ||
          (signUp ? "Signup failed!" : "Login failed!"),
      });
      isLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-base-200 relative overflow-hidden">
      {/* MESH GRADIENT (Subtle & Static) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 blur-[100px] rounded-full"></div>
      </div>

      {/* SHARP WIDE CARD (max-w-2xl) */}
      <div className="card w-full max-w-2xl bg-base-100 shadow-xl rounded-xl border border-base-300 z-10 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* LEFT: MINIMAL BRANDING PANEL */}
          <div className="hidden md:flex w-2/5 bg-neutral p-10 flex-col justify-between">
            <div className="flex items-center gap-2">
              <Flame className="text-primary" size={28} fill="currentColor" />
              <span className="text-xl font-black tracking-tighter text-neutral-content">
                DEVTINDER
              </span>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <Shield className="text-primary mt-1" size={18} />
                <div>
                  <h4 className="text-xs font-bold text-neutral-content uppercase tracking-widest">
                    Secure Access
                  </h4>
                  <p className="text-[11px] text-neutral-content/60 leading-relaxed mt-1">
                    End-to-end encrypted authentication for developers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: CLEAN FORM */}
          <div className="flex-1 p-8 md:p-12">
            <div className="mb-10">
              <h2 className="text-2xl font-bold tracking-tight text-base-content uppercase">
                {signUp ? "Sign Up" : "Sign In"}
              </h2>
              <div className="h-1 w-8 bg-primary mt-2"></div>
            </div>

            <div className="space-y-5">
              {/* FIRST NAME - Only for Sign Up */}
              {signUp && (
                <div className="form-control">
                  <label className="label py-1">
                    <span className="text-[10px] font-bold uppercase opacity-50 tracking-widest">
                      First Name
                    </span>
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-3 top-1/2 -translate-y-1/2 opacity-30"
                      size={16}
                    />
                    <input
                      ref={firstNameRef}
                      type="text"
                      className="input input-bordered w-full pl-10 rounded-lg bg-base-200 border-base-300 focus:outline-primary h-12 text-sm"
                      placeholder="John"
                      required
                    />
                  </div>
                </div>
              )}

              {/* LAST NAME - Only for Sign Up */}
              {signUp && (
                <div className="form-control">
                  <label className="label py-1">
                    <span className="text-[10px] font-bold uppercase opacity-50 tracking-widest">
                      Last Name
                    </span>
                  </label>
                  <div className="relative">
                    <UserCircle
                      className="absolute left-3 top-1/2 -translate-y-1/2 opacity-30"
                      size={16}
                    />
                    <input
                      ref={lastNameRef}
                      type="text"
                      className="input input-bordered w-full pl-10 rounded-lg bg-base-200 border-base-300 focus:outline-primary h-12 text-sm"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>
              )}

              {/* EMAIL FIELD */}
              <div className="form-control">
                <label className="label py-1">
                  <span className="text-[10px] font-bold uppercase opacity-50 tracking-widest">
                    Email
                  </span>
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 opacity-30"
                    size={16}
                  />
                  <input
                    ref={emailRef}
                    type="email"
                    className="input input-bordered w-full pl-10 rounded-lg bg-base-200 border-base-300 focus:outline-primary h-12 text-sm"
                    placeholder="dev@example.com"
                    required
                  />
                </div>
              </div>

              {/* PASSWORD FIELD */}
              <div className="form-control">
                <label className="label py-1">
                  <span className="text-[10px] font-bold uppercase opacity-50 tracking-widest">
                    Password
                  </span>
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 opacity-30"
                    size={16}
                  />
                  <input
                    ref={passwordRef}
                    type="password"
                    className="input input-bordered w-full pl-10 rounded-lg bg-base-200 border-base-300 focus:outline-primary h-12 text-sm"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {/* GENDER - Only for Sign Up */}
              {signUp && (
                <div className="form-control">
                  <label className="label py-1">
                    <span className="text-[10px] font-bold uppercase opacity-50 tracking-widest">
                      Gender
                    </span>
                  </label>
                  <select
                    ref={genderRef}
                    className="select select-bordered w-full rounded-lg bg-base-200 border-base-300 focus:outline-primary h-12 text-sm"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>
                      Select Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              )}

              {/* ACTION BUTTON */}

              <button
                className="btn btn-primary w-full mt-4 rounded-lg font-bold uppercase tracking-widest text-xs h-12 shadow-lg shadow-primary/20 hover:brightness-110 active:scale-[0.98] transition-all"
                onClick={handleLoginSignUp}
              >
               { !loading && <LogIn size={16} />}
                {signUp ? (
                  loading ? (
                    <LoaderButton />
                  ) : (
                    `Create Account`
                  )
                ) : loading ? (
                  <LoaderButton />
                ) : (
                  `Authorize Session`
                )}
              </button>

              <div className="text-center mt-8 pt-6 border-t border-base-200">
                <p className="text-xs font-medium opacity-60">
                  {signUp ? "Already have an account?" : "New here?"}
                  <Link
                    to={signUp ? "/login" : "/signup"}
                    className="text-primary font-bold ml-1 hover:underline"
                  >
                    {signUp ? "Sign In" : "Create Account"}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ErrorModal
        title="Unauthorized"
        message={showModal.errorMessage}
        type="error"
        isOpen={showModal.open}
        onClose={() => setShowModal({ open: false, errorMessage: null })}
      />

      <Notification
        open={notify.open}
        type={notify.type}
        message={notify.message}
        duration={2000}
        onClose={() => setNotify((prev) => ({ ...prev, open: false }))}
      />
    </div>
  );
}

export default Login;
