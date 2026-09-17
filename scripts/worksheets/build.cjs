/*
 * Printable worksheets → public/downloads/*.pdf
 *
 * Each sheet is plain data below, rendered through one HTML template in the
 * site's own type and palette (Suez One headings, Heebo text, abyss night
 * header with the sunrise glow, ember and champagne accents) and printed to
 * A4 by headless Chromium, which handles Hebrew RTL correctly. To change a
 * sheet, edit its data and re-run.
 *
 * Run:   npm i --no-save playwright && npx playwright install chromium
 *        node scripts/worksheets/build.cjs              (writes all PDFs)
 *        node scripts/worksheets/build.cjs kids         (only matching files)
 *        PREVIEW_DIR=/some/dir node scripts/...         (also writes PNG previews)
 *
 * The body is white on purpose: these get printed at home, and a tinted full
 * page wastes ink and prints with uneven white margins. Parchment lives in the
 * cards and callouts instead.
 */
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const ROOT = path.resolve(__dirname, "../..");
const OUT = path.join(ROOT, "public/downloads");
const LOGO =
  "data:image/jpeg;base64," +
  fs.readFileSync(path.join(ROOT, "public/images/logo-black.jpg")).toString("base64");

const EDEN = "עדן פוגירו";
const SIVAN = "סיון ארזי פוגירו";

