"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, Filter, BookOpen, Download } from "lucide-react"
import { fetchNotes } from "@/lib/api"
import { PaginationControls } from "@/components/pagination-controls"

interface Note {
  _id: string
  id?: string
  title: string
  description?: string
  subject?: string
  semester?: string
  seoKeywords?: string[]
  content?: string
  author?: {
    name: string
    email: string
  }
  fileUrl?: string
  imageUrl?: string
  createdAt?: string
}

export function NotesListPage() {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")
  const [selectedSemester, setSelectedSemester] = useState("")
  const [subjects, setSubjects] = useState<string[]>([])
  const [semesters, setSemesters] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [sortBy, setSortBy] = useState("-createdAt")

  useEffect(() => {
    const fetchAllNotes = async () => {
      try {
        setLoading(true)
        const response = await fetchNotes(
          currentPage,
          itemsPerPage,
          sortBy,
          searchQuery || undefined,
          selectedSubject || undefined,
          selectedSemester || undefined,
        )
        const notesData = response.data || []
        console.log("[v0] Notes data:", notesData)
        setNotes(notesData)

        if (response.data && Array.isArray(response.data)) {
          const metadata = (response as any).data || {}
          setTotalPages(metadata.totalPages || 1)
        }

        // Extract unique subjects and semesters
        const uniqueSubjects = Array.from(
          new Set(notesData.filter((n: Note) => n.subject).map((n: Note) => n.subject)),
        ) as string[]
        const uniqueSemesters = Array.from(
          new Set(notesData.filter((n: Note) => n.semester).map((n: Note) => n.semester)),
        ) as string[]
        setSubjects(uniqueSubjects)
        setSemesters(uniqueSemesters)
      } catch (error) {
        console.log("[v0] Error fetching notes:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAllNotes()
  }, [currentPage, itemsPerPage, sortBy, searchQuery, selectedSubject, selectedSemester])

  const getNoteId = (note: Note) => note._id || note.id || ""

  const sortOptions = [
    { value: "-createdAt", label: "Newest First" },
    { value: "createdAt", label: "Oldest First" },
    { value: "title", label: "Title (A-Z)" },
    { value: "-title", label: "Title (Z-A)" },
  ]

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-blue-50 rounded-lg">
            <BookOpen className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground">Study Notes</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Access comprehensive study materials organized by subject and semester
        </p>
      </div>

      {/* Search and Filter */}
      <div className="space-y-4 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search notes..."
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

        {subjects.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <button
              onClick={() => {
                setSelectedSubject("")
                setCurrentPage(1)
              }}
              className={`px-3 py-1 rounded-full text-sm transition ${
                !selectedSubject
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-border"
              }`}
            >
              All
            </button>
            {subjects.map((subject) => (
              <button
                key={subject}
                onClick={() => {
                  setSelectedSubject(subject)
                  setCurrentPage(1)
                }}
                className={`px-3 py-1 rounded-full text-sm transition ${
                  selectedSubject === subject
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-border"
                }`}
              >
                {subject}
              </button>
            ))}
          </div>
        )}
      </div>

      {!loading && notes.length > 0 && (
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

      {/* Notes Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      ) : notes.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {notes.map((note) => (
              <Link key={getNoteId(note)} href={`/notes/${getNoteId(note)}`}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 bg-white hover:border-gray-300 overflow-hidden">
                  <CardHeader className="pb-3 space-y-3">
                    {/* Top row: semester/label and date */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        {note.semester || "Study Notes"}
                      </span>
                      {note.createdAt && (
                        <span className="text-xs text-gray-500 font-medium">
                          {new Date(note.createdAt).toLocaleDateString("en-US", {
                            month: "2-digit",
                            day: "2-digit",
                            year: "numeric",
                          })}
                        </span>
                      )}
                    </div>
                    {/* Title */}
                    <CardTitle className="text-lg font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                      {note.title}
                    </CardTitle>
                    {/* Subject in blue */}
                    {note.subject && <p className="text-sm text-blue-600 font-semibold">{note.subject}</p>}
                  </CardHeader>
                  <CardContent className="space-y-3 pt-0 pb-4">
                    {/* Description */}
                    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                      {note.description || "Study notes and materials"}
                    </p>
                    {/* Bottom row: file size and download button */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      {note.fileUrl && <span className="text-xs text-gray-600 font-medium">📄 Document</span>}
                      <Button
                        onClick={(e) => {
                          e.preventDefault()
                          if (note.fileUrl) {
                            window.open(note.fileUrl, "_blank")
                          }
                        }}
                        className="ml-auto bg-black hover:bg-gray-800 text-white text-xs h-8 px-4 rounded"
                      >
                        <Download className="w-3 h-3 mr-1.5" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
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
          <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <p className="text-muted-foreground mb-4">No notes found</p>
          <Button variant="outline" onClick={() => setSearchQuery("")}>
            Clear filters
          </Button>
        </div>
      )}
    </div>
  )
}
