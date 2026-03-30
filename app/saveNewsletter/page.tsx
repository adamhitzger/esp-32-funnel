import Link from "next/link"
import { CheckCircle2, XCircle, ArrowLeft, Mail } from "lucide-react"
import { saveNewsletter } from "@/server/action"

interface PageProps {
  searchParams: Promise<{ email?: string }>
}

export default async function SaveNewsletterPage({ searchParams }: PageProps) {
  const params = await searchParams
  const email = params.email

  if (!email) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-3">
            Neplatný odkaz
          </h1>
          <p className="text-muted-foreground mb-6">
            Odkaz pro ověření e-mailu je neplatný nebo vypršel.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-electric-cyan hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Zpět na hlavní stránku
          </Link>
        </div>
      </main>
    )
  }

  const result = await saveNewsletter(email)

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      {/* Background glow */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <div
          className={`w-[400px] h-[400px] rounded-full opacity-20 blur-3xl ${
            result.success ? "bg-electric-cyan" : "bg-red-500"
          }`}
        />
      </div>

      <div className="relative z-10 max-w-md w-full">
        <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-8 text-center">
          {result.success ? (
            <>
              <div className="w-20 h-20 rounded-full bg-electric-cyan/10 border border-electric-cyan/30 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-electric-cyan" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-3">
                E-mail ověřen!
              </h1>
              <p className="text-muted-foreground mb-2">
                {result.message}
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-electric-cyan mt-4 mb-6">
                <Mail className="w-4 h-4" />
                <span>{email}</span>
              </div>
            </>
          ) : (
            <>
              <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-6">
                <XCircle className="w-10 h-10 text-red-500" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-3">
                Něco se nepovedlo
              </h1>
              <p className="text-muted-foreground mb-6">
                {result.message}
              </p>
            </>
          )}

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-electric-cyan text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4" />
            Zpět na hlavní stránku
          </Link>
        </div>
      </div>
    </main>
  )
}
