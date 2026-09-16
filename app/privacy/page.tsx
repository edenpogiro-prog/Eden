import type { Metadata } from "next";
import { SITE, PHONE_DISPLAY } from "@/lib/site";

export const metadata: Metadata = {
  title: "מדיניות פרטיות",
  description: "מדיניות הפרטיות של אתר המטרייה המשפחתית.",
  alternates: { canonical: "/privacy" },
  robots: { index: false },
};

// Keep this page truthful about what actually runs on the site. It previously
// described a "privacy-respecting, no tracking cookies" analytics tool, which
// was Plausible — and Plausible has never actually loaded (its domain env var
// is unset), while Google Analytics and the Google Ads conversion tag do run.
// If a measurement tool is added, removed or swapped, update this page in the
// same change: an inaccurate statement about tracking is worse than none.
const UPDATED = "16 בספטמבר 2026";

export default function PrivacyPage() {
  return (
    <div className="max-w-prose mx-auto px-4 sm:px-6 lg:px-8 py-16 prose-rtl">
      <h1 className="text-3xl sm:text-4xl text-ink mb-3">מדיניות פרטיות</h1>
      <p className="text-mauve text-sm mb-8">עודכן לאחרונה: {UPDATED}</p>

      <p>
        אנחנו ב{SITE.name} מכבדים את פרטיותכם. העמוד הזה מסביר בדיוק איזה מידע
        נאסף כשאתם גולשים באתר או פונים אלינו, מי עוד רואה אותו, וכיצד תוכלו
        לשלוט בו.
      </p>

      <h2>מידע שאתם מוסרים לנו ביוזמתכם</h2>
      <p>
        כשאתם ממלאים את טופס יצירת הקשר אנחנו מקבלים את השם, הטלפון ותוכן
        הפנייה שבחרתם למסור. כשאתם פונים אלינו בוואטסאפ, בטלפון או במייל אנחנו
        רואים את פרטי הקשר שמהם פניתם ואת תוכן ההודעה.
      </p>
      <p>
        אנחנו משתמשים במידע הזה אך ורק כדי לחזור אליכם ולנהל את הליווי. איננו
        מוכרים אותו, ואיננו מעבירים אותו לגורמים אחרים למטרות שיווק.
      </p>

      <h2>מידע שנאסף אוטומטית בזמן הגלישה</h2>
      <p>
        כמו ברוב האתרים, נאסף מידע טכני על השימוש באתר: אילו עמודים נצפו, כמה
        זמן, מאיזה סוג מכשיר ודפדפן, ומאיפה הגעתם (למשל מחיפוש בגוגל או ממודעה).
        המידע הזה משמש אותנו כדי להבין מה מעניין את הגולשים ולשפר את האתר, והוא
        אינו כולל את שמכם או את פרטי הקשר שלכם.
      </p>

      <h2>השירותים החיצוניים שפועלים באתר</h2>
      <p>אלה הכלים שרצים באתר בפועל, ומה כל אחד מהם עושה:</p>
      <ul>
        <li>
          <strong>Google Analytics 4</strong> — מודד את השימוש באתר כמתואר
          למעלה. השירות משתמש בעוגיות ומעביר את המידע לשרתי Google.
        </li>
        <li>
          <strong>מעקב המרות של Google Ads</strong> — מדווח ל-Google כשגולש
          שהגיע ממודעה לחץ על כפתור וואטסאפ או שלח את טופס יצירת הקשר, כדי
          שנדע אילו מודעות עובדות. השירות משתמש בעוגיות.
        </li>
        <li>
          <strong>Web3Forms</strong> — השירות שדרכו טופס יצירת הקשר נשלח לתיבת
          המייל שלנו. פרטי הפנייה עוברים דרך שרתיו בדרך אלינו.
        </li>
        <li>
          <strong>וואטסאפ</strong> — לחיצה על כפתור וואטסאפ מעבירה אתכם
          לאפליקציה או לאתר של וואטסאפ. מרגע זה חלה גם מדיניות הפרטיות של Meta.
        </li>
      </ul>

      <h2>עוגיות</h2>
      <p>
        עוגיות הן קבצים קטנים שנשמרים בדפדפן שלכם. באתר הזה הן משמשות לשתי
        מטרות בלבד: מדידת השימוש באתר ומעקב אחר יעילות המודעות, שניהם כמתואר
        למעלה. בנוסף, אם השתמשתם בווידג׳ט הנגישות, ההעדפות שבחרתם (גודל טקסט,
        ניגודיות) נשמרות מקומית בדפדפן שלכם בלבד ואינן נשלחות לשום מקום.
      </p>

      <h2>איך לשלוט בזה</h2>
      <ul>
        <li>
          אפשר לחסום או למחוק עוגיות דרך הגדרות הדפדפן. חסימה לא תפגע בשימוש
          באתר.
        </li>
        <li>
          לביטול מעקב של Google Analytics בכל האתרים, Google מציעה תוסף ייעודי
          לדפדפן בכתובת{" "}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
            dir="ltr"
          >
            tools.google.com/dlpage/gaoptout
          </a>
          .
        </li>
        <li>
          לניהול העדפות הפרסום האישיות שלכם ב-Google:{" "}
          <a
            href="https://myadcenter.google.com"
            target="_blank"
            rel="noopener noreferrer"
            dir="ltr"
          >
            myadcenter.google.com
          </a>
          .
        </li>
      </ul>

      <h2>כמה זמן המידע נשמר</h2>
      <p>
        פניות שקיבלנו נשמרות אצלנו כל עוד הן רלוונטיות לקשר איתכם. נתוני הגלישה
        ב-Google Analytics נשמרים לתקופה מוגבלת בהתאם להגדרות השירות. תוכלו לבקש
        מאיתנו למחוק את פרטיכם בכל עת.
      </p>

      <h2>הזכויות שלכם</h2>
      <p>
        על פי חוק הגנת הפרטיות, התשמ״א-1981, אתם רשאים לפנות אלינו ולבקש לעיין
        במידע שנשמר עליכם, לתקן מידע שאינו נכון, או לבקש את מחיקתו. נטפל בכל
        פנייה כזו בהקדם.
      </p>

      <h2>יצירת קשר בנושא פרטיות</h2>
      <p>
        בכל שאלה או בקשה הנוגעת לפרטיות אפשר לפנות אלינו במייל{" "}
        <span dir="ltr">{SITE.email}</span> או בטלפון{" "}
        <span dir="ltr">{PHONE_DISPLAY}</span>.
      </p>

      <h2>שינויים במדיניות</h2>
      <p>
        אם נוסיף או נחליף כלי שאוסף מידע, נעדכן את העמוד הזה ואת תאריך העדכון
        שבראשו.
      </p>
    </div>
  );
}
