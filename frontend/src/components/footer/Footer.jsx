import React from "react";
import { Link } from "react-router-dom";
import { Flame, Github, Twitter, Linkedin, Heart, Code, Users, Zap, Mail, Phone } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-primary text-primary-content">
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-12">

          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-lg">
                <Flame size={24} className="sm:w-7 sm:h-7" fill="currentColor" />
              </div>
              <span className="text-xl sm:text-2xl font-black tracking-tighter uppercase">
                DevTinder
              </span>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              Connecting developers worldwide. Build your network, find collaborators, and grow together.
            </p>
            <div className="flex items-center gap-2 text-xs opacity-70">
              <Heart size={14} fill="currentColor" />
              <span>Made with passion by developers</span>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest opacity-60 mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about-us" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                  Team
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="mailto:raushankumarsaw15@gmail.com" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest opacity-60 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Stats */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest opacity-60 mb-4">Get In Touch</h3>
            <div className="space-y-3 mb-6">
              <a
                href="mailto:raushankumarsaw15@gmail.com"
                className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100 transition-opacity"
              >
                <Mail size={14} />
                <span className="text-xs">raushankumarsaw15@gmail.com</span>
              </a>
              <a
                href="tel:+918252341916"
                className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100 transition-opacity"
              >
                <Phone size={14} />
                <span className="text-xs">+91 8252341916</span>
              </a>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-white/10 rounded-lg flex-shrink-0">
                  <Users size={14} />
                </div>
                <div>
                  <p className="text-xs font-semibold">10K+ Developers</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-white/10 rounded-lg flex-shrink-0">
                  <Code size={14} />
                </div>
                <div>
                  <p className="text-xs font-semibold">500+ Projects</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 my-6 sm:my-8"></div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="https://github.com/Raushan102"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 sm:p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
              aria-label="GitHub"
            >
              <Github size={18} className="sm:w-5 sm:h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/raushan-kumar-saw-39067b261/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 sm:p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} className="sm:w-5 sm:h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 sm:p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
              aria-label="Twitter"
            >
              <Twitter size={18} className="sm:w-5 sm:h-5" />
            </a>
          </div>
          <div className="text-center md:text-right">
            <p className="text-xs font-bold opacity-60 uppercase tracking-widest">
              © {new Date().getFullYear()} DevTinder. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
