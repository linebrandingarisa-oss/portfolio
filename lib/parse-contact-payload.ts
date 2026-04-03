import type { ContactPayload } from "@/lib/mailto";

const MAX_NAME = 200;
const MAX_MESSAGE = 12_000;
const MAX_SHOP = 200;

export type ParseContactResult =
  | { ok: true; data: ContactPayload }
  | { ok: false; error: string };

export function parseContactPayload(input: unknown): ParseContactResult {
  if (input === null || typeof input !== "object") {
    return { ok: false, error: "リクエスト形式が不正です。" };
  }
  const o = input as Record<string, unknown>;
  /** メール件名等に使うため改行を除く（ヘッダーインジェクション対策） */
  const name =
    typeof o.name === "string"
      ? o.name.trim().replace(/\r\n|\r|\n/g, " ")
      : "";
  const email = typeof o.email === "string" ? o.email.trim() : "";
  const shopType =
    typeof o.shopType === "string"
      ? o.shopType.trim().replace(/\r\n|\r|\n/g, " ")
      : "";
  const message = typeof o.message === "string" ? o.message.trim() : "";

  if (!name) {
    return { ok: false, error: "お名前は必須です。" };
  }
  if (name.length > MAX_NAME) {
    return { ok: false, error: "お名前が長すぎます。" };
  }
  if (!email) {
    return { ok: false, error: "メールアドレスは必須です。" };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "メールアドレスの形式が正しくありません。" };
  }
  if (!message) {
    return { ok: false, error: "ご相談内容は必須です。" };
  }
  if (message.length > MAX_MESSAGE) {
    return { ok: false, error: "ご相談内容が長すぎます。" };
  }
  if (shopType.length > MAX_SHOP) {
    return { ok: false, error: "店舗・業種の入力が長すぎます。" };
  }

  return { ok: true, data: { name, email, shopType, message } };
}
