"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Share2, Calendar, User, Clock, Tag, Eye, Check } from "lucide-react"

interface Blog {
  _id: string
  title: string
  excerpt?: string
  description?: string
  sections?: Array<{ text: string; imageUrl?: string; _id: string }>
  content?: string
  author?: {
    _id: string
    email: string
    name: string
  } | string
  publishedAt?: string
  createdAt?: string
  seoKeywords?: string[]
  readTimeMinutes?: number
  fileUrl?: string
}

interface BlogDetailPageProps {
  blog: Blog
  id: string
}

export function BlogDetailPage({ blog, id }: BlogDetailPageProps) {
  const [showPreview, setShowPreview] = useState(false)
  const [shareMessage, setShareMessage] = useState("")
  const publishDate = blog.publishedAt || blog.createdAt
  const formattedDate = publishDate
    ? new Date(publishDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null

  // Improved share functionality
  const handleShare = async () => {
    const shareData = {
      title: blog.title,
      text: blog.excerpt || blog.description || blog.title,
      url: window.location.href,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        console.error("Share failed:", err)
      }
    } else {
      await navigator.clipboard.writeText(shareData.url)
      setShareMessage("Link copied!")
      setTimeout(() => setShareMessage(""), 3000)
    }
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <Link href="/blogs" className="inline-block mb-6">
        <Button variant="ghost" className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Button>
      </Link>

      <article className="prose prose-sm max-w-none">
        {/* Hero Image */}
        {blog.fileUrl && (
          <div className="relative w-full h-96 bg-muted rounded-lg overflow-hidden mb-8">
            <img src={blog.fileUrl || "/placeholder.svg"} alt={blog.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Header */}
        <header className="mb-8 pb-8 border-b border-border">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">{blog.title}</h1>

          {/* Meta Information */}
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-6">
            {blog.author && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="font-semibold text-foreground">
                  {typeof blog.author === "string" ? blog.author : blog.author.name}
                </span>
              </div>
            )}
            {formattedDate && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formattedDate}</span>
              </div>
            )}
            {blog.readTimeMinutes && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{blog.readTimeMinutes} min read</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {blog.seoKeywords && blog.seoKeywords.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {blog.seoKeywords.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full flex items-center gap-1"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {blog.excerpt && <p className="text-lg text-muted-foreground italic mb-6">{blog.excerpt}</p>}

          <div className="flex gap-2 flex-wrap">
            {blog.sections && blog.sections.length > 0 && (
              <Button onClick={() => setShowPreview(true)} variant="outline" className="gap-2">
                <Eye className="w-4 h-4" />
                Preview Article
              </Button>
            )}
            <Button onClick={handleShare} variant="outline" className="gap-2 bg-transparent">
              {shareMessage ? (
                <>
                  <Check className="w-4 h-4" />
                  {shareMessage}
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  Share Article
                </>
              )}
            </Button>
          </div>
        </header>

        {/* Preview Modal for blog article */}
        {showPreview && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="max-w-2xl w-full max-h-96 overflow-y-auto">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle>Article Preview</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowPreview(false)} className="text-lg">
                  ✕
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {blog.sections &&
                    blog.sections.map((section) => (
                      <div key={section._id} className="text-sm text-foreground leading-relaxed">
                        <p className="line-clamp-3">{section.text}</p>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Content */}
        {blog.sections && blog.sections.length > 0 && (
          <div className="whitespace-pre-wrap text-foreground leading-relaxed mb-12">
            {blog.sections.map((section, idx) => (
              <div key={section._id} className="mb-6">
                {section.imageUrl && (
                  <img
                    src={section.imageUrl || "/placeholder.svg"}
                    alt={`Section ${idx + 1}`}
                    className="w-full rounded-lg mb-4 max-h-96 object-cover"
                  />
                )}
                <p>{section.text}</p>
              </div>
            ))}
          </div>
        )}
        {blog.content && (
          <div className="whitespace-pre-wrap text-foreground leading-relaxed mb-12">{blog.content}</div>
        )}

        {/* Related Resources */}
        <section className="border-t border-border pt-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Related Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/blogs">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                More Articles
              </Button>
            </Link>
            <Link href="/notes">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                Study Notes
              </Button>
            </Link>
            <Link href="/assignments">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                Practice Assignments
              </Button>
            </Link>
          </div>
        </section>
      </article>
    </div>
  )
}
