import { useState, useEffect } from 'react'

function ThemeSwitcher() {
  const themes = ["light", "dark", "sunset", "cupcake", "cyberpunk", "forest", "luxury", "synthwave"]

  // Lazy initialization - only runs once on mount
  const [currentTheme, setCurrentTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        return localStorage.getItem("theme") || "sunset"
      } catch (error) {
        console.error("Error loading theme:", error)
        return "sunset"
      }
    }
    return "sunset"
  })

  // Only handle DOM side effects in useEffect
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentTheme)
  }, [currentTheme])

  const handleThemeChange = (theme) => {
    setCurrentTheme(theme)

    // Save to localStorage
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
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-lg border border-base-300 max-h-96 overflow-y-auto"
      >
        <li className="menu-title">
          <span>Choose Theme</span>
        </li>
        {themes.map((theme) => (
          <li key={theme}>
            <a
              onClick={() => handleThemeChange(theme)}
              className={currentTheme === theme ? "active" : ""}
            >
              <span className="capitalize">{theme}</span>
              {currentTheme === theme && <span className="text-primary">✓</span>}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ThemeSwitcher
