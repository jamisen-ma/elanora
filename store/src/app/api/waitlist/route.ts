import { NextResponse } from "next/server";
import { Resend } from "resend";
import { promises as fs } from "fs";
import path from "path";

const PROMO_CODE = "FOUNDING30";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

function buildWelcomeEmail(promoCode: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Elanora</title>
</head>
<body style="margin:0;padding:0;background-color:#faf9f7;font-family:Georgia,'Times New Roman',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#faf9f7;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;max-width:600px;">

          <!-- Header -->
          <tr>
            <td style="padding:40px 40px 30px;text-align:center;border-bottom:1px solid #f0ece4;">
              <h1 style="margin:0;font-size:28px;font-weight:300;letter-spacing:0.15em;color:#1a1a1a;">
                E L A N O R A
              </h1>
              <p style="margin:8px 0 0;font-size:10px;letter-spacing:0.3em;color:#b8976b;text-transform:uppercase;">
                Fine Jewelry
              </p>
            </td>
          </tr>

          <!-- Welcome Message -->
          <tr>
            <td style="padding:40px 40px 20px;text-align:center;">
              <p style="margin:0 0 6px;font-size:11px;letter-spacing:0.3em;color:#b8976b;text-transform:uppercase;">
                Welcome, Founding Member
              </p>
              <h2 style="margin:0;font-size:24px;font-weight:300;color:#1a1a1a;line-height:1.4;">
                You&rsquo;re on the list.
              </h2>
            </td>
          </tr>

          <!-- Body Text -->
          <tr>
            <td style="padding:0 40px 30px;text-align:center;">
              <p style="margin:0;font-size:15px;line-height:1.7;color:#6b6360;">
                Thank you for joining the Elanora Founding Members list.
                As one of our earliest supporters, you&rsquo;ll get exclusive
                first access to the collection when it drops &mdash; plus
                <strong style="color:#1a1a1a;">30% off your first order</strong>.
              </p>
            </td>
          </tr>

          <!-- Promo Code Box -->
          <tr>
            <td style="padding:0 40px 30px;text-align:center;">
              <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
                <tr>
                  <td style="background-color:#faf9f7;border:2px dashed #d4c5a9;padding:20px 40px;text-align:center;">
                    <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.2em;color:#6b6360;text-transform:uppercase;">
                      Your exclusive code
                    </p>
                    <p style="margin:0;font-size:32px;font-weight:600;letter-spacing:0.15em;color:#b8976b;font-family:'Courier New',monospace;">
                      ${promoCode}
                    </p>
                    <p style="margin:8px 0 0;font-size:12px;color:#6b6360;">
                      30% off your first order
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- What's Next -->
          <tr>
            <td style="padding:0 40px 30px;">
              <p style="margin:0 0 16px;font-size:11px;letter-spacing:0.25em;color:#b8976b;text-transform:uppercase;text-align:center;">
                What&rsquo;s Next
              </p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #f0ece4;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:28px;vertical-align:top;padding-right:12px;">
                          <span style="font-size:14px;color:#b8976b;">&#10029;</span>
                        </td>
                        <td style="font-size:14px;line-height:1.5;color:#6b6360;">
                          <strong style="color:#1a1a1a;">First access</strong> &mdash;
                          You&rsquo;ll be the first to shop when the collection drops on August 20, 2026.
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #f0ece4;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:28px;vertical-align:top;padding-right:12px;">
                          <span style="font-size:14px;color:#b8976b;">&#10029;</span>
                        </td>
                        <td style="font-size:14px;line-height:1.5;color:#6b6360;">
                          <strong style="color:#1a1a1a;">Limited editions</strong> &mdash;
                          Select pieces will only be available to Founding Members.
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:28px;vertical-align:top;padding-right:12px;">
                          <span style="font-size:14px;color:#b8976b;">&#10029;</span>
                        </td>
                        <td style="font-size:14px;line-height:1.5;color:#6b6360;">
                          <strong style="color:#1a1a1a;">Behind the scenes</strong> &mdash;
                          We&rsquo;ll share sneak peeks and styling content before launch.
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td style="padding:0 40px 40px;text-align:center;">
              <a href="https://www.instagram.com/elanorajewelry_2024/" style="display:inline-block;background-color:#1a1a1a;color:#ffffff;text-decoration:none;font-size:12px;letter-spacing:0.15em;text-transform:uppercase;padding:14px 32px;">
                Follow Us on Instagram
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:30px 40px;text-align:center;border-top:1px solid #f0ece4;background-color:#faf9f7;">
              <p style="margin:0 0 4px;font-size:12px;letter-spacing:0.15em;color:#1a1a1a;">
                E L A N O R A
              </p>
              <p style="margin:0 0 12px;font-size:11px;color:#6b6360;">
                Jewelry designed to be worn every day and remembered forever.
              </p>
              <p style="margin:0;font-size:10px;color:#a09890;">
                &copy; 2026 Elanora. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

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

    // Log to Vercel function logs
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

    // Send welcome email via Resend
    if (resend) {
      try {
        const fromAddress = process.env.RESEND_FROM_EMAIL || "Elanora <onboarding@resend.dev>";
        await resend.emails.send({
          from: fromAddress,
          to: normalizedEmail,
          subject: "Welcome to Elanora — Here's Your 30% Off Code",
          html: buildWelcomeEmail(PROMO_CODE),
          headers: {
            "List-Unsubscribe": `<https://elanorajewelry.com/api/unsubscribe?email=${encodeURIComponent(normalizedEmail)}>`,
            "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
          },
        });
        console.log(`[WAITLIST EMAIL SENT] ${normalizedEmail}`);
      } catch (emailErr) {
        console.error("[WAITLIST EMAIL ERROR]", emailErr);
      }
    } else {
      console.log(
        "[WAITLIST] No RESEND_API_KEY set — skipping email send"
      );
    }

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
