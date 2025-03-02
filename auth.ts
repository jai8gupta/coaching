import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { UpstashRedisAdapter } from "@auth/upstash-redis-adapter"
import { Redis } from "@upstash/redis"
 
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
})
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  adapter: UpstashRedisAdapter(redis) ,
  session: {
    strategy: "database"
  },
  callbacks: {
    jwt({token, user}) {
        return token;
    },
    session({ session, token }) {
        return session
      },
  }
})