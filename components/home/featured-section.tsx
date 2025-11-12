"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { BookOpen, ListTodo, Archive, PenTool, ArrowRight } from "lucide-react"
import { fetchNotes, fetchAssignments, fetchOldQuestions, fetchBlogs } from "@/lib/api"

interface FeaturedItem {
  id: string
  title: string
  description?: string
  content?: string
  subject?: string
  semester?: string
  category?: string
  difficulty?: string
  year?: number
  dueDate?: string
  createdAt?: string
  updatedAt?: string
  fileUrl?: string
  readTimeMinutes?: number
  views?: number
}

const RESOURCE_TYPES = [
  {
    key: "notes",
    title: "Study Notes",
    icon: BookOpen,
    href: "/notes",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    description: "Well-organized study materials for all subjects",
  },
  {
    key: "assignments",
    title: "Assignments",
    icon: ListTodo,
    href: "/assignments",
    color: "text-green-600",
    bgColor: "bg-green-50",
    description: "Practice assignments with detailed solutions",
  },
  {
    key: "questions",
    title: "Old Questions",
    icon: Archive,
    href: "/old-questions",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    description: "Past exam papers and previous year questions",
  },
  {
    key: "blogs",
    title: "Blogs",
    icon: PenTool,
    href: "/blogs",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    description: "Expert insights and learning guides",
  },
]

export function FeaturedSection() {
  const [featuredItems, setFeaturedItems] = useState<Record<string, FeaturedItem[]>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAllFeatured = async () => {
      try {
        const [notesRes, assignmentsRes, questionsRes, blogsRes] = await Promise.all([
          fetchNotes(),
          fetchAssignments(),
          fetchOldQuestions(),
          fetchBlogs(),
        ])

        setFeaturedItems({
          notes: (notesRes.data || []).slice(0, 3).map((item: any) => ({
            id: item._id,
            title: item.title,
            description: item.description,
            subject: item.subject,
            semester: item.semester,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            fileUrl: item.fileUrl,
          })),
          assignments: (assignmentsRes.data || []).slice(0, 3).map((item: any) => ({
            id: item._id,
            title: item.title,
            description: item.description,
            subject: item.subject,
            semester: item.semester,
            difficulty: item.difficulty,
            dueDate: item.dueDate,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            fileUrl: item.fileUrl,
          })),
          questions: (questionsRes.data || []).slice(0, 3).map((item: any) => ({
            id: item._id,
            title: item.title,
            description: item.description,
            subject: item.subject,
            semester: item.semester,
            year: item.year,
            difficulty: item.difficulty,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            fileUrl: item.fileUrl,
          })),
          blogs: (blogsRes.data || []).slice(0, 3).map((item: any) => ({
            id: item._id,
            title: item.title,
            description: item.excerpt || item.description,
            category: item.category,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            readTimeMinutes: item.readTimeMinutes,
            views: item.views,
          })),
        })
      } catch (error) {
        console.error("Error fetching featured items:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAllFeatured()
  }, [])

  if (loading) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto space-y-12">
          {RESOURCE_TYPES.map((resource) => (
            <div key={resource.key}>
              <Skeleton className="h-8 w-32 mb-6" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-48" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto space-y-16">
        {RESOURCE_TYPES.map((resource) => {
          const Icon = resource.icon
          const items = featuredItems[resource.key] || []

          const formatDate = (value?: string) => {
            if (!value) return ""
            const date = new Date(value)
            if (Number.isNaN(date.getTime())) return ""
            return date.toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })
          }
          const formatDifficulty = (value?: string) =>
            value ? value.charAt(0).toUpperCase() + value.slice(1) : ""

          return (
            <div key={resource.key}>
              {/* Section Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${resource.bgColor}`}>
                    <Icon className={`w-6 h-6 ${resource.color}`} />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{resource.title}</h2>
                    <p className="text-sm text-muted-foreground">{resource.description}</p>
                  </div>
                </div>
                <Link href={resource.href} className="hidden sm:block">
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    View All
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {items.length > 0 ? (
                  items.map((item) => (
                    <Link key={item.id} href={`${resource.href}/${item.id}`}>
                      <Card className="group relative h-full hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 bg-white hover:border-gray-300 overflow-hidden">
                        <CardHeader className="pb-3 space-y-3">
                          <div className="flex items-start justify-between">
                            <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                              {item.semester ||
                                (resource.key === "questions" && item.year
                                  ? `Year ${item.year}`
                                  : resource.key === "assignments" && item.difficulty
                                    ? `${formatDifficulty(item.difficulty)} Level`
                                    : resource.title)}
                            </span>
                            {(resource.key === "assignments" ? item.dueDate : item.createdAt || item.updatedAt) && (
                              <span className="text-xs text-gray-500 font-medium">
                                {resource.key === "assignments"
                                  ? formatDate(item.dueDate)
                                  : formatDate(item.createdAt || item.updatedAt)}
                              </span>
                            )}
                          </div>
                          <CardTitle className="text-lg font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                            {item.title}
                          </CardTitle>
                          {(item.subject || item.category) && (
                            <p className="text-sm text-blue-600 font-semibold">
                              {item.subject || item.category}
                            </p>
                          )}
                        </CardHeader>
                        <CardContent className="space-y-3 pt-0 pb-4">
                          <CardDescription className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                            {item.description || item.content || "Explore curated resources to boost your learning."}
                          </CardDescription>
                          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                            <span className="text-xs font-medium text-gray-500">
                              {item.fileUrl
                                ? "📄 Document"
                                : resource.key === "blogs" && item.readTimeMinutes
                                  ? `🕒 ${item.readTimeMinutes} min read`
                                  : resource.key === "questions" && item.year
                                    ? `📚 Year ${item.year}`
                                    : resource.title}
                            </span>
                            <Button
                              type="button"
                              className="ml-auto bg-black hover:bg-gray-800 text-white text-xs h-8 px-4 rounded"
                            >
                              <ArrowRight className="w-3 h-3 mr-1.5" />
                              View
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))
                ) : (
                  <div className="col-span-3 text-center py-12">
                    <p className="text-muted-foreground">No items available yet</p>
                  </div>
                )}
              </div>

              {/* Mobile View All Button */}
              <Link href={resource.href} className="sm:hidden block">
                <Button variant="outline" className="w-full gap-2 bg-transparent">
                  View All {resource.title}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          )
        })}
      </div>
    </section>
  )
}
