/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gonf7za2h5pl262h.public.blob.vercel-storage.com",
        port: "",
        pathname: "/products/**", // Adjust if your path prefix is different
      },
      {
        protocol: "https",
        hostname: "gonf7za2h5pl262h.public.blob.vercel-storage.com",
        port: "",
        pathname: "/advertisements/**", // Adjust if your path prefix is different
      },
      {
        protocol: "https",
        hostname: "gonf7za2h5pl262h.public.blob.vercel-storage.com",
        port: "",
        pathname: "/customers/**", // Adjust if your path prefix is different
      },
      {
        protocol: "https",
        hostname: "gonf7za2h5pl262h.public.blob.vercel-storage.com",
        port: "",
        pathname: "/staffs/**", // Adjust if your path prefix is different
      },
      {
        protocol: "https",
        hostname: "gonf7za2h5pl262h.public.blob.vercel-storage.com",
        port: "",
        pathname: "/staffs/avatars/**", // Adjust if your path prefix is different
      },
      {
        protocol: "https",
        hostname: "gonf7za2h5pl262h.public.blob.vercel-storage.com",
        port: "",
        pathname: "/staffs/documents/**", // Adjust if your path prefix is different
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // Increase the limit (e.g., 10MB)
    },
  },
};

export default nextConfig;
