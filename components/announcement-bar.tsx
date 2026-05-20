"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X, ShoppingCart } from "lucide-react"

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const dismissed = localStorage.getItem("announcement-bar-dismissed")
    if (!dismissed) {
      setIsVisible(true)
    }
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    localStorage.setItem("announcement-bar-dismissed", "true")
  }

  if (!mounted || !isVisible) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-electric-cyan text-primary-foreground">
      <div className="container mx-auto px-4 py-2 flex items-center justify-center gap-2 text-sm">
        <ShoppingCart className="w-4 h-4 shrink-0" />
        <span className="text-center">
          {"Nevíte jak u nás nakoupit?"}{" "}
          <Link 
            href="/jak-objednat" 
            className="font-semibold underline underline-offset-2 hover:no-underline"
          >
            {"Přečtěte si návod"}
          </Link>
        </span>
        <button
          onClick={handleDismiss}
          className="ml-4 p-1 rounded hover:bg-black/10 transition-colors shrink-0"
          aria-label="Zavrit"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
