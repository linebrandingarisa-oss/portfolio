import { NextResponse } from "next/server";
import { contact } from "@/content/site";
import { assertContactRateLimit } from "@/lib/contact-rate-limit";
import { getClientIp } from "@/lib/get-client-ip";
import { parseContactPayload } from "@/lib/parse-contact-payload";
import { sendContactNotification } from "@/lib/send-contact-notification";

export async function POST(req: Request) {
  const clientIp = getClientIp(req);
  const rate = await assertContactRateLimit(clientIp);
  if (!rate.ok) {
    return NextResponse.json(
      {
        error:
          "短時間に送信が集中しています。しばらく経ってから再度お試しください。",
      },
      {
        status: 429,
        headers: { "Retry-After": String(rate.retryAfterSec) },
      }
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json(
      { error: "リクエストが読み取れません。" },
      { status: 400 }
    );
  }

  const parsed = parseContactPayload(json);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const to = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
  if (!to) {
    return NextResponse.json(
      { error: "受信メールアドレスが未設定です。" },
      { status: 503 }
    );
  }

  const subject = `${contact.mailSubjectDefault}（${parsed.data.name} 様）`;
  const result = await sendContactNotification(to, subject, parsed.data);

  if (!result.ok) {
    if (result.code === "not_configured") {
      return NextResponse.json(
        {
          error:
            "メール送信がサーバーで利用できません。管理者に連絡してください。",
        },
        { status: 503 }
      );
    }
    return NextResponse.json(
      { error: "送信に失敗しました。時間をおいて再度お試しください。" },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
