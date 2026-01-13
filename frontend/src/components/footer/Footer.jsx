import React from "react";
import { Flame, Github, Twitter, Linkedin, Heart, Code, Users, Zap } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-primary text-primary-content">
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-12">

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

          {/* Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest opacity-60 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-sm opacity-80 hover:opacity-100 transition-opacity">About Us</a></li>
              <li><a href="/" className="text-sm opacity-80 hover:opacity-100 transition-opacity">How It Works</a></li>
              <li><a href="/" className="text-sm opacity-80 hover:opacity-100 transition-opacity">Privacy Policy</a></li>
              <li><a href="/" className="text-sm opacity-80 hover:opacity-100 transition-opacity">Terms of Service</a></li>
            </ul>
          </div>

          {/* Stats */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-xs font-bold uppercase tracking-widest opacity-60 mb-4">Why DevTinder?</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-lg flex-shrink-0">
                  <Users size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold">10K+ Developers</p>
                  <p className="text-xs opacity-70">Active community</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-lg flex-shrink-0">
                  <Code size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold">500+ Projects</p>
                  <p className="text-xs opacity-70">Collaborations made</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-lg flex-shrink-0">
                  <Zap size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold">Lightning Fast</p>
                  <p className="text-xs opacity-70">Real-time matching</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 my-6 sm:my-8"></div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <a href="/" className="p-2.5 sm:p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all">
              <Github size={18} className="sm:w-5 sm:h-5" />
            </a>
            <a href="/" className="p-2.5 sm:p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all">
              <Twitter size={18} className="sm:w-5 sm:h-5" />
            </a>
            <a href="/" className="p-2.5 sm:p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all">
              <Linkedin size={18} className="sm:w-5 sm:h-5" />
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
