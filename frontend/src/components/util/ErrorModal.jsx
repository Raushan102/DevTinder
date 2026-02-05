import { useRef, useEffect } from "react";
import { AlertCircle, X, CheckCircle2, TriangleAlert, ShieldAlert, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ErrorModal({ title, message, type = "error", isOpen, onClose, redirect = null }) {
  const dialogRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  const theme = {
    error: {
      color: "text-red-400",
      glow: "bg-red-500/20",
      icon: <ShieldAlert size={36} />
    },
    success: {
      color: "text-emerald-400",
      glow: "bg-emerald-500/20",
      icon: <CheckCircle2 size={36} />
    },
    warning: {
      color: "text-amber-400",
      glow: "bg-amber-500/20",
      icon: <TriangleAlert size={36} />
    }
  };

  const active = theme[type] || theme.error;

  const handleClose = () => {
    onClose();
    if (redirect) navigate(redirect);
  };

  return (
    <dialog
      ref={dialogRef}
      className="modal backdrop:backdrop-blur-md backdrop:bg-black/50"
      onClose={handleClose}
    >
      <div className="modal-box p-0 bg-white/5 backdrop-blur-3xl border border-white/20 rounded-none overflow-hidden max-w-sm shadow-[0_0_80px_rgba(0,0,0,0.5)] relative">

        {/* LIGHT LEAK EFFECT */}
        <div className={`absolute -top-10 -right-10 w-32 h-32 blur-[60px] opacity-40 ${active.glow}`} />
        <div className={`absolute -bottom-10 -left-10 w-32 h-32 blur-[60px] opacity-20 ${active.glow}`} />

        <div className="relative z-10">
          {/* HEADER BAR */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
            <div className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 ${active.color.replace('text', 'bg')}`} />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">System.Status</span>
            </div>
            <button onClick={handleClose} className="text-white/40 hover:text-white transition-colors">
              <X size={16} />
            </button>
          </div>

          {/* MAIN CONTENT */}
          <div className="px-8 pt-10 pb-12 text-center">
            <div className={`inline-flex items-center justify-center mb-6 ${active.color}`}>
              {active.icon}
            </div>

            <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white mb-3">
              {title}
            </h3>

            <div className="w-8 h-[2px] bg-white/20 mx-auto mb-6" />

            <p className="text-xs font-bold text-white/50 leading-relaxed uppercase tracking-widest mb-10 px-4">
              {message}
            </p>

            {/* ACTION BUTTON */}
            <div className="space-y-4">
              <button
                onClick={handleClose}
                className="w-full h-14 bg-white/10 hover:bg-white/15 text-white border border-white/20 rounded-none font-black uppercase tracking-[0.3em] text-[10px] transition-all flex items-center justify-center gap-3 group relative overflow-hidden"
              >
                {/* Hover Shimmer */}
                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <span className="relative">Confirm Action</span>
                <Sparkles size={12} className="opacity-40 group-hover:opacity-100 transition-opacity" />
              </button>

              <button
                onClick={handleClose}
                className="text-[9px] font-black uppercase tracking-[0.5em] text-white/20 hover:text-white/60 transition-colors"
              >
                Bypass Alert
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM ACCENT */}
        <div className={`h-[2px] w-full ${active.color.replace('text', 'bg')} opacity-50`} />
      </div>

      <style>{`
        .modal-box {
          animation: sharpAppear 0.3s ease-out;
        }
        @keyframes sharpAppear {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </dialog>
  );
}

export default ErrorModal;
