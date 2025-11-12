"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setLoading(false)
    setSubmitted(true)

    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send us a Message</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Name</label>
            <Input placeholder="Your name" required />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Email</label>
            <Input type="email" placeholder="your@email.com" required />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Subject</label>
            <Input placeholder="How can we help?" required />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Message</label>
            <textarea
              placeholder="Your message..."
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              rows={5}
              required
            ></textarea>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {loading ? "Sending..." : "Send Message"}
          </Button>

          {submitted && (
            <div className="p-3 bg-green-50 text-green-700 rounded-lg text-sm">
              Thank you! We'll get back to you soon.
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
