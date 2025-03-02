"use client"

import { signIn, signOut } from "next-auth/react"
 
export default function SignInButton() {
  return <>
  <button onClick={() => signIn("google")}>SignIn</button>
  <button onClick={() => signOut()}>SignOut</button>
  </>
  
}