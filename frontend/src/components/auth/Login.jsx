// Login.jsx
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../util/constent";
import ErrorModal from "../util/ErrorModal";
import Notification from "../util/Notification";
import Form from "./Form";
import ThemeSwitcher from "../util/ThemeSwitcher";
import handleSignUp from "./util/SignUpfun";
import handelEditFuncton from "./util/Editfun";
import handleloginFunction from "./util/LoginFun";
import { addSignUpData } from "../../store/signUpLayer";
import sendOtp from "./OTPVerification/SendOtp";

function Login({ signUp = false, edit = false }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((store) => store.user);

  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(false);

  const [showModal, setShowModal] = useState({
    open: false,
    errorMessage: null,
  });

  const [notify, setNotify] = useState({
    open: false,
    type: "",
    message: "",
  });

  // refs
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const genderRef = useRef(null);
  const ageRef = useRef(null);
  const headlineRef = useRef(null);
  const professionRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const githubRef = useRef(null);      // ✅ NEW
  const linkedinRef = useRef(null);    // ✅ NEW
  const twitterRef = useRef(null);     // ✅ NEW

  /* ===============================
     PREFILL (EDIT MODE ONLY)
     =============================== */
  useEffect(() => {
    if (!edit) return;

    const timer = setTimeout(() => {
      if (user) {
        prefillForm(user);
      } else {
        fetchUserFromAPI();
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [edit, user]);

  const fetchUserFromAPI = async () => {
    try {
      setFetchingData(true);
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });
      dispatch(addUser(res.data.data));
    } catch (error) {
      setNotify({
        open: true,
        type: "error",
        message: "Failed to fetch user data",
      });
      setShowModal({
        open: true,
        errorMessage: error.response?.data?.message || "unable to fetch user",
      });
    } finally {
      setFetchingData(false);
    }
  };

  const prefillForm = (u) => {
    if (!u) return;
    firstNameRef.current.value = u.firstName || "";
    lastNameRef.current.value = u.lastName || "";
    genderRef.current.value = u.gender || "";
    ageRef.current.value = u.age || "";
    headlineRef.current.value = u.headline || "";
    professionRef.current.value = u.profession || "";
    aboutRef.current.value = u.about || "";
    skillsRef.current.value = u.skills?.join(", ") || "";
    // ✅ NEW: Prefill social media
    githubRef.current.value = u.socialMedia?.github || "";
    linkedinRef.current.value = u.socialMedia?.linkedin || "";
    twitterRef.current.value = u.socialMedia?.twitter || "";
  };

  /* ===============================
    SUBMIT HANDLER
     =============================== */
  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (edit) {
        await handelEditFuncton(
          skillsRef,
          firstNameRef,
          lastNameRef,
          genderRef,
          ageRef,
          headlineRef,
          professionRef,
          aboutRef,
          githubRef,      // ✅ NEW
          linkedinRef,    // ✅ NEW
          twitterRef,     // ✅ NEW
          dispatch,
          addUser,
          setNotify,
          navigate,
        );
      } else if (signUp) {
        dispatch(
          addSignUpData({
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            gender: genderRef.current.value,
          })
        );

        try {
          const response = await sendOtp(emailRef.current.value);
          setNotify({
            open: true,
            type: "success",
            message: "please check your mail box for otp",
          });

          if (response.data.status == 200) {
            setTimeout(() => {
              navigate("/otp");
            }, 1000);
          }
        } catch (error) {
          setShowModal({
            open: true,
            errorMessage:
              error?.response?.data?.message ||
              error.message ||
              "unable to send otp please check email",
          });
        }
      } else {
        await handleloginFunction(
          emailRef,
          passwordRef,
          dispatch,
          addUser,
          setNotify,
          navigate,
        );
      }
    } catch (error) {
      setShowModal({
        open: true,
        errorMessage: error.response?.data?.message || "Operation failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-1 bg-base-200">
      <div className="card w-full max-w-4xl bg-base-100 border border-base-300 shadow-xl rounded-xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <Form
            signUp={signUp}
            edit={edit}
            loading={loading}
            fetchingData={fetchingData}
            firstNameRef={firstNameRef}
            lastNameRef={lastNameRef}
            emailRef={emailRef}
            passwordRef={passwordRef}
            genderRef={genderRef}
            ageRef={ageRef}
            headlineRef={headlineRef}
            professionRef={professionRef}
            aboutRef={aboutRef}
            skillsRef={skillsRef}
            githubRef={githubRef}        // ✅ NEW
            linkedinRef={linkedinRef}    // ✅ NEW
            twitterRef={twitterRef}      // ✅ NEW
            onSubmit={handleSubmit}
          />
        </div>
      </div>

      <ErrorModal
        title={edit ? "Update Failed" : "Authentication Error"}
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
        onClose={() => setNotify((p) => ({ ...p, open: false }))}
      />
      <div className="absolute top-2 right-2">
        <ThemeSwitcher />
      </div>
    </div>
  );
}

export default Login;
