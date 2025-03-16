import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'R7Dital - Análise de Licitação',
  description:
    'Aplicação Web da R7Dital para análise de licitações de produtos de informática',
  openGraph: {
    title: 'R7Dital - Análise de Licitação',
    description:
      'Aplicação Web da R7Dital para análise de licitações de produtos de informática',
    url: 'https://licitacao-three.vercel.app',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1400,
        height: 440,
        alt: 'R7Dital - Análise de Licitação',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className='overflow-x-hidden'>{children}</body>
    </html>
  )
}
