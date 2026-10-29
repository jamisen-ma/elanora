import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { promises as fs } from "fs";
import path from "path";

// Custom jewelry inquiries and engagement ring quote requests (Design Your Ring). Each
// request is emailed to the store inbox (GMAIL_USER) with the reference image attached
// and gets a reference number. In development it is also saved under data/.

const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"];

const transporter = process.env.GMAIL_APP_PASSWORD
  ? nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
    })
  : null;

const FIELDS = [
  ["name", "Name"],
  ["email", "Email"],
  ["phone", "Phone"],
  ["startingPoint", "Where to start"],
  ["itemType", "Piece type"],
  ["idea", "What would you like to make?"],
  ["diamondColor", "Diamond color"],
  ["diamondColorOther", "Diamond color (other)"],
  ["diamondShape", "Diamond shape"],
  ["diamondSize", "Diamond size"],
  ["stone", "Diamond / gemstone preference"],
  ["metal", "Metal preference"],
  ["budget", "Budget"],
  ["vibe", "Gift vibe"],
  ["neededBy", "Needed by"],
  ["details", "Additional details"],
] as const;

type Field = (typeof FIELDS)[number][0];

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function POST(req: Request) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 400 });
  }

  const data = Object.fromEntries(
    FIELDS.map(([key]) => [key, String(form.get(key) ?? "").trim().slice(0, 5000)]),
  ) as Record<Field, string>;

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }
  // Ring designer requests carry a structured summary of the chosen ring.
  let ring: Record<string, string> | null = null;
  const ringRaw = form.get("ring");
  if (typeof ringRaw === "string" && ringRaw) {
    try {
      const parsed = JSON.parse(ringRaw.slice(0, 4000));
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        ring = Object.fromEntries(
          Object.entries(parsed)
            .slice(0, 20)
            .map(([k, v]) => [String(k).slice(0, 40), String(v).slice(0, 300)]),
        );
      }
    } catch {
      /* ignore a malformed summary */
    }
  }

  // The custom form asks for a budget range; Design Your Ring requests (with a ring summary) don't.
  if (!ring && !data.budget) {
    return NextResponse.json({ error: "Please choose a budget range." }, { status: 400 });
  }

  if (!data.idea) {
    return NextResponse.json({ error: "Please tell us what you would like to make." }, { status: 400 });
  }

  const file = form.get("reference");
  let image: { name: string; type: string; buffer: Buffer } | null = null;
  if (file instanceof File && file.size > 0) {
    if (!IMAGE_TYPES.includes(file.type)) {
      return NextResponse.json({ error: "Please upload a JPG, PNG, WEBP or HEIC image." }, { status: 400 });
    }
    if (file.size > MAX_IMAGE_BYTES) {
      return NextResponse.json({ error: "Please upload an image under 10 MB." }, { status: 400 });
    }
    image = { name: path.basename(file.name) || "reference", type: file.type, buffer: Buffer.from(await file.arrayBuffer()) };
  }

  const id = `${new Date().toISOString().replace(/[:.]/g, "-")}-${Math.random().toString(36).slice(2, 7)}`;
  // Short reference the customer sees, e.g. ELR-1027-4K7Q (ring) or ECJ-1027-4K7Q (other).
  const now = new Date();
  const reference = `${ring ? "ELR" : "ECJ"}-${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${Math.random()
    .toString(36)
    .slice(2, 6)
    .toUpperCase()}`;
  console.log(`[CUSTOM REQUEST] ${id} from ${data.email}`);

  if (process.env.NODE_ENV === "development") {
    try {
      const dir = path.join(process.cwd(), "data", "custom-requests", id);
      await fs.mkdir(dir, { recursive: true });
      await fs.writeFile(path.join(dir, "request.json"), JSON.stringify({ id, reference, ...data, ring, image: image?.name ?? null }, null, 2));
      if (image) await fs.writeFile(path.join(dir, image.name), image.buffer);
    } catch (err) {
      console.error("[CUSTOM REQUEST] Failed to save locally:", err);
    }
  }

  if (transporter) {
    try {
      const ringRows = ring
        ? Object.entries(ring)
            .map(
              ([k, v]) =>
                `<tr><td style="padding:6px 16px 6px 0;color:#6e6e73;vertical-align:top">${escape(k)}</td><td style="padding:6px 0">${escape(v)}</td></tr>`,
            )
            .join("")
        : "";
      const rows = FIELDS.filter(([key]) => data[key])
        .map(
          ([key, label]) =>
            `<tr><td style="padding:6px 16px 6px 0;color:#6e6e73;vertical-align:top">${label}</td><td style="padding:6px 0;white-space:pre-wrap">${escape(data[key])}</td></tr>`,
        )
        .join("");
      await transporter.sendMail({
        from: `"Elanora" <${process.env.GMAIL_USER}>`,
        to: process.env.GMAIL_USER,
        replyTo: data.email,
        subject: ring
          ? `Engagement ring quote ${reference} — ${[ring.setting, `${ring.shape} ${ring.carat}`, ring.metal].filter(Boolean).join(" · ")}`
          : `Custom request ${reference} — ${data.name || data.email}`,
        html: `<p style="font-family:Arial,sans-serif;font-size:14px">Reference: <b>${reference}</b></p>${
          ringRows
            ? `<p style="font-family:Arial,sans-serif;font-size:12px;letter-spacing:.1em;text-transform:uppercase;margin-top:20px">Ring</p><table style="font-family:Arial,sans-serif;font-size:14px;color:#1d1d1f">${ringRows}</table><p style="font-family:Arial,sans-serif;font-size:12px;letter-spacing:.1em;text-transform:uppercase;margin-top:20px">Customer</p>`
            : ""
        }<table style="font-family:Arial,sans-serif;font-size:14px;color:#1d1d1f">${rows}</table>`,
        attachments: image ? [{ filename: image.name, content: image.buffer, contentType: image.type }] : [],
      });
    } catch (err) {
      console.error("[CUSTOM REQUEST EMAIL ERROR]", err);
      return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
    }
  } else {
    console.log("[CUSTOM REQUEST] No GMAIL_APP_PASSWORD set — skipping email");
  }

  return NextResponse.json({ success: true, reference });
}
