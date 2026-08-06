import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="scene-night starfield horizon grain relative overflow-hidden -mb-24">
      <div className="relative z-10 max-w-lg mx-auto px-4 py-28 min-h-[70svh] flex flex-col items-center justify-center text-center">
        <span className="relative block w-36 h-36 mx-auto mb-8 rounded-full overflow-hidden shadow-pop">
          <Image
            src="/images/logo-black.jpg"
            alt="המטרייה המשפחתית"
            fill
            sizes="144px"
            className="object-cover"
          />
        </span>
        <h1 className="text-3xl sm:text-4xl text-white mb-3">הדף לא נמצא</h1>
        <p className="text-white/70 mb-8">
          נראה שהעמוד שחיפשתם לא קיים, אבל אתם עדיין תחת המטרייה.
        </p>
        <Link href="/" className="btn-primary">
          חזרה לעמוד הבית
        </Link>
      </div>
    </div>
  );
}
