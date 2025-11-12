"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Download, Share2, BookOpen, ExternalLink, Eye, Check } from "lucide-react"

interface Note {
  _id: string
  id?: string
  title: string
  description?: string
  content?: string
  subject?: string
  semester?: string
  seoKeywords?: string[]
  author?: {
    name: string
    email: string
  }
  fileUrl?: string
  imageUrl?: string
  createdAt?: string
  faculty?: string
}

interface NoteDetailPageProps {
  note: Note
  id: string
}

export function NoteDetailPage({ note, id }: NoteDetailPageProps) {
  const [showPreview, setShowPreview] = useState(false)
  const [shareMessage, setShareMessage] = useState("")

  const handleDownload = () => {
    if (note.fileUrl) {
      window.open(note.fileUrl, "_blank")
    }
  }

  const handleShare = async () => {
    const shareData = {
      title: note.title,
      text: `Check out this note: ${note.title} - ${note.description}`,
      url: window.location.href,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        console.error("Share failed:", err)
      }
    } else {
      // Fallback to copy to clipboard
      await navigator.clipboard.writeText(shareData.url)
      setShareMessage("Link copied to clipboard!")
      setTimeout(() => setShareMessage(""), 3000)
    }
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Back Button */}
      <Link href="/notes" className="inline-block mb-6">
        <Button variant="ghost" className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Notes
        </Button>
      </Link>

      {/* Note Header */}
      <article>
        <header className="mb-8 pb-8 border-b border-border">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 bg-blue-50 rounded-lg h-fit">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-2">{note.title}</h1>
              <p className="text-lg text-muted-foreground mb-4">{note.description}</p>

              {/* Meta Information */}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                {note.subject && (
                  <div>
                    <span className="font-semibold text-foreground">Subject:</span> {note.subject}
                  </div>
                )}
                {note.semester && (
                  <div>
                    <span className="font-semibold text-foreground">Semester:</span> {note.semester}
                  </div>
                )}
                {note.faculty && (
                  <div>
                    <span className="font-semibold text-foreground">Faculty:</span> {note.faculty}
                  </div>
                )}
                {note.author && (
                  <div>
                    <span className="font-semibold text-foreground">Author:</span> {note.author.name}
                  </div>
                )}
              </div>

              {/* Tags */}
              {note.seoKeywords && note.seoKeywords.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {note.seoKeywords.map((tag, idx) => (
                    <span key={idx} className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 flex-wrap">
            {note.fileUrl && (
              <Button onClick={handleDownload} className="gap-2">
                <Download className="w-4 h-4" />
                Download PDF
              </Button>
            )}
            {note.content && (
              <Button onClick={() => setShowPreview(true)} variant="outline" className="gap-2">
                <Eye className="w-4 h-4" />
                Preview
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
                  Share
                </>
              )}
            </Button>
          </div>
        </header>

        {showPreview && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="max-w-2xl w-full max-h-96 overflow-y-auto">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle>Content Preview</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowPreview(false)} className="text-lg">
                  ✕
                </Button>
              </CardHeader>
              <CardContent>
                <div className="whitespace-pre-wrap text-foreground text-sm leading-relaxed">{note.content}</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Content */}
        <div className="prose prose-sm max-w-none mb-12">
          <Card>
            <CardContent className="pt-6">
              {note.content ? (
                <div className="whitespace-pre-wrap text-foreground line-clamp-6">{note.content}</div>
              ) : (
                <p className="text-muted-foreground text-center py-12">
                  {note.fileUrl ? (
                    <div className="flex flex-col items-center gap-4">
                      <span>Content not available for preview.</span>
                      <Button onClick={handleDownload} className="gap-2">
                        <ExternalLink className="w-4 h-4" />
                        Download Full Document
                      </Button>
                    </div>
                  ) : (
                    "Content not available."
                  )}
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Related Notes */}
        <section className="border-t border-border pt-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Explore More</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/notes">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="text-lg">All Notes</CardTitle>
                  <CardDescription>Browse all study materials</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/assignments">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="text-lg">Assignments</CardTitle>
                  <CardDescription>Practice with assignments</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </section>
      </article>
    </div>
  )
}
