import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BlogDetailPage } from "@/components/blogs/blog-detail-page"
import { fetchBlogById } from "@/lib/api"

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const response = await fetchBlogById(id)

  if (!response.data) {
    return { title: "Article Not Found - MUCISIT" }
  }

  const blog = response.data
  const publishDate = blog.publishedAt || blog.createdAt

  const authorName = blog.author
    ? typeof blog.author === "string"
      ? blog.author
      : blog.author.name
    : undefined

  return {
    title: `${blog.title} - MUCISIT Blog`,
    description: blog.excerpt || blog.description || "Read expert insights on MUCISIT blog.",
    keywords: blog.tags || ["education", "learning", "MUCISIT"],
    authors: authorName ? [{ name: authorName }] : [],
    openGraph: {
      title: blog.title,
      description: blog.excerpt || blog.description,
      type: "article",
      publishedTime: publishDate,
      tags: blog.tags || [],
      images: blog.image ? [{ url: blog.image }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt || blog.description,
      images: blog.image ? [blog.image] : [],
    },
  }
}

export default async function BlogDetailRoute({ params }: Props) {
  const { id } = await params
  const response = await fetchBlogById(id)

  if (!response.data) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <BlogDetailPage blog={response.data} id={id} />
      </main>
      <Footer />
    </div>
  )
}
