import React from "react";

function ChartWindow() {
  return (
    <div className="hero min-h-[70vh] bg-base-200 rounded-3xl">
      <div className="hero-content text-center">
        <div className="max-w-md p-8 bg-base-100 shadow-xl rounded-2xl border border-primary/20">
          {/* 🔍 Icon/Visual */}
          <div className="text-6xl mb-6 animate-bounce">💬</div>

          <h1 className="text-3xl font-bold text-primary">Chat Feature</h1>
          <p className="py-6 text-lg opacity-70">
            We are currently building this chat feature to help you connect better!
          </p>

          {/* 📝 Apology Message */}
          <div className="bg-warning/10 text-warning-content p-4 rounded-lg mb-6 border border-warning/20">
            <p className="text-sm font-medium">
              We are sorry for the inconvenience, and we will add this feature soon.
            </p>
          </div>

          <progress className="progress progress-primary w-56"></progress>
          <p className="text-xs mt-2 opacity-50 uppercase tracking-widest">Development in progress</p>
        </div>
      </div>
    </div>
  );
}

export default ChartWindow;
