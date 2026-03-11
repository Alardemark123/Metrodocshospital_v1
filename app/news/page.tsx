"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import Link from "next/link"
import { Calendar, Clock, ArrowRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

const news = [
  {
    id: 1,
    slug: "new-cardiac-wing-opening",
    title: "ModernCare Opens State-of-the-Art Cardiac Wing",
    excerpt: "Our new cardiac care facility features the latest technology in heart health, including advanced catheterization labs and cardiac imaging. This expansion will allow us to serve more patients with complex cardiovascular conditions.",
    content: "Full article content here...",
    category: "Hospital News",
    date: "2026-03-08",
    readTime: "4 min read",
    featured: true,
  },
  {
    id: 2,
    slug: "community-health-fair",
    title: "Annual Community Health Fair This Weekend",
    excerpt: "Join us for free health screenings, wellness workshops, and family activities at our annual community health fair. This year we're offering blood pressure checks, glucose testing, and BMI assessments.",
    content: "Full article content here...",
    category: "Events",
    date: "2026-03-05",
    readTime: "2 min read",
    featured: false,
  },
  {
    id: 3,
    slug: "dr-chen-award",
    title: "Dr. Sarah Chen Receives Excellence in Cardiology Award",
    excerpt: "Our chief cardiologist has been recognized for her outstanding contributions to cardiovascular research and patient care. Dr. Chen has been with ModernCare for over 10 years.",
    content: "Full article content here...",
    category: "Awards",
    date: "2026-03-01",
    readTime: "3 min read",
    featured: false,
  },
  {
    id: 4,
    slug: "new-pediatric-program",
    title: "Launching New Pediatric Development Program",
    excerpt: "ModernCare is proud to announce a comprehensive pediatric development program designed to support children with developmental delays and their families through early intervention services.",
    content: "Full article content here...",
    category: "Hospital News",
    date: "2026-02-25",
    readTime: "5 min read",
    featured: false,
  },
  {
    id: 5,
    slug: "flu-season-tips",
    title: "Staying Healthy During Flu Season: Expert Tips",
    excerpt: "Our infectious disease specialists share their top recommendations for staying healthy this flu season, from vaccination to hygiene practices and immune-boosting strategies.",
    content: "Full article content here...",
    category: "Health Tips",
    date: "2026-02-20",
    readTime: "4 min read",
    featured: false,
  },
  {
    id: 6,
    slug: "emergency-room-expansion",
    title: "Emergency Room Expansion Complete",
    excerpt: "Our emergency department expansion project is now complete, adding 12 new treatment bays and reducing average wait times by 40%. The new facilities include dedicated pediatric emergency rooms.",
    content: "Full article content here...",
    category: "Hospital News",
    date: "2026-02-15",
    readTime: "3 min read",
    featured: false,
  },
  {
    id: 7,
    slug: "volunteer-recognition",
    title: "Celebrating Our Hospital Volunteers",
    excerpt: "This National Volunteer Week, we honor the dedicated individuals who give their time to support our patients and staff. Our volunteers contribute over 10,000 hours annually to ModernCare.",
    content: "Full article content here...",
    category: "Community",
    date: "2026-02-10",
    readTime: "3 min read",
    featured: false,
  },
  {
    id: 8,
    slug: "mental-health-awareness",
    title: "Mental Health Awareness Month Activities",
    excerpt: "Join us throughout May for special events and workshops focused on mental health awareness. Topics include stress management, mindfulness, and when to seek professional help.",
    content: "Full article content here...",
    category: "Events",
    date: "2026-02-05",
    readTime: "2 min read",
    featured: false,
  },
]

const categories = ["All", "Hospital News", "Events", "Awards", "Health Tips", "Community"]

function NewsCard({ article, index, featured = false }: { article: typeof news[0]; index: number; featured?: boolean }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  if (featured) {
    return (
      <motion.article
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="lg:col-span-2"
      >
        <Link href={`/news/${article.slug}`} className="group block">
          <div className="overflow-hidden rounded-3xl bg-card shadow-sm transition-all hover:shadow-lg">
            <div className="grid lg:grid-cols-2">
              <div className="relative aspect-[16/10] bg-gradient-to-br from-primary/20 to-accent lg:aspect-auto lg:min-h-[400px]">
                <div className="absolute left-4 top-4">
                  <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    Featured
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-center p-8">
                <span className="mb-2 text-sm font-medium text-primary">{article.category}</span>
                <h2 className="mb-3 text-2xl font-bold text-card-foreground transition-colors group-hover:text-primary md:text-3xl">
                  {article.title}
                </h2>
                <p className="mb-4 text-muted-foreground">{article.excerpt}</p>
                <div className="mb-6 flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(article.date)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {article.readTime}
                  </div>
                </div>
                <div className="flex items-center gap-2 font-medium text-primary">
                  Read Article
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.article>
    )
  }

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link href={`/news/${article.slug}`} className="group block h-full">
        <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary hover:shadow-md">
          <div className="relative aspect-[16/10] bg-gradient-to-br from-primary/20 to-accent">
            <div className="absolute left-3 top-3">
              <span className="rounded-full bg-background/90 px-2 py-1 text-xs font-medium text-foreground">
                {article.category}
              </span>
            </div>
          </div>
          <div className="flex flex-1 flex-col p-5">
            <h3 className="mb-2 text-lg font-semibold text-card-foreground transition-colors group-hover:text-primary">
              {article.title}
            </h3>
            <p className="mb-4 flex-1 text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span>{formatDate(article.date)}</span>
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredNews = news.filter((article) => {
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredArticle = filteredNews.find((a) => a.featured)
  const otherArticles = filteredNews.filter((a) => !a.featured)

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-secondary via-background to-accent py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
              News & Events
            </span>
            <h1 className="mb-6 text-balance text-4xl font-bold text-foreground md:text-5xl">
              Latest Updates from ModernCare
            </h1>
            <p className="text-pretty text-lg text-muted-foreground">
              Stay informed about hospital news, upcoming events, health tips, and community activities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-[136px] z-40 border-b border-border bg-background/95 py-4 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Search */}
            <div className="relative flex-1 md:max-w-sm">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-input bg-background py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground hover:bg-accent"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-4">
          {filteredNews.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredArticle && <NewsCard article={featuredArticle} index={0} featured />}
              {otherArticles.map((article, index) => (
                <NewsCard key={article.id} article={article} index={index} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-lg text-muted-foreground">No articles found matching your criteria.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSelectedCategory("All")
                  setSearchQuery("")
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h2 className="mb-4 text-balance text-2xl font-bold text-foreground md:text-3xl">
            Stay Updated with Our Newsletter
          </h2>
          <p className="mb-8 text-muted-foreground">
            Subscribe to receive the latest news, health tips, and event announcements directly in your inbox.
          </p>
          <form className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="rounded-lg border border-input bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:w-80"
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </section>
    </>
  )
}
