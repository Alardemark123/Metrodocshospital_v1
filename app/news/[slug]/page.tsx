"use client"

import { motion } from "framer-motion"
import { use } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Share2, Facebook, Twitter, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"

const news = [
  {
    id: 1,
    slug: "new-cardiac-wing-opening",
    title: "ModernCare Opens State-of-the-Art Cardiac Wing",
    excerpt: "Our new cardiac care facility features the latest technology in heart health.",
    content: `
      <p>ModernCare Hospital is proud to announce the grand opening of our new state-of-the-art Cardiac Care Wing, a significant milestone in our commitment to providing exceptional cardiovascular care to our community.</p>
      
      <h2>World-Class Facilities</h2>
      <p>The new wing spans over 50,000 square feet and features the latest advancements in cardiac care technology. Key highlights include:</p>
      <ul>
        <li>Two advanced cardiac catheterization laboratories</li>
        <li>State-of-the-art cardiac imaging center</li>
        <li>Dedicated cardiac intensive care unit with 20 beds</li>
        <li>Modern patient rooms designed for comfort and recovery</li>
        <li>Advanced telemetry monitoring systems</li>
      </ul>
      
      <h2>Expert Team</h2>
      <p>Our cardiac care team has expanded to include some of the region's most experienced cardiologists, cardiac surgeons, and specialized nursing staff. Led by Dr. Sarah Chen, our team is committed to providing personalized, comprehensive care for patients with all types of heart conditions.</p>
      
      <h2>Community Impact</h2>
      <p>This expansion will allow us to serve an additional 5,000 cardiac patients annually, reducing wait times and ensuring more community members have access to life-saving cardiac care close to home.</p>
      
      <p>We invite the community to join us for our open house event on March 15th, where you can tour the new facilities and meet our cardiac care team.</p>
    `,
    category: "Hospital News",
    date: "2026-03-08",
    readTime: "4 min read",
    author: "ModernCare Communications",
  },
  {
    id: 2,
    slug: "community-health-fair",
    title: "Annual Community Health Fair This Weekend",
    excerpt: "Join us for free health screenings, wellness workshops, and family activities.",
    content: `
      <p>ModernCare Hospital invites the entire community to our Annual Health Fair this weekend! This free event offers valuable health resources, screenings, and fun activities for the whole family.</p>
      
      <h2>Event Details</h2>
      <p>Date: Saturday, March 10th & Sunday, March 11th<br>
      Time: 10:00 AM - 4:00 PM<br>
      Location: ModernCare Hospital Main Campus</p>
      
      <h2>Free Health Screenings</h2>
      <ul>
        <li>Blood pressure checks</li>
        <li>Blood glucose testing</li>
        <li>BMI assessments</li>
        <li>Vision and hearing tests</li>
        <li>Skin cancer screenings</li>
      </ul>
      
      <h2>Wellness Workshops</h2>
      <p>Throughout the weekend, our healthcare professionals will be hosting informative workshops on:</p>
      <ul>
        <li>Healthy eating on a budget</li>
        <li>Managing stress and anxiety</li>
        <li>Exercise for all ages</li>
        <li>Heart health basics</li>
        <li>Diabetes prevention</li>
      </ul>
      
      <h2>Family Activities</h2>
      <p>Kids will love our dedicated children's area featuring face painting, a teddy bear clinic, and interactive health games. Don't miss the opportunity to meet our therapy dogs!</p>
      
      <p>No registration required. All are welcome!</p>
    `,
    category: "Events",
    date: "2026-03-05",
    readTime: "2 min read",
    author: "Events Team",
  },
  {
    id: 3,
    slug: "dr-chen-award",
    title: "Dr. Sarah Chen Receives Excellence in Cardiology Award",
    excerpt: "Our chief cardiologist has been recognized for her outstanding contributions.",
    content: `
      <p>We are thrilled to announce that Dr. Sarah Chen, Chief of Cardiology at ModernCare Hospital, has been awarded the prestigious Excellence in Cardiology Award by the American Heart Association.</p>
      
      <h2>A Well-Deserved Recognition</h2>
      <p>This award recognizes Dr. Chen's exceptional contributions to cardiovascular research and patient care over her 15-year career. Her pioneering work in interventional cardiology has improved outcomes for thousands of patients.</p>
      
      <h2>Research Contributions</h2>
      <p>Dr. Chen has published over 50 peer-reviewed research papers and has been instrumental in developing new techniques for minimally invasive cardiac procedures. Her research on heart failure management has been adopted by hospitals nationwide.</p>
      
      <h2>Patient-Centered Care</h2>
      <p>"This award belongs to our entire cardiac team," said Dr. Chen upon receiving the honor. "Every day, I'm inspired by my colleagues' dedication to our patients. Together, we're making a difference in people's lives."</p>
      
      <p>Please join us in congratulating Dr. Chen on this remarkable achievement!</p>
    `,
    category: "Awards",
    date: "2026-03-01",
    readTime: "3 min read",
    author: "ModernCare Communications",
  },
  {
    id: 4,
    slug: "new-pediatric-program",
    title: "Launching New Pediatric Development Program",
    excerpt: "ModernCare is proud to announce a comprehensive pediatric development program.",
    content: `
      <p>ModernCare Hospital is excited to launch our new comprehensive Pediatric Development Program, designed to support children with developmental delays and their families through early intervention services.</p>
      
      <h2>Program Overview</h2>
      <p>Our multidisciplinary team of pediatric specialists will provide comprehensive evaluations and personalized treatment plans for children from birth to age 5. The program addresses developmental concerns in areas including:</p>
      <ul>
        <li>Speech and language development</li>
        <li>Motor skills development</li>
        <li>Social and emotional development</li>
        <li>Cognitive development</li>
        <li>Adaptive behavior skills</li>
      </ul>
      
      <h2>Expert Team</h2>
      <p>The program brings together developmental pediatricians, speech-language pathologists, occupational therapists, physical therapists, and child psychologists to provide coordinated care.</p>
      
      <p>For more information or to schedule a consultation, please contact our Pediatric Development Center at (555) 123-4567.</p>
    `,
    category: "Hospital News",
    date: "2026-02-25",
    readTime: "5 min read",
    author: "Pediatrics Department",
  },
  {
    id: 5,
    slug: "flu-season-tips",
    title: "Staying Healthy During Flu Season: Expert Tips",
    excerpt: "Our infectious disease specialists share their top recommendations.",
    content: `
      <p>With flu season in full swing, our infectious disease specialists want to share important tips to help you and your family stay healthy.</p>
      
      <h2>Get Vaccinated</h2>
      <p>The flu vaccine remains the most effective way to protect yourself and others. It's not too late to get vaccinated! ModernCare offers flu shots at all our locations, no appointment necessary.</p>
      
      <h2>Practice Good Hygiene</h2>
      <ul>
        <li>Wash your hands frequently with soap and water for at least 20 seconds</li>
        <li>Avoid touching your face, especially your eyes, nose, and mouth</li>
        <li>Cover coughs and sneezes with a tissue or your elbow</li>
        <li>Stay home when you're sick</li>
      </ul>
      
      <h2>Boost Your Immune System</h2>
      <ul>
        <li>Get adequate sleep (7-9 hours for adults)</li>
        <li>Eat a balanced diet rich in fruits and vegetables</li>
        <li>Exercise regularly</li>
        <li>Manage stress through relaxation techniques</li>
      </ul>
      
      <p>If you develop flu symptoms, contact your healthcare provider promptly. Antiviral medications work best when started within 48 hours of symptom onset.</p>
    `,
    category: "Health Tips",
    date: "2026-02-20",
    readTime: "4 min read",
    author: "Dr. Jennifer Lee",
  },
]

export default function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const article = news.find((a) => a.slug === slug)

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
  const relatedArticles = news
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
            dangerouslySetInnerHTML={{ __html: article.content }}
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
