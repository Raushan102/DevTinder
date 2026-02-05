import { User, Github, Linkedin, Twitter, Users, Sparkles, Terminal, Mail, Briefcase, Quote, Calendar, UserIcon as UserGenderIcon } from "lucide-react";
import { useState } from "react";

function ProfilePreview({ user }) {
  const [showMoreSkills, setShowMoreSkills] = useState(false);

  if (!user) return null;

  function handleMoreOrLess() {
    setShowMoreSkills((previousState) => !previousState);
  }

  return (
    <div className="space-y-4">
      {/* Profile Photo & Basic Info */}
      <div className="flex flex-col items-center text-center mb-6">
        <div className="w-24 h-24 overflow-hidden border-4 border-white/30 shadow-2xl mb-4">
          {user.photoUrl ? (
            <img src={user.photoUrl} alt={`${user.firstName} ${user.lastName}`} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-white/10">
              <User size={40} className="text-white sm:text-black" />
            </div>
          )}
        </div>

        <h3 className="text-2xl font-bold uppercase tracking-[0.15em] text-white sm:text-black">
          {user.firstName} <span className="text-orange-400">{user.lastName}</span>
        </h3>

        {user.profession && (
          <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-white/90 sm:text-black/90 flex items-center gap-2">
            <Briefcase size={12} strokeWidth={2.5} className="text-orange-400" />
            {user.profession}
          </p>
        )}

        {user.headline && (
          <p className="mt-2 text-xs text-white/80 sm:text-black/80 italic flex items-center gap-2">
            <Quote size={12} className="text-orange-400" />
            {user.headline}
          </p>
        )}
      </div>

      {/* Quick Stats */}
      <div className="flex flex-wrap gap-2 justify-center">
        {user.connections && (
          <div className="px-3 py-1.5 backdrop-blur-md bg-white/10 border border-white/20 text-white sm:text-black text-[10px] uppercase tracking-[0.12em] font-bold flex items-center gap-1.5">
            <Users size={12} strokeWidth={2.5} />
            <span>{user.connections.length || 0} Connections</span>
          </div>
        )}

        {user.age && (
          <div className="px-3 py-1.5 backdrop-blur-md bg-white/10 border border-white/20 text-white sm:text-black text-[10px] uppercase tracking-[0.12em] font-bold flex items-center gap-1.5">
            <Calendar size={12} strokeWidth={2.5} />
            <span>{user.age} Years</span>
          </div>
        )}

        {user.gender && (
          <div className="px-3 py-1.5 backdrop-blur-md bg-white/10 border border-white/20 text-white sm:text-black text-[10px] uppercase tracking-[0.12em] font-bold flex items-center gap-1.5">
            <UserGenderIcon size={12} strokeWidth={2.5} />
            <span>{user.gender}</span>
          </div>
        )}
      </div>

      {/* Email */}
      {user.email && (
        <div className="backdrop-blur-md bg-white/5 border border-white/20 p-4">
          <p className="text-[9px] uppercase tracking-[0.15em] font-bold text-orange-400 mb-2 flex items-center gap-2">
            <Mail size={12} strokeWidth={2.5} />
            Email
          </p>
          <p className="text-xs text-white sm:text-black font-semibold break-all">{user.email}</p>
        </div>
      )}

      {/* About */}
      {user.about && (
        <div className="backdrop-blur-md bg-white/5 border border-white/20 p-4">
          <p className="text-[9px] uppercase tracking-[0.15em] font-bold text-orange-400 mb-2 flex items-center gap-2">
            <Sparkles size={12} strokeWidth={2.5} />
            About
          </p>
          <p className="text-xs text-white sm:text-black/90 leading-relaxed">
            {user.about.length > 150 ? user.about.substring(0, 150) + "..." : user.about}
          </p>
        </div>
      )}

      {/* Skills */}
      {user.skills && user.skills.length > 0 && (
        <div className="backdrop-blur-md bg-white/5 border border-white/20 p-4">
          <p className="text-[9px] uppercase tracking-[0.15em] font-bold text-orange-400 mb-3 flex items-center gap-2">
            <Terminal size={12} strokeWidth={2.5} />
            Skills
          </p>
          <div className="flex flex-wrap gap-2">
            {user.skills.slice(0, showMoreSkills ? user.skills.length : 6).map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-orange-400/20 text-orange-400 border border-orange-400/30 text-[10px] font-bold uppercase tracking-[0.1em]"
              >
                {skill}
              </span>
            ))}

            {user.skills.length > 6 && (
              <button
                onClick={handleMoreOrLess}
                className="px-3 py-1.5 bg-white/10 text-white sm:text-black border border-white/20 text-[10px] font-bold uppercase tracking-[0.1em] hover:bg-white/20 transition-colors"
              >
                {showMoreSkills ? "Show Less" : `+${user.skills.length - 6} More`}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Social Media */}
      {(user.socialMedia?.github || user.socialMedia?.linkedin || user.socialMedia?.twitter) && (
        <div className="backdrop-blur-md bg-white/5 border border-white/20 p-4">
          <p className="text-[9px] uppercase tracking-[0.15em] font-bold text-orange-400 mb-3">Social Media</p>
          <div className="flex gap-3 justify-center">
            {user.socialMedia?.github && (
              <a
                href={user.socialMedia.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                <Github size={18} strokeWidth={2.5} />
              </a>
            )}
            {user.socialMedia?.linkedin && (
              <a
                href={user.socialMedia.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <Linkedin size={18} strokeWidth={2.5} />
              </a>
            )}
            {user.socialMedia?.twitter && (
              <a
                href={user.socialMedia.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                <Twitter size={18} strokeWidth={2.5} />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePreview;
