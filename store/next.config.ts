import type { NextConfig } from "next";

// Pages that list the old placeholder/demo products point to Shop All until real
// products replace them. Temporary (307) so they can be switched back on later.
const placeholderRoutes = ["/made-yours", "/in-color", "/new-arrivals", "/collections", "/archive", "/product"];

const nextConfig: NextConfig = {
  async redirects() {
    return placeholderRoutes.flatMap((r) => [
      { source: r, destination: "/shop", permanent: false },
      { source: `${r}/:path*`, destination: "/shop", permanent: false },
    ]);
  },
};

export default nextConfig;
