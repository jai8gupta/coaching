import Header from "@/components/Header";
import { SanityLive } from "@/sanity/lib/live";
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
