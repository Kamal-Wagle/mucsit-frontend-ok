"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Download, Share2, FileText, Eye, Check } from "lucide-react"

interface OldQuestion {
  _id: string
  title: string
  description?: string
  question?: string
  answer?: string
  content?: string
  year?: number
  subject?: string
  semester?: string
  difficulty?: "easy" | "medium" | "hard"
  fileUrl?: string
  solutions?: string
}

interface OldQuestionDetailPageProps {
  question: OldQuestion
  id: string
}

export function OldQuestionDetailPage({ question, id }: OldQuestionDetailPageProps) {
  const [showPreview, setShowPreview] = useState(false)
  const [shareMessage, setShareMessage] = useState("")

  const handleShare = async () => {
    const shareData = {
      title: question.title,
      text: `Check out this past paper: ${question.title}`,
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
      <Link href="/old-questions" className="inline-block mb-6">
        <Button variant="ghost" className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Past Papers
        </Button>
      </Link>

      <article>
        <header className="mb-8 pb-8 border-b border-border">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">{question.title}</h1>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {question.year && (
              <Card>
                <CardContent className="pt-4">
                  <p className="text-xs text-muted-foreground font-semibold">Year</p>
                  <p className="text-lg font-bold text-foreground">{question.year}</p>
                </CardContent>
              </Card>
            )}
            {question.subject && (
              <Card>
                <CardContent className="pt-4">
                  <p className="text-xs text-muted-foreground font-semibold">Subject</p>
                  <p className="text-sm font-bold text-foreground line-clamp-2">{question.subject}</p>
                </CardContent>
              </Card>
            )}
            {question.semester && (
              <Card>
                <CardContent className="pt-4">
                  <p className="text-xs text-muted-foreground font-semibold">Semester</p>
                  <p className="text-lg font-bold text-foreground">{question.semester}</p>
                </CardContent>
              </Card>
            )}
            {question.difficulty && (
              <Card>
                <CardContent className="pt-4">
                  <p className="text-xs text-muted-foreground font-semibold">Difficulty</p>
                  <p className="text-sm font-bold text-foreground">{question.difficulty}</p>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="flex gap-2 flex-wrap">
            {question.fileUrl && (
              <a href={question.fileUrl} target="_blank" rel="noopener noreferrer">
                <Button className="gap-2">
                  <Download className="w-4 h-4" />
                  Download PDF
                </Button>
              </a>
            )}
            {question.content && (
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
                <CardTitle>Question Preview</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowPreview(false)} className="text-lg">
                  ✕
                </Button>
              </CardHeader>
              <CardContent>
                <div className="whitespace-pre-wrap text-foreground text-sm leading-relaxed">{question.content}</div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="space-y-8 mb-12">
          {question.content && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Question Paper
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="whitespace-pre-wrap text-foreground line-clamp-6">{question.content}</div>
              </CardContent>
            </Card>
          )}

          {question.solutions && (
            <Card>
              <CardHeader>
                <CardTitle>Sample Solutions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="whitespace-pre-wrap text-foreground">{question.solutions}</div>
              </CardContent>
            </Card>
          )}
        </div>

        <section className="border-t border-border pt-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Related Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/old-questions">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                More Past Papers
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
