import { sanityFetch } from "@/sanity/lib/client";
import { Article } from "@/types";
import type { MetadataRoute } from "next"

const SITE_URL = "https://especko.cz"

async function getAllArticleSlugs(): Promise<Article[]> {
  return await sanityFetch<Article[]>({query:`
    *[_type == "article"] | order(datum desc) {
      "slug": slug.current,
      datum
    }
  `});
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap>{
  const articles = await getAllArticleSlugs();

  const blogUrls = articles.map((article) => ({
    url: `${SITE_URL}/blog/${article.slug}`,
    lastModified: new Date(article.datum),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...blogUrls,
    {
      url: `${SITE_URL}/checkout`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
        {
      url: `${SITE_URL}/doprava-platba`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/podminky`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/reklamace`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/zasady`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/unsubscribe`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.1,
    },
  ]
}