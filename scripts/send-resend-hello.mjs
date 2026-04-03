// 疎通確認: npm run resend:test（キーは .env.local の RESEND_API_KEY）
import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY?.trim();
const from =
  process.env.RESEND_FROM?.trim() || "onboarding@resend.dev";
const to =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ||
  "line.branding.arisa@gmail.com";

if (!apiKey) {
  console.error(
    "RESEND_API_KEY が未設定です。.env.local に実際の API キー（re_...）を設定してください。"
  );
  process.exit(1);
}

const resend = new Resend(apiKey);

const { data, error } = await resend.emails.send({
  from,
  to,
  subject: "Hello World",
  html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
});

if (error) {
  console.error(error);
  process.exit(1);
}

console.log("送信しました:", data);
