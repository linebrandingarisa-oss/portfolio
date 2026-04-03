import { formatContactPlainBody } from "@/lib/format-contact-body";

export type ContactPayload = {
  name: string;
  email: string;
  shopType: string;
  message: string;
};

export function buildMailtoHref(
  to: string,
  subject: string,
  payload: ContactPayload
): string {
  const body = formatContactPlainBody(payload);

  const params = new URLSearchParams({
    subject,
    body,
  });

  return `mailto:${to}?${params.toString()}`;
}
