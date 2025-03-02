import { SidebarProvider } from "@/components/providers/sidebar-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { SanityLive } from "@/sanity/lib/live";
import { SessionProvider } from "next-auth/react";
export const revalidate = 60

export default function DashbardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SessionProvider>
            <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
                <SidebarProvider>
                    <div className="h-full">{children}</div>
                </SidebarProvider>
            </ThemeProvider>
            <SanityLive />
        </SessionProvider>
    );
}
