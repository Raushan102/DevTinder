import React from 'react';
import { ShieldCheck, XCircle, CheckCircle2, Zap, HelpCircle, ChevronRight } from 'lucide-react';

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-transparent selection:bg-[#ff4d00] selection:text-white font-serif sm:px-6 md:px-8 sm:py-4">

      {/* 1. HERO HEADER */}
      <header className="pt-32 pb-20 border-b-2 border-white/20 md:border-black/10 transition-colors duration-500">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-8 text-white md:text-black">
              <div className="bg-black md:bg-[#ff4d00] text-white p-3 shadow-xl">
                <ShieldCheck size={28} />
              </div>
              <span className="text-[11px] font-black uppercase tracking-[0.6em]">Billing Protocol v.2026.1</span>
            </div>
            <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-10 text-white md:text-black">
              Refund<br />Policy<span className="text-[#ff4d00]">.</span>
            </h1>
            <p className="text-xs md:text-sm font-black uppercase tracking-[0.4em] text-white md:text-black opacity-60 md:opacity-100">
              Official Documentation // devTinder Financial Division
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-24 max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-16">

          {/* 2. LEFT SIDE: QUICK STATS (Adaptive Glass Card) */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="p-10 backdrop-blur-3xl bg-white/10 md:bg-black/5 border border-white/20 md:border-black/10 rounded-3xl md:rounded-none shadow-2xl">
              <h3 className="text-white md:text-black text-xs font-black uppercase mb-10 tracking-[0.3em] opacity-40">At a Glance</h3>
              <div className="space-y-10">
                <div className="flex gap-6 items-start text-white md:text-black">
                  <XCircle className="text-[#ff4d00] shrink-0" size={24} />
                  <p className="text-[11px] font-black uppercase leading-relaxed tracking-wider">
                    Subscription cancellations do <span className="underline decoration-[#ff4d00] decoration-2">not</span> result in pro-rata refunds.
                  </p>
                </div>
                <div className="flex gap-6 items-start text-white md:text-black border-t border-current/10 pt-10">
                  <CheckCircle2 className="text-[#ff4d00] shrink-0" size={24} />
                  <p className="text-[11px] font-black uppercase leading-relaxed tracking-wider">
                    Refunds are authorized <span className="underline decoration-[#ff4d00] decoration-2">only</span> for verified technical failures.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-[#ff4d00] md:bg-black text-white flex items-center justify-between group cursor-crosshair shadow-xl">
              <div className="flex items-center gap-4">
                <Zap size={20} className="animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Razorpay Reversal Protocol</span>
              </div>
              <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </div>
          </aside>

          {/* 3. RIGHT SIDE: DETAILED POLICY */}
          <div className="lg:col-span-8 space-y-32">

            {/* Section 01: Cancellation */}
            <section className="text-white md:text-black">
              <div className="flex items-center gap-6 mb-10">
                <span className="text-5xl font-black italic opacity-20">01</span>
                <h2 className="text-3xl font-black uppercase tracking-tighter">Cancellation</h2>
              </div>
              <div className="p-10 backdrop-blur-3xl bg-white/10 md:bg-black/5 border border-white/20 md:border-black/10 rounded-3xl md:rounded-none">
                <p className="text-xl font-black uppercase tracking-tight mb-8 leading-tight">
                  User-Initiated Termination is Final.
                </p>
                <div className="space-y-6 text-sm font-bold uppercase tracking-widest opacity-70 md:opacity-100">
                  <p>
                    Upon purchasing <span className="text-[#ff4d00]">devTinder Premium</span>, all features are deployed instantly to your node.
                  </p>
                  <p className="border-l-4 border-[#ff4d00] pl-6 italic bg-white/5 p-4">
                    If you terminate your connection, access remains active until the end of your 30-day cycle. No partial refunds are issued.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 02: Technical Faults */}
            <section className="text-white md:text-black">
              <div className="flex items-center gap-6 mb-12">
                <span className="text-5xl font-black italic opacity-20">02</span>
                <h2 className="text-3xl font-black uppercase tracking-tighter">Technical Faults</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-8 border-2 border-current/20 md:border-black hover:bg-[#ff4d00] hover:border-[#ff4d00] hover:text-white transition-all group">
                  <h4 className="text-[12px] font-black uppercase mb-4 tracking-widest">Platform Error</h4>
                  <p className="text-[10px] uppercase font-black opacity-60 group-hover:text-white">Inability to access premium features for over 48 hours.</p>
                </div>
                <div className="p-8 border-2 border-current/20 md:border-black hover:bg-[#ff4d00] hover:border-[#ff4d00] hover:text-white transition-all group">
                  <h4 className="text-[12px] font-black uppercase mb-4 tracking-widest">Transaction Log</h4>
                  <p className="text-[10px] uppercase font-black opacity-60 group-hover:text-white">Duplicate charges confirmed via Razorpay gateway metadata.</p>
                </div>
              </div>
            </section>

            {/* Section 03: Claim Process */}
            <section className="text-white md:text-black">
              <div className="flex items-center gap-6 mb-12">
                <span className="text-5xl font-black italic opacity-20">03</span>
                <h2 className="text-3xl font-black uppercase tracking-tighter">Claim Process</h2>
              </div>
              <div className="p-10 border-4 border-white/20 md:border-black shadow-[20px_20px_0px_0px_rgba(255,77,0,0.2)] md:shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] bg-white/10 md:bg-white backdrop-blur-2xl md:backdrop-blur-none">
                <p className="text-xs font-black uppercase tracking-[0.3em] mb-8 opacity-60">Submission Requirements:</p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 border-b border-current/10 pb-4">
                    <ChevronRight size={16} className="text-[#ff4d00]" />
                    <span className="text-sm font-black uppercase">Email: raushankumarsaw15@gmail.com</span>
                  </div>
                  <p className="text-[10px] font-bold uppercase opacity-60 leading-relaxed">
                    REQUIRED DATA: PAYMENT ID, TIMESTAMP, AND ERROR LOGS. CLAIMS WITHOUT METADATA WILL BE AUTOMATICALLY REJECTED.
                  </p>
                </div>
              </div>
            </section>

            {/* Footer Support */}
            <footer className="pt-24 text-center">
              <HelpCircle className="mx-auto mb-8 text-[#ff4d00] opacity-40" size={48} />
              <p className="text-white md:text-black text-[11px] font-black uppercase tracking-[0.6em] ">
                Support Protocol: +91 8252341916
              </p>
            </footer>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
