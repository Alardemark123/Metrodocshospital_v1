import type { Metadata } from "next"
import { getNewsBySlug } from "@/lib/mock-api"

type Props = {
  params: Promise<{ slug: string }>
  children: React.ReactNode
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getNewsBySlug(slug)
  if (!article) {
    return { title: "Article Not Found" }
  }
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
    },
  }
}

export default function NewsArticleLayout({ children }: { children: React.ReactNode }) {
  return children
}
