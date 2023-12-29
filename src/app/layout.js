import { Inter } from 'next/font/google'
import './globals.css'
import { appConfig } from '@/utils/config'

const inter = Inter({ subsets: ['latin'] })


export const metadata = {
  title: {
    default: appConfig.app.appName,
    template: `%s | ${appConfig.app.appName}`
  },
  description: appConfig.app.appName,
  icon: {
    icon: ['/fevicon.png?v=1'],
    apple: ['/fevicon.png?v=4'],
    shortcut: ['/fevicon.png?v=4']
  },


  manifest: '/site.webmanifest'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  )
}
