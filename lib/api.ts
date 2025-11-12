const API_BASE_URL = "https://mucsitbackend.onrender.com/api"

export interface Note {
  _id: string
  title: string
  description: string
  content?: string
  subject: string
  semester: string
  faculty: string
  year: number
  fileUrl: string
  imageUrl?: string
  seoKeywords: string[]
  seoDescription: string
  author?: { _id: string; email: string; name: string } | null
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

export interface Assignment {
  _id: string
  title: string
  description: string
  instructions?: string
  subject: string
  semester: string
  faculty: string
  year: number
  dueDate: string
  fileUrl: string
  imageUrl?: string
  seoKeywords: string[]
  seoDescription: string
  author?: any
  totalMarks: number
  difficulty: "easy" | "medium" | "hard"
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

export interface OldQuestion {
  _id: string
  title: string
  question: string
  answer: string
  subject: string
  semester: string
  faculty: string
  year: number
  description: string
  fileUrl: string
  imageUrl?: string
  seoKeywords: string[]
  seoDescription: string
  author?: { _id: string; email: string; name: string }
  difficulty: "easy" | "medium" | "hard"
  views: number
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

export interface BlogSection {
  text: string
  imageUrl?: string
  _id: string
}

export interface Blog {
  _id: string
  title: string
  sections: BlogSection[]
  excerpt: string
  category: string
  description: string
  fileUrl?: string
  seoKeywords: string[]
  seoDescription: string
  author?: any
  views: number
  likes: number
  isPublished: boolean
  isFeatured: boolean
  readTimeMinutes: number
  createdAt: string
  updatedAt: string
}

export interface ApiResponse<T> {
  data: T
  error?: string
  message?: string
}

export async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
  try {
    const url = `${API_BASE_URL}${endpoint}`
    console.log("[v0] Fetching from:", url)
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`)
    }

    const responseData = await response.json()
    console.log("[v0] API Response:", responseData)
    return { data: responseData }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error"
    console.log("[v0] API Error:", message)
    return { data: null as any, error: message }
  }
}

export function getId(item: any): string {
  return item._id || item.id || ""
}

export function buildQueryParams(params: Record<string, string | number | undefined>): string {
  const searchParams = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      searchParams.append(key, String(value))
    }
  })
  return searchParams.toString()
}

/**
 * Fetch notes from API
 */
export async function fetchNotes(page = 1, limit = 10, sort = "-createdAt", search?: string, subject?: string) {
  const params = buildQueryParams({ page, limit, sort, search, subject })
  const response = await fetchAPI<{ notes: Note[]; page: number; totalPages: number; count: number; total: number }>(
    `/notes?${params}`,
  )
  return { ...response, data: response.data?.notes || [] }
}

/**
 * Fetch single note by ID
 */
export async function fetchNoteById(id: string) {
  const response = await fetchAPI<Note>(`/notes/${id}`)
  return { ...response, data: response.data as Note }
}

/**
 * Fetch assignments from API
 */
export async function fetchAssignments(page = 1, limit = 10, sort = "-dueDate", difficulty?: string, search?: string) {
  const params = buildQueryParams({ page, limit, sort, difficulty, search })
  const response = await fetchAPI<{
    assignments: Assignment[]
    page: number
    totalPages: number
    count: number
    total: number
  }>(`/assignments?${params}`)
  return { ...response, data: response.data?.assignments || [] }
}

/**
 * Fetch single assignment by ID
 */
export async function fetchAssignmentById(id: string) {
  const response = await fetchAPI<Assignment>(`/assignments/${id}`)
  return { ...response, data: response.data as Assignment }
}

/**
 * Fetch old questions from API
 */
export async function fetchOldQuestions(page = 1, limit = 10, sort = "-year", year?: number, search?: string) {
  const params = buildQueryParams({ page, limit, sort, year, search })
  const response = await fetchAPI<{
    oldQuestions: OldQuestion[]
    page: number
    totalPages: number
    count: number
    total: number
  }>(`/old-questions?${params}`)
  return { ...response, data: response.data?.oldQuestions || [] }
}

/**
 * Fetch single old question by ID
 */
export async function fetchOldQuestionById(id: string) {
  const response = await fetchAPI<OldQuestion>(`/old-questions/${id}`)
  return { ...response, data: response.data as OldQuestion }
}

/**
 * Fetch blogs from API
 */
export async function fetchBlogs(page = 1, limit = 10, sort = "-createdAt", category?: string, search?: string) {
  const params = buildQueryParams({ page, limit, sort, category, search })
  const response = await fetchAPI<{
    blogs: Blog[]
    page: number
    totalPages: number
    count: number
    total: number
  }>(`/blogs?${params}`)
  return { ...response, data: response.data?.blogs || [] }
}

/**
 * Fetch single blog by ID
 */
export async function fetchBlogById(id: string) {
  const response = await fetchAPI<Blog>(`/blogs/${id}`)
  return { ...response, data: response.data as Blog }
}
