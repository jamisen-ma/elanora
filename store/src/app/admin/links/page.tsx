"use client";

import { useState } from "react";

const BASE_URL = "https://elanora-beta.vercel.app";

const PRESETS = [
  {
    name: "Instagram Bio",
    source: "instagram",
    medium: "social",
    campaign: "bio_link",
  },
  {
    name: "Instagram Story",
    source: "instagram",
    medium: "social",
    campaign: "story",
  },
  {
    name: "TikTok Bio",
    source: "tiktok",
    medium: "social",
    campaign: "bio_link",
  },
  {
    name: "TikTok Video",
    source: "tiktok",
    medium: "social",
    campaign: "video",
  },
  {
    name: "Pinterest Pin",
    source: "pinterest",
    medium: "social",
    campaign: "pin",
  },
  {
    name: "Facebook Post",
    source: "facebook",
    medium: "social",
    campaign: "post",
  },
  {
    name: "Email Newsletter",
    source: "email",
    medium: "newsletter",
    campaign: "waitlist_update",
  },
  {
    name: "Friends & Family",
    source: "referral",
    medium: "word_of_mouth",
    campaign: "friends",
  },
];

export default function LinksPage() {
  const [page, setPage] = useState("/");
  const [source, setSource] = useState("instagram");
  const [medium, setMedium] = useState("social");
  const [campaign, setCampaign] = useState("bio_link");
  const [copied, setCopied] = useState<string | null>(null);

  function buildLink(
    p: string,
    s: string,
    m: string,
    c: string
  ): string {
    const params = new URLSearchParams({
      utm_source: s,
      utm_medium: m,
      utm_campaign: c,
    });
    return `${BASE_URL}${p}?${params.toString()}`;
  }

  function copyToClipboard(text: string, id: string) {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  }

  const customLink = buildLink(page, source, medium, campaign);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Marketing Links
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                UTM-tagged links to track where your traffic comes from
              </p>
            </div>
            <a
              href="/admin"
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              &larr; Dashboard
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Quick Links */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="text-sm font-medium text-gray-900">
              Quick Links — Copy & Paste
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Use these pre-made links for your social media profiles and posts
            </p>
          </div>
          <div className="divide-y divide-gray-50">
            {PRESETS.map((preset) => {
              const link = buildLink(
                "/",
                preset.source,
                preset.medium,
                preset.campaign
              );
              return (
                <div
                  key={preset.name}
                  className="px-5 py-3 flex items-center justify-between gap-4"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {preset.name}
                    </p>
                    <p className="text-xs text-gray-400 truncate">{link}</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(link, preset.name)}
                    className={`text-xs px-3 py-1.5 rounded transition-colors whitespace-nowrap ${
                      copied === preset.name
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    {copied === preset.name ? "Copied!" : "Copy"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Custom Link Builder */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h2 className="text-sm font-medium text-gray-900 mb-4">
            Custom Link Builder
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Page</label>
              <select
                value={page}
                onChange={(e) => setPage(e.target.value)}
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
              >
                <option value="/">Homepage</option>
                <option value="/shop">Shop</option>
                <option value="/collections/summer-solstice">
                  Summer Solstice Collection
                </option>
                <option value="/about">Our Story</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Source
              </label>
              <input
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
                placeholder="instagram, tiktok, email..."
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Medium
              </label>
              <input
                value={medium}
                onChange={(e) => setMedium(e.target.value)}
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
                placeholder="social, email, paid..."
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Campaign
              </label>
              <input
                value={campaign}
                onChange={(e) => setCampaign(e.target.value)}
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
                placeholder="summer_launch, bio_link..."
              />
            </div>
          </div>

          <div className="bg-gray-50 rounded p-3 flex items-center gap-3">
            <code className="text-xs text-gray-600 truncate flex-1">
              {customLink}
            </code>
            <button
              onClick={() => copyToClipboard(customLink, "custom")}
              className={`text-xs px-3 py-1.5 rounded transition-colors whitespace-nowrap ${
                copied === "custom"
                  ? "bg-green-100 text-green-700"
                  : "bg-amber-500 hover:bg-amber-600 text-white"
              }`}
            >
              {copied === "custom" ? "Copied!" : "Copy Link"}
            </button>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
          <h3 className="text-sm font-medium text-amber-900 mb-2">
            Marketing Tips
          </h3>
          <ul className="text-sm text-amber-800 space-y-2">
            <li>
              <strong>Instagram Bio:</strong> Use the Instagram Bio link in your
              profile. Change it when running campaigns to track which content
              drives signups.
            </li>
            <li>
              <strong>Story Swipe-Up:</strong> Use the Instagram Story link for
              stories. Each story series should get a unique campaign name.
            </li>
            <li>
              <strong>TikTok:</strong> Put the TikTok Bio link in your profile.
              Use video-specific links in comments when driving to specific
              products.
            </li>
            <li>
              <strong>Pinterest:</strong> Pin product images with the Pin link.
              Pinterest traffic converts well for jewelry — pin consistently.
            </li>
            <li>
              <strong>Tracking:</strong> All clicks show up in your{" "}
              <a href="/admin" className="text-amber-600 underline">
                Analytics Dashboard
              </a>{" "}
              under Traffic Sources with the UTM source breakdown.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
