/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/refs */
// Form.jsx
import { Mail, Lock, LogIn, User, UserCircle, Save } from "lucide-react";
import LoaderButton from "../util/LoaderButton";
import { Link } from "react-router-dom";
import ProfilePreview from "./ProfilePreview";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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
  photoUrlRef,
  aboutRef,
  skillsRef,
  onSubmit,
}) {
  const user = useSelector((store) => store.user);

  // this is state is use for profile preview for dynamic change
  const [profilePreviewState, setprofilePreviewState] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    password: user?.password || "",
    gender: user?.gender || "",
    age: user?.age || null,
    photoUrl: user?.photoUrl || "",
    about: user?.about || "",
    skills: user?.skills || "",
  });

  // ✅ Add this useEffect to sync with user data
  useEffect(() => {
    if (edit && user) {
      setprofilePreviewState({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        password: user.password || "",
        gender: user.gender || "",
        age: user.age || null,
        photoUrl: user.photoUrl || "",
        about: user.about || "",
        skills: user.skills || "",
      });
    }
  }, [edit, user]);

  function handleProfilePreview(key, value) {
    setprofilePreviewState((previousState) => {
      return {
        ...previousState,
        [key]: value,
      };
    });
  }

  return (
    <>
      {/* MOBILE BRANDING (TOP, NO BACKGROUND) */}
      <div className="md:hidden px-6 pt-6 pb-4 text-center bg-neutral">
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
        <div className="flex items-center gap-2">
          <span className="text-primary text-2xl">🔥</span>
          <span className="text-xl font-black tracking-tighter text-neutral-content">
            DEVTINDER
          </span>
        </div>

        {/* Mini profile preview (edit mode only) */}
        {edit && user && <ProfilePreview user={profilePreviewState} />}

        <div className="text-xs text-neutral-content/60 leading-relaxed">
          End-to-end encrypted authentication for developers.
        </div>
      </div>

      {/* RIGHT PANEL (FORM) */}
      <div className="flex-1 p-6 sm:p-8 md:p-12">
        {fetchingData ? (
          <div className="flex items-center justify-center h-96">
            <div className="loading loading-spinner loading-lg text-primary"></div>
          </div>
        ) : (
          <>
            {/* HEADER */}
            <h2 className="text-xl sm:text-2xl font-bold uppercase">
              {edit ? "Edit Profile" : signUp ? "Sign Up" : "Sign In"}
            </h2>
            <div className="h-1 w-8 bg-primary mt-2 mb-6"></div>

            <div className="space-y-4 sm:space-y-5">
              {/* FIRST NAME */}
              {(signUp || edit) && (
                <div className="form-control">
                  <label className="label text-[10px] uppercase opacity-50">
                    First Name
                  </label>
                  <input
                    ref={firstNameRef}
                    className="input input-bordered w-full"
                    placeholder="John"
                    onChange={(event) =>
                      handleProfilePreview("firstName", event.target.value)
                    }
                  />
                </div>
              )}

              {/* LAST NAME */}
              {(signUp || edit) && (
                <div className="form-control">
                  <label className="label text-[10px] uppercase opacity-50">
                    Last Name
                  </label>
                  <input
                    ref={lastNameRef}
                    className="input input-bordered w-full"
                    placeholder="Doe"
                    onChange={(event) =>
                      handleProfilePreview("lastName", event.target.value)
                    }
                  />
                </div>
              )}

              {/* EMAIL */}
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

              {/* PASSWORD */}
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

              {/* GENDER */}
              {(signUp || edit) && (
                <div className="form-control">
                  <label className="label text-[10px] uppercase opacity-50">
                    Gender
                  </label>
                  <select
                    ref={genderRef}
                    className="select select-bordered w-full"
                    defaultValue=""
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

              {/* AGE */}
              {edit && (
                <div className="form-control">
                  <label className="label text-[10px] uppercase opacity-50">
                    Age
                  </label>
                  <input
                    ref={ageRef}
                    type="number"
                    className="input input-bordered w-full"
                    onChange={(event) =>
                      handleProfilePreview("age", event.target.value)
                    }
                  />
                </div>
              )}

              {/* PHOTO URL */}
              {edit && (
                <div className="form-control">
                  <label className="label text-[10px] uppercase opacity-50">
                    Photo URL
                  </label>
                  <input
                    ref={photoUrlRef}
                    type="url"
                    className="input input-bordered w-full"
                    onChange={(event) =>
                      handleProfilePreview("photoUrl", event.target.value)
                    }
                  />
                </div>
              )}

              {/* ABOUT */}
              {edit && (
                <div className="form-control">
                  <label className="label text-[10px] uppercase opacity-50">
                    About
                  </label>
                  <textarea
                    ref={aboutRef}
                    className="textarea textarea-bordered w-full"
                    onChange={(event) =>
                      handleProfilePreview("about", event.target.value)
                    }
                  />
                </div>
              )}

              {/* SKILLS */}
              {edit && (
                <div className="form-control">
                  <label className="label text-[10px] uppercase opacity-50">
                    Skills
                  </label>
                  <input
                    ref={skillsRef}
                    className="input input-bordered w-full"
                    placeholder="JavaScript, React, Node.js"
                    onChange={(event) => {
                      const arrayOfSkills = event.target.value
                        .split(",")
                        .map((ele) => ele.trim())
                        .filter((ele) => ele.length > 0);

                      handleProfilePreview("skills", arrayOfSkills);
                    }}
                  />
                  <span className="text-xs my-2">
                    List your technical skills, separated by commas (e.g.,
                    React, Node, Express)
                  </span>
                </div>
              )}

              {/* ACTION BUTTON */}
              <button
                className="btn btn-primary w-full mt-4 uppercase text-xs"
                onClick={onSubmit}
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

              {/* NAV LINKS */}
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
