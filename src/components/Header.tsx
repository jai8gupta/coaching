"use client"
import React, { useEffect } from 'react'
import { DarkModeToggle } from './DarkModeToggle'
import Link from 'next/link'
import { Award, BookMarkedIcon, BookOpen} from 'lucide-react'
import { Button } from './ui/button'
import { useSession } from 'next-auth/react'
import { signIn, signOut } from "next-auth/react"


const Header = () => {
  const { data: session } = useSession();
  useEffect(() => {
    if (session?.user?.id) {
      createStudentOnClient(session?.user?.id, session?.user?.email!, session?.user?.name?.split(" ")?.[0], session?.user?.name?.split(" ")?.[1], session?.user?.image || "")
    }
  }, [session?.user?.id])

  return  (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
          <div className="flex lg:hidden md:hidden justify-center pt-4 items-center gap-4">
               <Link
                 href="/"
                 prefetch={false}
                 className="flex items-center space-x-2 hover:opacity-90 transition-opacity"
               >
                 <BookOpen className="h-6 w-6 text-primary" />
                 <span className="text-sm lg:text-xl font-bold bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent">
                   The Prototype Studio
                 </span>
               </Link>
   
             </div>
        <div className="flex h-16 items-center justify-between gap-4">
        <div className="flex hidden lg:inline-block md:inline-block items-center gap-4">
               <Link
                 href="/"
                 prefetch={false}
                 className="flex items-center space-x-2 hover:opacity-90 transition-opacity"
               >
                 <BookOpen className="h-6 w-6 text-primary" />
                 <span className="text-sm lg:text-xl font-bold bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent">
                   The Prototype Studio
                 </span>
               </Link>
   
             </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <nav className='hidden md:inline-block lg:inline-block'>
              <Link
                prefetch={false}
                href="/my-courses"
                className="flex space-x-2 items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors md:border md:border-border md:rounded-md md:px-4 md:py-2"
              >
                <BookMarkedIcon className="h-4 w-4" />
                <span className="hidden md:block">My Courses</span>
              </Link>
            </nav>

            <nav className='bg-red-700 rounded-lg h-auto min-w-[200px] text-center'>
              <Link
                prefetch={false}
                href="/codebattles"
                className="flex space-x-2 items-center justify-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors md:border md:border-border md:rounded-md md:px-4 md:py-2"
              >
                <Award
                  color="#000000" className="h-6 w-6" />
                <span className="text-white text-2xl text-center">Battles</span>
              </Link>
            </nav>

            <DarkModeToggle />

            {!session ? (
              <Button onClick={() => {
                signIn("google")
              }}>
                Sign in
              </Button>
            ) : (
              <Button onClick={() => signOut()}>
                Sign Out
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;

async function createStudentOnClient(authId: string, email: string, firstName?: string, lastName?: string, imageUrl?: string) {
  try {
    const response = await fetch("/api/createStudent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ authId, email, firstName, lastName, imageUrl }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating student:", error);
  }
}