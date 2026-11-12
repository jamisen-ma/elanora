import { NextResponse } from "next/server";
import { ADMIN_COOKIE, SESSION_DAYS, checkPassword, createSessionToken } from "@/lib/adminAuth";

// Only send people back to admin pages after signing in (never to another site).
const safeNext = (v: FormDataEntryValue | null) =>
  typeof v === "string" && /^\/admin(\/[\w\-/]*)?$/.test(v) && v !== "/admin/login" ? v : "/admin";

export async function POST(request: Request) {
  const form = await request.formData();
  const next = safeNext(form.get("next"));
  const password = form.get("password");

  if (typeof password !== "string" || !checkPassword(password)) {
    await new Promise((r) => setTimeout(r, 800)); // slow down guessing
    const back = new URL("/admin/login", request.url);
    back.searchParams.set("error", "1");
    back.searchParams.set("next", next);
    return NextResponse.redirect(back, 303);
  }

  const res = NextResponse.redirect(new URL(next, request.url), 303);
  res.cookies.set(ADMIN_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
  return res;
}
