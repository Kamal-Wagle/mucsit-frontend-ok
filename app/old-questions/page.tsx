import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { OldQuestionsListPage } from "@/components/old-questions/old-questions-list-page"

export const metadata: Metadata = {
  title: "Old Questions & Past Papers - MUCISIT",
  description: "Access previous year question papers and past exams. Prepare effectively with real exam papers.",
  openGraph: {
    title: "Old Questions & Past Papers - MUCISIT",
    description: "Browse and download past exam papers by year and subject.",
  },
}

export default function OldQuestionsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <OldQuestionsListPage />
      </main>
      <Footer />
    </div>
  )
}
