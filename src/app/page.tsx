import { HeroSection } from '@/components/landing/hero'
import { PricingSection } from '@/components/landing/pricing'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary" />
            <span className="font-bold text-xl">MeetSum AI</span>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground">
              Features
            </a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground">
              Pricing
            </a>
            <a href="/auth/login" className="text-sm text-muted-foreground hover:text-foreground">
              Sign In
            </a>
            <a 
              href="/auth/signup" 
              className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Get Started
            </a>
          </div>
        </div>
      </nav>
      
      <HeroSection />
      <PricingSection />
      
      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2026 MeetSum AI. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
