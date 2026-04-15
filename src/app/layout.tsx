import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "./auth/auth-provider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "MeetSum AI - Meeting Summaries in Seconds",
  description: "AI-powered meeting summarization. Upload your recording, get professional summaries with key decisions and action items.",
  keywords: ["meeting", "summarizer", "AI", "transcription", "notes", "productivity"],
  openGraph: {
    title: "MeetSum AI",
    description: "Turn meeting chaos into crystal clarity with AI-powered summaries.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
