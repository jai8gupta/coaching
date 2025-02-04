import type { Metadata } from "next";
import "./globals.css"

export const metadata: Metadata = {
  title: "The Prototype Studio - Learn, Innovate, Succeed",
  description: "Empowering learners with hands-on coaching in tech, design, and innovation.",
  keywords: "coaching, tech coaching, design learning, innovation, The Prototype Studio, skill development",
  authors: [{name: "The Prototype Studio"}],
  openGraph: {
    title: "The Prototype Studio - Learn, Innovate, Succeed",
    description: "Join The Prototype Studio to master technology, design, and innovation with expert coaching.",
    url: "https://theprototypestudio.com",
    siteName: "The Prototype Studio",
    images: [
      {
        url: "/logo.webp",
        width: 1200,
        height: 630,
        alt: "The Prototype Studio Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Prototype Studio - Learn, Innovate, Succeed",
    description: "Master cutting-edge skills with expert coaching at The Prototype Studio.",
    images: ["https://theprototypestudio.com/twitter-image.jpg"],
  },
  icons: {
    icon: { url: '/favicon.ico' },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
