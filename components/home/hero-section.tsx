import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, FileText, MapPin, GraduationCap } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 overflow-hidden">
      {/* Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center space-y-8">
          {/* University Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white">
            <GraduationCap className="w-4 h-4" />
            <span className="text-sm font-semibold">Mid-West University, Surkhet</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white text-balance">
              MUCISIT Study Resources for <span className="text-yellow-200">BSc CSIT Students</span>
            </h1>
            <p className="text-lg sm:text-xl text-blue-50 max-w-3xl mx-auto text-pretty">
              Your complete academic hub for notes, assignments, past exams, and expert blogs. Study smart with
              resources curated for Mid-West University's Computer Science program.
            </p>
          </div>

          {/* Location Info */}
          <div className="flex items-center justify-center gap-2 text-blue-100">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Birendranagar, Surkhet, Karnali Province, Nepal</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/notes">
              <Button
                size="lg"
                className="w-full sm:w-auto gap-2 bg-white text-blue-600 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all font-semibold"
              >
                <BookOpen className="w-5 h-5" />
                View All Notes
              </Button>
            </Link>
            <Link href="/assignments">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto gap-2 border-2 border-white text-white hover:bg-white/20 bg-transparent font-semibold"
              >
                <FileText className="w-5 h-5" />
                Browse Assignments
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
