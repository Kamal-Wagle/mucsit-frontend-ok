"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, Archive, Download } from "lucide-react"
import { fetchOldQuestions } from "@/lib/api"
import { PaginationControls } from "@/components/pagination-controls"
import { Button } from "@/components/ui/button"

interface OldQuestion {
  _id: string
  title: string
  description?: string
  year?: number
  subject?: string
  semester?: string
  difficulty?: "easy" | "medium" | "hard"
}

export function OldQuestionsListPage() {
  const [questions, setQuestions] = useState<OldQuestion[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedYear, setSelectedYear] = useState<number | undefined>()
  const [selectedSubject, setSelectedSubject] = useState("")
  const [selectedSemester, setSelectedSemester] = useState("")
  const [years, setYears] = useState<number[]>([])
  const [subjects, setSubjects] = useState<string[]>([])
  const [semesters, setSemesters] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [sortBy, setSortBy] = useState("-year")

  useEffect(() => {
    const fetchAllQuestions = async () => {
      try {
        setLoading(true)
        const response = await fetchOldQuestions(
          currentPage,
          itemsPerPage,
          sortBy,
          selectedYear,
          searchQuery || undefined,
          selectedSemester || undefined,
        )
        const mappedQuestions = (response.data || []).map((item: any) => ({
          _id: item._id,
          title: item.title,
          description: item.description,
          year: item.year,
          subject: item.subject,
          semester: item.semester,
          difficulty: item.difficulty,
        }))
        setQuestions(mappedQuestions)

        if (response.data && Array.isArray(response.data)) {
          const metadata = (response as any).data || {}
          setTotalPages(metadata.totalPages || 1)
        }

        // Extract unique years, subjects, and semesters
        const uniqueYears = Array.from(new Set(mappedQuestions.filter((q) => q.year).map((q) => q.year))) as number[]
        const uniqueSubjects = Array.from(
          new Set(mappedQuestions.filter((q) => q.subject).map((q) => q.subject)),
        ) as string[]
        const uniqueSemesters = Array.from(
          new Set(mappedQuestions.filter((q) => q.semester).map((q) => q.semester)),
        ) as string[]

        setYears(uniqueYears.sort((a, b) => b - a))
        setSubjects(uniqueSubjects)
        setSemesters(uniqueSemesters)
      } catch (error) {
        console.error("Error fetching questions:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAllQuestions()
  }, [currentPage, itemsPerPage, sortBy, selectedYear, searchQuery, selectedSemester])

  const sortOptions = [
    { value: "-year", label: "Newest Year" },
    { value: "year", label: "Oldest Year" },
    { value: "-createdAt", label: "Recently Added" },
    { value: "title", label: "Title (A-Z)" },
  ]

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-yellow-50 rounded-lg">
            <Archive className="w-6 h-6 text-yellow-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground">Old Questions & Past Papers</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Access previous year exam papers and old questions to prepare effectively
        </p>
      </div>

      <div className="space-y-4 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search papers..."
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {years.length > 0 && (
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Year</label>
              <select
                value={selectedYear?.toString() || ""}
                onChange={(e) => {
                  setSelectedYear(e.target.value ? Number.parseInt(e.target.value) : undefined)
                  setCurrentPage(1)
                }}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
              >
                <option value="">All Years</option>
                {years.map((year) => (
                  <option key={year} value={year.toString()}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          )}

          {subjects.length > 0 && (
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Subject</label>
              <select
                value={selectedSubject}
                onChange={(e) => {
                  setSelectedSubject(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
              >
                <option value="">All Subjects</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {!loading && questions.length > 0 && (
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-40" />
          ))}
        </div>
      ) : questions.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {questions.map((question) => (
              <Link key={question._id} href={`/old-questions/${question._id}`}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 bg-white hover:border-gray-300 overflow-hidden">
                  <CardHeader className="pb-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Past Paper</span>
                      {question.year && (
                        <span className="text-xs font-bold text-gray-900 bg-gray-100 px-2.5 py-1 rounded-full">
                          {question.year}
                        </span>
                      )}
                    </div>
                    <CardTitle className="text-lg font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-yellow-600 transition-colors">
                      {question.title}
                    </CardTitle>
                    {question.subject && <p className="text-sm text-blue-600 font-semibold">{question.subject}</p>}
                  </CardHeader>
                  <CardContent className="space-y-3 pt-0 pb-4">
                    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                      {question.description || "Previous year exam question"}
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className="text-xs text-gray-600 font-medium">View paper</span>
                      <Button className="bg-black hover:bg-gray-800 text-white text-xs h-8 px-4 rounded">
                        <Download className="w-3 h-3 mr-1.5" />
                        View
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
          <Archive className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <p className="text-muted-foreground">No questions found</p>
        </div>
      )}
    </div>
  )
}
