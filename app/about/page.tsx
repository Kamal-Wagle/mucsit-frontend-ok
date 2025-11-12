import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, BookOpen, Users, Target, Award } from "lucide-react"

export const metadata: Metadata = {
  title: "About MUCISIT - Mid-West University School of Information Technology",
  description:
    "Learn about Mid-West University (MWU), School of Information Technology (MUC-SIT) in Surkhet, Nepal. Explore our mission, vision, faculties, and comprehensive academic resources for BSc CSIT students.",
  keywords: [
    "Mid-West University",
    "MWU Surkhet",
    "MUC-SIT",
    "BSc CSIT",
    "School of Information Technology",
    "Nepal",
    "Higher Education",
    "Computer Science",
    "Karnali Province",
  ],
  authors: [{ name: "MUCISIT" }],
  openGraph: {
    title: "About MUCISIT - Mid-West University School of Information Technology",
    description:
      "Mid-West University (MWU) is a public autonomous institution in Surkhet, Nepal offering BSc CSIT and other programs through the School of Information Technology.",
    type: "website",
    url: "https://mucisit.vercel.app/about",
    siteName: "MUCISIT",
    locale: "en_US",
    images: [
      {
        url: "/mid-west-university-surkhet-campus.jpg",
        width: 1200,
        height: 1200,
        alt: "Mid-West University Campus",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About MUCISIT - Mid-West University",
    description: "Discover Mid-West University and MUC-SIT, offering quality education in Computer Science and IT.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Mid-West University, School of Information Technology",
  alternateName: ["MWU", "MUC-SIT", "MUCISIT"],
  url: "https://mucisit.vercel.app",
  logo: "/logo.png",
  description:
    "School of Information Technology offering BSc CSIT and educational resources for students at Mid-West University in Surkhet, Nepal.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Birendranagar-10",
    addressLocality: "Surkhet",
    addressRegion: "Karnali Province",
    postalCode: "82100",
    addressCountry: "NP",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "General Inquiries",
    telephone: "+977-83-524681",
    email: "info@mwu.edu.np",
  },
  sameAs: ["https://www.mwu.edu.np"],
  foundingDate: "2010-06-17",
  areaServed: "NP",
}

export default function AboutPage() {
  const faculties = [
    {
      name: "Faculty of Science & Technology",
      programs: ["BSc CSIT", "BCA", "BSc Physics", "BSc Chemistry"],
    },
    {
      name: "Faculty of Management",
      programs: ["BBA", "BBM"],
    },
    {
      name: "Faculty of Humanities & Social Sciences",
      programs: ["BA", "BSc Social Sciences"],
    },
    {
      name: "Faculty of Education",
      programs: ["BEd", "MEd"],
    },
    {
      name: "Faculty of Engineering",
      programs: ["BE Civil", "BE Electrical"],
    },
    {
      name: "Faculty of Law",
      programs: ["BL", "LLM"],
    },
  ]

  const values = [
    {
      icon: Target,
      title: "Accessible Education",
      description: "Quality higher education accessible and affordable for students from all regions of Nepal.",
    },
    {
      icon: Users,
      title: "Community Focus",
      description: "Fostering academic excellence through community engagement and collaborative learning.",
    },
    {
      icon: Award,
      title: "Innovation & Research",
      description: "Promoting innovation and research-driven education for professional development.",
    },
    {
      icon: BookOpen,
      title: "Comprehensive Resources",
      description: "Providing organized study materials, notes, assignments, and practical learning facilities.",
    },
  ]

  const stats = [
    { label: "Established", value: "2010" },
    { label: "Faculties", value: "7+" },
    { label: "Academic Programs", value: "20+" },
    { label: "Students", value: "5000+" },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
            <div>
              <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-6 text-balance">
                Mid-West University
                <span className="block text-primary">School of Information Technology</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-4">
                A leading public autonomous institution in Surkhet, Karnali Province, Nepal, dedicated to providing
                quality higher education and fostering academic excellence.
              </p>
              <p className="text-lg text-muted-foreground">
                Established in 2010 to expand higher education opportunities across the mid-western and Karnali regions.
              </p>
            </div>
            <div className="bg-primary/10 rounded-xl aspect-video flex items-center justify-center">
              <BookOpen className="w-24 h-24 text-primary opacity-50" />
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <Card key={idx} className="border-0 shadow-none bg-transparent">
                <CardContent className="text-center pt-0">
                  <p className="text-4xl font-bold text-primary mb-2">{stat.value}</p>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-balance">Mission & Vision</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-4">
                <p>
                  To deliver accessible, affordable, and high-quality education to students from all regions of Nepal,
                  especially from the mid-western and Karnali areas.
                </p>
                <p>
                  Foster academic excellence, innovation, and social responsibility through teaching, research, and
                  community engagement.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-4">
                <p>
                  To become a comprehensive and trusted educational institution known for excellence in academic
                  programs and research.
                </p>
                <p>
                  Foster a collaborative community of learners and educators who contribute to Nepal's socio-economic
                  development.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* About MUCISIT */}
        <section className="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-foreground mb-8 text-balance">About MUC-SIT</h2>
            <Card>
              <CardContent className="pt-6 space-y-4 text-muted-foreground">
                <p>
                  The School of Information Technology (MUC-SIT) is part of the Faculty of Science & Technology at
                  Mid-West University, offering specialized programs in information technology and computer science.
                </p>
                <p>
                  Our BSc CSIT (Bachelor of Science in Computer Science and Information Technology) program is one of
                  the most sought-after programs, designed to prepare students for careers in software development,
                  database management, networking, and IT solutions.
                </p>
                <p>
                  This website serves as a dedicated platform for MUCISIT students, providing easy access to academic
                  resources including study notes, assignments, past question papers, and educational blogs.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-balance">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, idx) => {
              const Icon = value.icon
              return (
                <Card key={idx}>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{value.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Faculties */}
        <section className="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-foreground mb-12 text-balance">Faculties & Academic Programs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faculties.map((faculty, idx) => (
                <Card key={idx}>
                  <CardHeader>
                    <CardTitle>{faculty.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {faculty.programs.map((program, pidx) => (
                        <li key={pidx} className="flex items-center gap-2 text-muted-foreground">
                          <span className="w-2 h-2 bg-primary rounded-full" />
                          {program}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Location & Contact */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-balance">Contact & Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="w-6 h-6 text-primary" />
                  <CardTitle>Location</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p className="font-medium">Birendranagar-10, Surkhet</p>
                <p>Karnali Province, Nepal</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Phone className="w-6 h-6 text-primary" />
                  <CardTitle>Phone</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p className="font-medium">+977-83-524681</p>
                <p>525333 / 525444</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="w-6 h-6 text-primary" />
                  <CardTitle>Email</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p className="font-medium">info@mwu.edu.np</p>
                <p>
                  <a href="https://www.mwu.edu.np" className="text-primary hover:underline">
                    www.mwu.edu.np
                  </a>
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-12 px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Explore Our Resources</h2>
            <p className="text-lg text-blue-100 mb-8">
              Access comprehensive study materials, notes, assignments, past papers, and educational blogs.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/notes"
                className="px-6 py-3 bg-white text-primary rounded-lg font-medium hover:bg-slate-100 transition"
              >
                Browse Notes
              </a>
              <a
                href="/assignments"
                className="px-6 py-3 bg-white text-primary rounded-lg font-medium hover:bg-slate-100 transition"
              >
                View Assignments
              </a>
              <a
                href="/blogs"
                className="px-6 py-3 bg-white text-primary rounded-lg font-medium hover:bg-slate-100 transition"
              >
                Read Blogs
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
    </div>
  )
}
