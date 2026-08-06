import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Check, Instagram, Podcast } from "lucide-react";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getTeam, getTeamMemberBySlug } from "@/lib/content";
import { COACHES, SITE } from "@/lib/site";
import { whatsappLink } from "@/lib/whatsapp";
import { personLd, breadcrumbLd } from "@/lib/seo";
import WhatsAppCTA from "@/components/WhatsAppCTA";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getTeam().map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const member = getTeamMemberBySlug(slug);
  if (!member) return {};
  return {
    title: member.name,
    description: `${member.name}, ${member.role}. חלק מהמטרייה המשפחתית.`,
    alternates: { canonical: `/team/${slug}` },
  };
}

export default async function TeamPage({ params }: PageProps) {
  const { slug } = await params;
  const member = getTeamMemberBySlug(slug);
  if (!member) notFound();

  const { content: body } = await compileMDX({
    source: member.content,
    options: { mdxOptions: { remarkPlugins: [remarkGfm] } },
  });

  const coach = COACHES[member.coachKey];
  const wa = whatsappLink({
    message: `היי ${member.name.split(" ")[0]}, הגעתי דרך האתר ואשמח לשוחח.`,
    service: member.coachKey === "eden" ? "finance" : "couples",
  });

  // The other coach — cross-linked at the bottom of the bio.
  const other = getTeam().find((m) => m.slug !== slug);

  const crumbs = breadcrumbLd([
    { name: "בית", path: "/" },
    { name: member.name, path: `/team/${slug}` },
  ]);

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd(member)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />

      <header className="scene-night starfield horizon grain relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14">
          <nav className="flex items-center gap-1 text-white/60 text-sm mb-10">
            <Link href="/" className="hover:text-white transition-colors duration-150">בית</Link>
            <ChevronLeft className="w-4 h-4 rtl:rotate-180" strokeWidth={1.5} />
            <span className="text-white font-semibold">{member.name}</span>
          </nav>

          <div className="flex flex-col sm:flex-row items-start gap-6">
            {member.photo ? (
              <span className="relative w-28 h-28 rounded-[16px] overflow-hidden flex-shrink-0 ring-2 ring-champagne-400/60">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </span>
            ) : (
              <span className="w-28 h-28 rounded-[16px] bg-abyss-800 text-champagne-100 flex items-center justify-center text-4xl font-display flex-shrink-0">
                {member.name.charAt(0)}
              </span>
            )}
            <div>
              <h1 className="text-3xl sm:text-5xl text-white mb-1 leading-tight">
                {member.name}
              </h1>
              <p className="text-lg text-champagne-100">{member.role}</p>
              {member.credentials && member.credentials.length > 0 && (
                <ul className="flex flex-wrap gap-2 mt-4">
                  {member.credentials.map((c) => (
                    <li
                      key={c}
                      className="glass-warm !rounded-full inline-flex items-center gap-1.5 !text-sm text-white/90 px-3 py-1 font-medium"
                    >
                      <Check className="w-3.5 h-3.5 text-champagne-400" strokeWidth={1.5} />
                      {c}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      <div className="prose-rtl max-w-prose mb-10">{body}</div>

      {/* Meet the other coach */}
      {other && (
        <div className="mb-10">
          <p className="eyebrow">הכירו גם את</p>
          <Link
            href={`/team/${other.slug}`}
            className="card card-hover group flex items-center gap-4 p-5"
          >
            {other.photo ? (
              <span className="relative w-20 h-20 rounded-[14px] overflow-hidden flex-shrink-0 bg-veil">
                <Image
                  src={other.photo}
                  alt={other.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </span>
            ) : (
              <span className="w-20 h-20 rounded-[14px] bg-ember-50 text-ember-700 flex items-center justify-center text-3xl font-display flex-shrink-0">
                {other.name.charAt(0)}
              </span>
            )}
            <div>
              <h2 className="!font-sans font-bold text-ink group-hover:text-ember-700 transition-colors duration-200">
                {other.name}
              </h2>
              <p className="text-mauve text-sm leading-snug">{other.role}</p>
              {other.tagline && (
                <p className="mt-1.5 text-ember-600 text-sm font-medium leading-snug">
                  {other.tagline}
                </p>
              )}
            </div>
            <ChevronLeft className="w-5 h-5 text-ember-600 mr-auto group-hover:-translate-x-1 transition-transform duration-200" strokeWidth={1.5} />
          </Link>
        </div>
      )}

      <div className="bg-ember-50 rounded-[18px] p-8 text-center">
        <p className="text-ink font-semibold mb-5">
          רוצים לדבר ישירות עם {member.name.split(" ")[0]}?
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <WhatsAppCTA href={wa} label={`וואטסאפ עם ${member.name.split(" ")[0]}`} />
          {member.slug === "sivan" && (
            <>
              <a
                href={SITE.spotifyShowUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <Podcast className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" />
                הפודקאסט שלי בספוטיפיי
              </a>
              <a
                href={SITE.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <Instagram className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" />
                אינסטגרם
              </a>
            </>
          )}
        </div>
      </div>
      </div>
    </article>
  );
}
