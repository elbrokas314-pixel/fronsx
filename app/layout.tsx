import type { Metadata, Viewport } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import MobileBottomNav from '@/components/MobileBottomNav'
import PWAInstallPrompt from '@/components/PWAInstallPrompt'
import OfflineIndicator from '@/components/OfflineIndicator'

export const metadata: Metadata = {
  title: 'DeliveryApp - Tu ciudad a tu puerta',
  description: 'La plataforma líder de delivery hiperlocal en Barranquilla. Conecta vendedores, compradores y mensajeros.',
  keywords: 'delivery, barranquilla, comida, local, envios',
  authors: [{ name: 'DeliveryApp' }],
  creator: 'DeliveryApp',
  publisher: 'DeliveryApp',
  applicationName: 'DeliveryApp',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'DeliveryApp',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: 'DeliveryApp',
    title: 'DeliveryApp - Tu ciudad a tu puerta',
    description: 'La plataforma líder de delivery hiperlocal en Barranquilla',
    images: ['/icons/icon-512x512.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DeliveryApp - Tu ciudad a tu puerta',
    description: 'La plataforma líder de delivery hiperlocal en Barranquilla',
    images: ['/icons/icon-512x512.png'],
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/vite.svg',
    shortcut: '/vite.svg',
    apple: '/icons/icon-192x192.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#2563eb',
  width: 'device-width',
  initialScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="min-h-screen pb-safe">
        <Navbar />
        <MobileBottomNav />
        <PWAInstallPrompt />
        <OfflineIndicator />
        {children}
      </body>
    </html>
  )
}