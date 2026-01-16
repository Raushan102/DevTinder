import React from "react";
import ConnectionListCard from "./ConnectionListCard";
import Loader from "../util/Loader";
import { useNavigate } from "react-router-dom";

function ConnectionList({ profiles, loading }) {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-base-100 h-full overflow-y-auto nice-scrollbar">
      {loading && (
        <div className="flex justify-center items-center h-full">
          <Loader />
        </div>
      )}

      {/* 🔍 Empty State */}
      {profiles.length <= 0 && !loading && (
        <div className="flex flex-col items-center justify-center h-full p-6 text-center">
          <div className="text-6xl mb-4">🤝</div>
          <h1 className="text-2xl font-bold opacity-80">No connections yet</h1>
          <p className="py-4 opacity-60">Start exploring the feed to connect with developers!</p>
          <button
            className="btn btn-primary rounded-full px-8"
            onClick={() => navigate("/feed")}
          >
            Explore Feed
          </button>
        </div>
      )}

      {/* 📌 Scrollable List Section */}
      {profiles.length > 0 && !loading && (
        <div className="w-full">
          <div className="sticky top-0 bg-base-100/90 backdrop-blur-md z-10 border-b border-base-300">
            <h2 className="text-xl font-bold p-5">Messages</h2>
          </div>

          <ul className="divide-y divide-base-300 w-full">
            {profiles.map((profile) => (
              <ConnectionListCard key={profile._id} profile={profile} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ConnectionList;
