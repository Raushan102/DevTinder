/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/refs */
// Form.jsx - Main form component for Sign In, Sign Up, and Profile Edit
import { Mail, Lock, LogIn, User, UserCircle, Save, Upload, Github, Linkedin, Twitter } from "lucide-react";
import LoaderButton from "../util/LoaderButton";
import { Link } from "react-router-dom";
import ProfilePreview from "./ProfilePreview";
import Notification from "../util/Notification"; // ✅ Import Notification component
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../util/constent";

/**
 * Form Component
 * Handles user authentication (Sign In/Sign Up) and profile editing
 *
 * @param {boolean} signUp - Flag to show sign up form
 * @param {boolean} edit - Flag to show edit profile form
 * @param {boolean} loading - Loading state for form submission
 * @param {boolean} fetchingData - Loading state for fetching user data
 * @param {ref} firstNameRef - Reference for first name input
 * @param {ref} lastNameRef - Reference for last name input
 * @param {ref} emailRef - Reference for email input
 * @param {ref} passwordRef - Reference for password input
 * @param {ref} genderRef - Reference for gender select
 * @param {ref} ageRef - Reference for age input
 * @param {ref} headlineRef - Reference for headline input
 * @param {ref} professionRef - Reference for profession input
 * @param {ref} aboutRef - Reference for about textarea
 * @param {ref} skillsRef - Reference for skills input
 * @param {ref} githubRef - Reference for GitHub URL input
 * @param {ref} linkedinRef - Reference for LinkedIn URL input
 * @param {ref} twitterRef - Reference for Twitter URL input
 * @param {function} onSubmit - Callback function for form submission
 */
