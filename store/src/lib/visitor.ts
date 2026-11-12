// Anonymous visitor id: a hash of the IP address and today's date (UTC). The same person is one
// visitor for the day, but can't be followed from one day to the next. Raw IPs are never stored.
export async function visitorIdFrom(headers: Headers): Promise<string | undefined> {
  const ip = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (!ip) return undefined;
  const data = new TextEncoder().encode(ip + new Date().toISOString().slice(0, 10));
  const hash = new Uint8Array(await crypto.subtle.digest("SHA-256", data));
  return Array.from(hash.slice(0, 8), (b) => b.toString(16).padStart(2, "0")).join("");
}

const KNOWN = ["google", "instagram", "tiktok", "facebook", "pinterest", "youtube", "reddit", "linkedin"];

// Where a visitor came from, matching the dashboard's "Sources": the UTM source if the link had
// one, else the referring site's category (google, instagram…), else "direct".
export function sourceOf(utmSource?: string, referrer?: string): string {
  if (utmSource) return utmSource.toLowerCase().slice(0, 100);
  if (!referrer || referrer === "direct" || /elanora/i.test(referrer)) return "direct";
  const host = referrer.toLowerCase();
  if (host.includes("fb.com")) return "facebook";
  if (host.includes("twitter") || host === "x.com" || host.endsWith(".x.com")) return "twitter";
  return KNOWN.find((k) => host.includes(k)) ?? host.replace(/^www\./, "").slice(0, 100);
}
