import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AssignmentDetailPage } from "@/components/assignments/assignment-detail-page"
import { fetchAssignmentById } from "@/lib/api"

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const response = await fetchAssignmentById(id)

  if (!response.data) {
    return { title: "Assignment Not Found - MUCISIT" }
  }

  const assignment = response.data
  return {
    title: `${assignment.title} - MUCISIT Assignments`,
    description: assignment.description || "View assignment details and solutions",
    openGraph: {
      title: assignment.title,
      description: assignment.description,
      type: "article",
    },
  }
}

export default async function AssignmentDetailRoute({ params }: Props) {
  const { id } = await params
  const response = await fetchAssignmentById(id)

  if (!response.data) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <AssignmentDetailPage assignment={response.data} id={id} />
      </main>
      <Footer />
    </div>
  )
}
