"use client"

import { useState, useEffect, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { Loader2, Cookie } from "lucide-react"

export default function CookiesBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    const hasAgreed = localStorage.getItem("provoz") === "on"
    if (!hasAgreed) {
      setIsVisible(true)
    }
  }, [])

  function setData(formData: FormData) {
    const personal = formData.get("personal")
    localStorage.setItem("personal", String(personal))
    const provoz = formData.get("provoz")
    localStorage.setItem("provoz", String(provoz))
    const analytics = formData.get("analytics")
    localStorage.setItem("analytics", String(analytics))
  }

  const setCookie = (formData: FormData) => {
    startTransition(async () => {
      setData(formData)
      toast.success("Děkujeme za nastavení cookies")
    })
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <>
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="rounded-2xl border border-electric-cyan/20 bg-card shadow-[0_0_60px_rgba(0,200,255,0.1)] max-w-md w-full">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-electric-cyan/10 flex items-center justify-center">
                <Cookie className="w-5 h-5 text-electric-cyan" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Cookies</h2>
            </div>

            <p className="text-sm text-muted-foreground mb-6">
              Používáme cookies pro lepší provoz naší stránky. Vyberte, které
              kategorie chcete povolit.
            </p>

            <form action={setCookie} className="flex flex-col gap-4">
              <div className="flex flex-row items-center gap-3 rounded-xl bg-secondary/50 border border-border p-3">
                <Checkbox
                  id="personal"
                  name="personal"
                  className="border-muted-foreground data-[state=checked]:bg-electric-cyan data-[state=checked]:border-electric-cyan"
                />
                <label
                  htmlFor="personal"
                  className="text-sm font-medium leading-none text-foreground cursor-pointer"
                >
                  Uložení preferencí uživatele
                </label>
              </div>

              <div className="flex flex-row items-center gap-3 rounded-xl bg-secondary/50 border border-electric-cyan/30 p-3">
                <Checkbox
                  id="provoz"
                  name="provoz"
                  defaultChecked
                  disabled
                  className="border-electric-cyan data-[state=checked]:bg-electric-cyan data-[state=checked]:border-electric-cyan"
                />
                <label
                  htmlFor="provoz"
                  className="text-sm font-medium leading-none text-foreground cursor-pointer"
                >
                  Umožnění provozu stránky
                  <span className="text-xs text-muted-foreground ml-2">(nutné)</span>
                </label>
              </div>

              <div className="flex flex-row items-center gap-3 rounded-xl bg-secondary/50 border border-border p-3">
                <Checkbox
                  id="analytics"
                  name="analytics"
                  className="border-muted-foreground data-[state=checked]:bg-electric-cyan data-[state=checked]:border-electric-cyan"
                />
                <label
                  htmlFor="analytics"
                  className="text-sm font-medium leading-none text-foreground cursor-pointer"
                >
                  Shromažďování analytických údajů
                </label>
              </div>

              <Button
                type="submit"
                className="w-full mt-2 bg-electric-cyan hover:bg-electric-cyan/90 text-background font-semibold shadow-[0_0_20px_rgba(0,200,255,0.3)] hover:shadow-[0_0_30px_rgba(0,200,255,0.5)] transition-all"
              >
                {isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Potvrdit výběr"
                )}
              </Button>
            </form>

            <p className="text-xs text-muted-foreground text-center mt-4">
              Více informací v našich{" "}
              <a
                href="/zasady"
                className="text-electric-cyan hover:underline"
              >
                zásadách zpracování osobních údajů
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  )
}