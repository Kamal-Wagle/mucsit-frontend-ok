export const SITE_NAME = "MUCSIT"
export const SITE_DESCRIPTION = "Your Academic Resource Hub - Access notes, assignments, old questions, and blogs"
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://mucsit.edu"

export const NAVIGATION_LINKS = [
  { href: "/", label: "Home" },
  { href: "/notes", label: "Notes" },
  { href: "/assignments", label: "Assignments" },
  { href: "/old-questions", label: "Old Questions" },
  { href: "/blogs", label: "Blogs" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export const RESOURCE_TYPES = {
  NOTES: "Notes",
  ASSIGNMENTS: "Assignments",
  OLD_QUESTIONS: "Old Questions",
  BLOGS: "Blogs",
}

export const ITEMS_PER_PAGE = 12
export const FEATURED_ITEMS_COUNT = 3
