"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  ArrowRight,
  Search,
  Newspaper,
  X,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getNews, getNewsCategories } from "@/lib/mock-api";
import type { NewsArticle } from "@/lib/mock-api";
import Image from "next/image";

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

/* ── Featured Card ── */
function FeaturedCard({ article }: { article: NewsArticle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mb-10"
    >
      <p className="mb-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
        Featured Article
      </p>
      <Link href={`/news/${article.slug}`} className="group block">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-xl">
          <div className="grid lg:grid-cols-[1fr_420px]">
            {/* Image */}
            <div className="relative aspect-[16/9] overflow-hidden lg:aspect-auto lg:min-h-[420px]">
              <Image
                src={article.image || "/placeholder-news.jpg"}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Category badge */}
              <div className="absolute left-4 top-4 flex items-center gap-2">
                <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow">
                  {article.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center gap-5 border-l border-border p-8 lg:p-10">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-primary" />
                  {formatDate(article.date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-primary" />
                  {article.readTime}
                </span>
              </div>

              <h2 className="text-2xl font-bold leading-snug text-foreground transition-colors group-hover:text-primary lg:text-3xl">
                {article.title}
              </h2>

              <p className="text-sm leading-relaxed text-muted-foreground line-clamp-4">
                {article.excerpt}
              </p>

              <div className="flex items-center justify-between border-t border-border pt-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <User className="h-3.5 w-3.5" />
                  {article.author}
                </div>
                <span className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-all group-hover:bg-primary/90">
                  Read Article
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ── Grid Card ── */
function GridCard({ article, index }: { article: NewsArticle; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.45,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="h-full"
    >
      <Link href={`/news/${article.slug}`} className="group block h-full">
        <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md">
          {/* Image */}
          <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
            <Image
              src={article.image || "/placeholder-news.jpg"}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Category */}
            <div className="absolute left-3 top-3">
              <span className="rounded-full bg-primary/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground backdrop-blur-sm">
                {article.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col p-4">
            {/* Meta */}
            <div className="mb-2.5 flex items-center gap-3 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDate(article.date)}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {article.readTime}
              </span>
            </div>

            {/* Title */}
            <h3 className="mb-2 font-bold leading-snug text-foreground transition-colors group-hover:text-primary line-clamp-2">
              {article.title}
            </h3>

            {/* Excerpt */}
            <p className="mb-4 flex-1 text-xs leading-relaxed text-muted-foreground line-clamp-3">
              {article.excerpt}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-border pt-3">
              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <User className="h-3 w-3" />
                <span className="line-clamp-1">{article.author}</span>
              </div>
              <span className="inline-flex items-center gap-1 rounded-lg border border-border bg-secondary px-2.5 py-1 text-[11px] font-semibold text-foreground transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                Read More
                <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ── Page ── */
export default function NewsPage() {
  const news = getNews();
  const categories = getNewsCategories();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const isFiltered = selectedCategory !== "All" || searchQuery !== "";

  const filteredNews = news.filter((article) => {
    const matchesCategory =
      selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = filteredNews.find((a) => a.featured);
  const otherArticles = filteredNews.filter((a) => !a.featured);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-background to-accent py-20 lg:py-28">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-accent/30 blur-2xl" />
        <div className="relative mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5">
              <Newspaper className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                News & Events
              </span>
            </div>
            <h1 className="mb-3 text-balance text-4xl font-bold text-foreground md:text-5xl">
              Latest Updates
            </h1>
            <p className="text-pretty text-base text-muted-foreground md:text-lg">
              Stay informed about hospital news, upcoming events, health tips,
              and community activities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Filter Bar — merged into a single floating pill ── */}
      <section className="relative z-40 -mt-7 mb-2">
        <div className="mx-auto max-w-4xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-3 overflow-hidden rounded-2xl border border-border bg-card/95 shadow-lg backdrop-blur-md sm:flex-row sm:items-center"
          >
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent py-4 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>

            {/* Divider */}
            <div className="hidden h-8 w-px bg-border sm:block" />

            {/* Category pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto px-3 pb-3 sm:pb-0 sm:pr-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}
                >
                  {category}
                </button>
              ))}
              {isFiltered && (
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchQuery("");
                  }}
                  className="ml-1 shrink-0 rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Articles ── */}
      <section className="bg-background py-12">
        <div className="mx-auto max-w-7xl px-4">
          {/* Results info */}
          <AnimatePresence>
            {isFiltered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 flex items-center justify-between"
              >
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    {filteredNews.length}
                  </span>{" "}
                  article{filteredNews.length !== 1 ? "s" : ""} found
                  {selectedCategory !== "All" && (
                    <span className="ml-1 text-primary">
                      · {selectedCategory}
                    </span>
                  )}
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchQuery("");
                  }}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"
                >
                  <X className="h-3.5 w-3.5" /> Clear
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {filteredNews.length > 0 ? (
            <>
              {featuredArticle && <FeaturedCard article={featuredArticle} />}
              {otherArticles.length > 0 && (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {otherArticles.map((article, index) => (
                    <GridCard
                      key={article.id}
                      article={article}
                      index={index}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-24 text-center"
            >
              <div className="mb-4 rounded-full bg-secondary p-4">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="mb-1 font-semibold text-foreground">
                No articles found
              </p>
              <p className="mb-5 text-sm text-muted-foreground">
                Try adjusting your search or filters.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Newsletter CTA ── */}
      <section className="relative overflow-hidden bg-primary py-16">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)",
            backgroundSize: "16px 16px",
          }}
        />
        <div className="pointer-events-none absolute -left-16 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full border border-primary-foreground/10" />
        <div className="relative mx-auto max-w-2xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-3 text-2xl font-bold text-primary-foreground md:text-3xl">
              Stay Updated with Our Newsletter
            </h2>
            <p className="mb-7 text-sm text-primary-foreground/80">
              Subscribe to receive the latest news, health tips, and event
              announcements directly in your inbox.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-2.5 text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:border-primary-foreground/40 focus:outline-none sm:w-72"
              />
              <Button variant="secondary" type="submit" className="gap-2">
                Subscribe
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
