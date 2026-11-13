import { NextResponse } from "next/server";
import { isLaunchCode } from "@/lib/launchCode";

// Checks a launch-offer code typed on the site. The browser remembers a correct code and sends it
// again at checkout, where it is checked once more before sale prices are charged.
export async function POST(request: Request) {
  let code: unknown;
  try {
    ({ code } = (await request.json()) as { code?: unknown });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (isLaunchCode(code)) return NextResponse.json({ ok: true });
  await new Promise((r) => setTimeout(r, 400)); // slow down guessing
  return NextResponse.json({ ok: false });
}
