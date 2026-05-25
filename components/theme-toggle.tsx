"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Sun, Moon } from "lucide-react"

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark")
  const [mounted, setMounted] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Load theme and position from localStorage
  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    
    if (savedTheme) {
      setTheme(savedTheme)
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    } else {
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleTheme = useCallback(() => {
    
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [ theme])


  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return null
  }

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      className={`fixed z-50 w-12 right-10 bottom-10 h-12 rounded-full bg-card border-2 border-border shadow-lg flex items-center justify-center transition-all duration-200 cursor-grab active:cursor-grabbing hover:scale-110 hover:border-electric-cyan hover:shadow-[0_0_20px_rgba(0,200,255,0.3)]`}
      style={{
        touchAction: "none",
      }}
      aria-label={theme === "dark" ? "Prepnout na svetly rezim" : "Prepnout na tmavy rezim"}
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-electric-cyan" />
      ) : (
        <Moon className="w-5 h-5 text-electric-cyan" />
      )}
    </button>
  )
}
