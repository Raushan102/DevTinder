import React from "react";
import ConnectionListCard from "./ConnectionListCard";
import Loader from "../util/Loader";
import { useNavigate } from "react-router-dom";
import { Users, Search } from "lucide-react";
import { motion } from "framer-motion";

function ConnectionList({ profiles, loading, onSelectprofile, currentChatProfile }) {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full overflow-y-auto flex flex-col backdrop-blur-xl bg-white/20 border-r border-white/30">
      {/* ============================
          ⏳ LOADING STATE
          ============================ */}
      {loading && (
        <div className="flex justify-center items-center h-full">
          <div className="flex gap-3">
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 0.8, delay: 0 }}
              className="w-3 h-3 bg-black border border-white/50 shadow-lg"
            />
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 0.8, delay: 0.15 }}
              className="w-3 h-3 bg-black border border-white/50 shadow-lg"
            />
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 0.8, delay: 0.3 }}
              className="w-3 h-3 bg-black border border-white/50 shadow-lg"
            />
          </div>
        </div>
      )}

      {/* ============================
          🔍 EMPTY STATE
          ============================ */}
      {profiles.length <= 0 && !loading && (
        <div className="flex flex-col items-center justify-center h-full p-6 text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-24 h-24 backdrop-blur-xl bg-white/20 border-2 border-white/30 flex items-center justify-center mb-8 shadow-2xl"
            style={{
              backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.25), rgba(255,255,255,0.15))',
            }}
          >
            <Users size={52} className="text-white sm:text-black" strokeWidth={1.5} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white sm:text-black text-2xl sm:text-3xl font-bold uppercase tracking-[0.2em] mb-4 drop-shadow-lg"
          >
            No Connections Yet
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white/80 sm:text-black/70 text-[10px] uppercase tracking-[0.15em] mb-8 font-bold"
          >
            Start exploring to connect with developers
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/feed")}
            className="px-8 py-3.5 backdrop-blur-xl bg-white/20 text-white sm:text-black text-[10px] uppercase tracking-[0.15em] font-bold border border-white/30 shadow-2xl transition-all duration-300 hover:bg-white/40"
            style={{
              backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.25), rgba(255,255,255,0.15))',
            }}
          >
            <span className="flex items-center justify-center gap-2.5">
              <Search size={14} strokeWidth={2.5} />
              <span>Explore Feed</span>
            </span>
          </motion.button>
        </div>
      )}

      {/* ============================
          📌 SCROLLABLE LIST SECTION
          ============================ */}
      {profiles.length > 0 && !loading && (
        <div className="w-full flex flex-col h-full mt-2 sm:mt-0">
          {/* Sticky Header */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="sticky top-0 backdrop-blur-xl bg-black/20 border-b border-white/30 z-10 px-6 py-6 shadow-xl"
            style={{
              backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.3), rgba(255,255,255,0.2))',
            }}
          >
            <h2
              className="text-white sm:text-black text-xl sm:text-2xl font-bold uppercase tracking-[0.2em] drop-shadow-lg"
            >
              Messages
            </h2>
            <p className="text-white/70 sm:text-black/60 text-[10px] uppercase tracking-[0.15em] mt-2 font-bold">
              {profiles.length} Connection{profiles.length !== 1 ? "s" : ""}
            </p>
          </motion.div>

          {/* Connection Cards List */}
          <ul className="flex-1 overflow-y-auto">
            {profiles.map((profile, index) => (
              <motion.div
                key={profile._id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{ x: 4 }}
              >
                <ConnectionListCard
                  profile={profile}
                  onSelectprofile={onSelectprofile}
                  isActive={currentChatProfile?._id === profile._id}
                />
              </motion.div>
            ))}
          </ul>
        </div>
      )}

      {/* ============================
          SCROLLBAR STYLES
          ============================ */}
      <style>{`
        /* Glassmorphism Scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.3);
          transition: all 0.3s ease;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.8);
          border-color: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
}

export default ConnectionList;
