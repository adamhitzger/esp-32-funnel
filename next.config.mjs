/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
          {
            protocol: "https",
            hostname: "api.paylibo.com",
          },
    ],
  },
  serverExternalPackages: ["@sparticuz/chromium-min", "puppeteer-core"],
}

export default nextConfig