const SHEETS = [
  {
    file: "family-budget-worksheet.pdf",
    title: "התקציב המשפחתי שלנו",
    author: EDEN,
    density: 1,
    blocks: [
      {
        h: "שלושת הדליים — לאן הכסף באמת הולך?",
        hint: "רשמו את ההוצאות הגדולות של הבית בכל עמודה:",
        cards: [
          ["קבוע", "דיור, חינוך, ביטוחים"],
          ["משתנה", "אוכל, דלק, בילויים"],
          ["המפתיע", "מגיע כל שנה, בתאריך אחר"],
        ],
        lines: 3,
      },
      {
        h: "לכל שקל תפקיד",
        fields: [
          "הכנסה חודשית משותפת",
          "קודם לעתיד — חיסכון וקרן חירום",
          "הוצאות קבועות",
          "הוצאות משתנות",
          "כיף — בהסכמה של שניכם",
        ],
      },
      {
        h: "פגישת הכסף השבועית שלנו",
        inline: [["יום קבוע"], ["שעה"], [null, "עשרים דקות, בלי מסכים"]],
        checks: [
          "מה יצא השבוע — בלי האשמות, רק עובדות",
          "מה מתוכנן לשבוע הקרוב",
          "איפה צריך לתקן או להזיז",
          "דבר אחד טוב שעשינו עם הכסף השבוע",
        ],
      },
      {
        h: "קרן החירום שלנו",
        fields: ["יעד ראשון — חודש הוצאות אחד", "כמה יש לנו היום בצד", "כמה נעביר לשם כל חודש"],
      },
    ],
    quote: "תקציב טוב הוא לא כלוב. הוא מפה.",
  },
  {
    file: "couples-communication-worksheet.pdf",
    title: "תרגול תקשורת זוגית",
    author: SIVAN,
    blocks: [
      {
        h: "המחזור שחוזר אצלנו",
        hint: "מלאו יחד, בלי האשמות, רק תיאור:",
        fields: [
          "מה בדרך כלל מתחיל את זה",
          "מה אני מרגיש/ה באותו רגע",
          "מה בן/בת הזוג מרגיש/ה באותו רגע",
          "מה הצורך שמסתתר מתחת לזה, אצלי",
        ],
      },
      {
        h: "משפט פתיחה בלי האשמה",
        template: "כשקרה ___, הרגשתי ___, ואני צריך/ה ___",
        fields: ["כשקרה", "הרגשתי", "אני צריך/ה"],
      },
      {
        h: "מעקב שבועי",
        table: { cols: [["יום", 1], ["מה קרה", 3], ["מה עבד טוב", 3]], rows: 5 },
      },
    ],
    quote: "לא צריך למלא הכול בבת אחת. גם צעד אחד קטן משנה משהו.",
  },
  {
    file: "kids-money-worksheet.pdf",
    title: "הכסף הראשון שלי",
    author: EDEN,
    nameField: "שם החוסך או החוסכת",
    density: 1,
    blocks: [
      {
        h: "שלוש הקופסאות שלי",
        hint: "כל פעם שמקבלים כסף, מחלקים אותו לשלוש קופסאות. כתבו כמה יש בכל אחת:",
        cards: [
          ["חיסכון", "כסף למטרה הגדולה שלי"],
          ["הוצאה", "כסף לדברים קטנים עכשיו"],
          ["נתינה", "כסף שמשמח מישהו אחר"],
        ],
        cardFoot: "כמה יש לי היום",
      },
      {
        h: "מעקב דמי כיס",
        hint: "בכל פעם שקיבלתם כסף — רשמו שורה חדשה:",
        table: {
          cols: [["תאריך", 1.1], ["קיבלתי", 1], ["שמתי בחיסכון", 1.4], ["שמתי בהוצאה", 1.4], ["שמתי בנתינה", 1.4]],
          rows: 6,
        },
      },
      {
        h: "המטרה הגדולה שלי",
        fields: ["אני חוסך או חוסכת בשביל", "זה עולה בערך", "כבר הצלחתי לחסוך"],
      },
    ],
    quote: "זוכרים את מבחן המרשמלו? מי שיודע לחכות — מקבל יותר.",
  },
  {
    file: "parenting-boundaries-worksheet.pdf",
    title: "מפת גבולות לבית שלנו",
    author: SIVAN,
    blocks: [
      {
        h: "שלושה גבולות לחדד השבוע",
        pairs: [
          ["גבול 1", "מה קורה אם חוצים אותו"],
          ["גבול 2", "מה קורה אם חוצים אותו"],
          ["גבול 3", "מה קורה אם חוצים אותו"],
        ],
      },
      {
        h: "משפט גבול בלי צעקה",
        template: "אני רואה/ת ש___. הגבול שלנו הוא ___. אם ___, אז ___.",
        fields: ["המשפט שלי", ""],
      },
      {
        h: "רגעים שהצלחתי להישאר רגוע/ה",
        checks: ["יום א׳", "יום ב׳", "יום ג׳", "יום ד׳", "יום ה׳"],
        checkLines: true,
      },
    ],
    quote: "גבול עקבי אחד שווה יותר מעשר תזכורות בצעקה.",
  },
  {
    file: "personal-growth-worksheet.pdf",
    title: "מעקב הרגל קטן",
    author: SIVAN,
    blocks: [
      {
        h: "ההרגל שאני בוחר/ת לשנות",
        fields: [
          "ההרגל הגדול שהתחלתי ממנו",
          "הגרסה הקטנה, כמעט מגוחכת, שלו",
          "אני מחבר/ת אותו לפעולה קיימת (״אחרי ש...״)",
        ],
      },
      { h: "מעקב יומי לשבעה ימים", days: 7 },
      { h: "איך אני מדבר/ת אל עצמי", fields: ["משפט עידוד שאני אומר/ת לעצמי אחרי כישלון", ""] },
    ],
    quote: "שינוי לא קורה בקפיצה אחת. הוא קורה בצעד קטן שחוזר על עצמו.",
  },
  {
    file: "debt-map-worksheet.pdf",
    title: "מפת החובות שלנו",
    author: EDEN,
    blocks: [
      {
        h: "כל החובות על השולחן",
        hint: "כל חוב בשורה נפרדת, גם המינוס בבנק וגם ההלוואה מהמשפחה:",
        table: {
          cols: [["למי חייבים", 1.5], ["כמה נשאר", 1.1], ["תשלום חודשי", 1.1], ["ריבית", 0.8], ["סדר החזר", 0.9]],
          rows: 7,
        },
      },
      {
        h: "איזו שיטה מתאימה לנו?",
        checks: [
          "כדור שלג: קודם החוב הקטן ביותר, בשביל תחושת התקדמות",
          "מפולת: קודם החוב עם הריבית הגבוהה ביותר, כדי לשלם פחות",
        ],
      },
      {
        h: "התוכנית החודשית שלנו",
        fields: ["כמה נקדיש להחזר כל חודש", "החוב שמקבל את כל התוספת עכשיו", "מתי נבדוק שוב את התוכנית"],
      },
      {
        h: "כרית ביטחון קטנה במקביל",
        fields: ["היעד הראשון שלנו לכרית", "כמה נשים בצד כל חודש"],
      },
    ],
    quote: "חוב לא נעלם בבת אחת. הוא נעלם שורה אחרי שורה.",
  },
  {
    file: "monthly-cashflow-worksheet.pdf",
    title: "התזרים החודשי שלנו",
    author: EDEN,
    density: 2,
    blocks: [
      {
        h: "ההכנסות שלנו החודש",
        fields: ["משכורת ראשונה", "משכורת שנייה", "הכנסות נוספות (עצמאי, שכירות ועוד)", "קצבאות ותמיכות"],
        total: "סה״כ הכנסות",
      },
      {
        h: "ההוצאות שלנו החודש",
        ledger: [
          ["קבוע", ["דיור / משכנתא", "חינוך", "ביטוחים", "מנויים"]],
          ["משתנה", ["מזון", "דלק / תחבורה", "בילויים", "כללי"]],
          ["מפתיע (חלקי 12)", ["רכב ותחזוקת בית", "בריאות", "אירועים ומתנות"]],
        ],
      },
      { h: "התזרים החודשי שלנו", flow: true },
      {
        h: "עשרה טיפים להתחיל איתם כבר היום",
        tips: [
          ["מזון", "לכו לסופר עם רשימת קניות מוכנה מראש, וקנו רק את מה שרשום בה."],
          ["מזון", "השוו מחירים בין רשתות לפני שקובעים איפה עושים את הקנייה החודשית, ונצלו רק מבצעים אמיתיים."],
          ["ביגוד", "הגדירו לכל בן משפחה ״רשימת תקן״, כמה פריטי לבוש ונעליים באמת צריך."],
          ["ביגוד", "לפני קנייה חדשה, בדקו קודם בארון מה כבר יש ושקלו יד שנייה או החלפה בין הילדים."],
          ["חשמל", "מפו את מכשירי החשמל הגדולים בבית, ובדקו איפה אפשר לשנות הרגלי שימוש."],
          ["חשמל", "עקבו אחרי חשבון החשמל מדי חודש כדי לזהות חריגות מוקדם, לפני שהן מצטברות."],
          ["מים", "סגרו את הברז בזמן צחצוח שיניים, גילוח או חפיפה. זה נשמע קטן אבל מצטבר."],
          ["מים", "השקו את הגינה בשעות הלילה, ובכמות המינימלית הנדרשת בלבד."],
          ["רכב", "נסיעה במהירות קבועה של כ־80 עד 90 קמ״ש היא היעילה ביותר מבחינת צריכת דלק."],
          ["רכב", "שמרו על לחץ אוויר תקין בצמיגים לפי הוראות היצרן. זה גם חוסך דלק וגם בטוח יותר."],
        ],
      },
    ],
    quote: "תקציב טוב הוא לא כלוב. הוא מפה.",
  },
];

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function field(label, extra = "") {
  return `<div class="field${extra}">${label ? `<span class="lbl">${esc(label)}:</span>` : ""}<span class="line"></span></div>`;
}

