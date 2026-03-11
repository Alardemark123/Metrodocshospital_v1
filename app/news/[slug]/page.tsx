"use client"

import { motion } from "framer-motion"
import { use } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Share2, Facebook, Twitter, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getNewsBySlug, getNews } from "@/lib/mock-api"

export default function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const article = getNewsBySlug(slug)

  if (!article) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-foreground">Article Not Found</h1>
          <Button asChild>
            <Link href="/news">Back to News</Link>
          </Button>
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  // Get related articles (same category, excluding current)
  const relatedArticles = getNews()
    .filter((a) => a.category === article.category && a.slug !== article.slug)
    .slice(0, 3)

  return (
    <>
      {/* Article Header */}
      <section className="relative bg-gradient-to-br from-secondary via-background to-accent py-12 lg:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <Link
            href="/news"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to News
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              {article.category}
            </span>
            <h1 className="mb-6 text-balance text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(article.date)}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {article.readTime}
              </div>
              <span>By {article.author}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="bg-background">
        <div className="mx-auto max-w-5xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="aspect-[21/9] -mt-8 overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 to-accent shadow-xl"
          />
        </div>
      </section>

      {/* Article Content */}
      <section className="bg-background py-12 lg:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground"
            dangerouslySetInnerHTML={{ __html: article.content ?? "" }}
          />

          {/* Share */}
          <div className="mt-12 flex items-center justify-between border-t border-border pt-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Share2 className="h-5 w-5" />
              Share this article:
            </div>
            <div className="flex gap-2">
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-foreground transition-colors hover:bg-primary hover:text-primary-foreground">
                <Facebook className="h-5 w-5" />
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-foreground transition-colors hover:bg-primary hover:text-primary-foreground">
                <Twitter className="h-5 w-5" />
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-foreground transition-colors hover:bg-primary hover:text-primary-foreground">
                <Linkedin className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="bg-secondary py-16">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="mb-8 text-2xl font-bold text-foreground">Related Articles</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedArticles.map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  href={`/news/${relatedArticle.slug}`}
                  className="group block"
                >
                  <article className="overflow-hidden rounded-2xl bg-card shadow-sm transition-all hover:shadow-md">
                    <div className="aspect-[16/10] bg-gradient-to-br from-primary/20 to-accent" />
                    <div className="p-5">
                      <span className="text-xs font-medium text-primary">{relatedArticle.category}</span>
                      <h3 className="mt-1 font-semibold text-card-foreground transition-colors group-hover:text-primary">
                        {relatedArticle.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">{formatDate(relatedArticle.date)}</p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
