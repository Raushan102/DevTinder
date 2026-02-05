/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

export default function Notification({
  open,
  type = "info",
  message = "",
  duration = 3000,
  onClose,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (open) {
      setIsVisible(true);
      setTimeLeft(duration);
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 10;
          if (newTime <= 0) {
            clearInterval(interval);
            setIsVisible(false);
            setTimeout(() => onClose(), 300); // Wait for slide animation
            return 0;
          }
          return newTime;
        });
      }, 10);
      return () => clearInterval(interval);
    }
  }, [open, duration, onClose]);

  if (!open) return null;

  const styles = {
    success: { icon: <CheckCircle className="w-5 h-5 text-green-600" />, label: "SUCCESS" },
    error: { icon: <AlertCircle className="w-5 h-5 text-red-600" />, label: "ERROR" },
    warning: { icon: <AlertTriangle className="w-5 h-5 text-yellow-600" />, label: "WARNING" },
    info: { icon: <Info className="w-5 h-5 text-blue-600" />, label: "INFO" },
  };

  const style = styles[type] || styles.info;
  const progressWidth = (timeLeft / duration) * 100;

  const notificationContent = (
    <div className="fixed top-24 right-5 z-[9999] pointer-events-none">
      <div
        className={`
          backdrop-blur-2xl border border-white/40 shadow-2xl
          sm:p-5 p-4 pr-12 min-w-[280px] sm:min-w-[350px] max-w-md
          flex flex-col gap-2 relative overflow-hidden
          transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1)
          pointer-events-auto
          ${isVisible ? "translate-x-0 opacity-100" : "translate-x-[120%] opacity-0"}
        `}
        style={{
          backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.35), rgba(255,255,255,0.2))',
        }}
      >
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">{style.icon}</div>
          <div className="flex-1">
            <span className="text-[10px] font-black tracking-[0.2em] text-black/40 block mb-0.5">
              {style.label}
            </span>
            <p className="text-xs font-bold uppercase tracking-widest text-black leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        {/* Close Button - Sharp Stylized */}
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => onClose(), 300);
          }}
          className="absolute top-4 right-4 text-black hover:rotate-90 transition-transform duration-300"
        >
          <X className="w-4 h-4" strokeWidth={3} />
        </button>

        {/* 🛠️ Editorial Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white/20">
          <div
            className="h-full bg-black transition-all duration-100 ease-linear"
            style={{ width: `${progressWidth}%` }}
          />
        </div>
      </div>
    </div>
  );

  return createPortal(
    notificationContent,
    document.getElementById("notification") || document.body
  );
}
