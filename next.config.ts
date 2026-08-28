import type { NextConfig } from "next";

const repoName = "portfolio";

const nextConfig: NextConfig = {
    output: "export",
    basePath: `/${repoName}`,
    assetPrefix: `/${repoName}/`,
    images: {
        formats: ["image/avif", "image/webp"],
        unoptimized: true,
    },
