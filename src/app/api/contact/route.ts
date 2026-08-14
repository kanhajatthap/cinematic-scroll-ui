import { Resend } from "resend";

export const dynamic = "force-dynamic";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const TO_EMAIL = process.env.CONTACT_EMAIL ?? "kanhajatthap@gmail.com";
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

interface ContactPayload {
  name: string;
  email: string;
  projectType: string;
  message: string;
  website?: string;
}

function validate(payload: Partial<ContactPayload>): string | null {
  if (!payload.name || payload.name.trim().length < 2) {
    return "invalid_name";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(payload.email?.trim() ?? "")) {
    return "invalid_email";
  }
  if (!payload.projectType) {
    return "invalid_projectType";
  }
  if (!payload.message || payload.message.trim().length < 10) {
    return "invalid_message";
  }
  if (payload.message.length > 5000) {
    return "invalid_message";
  }
  return null;
}

export async function POST(request: Request) {
  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return Response.json({ error: "invalid_request" }, { status: 400 });
  }

  if (payload.website) {
    return Response.json({ ok: true });
  }

  const validationError = validate(payload);
  if (validationError) {
    return Response.json({ error: validationError }, { status: 400 });
  }

  if (!resend) {
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: payload.email,
      subject: `New project inquiry — ${payload.projectType} (${payload.name.trim()})`,
      text: [
        `Name: ${payload.name.trim()}`,
        `Email: ${payload.email.trim()}`,
        `Project type: ${payload.projectType}`,
        "",
        payload.message.trim(),
      ].join("\n"),
      html: `
        <div style="font-family:system-ui,-apple-system,sans-serif;max-width:560px;margin:0 auto;padding:24px">
          <h2 style="margin:0 0 16px;color:#1a1a1a">New project inquiry</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr><td style="padding:6px 0;color:#666;width:110px">Name</td><td style="padding:6px 0;font-weight:600">${payload.name.trim()}</td></tr>
            <tr><td style="padding:6px 0;color:#666">Email</td><td style="padding:6px 0"><a href="mailto:${payload.email.trim()}" style="color:#a9865c">${payload.email.trim()}</a></td></tr>
            <tr><td style="padding:6px 0;color:#666">Project type</td><td style="padding:6px 0;font-weight:600">${payload.projectType}</td></tr>
          </table>
          <div style="margin-top:16px;padding:16px;border-left:3px solid #C6A278;background:#faf7f2;border-radius:6px;white-space:pre-wrap;font-size:14px;line-height:1.6">${payload.message.trim()}</div>
        </div>
      `,
    });

    if (error) {
      return Response.json({ error: "send_failed" }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "send_failed" }, { status: 502 });
  }
}