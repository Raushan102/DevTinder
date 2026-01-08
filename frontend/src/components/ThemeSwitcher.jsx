import { useState, useEffect } from 'react'
import { Palette, Check, Sparkles } from 'lucide-react'

function ThemeSwitcher() {
  const themes = ["light", "dark", "sunset", "cupcake", "cyberpunk", "forest", "luxury", "synthwave"]

  const [currentTheme, setCurrentTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        return localStorage.getItem("theme") || "sunset"
      } catch (error) {
        return "sunset"
      }
    }
    return "sunset"
  })

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentTheme)
  }, [currentTheme])

  const handleThemeChange = (theme) => {
    setCurrentTheme(theme)
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem("theme", theme)
      } catch (error) {
        console.error("Error saving theme:", error)
      }
    }
  }

  return (
    <div className="dropdown dropdown-end">
      {/* TRIGGER BUTTON */}
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle hover:bg-primary/10 transition-colors">
        <div className="relative">
          <Palette size={20} className="opacity-70" />
          <Sparkles size={8} className="absolute -top-1 -right-1 text-primary animate-pulse" />
        </div>
      </div>

      {/* THE DROPDOWN MENU */}
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100/95 backdrop-blur-md rounded-xl z-[50] w-52 p-2 shadow-2xl border border-base-300 mt-4 max-h-80 overflow-y-auto"
      >
        <li className="menu-title px-4 py-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Visual Interface</span>
        </li>

        <div className="divider my-0 opacity-20"></div>

        {themes.map((theme) => (
          <li key={theme} className="px-1">
            <button
              onClick={() => handleThemeChange(theme)}
              className={`flex items-center justify-between py-3 rounded-lg mt-1 transition-all ${
                currentTheme === theme
                ? "bg-primary/10 text-primary font-bold"
                : "hover:bg-base-200"
              }`}
            >
              <div className="flex items-center gap-3">
                {/* SMALL COLOR PREVIEW DOTS */}
                <div data-theme={theme} className="flex gap-0.5 p-1 bg-neutral rounded-md">
                  <div className="w-1.5 h-3 bg-primary rounded-full"></div>
                  <div className="w-1.5 h-3 bg-secondary rounded-full"></div>
                </div>
                <span className="capitalize text-xs tracking-wide">{theme}</span>
              </div>

              {currentTheme === theme && <Check size={14} className="text-primary" />}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ThemeSwitcher
