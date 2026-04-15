'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Mic, Zap, Shield, Clock } from 'lucide-react'
import Link from 'next/link'

const features = [
  {
    icon: Mic,
    title: 'AI-Powered Transcription',
    description: 'Whisper-powered accuracy captures every word from any meeting platform.',
  },
  {
    icon: Zap,
    title: 'Instant Summaries',
    description: 'GPT-4 generates actionable summaries in seconds, not hours.',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'SOC 2 compliant. Your data never trains our models.',
  },
  {
    icon: Clock,
    title: 'Save 2+ Hours Weekly',
    description: 'Stop manual note-taking. Focus on what matters.',
  },
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
      
      <div className="container relative mx-auto px-4 py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center rounded-full border bg-background px-4 py-1 text-sm">
            <span className="mr-2 h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            Now in Public Beta
          </div>
          
          {/* Headline */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Turn Meeting Chaos into
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              {' '}Crystal Clarity
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="mb-8 text-lg text-muted-foreground sm:text-xl">
            Upload your meeting recording. Get professional summaries with key decisions, 
            action items, and insights — powered by AI in seconds.
          </p>
          
          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Start Free — No Credit Card
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Watch Demo
              </Button>
            </Link>
          </div>
          
          {/* Social proof */}
          <p className="mt-8 text-sm text-muted-foreground">
            Joined by 500+ professionals from
            <span className="font-medium"> Stripe, Notion, Linear</span>
          </p>
        </div>
        
        {/* Feature cards */}
        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} className="border-primary/10 bg-gradient-to-b from-primary/5">
              <CardContent className="pt-6">
                <feature.icon className="mb-4 h-10 w-10 text-primary" />
                <h3 className="mb-2 font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
