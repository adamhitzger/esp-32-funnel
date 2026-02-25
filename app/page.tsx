import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { SpecsSection } from "@/components/specs-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { Footer } from "@/components/footer"

export default async function Home() {
  
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <FeaturesSection />
      <SpecsSection />
      <NewsletterSection />
      <Footer />
    </main>
  )
}
