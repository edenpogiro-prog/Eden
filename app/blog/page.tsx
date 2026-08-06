import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CalendarDays, Clock3 } from "lucide-react";
import { getBlogPosts } from "@/lib/content";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "בלוג",
  description:
    "מאמרים וכלים מעשיים לזוגיות, הורות וכלכלת המשפחה, מהמטרייה המשפחתית.",
  alternates: { canonical: "/blog" },
};

const DATE_FMT = new Intl.DateTimeFormat("he-IL", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function BlogPage() {
  const posts = getBlogPosts();
  return (
    <>
      <header className="scene-night starfield horizon grain relative overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-16">
          <p className="eyebrow eyebrow-light">בלוג</p>
          <h1 className="text-4xl sm:text-6xl text-white mb-5 leading-[1.15]">
            רעיונות שמחזיקים בית
          </h1>
          <p className="text-lg text-white/70 leading-relaxed max-w-xl">
            מאמרים וכלים מעשיים לזוגיות, הורות וכלכלת המשפחה, בלי טיפים
            ריקים, עם מערכת.
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        {posts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <ScrollReveal key={post.slug} delay={i * 70}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="card card-hover group flex flex-col h-full overflow-hidden"
                >
                  {post.cover ? (
                    <span className="relative block aspect-[16/9] overflow-hidden bg-veil">
                      <Image
                        src={post.cover}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 100vw, 400px"
                        className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.04]"
                      />
                    </span>
                  ) : (
                    <span
                      aria-hidden="true"
                      className="block aspect-[16/9] scene-dusk"
                    />
                  )}
                  <span className="flex flex-col flex-1 p-6">
                    {post.tags.length > 0 && (
                      <span className="flex flex-wrap gap-2 mb-3">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs font-bold bg-ember-50 text-ember-700 px-2.5 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </span>
                    )}
                    <span className="font-display text-xl text-ink leading-snug mb-2 group-hover:text-ember-700 transition-colors duration-200">
                      {post.title}
                    </span>
                    <span className="text-mauve leading-relaxed !text-base flex-1">
                      {post.description}
                    </span>
                    <span className="mt-5 pt-4 border-t border-line flex items-center gap-4 text-sm text-mauve">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" />
                        {DATE_FMT.format(new Date(post.date))}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock3 className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" />
                        {post.readingMinutes} דק׳ קריאה
                      </span>
                      <ArrowLeft
                        className="w-4 h-4 mr-auto text-ember-600 group-hover:-translate-x-1 transition-transform duration-200"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </span>
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <p className="text-center text-mauve">מאמרים יתווספו בקרוב.</p>
        )}
      </div>
    </>
  );
}
