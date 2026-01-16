import React from "react";

function ConnectionListCard({ profile }) {
  const { firstName, lastName, photoUrl, skills } = profile;
  console.log(skills);
  
  return (
    <li className="flex items-center gap-4 p-4 hover:bg-base-200 cursor-pointer transition-colors border-b border-base-300">
      {/* 🔍 Avatar Section */}
      <div className="avatar online">
        <div className="w-14 rounded-full">
          <img src={photoUrl} alt={`${firstName}'s profile`} />
        </div>
      </div>

      {/* 📝 Content Section */}
      <div className="flex-1">
        <div className="flex justify-between items-baseline">
          <h3 className="font-bold text-lg">
            {firstName} {lastName}
          </h3>
          <span className="text-xs opacity-50">12:45 PM</span>
        </div>

        <div className="flex flex-wrap gap-1 mt-1">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="badge badge-outline badge-sm text-primary"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </li>
  );
}

export default ConnectionListCard;
