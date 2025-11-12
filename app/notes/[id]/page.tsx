import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { NoteDetailPage } from "@/components/notes/note-detail-page"
import { fetchNoteById } from "@/lib/api"

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const response = await fetchNoteById(id)

  const note = response.data?._id ? response.data : response.data?.data

  if (!note) {
    return {
      title: "Note Not Found - MUCISIT",
    }
  }

  return {
    title: `${note.title} - MUCISIT Notes`,
    description: note.description || note.seoDescription || "Read comprehensive study notes on MUCISIT",
    keywords: note.seoKeywords || [],
    openGraph: {
      title: note.title,
      description: note.description || note.seoDescription,
      type: "article",
      images: note.imageUrl ? [{ url: note.imageUrl }] : [],
    },
  }
}

export default async function NoteDetailRoute({ params }: Props) {
  const { id } = await params
  const response = await fetchNoteById(id)

  const note = response.data?._id ? response.data : response.data?.data

  if (!note) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <NoteDetailPage note={note} id={id} />
      </main>
      <Footer />
    </div>
  )
}
