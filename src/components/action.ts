"use server"

import { createStudentIfNotExists } from "@/sanity/lib/student/createStudentIfNotExists";
import { Session } from "next-auth";

export const serverAction = (session: Session | null) => {
    if (session?.user?.id) {
        createStudentIfNotExists({
            authId: session?.user?.id,
            email: session?.user?.email!,
            firstName: session?.user?.name?.split(" ")?.[0],
            lastName: session?.user?.name?.split(" ")?.[1],
            imageUrl: session?.user?.image || ""
        })        
    }
}