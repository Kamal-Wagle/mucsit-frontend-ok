import type { MetadataRoute } from "next"
import { NAVIGATION_LINKS } from "@/lib/constants"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mucsit.edu"

  // Static pages
  const staticRoutes = NAVIGATION_LINKS.map((link) => ({
    url: `${baseUrl}${link.href}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: link.href === "/" ? 1 : 0.8,
  }))

  return staticRoutes
}
