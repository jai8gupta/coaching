import Header from "@/components/Header";
import { SanityLive } from "@/sanity/lib/live";
import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";

export default function UsertLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <SessionProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
        </div>
        <SanityLive />
      </SessionProvider>
  );
}

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
};