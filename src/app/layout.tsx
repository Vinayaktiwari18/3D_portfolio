import type { Metadata } from 'next'
import {
  Teko,
  Barlow_Condensed,
  Sora,
  Space_Mono,
  Caveat,
} from 'next/font/google'
import './globals.css'

const teko = Teko({
  variable: '--font-teko',
  subsets: ['latin'],
})

const barlowCondensed = Barlow_Condensed({
  variable: '--font-barlow',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const sora = Sora({
  variable: '--font-sora',
  subsets: ['latin'],
})

const spaceMono = Space_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400', '700'],
})

const caveat = Caveat({
  variable: '--font-caveat',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Vinayak Tiwari — YAAR.world',
  description:
    'BCA student building AI systems, voice interfaces, and smart automation. Founder of YAAR.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`
        ${teko.variable}
        ${barlowCondensed.variable}
        ${sora.variable}
        ${spaceMono.variable}
        ${caveat.variable}
        h-full antialiased
      `}
    >
      <body className="min-h-full">{children}</body>
    </html>
  )
}