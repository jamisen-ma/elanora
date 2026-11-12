import { createHmac, timingSafeEqual } from "crypto";

// Admin sign-in: one shared password (ADMIN_PASSWORD, set in Vercel). Signing in sets a cookie
// holding an expiry time and an HMAC of it keyed by the password, so changing the password
// signs every device out.

export const ADMIN_COOKIE = "elanora_admin";
export const SESSION_DAYS = 30;

const secret = () => process.env.ADMIN_PASSWORD || "";

const sign = (payload: string) => createHmac("sha256", secret()).update(payload).digest("base64url");

const sameText = (a: string, b: string) => {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
};

export const adminConfigured = () => secret().length > 0;

export function checkPassword(attempt: string) {
  return adminConfigured() && sameText(sign(`pw:${attempt}`), sign(`pw:${secret()}`));
}

export function createSessionToken() {
  const expires = String(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  return `${expires}.${sign(`session:${expires}`)}`;
}

export function isValidSession(token: string | undefined) {
  if (!token || !adminConfigured()) return false;
  const [expires, mac] = token.split(".");
  if (!expires || !mac || !(Number(expires) > Date.now())) return false;
  return sameText(mac, sign(`session:${expires}`));
}
