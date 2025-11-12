import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { OldQuestionDetailPage } from "@/components/old-questions/old-question-detail-page"
import { fetchOldQuestionById } from "@/lib/api"

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const response = await fetchOldQuestionById(id)

  if (!response.data) {
    return { title: "Question Not Found - MUCISIT" }
  }

  const question = response.data
  return {
    title: `${question.title} - Past Papers - MUCISIT`,
    description: question.description || "Access past exam papers and old questions",
    openGraph: {
      title: question.title,
      description: question.description,
      type: "article",
    },
  }
}

export default async function OldQuestionDetailRoute({ params }: Props) {
  const { id } = await params
  const response = await fetchOldQuestionById(id)

  if (!response.data) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <OldQuestionDetailPage question={response.data} id={id} />
      </main>
      <Footer />
    </div>
  )
}
