import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, adminConfigured, isValidSession } from "@/lib/adminAuth";

// Keeps the admin dashboard and its data behind the admin password. Only reading the data
// (GET) is locked: visitors' tracking beacons and waitlist signups (POST) stay open.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/admin/login") return NextResponse.next();
  if (pathname.startsWith("/api/") && request.method !== "GET") return NextResponse.next();

  // Working on your own computer without a password set: leave it open.
  if (!adminConfigured() && process.env.NODE_ENV === "development") return NextResponse.next();

  if (isValidSession(request.cookies.get(ADMIN_COOKIE)?.value)) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const login = new URL("/admin/login", request.url);
  login.searchParams.set("next", pathname);
  return NextResponse.redirect(login);
}

export const config = {
  matcher: ["/admin/:path*", "/api/analytics", "/api/waitlist"],
};
