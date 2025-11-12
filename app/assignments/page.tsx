import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AssignmentsListPage } from "@/components/assignments/assignments-list-page"

export const metadata: Metadata = {
  title: "Assignments - MUCISIT",
  description: "Practice with assignments and enhance your skills. Browse and download assignments with solutions.",
  openGraph: {
    title: "Assignments - MUCISIT",
    description: "Practice with assignments and solutions to master concepts.",
  },
}

export default function AssignmentsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <AssignmentsListPage />
      </main>
      <Footer />
    </div>
  )
}
