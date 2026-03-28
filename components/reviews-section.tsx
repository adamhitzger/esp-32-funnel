"use client"

import { useState, useEffect, useCallback } from "react"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ReviewType } from "@/server/schema"

interface ReviewsSectionProps {
  reviews: ReviewType[]
}

export function ReviewsSection({ reviews }: ReviewsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const nextSlide = useCallback(() => {
    if (reviews.length === 0) return
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }, [reviews.length])

  const prevSlide = () => {
    if (reviews.length === 0) return
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying || reviews.length <= 1) return

    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, reviews.length, nextSlide])

  const renderStars = (rating: string) => {
    const ratingNum = parseInt(rating) || 5
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= ratingNum
                ? "fill-electric-orange text-electric-orange"
                : "text-muted-foreground/30"
            }`}
          />
        ))}
      </div>
    )
  }

  if (reviews.length === 0) {
    return (
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Co říkají naši zákazníci
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Zatím nemáme žádná hodnocení. Buďte první, kdo nám zanechá recenzi!
            </p>
          </div>
          
          <div className="text-center">
            <Button asChild className="bg-electric-cyan hover:bg-electric-cyan/90 text-background">
              <Link href="/hodnoceni">Napsat hodnocení</Link>
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-electric-cyan/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-electric-orange/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Co říkají naši zákazníci
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Přečtěte si recenze od spokojených zákazníků, kteří již používají ESP32 DevKit.
          </p>
        </div>

        {/* Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Navigation buttons */}
            {reviews.length > 1 && (
              <>
                <button
                  onClick={() => {
                    prevSlide()
                    setIsAutoPlaying(false)
                  }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-secondary/80 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-electric-cyan/50 transition-colors"
                  aria-label="Předchozí recenze"
                >
                  <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                </button>
                <button
                  onClick={() => {
                    nextSlide()
                    setIsAutoPlaying(false)
                  }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-secondary/80 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-electric-cyan/50 transition-colors"
                  aria-label="Další recenze"
                >
                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              </>
            )}

            {/* Review card */}
            <div className="rounded-3xl border border-electric-cyan/20 bg-card/80 backdrop-blur-sm p-8 md:p-12 shadow-[0_0_60px_rgba(0,200,255,0.1)]">
              {/* Quote icon */}
              <div className="flex justify-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-electric-cyan/10 flex items-center justify-center">
                  <Quote className="w-7 h-7 text-electric-cyan" />
                </div>
              </div>

              {/* Stars */}
              <div className="flex justify-center mb-6">
                {renderStars(reviews[currentIndex].rating)}
              </div>

              {/* Review text */}
              <blockquote className="text-center mb-8">
                <p className="text-lg md:text-xl text-foreground leading-relaxed">
                  &ldquo;{reviews[currentIndex].review}&rdquo;
                </p>
              </blockquote>

              {/* Author */}
              <div className="text-center">
                <p className="font-semibold text-foreground">
                  {reviews[currentIndex].name} {reviews[currentIndex].surname}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {/*new Date(reviews[currentIndex]._createdAt).toLocaleDateString("cs-CZ", {
                    year: "numeric",
                    month: "long",
                  })*/}
                </p>
              </div>
            </div>
          </div>

          {/* Dots indicator */}
          {reviews.length > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === currentIndex
                      ? "w-8 bg-electric-cyan"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Přejít na recenzi ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="text-center mt-10">
            <Button asChild variant="outline" className="border-electric-cyan/30 text-electric-cyan hover:bg-electric-cyan/10 hover:text-electric-cyan">
              <Link href="/hodnoceni">Napsat vlastní hodnocení</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
