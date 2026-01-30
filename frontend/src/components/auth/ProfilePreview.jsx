import { User, Github, Linkedin, Twitter, Users } from "lucide-react";
import { useState } from "react";

function ProfilePreview({ user }) {
  const [showMoreSkills, setShowMoreSkills] = useState(false);

  if (!user) return null;

  function handleMoreOrLess() {
    setShowMoreSkills((previousState) => !previousState);
  }

  return (
    <div className="mb-8 pb-6 border-b border-neutral-content/10">
      <h3 className="text-[9px] font-bold text-neutral-content uppercase tracking-widest opacity-50 mb-4">
        Current Profile
      </h3>

      {/* Profile Photo */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-base-200 overflow-hidden border-2 border-primary/30 flex-shrink-0">
          {user.photoUrl ? (
            <img
              src={user.photoUrl}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-primary">
              <User size={32} />
            </div>
          )}
        </div>
        <div>
          <h4 className="text-base font-bold text-neutral-content">
            {user.firstName} {user.lastName}
          </h4>
          <p className="text-[10px] text-neutral-content/60">{user.email}</p>
        </div>
      </div>

      {/* User Details */}
      <div className="space-y-3">
        {/* ✅ CONNECTION COUNT */}
        {user.connectionCount !== undefined && (
          <div className="bg-neutral-content/5 rounded-lg p-2 px-3">
            <p className="text-[8px] uppercase tracking-widest text-neutral-content/50 font-bold">
              Connections
            </p>
            <p className="text-xs text-neutral-content mt-0.5 flex items-center gap-1">
              <Users size={12} /> {user.connectionCount} connections
            </p>
          </div>
        )}

        {user.headline && (
          <div className="bg-neutral-content/5 rounded-lg p-2 px-3">
            <p className="text-[8px] uppercase tracking-widest text-neutral-content/50 font-bold">
              Headline
            </p>
            <p className="text-xs text-neutral-content mt-0.5">
              {user.headline}
            </p>
          </div>
        )}

        {user.profession && (
          <div className="bg-neutral-content/5 rounded-lg p-2 px-3">
            <p className="text-[8px] uppercase tracking-widest text-neutral-content/50 font-bold">
              Profession
            </p>
            <p className="text-xs text-neutral-content capitalize mt-0.5">
              {user.profession}
            </p>
          </div>
        )}

        {user.gender && (
          <div className="bg-neutral-content/5 rounded-lg p-2 px-3">
            <p className="text-[8px] uppercase tracking-widest text-neutral-content/50 font-bold">
              Gender
            </p>
            <p className="text-xs text-neutral-content capitalize mt-0.5">
              {user.gender}
            </p>
          </div>
        )}

        {user.age && (
          <div className="bg-neutral-content/5 rounded-lg p-2 px-3">
            <p className="text-[8px] uppercase tracking-widest text-neutral-content/50 font-bold">
              Age
            </p>
            <p className="text-xs text-neutral-content mt-0.5">
              {user.age} years
            </p>
          </div>
        )}

        {user.about && (
          <div className="bg-neutral-content/5 rounded-lg p-2 px-3">
            <p className="text-[8px] uppercase tracking-widest text-neutral-content/50 font-bold">
              About
            </p>
            <p className="text-[10px] text-neutral-content/80 mt-0.5 leading-relaxed">
              {user.about.length > 100
                ? user.about.substring(0, 100) + "..."
                : user.about}
            </p>
          </div>
        )}

        {/* ✅ SOCIAL MEDIA LINKS - FIXED */}
        {(user.socialMedia?.github || user.socialMedia?.linkedin || user.socialMedia?.twitter) && (
          <div className="bg-neutral-content/5 rounded-lg p-2 px-3">
            <p className="text-[8px] uppercase tracking-widest text-neutral-content/50 font-bold mb-2">
              Social Media
            </p>
            <div className="flex gap-2">
              {user.socialMedia?.github && (
                <a
                  href={user.socialMedia.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-xs"
                >
                  <Github size={14} />
                </a>
              )}
              {user.socialMedia?.linkedin && (
                <a
                  href={user.socialMedia.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-xs"
                >
                  <Linkedin size={14} />
                </a>
              )}
              {user.socialMedia?.twitter && (
                <a
                  href={user.socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-xs"
                >
                  <Twitter size={14} />
                </a>
              )}
            </div>
          </div>
        )}

        {user.skills && user.skills.length > 0 && (
          <div className="bg-neutral-content/5 rounded-lg p-2 px-3">
            <p className="text-[8px] uppercase tracking-widest text-neutral-content/50 font-bold mb-1.5">
              Skills
            </p>
            <div className="flex flex-wrap gap-1">
              {user.skills
                .slice(0, showMoreSkills ? user.skills.length : 5)
                .map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 bg-primary/20 text-primary rounded text-[9px] font-medium"
                  >
                    {skill}
                  </span>
                ))}

              {user.skills.length > 5 && (
                <span
                  onClick={handleMoreOrLess}
                  className="px-2 cursor-pointer py-0.5 bg-neutral-content/10 text-neutral-content/60 rounded text-[9px] font-medium"
                >
                  {showMoreSkills
                    ? "show less"
                    : `+${user.skills.length - 5} more`}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePreview;
