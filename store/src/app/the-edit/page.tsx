import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import TheEditGrid from "@/components/edit/TheEditGrid";
import { editVideosNewestFirst } from "@/data/theEdit";

export const metadata: Metadata = {
  title: "The Edit",
  description: "Short films of ELANORA jewelry: details up close, how to wear it, diamond know-how and the stories behind the designs.",
};

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["400"] });

// All THE EDIT videos (src/data/theEdit.ts), newest first, filterable by topic.
export default function TheEditPage() {
  return (
    <div className="bg-white px-6 pb-24 pt-16 text-[#1d1d1f] sm:pt-20 md:px-10 lg:pb-32 lg:pt-24">
      <header className="text-center">
        <h1 className="text-[13px] font-medium uppercase tracking-[0.32em] text-[#1d1d1f]/70">The Edit</h1>
        <p className={`${serif.className} mt-5 text-balance text-[2rem] leading-[1.12] tracking-[-0.01em] sm:text-[2.5rem] lg:text-[2.75rem]`}>
          Jewelry, up close.
        </p>
      </header>
      <div className="mt-10 sm:mt-12">
        <TheEditGrid videos={editVideosNewestFirst()} />
      </div>
    </div>
  );
}
