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
      // Only ONE timer - handles both progress AND closing
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 10;
          if (newTime <= 0) {
            clearInterval(interval);
            // Start close animation
            setIsVisible(false);
            // After animation, call onClose
            onClose();

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
    success: {
      bg: "bg-gradient-to-r from-green-500 to-green-600",
      icon: <CheckCircle className="w-5 h-5" />,
      progress: "bg-green-300",
    },
    error: {
      bg: "bg-gradient-to-r from-red-500 to-red-600",
      icon: <AlertCircle className="w-5 h-5" />,
      progress: "bg-red-300",
    },
    warning: {
      bg: "bg-gradient-to-r from-yellow-500 to-yellow-600",
      icon: <AlertTriangle className="w-5 h-5" />,
      progress: "bg-yellow-300",
    },
    info: {
      bg: "bg-gradient-to-r from-blue-500 to-blue-600",
      icon: <Info className="w-5 h-5" />,
      progress: "bg-blue-300",
    },
  };

  const style = styles[type] || styles.info;

  const notificationContent = (
    <div className="fixed top-5 right-5 z-50">
      <div
        className={`
          ${style.bg} text-white
          rounded-md shadow-2xl  sm:p-4 p-3  pr-12 min-w-50
          sm:min-w-80 max-w-md
          flex items-center gap-3
          relative overflow-hidden
          transition-all duration-300 ease-out
          ${
            isVisible
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }
        `}
      >
        <div className="flex-shrink-0">{style.icon}</div>

        <div className="flex-1">
          <p className="text-sm font-medium leading-relaxed">{message}</p>
        </div>

        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => onClose(), 5 * 60 * 1000);
          }}
          className="absolute top-1 right-3 hover:bg-white/20 rounded-full p-1 transition-all"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return createPortal(
    notificationContent,
    document.getElementById("notification")
  );
}
