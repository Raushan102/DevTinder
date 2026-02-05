// Footer.jsx - Professional Mobile-First Glassmorphism Design
// Features: Compact mobile layout, expandable sections, premium glass effect
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Flame, Github, Twitter, Linkedin, Heart, Code, Users, Mail, Phone, ChevronDown, ChevronUp } from "lucide-react";

function Footer() {
  // State for mobile accordion sections
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className="relative sm:px-6 md:px-8 ">
      {/* ========================================
          GLASSMORPHISM FOOTER CONTAINER
          ======================================== */}
      <div
        className="backdrop-blur-xl bg-white/20 border-t border-white/30 shadow-2xl"
        style={{
          backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.2), rgba(255,255,255,0.1))',
        }}
      >
        {/* ========================================
            MOBILE LAYOUT (< 768px)
            ======================================== */}
        <div className="md:hidden">
          <div className="px-4 py-6">

            {/* BRAND SECTION - Always Visible */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="text-xl">🔥</div>
                <h2 className="text-white text-base tracking-[0.15em] font-bold uppercase">
                  DEVTINDER
                </h2>
              </div>
              <p className="text-white text-[10px] opacity-60 uppercase tracking-[0.15em]">
                Connect • Build • Grow
              </p>
            </div>

            {/* SOCIAL MEDIA - Prominent on Mobile */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <a
                href="https://github.com/Raushan102"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all"
                aria-label="GitHub"
              >
                <Github size={16} strokeWidth={2.5} className="text-white" />
              </a>
              <a
                href="https://www.linkedin.com/in/raushan-kumar-saw-39067b261/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} strokeWidth={2.5} className="text-white" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all"
                aria-label="Twitter"
              >
                <Twitter size={16} strokeWidth={2.5} className="text-white" />
              </a>
            </div>

            {/* ACCORDION SECTIONS */}
            <div className="space-y-2">

              {/* Company Section */}
              <div className="backdrop-blur-md bg-white/10 border border-white/20">
                <button
                  onClick={() => toggleSection('company')}
                  className="w-full flex items-center justify-between px-4 py-3"
                >
                  <span className="text-white text-xs font-bold uppercase tracking-[0.15em]">
                    Company
                  </span>
                  {openSection === 'company' ? (
                    <ChevronUp size={16} className="text-white" strokeWidth={2.5} />
                  ) : (
                    <ChevronDown size={16} className="text-white" strokeWidth={2.5} />
                  )}
                </button>

                {openSection === 'company' && (
                  <div className="px-4 pb-3 space-y-2">
                    <Link to="/about-us" className="block text-white text-xs opacity-70 hover:opacity-100">
                      About Us
                    </Link>
                    <Link to="/team" className="block text-white text-xs opacity-70 hover:opacity-100">
                      Team
                    </Link>
                    <Link to="/contact-us" className="block text-white text-xs opacity-70 hover:opacity-100">
                      Contact Us
                    </Link>
                    <a href="mailto:raushankumarsaw15@gmail.com" className="block text-white text-xs opacity-70 hover:opacity-100">
                      Support
                    </a>
                  </div>
                )}
              </div>

              {/* Legal Section */}
              <div className="backdrop-blur-md bg-white/10 border border-white/20">
                <button
                  onClick={() => toggleSection('legal')}
                  className="w-full flex items-center justify-between px-4 py-3"
                >
                  <span className="text-white text-xs font-bold uppercase tracking-[0.15em]">
                    Legal
                  </span>
                  {openSection === 'legal' ? (
                    <ChevronUp size={16} className="text-white" strokeWidth={2.5} />
                  ) : (
                    <ChevronDown size={16} className="text-white" strokeWidth={2.5} />
                  )}
                </button>

                {openSection === 'legal' && (
                  <div className="px-4 pb-3 space-y-2">
                    <Link to="/privacy-policy" className="block text-white text-xs opacity-70 hover:opacity-100">
                      Privacy Policy
                    </Link>
                    <Link to="/terms-of-service" className="block text-white text-xs opacity-70 hover:opacity-100">
                      Terms of Service
                    </Link>
                    <Link to="/refund-policy" className="block text-white text-xs opacity-70 hover:opacity-100">
                      Refund Policy
                    </Link>
                  </div>
                )}
              </div>

              {/* Contact Section */}
              <div className="backdrop-blur-md bg-white/10 border border-white/20">
                <button
                  onClick={() => toggleSection('contact')}
                  className="w-full flex items-center justify-between px-4 py-3"
                >
                  <span className="text-white text-xs font-bold uppercase tracking-[0.15em]">
                    Contact
                  </span>
                  {openSection === 'contact' ? (
                    <ChevronUp size={16} className="text-white" strokeWidth={2.5} />
                  ) : (
                    <ChevronDown size={16} className="text-white" strokeWidth={2.5} />
                  )}
                </button>

                {openSection === 'contact' && (
                  <div className="px-4 pb-3 space-y-3">
                    <a
                      href="mailto:raushankumarsaw15@gmail.com"
                      className="flex items-center gap-2 text-white text-[10px] opacity-70"
                    >
                      <Mail size={12} strokeWidth={2.5} />
                      <span>raushankumarsaw15@gmail.com</span>
                    </a>
                    <a
                      href="tel:+918252341916"
                      className="flex items-center gap-2 text-white text-[10px] opacity-70"
                    >
                      <Phone size={12} strokeWidth={2.5} />
                      <span>+91 8252341916</span>
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* STATS - Compact */}
            <div className="flex items-center justify-center gap-6 mt-6 mb-4">
              <div className="flex items-center gap-2">
                <Users size={14} strokeWidth={2.5} className="text-white opacity-60" />
                <span className="text-white text-[10px] font-bold uppercase tracking-wider">
                  10K+ Devs
                </span>
              </div>
              <div className="h-3 w-[1px] bg-white/30"></div>
              <div className="flex items-center gap-2">
                <Code size={14} strokeWidth={2.5} className="text-white opacity-60" />
                <span className="text-white text-[10px] font-bold uppercase tracking-wider">
                  500+ Projects
                </span>
              </div>
            </div>

            {/* COPYRIGHT - Mobile */}
            <div className="text-center pt-4 border-t border-white/20">
              <p className="text-white text-[9px] font-bold opacity-40 uppercase tracking-[0.2em]">
                © {new Date().getFullYear()} DevTinder
              </p>
              <p className="text-white text-[8px] opacity-30 uppercase tracking-wider mt-1">
                Made with <Heart size={8} className="inline" fill="currentColor" /> by Developers
              </p>
            </div>
          </div>
        </div>

        {/* ========================================
            DESKTOP LAYOUT (≥ 768px)
            ======================================== */}
        <div className="hidden md:block">
          <div className="container mx-auto px-8 py-12">

            {/* MAIN GRID LAYOUT */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

              {/* BRAND SECTION */}
              <div className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="text-2xl">🔥</div>
                  <h2 className="text-white sm:text-black text-xl tracking-[0.15em] font-bold uppercase drop-shadow-lg">
                    DEVTINDER
                  </h2>
                </div>

                <div className="h-[1px] w-12 bg-white sm:bg-black opacity-40"></div>

                <p className="text-white sm:text-black text-xs opacity-80 leading-relaxed font-medium">
                  Connecting developers worldwide. Build your network, find collaborators, and grow together.
                </p>

                <div className="flex items-center gap-2 text-white sm:text-black text-[10px] opacity-60">
                  <Heart size={12} fill="currentColor" />
                  <span className="font-bold uppercase tracking-[0.1em]">
                    Made with passion by developers
                  </span>
                </div>
              </div>

              {/* COMPANY LINKS */}
              <div>
                <h3 className="text-white sm:text-black text-[10px] font-bold uppercase tracking-[0.2em] opacity-50 mb-4">
                  Company
                </h3>
                <ul className="space-y-2.5">
                  <li>
                    <Link
                      to="/about-us"
                      className="text-white sm:text-black text-xs font-bold uppercase tracking-[0.08em] opacity-70 hover:opacity-100 transition-opacity"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/team"
                      className="text-white sm:text-black text-xs font-bold uppercase tracking-[0.08em] opacity-70 hover:opacity-100 transition-opacity"
                    >
                      Team
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact-us"
                      className="text-white sm:text-black text-xs font-bold uppercase tracking-[0.08em] opacity-70 hover:opacity-100 transition-opacity"
                    >
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <a
                      href="mailto:raushankumarsaw15@gmail.com"
                      className="text-white sm:text-black text-xs font-bold uppercase tracking-[0.08em] opacity-70 hover:opacity-100 transition-opacity"
                    >
                      Support
                    </a>
                  </li>
                </ul>
              </div>

              {/* LEGAL LINKS */}
              <div>
                <h3 className="text-white sm:text-black text-[10px] font-bold uppercase tracking-[0.2em] opacity-50 mb-4">
                  Legal
                </h3>
                <ul className="space-y-2.5">
                  <li>
                    <Link
                      to="/privacy-policy"
                      className="text-white sm:text-black text-xs font-bold uppercase tracking-[0.08em] opacity-70 hover:opacity-100 transition-opacity"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/terms-of-service"
                      className="text-white sm:text-black text-xs font-bold uppercase tracking-[0.08em] opacity-70 hover:opacity-100 transition-opacity"
                    >
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/refund-policy"
                      className="text-white sm:text-black text-xs font-bold uppercase tracking-[0.08em] opacity-70 hover:opacity-100 transition-opacity"
                    >
                      Refund Policy
                    </Link>
                  </li>
                </ul>
              </div>

              {/* CONTACT & STATS */}
              <div>
                <h3 className="text-white sm:text-black text-[10px] font-bold uppercase tracking-[0.2em] opacity-50 mb-4">
                  Get In Touch
                </h3>

                {/* Contact Links */}
                <div className="space-y-3 mb-6">
                  <a
                    href="mailto:raushankumarsaw15@gmail.com"
                    className="flex items-center gap-2.5 text-white sm:text-black text-[11px] font-semibold opacity-70 hover:opacity-100 transition-opacity group"
                  >
                    <div className="p-1.5 bg-white/20 backdrop-blur-sm group-hover:bg-white/30 transition-all">
                      <Mail size={12} strokeWidth={2.5} />
                    </div>
                    <span>raushankumarsaw15@gmail.com</span>
                  </a>
                  <a
                    href="tel:+918252341916"
                    className="flex items-center gap-2.5 text-white sm:text-black text-[11px] font-semibold opacity-70 hover:opacity-100 transition-opacity group"
                  >
                    <div className="p-1.5 bg-white/20 backdrop-blur-sm group-hover:bg-white/30 transition-all">
                      <Phone size={12} strokeWidth={2.5} />
                    </div>
                    <span>+91 8252341916</span>
                  </a>
                </div>

                {/* Stats */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-white/20 backdrop-blur-sm">
                      <Users size={14} strokeWidth={2.5} className="text-white sm:text-black" />
                    </div>
                    <div>
                      <p className="text-white sm:text-black text-xs font-bold uppercase tracking-[0.08em]">
                        10K+ Developers
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-white/20 backdrop-blur-sm">
                      <Code size={14} strokeWidth={2.5} className="text-white sm:text-black" />
                    </div>
                    <div>
                      <p className="text-white sm:text-black text-xs font-bold uppercase tracking-[0.08em]">
                        500+ Projects
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* DIVIDER */}
            <div className="h-[1px] bg-white sm:bg-black opacity-20 my-8"></div>

            {/* BOTTOM SECTION - Social + Copyright */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">

              {/* Social Media Links */}
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/Raushan102"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/20 hover:bg-white/35 backdrop-blur-sm transition-all shadow-lg group"
                  aria-label="GitHub"
                >
                  <Github size={16} strokeWidth={2.5} className="text-white sm:text-black group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="https://www.linkedin.com/in/raushan-kumar-saw-39067b261/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/20 hover:bg-white/35 backdrop-blur-sm transition-all shadow-lg group"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={16} strokeWidth={2.5} className="text-white sm:text-black group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/20 hover:bg-white/35 backdrop-blur-sm transition-all shadow-lg group"
                  aria-label="Twitter"
                >
                  <Twitter size={16} strokeWidth={2.5} className="text-white sm:text-black group-hover:scale-110 transition-transform" />
                </a>
              </div>

              {/* Copyright */}
              <div className="text-center md:text-right">
                <p className="text-white sm:text-black text-[10px] font-bold opacity-50 uppercase tracking-[0.2em]">
                  © {new Date().getFullYear()} DevTinder • All rights reserved
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
