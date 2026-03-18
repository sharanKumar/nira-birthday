import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, guests, attending } = body;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    if (!attending || !["yes", "no"].includes(attending)) {
      return NextResponse.json({ error: "Attendance response is required" }, { status: 400 });
    }

    const guestCount = Number(guests) || 1;
    if (guestCount < 1 || guestCount > 6) {
      return NextResponse.json({ error: "Guest count must be between 1 and 6" }, { status: 400 });
    }

    const toEmail = process.env.RSVP_TO_EMAIL;
    if (!toEmail) {
      console.error("RSVP_TO_EMAIL environment variable is not set");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const attendingText = attending === "yes" ? "✅ Yes, will attend" : "❌ Cannot attend";
    const sanitizedName = name.trim().slice(0, 100);

    const { error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: toEmail,
      subject: `🐝 RSVP from ${sanitizedName} — Nira's 2nd Birthday`,
      html: `
        <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 24px; background: #FFFDE7; border-radius: 16px;">
          <h1 style="color: #92400E; font-size: 24px; margin-bottom: 4px;">🐝 New RSVP Received!</h1>
          <p style="color: #78350F; margin-bottom: 24px;">Someone responded to Nira's 2nd Birthday invite.</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #92400E; font-weight: bold; width: 140px;">Name</td>
              <td style="padding: 10px 0; color: #1C1917;">${sanitizedName}</td>
            </tr>
            <tr style="border-top: 1px solid #FDE68A;">
              <td style="padding: 10px 0; color: #92400E; font-weight: bold;">Attending</td>
              <td style="padding: 10px 0; color: #1C1917;">${attendingText}</td>
            </tr>
            <tr style="border-top: 1px solid #FDE68A;">
              <td style="padding: 10px 0; color: #92400E; font-weight: bold;">Guests</td>
              <td style="padding: 10px 0; color: #1C1917;">${guestCount} ${guestCount === 1 ? "guest" : "guests"}</td>
            </tr>
          </table>
        </div>
      `,
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json({ error: "Failed to send RSVP notification" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("RSVP route error:", err);
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
