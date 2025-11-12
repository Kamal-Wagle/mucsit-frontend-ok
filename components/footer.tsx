import Link from "next/link"
import { SITE_NAME, NAVIGATION_LINKS } from "@/lib/constants"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-lg text-foreground">{SITE_NAME}</h3>
            <p className="text-sm text-muted-foreground">
              Your academic resource hub for comprehensive study materials.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              {NAVIGATION_LINKS.slice(0, 4).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-foreground">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/notes" className="text-sm text-muted-foreground hover:text-primary transition">
                  Study Notes
                </Link>
              </li>
              <li>
                <Link href="/assignments" className="text-sm text-muted-foreground hover:text-primary transition">
                  Assignments
                </Link>
              </li>
              <li>
                <Link href="/old-questions" className="text-sm text-muted-foreground hover:text-primary transition">
                  Past Papers
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-sm text-muted-foreground hover:text-primary transition">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-foreground">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} {SITE_NAME}. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition">
                Twitter
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition">
                GitHub
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
