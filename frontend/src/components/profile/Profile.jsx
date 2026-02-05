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
  Briefcase,
  Quote,
  Github,
  Linkedin,
  Twitter,
  Calendar,
  User as UserIcon,
} from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Profile() {
  const user = useSelector((store) => store.user);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-orange-400 animate-pulse"></div>
          <div className="w-3 h-3 bg-orange-400 animate-pulse delay-75"></div>
          <div className="w-3 h-3 bg-orange-400 animate-pulse delay-150"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 md:px-8 py-6 flex justify-center">
      <div className="w-full max-w-5xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl overflow-hidden">

        {/* ================= HEADER SECTION ================= */}
        <div className="relative">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-transparent to-purple-500/10"></div>

          <div className="relative flex flex-col md:flex-row items-center gap-6 p-6 md:p-8 border-b border-white/20">

            {/* Avatar */}
            <div className="relative group">
              <div className="w-32 h-32 overflow-hidden border-4 border-white/30 shadow-2xl">
                <img
                  src={user.photoUrl}
                  alt="Profile"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-orange-400 flex items-center justify-center">
                <Zap size={16} className="text-white" strokeWidth={2.5} />
              </div>
            </div>

            {/* Basic Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-[0.15em] text-white sm:text-black">
                {user.firstName}{" "}
                <span className="text-orange-400">{user.lastName}</span>
              </h1>

              {/* Profession */}
              <p className="mt-2 text-sm font-bold uppercase tracking-[0.12em] text-white/90 sm:text-black/90 flex items-center justify-center md:justify-start gap-2">
                <Briefcase size={14} strokeWidth={2.5} className="text-orange-400" />
                {user.profession || "Exploring life"}
              </p>

              {/* Headline */}
              {user.headline && (
                <p className="mt-2 text-xs text-white/80 sm:text-black/80 italic flex items-center justify-center md:justify-start gap-2">
                  <Quote size={12} className="text-orange-400" />
                  {user.headline}
                </p>
              )}

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
                <div className="px-3 py-1.5 backdrop-blur-md bg-white/10 border border-white/20 text-white sm:text-black text-[10px] uppercase tracking-[0.12em] font-bold flex items-center gap-1.5">
                  <Users size={12} strokeWidth={2.5} />
                  <span>{user.connections?.length || 0} Connections</span>
                </div>

                {user.age && (
                  <div className="px-3 py-1.5 backdrop-blur-md bg-white/10 border border-white/20 text-white sm:text-black text-[10px] uppercase tracking-[0.12em] font-bold flex items-center gap-1.5">
                    <Calendar size={12} strokeWidth={2.5} />
                    <span>{user.age} Years</span>
                  </div>
                )}

                <div className="px-3 py-1.5 backdrop-blur-md bg-white/10 border border-white/20 text-white sm:text-black text-[10px] uppercase tracking-[0.12em] font-bold flex items-center gap-1.5">
                  <UserIcon size={12} strokeWidth={2.5} />
                  <span>{user.gender}</span>
                </div>

                <div className="px-3 py-1.5 backdrop-blur-md bg-white/10 border border-white/20 text-white sm:text-black text-[10px] uppercase tracking-[0.12em] font-bold flex items-center gap-1.5">
                  <CalendarDays size={12} strokeWidth={2.5} />
                  <span>Joined {new Date(user.createdAt).getFullYear()}</span>
                </div>

                <div className="px-3 py-1.5 backdrop-blur-md bg-white/10 border border-white/20 text-white sm:text-black text-[10px] uppercase tracking-[0.12em] font-bold flex items-center gap-1.5">
                  <Globe size={12} strokeWidth={2.5} />
                  <span>Available</span>
                </div>
              </div>
            </div>

            {/* Action Buttons with Slide Animation */}
            <div className="flex gap-2">
              <Link
                to="/editProfile"
                className="relative px-5 py-2.5 text-white sm:text-black text-[10px] uppercase tracking-[0.15em] font-bold
                         overflow-hidden group transition-colors duration-300
                         border border-white/30 backdrop-blur-md"
              >
                <span className="absolute inset-0 bg-white transform -translate-x-full
                               group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                <span className="relative z-10 flex items-center gap-2 group-hover:text-black transition-colors duration-300">
                  <Edit3 size={14} strokeWidth={2.5} />
                  <span>Edit</span>
                </span>
              </Link>

              <button className="relative px-5 py-2.5 text-white sm:text-black text-[10px] uppercase tracking-[0.15em] font-bold
                               overflow-hidden group transition-colors duration-300
                               border border-white/30 backdrop-blur-md">
                <span className="absolute inset-0 bg-white transform -translate-x-full
                               group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                <span className="relative z-10 flex items-center gap-2 group-hover:text-black transition-colors duration-300">
                  <Share2 size={14} strokeWidth={2.5} />
                  <span>Share</span>
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* ================= CONTENT SECTION ================= */}
        <div className="p-6 md:p-8 space-y-6">

          {/* Email Card */}
          <div className="group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center gap-4 backdrop-blur-md bg-white/5 border border-white/20 p-5">
              <div className="p-3 bg-orange-400 flex items-center justify-center">
                <Mail size={18} className="text-white" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-[0.15em] font-bold text-orange-400 mb-1">
                  Email Address
                </p>
                <p className="font-bold text-sm text-white sm:text-black tracking-wide">{user.email}</p>
              </div>
            </div>
          </div>

          {/* About Section */}
          <section>
            <h2 className="flex items-center gap-2.5 text-base font-bold uppercase tracking-[0.15em] mb-4 text-orange-400">
              <Sparkles size={16} strokeWidth={2.5} />
              About Me
            </h2>
            <div className="backdrop-blur-md bg-white/5 border border-white/20 p-5">
              <p className="text-sm leading-relaxed text-white sm:text-black/90 font-medium">
                {user.about || "No bio added yet. Share your story with the community!"}
              </p>
            </div>
          </section>

          {/* Skills Section */}
          {user.skills && user.skills.length > 0 && (
            <section>
              <h2 className="flex items-center gap-2.5 text-base font-bold uppercase tracking-[0.15em] mb-4 text-orange-400">
                <Terminal size={16} strokeWidth={2.5} />
                Skills & Expertise
              </h2>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="relative px-4 py-2 text-white sm:text-black text-[10px] uppercase tracking-[0.12em] font-bold
                             overflow-hidden group transition-colors duration-300
                             border border-white/30 backdrop-blur-md cursor-pointer"
                  >
                    <span className="absolute inset-0 bg-orange-400 transform -translate-x-full
                                   group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                    <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Social Media Links Section */}
          {(user.socialMedia?.github || user.socialMedia?.linkedin || user.socialMedia?.twitter) && (
            <section>
              <h2 className="flex items-center gap-2.5 text-base font-bold uppercase tracking-[0.15em] mb-4 text-orange-400">
                <Globe size={16} strokeWidth={2.5} />
                Social Media
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">

                {/* GitHub */}
                {user.socialMedia?.github && (
                  <a
                    href={user.socialMedia.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative px-5 py-4 text-white sm:text-black text-[10px] uppercase tracking-[0.15em] font-bold
                             overflow-hidden group transition-colors duration-300
                             border border-white/30 backdrop-blur-md"
                  >
                    <span className="absolute inset-0 bg-black transform -translate-x-full
                                   group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                    <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                      <Github size={16} strokeWidth={2.5} />
                      <span>GitHub</span>
                    </span>
                  </a>
                )}

                {/* LinkedIn */}
                {user.socialMedia?.linkedin && (
                  <a
                    href={user.socialMedia.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative px-5 py-4 text-white sm:text-black text-[10px] uppercase tracking-[0.15em] font-bold
                             overflow-hidden group transition-colors duration-300
                             border border-white/30 backdrop-blur-md"
                  >
                    <span className="absolute inset-0 bg-blue-600 transform -translate-x-full
                                   group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                    <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                      <Linkedin size={16} strokeWidth={2.5} />
                      <span>LinkedIn</span>
                    </span>
                  </a>
                )}

                {/* Twitter/X */}
                {user.socialMedia?.twitter && (
                  <a
                    href={user.socialMedia.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative px-5 py-4 text-white sm:text-black text-[10px] uppercase tracking-[0.15em] font-bold
                             overflow-hidden group transition-colors duration-300
                             border border-white/30 backdrop-blur-md"
                  >
                    <span className="absolute inset-0 bg-black transform -translate-x-full
                                   group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                    <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                      <Twitter size={16} strokeWidth={2.5} />
                      <span>Twitter / X</span>
                    </span>
                  </a>
                )}
              </div>
            </section>
          )}

          {/* Account Details Section */}
          <section>
            <h2 className="flex items-center gap-2.5 text-base font-bold uppercase tracking-[0.15em] mb-4 text-orange-400">
              <UserIcon size={16} strokeWidth={2.5} />
              Account Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

              {/* User ID */}
              <div className="backdrop-blur-md bg-white/5 border border-white/20 p-4">
                <p className="text-[9px] uppercase tracking-[0.15em] font-bold text-orange-400 mb-2">
                  User ID
                </p>
                <p className="text-xs text-white sm:text-black font-mono break-all">{user._id}</p>
              </div>

              {/* Created At */}
              <div className="backdrop-blur-md bg-white/5 border border-white/20 p-4">
                <p className="text-[9px] uppercase tracking-[0.15em] font-bold text-orange-400 mb-2">
                  Member Since
                </p>
                <p className="text-xs text-white sm:text-black font-semibold">
                  {new Date(user.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>

              {/* Updated At */}
              <div className="backdrop-blur-md bg-white/5 border border-white/20 p-4">
                <p className="text-[9px] uppercase tracking-[0.15em] font-bold text-orange-400 mb-2">
                  Last Updated
                </p>
                <p className="text-xs text-white sm:text-black font-semibold">
                  {new Date(user.updatedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>

              {/* Photo Public ID (if exists) */}
              {user.photoPublicId && (
                <div className="backdrop-blur-md bg-white/5 border border-white/20 p-4">
                  <p className="text-[9px] uppercase tracking-[0.15em] font-bold text-orange-400 mb-2">
                    Photo ID
                  </p>
                  <p className="text-xs text-white sm:text-black font-mono break-all">{user.photoPublicId}</p>
                </div>
              )}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