function Form({
  signUp = false,
  edit = false,
  loading = false,
  fetchingData = false,
  firstNameRef,
  lastNameRef,
  emailRef,
  passwordRef,
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
}) {
  // Get user data from Redux store
  const user = useSelector((store) => store.user);

  // ✅ Notification state for showing success/error messages
  const [notify, setNotify] = useState({
    open: false,
    type: "",
    message: "",
  });

  // Photo upload states
  const [selectedFile, setSelectedFile] = useState(null); // Currently selected file for upload
  const [uploadingPhoto, setUploadingPhoto] = useState(false); // Upload in progress flag
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState(user?.photoUrl || ""); // Current photo URL

  /**
   * Profile preview state
   * Updates in real-time as user types in the form
   * Used to show live preview in ProfilePreview component
   */
  const [profilePreviewState, setProfilePreviewState] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    password: user?.password || "",
    gender: user?.gender || "",
    age: user?.age || null,
    photoUrl: user?.photoUrl || "",
    headline: user?.headline || "",
    profession: user?.profession || "",
    about: user?.about || "",
    skills: user?.skills || [],
    socialMedia: {
      github: user?.socialMedia?.github || "",
      linkedin: user?.socialMedia?.linkedin || "",
      twitter: user?.socialMedia?.twitter || "",
    },
    connectionCount: user?.connectionCount || 0,
  });

  /**
   * Sync profile preview state with user data from Redux
   * Runs when component mounts or user data changes
   */
  useEffect(() => {
    if (edit && user) {
      setProfilePreviewState({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        password: user.password || "",
        gender: user.gender || "",
        age: user.age || null,
        photoUrl: user.photoUrl || "",
        headline: user.headline || "",
        profession: user.profession || "",
        about: user.about || "",
        skills: user.skills || [],
        socialMedia: {
          github: user.socialMedia?.github || "",
          linkedin: user.socialMedia?.linkedin || "",
          twitter: user.socialMedia?.twitter || "",
        },
        connectionCount: user.connectionCount || 0,
      });
      setUploadedPhotoUrl(user.photoUrl || "");
    }
  }, [edit, user]);

  /**
   * Handle profile preview updates (NO DEBOUNCE - immediate update)
   * Updates preview state as user types
   *
   * @param {string} key - Field name to update
   * @param {any} value - New value for the field
   */
  const handleProfilePreview = (key, value) => {
    setProfilePreviewState((previousState) => ({
      ...previousState,
      [key]: value,
    }));
  };

  /**
   * Handle social media preview updates (NO DEBOUNCE - immediate update)
   * Updates social media links in preview state
   *
   * @param {string} platform - Social media platform (github, linkedin, twitter)
   * @param {string} value - URL value
   */
  const handleSocialMediaPreview = (platform, value) => {
    setProfilePreviewState((previousState) => ({
      ...previousState,
      socialMedia: {
        ...previousState.socialMedia,
        [platform]: value,
      },
    }));
  };

  /**
   * Handle file selection for profile picture
   * Validates file type and size before setting
   *
   * @param {Event} e - File input change event
   */
  const handleFileChange = (e) => {
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

    // File is valid - set it for upload
    setSelectedFile(file);
    setNotify({
      open: true,
      type: "info",
      message: "File selected. Click 'Upload' to save your profile picture.",
    });
  };

  /**
   * Upload profile picture to Cloudinary via backend API
   * Shows loading state and success/error notifications
   */
  const handlePhotoUpload = async () => {
    // Check if file is selected
    if (!selectedFile) {
      setNotify({
        open: true,
        type: "warning",
        message: "Please select a file first before uploading.",
      });
      return;
    }

    // Create FormData object to send file
    const formData = new FormData();
    formData.append("profilePicture", selectedFile);

    try {
      // Start upload process
      setUploadingPhoto(true);

      // Send file to backend API
      const response = await axios.post(
        `${BASE_URL}/profile/upload-profile-pic`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, // Include cookies for authentication
        }
      );

      // Upload successful
      if (response.data.status === "success") {
        const photoUrl = response.data.data.url;

        // Update photo URL in state
        setUploadedPhotoUrl(photoUrl);
        handleProfilePreview("photoUrl", photoUrl);

        // Clear selected file
        setSelectedFile(null);

        // Show success notification
        setNotify({
          open: true,
          type: "success",
          message: "Profile picture uploaded successfully!",
        });
      } else {
        // Unexpected response format
        setNotify({
          open: true,
          type: "error",
          message: response.data.message || "Upload failed. Please try again.",
        });
      }
    } catch (error) {
      // Handle upload errors
      // Extract error message from response or use default
      const errorMessage = error.response?.data?.message ||
        error.message ||
        "Failed to upload photo. Please check your connection and try again.";

      setNotify({
        open: true,
        type: "error",
        message: errorMessage,
      });
    } finally {
      // Always stop loading spinner
      setUploadingPhoto(false);
    }
  };

  return (
    <>
      {/* ✅ Notification Component - Shows toast messages */}
      <Notification
        open={notify.open}
        type={notify.type}
        message={notify.message}
        duration={4000} // Auto-close after 4 seconds
        onClose={() => setNotify((prev) => ({ ...prev, open: false }))}
      />

      {/* MOBILE BRANDING (TOP, NO BACKGROUND) */}
      <div className="md:hidden pb-4 text-center bg-neutral">
        <div className="flex items-center justify-center gap-2">
          <span className="text-primary text-xl">🔥</span>
          <span className="text-xl font-black tracking-tighter text-neutral-content">
            DEVTINDER
          </span>
        </div>
        <p className="text-xs text-neutral-content/60 leading-relaxed">
          Secure access for developers
        </p>
      </div>

      {/* LEFT PANEL (DESKTOP ONLY) */}
      <div className="hidden md:flex w-2/5 bg-neutral p-10 flex-col justify-between">
        {/* Logo and Branding */}
        <div className="flex items-center gap-2">
          <span className="text-primary text-2xl">🔥</span>
          <span className="text-xl font-black tracking-tighter text-neutral-content">
            DEVTINDER
          </span>
        </div>

        {/* Live Profile Preview (edit mode only) */}
        {edit && user && <ProfilePreview user={profilePreviewState} />}

        {/* Footer Text */}
        <div className="text-xs text-neutral-content/60 leading-relaxed">
          End-to-end encrypted authentication for developers.
        </div>
      </div>

      {/* RIGHT PANEL (FORM) */}
      <div className="flex-1 p-6 sm:p-8 md:p-12 max-h-screen overflow-y-auto">
        {/* Show loading spinner while fetching data */}
        {fetchingData ? (
          <div className="flex items-center justify-center h-96">
            <div className="loading loading-spinner loading-lg text-primary"></div>
          </div>
        ) : (
          <>
            {/* FORM HEADER */}
            <h2 className="text-xl sm:text-2xl font-bold uppercase">
              {edit ? "Edit Profile" : signUp ? "Sign Up" : "Sign In"}
            </h2>
            <div className="h-1 w-8 bg-primary mt-2 mb-6"></div>

            {/* FORM FIELDS */}
            <div className="space-y-4 sm:space-y-5">

              {/* ==================== BASIC INFO FIELDS ==================== */}

              {/* FIRST NAME - shown in sign up and edit modes */}
              {(signUp || edit) && (
                <div className="form-control">
                  <label className="label text-[10px] uppercase opacity-50">
                    First Name
                  </label>
                  <input
                    ref={firstNameRef}
                    className="input input-bordered w-full"
                    placeholder="John"
                    defaultValue={edit ? user?.firstName : ""}
                    onChange={(event) =>
                      handleProfilePreview("firstName", event.target.value)
                    }
                  />
                </div>
              )}

              {/* LAST NAME - shown in sign up and edit modes */}
              {(signUp || edit) && (
                <div className="form-control">
                  <label className="label text-[10px] uppercase opacity-50">
                    Last Name
                  </label>
                  <input
                    ref={lastNameRef}
                    className="input input-bordered w-full"
                    placeholder="Doe"
                    defaultValue={edit ? user?.lastName : ""}
                    onChange={(event) =>
                      handleProfilePreview("lastName", event.target.value)
                    }
                  />
                </div>
              )}

              {/* EMAIL - shown only in sign in and sign up (not editable) */}
              {!edit && (
                <div className="form-control">
                  <label className="label text-[10px] uppercase opacity-50">
                    Email
                  </label>
                  <input
                    ref={emailRef}
                    type="email"
                    className="input input-bordered w-full"
                    placeholder="dev@example.com"
                  />
                </div>
              )}

              {/* PASSWORD - shown only in sign in and sign up (not editable) */}
              {!edit && (
                <div className="form-control">
                  <label className="label text-[10px] uppercase opacity-50">
                    Password
                  </label>
                  <input
                    ref={passwordRef}
                    type="password"
                    className="input input-bordered w-full"
                    placeholder="••••••••"
                  />
                </div>
              )}

              {/* GENDER - shown in sign up and edit modes */}
              {(signUp || edit) && (
                <div className="form-control">
                  <label className="label text-[10px] uppercase opacity-50">
                    Gender
                  </label>
                  <select
                    ref={genderRef}
                    className="select select-bordered w-full"
                    defaultValue={edit ? user?.gender : ""}
                    onChange={(event) =>
                      handleProfilePreview("gender", event.target.value)
                    }
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

              {/* AGE - shown only in edit mode */}
              {edit && (
                <div className="form-control">
                  <label className="label text-[10px] uppercase opacity-50">
                    Age
                  </label>
                  <input
                    ref={ageRef}
                    type="number"
                    className="input input-bordered w-full"
                    placeholder="25"
                    min="18"
                    max="150"
                    defaultValue={user?.age || ""}
                    onChange={(event) =>
                      handleProfilePreview("age", event.target.value)
                    }
                  />
                </div>
              )}

              {/* ==================== PROFILE PICTURE UPLOAD ==================== */}

              {edit && (
                <div className="form-control">
                  <label className="label text-[10px] uppercase opacity-50">
                    Profile Picture
                  </label>

                  {/* Current Photo Preview */}
                  {uploadedPhotoUrl && (
                    <div className="mb-3">
                      <img
                        src={uploadedPhotoUrl}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover border-2 border-primary/30"
                      />
                    </div>
                  )}

                  {/* File Input + Upload Button */}
                  <div className="flex gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      className="file-input file-input-bordered w-full"
                      onChange={handleFileChange}
                      disabled={uploadingPhoto}
                    />
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handlePhotoUpload}
                      disabled={!selectedFile || uploadingPhoto}
                    >
                      {uploadingPhoto ? (
                        <span className="loading loading-spinner loading-sm"></span>
                      ) : (
                        <>
                          <Upload size={16} />
                          Upload
                        </>
                      )}
                    </button>
                  </div>
                  <span className="text-xs mt-2 opacity-60">
                    Select an image (max 5MB) and click Upload
                  </span>
                </div>
              )}

              {/* ==================== PROFESSIONAL INFO FIELDS ==================== */}

              {/* HEADLINE - short tagline about yourself */}
              {edit && (
                <div className="form-control">
                  <label className="label text-[10px] uppercase opacity-50">
                    Headline
                  </label>
                  <input
                    ref={headlineRef}
                    className="input input-bordered w-full"
                    placeholder="Full Stack Developer | Open Source Contributor"
                    maxLength={120}
                    defaultValue={user?.headline || ""}
                    onChange={(event) =>
                      handleProfilePreview("headline", event.target.value)
                    }
                  />
                  <span className="text-xs mt-1 opacity-60">
                    Short catchy tagline (max 120 characters)
                  </span>
                </div>
              )}

              {/* PROFESSION - current job/career */}
              {edit && (
                <div className="form-control">
                  <label className="label text-[10px] uppercase opacity-50">
                    Profession
                  </label>
                  <input
                    ref={professionRef}
                    className="input input-bordered w-full"
                    placeholder="Software Engineer"
                    maxLength={80}
                    defaultValue={user?.profession || ""}
                    onChange={(event) =>
                      handleProfilePreview("profession", event.target.value)
                    }
                  />
                  <span className="text-xs mt-1 opacity-60">
                    Your current job/career (max 80 characters)
                  </span>
                </div>
              )}

              {/* ABOUT - bio/description */}
              {edit && (
                <div className="form-control">
                  <label className="label text-[10px] uppercase opacity-50">
                    About
                  </label>
                  <textarea
                    ref={aboutRef}
                    className="textarea textarea-bordered w-full"
                    placeholder="Tell us about yourself..."
                    rows={4}
                    maxLength={600}
                    defaultValue={user?.about || ""}
                    onChange={(event) =>
                      handleProfilePreview("about", event.target.value)
                    }
                  />
                  <span className="text-xs mt-1 opacity-60">
                    Brief bio (max 600 characters)
                  </span>
                </div>
              )}

              {/* SKILLS - comma-separated list */}
              {edit && (
                <div className="form-control">
                  <label className="label text-[10px] uppercase opacity-50">
                    Skills
                  </label>
                  <input
                    ref={skillsRef}
                    className="input input-bordered w-full"
                    placeholder="JavaScript, React, Node.js"
                    defaultValue={user?.skills?.join(", ") || ""}
                    onChange={(event) => {
                      // Convert comma-separated string to array
                      const arrayOfSkills = event.target.value
                        .split(",")
                        .map((skill) => skill.trim()) // Remove extra spaces
                        .filter((skill) => skill.length > 0); // Remove empty entries

                      handleProfilePreview("skills", arrayOfSkills);
                    }}
                  />
                  <span className="text-xs mt-1 opacity-60">
                    List your technical skills, separated by commas (e.g., React, Node, Express)
                  </span>
                </div>
              )}

              {/* ==================== SOCIAL MEDIA LINKS ==================== */}

              {edit && (
                <div className="form-control">
                  <label className="label text-[10px] uppercase opacity-50 mb-2">
                    Social Media Links
                  </label>

                  {/* GitHub Profile Link */}
                  <div className="mb-3">
                    <label className="label">
                      <span className="label-text text-xs flex items-center gap-2">
                        <Github size={14} /> GitHub
                      </span>
                    </label>
                    <input
                      ref={githubRef}
                      type="url"
                      className="input input-bordered w-full"
                      placeholder="https://github.com/username"
                      defaultValue={user?.socialMedia?.github || ""}
                      onChange={(event) =>
                        handleSocialMediaPreview("github", event.target.value)
                      }
                    />
                  </div>

                  {/* LinkedIn Profile Link */}
                  <div className="mb-3">
                    <label className="label">
                      <span className="label-text text-xs flex items-center gap-2">
                        <Linkedin size={14} /> LinkedIn
                      </span>
                    </label>
                    <input
                      ref={linkedinRef}
                      type="url"
                      className="input input-bordered w-full"
                      placeholder="https://linkedin.com/in/username"
                      defaultValue={user?.socialMedia?.linkedin || ""}
                      onChange={(event) =>
                        handleSocialMediaPreview("linkedin", event.target.value)
                      }
                    />
                  </div>

                  {/* Twitter/X Profile Link */}
                  <div className="mb-3">
                    <label className="label">
                      <span className="label-text text-xs flex items-center gap-2">
                        <Twitter size={14} /> Twitter / X
                      </span>
                    </label>
                    <input
                      ref={twitterRef}
                      type="url"
                      className="input input-bordered w-full"
                      placeholder="https://twitter.com/username"
                      defaultValue={user?.socialMedia?.twitter || ""}
                      onChange={(event) =>
                        handleSocialMediaPreview("twitter", event.target.value)
                      }
                    />
                  </div>

                  <span className="text-xs opacity-60">
                    Add your social profiles (optional)
                  </span>
                </div>
              )}

              {/* ==================== ACTION BUTTON ==================== */}

              <button
                className="btn btn-primary w-full mt-4 uppercase text-xs"
                onClick={onSubmit}
                disabled={loading}
              >
                {loading ? (
                  <LoaderButton />
                ) : edit ? (
                  <>
                    <Save size={14} /> Save Changes
                  </>
                ) : signUp ? (
                  "Create Account"
                ) : (
                  <>
                    <LogIn size={14} /> Authorize Session
                  </>
                )}
              </button>

              {/* ==================== NAVIGATION LINKS ==================== */}

              {/* Toggle between Sign In and Sign Up */}
              {!edit && (
                <p className="text-center text-xs mt-6 opacity-60">
                  {signUp ? "Already have an account?" : "New here?"}
                  <Link
                    to={signUp ? "/login" : "/signup"}
                    className="text-primary ml-1 font-bold"
                  >
                    {signUp ? "Sign In" : "Create Account"}
                  </Link>
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Form;
