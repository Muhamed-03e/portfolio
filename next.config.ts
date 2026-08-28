import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "export",
    images: {
        formats: ["image/avif", "image/webp"],
        unoptimized: true,
    },
    serverExternalPackages: ["firebase-admin"],
    trailingSlash: true,
};

export default nextConfig;

