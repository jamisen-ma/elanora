import { Suspense } from "react";
import InColorCollection from "@/components/in-color/InColorCollection";

export const metadata = {
  title: "In Color",
  description: "Gemstone jewelry by color. Life looks better in color — find the shade you love.",
};

export default function InColorPage() {
  return (
    <Suspense>
      <InColorCollection />
    </Suspense>
  );
}
