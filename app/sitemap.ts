import { sanityFetch } from "@/sanity/lib/client";
import { Article, ArticleCategory } from "@/types";
import type { MetadataRoute } from "next"

const SITE_URL = "https://especko.cz"

async function getAllArticleSlugs(): Promise<Article[]> {
  return await sanityFetch<Article[]>({query:`
    *[_type == "article"] | order(datum desc) {
      "slug": slug.current,
      "category": category->slug.current,
      datum
    }
  `});
}

async function getAllArticleCategorySlugs(): Promise<ArticleCategory[]> {
  return await sanityFetch<ArticleCategory[]>({query:`
    *[_type == "article_category"] {
      _createdAt,
      "slug": slug.current,
      datum
    }
  `});
}


export default async function sitemap(): Promise<MetadataRoute.Sitemap>{
  const articles = await getAllArticleSlugs();
  const categories = await getAllArticleCategorySlugs()

  const blogUrls = articles.map((article) => ({
    url: `${SITE_URL}/blog/${article.category}/${article.slug}`,
    lastModified: new Date(article.datum).toISOString().split('T')[0],
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogCategoryUrls = categories.map((article) => ({
    url: `${SITE_URL}/blog/${article.slug}`,
    lastModified: new Date(article._createdAt).toISOString().split('T')[0],
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [
    {
      url: SITE_URL,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...blogCategoryUrls,
    ...blogUrls,
    {
      url: `${SITE_URL}/jak-objednat`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/vraceni`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/checkout`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: "monthly",
      priority: 0.8,
    },
        {
      url: `${SITE_URL}/doprava-platba`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/podminky`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/reklamace`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/zasady`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/unsubscribe`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: "yearly",
      priority: 0.1,
    },
  ]
}