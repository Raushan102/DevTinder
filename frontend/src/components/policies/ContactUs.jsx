import React, { useState } from 'react';
import { Mail, Phone, Send, MapPin, Clock, HelpCircle, ArrowRight } from 'lucide-react';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-transparent selection:bg-[#ff4d00] selection:text-white font-serif">

      {/* 1. HERO HEADER - Line removed on Desktop */}
      <div className="pt-32 pb-20 border-b-4 border-white md:border-none transition-colors duration-500">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center text-center">
            <span className="text-[11px] font-black uppercase tracking-[0.8em] text-white md:text-black opacity-60 md:opacity-100 mb-6">
              Establish Connection
            </span>
            <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter text-white md:text-black leading-none drop-shadow-sm">
              Contact<span className="text-[#ff4d00]">.</span>
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-24 max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-20">

          {/* 2. LEFT COLUMN - INFO */}
          <div className="lg:col-span-5 space-y-16">
            <div className="text-white md:text-black">
              <h2 className="text-4xl font-black uppercase mb-8 italic tracking-tighter">The Studio</h2>
              <p className="text-sm font-black uppercase tracking-widest leading-relaxed md:opacity-100 opacity-70">
                Have questions about devTinder? Our collective is here to bridge the gap between inquiry and solution.
              </p>
            </div>

            <div className="grid gap-6">
              {[
                { icon: <Mail size={20} />, label: "Inquiries", val: "raushankumarsaw15@gmail.com", link: "mailto:raushankumarsaw15@gmail.com" },
                { icon: <Phone size={20} />, label: "Direct Line", val: "+91 8252341916", link: "tel:+918252341916" },
                { icon: <MapPin size={20} />, label: "Base", val: "Jharkhand, India", link: "#" }
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.link}
                  className="group flex items-center justify-between p-8 border-2 border-white md:border-black/20 hover:bg-[#ff4d00] hover:border-[#ff4d00] hover:text-white transition-all duration-500 backdrop-blur-sm bg-white/5 md:bg-white/10"
                >
                  <div className="flex items-center gap-6">
                    <span className="text-[#ff4d00] group-hover:text-white transition-colors">{item.icon}</span>
                    <div className="text-white md:text-black group-hover:text-white">
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-60">{item.label}</p>
                      <p className="text-xs font-black uppercase mt-1">{item.val}</p>
                    </div>
                  </div>
                  <ArrowRight size={20} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </a>
              ))}
            </div>

            <div className="pt-12 border-t-2 border-white/20 md:border-black/20 text-white md:text-black">
              <h3 className="text-xs font-black uppercase tracking-[0.4em] mb-8 flex items-center gap-3">
                <HelpCircle size={16} className="text-[#ff4d00]" /> Intelligence Base
              </h3>
              <div className="space-y-4">
                {["Premium Access", "Connection Logic"].map((q, i) => (
                  <div key={i} className="border-b-2 border-current/20 pb-4">
                    <p className="text-[12px] font-black uppercase tracking-widest mb-2">{q}</p>
                    <p className="text-[10px] font-bold uppercase opacity-60 md:opacity-100 leading-relaxed">
                      High-tier networking starting at ₹100. Logic-based matching ensures quality over quantity.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3. RIGHT COLUMN - GLASSMORPHISM FORM */}
          <div className="lg:col-span-7">
            <div className="relative border-2 border-white/30 md:border-black/10 p-8 md:p-16 backdrop-blur-2xl bg-white/10 md:bg-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-3xl md:rounded-none">
              <h2 className="text-5xl font-black uppercase mb-12 tracking-tighter text-white md:text-black">Send Message</h2>

              {submitted && (
                <div className="mb-10 p-6 bg-[#ff4d00] text-white text-[11px] font-black uppercase tracking-[0.3em] animate-pulse">
                  Transmission Received. Standing by.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="flex flex-col gap-3">
                    <label className="text-[11px] font-black uppercase tracking-widest text-white md:text-black">Full Name</label>
                    <input
                      type="text" name="name" onChange={handleChange} required
                      className="bg-transparent border-b-4 border-white/20 md:border-black/20 focus:border-[#ff4d00] outline-none p-3 text-sm font-black text-white md:text-black transition-all uppercase placeholder:opacity-30"
                      placeholder="e.g. RAUSHAN SAW"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-[11px] font-black uppercase tracking-widest text-white md:text-black">Email</label>
                    <input
                      type="email" name="email" onChange={handleChange} required
                      className="bg-transparent border-b-4 border-white/20 md:border-black/20 focus:border-[#ff4d00] outline-none p-3 text-sm font-black text-white md:text-black transition-all uppercase placeholder:opacity-30"
                      placeholder="EMAIL@STUDIO.COM"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-[11px] font-black uppercase tracking-widest text-white md:text-black">Subject</label>
                  <select
                    name="subject" onChange={handleChange} required
                    className="bg-transparent border-b-4 border-white/20 md:border-black/20 focus:border-[#ff4d00] outline-none p-3 text-sm font-black text-white md:text-black transition-all uppercase cursor-pointer"
                  >
                    <option value="" className="text-black">SELECT DEPARTMENT</option>
                    <option value="general" className="text-black">GENERAL INQUIRY</option>
                    <option value="premium" className="text-black">PREMIUM ACCESS</option>
                    <option value="partnership" className="text-black">PARTNERSHIP</option>
                  </select>
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-[11px] font-black uppercase tracking-widest text-white md:text-black">Message</label>
                  <textarea
                    name="message" onChange={handleChange} required rows="5"
                    className="bg-transparent border-b-4 border-white/20 md:border-black/20 focus:border-[#ff4d00] outline-none p-3 text-sm font-black text-white md:text-black transition-all uppercase resize-none placeholder:opacity-30"
                    placeholder="YOUR TRANSMISSION..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full group relative overflow-hidden bg-[#ff4d00] md:bg-black text-white py-8 font-black uppercase tracking-[0.5em] text-xs transition-all active:scale-95 shadow-xl"
                >
                  <span className="relative z-10 flex items-center justify-center gap-4">
                    Initiate Send <Send size={18} />
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </button>
              </form>
            </div>

            <div className="mt-16 flex items-center gap-5 py-6 border-y border-white/10 md:border-black/10">
              <Clock size={20} className="text-[#ff4d00]" />
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white md:text-black opacity-50 md:opacity-100">
                Response Latency: 24-48 Hours // GMT+5:30
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactUs;
