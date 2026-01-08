import React from "react";
import {
  Mail, User, Code2, MapPin, Edit3,
  Settings, Share2, ShieldCheck, Sparkles,
  Terminal, Globe, Zap
} from "lucide-react";
import { useSelector } from "react-redux";

export default function Profile() {
  const user = useSelector((store) => store.user);

  if (!user) return (
    <div className="flex justify-center items-center h-96">
      <span className="loading loading-dots loading-lg text-primary"></span>
    </div>
  );

  return (
    // STEP 1: ADDING MESH GRADIENT TO THE MAIN WRAPPER
    <div className="min-h-screen bg-base-200 bg-[radial-gradient(circle_at_50%_50%,_rgba(var(--p),0.1)_0%,_transparent_50%),_radial-gradient(circle_at_0%_0%,_rgba(var(--s),0.1)_0%,_transparent_50%)] p-4 md:p-10 flex justify-center items-center">

      {/* STEP 2: GLASS CARD (Semi-transparent with Blur) */}
      <div className="card w-full max-w-6xl bg-base-100/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[3rem] overflow-hidden border border-white/20">
        <div className="flex flex-col md:flex-row">

          {/* SIDEBAR: PHOTO & QUICK ACTIONS */}
          <div className="md:w-80 bg-primary/5 p-10 flex flex-col items-center border-r border-base-300/50">
            <div className="avatar mb-8">
              <div className="w-48 rounded-[3rem] ring ring-primary ring-offset-base-100 ring-offset-4 shadow-2xl transition-transform duration-500 hover:scale-105">
                <img src={user.photoUrl} alt="Your Profile" />
              </div>
            </div>

            <div className="text-center w-full">
              <h2 className="text-3xl font-black italic tracking-tighter uppercase leading-none">
                {user.firstName} <span className="text-primary">{user.lastName}</span>
              </h2>
              <div className="badge badge-primary badge-outline mt-4 gap-2 py-3 px-4 uppercase text-[10px] font-bold">
                <Zap size={12} fill="currentColor" /> {user.gender} Developer
              </div>
            </div>

            <div className="w-full space-y-3 mt-10">
              <button className="btn btn-primary btn-block rounded-2xl gap-2 shadow-lg shadow-primary/40 hover:scale-[1.02] active:scale-95 transition-all">
                <Edit3 size={18} /> Edit Profile
              </button>
              <button className="btn btn-ghost btn-block rounded-2xl gap-2 opacity-60 hover:bg-base-200">
                <Share2 size={18} /> Share Profile
              </button>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="flex-1 p-8 md:p-14 space-y-10">

            {/* EMAIL INFO CARD WITH GRADIENT BORDER */}
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-[1px] rounded-[2rem]">
              <div className="bg-base-100/50 p-6 rounded-[2rem] flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className="p-4 bg-primary text-primary-content rounded-2xl shadow-lg shadow-primary/20">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Registered Email</p>
                    <p className="text-xl font-bold tracking-tight">{user.email}</p>
                  </div>
                </div>
                <div className="hidden lg:block">
                  <ShieldCheck size={32} className="text-success opacity-50" />
                </div>
              </div>
            </div>

            {/* BIO SECTION */}
            <section>
              <h3 className="flex items-center gap-3 text-xl font-bold italic tracking-tight mb-4">
                <Sparkles className="text-warning" size={20} /> About Me
              </h3>
              <div className="relative p-8 bg-base-200/30 rounded-[2.5rem] border border-base-300/50 shadow-inner">
                <p className="text-lg leading-relaxed opacity-80 font-medium italic">
                  "{user.about || "This developer hasn't written a bio yet."}"
                </p>
              </div>
            </section>

            {/* SKILLS SECTION */}
            <section>
              <h3 className="flex items-center gap-3 text-xl font-bold italic tracking-tight mb-4">
                <Terminal className="text-secondary" size={20} /> Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {user.skills?.map((skill, index) => (
                  <div key={index} className="badge badge-lg py-5 px-6 rounded-2xl bg-gradient-to-tr from-base-200 to-base-100 border-base-300 font-bold hover:border-primary hover:text-primary transition-all cursor-default flex gap-2 shadow-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                    {skill}
                  </div>
                ))}
              </div>
            </section>

            {/* FOOTER STATS */}
            <div className="flex flex-wrap gap-8 pt-6 opacity-50 border-t border-base-300/50">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                <MapPin size={14} className="text-error" /> Worldwide
              </div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                <Globe size={14} className="text-info" /> Open to Work
              </div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                <Settings size={14} /> Active
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
