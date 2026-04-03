import type { ContactPayload } from "@/lib/mailto";

export function formatContactPlainBody(payload: ContactPayload): string {
  return [
    `お名前: ${payload.name}`,
    `メール: ${payload.email}`,
    `店舗・業種: ${payload.shopType || "（未選択）"}`,
    "",
    "ご相談内容:",
    payload.message,
  ].join("\n");
}
