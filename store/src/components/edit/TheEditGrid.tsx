"use client";

import { useState } from "react";
import { EDIT_CATEGORIES, type EditCategory, type EditVideo } from "@/data/theEdit";
import EditVideoCard from "./EditVideoCard";

// The Edit page: category filter + grid of all videos (already sorted newest first).
export default function TheEditGrid({ videos }: { videos: EditVideo[] }) {
  const [category, setCategory] = useState<EditCategory | "All">("All");
  const shown = category === "All" ? videos : videos.filter((v) => v.category === category);

  return (
    <>
      <div role="group" aria-label="Filter by topic" className="mx-auto flex max-w-[1280px] flex-wrap justify-center gap-x-6 gap-y-3">
        {(["All", ...EDIT_CATEGORIES] as const).map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            aria-pressed={category === c}
            className={`border-b pb-1 text-[12px] font-medium uppercase tracking-[0.2em] transition-colors ${
              category === c ? "border-[#1d1d1f] text-[#1d1d1f]" : "border-transparent text-[#1d1d1f]/55 hover:text-[#1d1d1f]"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {shown.length ? (
        <ul className="mx-auto mt-10 grid max-w-[1280px] grid-cols-1 gap-x-6 gap-y-12 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
          {shown.map((v) => (
            <li key={v.id}>
              <EditVideoCard video={v} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mx-auto mt-16 max-w-md text-center text-[15px] leading-[1.7] text-[#6e6e73]">
          {videos.length ? "No videos in this topic yet." : "New videos are on the way."}
        </p>
      )}
    </>
  );
}
