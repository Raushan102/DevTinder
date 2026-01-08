import { useRef, useEffect } from "react";
import { AlertCircle, X, CheckCircle2, Info, TriangleAlert, Sparkles } from "lucide-react";
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

  // COLOR MAP: High saturation text and background gradients
  const theme = {
    error: {
      bg: "from-red-500/20 to-base-100",
      text: "text-red-500",
      btn: "btn-error",
      icon: <AlertCircle size={40} className="drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
    },
    success: {
      bg: "from-emerald-500/20 to-base-100",
      text: "text-emerald-500",
      btn: "btn-success",
      icon: <CheckCircle2 size={40} className="drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
    },
    warning: {
      bg: "from-amber-500/20 to-base-100",
      text: "text-amber-500",
      btn: "btn-warning",
      icon: <TriangleAlert size={40} className="drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
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
      className="modal backdrop:backdrop-blur-xl backdrop:bg-black/40"
      onClose={handleClose}
    >
      <div className={`modal-box p-0 bg-gradient-to-b ${active.bg} border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-2xl overflow-hidden max-w-sm`}>

        {/* VISUAL HEADER */}
        <div className="flex flex-col items-center pt-10 pb-4">
          <div className="relative">
            {/* Background Glow Orb */}
            <div className={`absolute inset-0 blur-2xl opacity-40 scale-150 ${active.text.replace('text', 'bg')}`}></div>
            <div className="relative z-10">
              {active.icon}
            </div>
          </div>
        </div>

        {/* TEXT CONTENT */}
        <div className="px-8 pb-10 text-center">
          <h3 className={`text-2xl font-black italic uppercase tracking-tighter ${active.text} mb-2`}>
            {title}
          </h3>

          <div className="h-0.5 w-12 bg-current opacity-20 mx-auto mb-4"></div>

          <p className="text-sm font-bold text-base-content/80 leading-relaxed mb-8">
            {message}
          </p>

          {/* ACTION BUTTON */}
          <button
            className={`btn ${active.btn} w-full rounded-xl font-black uppercase tracking-[0.2em] text-[10px] shadow-lg border-none hover:brightness-110 active:scale-95 transition-all`}
            onClick={handleClose}
          >
            Acknowledge
          </button>

          <button
            onClick={handleClose}
            className="mt-4 text-[9px] font-black uppercase tracking-widest opacity-30 hover:opacity-100 transition-opacity flex items-center justify-center gap-1 mx-auto"
          >
            Dismiss <X size={10} />
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default ErrorModal;
