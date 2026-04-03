/** リンク下に表示する短い URL 表記（ホスト＋パス） */
export function formatNoteUrlForDisplay(url: string): string {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    const path = u.pathname === "/" ? "" : u.pathname;
    return `${host}${path}`.replace(/\/$/, "");
  } catch {
    return url;
  }
}
