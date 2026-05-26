import Image from "next/image";
import { FadeIn } from "@/components/FadeIn";
import { ProfileSectionAccent } from "@/components/illustrations/SectionMatureAccents";
import { SectionHeadingWithCozy } from "@/components/SectionHeadingWithCozy";
import { profile } from "@/content/site";
import { formatNoteUrlForDisplay } from "@/lib/format-note-url-for-display";

const displayName =
  process.env.NEXT_PUBLIC_PROFILE_NAME?.trim() || profile.namePlaceholder;

const noteUrl =
  process.env.NEXT_PUBLIC_NOTE_URL?.trim() || profile.noteUrlFallback;

const profilePhotoRevision =
  process.env.NEXT_PUBLIC_PROFILE_PHOTO_REVISION?.trim();

function profilePhotoSrc(base: string): string {
  if (!profilePhotoRevision) return base;
  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}v=${encodeURIComponent(profilePhotoRevision)}`;
}

export function Profile() {
  const { src, layout } = profile.photo;
  const photoSrc = profilePhotoSrc(src);
  const alt = `${displayName}のプロフィール画像`;
  const { note } = profile;

  return (
    <section
      id="profile"
      className="scroll-mt-20 bg-surface-warm py-20 sm:py-28"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeadingWithCozy
          title="プロフィール"
          illustration={<ProfileSectionAccent />}
        />
        <FadeIn className="mt-8">
          <div className="rounded-2xl border border-border-soft bg-surface-cream p-6 shadow-[0_0_40px_rgba(168,85,247,0.04)] sm:p-10">
            <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
              {layout === "circle" ? (
                <div className="mx-auto shrink-0 sm:mx-0">
                  <div className="relative box-border h-36 w-36 shrink-0 overflow-hidden rounded-full border-2 border-purple-500/30 bg-surface-sky shadow-[0_0_30px_rgba(168,85,247,0.15)] sm:h-40 sm:w-40">
                    <Image
                      src={photoSrc}
                      alt={alt}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 144px, 160px"
                      className="origin-center translate-x-[1mm] scale-[1.18] object-cover object-center"
                      priority
                    />
                  </div>
                </div>
              ) : (
                <div className="mx-auto w-full max-w-[280px] shrink-0 overflow-hidden rounded-2xl bg-surface-sky shadow-md ring-1 ring-purple-500/20 sm:mx-0 sm:max-w-[min(100%,320px)]">
                  <div className="relative aspect-[4/5] w-full">
                    <Image
                      src={photoSrc}
                      alt={alt}
                      fill
                      unoptimized
                      className="object-cover object-[25%_center] sm:object-center"
                      sizes="(max-width: 640px) 280px, 320px"
                      priority
                    />
                  </div>
                </div>
              )}
              <div className="min-w-0 flex-1 text-center sm:text-left">
                <h3 className="text-xl font-bold text-foreground sm:text-2xl">
                  {displayName}
                </h3>
                <div className="mx-auto mt-3 max-w-prose sm:mx-0">
                  {profile.role ? (
                    <p className="whitespace-pre-line text-sm font-semibold tracking-wide text-purple-400 sm:text-base">
                      {profile.role}
                    </p>
                  ) : null}
                  <div
                    className={`space-y-3 text-sm leading-relaxed text-muted sm:text-base ${profile.role ? "mt-4" : ""}`}
                  >
                    {profile.bio.map((p, idx) => (
                      <p key={idx} className="whitespace-pre-line">
                        {p}
                      </p>
                    ))}
                  </div>
                  <div className="mt-6">
                    <p className="text-sm font-semibold text-foreground">
                      開発のスタンス
                    </p>
                    <ul className="mt-2 list-disc space-y-2 pl-5 text-left text-sm text-muted sm:text-base">
                      {profile.stance.map((s, idx) => (
                        <li key={idx}>{s}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                {noteUrl ? (
                  <div className="mt-8 rounded-xl border border-border-soft bg-surface-warm p-4 sm:p-5">
                    <p className="text-sm font-semibold text-foreground">
                      {note.title}
                    </p>
                    <a
                      href={noteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 block w-full rounded-lg border border-purple-500/30 bg-surface-sky px-4 py-3 text-center shadow-sm transition hover:border-purple-500/60 hover:bg-surface-cream sm:text-left"
                    >
                      <span className="block whitespace-pre-line text-sm font-semibold text-purple-400 underline-offset-2">
                        {note.linkLabel}
                      </span>
                      <span className="mt-1 block break-all text-xs leading-snug text-muted">
                        {formatNoteUrlForDisplay(noteUrl)}
                      </span>
                    </a>
                    <div className="mt-4 flex flex-row items-start gap-4">
                      <Image
                        src="/profile/note-qr.png"
                        alt={note.qrAlt}
                        width={112}
                        height={112}
                        unoptimized
                        className="shrink-0 rounded-md border border-border-soft bg-surface-sky p-1 shadow-sm"
                      />
                      <div className="min-w-0 flex-1 pt-0.5 text-left">
                        <div className="text-xs leading-relaxed text-muted">
                          <span className="mb-1 block whitespace-pre-line font-medium text-muted">
                            {note.qrSectionLabel}
                          </span>
                          {note.qrCaption.split("\n").map((line, i) => (
                            <span key={i} className="block">
                              {line}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
