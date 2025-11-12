import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { NotesListPage } from "@/components/notes/notes-list-page"

export const metadata: Metadata = {
  title: "Study Notes - MUCISIT",
  description:
    "Browse comprehensive study notes organized by subject and semester. Find the perfect material for your studies.",
  openGraph: {
    title: "Study Notes - MUCISIT",
    description: "Browse comprehensive study notes organized by subject and semester.",
  },
}

export default function NotesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <NotesListPage />
      </main>
      <Footer />
    </div>
  )
}
