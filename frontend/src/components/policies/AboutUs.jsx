import React from 'react';
import { motion } from 'framer-motion';
import { Target, Zap, Shield, TrendingUp, Code, MessageCircle, ArrowUpRight,Users, Github, Linkedin } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-transparent selection:bg-black selection:text-white font-serif">

      {/* 1. CINEMATIC HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Watermark - Pure Black on Desktop */}
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.05] md:opacity-[0.08] select-none pointer-events-none">
          <h1 className="text-[35vw] font-black uppercase leading-none text-white md:text-black">DEV</h1>
        </div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 w-[85%] md:w-[650px] aspect-square flex flex-col items-center justify-center text-center p-12 backdrop-blur-xl bg-white/10 md:bg-white/5 border border-white/20 md:border-black/20 rounded-full shadow-2xl"
        >
          <div className="p-5 bg-black text-white rounded-full mb-8">
            <Code size={40} />
          </div>

          <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter text-white md:text-black leading-none">
            Dev<span className="md:text-black">Tinder</span>
          </h1>

          <p className="mt-8 text-[10px] md:text-sm font-black uppercase tracking-[0.6em] text-white md:text-black md:opacity-100">
            ESTABLISHED // 2024
          </p>
        </motion.div>
      </section>

      <div className="container mx-auto px-6 py-24 max-w-7xl">

        {/* 2. THE STORY - FULL BLACK TEXT FOR DESKTOP */}
        <div className="grid lg:grid-cols-2 gap-20 items-start mb-48">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-white md:text-black md:opacity-100"
          >
            <span className="text-[11px] font-black uppercase tracking-[0.5em] opacity-60 md:opacity-100">01. ORIGIN</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase mt-6 mb-10 leading-[0.9] italic">
              "WE BUILD FOR <br/>THE BUILDERS."
            </h2>
            <div className="h-2 w-24 bg-black"></div>
          </motion.div>

          <div className="space-y-8 text-sm md:text-xl font-black text-white md:text-black md:opacity-100 leading-tight uppercase tracking-tight">
            <p>
              DEVTINDER WAS BORN FROM A SIMPLE OBSERVATION: THE BEST SOFTWARE ISN'T BUILT BY INDIVIDUALS, BUT BY COMPATIBLE MINDS.
            </p>
            <p>
              WE STRIPPED AWAY THE NOISE. NO RESUMES. NO CORPORATE FLUFF. JUST PURE LOGIC, SKILLS, AND PASSION.
            </p>
          </div>
        </div>

        {/* 3. MISSION & VISION - HIGH CONTRAST CARDS */}
        <div className="grid md:grid-cols-2 gap-10 mb-48">
          <div className="group border-4 border-white md:border-black p-12 backdrop-blur-md bg-white/5 md:bg-transparent text-white md:text-black transition-all hover:bg-black hover:text-white">
            <Target className="mb-8" size={48} />
            <h3 className="text-3xl font-black uppercase tracking-tighter mb-6">THE MISSION</h3>
            <p className="text-xs md:text-sm font-black leading-relaxed uppercase md:opacity-100">
              EMPOWERING THE WORLD'S DEVELOPERS TO FIND THEIR PERFECT CO-FOUNDERS AND COLLABORATORS THROUGH PURE TECH SYNERGY.
            </p>
          </div>

          <div className="group border-4 border-white md:border-black p-12 bg-white md:bg-black text-black md:text-white transition-all shadow-[15px_15px_0px_0px_rgba(0,0,0,0.1)]">
            <TrendingUp className="mb-8" size={48} />
            <h3 className="text-3xl font-black uppercase tracking-tighter mb-6">THE VISION</h3>
            <p className="text-xs md:text-sm font-black leading-relaxed uppercase opacity-80 md:opacity-100">
              TO BECOME THE GLOBAL INFRASTRUCTURE FOR DEVELOPER CONNECTIONS, FOSTERING INNOVATION WITHOUT BOUNDARIES.
            </p>
          </div>
        </div>

        {/* 4. OFFERINGS - BOLD MONOCHROME */}
        <section className="mb-48">
          <h2 className="text-[14vw] font-black uppercase leading-none mb-20 opacity-10 text-white md:text-black">CORE</h2>
          <div className="grid md:grid-cols-4 gap-0 border-4 border-white md:border-black">
            {[
              { icon: <Users size={32}/>, title: "SMART MATCH", desc: "LOGIC-BASED PAIRING." },
              { icon: <Shield size={32}/>, title: "SECURE", desc: "VERIFIED TECH PROFILES." },
              { icon: <MessageCircle size={32}/>, title: "DEV CHAT", desc: "REAL-TIME SYNC." },
              { icon: <Zap size={32}/>, title: "CLEAN", desc: "ZERO DISTRACTION UI." }
            ].map((f, i) => (
              <div key={i} className="p-12 border-white md:border-black border-b md:border-b-0 md:border-r last:border-0 text-white md:text-black hover:bg-black hover:text-white transition-all">
                <div className="mb-8">{f.icon}</div>
                <h4 className="font-black uppercase text-sm tracking-widest mb-4">{f.title}</h4>
                <p className="text-[10px] font-black uppercase opacity-70 md:opacity-100">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. JOIN CTA */}
        <section className="relative border-[6px] border-white md:border-black p-12 md:p-32 overflow-hidden bg-white/5 md:bg-white text-white md:text-black">
          <div className="absolute top-0 right-0 p-12">
            <ArrowUpRight size={120} className="opacity-10" />
          </div>
          <div className="relative z-10">
            <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85] mb-16">
              START <br/>BUILDING.
            </h2>
            <div className="flex flex-wrap gap-8">
              <button className="px-16 py-6 bg-black text-white font-black uppercase tracking-[0.3em] text-xs hover:scale-105 transition-all shadow-2xl">
                JOIN NOW
              </button>
              <button className="px-16 py-6 border-4 border-white md:border-black text-white md:text-black font-black uppercase tracking-[0.3em] text-xs hover:bg-black hover:text-white transition-all">
                CONTACT
              </button>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-48 pb-12 flex flex-col md:flex-row justify-between items-center gap-10 text-white md:text-black border-t-4 border-current pt-12">
          <p className="text-xs font-black uppercase tracking-[0.4em]">© 2024 DEVTINDER // RAUSHAN KUMAR SAW</p>
          <div className="flex gap-12">
             <a href="#" className="hover:scale-125 transition-transform"><Github size={24}/></a>
             <a href="#" className="hover:scale-125 transition-transform"><Linkedin size={24}/></a>
          </div>
        </footer>

      </div>

      <style>{`
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-thumb { background: black; }
      `}</style>
    </div>
  );
};

export default AboutUs;
