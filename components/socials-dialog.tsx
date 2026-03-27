"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FACEBOOK_URL, INSTAGRAM_URL } from "@/lib/utils"

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}

export function SocialFollowDialog() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Check if user has already seen the dialog
    const hasSeenDialog = localStorage.getItem("social-dialog-seen")
    if (hasSeenDialog) return

    // Show dialog after 15 seconds
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 10000)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    localStorage.setItem("social-dialog-seen", "true")
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-md rounded-2xl border border-electric-cyan/30 bg-card p-6 shadow-[0_0_60px_rgba(0,200,255,0.2)]">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Zavřít"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-electric-cyan/10 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🔔</span>
          </div>

          <h2 className="text-xl font-bold text-foreground mb-2">
            Sledujte nás na sociálních sítích
          </h2>
          <p className="text-muted-foreground mb-6">
            Buďte první, kdo se dozví o novinkách, slevách a tipech pro vaše projekty!
          </p>

          {/* Social buttons */}
          <div className="flex flex-col gap-3">
            <Button
              asChild
              className="w-full h-12 bg-[#1877f2] hover:bg-[#1877f2]/90 text-white"
            >
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">
                <FacebookIcon className="w-5 h-5 mr-2" />
                Sledovat na Facebooku
              </a>
            </Button>

            <Button
              asChild
              className="w-full h-12 bg-gradient-to-r from-[#f09433] via-[#e6683c] to-[#bc1888] hover:opacity-90 text-white"
            >
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                <InstagramIcon className="w-5 h-5 mr-2" />
                Sledovat na Instagramu
              </a>
            </Button>
          </div>

          <button
            onClick={handleClose}
            className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Teď ne, díky
          </button>
        </div>
      </div>
    </div>
  )
}
