import React from "react";
import { Flame, Github, Twitter, Linkedin, Heart } from "lucide-react";

function Footer() {
  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded-t-xl border-t border-base-300">
      <aside>
        <div className="p-3 bg-primary/10 rounded-xl mb-4">
           <Flame className="text-primary" size={32} fill="currentColor" />
        </div>
        <p className="font-black tracking-tighter text-xl uppercase italic">
          Dev<span className="text-primary">Tinder</span>
        </p>
        <p className="text-xs font-bold opacity-50 uppercase tracking-widest mt-1">
          Building connections for the world's developers
        </p>
        <p className="flex items-center gap-1 text-[11px] opacity-40 mt-4 font-medium">
          Made with <Heart size={12} className="text-error fill-current" /> by the DevTinder Team
        </p>
      </aside>

      <nav>
        <div className="grid grid-flow-col gap-6">
          <a className="hover:text-primary transition-colors cursor-pointer">
            <Github size={20} />
          </a>
          <a className="hover:text-primary transition-colors cursor-pointer">
            <Twitter size={20} />
          </a>
          <a className="hover:text-primary transition-colors cursor-pointer">
            <Linkedin size={20} />
          </a>
        </div>
      </nav>

      <div className="text-[10px] font-bold opacity-30 uppercase tracking-[0.2em]">
        Copyright © {new Date().getFullYear()} - All rights reserved
      </div>
    </footer>
  );
}

export default Footer;
