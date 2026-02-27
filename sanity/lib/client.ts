import { createClient } from 'next-sanity'
import type { ClientPerspective, QueryParams } from "next-sanity";
import { apiVersion, dataset, projectId } from '../env'

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_TOKEN!
})

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  perspective = "published",
  stega = perspective === "previewDrafts" ||
  process.env.VERCEL_ENV === "preview",
  revalidate,
}: {
  query: string;
  params?: QueryParams;
  perspective?: Omit<ClientPerspective, "raw">;
  stega?: boolean;
  revalidate?: number
}) {
  if(!revalidate) revalidate = 30
  return sanityClient.fetch<QueryResponse>(query, params, {
    stega,
    perspective: "published",
    useCdn: true,
    next: { revalidate:  revalidate},
  });
}