import React, { useState, useEffect } from "react";
import { Mail, Phone, ArrowUpRight, Github, Linkedin } from "lucide-react";

const TeamPage = () => {
  const [shutterOpen, setShutterOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShutterOpen(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-transparent overflow-x-hidden font-serif">
      {/* SHUTTER TRANSITION */}
      <div
        className="fixed inset-0 z-[90] bg-[#0a0a0a]"
        style={{
          height: "50%",
          transform: shutterOpen ? "translateY(-100%)" : "translateY(0)",
          transition: "transform 1.2s cubic-bezier(0.76,0,0.24,1)",
        }}
      />
      <div
        className="fixed bottom-0 left-0 right-0 z-[90] bg-[#0a0a0a]"
        style={{
          height: "50%",
          transform: shutterOpen ? "translateY(100%)" : "translateY(0)",
          transition: "transform 1.2s cubic-bezier(0.76,0,0.24,1)",
        }}
      />

      {/* GEOMETRIC ACCENTS */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {/* ANIMATED CIRCLE - Adapts border color to device */}
        <div className="absolute top-1/2 left-1/2 md:left-[15%] -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[400px] md:h-[400px] border border-[#ff4d00] md:border-[#ff4d00] rounded-full"
             style={{ animation: 'floatCircle 6s ease-in-out infinite' }} />

        {/* DIAGONAL LINE - Hidden on mobile, Black on desktop */}
        <div
          className="absolute top-[14%] left-[24%] w-[2px] bg-[#ff4d00] origin-top rotate-[25deg] opacity-40 hidden md:block"
          style={{
            height: '0px',
            animation: 'growLine 2s ease-out 0.8s forwards'
          }}
        />
      </div>

      {/* MAIN WRAPPER - Text White on mobile, Black on Desktop */}
      <div className="relative z-30 min-h-screen w-full flex flex-col items-center justify-center px-6 sm:px-12 md:px-32 py-20 text-white md:text-black">

        {/* NAVBAR */}
        <nav className="absolute top-8 left-0 right-0 z-40 flex justify-between items-center px-6 sm:px-12 md:px-32 text-[9px] uppercase tracking-[0.5em] font-bold">
          <a href="https://github.com/Raushan102" target="_blank" rel="noreferrer" className="hover:text-[#ff4d00] transition-colors flex items-center gap-2">
            <Github size={14}/> GITHUB
          </a>
          <div className="italic tracking-[0.2em] opacity-50">THE CREATOR</div>
          <a href="https://www.linkedin.com/in/raushan-kumar-saw-39067b261/" target="_blank" rel="noreferrer" className="hover:text-[#ff4d00] transition-colors flex items-center gap-2">
            LINKEDIN <Linkedin size={14}/>
          </a>
        </nav>

        {/* CONTENT */}
        <div className="relative w-full flex flex-col md:flex-row justify-between items-center md:items-end gap-16 md:gap-0">

          {/* LEFT: IDENTITY */}
          <div
            className="flex flex-col text-center md:text-left"
            style={{ opacity: 0, animation: "fadeInUp 1.2s ease-out 1s forwards" }}
          >
            <div className="text-[#ff4d00] text-[10px] uppercase tracking-[0.8em] font-black mb-4 flex items-center justify-center md:justify-start gap-3">
              <span>FOUNDER</span>
              <span className="w-8 h-[1px] bg-current opacity-30"></span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-8xl tracking-tighter leading-[0.9] mb-8">
              Raushan <br />
              <span className="italic font-light opacity-70">Kumar Saw</span>
            </h1>

            <div className="space-y-3 opacity text-[10px] md:text-xs font-sans uppercase tracking-[0.2em]">
              <p className="flex items-center justify-center md:justify-start gap-3 text-white">
                <Mail size={14} className="text-[#ff4d00]"/> raushankumarsaw15@gmail.com
              </p>
              <p className="flex text-white items-center justify-center md:justify-start gap-3">
                <Phone size={14} className="text-[#ff4d00]"/> +91 8252341916
              </p>
            </div>
          </div>

          {/* RIGHT: CTA */}
          <div
            className="flex flex-col items-center md:items-end text-center md:text-right"
            style={{ opacity: 0, animation: "fadeInUp 1.2s ease-out 1.3s forwards" }}
          >
            <div className="mb-6 px-4 py-1.5 border border-[#ff4d00]/50 rounded-full">
               <span className="text-[#ff4d00] text-[9px] font-black uppercase tracking-[0.4em] animate-pulse">
                 ● OPEN FOR WORK
               </span>
            </div>

            <h2 className="text-4xl md:text-5xl tracking-tight font-light mb-8 leading-tight">
              DevTinder <br className="hidden md:block" /> Project
            </h2>

            <a href="mailto:raushankumarsaw15@gmail.com"
               className="group flex items-center gap-6 px-12 py-5 bg-black md:bg-white text-white md:text-black border border-current uppercase tracking-[0.5em] text-[10px] font-black transition-all duration-300 hover:bg-[#ff4d00] hover:text-white shadow-2xl">
              CONTACT ME <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes growLine {
          0% { height: 0px; }
          100% { height: 500px; }
        }

        @keyframes floatCircle {
          0%, 100% { transform: translate(-50%, -50%) translateY(0); }
          50% { transform: translate(-50%, -50%) translateY(-20px); }
        }

        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default TeamPage;
