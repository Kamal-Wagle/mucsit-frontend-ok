"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, Filter, PenTool, ArrowRight } from "lucide-react"
import { fetchBlogs } from "@/lib/api"
import { PaginationControls } from "@/components/pagination-controls"
import { Button } from "@/components/ui/button"

interface Blog {
  _id: string
  title: string
  excerpt?: string
  description?: string
  category?: string
  createdAt?: string
  seoKeywords?: string[]
  readTimeMinutes?: number
  image?: string
  author?: string
  semester?: string
}

export function BlogsListPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState("")
  const [selectedSemester, setSelectedSemester] = useState("")
  const [allTags, setAllTags] = useState<string[]>([])
  const [semesters, setSemesters] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [sortBy, setSortBy] = useState("-createdAt")

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        setLoading(true)
        const response = await fetchBlogs(
          currentPage,
          itemsPerPage,
          sortBy,
          selectedTag || undefined,
          searchQuery || undefined,
        )
        const mappedBlogs = (response.data || []).map((item: any) => ({
          _id: item._id,
          title: item.title,
          excerpt: item.excerpt,
          description: item.description,
          category: item.category,
          createdAt: item.createdAt,
          seoKeywords: item.seoKeywords,
          readTimeMinutes: item.readTimeMinutes,
          image: item.image,
          author: typeof item.author === "string" ? item.author : item.author?.name,
          semester: item.semester,
        }))
        setBlogs(mappedBlogs)
        if (response.data && Array.isArray(response.data)) {
          const metadata = (response as any).data || {}
          setTotalPages(metadata.totalPages || 1)
        }

        // Extract unique tags from keywords
        const tags = new Set<string>()
        mappedBlogs.forEach((blog: any) => {
          blog.seoKeywords?.forEach((tag) => tags.add(tag))
        })
        const uniqueSemesters = Array.from(
          new Set(mappedBlogs.filter((b) => b.semester).map((b) => b.semester)),
        ) as string[]
        setAllTags(Array.from(tags))
        setSemesters(uniqueSemesters)
      } catch (error) {
        console.error("Error fetching blogs:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAllBlogs()
  }, [currentPage, itemsPerPage, sortBy, selectedTag, searchQuery, selectedSemester])

  const getPublishDate = (blog: Blog) => {
    const date = blog.createdAt
    return date
      ? new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : null
  }

  const sortOptions = [
    { value: "-createdAt", label: "Newest First" },
    { value: "createdAt", label: "Oldest First" },
    { value: "title", label: "Title (A-Z)" },
    { value: "-views", label: "Most Viewed" },
  ]

  return (
    <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-purple-50 rounded-lg">
            <PenTool className="w-6 h-6 text-purple-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground">Educational Blog</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Explore expert insights, learning guides, and trending topics in education
        </p>
      </div>

      <div className="space-y-4 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
            }}
            className="pl-10"
          />
        </div>

        {semesters.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm font-semibold text-gray-700">Semester:</span>
            <button
              onClick={() => {
                setSelectedSemester("")
                setCurrentPage(1)
              }}
              className={`px-3 py-1 rounded-full text-sm transition ${
                !selectedSemester ? "bg-primary text-primary-foreground" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              All
            </button>
            {semesters.map((semester) => (
              <button
                key={semester}
                onClick={() => {
                  setSelectedSemester(semester)
                  setCurrentPage(1)
                }}
                className={`px-3 py-1 rounded-full text-sm transition ${
                  selectedSemester === semester
                    ? "bg-primary text-primary-foreground"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {semester}
              </button>
            ))}
          </div>
        )}

        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <button
              onClick={() => {
                setSelectedTag("")
                setCurrentPage(1)
              }}
              className={`px-3 py-1 rounded-full text-sm transition ${
                !selectedTag ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-border"
              }`}
            >
              All Tags
            </button>
            {allTags.slice(0, 10).map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setSelectedTag(tag)
                  setCurrentPage(1)
                }}
                className={`px-3 py-1 rounded-full text-sm transition ${
                  selectedTag === tag
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-border"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {!loading && blogs.length > 0 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          sortBy={sortBy}
          sortOptions={sortOptions}
          onSortChange={setSortBy}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      )}

      {loading ? (
        <div className="space-y-6 mt-8">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      ) : blogs.length > 0 ? (
        <>
          <div className="space-y-6 mt-8">
            {blogs.map((blog) => (
              <Link key={blog._id} href={`/blogs/${blog._id}`}>
                <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 bg-white hover:border-gray-300 overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    {blog.image && (
                      <div className="md:w-56 h-40 md:h-auto bg-gray-200 flex-shrink-0 overflow-hidden">
                        <img
                          src={blog.image || "/placeholder.svg"}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <CardHeader className="pb-2 space-y-2">
                        {/* Top row: Blog Post label and read time */}
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Blog</span>
                          <span className="text-xs text-gray-600 font-medium">
                            {blog.readTimeMinutes || 5} min read
                          </span>
                        </div>
                        {/* Title */}
                        <CardTitle className="text-base font-bold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2">
                          {blog.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-2">
                        {/* Description */}
                        {(blog.excerpt || blog.description) && (
                          <p className="text-sm text-gray-600 line-clamp-2 mb-3">{blog.excerpt || blog.description}</p>
                        )}
                        {/* Bottom row: author, date, and read button */}
                        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                          <div className="text-xs text-gray-600">
                            {blog.author && <span className="font-semibold">{blog.author}</span>}
                            {getPublishDate(blog) && <span className="text-gray-500 ml-2">{getPublishDate(blog)}</span>}
                          </div>
                          <Button className="bg-black hover:bg-gray-800 text-white text-xs h-8 px-4 rounded">
                            <ArrowRight className="w-3 h-3 mr-1.5" />
                            Read
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            sortBy={sortBy}
            sortOptions={sortOptions}
            onSortChange={setSortBy}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={setItemsPerPage}
          />
        </>
      ) : (
        <div className="text-center py-12">
          <PenTool className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <p className="text-muted-foreground">No blog posts found</p>
        </div>
      )}
    </div>
  )
}
