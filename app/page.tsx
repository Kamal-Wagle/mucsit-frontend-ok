import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/home/hero-section"
import { FeaturedSection } from "@/components/home/featured-section"
import { UniversityHighlightSection } from "@/components/home/university-highlight-section"

export const metadata: Metadata = {
  title: "MUCSIT - Mid-West University BSc CSIT Study Resources",
  description:
    "Access comprehensive study materials for Mid-West University BSc CSIT program including notes, assignments, old questions, and educational blogs. Your academic resource hub for MUC-SIT students in Surkhet.",
  keywords:
    "Mid-West University, MWU, MU-CSIT, BSc CSIT, study notes, assignments, old questions, CSIT blogs, Surkhet, Nepal",
  openGraph: {
    title: "MUCSIT - Study Resources for MWU BSc CSIT Students",
    description: "Comprehensive academic resources for Mid-West University's Computer Science students.",
    type: "website",
    url: "https://mucsit.vercel.app",
    images: [
      {
        url: "/mid-west-university-surkhet-campus.jpg",
        width: 1200,
        height: 630,
        alt: "Mid-West University Campus",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MUCSIT - Study Resources for MWU Students",
    description: "Access notes, assignments, and study materials for BSc CSIT at Mid-West University.",
    images: ["/mid-west-university-surkhet-campus.jpg"],
  },
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <UniversityHighlightSection />
        <FeaturedSection />
      </main>
      <Footer />
    </div>
  )
}
