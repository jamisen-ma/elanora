"use client";

import { Suspense, useEffect, useCallback, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { track } from "@vercel/analytics";

// Extract UTM parameters from URL
function getUtmParams(searchParams: URLSearchParams) {
  return {
    utm_source: searchParams.get("utm_source") || undefined,
    utm_medium: searchParams.get("utm_medium") || undefined,
    utm_campaign: searchParams.get("utm_campaign") || undefined,
    utm_term: searchParams.get("utm_term") || undefined,
    utm_content: searchParams.get("utm_content") || undefined,
  };
}

// Get referrer info
function getReferrerInfo() {
  if (typeof window === "undefined") return {};

  const referrer = document.referrer;
  if (!referrer) return { referrer: "direct" };

  try {
    const url = new URL(referrer);
    const hostname = url.hostname;

    // Categorize referrer
    let source = "other";
    if (hostname.includes("google")) source = "google";
    else if (hostname.includes("instagram")) source = "instagram";
    else if (hostname.includes("tiktok")) source = "tiktok";
    else if (hostname.includes("facebook") || hostname.includes("fb.com"))
      source = "facebook";
    else if (hostname.includes("twitter") || hostname.includes("x.com"))
      source = "twitter";
    else if (hostname.includes("pinterest")) source = "pinterest";
    else if (hostname.includes("youtube")) source = "youtube";
    else if (hostname.includes("reddit")) source = "reddit";
    else if (hostname.includes("linkedin")) source = "linkedin";

    return { referrer: hostname, referrer_source: source };
  } catch {
    return { referrer };
  }
}

// Get device info
function getDeviceInfo() {
  if (typeof window === "undefined") return {};

  const ua = navigator.userAgent;
  const isMobile = /iPhone|iPad|iPod|Android/i.test(ua);
  const isTablet = /iPad|Android(?!.*Mobile)/i.test(ua);

  return {
    device: isTablet ? "tablet" : isMobile ? "mobile" : "desktop",
    screen: `${window.screen.width}x${window.screen.height}`,
    language: navigator.language,
  };
}

// Send event to our analytics API
async function logEvent(
  event: string,
  data: Record<string, string | number | boolean | undefined>
) {
  try {
    // Filter out undefined values
    const cleanData: Record<string, string | number | boolean> = {};
    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined) cleanData[key] = value;
    }

    navigator.sendBeacon(
      "/api/analytics",
      JSON.stringify({ event, ...cleanData, timestamp: Date.now() })
    );
  } catch {
    // Silently fail — analytics should never break the app
  }
}

// Track custom events (exported for use in other components)
export function trackEvent(
  name: string,
  data?: Record<string, string | number | boolean>
) {
  // Send to Vercel Analytics
  try {
    track(name, data);
  } catch {
    // Vercel Analytics might not be available in dev
  }

  // Send to our own API
  logEvent(name, {
    ...data,
    ...getReferrerInfo(),
    ...getDeviceInfo(),
  });
}

function AnalyticsInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastPathRef = useRef<string>("");

  const trackPageView = useCallback(() => {
    if (pathname === lastPathRef.current) return;
    lastPathRef.current = pathname;

    const utmParams = getUtmParams(searchParams);
    const referrerInfo = getReferrerInfo();
    const deviceInfo = getDeviceInfo();

    logEvent("page_view", {
      page: pathname,
      ...utmParams,
      ...referrerInfo,
      ...deviceInfo,
    });

    // Store UTM params in sessionStorage so we can attach them to signups
    if (utmParams.utm_source) {
      sessionStorage.setItem("elanora_utm", JSON.stringify(utmParams));
    }
    if (referrerInfo.referrer && referrerInfo.referrer !== "direct") {
      sessionStorage.setItem("elanora_referrer", referrerInfo.referrer);
    }
  }, [pathname, searchParams]);

  // Track page views on route change
  useEffect(() => {
    trackPageView();
  }, [trackPageView]);

  // Track scroll depth
  useEffect(() => {
    let maxScroll = 0;
    let tracked25 = false;
    let tracked50 = false;
    let tracked75 = false;
    let tracked100 = false;

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const scrollPercent = Math.round((window.scrollY / scrollHeight) * 100);
      maxScroll = Math.max(maxScroll, scrollPercent);

      if (maxScroll >= 25 && !tracked25) {
        tracked25 = true;
        logEvent("scroll_depth", { page: pathname, depth: 25 });
      }
      if (maxScroll >= 50 && !tracked50) {
        tracked50 = true;
        logEvent("scroll_depth", { page: pathname, depth: 50 });
      }
      if (maxScroll >= 75 && !tracked75) {
        tracked75 = true;
        logEvent("scroll_depth", { page: pathname, depth: 75 });
      }
      if (maxScroll >= 100 && !tracked100) {
        tracked100 = true;
        logEvent("scroll_depth", { page: pathname, depth: 100 });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Track time on page
  useEffect(() => {
    const start = Date.now();

    return () => {
      const timeOnPage = Math.round((Date.now() - start) / 1000);
      if (timeOnPage > 2) {
        logEvent("time_on_page", { page: pathname, seconds: timeOnPage });
      }
    };
  }, [pathname]);

  return null; // This component doesn't render anything
}

export default function Analytics() {
  return (
    <Suspense fallback={null}>
      <AnalyticsInner />
    </Suspense>
  );
}
