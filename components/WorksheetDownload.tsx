"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Download, FileText, Loader2 } from "lucide-react";
import { track } from "@/lib/analytics";
import { WEB3FORMS_KEY } from "@/lib/site";

// Email-for-worksheet form, used inside blog posts.
//
// The printable worksheets used to be a bare PDF link: six useful resources
// handed out with no way of knowing who took them. Each download now asks for
// an email, which arrives in the shared inbox through Web3Forms (already the
// contact form's transport).
//
// Consent is deliberately separate from the download. Israeli law (Section 30A
// of the Communications Law) requires explicit, prior opt-in for marketing
// email, so the file needs only an address, and permission to send tips later
// is its own unchecked box. Every submission records which of the two it is.
//
// If the send fails, the file is released anyway: the reader did their part,
// and a broken form shouldn't cost us their trust.

const ACCESS_KEY = WEB3FORMS_KEY;

type Status = "idle" | "submitting" | "done";

interface Props {
  /** File name under /public/downloads */
  file: string;
  /** Short human name for the worksheet, e.g. "תקציב משפחתי" */
  title: string;
}

export default function WorksheetDownload({ file, title }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const downloadRef = useRef<HTMLAnchorElement>(null);
  const href = `/downloads/${file}`;
  const slug = file.replace(/\.pdf$/, "");
  const id = `ws-${slug}`;

  // Move focus to the download link once it has rendered, so keyboard and
  // screen-reader users land on the thing they just asked for.
  useEffect(() => {
    if (status === "done") downloadRef.current?.focus();
  }, [status]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    const form = e.currentTarget;
    const data = new FormData(form);

    if ((data.get("botcheck") as string)?.length) {
      setStatus("done");
      return;
    }

    const consent = data.get("marketing_consent") === "on";
    data.set("marketing_consent", consent ? "כן, מאשר/ת קבלת טיפים ועדכונים" : "לא");

    setStatus("submitting");
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
    } catch {
      // Released regardless — see the note at the top of the file.
    }
    track("worksheet_signup", { worksheet: slug, consent });
    setStatus("done");
  }

  return (
    <div className="not-prose my-8 rounded-[18px] border border-ember-100 bg-ember-50 p-6 sm:p-8">
      <div className="flex items-start gap-3 mb-5">
        <span className="w-11 h-11 rounded-[10px] bg-white text-ember-600 flex items-center justify-center flex-shrink-0">
          <FileText className="w-5 h-5" strokeWidth={1.5} aria-hidden="true" />
        </span>
        <div>
          <p className="font-bold text-ink text-lg leading-snug">
            דף עבודה להדפסה: {title}
          </p>
          <p className="text-mauve text-[15px] leading-snug mt-1">
            {status === "done"
              ? "הקובץ שלכם מוכן."
              : "השאירו מייל, והקובץ נפתח לכם מיד."}
          </p>
        </div>
      </div>

      <div aria-live="polite">
        {status === "done" ? (
          <a
            ref={downloadRef}
            href={href}
            download
            onClick={() => track("worksheet_download", { worksheet: slug })}
            className="inline-flex items-center justify-center gap-2 rounded-[12px] text-white font-bold text-base px-6 py-3 bg-[linear-gradient(135deg,var(--ember-550),var(--ember-600))] hover:brightness-[1.06] transition-[filter] duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember-600"
          >
            <Download className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
            להורדת דף העבודה (PDF)
          </a>
        ) : (
          <form onSubmit={onSubmit} className="space-y-3">
            <input type="hidden" name="access_key" value={ACCESS_KEY} />
            <input type="hidden" name="subject" value={`הרשמה לדף עבודה: ${title}`} />
            <input type="hidden" name="from_name" value="אתר המטרייה המשפחתית" />
            <input type="hidden" name="worksheet" value={title} />
            <input
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            <label htmlFor={`${id}-email`} className="block font-semibold text-ink text-[15px]">
              כתובת מייל
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                id={`${id}-email`}
                name="email"
                type="email"
                required
                autoComplete="email"
                dir="ltr"
                placeholder="name@example.com"
                className="flex-1 min-w-0 rounded-[10px] border border-line bg-white px-4 py-3 text-right placeholder:text-mauve/60 focus:border-ember-500 outline-none transition-colors duration-150"
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex items-center justify-center gap-2 rounded-[12px] text-white font-bold text-base px-6 py-3 bg-[linear-gradient(135deg,var(--ember-550),var(--ember-600))] hover:brightness-[1.06] disabled:opacity-70 transition-[filter] duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember-600"
              >
                {status === "submitting" ? (
                  <Loader2 className="w-5 h-5 animate-spin motion-reduce:animate-none" aria-hidden="true" />
                ) : (
                  <Download className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
                )}
                קבלו את הקובץ
              </button>
            </div>

            <label className="flex items-start gap-2.5 text-[14px] text-ink/80 leading-snug cursor-pointer">
              <input
                type="checkbox"
                name="marketing_consent"
                className="mt-0.5 w-4 h-4 accent-ember-600 flex-shrink-0"
              />
              <span>
                אשמח לקבל מדי פעם טיפים ועדכונים מהמטרייה המשפחתית במייל. אפשר
                להסיר בכל רגע.
              </span>
            </label>

            <p className="text-[13px] text-mauve">
              לא נעביר את הכתובת לאף אחד.{" "}
              <Link href="/privacy" className="underline underline-offset-2 hover:text-ember-700">
                מדיניות הפרטיות
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
