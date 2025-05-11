/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enables static HTML export
  trailingSlash: true,  // Adds trailing slashes to exported URLs
  distDir: 'out',  // Specify the output directory  
  images: {
    unoptimized: true,  // Required for static export
    domains: ['picsum.photos'], // Allow images from picsum.photos
  }
};

module.exports = nextConfig; 