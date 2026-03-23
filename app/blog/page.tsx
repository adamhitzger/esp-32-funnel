import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Article } from "@/types";
import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/client";
import { ARTICLES_COUNT, GET_ARTICLES_BY_PAGE } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { BlogPost } from "@/components/blog-article";

export const metadata: Metadata = {
  title: "Blog | ESP32 DevKit",
  description: "ESP32 Tutoriály na especko.cz",
authors: [{ name: "especko.cz", url: "https://especko.cz/blog" }],
  creator: "especko.cz",
  publisher: "especko.cz",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: "https://especko.cz/blog",
    siteName: "especko.cz",
    title: "ESP32 DevKit | Pohon pro vaše IoT projekty",
    description:
      "Vysoce výkonný mikrokontrolér ESP32 s WiFi a Bluetooth. Ideální pro IoT, automatizaci a vestavěné systémy.",
    images: [
      {
        url: "/images/esp32.png",
        width: 1200,
        height: 630,
        alt: "ESP32 DevKit vývojová deska",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ESP32 Tutoriály na especko.cz",
    description:
      "Vysoce výkonný mikrokontrolér ESP32 s WiFi a Bluetooth. Ideální pro IoT, automatizaci a vestavěné systémy.",
    images: ["/images/esp32.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://especko.cz/blog",
  },
  icons: {
    icon: [
      {
        url: "/especko.ico",
      },
    ],
  },
};

const ARTICLES_PER_PAGE = 6;

async function getArticles(page: number): Promise<{ articles: Article[]; total: number }> {
  const start = (page - 1) * ARTICLES_PER_PAGE;
  const end = start + ARTICLES_PER_PAGE;
  
  const [articles, total] = await Promise.all([
    await sanityFetch<Article[]>({
        query: GET_ARTICLES_BY_PAGE,
        params: { start, end }
    }),
    await sanityFetch<number>({
        query: ARTICLES_COUNT,
    }),
  ]);
  
  return { articles, total };
}

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function BlogPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params.page || "1", 10));
  const { articles, total } = await getArticles(currentPage);
  const totalPages = Math.ceil(total / ARTICLES_PER_PAGE);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-electric-cyan/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-electric-orange/10 rounded-full blur-[80px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <Button asChild variant="ghost" size="sm" className="mb-6 text-muted-foreground hover:text-foreground">
            <Link href="/" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Zpět na hlavní stránku
            </Link>
          </Button>

          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              <span className="text-foreground">ESP32</span>{" "}
              <span className="text-electric-cyan">Blog</span>
            </h1>
            <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
             Prozkoumejte naši sbírku tutoriálů, průvodců a nápadů na projekty, které vám pomohou zvládnout vývoj v ESP32.
            </p>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="pb-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
             <BlogPost article={article} key={article._id}/>
            ))}
          </div>

          {articles.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Nebyly nalezeny žadné články.</p>
            </div>
          )}
        </div>
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <section className="pb-20">
          <div className="container mx-auto px-4">
            <nav className="flex items-center justify-center gap-2">
              {/* Previous button */}
              <Button
                asChild={currentPage > 1}
                variant="outline"
                size="icon"
                disabled={currentPage <= 1}
                className="border-border hover:border-electric-cyan/50 hover:bg-electric-cyan/10 disabled:opacity-40"
              >
                {currentPage > 1 ? (
                  <Link href={`/blog?page=${currentPage - 1}`}>
                    <ChevronLeft className="w-4 h-4" />
                  </Link>
                ) : (
                  <span>
                    <ChevronLeft className="w-4 h-4" />
                  </span>
                )}
              </Button>

              {/* Page numbers */}
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  // Show first page, last page, current page, and pages around current
                  const showPage =
                    page === 1 ||
                    page === totalPages ||
                    Math.abs(page - currentPage) <= 1;
                  
                  const showEllipsisBefore = page === currentPage - 2 && currentPage > 3;
                  const showEllipsisAfter = page === currentPage + 2 && currentPage < totalPages - 2;

                  if (showEllipsisBefore || showEllipsisAfter) {
                    return (
                      <span key={`ellipsis-${page}`} className="px-2 text-muted-foreground">
                        ...
                      </span>
                    );
                  }

                  if (!showPage) return null;

                  const isActive = page === currentPage;

                  return (
                    <Button
                      key={page}
                      asChild={!isActive}
                      variant={isActive ? "default" : "outline"}
                      size="icon"
                      className={
                        isActive
                          ? "bg-electric-cyan text-background hover:bg-electric-cyan/90"
                          : "border-border hover:border-electric-cyan/50 hover:bg-electric-cyan/10"
                      }
                    >
                      {isActive ? (
                        <span>{page}</span>
                      ) : (
                        <Link href={`/blog?page=${page}`}>{page}</Link>
                      )}
                    </Button>
                  );
                })}
              </div>

              {/* Next button */}
              <Button
                asChild={currentPage < totalPages}
                variant="outline"
                size="icon"
                disabled={currentPage >= totalPages}
                className="border-border hover:border-electric-cyan/50 hover:bg-electric-cyan/10 disabled:opacity-40"
              >
                {currentPage < totalPages ? (
                  <Link href={`/blog?page=${currentPage + 1}`}>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <span>
                    <ChevronRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </nav>

            {/* Page info */}
            <p className="text-center text-sm text-muted-foreground mt-4">
              Stránka {currentPage} z {totalPages} ({total} článků)
            </p>
          </div>
        </section>
      )}
    </main>
  );
}
