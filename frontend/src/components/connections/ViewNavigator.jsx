import React from "react";
import { LayoutDashboard, MessageSquare } from "lucide-react";

function ViewNavigator({ currentView, onToggle }) {
  const isFeed = currentView;

  return (
    /* 📌 Fixed at the bottom corner with a small offset */
    <div className="absolute top-19 right-3 z-[100]">
      <button
        onClick={onToggle}
        className="group flex items-center bg-base-100/90 backdrop-blur-md border border-base-content/10 text-base-content p-1 rounded-full shadow-lg hover:bg-primary hover:text-primary-content transition-all duration-300 ease-in-out"
      >
        {/* 🔍 Small Icon Container */}
        <div className="p-1 rounded-lg bg-primary/10 group-hover:bg-white/20 transition-colors">
          {isFeed ? (
            <MessageSquare size={10} className="text-primary group-hover:text-white" />
          ) : (
            <LayoutDashboard size={10} className="text-primary group-hover:text-white" />
          )}
        </div>

        {/* 🛠️ Minimalist Expanding Text */}
        <div className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 ease-in-out">
          <span className="text-xs font-bold px-2 tracking-tight">
            {isFeed ? "Chat" : "Feed"}
          </span>
        </div>
      </button>
    </div>
  );
}

export default ViewNavigator;
