/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/refs */
import { Mail, Lock, LogIn, User, UserCircle, Save, Upload, Github, Linkedin, Twitter } from "lucide-react";
import LoaderButton from "../util/LoaderButton";
import { Link } from "react-router-dom";
import ProfilePreview from "./ProfilePreview";
import Notification from "../util/Notification";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../util/constent";

function Form({
  signUp = false, edit = false, loading = false, fetchingData = false,
  firstNameRef, lastNameRef, emailRef, passwordRef, genderRef, ageRef,
  headlineRef, professionRef, aboutRef, skillsRef, githubRef, linkedinRef,
  twitterRef, onSubmit,
}) {
  const user = useSelector((store) => store.user);
  const [notify, setNotify] = useState({ open: false, type: "", message: "" });
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState(user?.photoUrl || "");

  const [profilePreviewState, setProfilePreviewState] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
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
  });

  // Reusable Glass Class
  const glassPanel = "bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl";
  const inputGlass = "bg-black/20 border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 text-white placeholder:opacity-30";

  return (
    <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto my-10 min-h-[80vh] overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
      <Notification
        open={notify.open}
        type={notify.type}
        message={notify.message}
        onClose={() => setNotify((prev) => ({ ...prev, open: false }))}
      />

      {/* LEFT PANEL: PREVIEW & BRANDING */}
      <div className={`hidden md:flex w-2/5 p-10 flex-col justify-between relative overflow-hidden ${glassPanel} border-r-0 rounded-r-none`}>
        {/* Glow Accent */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/20 blur-[100px] rounded-full" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-primary text-2xl animate-pulse">🔥</span>
            <span className="text-xl font-black tracking-tighter text-white uppercase italic">
              DEVTINDER
            </span>
          </div>
          <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Protocol: Secure-Dev-Connect</p>
        </div>

        <div className="relative z-10 py-10">
          {edit && user ? (
            <ProfilePreview user={profilePreviewState} />
          ) : (
            <div className="space-y-4 opacity-80">
               <h3 className="text-3xl font-serif text-white leading-tight">Architecture for <span className="text-primary italic">Connection.</span></h3>
               <p className="text-sm text-white/60 font-light">Join the elite network of developers building the future.</p>
            </div>
          )}
        </div>

        <div className="relative z-10 text-[10px] text-white/40 leading-relaxed uppercase tracking-widest">
          &copy; 2024 DevTinder Internal // Auth_v2.0
        </div>
      </div>

      {/* RIGHT PANEL: THE FORM */}
      <div className={`flex-1 p-8 md:p-12 overflow-y-auto bg-black/40 backdrop-blur-md`}>
        {fetchingData ? (
          <div className="flex items-center justify-center h-full">
            <span className="loading loading-ring loading-lg text-primary"></span>
          </div>
        ) : (
          <div className="max-w-md mx-auto">
            <header className="mb-10">
              <h2 className="text-3xl font-serif text-white italic">
                {edit ? "Refine Profile" : signUp ? "Create Identity" : "Authorize Session"}
              </h2>
              <div className="h-[2px] w-12 bg-primary mt-4" />
            </header>

            <div className="space-y-6">
              {/* Form Groups with Glass Style */}
              {(signUp || edit) && (
                <div className="grid grid-cols-2 gap-4">
                   <div className="form-control">
                      <label className="label text-[10px] uppercase text-white/50 tracking-widest font-bold">First Name</label>
                      <input ref={firstNameRef} className={`input ${inputGlass}`} placeholder="John" defaultValue={edit ? user?.firstName : ""} />
                   </div>
                   <div className="form-control">
                      <label className="label text-[10px] uppercase text-white/50 tracking-widest font-bold">Last Name</label>
                      <input ref={lastNameRef} className={`input ${inputGlass}`} placeholder="Doe" defaultValue={edit ? user?.lastName : ""} />
                   </div>
                </div>
              )}

              {!edit && (
                <>
                  <div className="form-control">
                    <label className="label text-[10px] uppercase text-white/50 tracking-widest font-bold">Email</label>
                    <input ref={emailRef} type="email" className={`input ${inputGlass}`} placeholder="dev@terminal.io" />
                  </div>
                  <div className="form-control">
                    <label className="label text-[10px] uppercase text-white/50 tracking-widest font-bold">Password</label>
                    <input ref={passwordRef} type="password" className={`input ${inputGlass}`} placeholder="••••••••" />
                  </div>
                </>
              )}

              {/* ACTION BUTTON */}
              <button
                className="group relative w-full overflow-hidden rounded-xl bg-primary px-8 py-4 transition-all hover:bg-orange-500 active:scale-95 disabled:opacity-50 mt-6"
                onClick={onSubmit}
                disabled={loading}
              >
                <div className="relative z-10 flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-widest text-black">
                  {loading ? <LoaderButton /> : edit ? <><Save size={18}/> Commit Changes</> : signUp ? "Initialize" : "Access Terminal"}
                </div>
              </button>

              {!edit && (
                <div className="pt-6 border-t border-white/5 text-center">
                   <p className="text-xs text-white/40 uppercase tracking-widest">
                      {signUp ? "Identity already exists?" : "Missing credentials?"}
                      <Link to={signUp ? "/login" : "/signUp"} className="text-primary ml-2 font-black hover:underline underline-offset-4">
                        {signUp ? "Sign_In" : "Register_User"}
                      </Link>
                   </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Form;
