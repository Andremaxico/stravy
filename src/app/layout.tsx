import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Navbar } from './components/Navbar'
import { getRGBColor, getAccessibleColor } from '@/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

const primaryColor = getRGBColor("#6231af", "primary")
const a11yColor = getRGBColor(getAccessibleColor("#6231af"), "a11y")

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ua">
      <body className={inter.className}>
        <Navbar />
        <main className="prose prose-xl prose-slate dark:prose-invert pt-20 min-h-screen w-full absolute top-0 bg-white">
          {children}
        </main>
      </body>
    </html>
  )
}
