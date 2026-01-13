import {
  Mail,
  Edit3,
  Share2,
  Sparkles,
  Terminal,
  Globe,
  Zap,
  Users,
  CalendarDays,
} from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Profile() {
  const user = useSelector((store) => store.user);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-96">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 px-4 py-6 flex justify-center">
      <div className="w-full max-w-5xl bg-base-100 rounded-xl shadow-lg border border-base-300 overflow-hidden">

        {/* ================= HEADER ================= */}
        <div className="flex flex-col md:flex-row items-center gap-6 p-6 md:p-8 bg-gradient-to-r from-primary/10 to-secondary/10">

          {/* Avatar */}
          <div className="avatar">
            <div className="w-28 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
              <img src={user.photoUrl} alt="Profile" />
            </div>
          </div>

          {/* Basic Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-black tracking-tight">
              {user.firstName}{" "}
              <span className="text-primary">{user.lastName}</span>
            </h1>

            <p className="mt-1 text-xs opacity-70 flex items-center justify-center md:justify-start gap-2">
              <Zap size={12} className="text-primary" />
              {user.gender} Developer
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
              <div className="badge badge-outline gap-1 px-3 py-2 text-xs">
                <Users size={12} />
                connections {user.connections?.length || 0}
              </div>
              <div className="badge badge-outline gap-1 px-3 py-2 text-xs">
                <CalendarDays size={12} />
               joined {new Date(user.createdAt).getFullYear()}
              </div>
              <div className="badge badge-outline gap-1 px-3 py-2 text-xs">
                <Globe size={12} />
                Open
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Link
              to="/editProfile"
              className="btn btn-primary btn-sm rounded-lg gap-1"
            >
              <Edit3 size={14} /> Edit
            </Link>
            <button className="btn btn-ghost btn-sm rounded-lg gap-1">
              <Share2 size={14} /> Share
            </button>
          </div>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="p-6 md:p-8 space-y-6">

          {/* Email */}
          <div className="flex items-center gap-3 bg-base-200 rounded-lg p-4">
            <div className="p-2 bg-primary text-primary-content rounded-lg">
              <Mail size={16} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest opacity-50">
                Email
              </p>
              <p className="font-semibold text-sm">{user.email}</p>
            </div>
          </div>

          {/* About */}
          <section>
            <h2 className="flex items-center gap-2 text-lg font-bold mb-2">
              <Sparkles className="text-warning" size={16} />
              About
            </h2>
            <div className="bg-base-200 rounded-lg p-4 text-sm leading-relaxed opacity-80">
              {user.about || "No bio added yet."}
            </div>
          </section>

          {/* Skills */}
          <section>
            <h2 className="flex items-center gap-2 text-lg font-bold mb-2">
              <Terminal className="text-secondary" size={16} />
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {user.skills?.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 rounded-lg bg-base-200 border border-base-300 text-xs font-semibold hover:border-primary hover:text-primary transition"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
