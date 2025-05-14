
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      // Add your WordPress site's hostname here
      // Example:
      // {
      //   protocol: 'https',
      //   hostname: 'your-wordpress-domain.com',
      //   port: '',
      //   pathname: '/wp-content/uploads/**',
      // },
      // If using a generic placeholder for WP domain for now:
      {
        protocol: 'https',
        hostname: '**.gravatar.com', // For author avatars from WordPress
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http', // Or https, depending on your local WP setup
        hostname: 'localhost', // If your local WP runs on localhost
        port: '', // Add port if needed e.g. '8000' for WP on localhost:8000
        pathname: '/wp-content/uploads/**',
      },
       {
        protocol: 'https',
        hostname: 'secure.gravatar.com',
        port: '',
        pathname: '/**',
      },
      // Add any other domains from which you serve images
    ],
  },
};

export default nextConfig;
