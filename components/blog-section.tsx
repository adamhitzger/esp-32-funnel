import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Article } from "@/types";
import { sanityFetch } from "@/sanity/lib/client";
import { GET_HOME_ARTICLES } from "@/sanity/lib/queries";
import { BlogPost } from "./blog-article";


export async function BlogSection() {
  const articles = await sanityFetch<Article[]>({query: GET_HOME_ARTICLES});

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-electric-cyan/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-electric-orange/10 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-electric-cyan/30 bg-electric-cyan/5 mb-6">
            <span className="text-sm font-mono text-electric-cyan">Nejnovější články z naší dílny</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            <span className="text-foreground">ESP32</span>{" "}
            <span className="text-electric-cyan">Tutoriály</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
           Naučte se, jak vytvářet úžasné IoT projekty s našimi tutoriály!
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {articles.map((article) => (
           <BlogPost article={article} key={article._id}/>
          ))}
        </div>

        {/* View all button */}
        <div className="text-center">
          <Button asChild variant="outline" size="lg" className="border-electric-cyan/30 hover:bg-electric-cyan/10 hover:border-electric-cyan/50">
            <Link href="/blog" className="gap-2">
              Všechny články
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
