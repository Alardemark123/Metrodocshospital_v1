import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-poppins" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://metrodocshospital.com'),
  title: {
    default: 'metrodocshospital | Compassionate Care for Every Life',
    template: '%s | metrodocshospital',
  },
  description: 'Delivering modern healthcare with trusted medical professionals. Find doctors, explore departments, and access quality medical care.',
  generator: 'Apglobalitsolutioninc',
  keywords: ['hospital', 'healthcare', 'medical', 'doctors', 'emergency care', 'departments'],
  openGraph: {
    type: 'website',
    title: 'metrodocshospital | Compassionate Care for Every Life',
    description: 'Delivering modern healthcare with trusted medical professionals. Find doctors, explore departments, and access quality medical care.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'metrodocshospital | Compassionate Care for Every Life',
    description: 'Delivering modern healthcare with trusted medical professionals.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#66b539',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} font-sans antialiased`} suppressHydrationWarning>
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
