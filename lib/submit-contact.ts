import type { ContactPayload } from "@/lib/mailto";

export type SubmitContactResult =
  | { ok: true }
  | { ok: false; error: string };

export async function submitContact(
  payload: ContactPayload
): Promise<SubmitContactResult> {
  let res: Response;
  try {
    res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    return { ok: false, error: "ネットワークエラーが発生しました。" };
  }

  let data: unknown = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    const errMsg =
      data &&
      typeof data === "object" &&
      "error" in data &&
      typeof (data as { error: unknown }).error === "string"
        ? (data as { error: string }).error
        : "送信に失敗しました。";
    return { ok: false, error: errMsg };
  }

  return { ok: true };
}
