import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;

export const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function sendEmail({
  to,
  subject,
  html,
  from = "Freemocks <onboarding@resend.dev>",
}: {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}) {
  if (!resend) {
    console.warn("RESEND_API_KEY is not configured in environment variables.");
    return { error: new Error("RESEND_API_KEY is missing") };
  }

  try {
    const data = await resend.emails.send({
      from,
      to,
      subject,
      html,
    });
    return { data };
  } catch (error) {
    console.error("Failed to send email via Resend:", error);
    return { error };
  }
}
