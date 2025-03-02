// pages/api/createStudent.ts
import type { NextApiResponse } from "next";
import { createStudentIfNotExists } from "@/sanity/lib/student/createStudentIfNotExists";

interface CreateStudentProps {
  authId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
}

export async function POST(req: Request) {
 

  const { authId, email, firstName, lastName, imageUrl }: CreateStudentProps = await req.json();
  try {

    console.log("authId", authId);
    
    // First, check if the student exists
   const newStudent = createStudentIfNotExists({ authId, email, firstName, lastName, imageUrl })

    return Response.json({ message: "New student created", student: newStudent });
  } catch (error) {
    return Response.json({ error: "Internal Server Error", details: error });
  }
}
