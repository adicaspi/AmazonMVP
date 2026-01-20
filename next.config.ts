import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
        images: {
          remotePatterns: [
            {
              protocol: 'https',
              hostname: 'images-na.ssl-images-amazon.com',
              pathname: '/images/**',
            },
            {
              protocol: 'https',
              hostname: 'm.media-amazon.com',
              pathname: '/images/**',
            },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        pathname: '/**',
      },
          ],
          formats: ['image/avif', 'image/webp'],
          deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
          imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        },
};

// Wrap MDX and Next.js config together
const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

export default withMDX(nextConfig);
