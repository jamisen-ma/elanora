import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const PROMO_CODE = "FOUNDING30";

// In production, connect this to your email service (Mailchimp, Resend, etc.)
// For now, emails are stored in a local JSON file during development
// and logged in Vercel function logs in production.

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    const timestamp = new Date().toISOString();

    // Log to Vercel function logs (always visible in Vercel dashboard)
    console.log(`[WAITLIST SIGNUP] ${normalizedEmail} at ${timestamp}`);

    // In development, also save to a local JSON file
    if (process.env.NODE_ENV === "development") {
      try {
        const dataDir = path.join(process.cwd(), "data");
        const filePath = path.join(dataDir, "waitlist.json");

        await fs.mkdir(dataDir, { recursive: true });

        let entries: { email: string; timestamp: string }[] = [];
        try {
          const existing = await fs.readFile(filePath, "utf-8");
          entries = JSON.parse(existing);
        } catch {
          // File doesn't exist yet
        }

        // Check for duplicates
        if (!entries.some((e) => e.email === normalizedEmail)) {
          entries.push({ email: normalizedEmail, timestamp });
          await fs.writeFile(filePath, JSON.stringify(entries, null, 2));
        }
      } catch (err) {
        console.error("Failed to save locally:", err);
      }
    }

    // TODO: Send welcome email with promo code
    // Example with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "Elanora <hello@elanora.com>",
    //   to: normalizedEmail,
    //   subject: "Welcome to the Founding Members List — Here's Your 30% Off Code",
    //   html: `
    //     <h2>Welcome to Elanora</h2>
    //     <p>You're officially on the Founding Members list.</p>
    //     <p>Your exclusive 30% off code: <strong>${PROMO_CODE}</strong></p>
    //     <p>Use it at launch on July 15, 2026.</p>
    //   `,
    // });

    return NextResponse.json({
      success: true,
      promoCode: PROMO_CODE,
      message: "You're on the list!",
    });
  } catch {
    console.error("[WAITLIST ERROR]", "Failed to process signup");
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  // In development, return the waitlist entries
  if (process.env.NODE_ENV === "development") {
    try {
      const filePath = path.join(process.cwd(), "data", "waitlist.json");
      const data = await fs.readFile(filePath, "utf-8");
      const entries = JSON.parse(data);
      return NextResponse.json({ count: entries.length, entries });
    } catch {
      return NextResponse.json({ count: 0, entries: [] });
    }
  }

  return NextResponse.json({ message: "Waitlist API" });
}
