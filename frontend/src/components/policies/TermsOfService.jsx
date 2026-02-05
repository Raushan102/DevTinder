import React from 'react';
import { FileText, CheckCircle, AlertTriangle, Scale, Users, ChevronRight } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-transparent selection:bg-[#ff4d00] selection:text-white font-serif sm:px-6 md:px-8 sm:py-4">

      {/* 1. HERO HEADER */}
      <header className="pt-32 pb-20 border-b-2 border-white/20 md:border-black/10 transition-colors duration-500">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-8 text-white md:text-black">
              <div className="bg-black md:bg-[#ff4d00] text-white p-3 shadow-xl">
                <FileText size={28} />
              </div>
              <span className="text-[11px] font-black uppercase tracking-[0.6em]">System Protocol 1.0</span>
            </div>
            <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-10 text-white md:text-black">
              Terms of<br />Service<span className="text-[#ff4d00]">.</span>
            </h1>
            <p className="text-xs md:text-sm font-black uppercase tracking-[0.4em] text-white md:text-black opacity-60 md:opacity-100">
              Revised — Feb 2026 // devTinder Legal Dept.
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-24 max-w-5xl">
        <div className="space-y-32">

          {/* 01. AGREEMENT - Adaptive Glass */}
          <section className="text-white md:text-black">
            <div className="flex items-center gap-6 mb-10">
              <span className="text-5xl font-black italic opacity-20">01</span>
              <h2 className="text-3xl font-black uppercase tracking-tighter">Agreement</h2>
            </div>
            <div className="p-10 backdrop-blur-3xl bg-white/10 md:bg-black/5 border border-white/20 md:border-black/10 rounded-3xl md:rounded-none">
              <p className="text-sm md:text-lg font-black leading-relaxed uppercase tracking-tight mb-6">
                Welcome to <span className="text-[#ff4d00]">devTinder</span>. By accessing this platform, you enter a binding legal contract.
              </p>
              <p className="text-xs font-bold uppercase opacity-60 leading-loose">
                Engagement with our services implies absolute consent to these protocols. Non-compliance requires immediate termination of session.
              </p>
            </div>
          </section>

          {/* 02. ELIGIBILITY - List Style */}
          <section className="text-white md:text-black">
            <div className="flex items-center gap-6 mb-12">
              <span className="text-5xl font-black italic opacity-20">02</span>
              <h2 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-4">
                <CheckCircle size={24} className="text-[#ff4d00]" /> Eligibility
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Minimum Age: 18 Years",
                "Full Legal Capacity",
                "Compliance with Local Laws",
                "Valid Developer Credentials"
              ].map((item, i) => (
                <div key={i} className="p-6 border-l-4 border-[#ff4d00] bg-white/5 md:bg-black/5 backdrop-blur-xl">
                  <span className="text-[10px] font-black uppercase tracking-widest">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 03. SERVICES - High Contrast Block */}
          <section className="text-white md:text-black">
            <div className="flex items-center gap-6 mb-12">
              <span className="text-5xl font-black italic opacity-20">03</span>
              <h2 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-4">
                <Users size={24} className="text-[#ff4d00]" /> Service Logic
              </h2>
            </div>
            <div className="space-y-8">
              <div className="p-10 border-2 border-white/20 md:border-black shadow-[20px_20px_0px_0px_rgba(255,77,0,0.2)] md:shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] bg-white/10 md:bg-white backdrop-blur-2xl md:backdrop-blur-none">
                <h3 className="text-xl font-black uppercase mb-6 text-[#ff4d00]">Premium Tier (₹100)</h3>
                <ul className="space-y-4 text-xs font-black uppercase tracking-widest">
                  <li className="flex items-center gap-4"><ChevronRight size={14}/> Real-time Chat Capabilities</li>
                  <li className="flex items-center gap-4"><ChevronRight size={14}/> Advanced Matching Logic</li>
                  <li className="flex items-center gap-4"><ChevronRight size={14}/> Verified Connection Status</li>
                </ul>
                <p className="mt-8 pt-8 border-t border-current/10 text-[10px] opacity-60">
                  Note: Both nodes in a connection must hold Premium status to initiate data transmission (Chat).
                </p>
              </div>
            </div>
          </section>

          {/* 04. DISCLAIMERS - Black Morphism */}
          <section className="text-white md:text-black">
            <div className="flex items-center gap-6 mb-12">
              <span className="text-5xl font-black italic opacity-20">04</span>
              <h2 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-4">
                <Scale size={24} className="text-[#ff4d00]" /> Disclaimers
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 backdrop-blur-3xl bg-white/5 md:bg-black/5 border border-white/10 md:border-black/10 group hover:bg-black transition-all">
                <h4 className="text-[12px] font-black uppercase mb-4 group-hover:text-white">"AS IS" Basis</h4>
                <p className="text-[10px] uppercase font-black opacity-60 group-hover:text-white/80">No guarantee of error-free service or professional outcomes.</p>
              </div>
              <div className="p-8 backdrop-blur-3xl bg-white/5 md:bg-black/5 border border-white/10 md:border-black/10 group hover:bg-black transition-all">
                <h4 className="text-[12px] font-black uppercase mb-4 group-hover:text-white">Liability Cap</h4>
                <p className="text-[10px] uppercase font-black opacity-60 group-hover:text-white/80">Liability limited to the amount paid for premium services.</p>
              </div>
            </div>
          </section>

          {/* 05. CONDUCT & ALERT */}
          <section className="bg-[#ff4d00] md:bg-black text-white p-12 shadow-2xl relative overflow-hidden">
            <AlertTriangle className="absolute -right-10 -bottom-10 size-64 opacity-10 rotate-12" />
            <div className="relative z-10">
              <h2 className="text-2xl font-black uppercase tracking-[0.2em] mb-8">User Conduct Warning</h2>
              <p className="text-sm font-black uppercase tracking-widest leading-loose opacity-90 max-w-2xl">
                Impersonation, malicious code injection, or platform scraping will result in immediate permanent banning and potential legal retaliation.
              </p>
            </div>
          </section>

          {/* FOOTER CONTACT */}
          <footer className="pt-24 border-t-2 border-white/20 md:border-black/10">
            <div className="backdrop-blur-3xl bg-white/10 md:bg-black/5 p-16 text-center border-2 border-white/20 md:border-black/10 text-white md:text-black rounded-3xl md:rounded-none">
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-12">Protocol Support</h2>
              <div className="flex flex-col md:flex-row justify-center gap-16">
                <div>
                  <p className="text-[10px] font-black uppercase opacity-40 mb-2">Electronic</p>
                  <p className="text-sm font-black uppercase border-b-2 border-[#ff4d00]">raushankumarsaw15@gmail.com</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase opacity-40 mb-2">Direct Line</p>
                  <p className="text-sm font-black uppercase border-b-2 border-[#ff4d00]">+91 8252341916</p>
                </div>
              </div>
            </div>
          </footer>

        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
