"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// The shop's banner, header and footer wrap every page except the admin dashboard.
export default function SiteChrome({
  banner,
  header,
  footer,
  children,
}: {
  banner: ReactNode;
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}) {
  const isAdmin = usePathname()?.startsWith("/admin");
  if (isAdmin) return <main className="flex-1">{children}</main>;
  return (
    <>
      {banner}
      {header}
      <main className="flex-1">{children}</main>
      {footer}
    </>
  );
}
