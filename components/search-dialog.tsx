"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, Loader2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

interface SearchResult {
  id: string
  title: string
  type: "note" | "assignment" | "question" | "blog"
  href: string
}

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!query) {
      setResults([])
      return
    }

    const searchTimeout = setTimeout(async () => {
      setLoading(true)
      try {
        // Mock search results - in production, this would fetch from your API
        const mockResults: SearchResult[] = [
          {
            id: "1",
            title: "Introduction to Web Development",
            type: "note",
            href: "/notes/1",
          },
          {
            id: "2",
            title: "Database Design Assignment",
            type: "assignment",
            href: "/assignments/2",
          },
          {
            id: "3",
            title: "Past Paper 2023",
            type: "question",
            href: "/old-questions/3",
          },
          {
            id: "4",
            title: "Getting Started with React",
            type: "blog",
            href: "/blogs/4",
          },
        ]
        setResults(mockResults.filter((r) => r.title.toLowerCase().includes(query.toLowerCase())))
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => clearTimeout(searchTimeout)
  }, [query])

  const handleSelect = (href: string) => {
    router.push(href)
    onOpenChange(false)
    setQuery("")
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "note":
        return "bg-blue-100 text-blue-800"
      case "assignment":
        return "bg-green-100 text-green-800"
      case "question":
        return "bg-yellow-100 text-yellow-800"
      case "blog":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Search MUCISIT</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search notes, assignments, questions, and blogs..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
              autoFocus
            />
          </div>

          {loading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
            </div>
          )}

          {!loading && query && results.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">No results found for "{query}"</div>
          )}

          {!loading && results.length > 0 && (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {results.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleSelect(result.href)}
                  className="w-full text-left p-3 rounded-lg hover:bg-muted transition border border-border"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{result.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-1 rounded-full capitalize ${getTypeColor(result.type)}`}>
                          {result.type}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {!query && !loading && (
            <div className="text-center py-8 text-muted-foreground">Start typing to search across all resources</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
