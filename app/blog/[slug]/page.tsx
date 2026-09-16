import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays, ChevronLeft, Clock3, UserRound } from "lucide-react";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getBlogPosts, getBlogPostBySlug } from "@/lib/content";
import { COACHES } from "@/lib/site";
import { articleLd, breadcrumbLd } from "@/lib/seo";
import ContactActions from "@/components/ContactActions";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const DATE_FMT = new Intl.DateTimeFormat("he-IL", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function generateStaticParams() {
  return getBlogPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      locale: "he_IL",
      ...(post.cover ? { images: [{ url: post.cover }] } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const { content: body } = await compileMDX({
    source: post.content,
    options: { mdxOptions: { remarkPlugins: [remarkGfm] } },
  });

  const crumbs = breadcrumbLd([
    { name: "בית", path: "/" },
    { name: "בלוג", path: "/blog" },
    { name: post.title, path: `/blog/${slug}` },
  ]);

  // The coach who wrote this, so the byline can point at their bio. Matching
  // on the display name used in frontmatter keeps the MDX free of slugs.
  const author = Object.values(COACHES).find((c) => c.name === post.author);

  // Related reading, by shared tag, falling back to the newest other posts.
  // Posts that link nowhere are dead ends: Google can't pass authority through
  // them to the service pages, and readers leave at the end of the article.
  const others = getBlogPosts().filter((p) => p.slug !== slug);
  const related = (
    others.filter((p) => p.tags.some((t) => post.tags.includes(t))).length > 0
      ? others.filter((p) => p.tags.some((t) => post.tags.includes(t)))
      : others
  ).slice(0, 3);

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd(post)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />

      {/* Hero — night band */}
      <header className="scene-night starfield horizon grain relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14">
          <nav className="flex items-center gap-1 text-white/60 text-sm mb-10">
            <Link href="/" className="hover:text-white transition-colors duration-150">בית</Link>
            <ChevronLeft className="w-4 h-4 rtl:rotate-180" strokeWidth={1.5} />
            <Link href="/blog" className="hover:text-white transition-colors duration-150">בלוג</Link>
            <ChevronLeft className="w-4 h-4 rtl:rotate-180" strokeWidth={1.5} />
            <span className="text-white font-semibold line-clamp-1">{post.title}</span>
          </nav>

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="glass-warm !rounded-full !text-xs font-bold text-champagne-100 px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h1 className="text-4xl sm:text-5xl text-white mb-5 leading-[1.15]">
            {post.title}
          </h1>
          <p className="text-lg text-white/70 leading-relaxed mb-7 max-w-2xl">
            {post.description}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/60 border-t border-white/10 pt-5">
            <span className="flex items-center gap-1.5">
              <UserRound className="w-4 h-4 text-champagne-400" strokeWidth={1.5} aria-hidden="true" />
              {author ? (
                <Link
                  href={`/team/${author.slug}`}
                  className="text-white/80 hover:text-white underline underline-offset-4 decoration-champagne-400/60 transition-colors duration-150"
                >
                  {post.author}
                </Link>
              ) : (
                post.author
              )}
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarDays className="w-4 h-4 text-champagne-400" strokeWidth={1.5} aria-hidden="true" />
              {DATE_FMT.format(new Date(post.date))}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock3 className="w-4 h-4 text-champagne-400" strokeWidth={1.5} aria-hidden="true" />
              {post.readingMinutes} דקות קריאה
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Cover */}
        {post.cover && (
          <div className="relative aspect-[16/9] rounded-[24px] overflow-hidden shadow-pop -mt-20 mb-12 border border-white/40">
            <Image
              src={post.cover}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        )}

        {/* Body */}
        <div className="prose-rtl">{body}</div>

        {/* Related reading */}
        {related.length > 0 && (
          <section className="mt-14 pt-10 border-t border-line">
            <p className="eyebrow">להמשיך לקרוא</p>
            <ul className="grid sm:grid-cols-2 gap-3">
              {related.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="card card-hover group block h-full p-5"
                  >
                    <h2 className="!font-sans font-bold text-ink group-hover:text-ember-700 transition-colors duration-200 leading-snug">
                      {p.title}
                    </h2>
                    <span className="text-mauve/80 text-xs mt-2 block">
                      {p.readingMinutes} דקות קריאה
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* CTA */}
        <div className="scene-dusk aurora grain relative overflow-hidden rounded-[24px] p-8 sm:p-12 text-center mt-14">
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl text-white mb-3 leading-tight">
              רוצים ליישם את זה אצלכם בבית?
            </h2>
            <p className="text-white/70 mb-8 leading-relaxed max-w-md mx-auto">
              שיחה קצרה בוואטסאפ, בלי התחייבות, נראה יחד מאיפה הכי נכון
              להתחיל.
            </p>
            <ContactActions tone="light" className="max-w-2xl mx-auto" />
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-ember-700 font-semibold hover:text-ember-500 transition-colors duration-150"
          >
            <ChevronLeft className="w-4 h-4 rtl:rotate-180" strokeWidth={1.5} aria-hidden="true" />
            לכל המאמרים בבלוג
          </Link>
        </div>
      </div>
    </article>
  );
}
