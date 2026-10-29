import { redirect } from "next/navigation";

// The old Ring Studio now lives at Design Your Ring.
export default function BuildYourRingPage() {
  redirect("/engagement/design?step=setting");
}
