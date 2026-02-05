import React, { useState, useEffect } from "react";

const LandingPage = () => {
  const [loading, setLoading] = useState(true);
  const [shutterOpen, setShutterOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => setShutterOpen(true), 100);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-screen w-full bg-[#0a0a0a] overflow-hidden font-serif">
      {loading ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a]">
          <div
            className="h-[1px] bg-white/40"
            style={{
              width: "0px",
              animation: "expandLine 2s ease-in-out forwards",
            }}
          />
        </div>
      ) : (
        <>
          {/* SHUTTER EFFECT */}
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

          {/* MAIN WRAPPER */}
          <div className="relative h-full w-full flex items-center justify-center px-6 sm:px-12 md:px-32">

            {/* BACKGROUND WITH LIGHTER MOBILE OVERLAY */}
            <div className="absolute inset-0 z-10">
              {/* MOBILE IMAGE */}
              <img
                src="assets/hero-sm-bg.png"
                className="w-full h-full object-cover block sm:hidden"
                alt="Mobile Background"
              />

              {/* DESKTOP IMAGE */}
              <img
                src="assets/hero-bg.jpg"
                className="w-full h-full object-cover hidden sm:block"
                alt="Desktop Background"
              />

              {/* LIGHTER OVERLAY - Mobile (image more visible, low light effect) */}
              <div className="absolute inset-0 sm:hidden bg-gradient-to-b from-black/0 via-black/60 to-black/99" />
              <div className="absolute inset-0 sm:hidden bg-[#D4691B]/10 mix-blend-overlay" />
              <div className="absolute inset-0 sm:hidden bg-[#E8A05D]/10 mix-blend-soft-light" />

              {/* Text Shadow Background for Better Readability */}
              <div className="absolute inset-0 sm:hidden bg-gradient-to-b from-transparent via-black/20 to-transparent" />

              {/* WARM EDITORIAL FILM-LIKE OVERLAY - Desktop */}
              <div className="absolute inset-0 hidden sm:block bg-gradient-to-r from-black/80 via-black/40 to-black/80" />
              <div className="absolute inset-0 hidden sm:block bg-[#8B7355]/12 mix-blend-overlay" />
              <div className="absolute inset-0 hidden sm:block bg-[#C9A875]/6 mix-blend-soft-light" />

              {/* Film Grain Texture */}
              <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                backgroundRepeat: 'repeat'
              }} />
            </div>

            {/* GEOMETRIC ACCENTS */}
            <div className="absolute inset-0 z-20 pointer-events-none">
              {/* Circle */}
              <div className="absolute top-1/2 left-[5%] sm:left-[8%] -translate-y-1/2 w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] md:w-[320px] md:h-[320px] border border-white/10 rounded-full" />

              {/* Vertical Line for Mobile */}
              <div
                className="absolute top-[15%] left-[18%] w-[1px] bg-[#ff4d00] origin-top opacity-70 block sm:hidden"
                style={{
                  height: '0px',
                  animation: 'growLine 2s ease-out 1.5s forwards'
                }}
              />

              {/* Diagonal Line for Desktop */}
              <div
                className="absolute top-[15%] left-[24%] md:left-[28%] w-[1px] bg-[#ff4d00] origin-top rotate-[10deg] opacity-70 hidden sm:block"
                style={{
                  height: '0px',
                  animation: 'growLine 2s ease-out 1.5s forwards'
                }}
              />

              {/* Horizontal Baseline Guide */}
              <div className="absolute top-[60%] left-0 w-full h-[0.5px] bg-white/5" />
            </div>

            {/* NAVBAR */}
            <nav className="absolute top-6 sm:top-8 left-0 right-0 z-40 flex justify-between items-center px-6 sm:px-12 md:px-32 text-white/70 sm:text-white/60 text-[7px] sm:text-[9px] uppercase tracking-[0.3em] sm:tracking-[0.5em] font-sans">
              <a href="https://github.com/Raushan102" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors drop-shadow-lg">
                GitHub
              </a>
              <div  className="hidden sm:block hover:text-white transition-colors">
                Raushan Kumar Saw
              </div>
              <div className="block sm:hidden hover:text-white transition-colors drop-shadow-lg">RKS</div>
              <a href="https://www.linkedin.com/in/raushan-kumar-saw-39067b261/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors drop-shadow-lg">
                LinkedIn
              </a>
            </nav>

            {/* MAIN CONTENT - DESKTOP LAYOUT */}
            <div className="relative z-30 w-full hidden sm:flex flex-row justify-between items-end pb-32">

              {/* LEFT: Name Layout - Desktop */}
              <div
                className="flex flex-col text-left ml-16 md:ml-40"
                style={{
                  opacity: 0,
                  animation: "fadeInLeft 1.2s ease-out 1.8s forwards",
                }}
              >
                <div className="text-white text-[9px] uppercase tracking-[0.7em] font-sans mb-4 flex items-center gap-3">
                  <span>From</span>
                  <span className="w-8 h-[1px] bg-white/20"></span>
                </div>
                <div className="text-white text-[9px] uppercase tracking-[0.5em] font-sans mb-6">
                  The Creator
                </div>
                <h1 className="text-white text-5xl md:text-7xl tracking-tighter leading-tight">
                  Raushan <br />
                  <span className="ml-8 italic font-light text-white/70">Kumar Saw</span>
                </h1>
                <p className="mt-4 text-white/40 text-xl font-serif italic">presents</p>
              </div>

              {/* RIGHT: Project Focus - Desktop */}
              <div
                className="flex flex-col items-end text-right"
                style={{
                  opacity: 0,
                  animation: "fadeInRight 1.2s ease-out 2s forwards",
                }}
              >
                <h2 className="text-white text-4xl md:text-5xl tracking-tight font-light mb-2">
                  DevTinder
                </h2>
                <p className="text-white/40 text-xs uppercase tracking-[0.4em] font-sans mb-8">Project</p>

                <a href="/devtinder/login" className="px-12 py-4 border border-white/20 bg-white/10 backdrop-blur-2xl uppercase tracking-[0.4em] text-[9px] text-white font-semibold transition-all duration-700 font-sans hover:bg-white hover:text-black hover:border-white shadow-lg hover:shadow-2xl hover:scale-105">
                  Launch Project
                </a>
              </div>
            </div>

            {/* MAIN CONTENT - MOBILE LAYOUT (with text shadows for readability) */}
            <div className="relative z-30 w-full flex sm:hidden flex-col items-center justify-center text-center h-full">

              {/* Name Layout - Mobile Centered */}
              <div
                className="flex flex-col items-center"
                style={{
                  opacity: 0,
                  animation: "fadeInUp 1.2s ease-out 1.8s forwards",
                }}
              >
                <div className="text-white text-[8px] uppercase tracking-[0.6em] font-sans mb-3 flex items-center gap-2 drop-shadow-lg">
                  <span>From The</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="inline-block">
                    <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" fill="currentColor" opacity="0.6"/>
                  </svg>
                  <span>Creator</span>
                </div>

                <h1 className="text-white/30 font-serif text-5xl tracking-tight leading-tight mb-1 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                  Raushan
                </h1>

                <p className="text-white/50 text-base font-serif italic mb-12 drop-shadow-lg">presents</p>

                {/* Project Info - Mobile */}
                <div className="flex flex-col items-center mt-6">
                  <h2 className="text-white text-4xl tracking-tight font-light mb-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                    DevTinder
                  </h2>
                  <p className="text-white/60 text-[9px] uppercase tracking-[0.4em] font-sans mb-8 drop-shadow-lg">Project</p>

                  <a href="/devtinder/login" className="px-16 py-4 border border-white bg-white/15 backdrop-blur-2xl uppercase tracking-[0.4em] text-[9px] transition-all duration-700 font-sans hover:bg-white text-white font-extrabold hover:border-white shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                    Launch Project
                  </a>
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <footer className="absolute bottom-6 sm:bottom-10 w-full z-[60] px-6 sm:px-12 md:px-32 flex justify-between items-center text-white/30 text-[7px] sm:text-[8px] uppercase tracking-[0.3em] sm:tracking-[0.5em] font-sans">
              <div></div>
              <div></div>
            </footer>
          </div>
        </>
      )}

      {/* ANIMATIONS */}
      <style>{`
        @keyframes expandLine {
          0% { width: 0px; }
          100% { width: 180px; }
        }

        @keyframes growLine {
          0% { height: 0px; }
          100% { height: 350px; }
        }

        @media (min-width: 640px) {
          @keyframes growLine {
            0% { height: 0px; }
            100% { height: 450px; }
          }
        }

        @media (min-width: 768px) {
          @keyframes growLine {
            0% { height: 0px; }
            100% { height: 500px; }
          }
        }

        @keyframes fadeInLeft {
          0% {
            opacity: 0;
            transform: translateX(-30px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          0% {
            opacity: 0;
            transform: translateX(30px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
