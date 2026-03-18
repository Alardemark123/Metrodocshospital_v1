"use client";

import { motion, AnimatePresence } from "framer-motion";
import { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Clock,
  Share2,
  Facebook,
  X,
  ChevronLeft,
  ChevronRight,
  Images,
  User,
  ArrowRight,
  Newspaper,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getNewsBySlug, getNews } from "@/lib/mock-api";
import { Breadcrumb } from "@/components/breadcrumb";
import { slugify } from "@/lib/mock-api"; // Ensure you have slugify or similar

export default function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const article = getNewsBySlug(slug);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!article) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-foreground">
            Article Not Found
          </h1>
          <Button asChild>
            <Link href="/news">Back to News</Link>
          </Button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  const subImages: string[] = Array.isArray(article.subImages)
    ? article.subImages
    : [];

  const relatedArticles = getNews()
    .filter((a) => a.category === article.category && a.slug !== article.slug)
    .slice(0, 5); // Increased slice to show more in sidebar

  return (
    <>
      <div className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-10">
          {/* Breadcrumb - Full Width */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "News & Events", href: "/news" },
                {
                  label: (
                    <span className="block truncate max-w-[200px]">
                      {article.title}
                    </span>
                  ),
                },
              ]}
            />
          </motion.div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* ── MAIN CONTENT (Left Side) ── */}
            <main className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Meta & Title */}
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(article.date)}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    {article.readTime}
                  </span>
                </div>

                <h1 className="mb-6 text-balance text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
                  {article.title}
                </h1>

                <div className="mb-8 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <User className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {article.author}
                  </span>
                </div>

                {/* Featured Image */}
                {article.image && (
                  <div className="mb-10 overflow-hidden rounded-2xl border border-border shadow-sm">
                    <div className="relative aspect-[16/9]">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>
                )}

                {/* Article Content */}
                <article
                  className="prose prose-base max-w-none prose-p:text-muted-foreground prose-p:leading-[1.8] prose-headings:text-foreground"
                  dangerouslySetInnerHTML={{ __html: article.content ?? "" }}
                />

                {/* Photo Gallery Grid */}
                {subImages.length > 0 && (
                  <div className="mt-12">
                    <div className="mb-4 flex items-center gap-2 border-b border-border pb-2">
                      <Images className="h-4 w-4 text-primary" />
                      <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">
                        Photo Gallery
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {subImages.map((src, i) => (
                        <button
                          key={i}
                          onClick={() => setLightboxIndex(i)}
                          className="group relative aspect-square overflow-hidden rounded-xl bg-secondary transition-all hover:ring-2 hover:ring-primary/50"
                        >
                          <Image
                            src={src}
                            alt="Gallery"
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {/* Bottom share */}
                <div className="mt-8 flex items-center gap-3 border-t border-border pt-8">
                  <Share2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Share this article:
                  </span>
                  <div className="flex gap-2">
                    <Link
                      href="https://www.facebook.com/metrorizaldoctors"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-foreground transition-all hover:bg-[#5CA51B] hover:text-white hover:shadow-lg hover:shadow-[#5CA51B]/20"
                    >
                      <Facebook className="h-4.5 w-4.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </main>

            {/* ── SIDEBAR (Right Side) ── */}
            <aside className="lg:col-span-4">
              <div className="sticky top-32 space-y-10">
                {/* Related Posts Widget */}
                <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <div className="mb-6 flex items-center gap-2 border-b border-border pb-3">
                    <Newspaper className="h-4 w-4 text-primary" />
                    <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">
                      Related in {article.category}
                    </h3>
                  </div>

                  <div className="space-y-6">
                    {relatedArticles.length > 0 ? (
                      relatedArticles.map((rel) => (
                        <Link
                          key={rel.id}
                          href={`/news/${rel.slug}`}
                          className="group block"
                        >
                          <div className="flex gap-4">
                            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
                              <Image
                                src={rel.image || ""}
                                alt=""
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <h4 className="line-clamp-2 text-sm font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                                {rel.title}
                              </h4>
                              <span className="text-[11px] text-muted-foreground">
                                {formatDate(rel.date)}
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <p className="text-xs text-muted-foreground italic">
                        No other related updates.
                      </p>
                    )}
                  </div>

                  <Button
                    variant="outline"
                    className="mt-6 w-full gap-2 text-xs font-bold uppercase tracking-wider"
                    asChild
                  >
                    <Link href="/news">
                      View All News <ArrowRight className="h-3 w-3" />
                    </Link>
                  </Button>
                </section>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* Lightbox remains the same... */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          /* Lightbox code provided previously */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 backdrop-blur-sm"
            onClick={() => setLightboxIndex(null)}
          >
            <button className="absolute right-4 top-4 text-white">
              <X />
            </button>
            <motion.div
              className="relative aspect-[4/3] w-full max-w-4xl px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={subImages[lightboxIndex]}
                alt="Gallery"
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
