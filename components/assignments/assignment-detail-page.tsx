"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Download, Share2, AlertCircle, CheckCircle, Eye, Check } from "lucide-react"

interface Assignment {
  _id: string
  title: string
  description?: string
  instructions?: string
  content?: string
  dueDate?: string
  difficulty?: "easy" | "medium" | "hard"
  semester?: string
  totalMarks?: number
  fileUrl?: string
  solutions?: string
}

interface AssignmentDetailPageProps {
  assignment: Assignment
  id: string
}

export function AssignmentDetailPage({ assignment, id }: AssignmentDetailPageProps) {
  const [showPreview, setShowPreview] = useState(false)
  const [shareMessage, setShareMessage] = useState("")
  const isOverdue = assignment.dueDate && new Date(assignment.dueDate) < new Date()
  const daysUntilDeadline = assignment.dueDate
    ? Math.ceil((new Date(assignment.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null

  const handleShare = async () => {
    const shareData = {
      title: assignment.title,
      text: `Check out this assignment: ${assignment.title}`,
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
      <Link href="/assignments" className="inline-block mb-6">
        <Button variant="ghost" className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Assignments
        </Button>
      </Link>

      <article>
        <header className="mb-8 pb-8 border-b border-border">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">{assignment.title}</h1>
          <p className="text-lg text-muted-foreground mb-6">{assignment.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {assignment.dueDate && (
              <Card className={isOverdue ? "border-destructive" : "border-border"}>
                <CardContent className="pt-4 flex items-center gap-3">
                  {isOverdue ? (
                    <>
                      <AlertCircle className="w-5 h-5 text-destructive" />
                      <div>
                        <p className="text-sm font-semibold text-destructive">Overdue</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(assignment.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          Due in {daysUntilDeadline} day{daysUntilDeadline !== 1 ? "s" : ""}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(assignment.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            )}

            {assignment.difficulty && (
              <Card>
                <CardContent className="pt-4">
                  <p className="text-sm font-semibold text-foreground mb-2">Difficulty</p>
                  <span
                    className={`text-sm font-semibold px-3 py-1 rounded-full inline-block ${
                      assignment.difficulty === "easy"
                        ? "bg-green-100 text-green-700"
                        : assignment.difficulty === "medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {assignment.difficulty.charAt(0).toUpperCase() + assignment.difficulty.slice(1)}
                  </span>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="flex gap-2 flex-wrap">
            {assignment.fileUrl ? (
              <a href={assignment.fileUrl} target="_blank" rel="noopener noreferrer">
                <Button className="gap-2">
                  <Download className="w-4 h-4" />
                  Download Assignment
                </Button>
              </a>
            ) : (
              <Button className="gap-2" disabled>
                <Download className="w-4 h-4" />
                Download Assignment
              </Button>
            )}
            {assignment.content && (
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
                <CardTitle>Assignment Preview</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowPreview(false)} className="text-lg">
                  ✕
                </Button>
              </CardHeader>
              <CardContent>
                <div className="whitespace-pre-wrap text-foreground text-sm leading-relaxed">{assignment.content}</div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="space-y-8 mb-12">
          {assignment.content && (
            <Card>
              <CardHeader>
                <CardTitle>Assignment Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="whitespace-pre-wrap text-foreground line-clamp-6">{assignment.content}</div>
              </CardContent>
            </Card>
          )}

          {assignment.instructions && (
            <Card>
              <CardHeader>
                <CardTitle>Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="whitespace-pre-wrap text-foreground">{assignment.instructions}</div>
              </CardContent>
            </Card>
          )}

          {assignment.solutions && (
            <Card>
              <CardHeader>
                <CardTitle>Solutions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="whitespace-pre-wrap text-foreground">{assignment.solutions}</div>
              </CardContent>
            </Card>
          )}
        </div>

        <section className="border-t border-border pt-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">More Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/notes">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                View Study Notes
              </Button>
            </Link>
            <Link href="/old-questions">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                Browse Past Papers
              </Button>
            </Link>
          </div>
        </section>
      </article>
    </div>
  )
}
