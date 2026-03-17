import Navbar from '@/components/Navbar'
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://your-vercel-app.vercel.app'),
  title: 'VisitLocal — Discover Hidden Gems',
  description: 'A community-curated tourist platform for discovering local places',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
