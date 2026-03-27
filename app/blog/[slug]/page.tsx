import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar } from "lucide-react";
import { PortableText } from "next-sanity";
import { Button } from "@/components/ui/button";
import { urlFor } from "@/sanity/lib/image";
import { components } from "@/sanity/lib/components";
import type { Article } from "@/types";
import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/client";
import { GET_ARTCILE_BY_SLUG } from "@/sanity/lib/queries";
import { HeroSection } from "@/components/hero-section";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getArticle(slug: string): Promise<Article | null> {
  return await sanityFetch<Article>({
   query: GET_ARTCILE_BY_SLUG,
     params: {slug} }
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return {
      title: "Článek nenalezen",
    };
  }

  const articleUrl = `https://especko.cz/blog/${slug}`;
  const imageUrl = article.image ? urlFor(article.image).width(1200).height(630).url() : "/images/esp32.png";

  return {
    title: article.heading,
    description: article.description,
    openGraph: {
      type: "article",
      locale: "cs_CZ",
      url: articleUrl,
      siteName: "especko.cz",
      title: article.heading,
      description: article.description,
      publishedTime: article.datum,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.heading,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.heading,
      description: article.description,
      images: [imageUrl],
    },
    alternates: {
      canonical: articleUrl,
    },
    icons: {
      icon: [{ url: "/especko.ico" }],
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-electric-cyan/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-electric-orange/10 rounded-full blur-[80px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <Button asChild variant="ghost" size="sm" className="mb-6 text-muted-foreground hover:text-foreground">
            <Link href="/blog" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Zoět na články
            </Link>
          </Button>

          <div className="max-w-3xl mx-auto">
            {/* Date */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Calendar className="w-4 h-4" />
              <time dateTime={article.datum}>
                {new Date(article.datum).toLocaleDateString("cs-CZ", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
              {article.heading}
            </h1>

            {/* Description */}
            <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
              {article.description}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {article.image && (
        <section className="pb-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-border">
                <Image
                  src={urlFor(article.image).width(1200).height(675).url()}
                  alt={article.heading}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <article className="max-w-3xl mx-auto prose prose-invert prose-lg prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-electric-cyan prose-strong:text-foreground prose-code:text-electric-cyan">
            <PortableText value={article.content} components={components} />
          </article>
        </div>
      </section>
     
        <HeroSection/>

      {/* Back to blog */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <Button asChild variant="outline" size="lg" className="border-electric-cyan/30 hover:bg-electric-cyan/10 hover:border-electric-cyan/50">
            <Link href="/blog" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Zpět na všechny články
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
