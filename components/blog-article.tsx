"use client"
import { Article } from "@/types"
import { sendGTMEvent } from "@next/third-parties/google"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Calendar } from "lucide-react";
import { urlFor } from "@/sanity/lib/image"
import { fbEvent } from "@rivercode/facebook-conversion-api-nextjs"
export function BlogPost({article}: {article: Article}){
    return(
         <Link
              href={`/blog/${article.slug.current}`}
              className="group"
              onClick={()=> {sendGTMEvent({
                   event: "view_article",
                   content_id: article._id,
                   path: `especko.cz/blog/${article.slug.current}`,
                   name: article.heading, 
              }) 
              fbEvent({
                eventName: "view_article",
                   firstName: `especko.cz/blog/${article.slug.current}`,
                   lastName: article.heading, 
              })
              }}
            >
              <article className="h-full rounded-2xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-electric-cyan/50 hover:shadow-[0_0_30px_rgba(0,200,255,0.1)]">
                {/* Image */}
                {article.image && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={urlFor(article.image).url()}
                      alt={article.heading}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                  </div>
                )}

                {/* Content */}
                <div className="p-5">
                  {/* Date */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    <time dateTime={article.datum}>
                      {new Date(article.datum).toLocaleDateString("cs-CZ", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-electric-cyan transition-colors">
                    {article.heading}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {article.description}
                  </p>

                  {/* Read more */}
                  <div className="flex items-center gap-1 mt-4 text-sm font-medium text-electric-cyan">
                    <span>Přečíst více</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </article>
            </Link>
    )
}