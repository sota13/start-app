import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import QueryProvider from '@/trpc-client/QueryProvider'
import { AuthProvider } from '@/context/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Starter Next App',
  description: 'nextjs poilerplate app with full authentication functionality, database setup, and redux',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
