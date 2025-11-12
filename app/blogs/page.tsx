import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BlogsListPage } from "@/components/blogs/blogs-list-page"

export const metadata: Metadata = {
  title: "Educational Blog - MUCISIT",
  description:
    "Read expert insights, learning guides, and educational articles to enhance your knowledge. Explore trending topics in education.",
  openGraph: {
    title: "Educational Blog - MUCISIT",
    description: "Discover expert insights and learning guides to boost your academic knowledge.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function BlogsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <BlogsListPage />
      </main>
      <Footer />
    </div>
  )
}
