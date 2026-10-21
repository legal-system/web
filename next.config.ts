import type { NextConfig } from 'next';

// The browser always talks to /api on this origin; Next forwards it to the API.
// Same origin means no CORS and, later, the refresh cookie is sent automatically.
const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*',
      },
    ];
  },
};

export default nextConfig;
