import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react"
import { GoogleAnalytics } from '@next/third-parties/google'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const dynamic = 'force-dynamic'
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning >
      <head>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3975528961034908" crossOrigin="anonymous"></script>
      <meta name="google-site-verification" content="oHu1fiBxqSIipUJawcsibGx9TDvKiKiOT6F1KGXyUMs" />
      <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17096238637">
      </script>
      <GoogleAnalytics gaId="AW-17096238637" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Analytics />
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        {children}
          </ThemeProvider>
      </body>
    </html>
  );
}
