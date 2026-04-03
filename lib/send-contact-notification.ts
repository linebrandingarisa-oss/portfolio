import { Resend } from "resend";
import { formatContactPlainBody } from "@/lib/format-contact-body";
import type { ContactPayload } from "@/lib/mailto";

export type SendContactResult =
  | { ok: true }
  | { ok: false; code: "not_configured" | "provider_error"; message: string };

export async function sendContactNotification(
  to: string,
  subject: string,
  payload: ContactPayload
): Promise<SendContactResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM?.trim();

  if (!apiKey || !from) {
    return {
      ok: false,
      code: "not_configured",
      message: "メール送信の環境変数が未設定です。",
    };
  }

  const resend = new Resend(apiKey);
  const text = formatContactPlainBody(payload);

  const { error } = await resend.emails.send({
    from,
    to: [to],
    subject,
    text,
    replyTo: payload.email,
  });

  if (error) {
    return {
      ok: false,
      code: "provider_error",
      message: error.message,
    };
  }

  return { ok: true };
}
