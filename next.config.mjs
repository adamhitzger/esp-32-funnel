/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
   serverExternalPackages: ["@sparticuz/chromium-min", "puppeteer-core"],
}

export default nextConfig
