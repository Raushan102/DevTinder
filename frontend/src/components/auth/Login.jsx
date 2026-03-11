// Login.jsx - Complete with Live Preview (MERGED VERSION)
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../store/userSlice";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../util/constent";
import ErrorModal from "../util/ErrorModal";
import Notification from "../util/Notification";
import ThemeSwitcher from "../util/ThemeSwitcher";
import handleSignUp from "./util/SignUpfun";
import handelEditFuncton from "./util/Editfun";
import handleloginFunction from "./util/LoginFun";
import { addSignUpData } from "../../store/signUpLayer";
import sendOtp from "./OTPVerification/SendOtp";
import GlassmorphismLayout from "../util/Glassmorphismlayout";
import ProfilePreview from "./ProfilePreview";
import { Upload, X, ShieldCheck } from "lucide-react";

function Login({ signUp = false, edit = false }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  // Loading states
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(false);

  // Image upload states
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  // Live Preview State
  const [livePreview, setLivePreview] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    age: null,
    photoUrl: "",
    headline: "",
    profession: "",
    about: "",
    skills: [],
    socialMedia: {
      github: "",
      linkedin: "",
      twitter: "",
    },
    connectionCount: 0,
    createdAt: new Date(),
  });

  // Modal states
  const [showModal, setShowModal] = useState({
    open: false,
    errorMessage: null,
  });

  // Notification state
  const [notify, setNotify] = useState({
    open: false,
    type: "",
    message: "",
  });

  // Form field refs
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
  const githubRef = useRef(null);
  const linkedinRef = useRef(null);
  const twitterRef = useRef(null);

  /* ===============================
     PREFILL (EDIT MODE ONLY)
     =============================== */
  useEffect(() => {
    if (!edit) return;

    if (user) {
      prefillForm(user);
    } else {
      fetchUserFromAPI();
    }
  }, [edit, user]);

  /**
   * Fetch user data from API for edit mode
   */
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

  /**
   * Prefill form fields with user data
   */
  const prefillForm = (u) => {
    if (!u) return;

    // Initialize live preview with user data
    setLivePreview({
      firstName: u.firstName || "",
      lastName: u.lastName || "",
      email: u.email || "",
      gender: u.gender || "",
      age: u.age || null,
      photoUrl: u.photoUrl || "",
      headline: u.headline || "",
      profession: u.profession || "",
      about: u.about || "",
      skills: u.skills || [],
      socialMedia: {
        github: u.socialMedia?.github || "",
        linkedin: u.socialMedia?.linkedin || "",
        twitter: u.socialMedia?.twitter || "",
      },
      connectionCount: u.connectionCount || 0,
      createdAt: u.createdAt || new Date(),
    });
    setPreviewUrl(u.photoUrl || "");

    // Prefill form fields - using requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      if (firstNameRef.current) firstNameRef.current.value = u.firstName || "";
      if (lastNameRef.current) lastNameRef.current.value = u.lastName || "";
      if (genderRef.current) genderRef.current.value = u.gender || "";
      if (ageRef.current) ageRef.current.value = u.age || "";
      if (headlineRef.current) headlineRef.current.value = u.headline || "";
      if (professionRef.current) professionRef.current.value = u.profession || "";
      if (aboutRef.current) aboutRef.current.value = u.about || "";
      if (skillsRef.current) skillsRef.current.value = u.skills?.join(", ") || "";

      // Extract usernames from full URLs
      if (githubRef.current) {
        const githubUsername = u.socialMedia?.github
          ? u.socialMedia.github.replace(/https?:\/\/(www\.)?github\.com\//, "").replace(/\/$/, "")
          : "";
        githubRef.current.value = githubUsername;
      }

      if (linkedinRef.current) {
        const linkedinUsername = u.socialMedia?.linkedin
          ? u.socialMedia.linkedin.replace(/https?:\/\/(www\.)?linkedin\.com\/in\//, "").replace(/\/$/, "")
          : "";
        linkedinRef.current.value = linkedinUsername;
      }

      if (twitterRef.current) {
        const twitterUsername = u.socialMedia?.twitter
          ? u.socialMedia.twitter.replace(/https?:\/\/(www\.)?(twitter\.com|x\.com)\//, "").replace(/\/$/, "")
          : "";
        twitterRef.current.value = twitterUsername;
      }
    });
  };

  /**
   * UPDATE LIVE PREVIEW ON INPUT CHANGE
   */
  const updateLivePreview = (field, value) => {
    setLivePreview((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateSocialMedia = (platform, username) => {
    const urls = {
      github: username ? `https://github.com/${username}` : "",
      linkedin: username ? `https://linkedin.com/in/${username}` : "",
      twitter: username ? `https://twitter.com/${username}` : "",
    };

    setLivePreview((prev) => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: urls[platform],
      },
    }));
  };

  /**
   * Handle image file selection
   */
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Validate file type - must be an image
    if (!file.type.startsWith("image/")) {
      setNotify({
        open: true,
        type: "error",
        message: "Please select a valid image file (JPG, PNG, GIF, etc.)",
      });
      return;
    }

    // Validate file size - must be less than 5MB
    if (file.size > 5 * 1024 * 1024) {
      setNotify({
        open: true,
        type: "error",
        message: "File size must be less than 5MB. Please choose a smaller image.",
      });
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
      updateLivePreview("photoUrl", reader.result);
    };
    reader.readAsDataURL(file);

    setNotify({
      open: true,
      type: "info",
      message: "File selected. Click 'Upload' to save your profile picture.",
    });
  };

  /**
   * Upload photo to server
   */
  const handlePhotoUpload = async () => {
    if (!selectedFile) {
      setNotify({
        open: true,
        type: "warning",
        message: "Please select a file first before uploading.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("profilePicture", selectedFile);

    try {
      setUploadingPhoto(true);
      const res = await axios.post(
        `${BASE_URL}/profile/upload-profile-pic`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data.status === "success") {
        const photoUrl = res.data.data.url;
        dispatch(addUser(res.data.user));
        setPreviewUrl(photoUrl);
        updateLivePreview("photoUrl", photoUrl);
        setSelectedFile(null);

        setNotify({
          open: true,
          type: "success",
          message: "Profile picture uploaded successfully!",
        });
      } else {
        setNotify({
          open: true,
          type: "error",
          message: res.data.message || "Upload failed. Please try again.",
        });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message ||
        error.message ||
        "Failed to upload photo. Please check your connection and try again.";

      setNotify({
        open: true,
        type: "error",
        message: errorMessage,
      });
    } finally {
      setUploadingPhoto(false);
    }
  };

  /**
   * Remove selected image
   */
  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewUrl(user?.photoUrl || "");
    updateLivePreview("photoUrl", user?.photoUrl || "");
  };

  /* ===============================
     FORM SUBMIT HANDLER
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
          githubRef,
          linkedinRef,
          twitterRef,
          dispatch,
          addUser,
          setNotify,
          navigate
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
              error?.response?.data?.message || error.message || "unable to send otp please check email",
          });
        }
      } else {
        await handleloginFunction(emailRef, passwordRef, dispatch, addUser, setNotify, navigate);
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
    <GlassmorphismLayout
      backgroundImage="assets/bgc-1.jpg"
      mobileBackgroundImage="assets/c1.jpg"
      overlayStyle="editorial"
      loaderDuration={2800}
      showShutterEffect={true}
    >
      {/* Loading Overlay */}
      {fetchingData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-orange-400 animate-pulse"></div>
            <div className="w-3 h-3 bg-orange-400 animate-pulse delay-75"></div>
            <div className="w-3 h-3 bg-orange-400 animate-pulse delay-150"></div>
          </div>
        </div>
      )}

      {/* MAIN CONTAINER */}
      <div className="relative min-h-screen w-full flex items-center justify-center px-4 sm:px-6 py-6 sm:py-10">
        <div className="w-full max-w-7xl">
          {/* TWO PANEL LAYOUT FOR EDIT MODE */}
          {edit ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* LEFT PANEL - LIVE PREVIEW */}
              <div
                className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl p-6 overflow-y-auto max-h-[90vh]"
                style={{
                  opacity: 0,
                  animation: "fadeIn 0.8s ease-out 0.1s forwards",
                }}
              >
                <h2 className="text-white sm:text-black text-xl font-bold uppercase tracking-[0.15em] mb-6 text-center">
                  Live Preview
                </h2>
                <ProfilePreview user={livePreview} />
              </div>

              {/* RIGHT PANEL - EDIT FORM */}
              <div
                className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl p-6 overflow-y-auto max-h-[90vh]"
                style={{
                  opacity: 0,
                  animation: "fadeIn 0.8s ease-out 0.2s forwards",
                }}
              >
                <EditForm
                  user={user}
                  loading={loading}
                  uploadingPhoto={uploadingPhoto}
                  previewUrl={previewUrl}
                  selectedFile={selectedFile}
                  firstNameRef={firstNameRef}
                  lastNameRef={lastNameRef}
                  genderRef={genderRef}
                  ageRef={ageRef}
                  headlineRef={headlineRef}
                  professionRef={professionRef}
                  aboutRef={aboutRef}
                  skillsRef={skillsRef}
                  githubRef={githubRef}
                  linkedinRef={linkedinRef}
                  twitterRef={twitterRef}
                  onSubmit={handleSubmit}
                  onImageChange={handleImageChange}
                  onPhotoUpload={handlePhotoUpload}
                  onRemoveImage={handleRemoveImage}
                  updateLivePreview={updateLivePreview}
                  updateSocialMedia={updateSocialMedia}
                />
              </div>
            </div>
          ) : (
            // SINGLE PANEL FOR LOGIN/SIGNUP
            <div
              className="w-full max-w-lg mx-auto"
              style={{
                opacity: 0,
                animation: "fadeIn 0.8s ease-out 0.2s forwards",
              }}
            >
              <LoginSignupForm
                signUp={signUp}
                loading={loading}
                firstNameRef={firstNameRef}
                lastNameRef={lastNameRef}
                emailRef={emailRef}
                passwordRef={passwordRef}
                genderRef={genderRef}
                onSubmit={handleSubmit}
              />
            </div>
          )}
        </div>

        {/* MODALS & NOTIFICATIONS */}
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

        {/* Theme Switcher */}
        <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-50">
          <ThemeSwitcher />
        </div>
      </div>

      {/* ANIMATIONS */}
      <style>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        select option {
          background-color: white;
          color: black;
          padding: 8px;
          font-weight: 500;
        }

        .delay-75 {
          animation-delay: 75ms;
        }

        .delay-150 {
          animation-delay: 150ms;
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(251, 146, 60, 0.5);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(251, 146, 60, 0.7);
        }
      `}</style>
    </GlassmorphismLayout>
  );
}

// ==================== EDIT FORM COMPONENT ====================
function EditForm({
  user,
  loading,
  uploadingPhoto,
  previewUrl,
  selectedFile,
  firstNameRef,
  lastNameRef,
  genderRef,
  ageRef,
  headlineRef,
  professionRef,
  aboutRef,
  skillsRef,
  githubRef,
  linkedinRef,
  twitterRef,
  onSubmit,
  onImageChange,
  onPhotoUpload,
  onRemoveImage,
  updateLivePreview,
  updateSocialMedia,
}) {
  // Helper function to extract username from GitHub URL
  const getGithubUsername = () => {
    if (!user?.socialMedia?.github) return "";
    return user.socialMedia.github.replace(/https?:\/\/(www\.)?github\.com\//, "").replace(/\/$/, "");
  };

  // Helper function to extract username from LinkedIn URL
  const getLinkedinUsername = () => {
    if (!user?.socialMedia?.linkedin) return "";
    return user.socialMedia.linkedin.replace(/https?:\/\/(www\.)?linkedin\.com\/in\//, "").replace(/\/$/, "");
  };

  // Helper function to extract username from Twitter URL
  const getTwitterUsername = () => {
    if (!user?.socialMedia?.twitter) return "";
    return user.socialMedia.twitter.replace(/https?:\/\/(www\.)?(twitter\.com|x\.com)\//, "").replace(/\/$/, "");
  };

  return (
    <div>
      <div className="text-center mb-6">
        <h2
          className="text-white sm:text-black text-3xl sm:text-4xl tracking-tight font-semibold mb-3 drop-shadow-lg"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Edit Profile
        </h2>
        <div className="w-12 sm:w-14 h-[1px] bg-white sm:bg-black mx-auto" />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="space-y-4 sm:space-y-5"
      >
        {/* PHOTO UPLOAD */}
        <div className="mb-6">
          <label className="block text-white sm:text-black text-[10px] sm:text-xs uppercase tracking-[0.1em] font-sans mb-3 font-bold text-center">
            Profile Photo
          </label>

          <div className="flex flex-col items-center gap-4">
            {/* Preview */}
            <div className="relative group">
              <div className="w-32 h-32 overflow-hidden border-4 border-white/30 shadow-2xl">
                <img
                  src={
                    previewUrl ||
                    "https://i.pinimg.com/736x/a6/49/e2/a649e2cd302fec12ba027249058ee420.jpg"
                  }
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>

              {selectedFile && (
                <button
                  type="button"
                  onClick={onRemoveImage}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white flex items-center justify-center
                           hover:bg-red-600 transition-colors shadow-lg"
                >
                  <X size={16} strokeWidth={2.5} />
                </button>
              )}
            </div>

            {/* Upload Controls */}
            <div className="flex gap-2">
              <label className="relative px-5 py-2.5 text-white sm:text-black text-[10px] uppercase tracking-[0.15em] font-bold overflow-hidden group transition-colors duration-300 border border-white/30 backdrop-blur-md cursor-pointer">
                <span className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                <span className="relative z-10 flex items-center gap-2 group-hover:text-black transition-colors duration-300">
                  <Upload size={14} strokeWidth={2.5} />
                  <span>Choose</span>
                </span>
                <input type="file" accept="image/*" onChange={onImageChange} className="hidden" />
              </label>

              {selectedFile && (
                <button
                  type="button"
                  onClick={onPhotoUpload}
                  disabled={uploadingPhoto}
                  className="px-5 py-2.5 bg-orange-400 text-white text-[10px] uppercase tracking-[0.15em] font-bold
                           hover:bg-orange-500 transition-colors disabled:opacity-50"
                >
                  {uploadingPhoto ? "Uploading..." : "Upload"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* First Name & Last Name */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-white sm:text-black text-[10px] sm:text-xs uppercase tracking-[0.1em] font-sans mb-2 font-bold">
              First Name
            </label>
            <input
              ref={firstNameRef}
              type="text"
              placeholder="John"
              defaultValue={user?.firstName || ""}
              onChange={(e) => updateLivePreview("firstName", e.target.value)}
              className="w-full px-4 py-3.5 bg-white/30 backdrop-blur-md border border-white/40 text-white sm:text-black placeholder-gray-300 sm:placeholder-gray-600 text-base font-medium focus:outline-none focus:bg-white/40 focus:border-white/60 transition-all duration-300 shadow-lg"
              required
            />
          </div>
          <div>
            <label className="block text-white sm:text-black text-[10px] sm:text-xs uppercase tracking-[0.1em] font-sans mb-2 font-bold">
              Last Name
            </label>
            <input
              ref={lastNameRef}
              type="text"
              placeholder="Doe"
              defaultValue={user?.lastName || ""}
              onChange={(e) => updateLivePreview("lastName", e.target.value)}
              className="w-full px-4 py-3.5 bg-white/30 backdrop-blur-md border border-white/40 text-white sm:text-black placeholder-gray-300 sm:placeholder-gray-600 text-base font-medium focus:outline-none focus:bg-white/40 focus:border-white/60 transition-all duration-300 shadow-lg"
              required
            />
          </div>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-white sm:text-black text-[10px] sm:text-xs uppercase tracking-[0.1em] font-sans mb-2 font-bold">
            Gender
          </label>
          <div className="relative">
            <select
              ref={genderRef}
              defaultValue={user?.gender || ""}
              onChange={(e) => updateLivePreview("gender", e.target.value)}
              className="w-full px-4 py-3.5 bg-white/30 backdrop-blur-md border border-white/40 text-white sm:text-black text-base font-medium appearance-none cursor-pointer focus:outline-none focus:bg-white/40 focus:border-white/60 transition-all duration-300 shadow-lg pr-10"
              required
            >
              <option value="" className="bg-white text-gray-600">
                Select Gender
              </option>
              <option value="male" className="bg-white text-black">
                Male
              </option>
              <option value="female" className="bg-white text-black">
                Female
              </option>
              <option value="other" className="bg-white text-black">
                Other
              </option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-white sm:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Age & Profession */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-white sm:text-black text-[10px] sm:text-xs uppercase tracking-[0.1em] font-sans mb-2 font-bold">
              Age
            </label>
            <input
              ref={ageRef}
              type="number"
              placeholder="25"
              min="18"
              max="150"
              defaultValue={user?.age || ""}
              onChange={(e) => updateLivePreview("age", e.target.value ? Number(e.target.value) : null)}
              className="w-full px-4 py-3.5 bg-white/30 backdrop-blur-md border border-white/40 text-white sm:text-black placeholder-gray-300 sm:placeholder-gray-600 text-base font-medium focus:outline-none focus:bg-white/40 focus:border-white/60 transition-all duration-300 shadow-lg"
            />
          </div>
          <div>
            <label className="block text-white sm:text-black text-[10px] sm:text-xs uppercase tracking-[0.1em] font-sans mb-2 font-bold">
              Profession
            </label>
            <input
              ref={professionRef}
              type="text"
              placeholder="Developer"
              defaultValue={user?.profession || ""}
              onChange={(e) => updateLivePreview("profession", e.target.value)}
              className="w-full px-4 py-3.5 bg-white/30 backdrop-blur-md border border-white/40 text-white sm:text-black placeholder-gray-300 sm:placeholder-gray-600 text-base font-medium focus:outline-none focus:bg-white/40 focus:border-white/60 transition-all duration-300 shadow-lg"
            />
          </div>
        </div>

        {/* Headline */}
        <div>
          <label className="block text-white sm:text-black text-[10px] sm:text-xs uppercase tracking-[0.1em] font-sans mb-2 font-bold">
            Headline
          </label>
          <input
            ref={headlineRef}
            type="text"
            placeholder="Building the future"
            maxLength="120"
            defaultValue={user?.headline || ""}
            onChange={(e) => updateLivePreview("headline", e.target.value)}
            className="w-full px-4 py-3.5 bg-white/30 backdrop-blur-md border border-white/40 text-white sm:text-black placeholder-gray-300 sm:placeholder-gray-600 text-base font-medium focus:outline-none focus:bg-white/40 focus:border-white/60 transition-all duration-300 shadow-lg"
          />
        </div>

        {/* About */}
        <div>
          <label className="block text-white sm:text-black text-[10px] sm:text-xs uppercase tracking-[0.1em] font-sans mb-2 font-bold">
            About
          </label>
          <textarea
            ref={aboutRef}
            rows="3"
            placeholder="Tell us about yourself..."
            maxLength="600"
            defaultValue={user?.about || ""}
            onChange={(e) => updateLivePreview("about", e.target.value)}
            className="w-full px-4 py-3.5 bg-white/30 backdrop-blur-md border border-white/40 text-white sm:text-black placeholder-gray-300 sm:placeholder-gray-600 text-base font-medium resize-none focus:outline-none focus:bg-white/40 focus:border-white/60 transition-all duration-300 shadow-lg"
          />
        </div>

        {/* Skills */}
        <div>
          <label className="block text-white sm:text-black text-[10px] sm:text-xs uppercase tracking-[0.1em] font-sans mb-2 font-bold">
            Skills (comma-separated)
          </label>
          <input
            ref={skillsRef}
            type="text"
            placeholder="React, Node.js, Python"
            defaultValue={user?.skills?.join(", ") || ""}
            onChange={(e) => {
              const skills = e.target.value
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean);
              updateLivePreview("skills", skills);
            }}
            className="w-full px-4 py-3.5 bg-white/30 backdrop-blur-md border border-white/40 text-white sm:text-black placeholder-gray-300 sm:placeholder-gray-600 text-base font-medium focus:outline-none focus:bg-white/40 focus:border-white/60 transition-all duration-300 shadow-lg"
          />
        </div>

        {/* Social Media */}
        <div>
          <label className="block text-white sm:text-black text-[10px] sm:text-xs uppercase tracking-[0.1em] font-sans mb-2 font-bold">
            Social Media (username only)
          </label>
          <div className="grid grid-cols-3 gap-3">
            <input
              ref={githubRef}
              type="text"
              placeholder="GitHub"
              defaultValue={getGithubUsername()}
              onChange={(e) => updateSocialMedia("github", e.target.value)}
              className="w-full px-3 py-2.5 bg-white/30 backdrop-blur-md border border-white/40 text-white sm:text-black placeholder-gray-300 sm:placeholder-gray-600 text-xs font-medium focus:outline-none focus:bg-white/40 focus:border-white/60 transition-all duration-300 shadow-lg"
            />
            <input
              ref={linkedinRef}
              type="text"
              placeholder="LinkedIn"
              defaultValue={getLinkedinUsername()}
              onChange={(e) => updateSocialMedia("linkedin", e.target.value)}
              className="w-full px-3 py-2.5 bg-white/30 backdrop-blur-md border border-white/40 text-white sm:text-black placeholder-gray-300 sm:placeholder-gray-600 text-xs font-medium focus:outline-none focus:bg-white/40 focus:border-white/60 transition-all duration-300 shadow-lg"
            />
            <input
              ref={twitterRef}
              type="text"
              placeholder="Twitter"
              defaultValue={getTwitterUsername()}
              onChange={(e) => updateSocialMedia("twitter", e.target.value)}
              className="w-full px-3 py-2.5 bg-white/30 backdrop-blur-md border border-white/40 text-white sm:text-black placeholder-gray-300 sm:placeholder-gray-600 text-xs font-medium focus:outline-none focus:bg-white/40 focus:border-white/60 transition-all duration-300 shadow-lg"
            />
          </div>
          <p className="text-white/60 sm:text-black/60 text-[9px] mt-2">
            Enter only the username (e.g., "johndoe" not full URL)
          </p>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-4 mt-2 bg-white text-black font-bold uppercase tracking-[0.2em] text-xs sm:text-sm transition-all duration-300 hover:bg-gray-900 hover:text-white hover:shadow-2xl hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-black disabled:hover:scale-100 shadow-xl"
        >
          {loading ? "PROCESSING..." : "UPDATE PROFILE"}
        </button>
      </form>
    </div>
  );
}

// ==================== LOGIN/SIGNUP FORM COMPONENT ====================
function LoginSignupForm({
  signUp,
  loading,
  firstNameRef,
  lastNameRef,
  emailRef,
  passwordRef,
  genderRef,
  onSubmit,
}) {
  return (
    <div>
      {/* BRANDING SECTION */}
      <div className="text-center mb-6 sm:mb-8">
        <div className="flex items-center justify-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
          <div className="text-2xl sm:text-3xl">🔥</div>
          <h1 className="text-white sm:text-black text-3xl sm:text-4xl tracking-[0.2em] sm:tracking-[0.3em] font-bold uppercase drop-shadow-lg">
            DEVTINDER
          </h1>
        </div>

        <div className="h-[1px] w-14 sm:w-16 bg-white sm:bg-black mx-auto mb-2 sm:mb-2.5" />

        <p className="text-white sm:text-black text-[9px] sm:text-[10px] uppercase tracking-[0.3em] font-bold drop-shadow">
          Developer Network
        </p>
      </div>

      {/* FORM TITLE */}
      <div className="mb-5 sm:mb-7 text-center">
        <h2
          className="text-white sm:text-black text-3xl sm:text-4xl tracking-tight font-semibold mb-2.5 sm:mb-3 drop-shadow-lg"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {signUp ? "Join Us" : "Welcome"}
        </h2>
        <div className="w-12 sm:w-14 h-[1px] bg-white sm:bg-black mx-auto" />
      </div>

      {/* FORM */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="space-y-4 sm:space-y-5"
      >
        {/* First Name & Last Name - Signup only */}
        {signUp && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white sm:text-black text-[10px] sm:text-xs uppercase tracking-[0.1em] font-sans mb-2 font-bold">
                First Name
              </label>
              <input
                ref={firstNameRef}
                type="text"
                placeholder="John"
                className="w-full px-4 py-3.5 bg-white/30 backdrop-blur-md border border-white/40 text-white sm:text-black placeholder-gray-300 sm:placeholder-gray-600 text-base font-medium focus:outline-none focus:bg-white/40 focus:border-white/60 transition-all duration-300 shadow-lg"
                required
              />
            </div>
            <div>
              <label className="block text-white sm:text-black text-[10px] sm:text-xs uppercase tracking-[0.1em] font-sans mb-2 font-bold">
                Last Name
              </label>
              <input
                ref={lastNameRef}
                type="text"
                placeholder="Doe"
                className="w-full px-4 py-3.5 bg-white/30 backdrop-blur-md border border-white/40 text-white sm:text-black placeholder-gray-300 sm:placeholder-gray-600 text-base font-medium focus:outline-none focus:bg-white/40 focus:border-white/60 transition-all duration-300 shadow-lg"
                required
              />
            </div>
          </div>
        )}

        {/* Email */}
        <div>
          <label className="block text-white sm:text-black text-[10px] sm:text-xs uppercase tracking-[0.1em] font-sans mb-2 font-bold">
            Email Address
          </label>
          <input
            ref={emailRef}
            type="email"
            placeholder="dev@terminal.io"
            className="w-full px-4 py-3.5 bg-white/30 backdrop-blur-md border border-white/40 text-white sm:text-black placeholder-gray-300 sm:placeholder-gray-600 text-base font-medium focus:outline-none focus:bg-white/40 focus:border-white/60 transition-all duration-300 shadow-lg"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-white sm:text-black text-[10px] sm:text-xs uppercase tracking-[0.1em] font-sans mb-2 font-bold">
            Password
          </label>
          <input
            ref={passwordRef}
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-3.5 bg-white/30 backdrop-blur-md border border-white/40 text-white sm:text-black placeholder-gray-300 sm:placeholder-gray-600 text-base font-medium focus:outline-none focus:bg-white/40 focus:border-white/60 transition-all duration-300 shadow-lg"
            required
          />
          {signUp && (
            <div className="mt-2.5 flex items-start gap-2 opacity-50">
              <ShieldCheck size={12} className="mt-0.5 text-white sm:text-black flex-shrink-0" />
              <p className="text-[9px] text-white sm:text-black font-bold  tracking-[0.2em] leading-tight">
                Security Protocol: 8+ Characters, 1 Uppercase, 1 Number & 1 Symbol (Ex:Raushan@2003)
              </p>
            </div>
          )}
        </div>

        {/* Gender - Signup only */}
        {signUp && (
          <div>
            <label className="block text-white sm:text-black text-[10px] sm:text-xs uppercase tracking-[0.1em] font-sans mb-2 font-bold">
              Gender
            </label>
            <div className="relative">
              <select
                ref={genderRef}
                className="w-full px-4 py-3.5 bg-white/30 backdrop-blur-md border border-white/40 text-white sm:text-black text-base font-medium appearance-none cursor-pointer focus:outline-none focus:bg-white/40 focus:border-white/60 transition-all duration-300 shadow-lg pr-10"
                required
              >
                <option value="" className="bg-white text-gray-600">
                  Select Gender
                </option>
                <option value="male" className="bg-white text-black">
                  Male
                </option>
                <option value="female" className="bg-white text-black">
                  Female
                </option>
                <option value="other" className="bg-white text-black">
                  Other
                </option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-white sm:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-4 mt-2 bg-white text-black font-bold uppercase tracking-[0.2em] text-xs sm:text-sm transition-all duration-300 hover:bg-gray-900 hover:text-white hover:shadow-2xl hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-black disabled:hover:scale-100 shadow-xl"
        >
          {loading ? "PROCESSING..." : signUp ? "CREATE ACCOUNT" : "SIGN IN"}
        </button>

        {/* FOOTER LINK */}
        <div className="text-center pt-4">
          <p className="text-white sm:text-black text-xs font-semibold">
            {signUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <Link
              to={signUp ? "/login" : "/signUp"}
              className="text-white sm:text-black hover:text-gray-300 sm:hover:text-gray-800 transition-colors font-bold underline underline-offset-2"
            >
              {signUp ? "Sign in" : "Sign up"}
            </Link>
          </p>
        </div>
      </form>

      {/* COPYRIGHT */}
      <div className="text-center mt-8 sm:mt-10">
        <p className="text-white sm:text-black text-[10px] font-bold">
          © 2024 DevTinder • Secure Authentication
        </p>
      </div>
    </div>
  );
}

export default Login;
