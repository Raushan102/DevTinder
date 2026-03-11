import React from "react";
import { User, Briefcase, Crown } from "lucide-react";
import { motion } from "framer-motion";

function ConnectionListCard({ profile, onSelectprofile, isActive }) {
  const { firstName, lastName, photoUrl, skills, about } = profile;

  // Fallback profession if not explicitly in your schema
  const profession = profile.profession || "Developer";

  return (
    <motion.li
      whileHover={{ backgroundColor: "rgba(255,255,255,0.4)", x: 4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelectprofile(profile)}
      className={`
        flex items-start gap-4 p-5 cursor-pointer transition-all duration-500
        border-b border-white/20 backdrop-blur-md
        ${isActive ? 'border-l-4 border-l-black' : ''}
      `}
      style={{
        backgroundImage: isActive
          ? 'linear-gradient(to right, rgba(255,255,255,0.5), rgba(255,255,255,0.3))'
          : 'linear-gradient(to right, rgba(255,255,255,0.15), rgba(255,255,255,0.05))'
      }}
    >
      {/* 🖼️ Sharp Avatar */}
      <div className={`w-14 h-14 flex-shrink-0 border-2 transition-all duration-500 overflow-hidden shadow-sm ${profile.isPremium
        ? 'border-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]'
        : (isActive ? 'border-black scale-105 shadow-xl' : 'border-white/50')
        }`}>
        {photoUrl ? (
          <img src={photoUrl} alt={firstName} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-white/20">
            <User className="text-black/40" size={20} />
          </div>
        )}
      </div>

      {/* 📝 Info Section */}
      <div className="flex-1 min-w-0 ">
        <div className="flex justify-between items-start">
          <div>
            <h3 className={`font-black text-xs sm:text-sm uppercase tracking-widest truncate flex items-center gap-1 ${isActive ? 'text-black' : 'text-black/90'}`}>
              {firstName} {lastName}
              {profile.isPremium && <Crown size={12} className="text-amber-500 fill-amber-500" />}
            </h3>
            {/* 🛠️ PROFESSION DISPLAY */}
            <p className="text-[9px] font-bold text-black/50 uppercase tracking-widest flex items-center gap-1 mt-0.5">
              <Briefcase size={8} /> {profession}
            </p>
          </div>
          <span className="text-[7px] font-black text-black/30 uppercase tracking-tighter mt-1">Active Now</span>
        </div>

        {/* 🏷️ 5 SKILLS - EXTRA SMALL SIZE */}
        <div className="flex flex-wrap gap-1 mt-3">
          {skills && skills.length > 0 ? (
            skills.slice(0, 5).map((skill, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03 }}
                className="px-1.5 py-0.5 bg-white/30 border border-white/40 text-[7px] font-black uppercase tracking-tighter text-black/80 shadow-sm"
              >
                {skill}
              </motion.span>
            ))
          ) : (
            <span className="text-[7px] text-black/30 uppercase italic">No skills listed</span>
          )}

          {skills?.length > 5 && (
            <span className="text-[7px] font-black text-black/40 self-center ml-1">
              +{skills.length - 5}
            </span>
          )}
        </div>
      </div>

      {/* ✓ Indicator */}
      {isActive && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-black font-black text-xs ml-2"
        >
          ●
        </motion.div>
      )}
    </motion.li>
  );
}

export default ConnectionListCard;
