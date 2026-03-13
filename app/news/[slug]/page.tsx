"use client";

import { motion, AnimatePresence } from "framer-motion";
import { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  X,
  ChevronLeft,
  ChevronRight,
  Images,
  User,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getNewsBySlug, getNews } from "@/lib/mock-api";
import { Breadcrumb } from "@/components/breadcrumb";

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

  const goPrev = () =>
    setLightboxIndex((i) =>
      i !== null ? (i - 1 + subImages.length) % subImages.length : null,
    );
  const goNext = () =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % subImages.length : null));

  const relatedArticles = getNews()
    .filter((a) => a.category === article.category && a.slug !== article.slug)
    .slice(0, 3);

  return (
    <>
      <div className="bg-background">
        <div className="mx-auto max-w-3xl px-4 py-10">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "News & Events", href: "/news" },
                {
                  label: (
                    <span className="block truncate max-w-[180px] xs:max-w-[180px] sm:max-w-none">
                      {article.title || "News & Events"}
                    </span>
                  ),
                },
              ]}
            />
          </motion.div>

          {/* Meta row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 flex flex-wrap items-center gap-3"
          >
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
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mb-6 text-balance text-3xl font-bold text-foreground md:text-4xl"
          >
            {article.title}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8 flex w-fit items-center gap-4"
          >
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#5CA51B]/10">
                <User className="h-5.5 w-5.5 text-[#5CA51B]" strokeWidth={2} />
              </div>

              <div className="flex flex-col">
                <p className="text-[16px]  leading-tight text-[#0a2e1a]">
                  {article.author}
                </p>
              </div>
            </div>
          </motion.div>
          {/* Featured image */}
          {article.image && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="mb-10 overflow-hidden rounded-2xl border border-border shadow-sm"
            >
              <div className="relative aspect-[16/9]">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          )}

          {/* Article content */}
          {/* Article content */}
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="
              prose prose-base max-w-none

              /* Paragraphs */
              prose-p:text-muted-foreground
              prose-p:leading-[1.9]
              prose-p:tracking-[0.01em]
              prose-p:text-[15px]
              [&>p+p]:mt-5

            "
            dangerouslySetInnerHTML={{ __html: article.content ?? "" }}
          />

          {/* ── Photo Gallery ── */}
          {subImages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-12"
            >
              <div className="mb-4 flex items-center gap-2">
                <Images className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                  Photo Gallery
                </h3>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                  {subImages.length}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {subImages.map((src, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    onClick={() => setLightboxIndex(i)}
                    className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-secondary"
                  >
                    <Image
                      src={src}
                      alt={`Gallery image ${i + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/20" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Tags */}
          <div className="mt-10 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Tags
            </span>
            {[article.category].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-secondary px-3 py-1 text-xs text-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

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
        </div>
      </div>

      {/* ── Related Articles ── */}
      {relatedArticles.length > 0 && (
        <section className="border-t border-border bg-secondary/30 py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-foreground">
                Related Articles
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                More updates from Metro Docs Hospital
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {relatedArticles.map((rel, i) => (
                <motion.div
                  key={rel.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={`/news/${rel.slug}`}
                    className="group block h-full"
                  >
                    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md">
                      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-primary/10 to-accent">
                        {rel.image && (
                          <Image
                            src={rel.image}
                            alt={rel.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        )}
                        <div className="absolute left-3 top-3">
                          <span className="rounded-full bg-primary/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                            {rel.category}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col p-4">
                        <h3 className="mb-2 font-bold leading-snug text-foreground transition-colors group-hover:text-primary line-clamp-2">
                          {rel.title}
                        </h3>
                        <p className="mb-4 flex-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                          {rel.excerpt}
                        </p>
                        <div className="flex items-center justify-between border-t border-border pt-3">
                          <span className="text-[11px] text-muted-foreground">
                            {rel.readTime}
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-lg border border-border bg-secondary px-2.5 py-1 text-[11px] font-semibold text-foreground transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                            Read More <ArrowRight className="h-3 w-3" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 backdrop-blur-sm"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-card/20 text-white backdrop-blur-sm hover:bg-card/40"
              onClick={() => setLightboxIndex(null)}
            >
              <X className="h-5 w-5" />
            </button>
            <div className="absolute left-1/2 top-4 -translate-x-1/2 rounded-full bg-card/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              {lightboxIndex + 1} / {subImages.length}
            </div>
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative mx-16 aspect-[4/3] w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={subImages[lightboxIndex]}
                alt={`Gallery image ${lightboxIndex + 1}`}
                fill
                className="rounded-xl object-contain"
              />
            </motion.div>
            {subImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goPrev();
                  }}
                  className="absolute left-4 flex h-10 w-10 items-center justify-center rounded-full bg-card/20 text-white backdrop-blur-sm hover:bg-card/40"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goNext();
                  }}
                  className="absolute right-4 flex h-10 w-10 items-center justify-center rounded-full bg-card/20 text-white backdrop-blur-sm hover:bg-card/40"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 overflow-x-auto px-4">
                  {subImages.map((src, i) => (
                    <button
                      key={i}
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxIndex(i);
                      }}
                      className={`relative h-12 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${i === lightboxIndex ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"}`}
                    >
                      <Image src={src} alt="" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
