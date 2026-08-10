import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "מדיניות פרטיות",
  description: "מדיניות הפרטיות של אתר המטרייה המשפחתית.",
  alternates: { canonical: "/privacy" },
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-prose mx-auto px-4 sm:px-6 lg:px-8 py-16 prose-rtl">
      <h1 className="text-3xl sm:text-4xl text-ink mb-6">
        מדיניות פרטיות
      </h1>
      <p>
        אנחנו ב{SITE.name} מכבדים את פרטיותכם. עמוד זה מסביר איזה מידע אנחנו
        אוספים וכיצד אנו משתמשים בו.
      </p>
      <h2>איזה מידע אנחנו אוספים</h2>
      <p>
        כאשר אתם ממלאים טופס יצירת קשר, אנחנו אוספים את השם, הטלפון ופרטי הפנייה
        שבחרתם למסור. מידע זה נשלח אלינו במייל לצורך חזרה אליכם בלבד.
      </p>
      <h2>שימוש במידע</h2>
      <p>
        אנו משתמשים בפרטים אך ורק כדי ליצור איתכם קשר בנוגע לפנייתכם. איננו
        מעבירים את פרטיכם לצד שלישי ואיננו עושים בהם שימוש שיווקי ללא הסכמתכם.
      </p>
      <h2>אנליטיקה</h2>
      <p>
        אנו עשויים להשתמש בכלי אנליטיקה מכבד-פרטיות (ללא עוגיות מעקב אישיות) כדי
        להבין כיצד משתמשים באתר ולשפר אותו.
      </p>
      <h2>יצירת קשר</h2>
      <p>
        בכל שאלה בנוגע לפרטיות ניתן לפנות אלינו במייל:{" "}
        <span dir="ltr">{SITE.email}</span>.
      </p>
    </div>
  );
}
