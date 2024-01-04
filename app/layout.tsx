import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'


import './globals.css'
import { ModelProvider } from '@/providers/model-provider'
import { ToastProvider } from '@/providers/toast-provider'
import { ThemeProvider } from '@/providers/themeProvider'



const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Dashboard',
  description: 'E-Commerce Dashboard',
  equiv:"Content-Security-Policy",
  content:"default-src *; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval'"
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {



  return (
    <ClerkProvider  Set-Cookie={{
      cookieOptions: {
        sameSite: 'Lax',
        preload:true,
        secure: true
      }
    }}>
      <html lang="en">
      
        <body className={inter.className}>
          <ThemeProvider attribute='class' defaultTheme='dark' enableSystem >
          <ToastProvider />
        <ModelProvider />
        {children} 
        </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}