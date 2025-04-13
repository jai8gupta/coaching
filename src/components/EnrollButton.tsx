"use client"
import { CheckCircle } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useTransition } from 'react'
import CTADrawer from './CTADrawer';
import { signIn } from "next-auth/react"

interface Props {
    courseId: string;
    isEnrolled: boolean;
    price: number
}

const EnrollButton = (props: Props) => {
    const { courseId, isEnrolled, price} = props;
    const { data: session, status } = useSession();
    const [isPending, startTransition] = useTransition();
   

    if (status === 'loading' || isPending) {
        return (
          <div className="w-full h-12 rounded-lg bg-gray-100 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-gray-400 border-t-gray-600 rounded-full animate-spin" />
          </div>
        );
      }
    
      if(!session?.user?.id){
        return <>
        <span
        onClick={() => signIn("google")}
            className={`w-full rounded-lg px-6 py-3 font-medium transition-all duration-300 ease-in-out relative h-12
            ${isPending || !session?.user?.id
                    ? "bg-gray-100 text-black cursor-pointer  hover:scale-100"
                    : "bg-white text-black hover:scale-105 hover:shadow-lg hover:shadow-black/10"
                }
        `}
        >
          <span className={`${isPending ? "opacity-0" : "opacity-100"}`}>
              Sign in to Enroll For Free
          </span>
        </span>
        </>
      }

    if (isEnrolled || Number(price) === 0) {
        return (
          <Link
            prefetch={false}
            href={`/dashboard/courses/${courseId}`}
            className="w-full rounded-lg px-6 py-3 font-medium bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 transition-all duration-300 h-12 flex items-center justify-center gap-2 group"
          >
            <span>Access Course</span>
            <CheckCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </Link>
        );
      }
    
    return (
        <span
            className={`w-full rounded-lg px-6 py-3 font-medium transition-all duration-300 ease-in-out relative h-12
            ${isPending || !session?.user?.id
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed hover:scale-100"
                    : "bg-white text-black hover:scale-105 hover:shadow-lg hover:shadow-black/10"
                }
        `}
        >
            {!session?.user?.id ? (
                <span className={`${isPending ? "opacity-0" : "opacity-100"}`}>
                    Sign in to Enroll
                </span>
            ) : (
                <span className={`${isPending ? "opacity-0" : "opacity-100"}`}>
                    <CTADrawer />
                </span>
            )}
            {isPending && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-gray-400 border-t-gray-600 rounded-full animate-spin" />
                </div>
            )}
        </span>
    )
}

export default EnrollButton
