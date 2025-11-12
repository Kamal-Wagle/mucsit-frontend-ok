"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, Filter, ListTodo, Download } from "lucide-react"
import { fetchAssignments } from "@/lib/api"
import { PaginationControls } from "@/components/pagination-controls"
import { Button } from "@/components/ui/button"

interface Assignment {
  _id: string
  title: string
  description?: string
  dueDate?: string
  semester?: string
  difficulty?: "easy" | "medium" | "hard"
}

export function AssignmentsListPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState("")
  const [selectedSemester, setSelectedSemester] = useState("")
  const [semesters, setSemesters] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [sortBy, setSortBy] = useState("-dueDate")

  useEffect(() => {
    const fetchAllAssignments = async () => {
      try {
        setLoading(true)
        const response = await fetchAssignments(
          currentPage,
          itemsPerPage,
          sortBy,
          difficultyFilter || undefined,
          searchQuery || undefined,
        )
        const mappedAssignments = (response.data || []).map((item: any) => ({
          _id: item._id,
          title: item.title,
          description: item.description,
          dueDate: item.dueDate,
          semester: item.semester,
          difficulty: item.difficulty,
        }))
        setAssignments(mappedAssignments)
        if (response.data && Array.isArray(response.data)) {
          const metadata = (response as any).data || {}
          setTotalPages(metadata.totalPages || 1)
        }

        const uniqueSemesters = Array.from(
          new Set(mappedAssignments.filter((a) => a.semester).map((a) => a.semester)),
        ) as string[]
        setSemesters(uniqueSemesters)
      } catch (error) {
        console.error("Error fetching assignments:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAllAssignments()
  }, [currentPage, itemsPerPage, sortBy, difficultyFilter, searchQuery, selectedSemester])

  const isDeadlineSoon = (dueDate?: string) => {
    if (!dueDate) return false
    const days = Math.ceil((new Date(dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    return days > 0 && days <= 7
  }

  const sortOptions = [
    { value: "-dueDate", label: "Due Soon" },
    { value: "dueDate", label: "Due Later" },
    { value: "-createdAt", label: "Newest First" },
    { value: "createdAt", label: "Oldest First" },
    { value: "title", label: "Title (A-Z)" },
  ]

  return (
    <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-green-50 rounded-lg">
            <ListTodo className="w-6 h-6 text-green-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground">Assignments</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Practice assignments with detailed solutions and deadline tracking
        </p>
      </div>

      <div className="space-y-4 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search assignments..."
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

        <div className="flex flex-wrap gap-2 items-center">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <button
            onClick={() => {
              setDifficultyFilter("")
              setCurrentPage(1)
            }}
            className={`px-3 py-1 rounded-full text-sm transition ${
              !difficultyFilter
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-border"
            }`}
          >
            All
          </button>
          {["Easy", "Medium", "Hard"].map((level) => (
            <button
              key={level}
              onClick={() => {
                setDifficultyFilter(level.toLowerCase())
                setCurrentPage(1)
              }}
              className={`px-3 py-1 rounded-full text-sm transition ${
                difficultyFilter === level.toLowerCase()
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-border"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {!loading && assignments.length > 0 && (
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      ) : assignments.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {assignments.map((assignment) => (
              <Link key={assignment._id} href={`/assignments/${assignment._id}`}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 bg-white hover:border-gray-300 overflow-hidden">
                  <CardHeader className="pb-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        {assignment.semester || "Assignment"}
                      </span>
                      {assignment.dueDate && (
                        <span className="text-xs font-semibold text-gray-900">
                          {new Date(assignment.dueDate).toLocaleDateString("en-US", {
                            month: "2-digit",
                            day: "2-digit",
                            year: "numeric",
                          })}
                        </span>
                      )}
                    </div>
                    <CardTitle className="text-lg font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-green-600 transition-colors">
                      {assignment.title}
                    </CardTitle>
                    {assignment.difficulty && (
                      <p
                        className={`text-sm font-semibold ${
                          assignment.difficulty === "easy"
                            ? "text-green-600"
                            : assignment.difficulty === "medium"
                              ? "text-amber-600"
                              : "text-red-600"
                        }`}
                      >
                        {assignment.difficulty === "easy"
                          ? "Easy"
                          : assignment.difficulty === "medium"
                            ? "Medium"
                            : "Hard"}{" "}
                        Difficulty
                      </p>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-3 pt-0 pb-4">
                    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                      {assignment.description || "Assignment details"}
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className="text-xs text-gray-600 font-medium">View details</span>
                      <Button className="bg-black hover:bg-gray-800 text-white text-xs h-8 px-4 rounded">
                        <Download className="w-3 h-3 mr-1.5" />
                        Open
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
          <ListTodo className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <p className="text-muted-foreground">No assignments found</p>
        </div>
      )}
    </div>
  )
}
