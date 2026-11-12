import type { NextConfig } from "next";

// Pages that list the old placeholder/demo products point to Shop All until real
// products replace them. Temporary (307) so they can be switched back on later.
const placeholderRoutes = ["/made-yours", "/in-color", "/new-arrivals", "/collections", "/archive", "/product"];

const nextConfig: NextConfig = {
  // Dev only: let phones/tablets on the same Wi-Fi load the dev server's scripts via the
  // Mac's local-network address (Next blocks non-localhost origins by default). 172.20.x.x is
  // the iPhone Personal Hotspot range. *.trycloudflare.com: temporary public preview links (cloudflared).
  allowedDevOrigins: ["*.local", "192.168.*.*", "10.*.*.*", "172.16.*.*", "172.20.*.*", "*.trycloudflare.com"],
  async redirects() {
    return placeholderRoutes.flatMap((r) => [
      { source: r, destination: "/shop", permanent: false },
      { source: `${r}/:path*`, destination: "/shop", permanent: false },
    ]);
  },
};

export default nextConfig;