function block(b, i) {
  let h = `<section class="sec"><div class="sec-h"><span class="num">${i + 1}</span><h2>${esc(b.h)}</h2></div>`;
  if (b.hint) h += `<p class="hint">${esc(b.hint)}</p>`;
  if (b.template) h += `<p class="template"><span>תבנית</span>״${esc(b.template)}״</p>`;
  if (b.inline)
    h += `<div class="inline">${b.inline
      .map(([l, t]) => (l ? field(l) : `<span class="note">${esc(t)}</span>`))
      .join("")}</div>`;
  if (b.fields) h += `<div class="fields">${b.fields.map((f) => field(f)).join("")}</div>`;
  if (b.total) h += field(b.total, " total");
  if (b.pairs)
    h += `<div class="pairs">${b.pairs
      .map(([a, c]) => `<div class="pair">${field(a)}<div class="sub">${field(c)}</div></div>`)
      .join("")}</div>`;
  if (b.checks)
    h += `<ul class="checks">${b.checks
      .map(
        (c) =>
          `<li><span class="box"></span><span class="ctext">${esc(c)}</span>${b.checkLines ? `<span class="line"></span>` : ""}</li>`,
      )
      .join("")}</ul>`;
  if (b.cards)
    h += `<div class="cards">${b.cards
      .map(
        ([t, s]) =>
          `<div class="card"><p class="ct">${esc(t)}</p><p class="cs">${esc(s)}</p>${
            b.cardFoot
              ? `<div class="cf"><span class="line"></span><span>${esc(b.cardFoot)}</span></div>`
              : Array.from({ length: b.lines || 3 }, () => `<span class="line"></span>`).join("")
          }</div>`,
      )
      .join("")}</div>`;
  if (b.table) {
    const tot = b.table.cols.reduce((a, [, w]) => a + w, 0);
    h += `<table><colgroup>${b.table.cols
      .map(([, w]) => `<col style="width:${(w / tot) * 100}%">`)
      .join("")}</colgroup><thead><tr>${b.table.cols
      .map(([c]) => `<th>${esc(c)}</th>`)
      .join("")}</tr></thead><tbody>${Array.from(
      { length: b.table.rows },
      () => `<tr>${b.table.cols.map(() => "<td></td>").join("")}</tr>`,
    ).join("")}</tbody></table>`;
  }
  if (b.days)
    h += `<div class="days">${Array.from(
      { length: b.days },
      (_, d) => `<div class="day"><p>יום ${d + 1}</p><span class="box"></span><p class="dsub">עשיתי את זה</p></div>`,
    ).join("")}</div>`;
  if (b.ledger)
    h += `<div class="cards">${b.ledger
      .map(
        ([t, rows]) =>
          `<div class="card ledger"><p class="ct">${esc(t)}</p>${rows.map((r) => field(r)).join("")}${field("סה״כ", " total")}</div>`,
      )
      .join("")}</div>`;
  if (b.flow)
    h += `<div class="flow"><div class="flow-rows">${field("סה״כ הכנסות")}${field(
      "פחות סה״כ הוצאות (קבוע + משתנה + מפתיע)",
    )}${field("= התזרים החודשי שלנו", " total")}</div><p class="flow-note">חיובי? מעולה.<br>שלילי? פנו עוד היום למטרייה המשפחתית.</p></div>`;
  if (b.tips) h += `<ol class="tips">${b.tips.map(([c, t]) => `<li><b>${esc(c)}:</b> ${esc(t)}</li>`).join("")}</ol>`;
  return h + `</section>`;
}

