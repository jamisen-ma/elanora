import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let email = "";

    if (contentType.includes("application/x-www-form-urlencoded")) {
      const text = await req.text();
      const params = new URLSearchParams(text);
      email = params.get("List-Unsubscribe") || params.get("email") || "";
    } else {
      const body = await req.json().catch(() => ({}));
      email = body.email || "";
    }

    console.log(`[UNSUBSCRIBE] ${email || "one-click"}`);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: true });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email") || "";

  console.log(`[UNSUBSCRIBE] ${email}`);

  return new NextResponse(
    `<!DOCTYPE html>
<html><head><title>Unsubscribed</title></head>
<body style="font-family:Georgia,serif;text-align:center;padding:80px 20px;">
  <h1 style="font-size:24px;font-weight:300;">You've been unsubscribed</h1>
  <p style="color:#6b6360;">You won't receive any more emails from Elanora.</p>
  <a href="https://elanorajewelry.com" style="color:#b8976b;">Return to Elanora</a>
</body></html>`,
    { headers: { "Content-Type": "text/html" } }
  );
}
