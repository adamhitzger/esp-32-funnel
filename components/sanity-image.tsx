"use client"

import Image, { type ImageProps } from "next/image"
import type { SanityImageSource } from "@sanity/image-url/lib/types/types"
import { urlFor } from "@/sanity/lib/image"

type SanityImageProps = Omit<ImageProps, "src" | "loader"> & {
  image: SanityImageSource
  /** šířka / výška, např. 16 / 9 – ořízne obrázek na CDN (respektuje hotspot) */
  aspectRatio?: number
}

// Next vygeneruje srcset, ale každou velikost zmenší a převede Sanity CDN, ne Vercel
export function SanityImage({ image, aspectRatio, ...props }: SanityImageProps) {
  return (
    <Image
      {...props}
      src={urlFor(image).url()}
      loader={({ width, quality }) => {
        let url = urlFor(image).width(width).quality(quality ?? 75).auto("format").fit("max")
        if (aspectRatio) url = url.height(Math.round(width / aspectRatio)).fit("crop")
        return url.url()
      }}
    />
  )
}
