"use client"

import { useActionState, useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Star, Send, CheckCircle, Loader2 } from "lucide-react"
import { ActionRes } from "@/types"
import { ReviewType } from "@/server/schema"
import { saveReview } from "@/server/action"
import { toast } from "sonner"

const actionState: ActionRes<ReviewType> = {
    message: "",
    submitted: false,
    success: false
}

export default function HodnoceniPage() {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [state, action, isPending] = useActionState(saveReview, actionState) 

  useEffect(() => {
    if(state.submitted){
      if(state.success){
        toast.success(state.message)
      }else {
        toast.error(state.message)
      }
    }
  },[state.message, state.submitted, state.success])
  

  if (state.submitted && state.success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        {/* Background effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-cyan/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-orange/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-md w-full">
          <div className="rounded-3xl border border-electric-cyan/30 bg-card/80 backdrop-blur-sm p-8 text-center shadow-[0_0_60px_rgba(0,200,255,0.15)]">
            <div className="w-16 h-16 rounded-full bg-electric-cyan/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-electric-cyan" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-3">
              {"Děkujeme za vaše hodnocení!"}
            </h1>
            <p className="text-muted-foreground mb-6">
              {"Vaše zpětná vazba nám pomáhá zlepšovat naše produkty a služby."}
            </p>
            <Button asChild className="bg-electric-cyan hover:bg-electric-cyan/90 text-background">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {"Zpět na hlavní stránku"}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-cyan/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-orange/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-xl relative z-10">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-electric-cyan transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">{"Zpět na hlavní stránku"}</span>
        </Link>

        {/* Form card */}
        <div className="rounded-3xl border border-electric-cyan/20 bg-card/80 backdrop-blur-sm p-8 shadow-[0_0_60px_rgba(0,200,255,0.1)]">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-electric-cyan/10 flex items-center justify-center mx-auto mb-4">
              <Star className="w-7 h-7 text-electric-cyan" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {"Napište nám hodnocení"}
            </h1>
            <p className="text-muted-foreground">
              {"Vaše zpětná vazba nám pomáhá se zlepšovat"}
            </p>
          </div>

          <form action={action} className="space-y-6">
            {/* Name fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm text-muted-foreground mb-1.5">
                  {"Jméno"}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Jan"
                  className="w-full h-11 px-4 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-electric-cyan/50 focus:border-electric-cyan/50 transition-all"
                />
                {state.errors?.name && (
                  <p className="text-xs text-red-400 mt-1">{state.errors?.name}</p>
                )}
              </div>
              <div>
                <label htmlFor="surname" className="block text-sm text-muted-foreground mb-1.5">
                  {"Příjmení"}
                </label>
                <input
                  id="surname"
                  name="surname"
                  type="text"
                  required
                  placeholder="Novák"
                  className="w-full h-11 px-4 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-electric-cyan/50 focus:border-electric-cyan/50 transition-all"
                />
                {state.errors?.surname && (
                  <p className="text-xs text-red-400 mt-1">{state.errors?.surname}</p>
                )}
              </div>
            </div>

            {/* Star rating */}
            <div>
              <label className="block text-sm text-muted-foreground mb-3">
                {"Hodnocení"}
              </label>
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="p-1 transition-transform hover:scale-110"
                    aria-label={`${star} hvězd`}
                  >
                    <Star
                      className={`w-10 h-10 transition-colors ${
                        star <= (hoveredRating || rating)
                          ? "fill-electric-orange text-electric-orange"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  </button>
                ))}
              </div>
              {state.errors?.rating && (
                <p className="text-xs text-red-400 mt-2 text-center">{state.errors.rating}</p>
              )}
              {rating > 0 && (
                <p className="text-sm text-muted-foreground text-center mt-2">
                  {rating === 1 && "Velmi špatné"}
                  {rating === 2 && "Špatné"}
                  {rating === 3 && "Průměrné"}
                  {rating === 4 && "Dobré"}
                  {rating === 5 && "Výborné"}
                </p>
              )}
              <input type="hidden" name="rating" value={rating}/>
            </div>

            {/* Review text */}
            <div>
              <label htmlFor="review" className="block text-sm text-muted-foreground mb-1.5">
                {"Vaše hodnocení"}
              </label>
              <textarea
                id="review"
                name="review"
                required
                rows={4}
                placeholder="Napište nám, co si myslíte o našem produktu..."
                className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-electric-cyan/50 focus:border-electric-cyan/50 transition-all resize-none"
              />
              {state.errors?.review && (
                <p className="text-xs text-red-400 mt-1">{state.errors.review}</p>
              )}
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              disabled={isPending || rating === 0}
              className="w-full h-12 text-base font-semibold bg-electric-cyan hover:bg-electric-cyan/90 text-background shadow-[0_0_30px_rgba(0,200,255,0.3)] hover:shadow-[0_0_50px_rgba(0,200,255,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  {"Odesílám..."}
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  {"Odeslat hodnocení"}
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Trust note */}
        <p className="text-xs text-muted-foreground text-center mt-6">
          {"Vaše hodnocení bude zveřejněno po schválení."}
        </p>
      </div>
    </div>
  )
}
