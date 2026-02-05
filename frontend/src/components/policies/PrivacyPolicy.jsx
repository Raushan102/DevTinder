import React from 'react';
import { Shield, Lock, Eye, Database, CreditCard, ChevronRight } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-transparent selection:bg-[#ff4d00] selection:text-white font-serif sm:px-6 md:px-8 sm:py-4">

      {/* 1. HERO HEADER */}
      <header className="pt-32 pb-20 border-b-2 border-white/20 md:border-black/10 transition-colors duration-500">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-8 text-white md:text-black">
              <div className="bg-black md:bg-[#ff4d00] text-white p-3 backdrop-blur-md">
                <Shield size={28} />
              </div>
              <span className="text-[11px] font-black uppercase tracking-[0.6em]">Protocol v.2026.01</span>
            </div>
            <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-10 text-white md:text-black">
              Privacy<br />Policy<span className="text-[#ff4d00]">.</span>
            </h1>
            <p className="text-xs md:text-sm font-black uppercase tracking-[0.4em] text-white md:text-black opacity-60 md:opacity-100">
              Last Updated — Feb 2026 // devTinder Compliance
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-12 gap-20">

          {/* 2. STICKY NAVIGATION */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-10 h-fit text-black">
            <h3 className="text-[11px] font-black uppercase tracking-widest mb-10 opacity-30">The Index</h3>
            <ul className="space-y-6">
              {['Introduction', 'Acquisition', 'Finance', 'Security', 'Legal'].map((item, idx) => (
                <li key={item} className="group flex items-center gap-3 cursor-pointer transition-all hover:translate-x-2">
                  <div className="w-0 h-[2px] bg-black group-hover:w-6 transition-all" />
                  <span className="text-[12px] font-black uppercase tracking-widest">0{idx + 1} {item}</span>
                </li>
              ))}
            </ul>
          </aside>

          {/* 3. POLICY CONTENT */}
          <main className="lg:col-span-9 max-w-3xl space-y-32">

            {/* Section 01: Introduction - Adaptive Glass */}
            <section className="text-white md:text-black">
              <div className="flex items-center gap-6 mb-10">
                <span className="text-5xl font-black italic opacity-20">01</span>
                <h2 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-4">
                  <Eye size={24} className="text-[#ff4d00]" /> Introduction
                </h2>
              </div>
              <div className="p-10 backdrop-blur-3xl bg-white/10 md:bg-black/5 border border-white/20 md:border-black/10 rounded-3xl md:rounded-none">
                <p className="text-sm md:text-lg font-black leading-relaxed uppercase tracking-tight">
                  Welcome to <span className="text-[#ff4d00]">devTinder</span>. We value your intelligence and are committed to protecting your data ecosystem through rigorous encryption.
                </p>
              </div>
            </section>

            {/* Section 02: Acquisition - Black Morphism (Desktop) / White Morphism (Mobile) */}
            <section className="p-10 backdrop-blur-3xl bg-white/10 md:bg-black/5 border border-white/20 md:border-black/10 shadow-2xl">
              <div className="flex items-center gap-6 mb-12 text-white md:text-black">
                <span className="text-5xl font-black italic opacity-20">02</span>
                <h2 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-4">
                  <Database size={24} className="text-[#ff4d00]" /> Acquisition
                </h2>
              </div>

              <div className="space-y-12">
                <div className="text-white md:text-black">
                  <h3 className="text-[12px] font-black uppercase tracking-[0.3em] mb-6 border-l-4 border-[#ff4d00] pl-4">1.0 Identity</h3>
                  <ul className="space-y-4 text-xs font-black uppercase tracking-widest">
                    <li className="flex items-center gap-4 opacity-70 md:opacity-100">
                      <ChevronRight size={16} className="text-[#ff4d00]" /> Email & Credentials
                    </li>
                    <li className="flex items-center gap-4 opacity-70 md:opacity-100">
                      <ChevronRight size={16} className="text-[#ff4d00]" /> Skill Taxonomy
                    </li>
                  </ul>
                </div>

                <div className="text-white md:text-black">
                  <h3 className="text-[12px] font-black uppercase tracking-[0.3em] mb-6 border-l-4 border-[#ff4d00] pl-4">2.0 Interaction</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-5 backdrop-blur-md bg-white/10 md:bg-white/20 border border-white/10 md:border-black/5 text-[10px] font-black uppercase">Swipe Directionality</div>
                    <div className="p-5 backdrop-blur-md bg-white/10 md:bg-white/20 border border-white/10 md:border-black/5 text-[10px] font-black uppercase">Device Metadata</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 03: Finance - Solid contrast anchor */}
            <section className="bg-black text-white p-12 shadow-[0_0_50px_rgba(0,0,0,0.3)]">
              <div className="flex items-center gap-6 mb-8">
                <CreditCard size={32} className="text-[#ff4d00]" />
                <h2 className="text-2xl font-black uppercase tracking-[0.2em]">Finance</h2>
              </div>
              <p className="text-sm font-black uppercase tracking-widest leading-loose opacity-80">
                PREMIUM SUBSCRIPTIONS (₹100) ARE PROCESSED VIA RAZORPAY. WE DO NOT STORE CARDS LOCALLY.
              </p>
            </section>

            {/* Section 04: Security - Adaptive Glass Grids */}
            <section className="text-white md:text-black">
              <div className="flex items-center gap-6 mb-12">
                <span className="text-5xl font-black italic opacity-20">03</span>
                <h2 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-4">
                  <Lock size={24} className="text-[#ff4d00]" /> Security
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-8 backdrop-blur-3xl bg-white/5 md:bg-black/5 border border-white/10 md:border-black/10 transition-all hover:bg-[#ff4d00] group">
                  <h4 className="text-[12px] font-black uppercase mb-4 group-hover:text-white">Hashing</h4>
                  <p className="text-[10px] uppercase font-black opacity-60 group-hover:text-white/80 group-hover:opacity-100">Salted BCRYPT Algorithms.</p>
                </div>
                <div className="p-8 backdrop-blur-3xl bg-white/5 md:bg-black/5 border border-white/10 md:border-black/10 transition-all hover:bg-[#ff4d00] group">
                  <h4 className="text-[12px] font-black uppercase mb-4 group-hover:text-white">TLS 1.3</h4>
                  <p className="text-[10px] uppercase font-black opacity-60 group-hover:text-white/80 group-hover:opacity-100">End-to-End Encryption.</p>
                </div>
              </div>
            </section>

            {/* Footer Legal - Final Glass Morphism */}
            <footer className="pt-24">
              <div className="backdrop-blur-3xl bg-white/10 md:bg-black/5 p-16 text-center border-2 border-white/20 md:border-black/10 text-white md:text-black rounded-3xl md:rounded-none shadow-2xl">
                <h2 className="text-5xl font-black uppercase tracking-tighter mb-6">Inquiries?</h2>
                <div className="flex flex-col md:flex-row justify-center gap-12 mt-12">
                  <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase opacity-40">Electronic</p>
                    <p className="text-sm font-black uppercase border-b-2 border-[#ff4d00] pb-1 inline-block">raushankumarsaw15@gmail.com</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase opacity-40">Direct</p>
                    <p className="text-sm font-black uppercase border-b-2 border-[#ff4d00] pb-1 inline-block">+91 8252341916</p>
                  </div>
                </div>
              </div>
            </footer>

          </main>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
