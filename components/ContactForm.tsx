"use client";

import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { track } from "@/lib/analytics";

type Status = "idle" | "submitting" | "success" | "error";

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return; // guard double-submit
    setStatus("submitting");
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: bots fill hidden fields
    if ((data.get("botcheck") as string)?.length) {
      setStatus("success");
      return;
    }

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setStatus("success");
        track("form_submit", { form: "contact" });
        form.reset();
      } else {
        setStatus("error");
        setError(json.message || "משהו השתבש. נסו שוב או פנו אלינו בוואטסאפ.");
      }
    } catch {
      setStatus("error");
      setError("לא הצלחנו לשלוח. בדקו את החיבור או פנו אלינו בוואטסאפ.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[18px] bg-ember-50 border border-ember-100 p-8 text-center">
        <CheckCircle2 className="w-12 h-12 text-ember-600 mx-auto mb-3" strokeWidth={1.5} />
        <h3 className="text-xl font-bold text-ink mb-1">
          תודה! קיבלנו את הפנייה
        </h3>
        <p className="text-mauve">נשמח לחזור אליכם בהקדם. 🙂</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input type="hidden" name="access_key" value={ACCESS_KEY} />
      <input type="hidden" name="subject" value="פנייה חדשה מאתר המטרייה המשפחתית" />
      <input type="hidden" name="from_name" value="אתר המטרייה המשפחתית" />
      {/* honeypot */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div>
        <label htmlFor="name" className="block font-semibold text-ink mb-1">
          שם מלא
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full rounded-[10px] border border-line bg-white px-4 py-3 focus:border-ember-500 outline-none transition-colors duration-150"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block font-semibold text-ink mb-1">
            טלפון
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            dir="ltr"
            className="w-full rounded-[10px] border border-line bg-white px-4 py-3 text-right focus:border-ember-500 outline-none transition-colors duration-150"
          />
        </div>
        <div>
          <label htmlFor="topic" className="block font-semibold text-ink mb-1">
            נושא הפנייה
          </label>
          <select
            id="topic"
            name="topic"
            className="w-full rounded-[10px] border border-line bg-white px-4 py-3 focus:border-ember-500 outline-none transition-colors duration-150"
          >
            <option>ייעוץ משפחתי והדרכת הורים</option>
            <option>ייעוץ זוגי</option>
            <option>ייעוץ בכלכלת המשפחה</option>
            <option>הבלופרינט</option>
            <option>מסלול משולב: כלכלה ומשפחה</option>
            <option>מסלול משולב: זוגיות וכלכלה</option>
            <option>קורסים דיגיטליים</option>
            <option>התפתחות אישית</option>
            <option>הרצאות וסדנאות</option>
            <option>המנהיגים של המחר (ילדים ומתבגרים)</option>
            <option>לא בטוח/ה, עזרו לי לבחור</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block font-semibold text-ink mb-1">
          מה תרצו לספר לנו?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full rounded-[10px] border border-line bg-white px-4 py-3 focus:border-ember-500 outline-none resize-none transition-colors duration-150"
        />
      </div>

      <label className="flex items-start gap-2 text-sm text-mauve">
        <input type="checkbox" name="consent" required className="mt-1" />
        <span>
          אני מאשר/ת שתחזרו אליי בנוגע לפנייה. הפרטים לא יועברו לצד שלישי.
        </span>
      </label>

      {status === "error" && (
        <p className="text-red-600 font-semibold" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" /> שולח…
          </>
        ) : (
          "שליחת פנייה"
        )}
      </button>
    </form>
  );
}
