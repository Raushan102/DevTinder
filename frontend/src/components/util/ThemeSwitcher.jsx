import { useState, useEffect } from "react";
import { Palette, Check, Sparkles } from "lucide-react";
import ErrorModal from "./ErrorModal";

function ThemeSwitcher() {
  const themes = [
    "light",
    "dark",
    "sunset",
    "cupcake",
    "cyberpunk",
    "forest",
    "luxury",
    "synthwave",
  ];

  // Initialize state with localStorage check
  const [currentTheme, setCurrentTheme] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        return localStorage.getItem("theme") || "sunset";
      } catch (error) {
        return "sunset";
      }
    }
    return "sunset";
  });

  const [showModal, setShowModal] = useState({
    open: false,
    errorMessage: null,
  });

  // Apply theme to the root HTML element
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentTheme);
  }, [currentTheme]);

  const handleThemeChange = (theme) => {
    setCurrentTheme(theme);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("theme", theme);
      } catch (error) {
        setShowModal({
          open: true,
          errorMessage:
            error?.message || "error occure while change the themes",
        });
      }
    }
  };

  return (
    <div className="dropdown dropdown-end">
      {/* TRIGGER BUTTON */}
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle hover:bg-primary/10 transition-colors"
      >
        <div className="relative">
          <Palette size={22} className="opacity-80" />
          <Sparkles
            size={10}
            className="absolute -top-1.5 -right-1.5 text-primary animate-pulse"
          />
        </div>
      </div>

      {/* THE DROPDOWN MENU */}
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100/95 backdrop-blur-md rounded-xl z-[50] w-56 p-2 shadow-2xl border border-base-300 mt-4 max-h-96 overflow-y-auto flex-nowrap"
      >
        <li className="menu-title px-4 py-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50">
            Visual Interface
          </span>
        </li>

        <div className="divider my-0 opacity-10"></div>

        <div className="flex flex-col gap-1 mt-1">
          {themes.map((theme) => (
            <li key={theme}>
              <button
                onClick={() => handleThemeChange(theme)}
                className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-all ${
                  currentTheme === theme
                    ? "bg-primary/15 text-primary font-bold"
                    : "hover:bg-base-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* COLOR PREVIEW DOTS */}
                  <div
                    data-theme={theme}
                    className="flex gap-0.5 p-1 bg-neutral rounded-md shadow-inner"
                  >
                    <div className="w-1.5 h-3 bg-primary rounded-full"></div>
                    <div className="w-1.5 h-3 bg-secondary rounded-full"></div>
                    <div className="w-1.5 h-3 bg-accent rounded-full"></div>
                  </div>
                  <span className="capitalize text-sm tracking-wide">
                    {theme}
                  </span>
                </div>

                {currentTheme === theme && (
                  <Check size={16} className="text-primary" strokeWidth={3} />
                )}
              </button>
            </li>
          ))}
        </div>
      </ul>
      <ErrorModal
        title={"themes change fail"}
        message={showModal.errorMessage}
        type="error"
        isOpen={showModal.open}
        onClose={() => setShowModal({ open: false, errorMessage: null })}
      />
    </div>
  );
}

export default ThemeSwitcher;
