"use client"

import { GraduationCap, Users, BookMarked, Award, Building2 } from "lucide-react"

const HIGHLIGHTS = [
  {
    icon: Building2,
    title: "Established 2010",
    description: "A leading public university in Karnali Region",
  },
  {
    icon: Users,
    title: "7 Faculties",
    description: "Science, Management, Humanities, Education, Engineering, Law & Agriculture",
  },
  {
    icon: Award,
    title: "Quality Education",
    description: "Committed to academic excellence and innovation",
  },
  {
    icon: BookMarked,
    title: "7 Departments",
    description: "Diverse programs including BSc CSIT, BCA, and more",
  },
]

export function UniversityHighlightSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="flex items-center justify-center gap-2 text-blue-600 font-semibold">
            <GraduationCap className="w-5 h-5" />
            About Mid-West University
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Excellence in Higher Education</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Mid-West University is Nepal's premier institution for accessible, affordable, and high-quality education in
            the Karnali region.
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {HIGHLIGHTS.map((highlight, index) => {
            const Icon = highlight.icon
            return (
              <div
                key={index}
                className="p-6 rounded-lg bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-blue-50">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">{highlight.title}</h3>
                    <p className="text-sm text-slate-600">{highlight.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Learn More Link */}
        <div className="text-center mt-12">
          <a
            href="/about"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
          >
            Learn more about MWU
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
