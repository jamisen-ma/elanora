import { Suspense } from "react";
import type { Metadata } from "next";
import RingDesigner from "@/components/ring-design/RingDesigner";

export const metadata: Metadata = {
  title: "Design Your Ring",
  description: "Choose a setting and your lab-grown diamond, then request a quote. Made to order.",
};

export default function DesignYourRingPage() {
  return (
    <Suspense>
      <RingDesigner />
    </Suspense>
  );
}