function html(s) {
  const lvl = s.density || 0;
  const v = (...opts) => opts[lvl];
  return `<!doctype html><html lang="he" dir="rtl"><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;600;700;800&family=Suez+One&display=block" rel="stylesheet">
<style>
@page { size: A4; margin: 0; }
:root { --abyss:#1A1122; --abyss-deep:#0F0A16; --plum:#2A1B36; --ember:#F26648; --ember-d:#D94E33; --champ:#E3B978; --champ-l:#F7E8CF; --parch:#FBF5EC; --veil:#F4EAE0; --rule:#EADFD4; --writeline:#CDBBA8; --ink:#241B26; --mauve:#6B5B6E; }
* { box-sizing: border-box; margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
html, body { width: 210mm; }
body { font-family: "Heebo", Arial, sans-serif; color: var(--ink); background: #fff; }
.page { width: 210mm; height: 297mm; display: flex; flex-direction: column; overflow: hidden; }
.hero { position: relative; overflow: hidden; color: #fff; padding: ${v("11mm 14mm 12mm", "9mm 14mm 10mm", "7.5mm 14mm 8.5mm")};
  background: radial-gradient(120% 90% at 50% 140%, rgba(242,102,72,.55) 0%, rgba(227,185,120,.18) 38%, rgba(26,17,34,0) 62%), linear-gradient(180deg, var(--abyss-deep) 0%, var(--abyss) 55%, var(--plum) 100%); }
.hero::before { content:""; position:absolute; inset:0; opacity:.85; background-image:
  radial-gradient(1px 1px at 12% 22%, #fff 50%, transparent 51%), radial-gradient(1.2px 1.2px at 27% 64%, #F7E8CF 50%, transparent 51%),
  radial-gradient(1px 1px at 41% 18%, #fff 50%, transparent 51%), radial-gradient(1.4px 1.4px at 58% 40%, #fff 50%, transparent 51%),
  radial-gradient(1px 1px at 66% 12%, #F7E8CF 50%, transparent 51%), radial-gradient(1px 1px at 79% 58%, #fff 50%, transparent 51%),
  radial-gradient(1.2px 1.2px at 88% 26%, #fff 50%, transparent 51%), radial-gradient(1px 1px at 34% 35%, #fff 50%, transparent 51%),
  radial-gradient(1px 1px at 52% 70%, #F7E8CF 50%, transparent 51%), radial-gradient(1px 1px at 8% 48%, #fff 50%, transparent 51%); }
.hero::after { content:""; position:absolute; left:0; right:0; bottom:0; height:1.2px; background: linear-gradient(90deg, transparent, var(--champ), transparent); }
.hero-in { position: relative; display: flex; align-items: center; justify-content: space-between; gap: 8mm; }
.eyebrow { font-size: 10pt; font-weight: 700; color: var(--champ); margin-bottom: 1.5mm; }
h1 { font-family: "Suez One", serif; font-weight: 400; font-size: ${v("29pt", "27pt", "24pt")}; line-height: 1.1; }
.by { font-size: 10pt; color: rgba(255,255,255,.72); margin-top: 2mm; }
.logo { width: ${v("28mm", "25mm", "22mm")}; height: ${v("28mm", "25mm", "22mm")}; border-radius: 50%; flex-shrink: 0; box-shadow: 0 0 0 1.3mm rgba(227,185,120,.35), 0 0 10mm rgba(242,102,72,.35); }
.logo img { width: 100%; height: 100%; border-radius: 50%; display: block; }
main { flex: 1; min-height: 0; padding: ${v("8mm 14mm 0", "6mm 14mm 0", "5mm 14mm 0")}; display: flex; flex-direction: column; gap: ${v("6.5mm", "4.6mm", "3.6mm")}; }
.namef { font-weight: 700; }
.sec-h { display: flex; align-items: center; gap: 2.5mm; margin-bottom: ${v("2.8mm", "2.2mm", "1.7mm")}; }
.num { width: 7mm; height: 7mm; border-radius: 50%; background: linear-gradient(135deg, var(--ember), var(--ember-d)); color: #fff; font-weight: 800; font-size: 10.5pt; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
h2 { font-family: "Suez One", serif; font-weight: 400; font-size: ${v("15.5pt", "14.5pt", "13.5pt")}; line-height: 1.2; }
.hint { font-size: 10pt; color: var(--mauve); margin: -0.8mm 0 2.6mm; }
.template { font-size: 10.5pt; background: var(--veil); border-radius: 2.5mm; padding: 2.2mm 3.5mm; margin-bottom: 3mm; display: inline-block; }
.template span { font-weight: 700; color: var(--ember-d); margin-left: 2mm; }
.fields { display: flex; flex-direction: column; gap: ${v("3.6mm", "2.4mm", "1.8mm")}; }
.field { display: flex; align-items: flex-end; gap: 2.5mm; font-size: ${v("11pt", "10.5pt", "9.5pt")}; min-height: ${v("7mm", "6mm", "5.2mm")}; }
.lbl { white-space: nowrap; }
.line { flex: 1; border-bottom: 1.3px solid var(--writeline); min-width: 20mm; height: 1px; margin-bottom: 1.2mm; }
.total .lbl { font-weight: 800; }
.total .line { border-bottom: 2px solid var(--ink); }
.fields + .total { margin-top: 2.6mm; }
.inline { display: flex; gap: 6mm; align-items: flex-end; margin-bottom: 3mm; }
.inline .field { flex: 1; }
.inline .note { font-size: 10pt; color: var(--mauve); white-space: nowrap; padding-bottom: 1mm; }
.pairs { display: flex; flex-direction: column; gap: 3.2mm; }
.pair { border-right: 2.5px solid var(--champ); padding-right: 3.5mm; display: flex; flex-direction: column; gap: 2mm; }
.pair .sub { padding-right: 6mm; color: var(--mauve); }
.checks { list-style: none; display: flex; flex-direction: column; gap: ${v("3mm", "2.2mm", "1.8mm")}; }
.checks li { display: flex; align-items: center; gap: 3mm; font-size: 11pt; }
.checks .ctext { white-space: nowrap; }
.box { width: 4.6mm; height: 4.6mm; border: 1.8px solid var(--ember-d); border-radius: 1.2mm; flex-shrink: 0; display: inline-block; background: #fff; }
.cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4mm; }
.card { background: var(--parch); border: 1.3px solid #E9D5B4; border-radius: 3.5mm; padding: ${v("3.8mm 4mm 4mm", "3.2mm 4mm 3.4mm", "2.6mm 3.5mm 3mm")}; display: flex; flex-direction: column; gap: ${v("3.6mm", "2.8mm", "2mm")}; }
.card .ct { font-family: "Suez One", serif; font-size: 13pt; text-align: center; }
.card .cs { font-size: 9pt; color: var(--mauve); text-align: center; margin-top: -2.8mm; }
.card > .line { flex: none; height: 5mm; border-bottom-color: #DCC7AE; }
.cf { margin-top: ${v("7mm", "4.5mm", "3.5mm")}; display: flex; flex-direction: column; align-items: center; gap: 1.5mm; font-size: 9pt; color: var(--mauve); }
.cf .line { width: 80%; flex: none; }
.card.ledger { gap: 2.2mm; padding: 3mm 3.5mm 3.5mm; }
.card.ledger .ct { text-align: right; font-size: 12pt; border-bottom: 1.3px solid var(--champ); padding-bottom: 1.6mm; margin-bottom: 0.8mm; }
.card.ledger .field { font-size: 9.2pt; min-height: 4.8mm; }
table { width: 100%; border-collapse: separate; border-spacing: 0; border: 1.3px solid #E4CFAE; border-radius: 3mm; overflow: hidden; font-size: 10pt; }
th { background: var(--champ-l); font-weight: 700; text-align: right; padding: 2.2mm 3mm; border-bottom: 1.3px solid #E4CFAE; }
td { height: ${v("8.6mm", "7.2mm", "6.2mm")}; border-bottom: 1px solid var(--rule); }
th + th, td + td { border-right: 1px solid var(--rule); }
tbody tr:last-child td { border-bottom: 0; }
.days { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2.5mm; }
.day { background: var(--parch); border: 1.3px solid #E9D5B4; border-radius: 3mm; padding: 3mm 1mm; display: flex; flex-direction: column; align-items: center; gap: 2mm; font-size: 10.5pt; font-weight: 700; }
.day .box { width: 6mm; height: 6mm; }
.day .dsub { font-size: 8pt; font-weight: 500; color: var(--mauve); text-align: center; }
.flow { padding-block: 0; background: radial-gradient(90% 120% at 10% 130%, rgba(242,102,72,.4), transparent 60%), linear-gradient(135deg, var(--abyss-deep), var(--plum)); color: #fff; border-radius: 3.5mm; padding: 2.8mm 5mm; display: flex; gap: 6mm; align-items: center; }
.flow-rows { flex: 1; display: flex; flex-direction: column; gap: 1.2mm; }
.flow .line { border-bottom-color: rgba(255,255,255,.45); }
.flow .total .line { border-bottom: 2px solid var(--champ); }
.flow-note { font-size: 9.5pt; color: var(--champ-l); line-height: 1.5; border-right: 2px solid var(--champ); padding-right: 3mm; white-space: nowrap; }
.tips { list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 1.4mm 3.5mm; font-size: 8.5pt; line-height: 1.35; }
.tips li { background: var(--parch); border-radius: 2mm; padding: 1.4mm 2.4mm; border-right: 2.5px solid var(--ember); }
.tips b { color: var(--ember-d); }
.quote { margin-top: auto; background: var(--veil); border-right: 4px solid var(--champ); border-radius: 3mm; padding: ${v("4.2mm 6mm", "3.2mm 5mm", "2.3mm 4.5mm")}; font-family: "Suez One", serif; font-size: ${v("13.5pt", "12.5pt", "11.5pt")}; }
footer { margin-top: ${v("5.5mm", "4mm", "2.8mm")}; padding: ${v("3.2mm", "3mm", "2.6mm")} 14mm ${v("6.5mm", "5mm", "4.2mm")}; display: flex; justify-content: space-between; align-items: center; font-size: 9pt; color: var(--mauve); position: relative; }
footer::before { content:""; position:absolute; top:0; left:14mm; right:14mm; height:1px; background: linear-gradient(90deg, transparent, var(--champ), transparent); }
footer b { color: var(--ink); font-weight: 700; }
footer .url { color: var(--ember-d); font-weight: 700; direction: ltr; }
</style></head><body><div class="page">
<header class="hero"><div class="hero-in"><div><p class="eyebrow">דף עבודה להדפסה</p><h1>${esc(s.title)}</h1><p class="by">מאת ${esc(s.author)} · המטרייה המשפחתית</p></div><div class="logo"><img src="${LOGO}" alt=""></div></div></header>
<main>${s.nameField ? field(s.nameField, " namef") : ""}${s.blocks.map(block).join("")}<p class="quote">${esc(s.quote)}</p></main>
<footer><span><b>המטרייה המשפחתית</b> · כל המשפחה. תחת מטרייה אחת.</span><span class="url">mitriafamily.co.il</span></footer>
</div></body></html>`;
}

(async () => {
  const only = process.argv[2];
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 794, height: 1123 } });
  let problems = 0;
  for (const s of SHEETS) {
    if (only && !s.file.includes(only)) continue;
    await page.setContent(html(s), { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    // Everything must fit on one A4 page, in the site's own fonts.
    const fit = await page.evaluate(() => {
      const main = document.querySelector("main");
      const loaded = [...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family);
      return {
        overflow: main.scrollHeight - main.clientHeight,
        suez: loaded.some((f) => /Suez/.test(f)),
        heebo: loaded.some((f) => /Heebo/.test(f)),
      };
    });
    const ok = fit.overflow <= 1 && fit.suez && fit.heebo;
    if (!ok) problems++;
    console.log(`${ok ? "ok  " : "FIX "} ${s.file}  overflow=${fit.overflow}px  suez=${fit.suez} heebo=${fit.heebo}`);
    await page.pdf({ path: path.join(OUT, s.file), format: "A4", printBackground: true, preferCSSPageSize: true });
    if (process.env.PREVIEW_DIR)
      await page.screenshot({ path: path.join(process.env.PREVIEW_DIR, s.file.replace(".pdf", ".png")) });
  }
  await browser.close();
  process.exit(problems ? 1 : 0);
})();
