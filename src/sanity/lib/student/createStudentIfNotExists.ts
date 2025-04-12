import groq from "groq";
import { client } from "../adminClient";
import { sanityFetch } from "../live";

interface CreateStudentProps {
    authId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
}

export async function createStudentIfNotExists({
  authId,
  email,
  firstName,
  lastName,
  imageUrl,
}: CreateStudentProps) {
  // First check if student exists
  const existingStudentQuery = await sanityFetch({
    query: groq`*[_type == "student" && authId == $authId][0]`,
    params: { authId },
  });

  if (existingStudentQuery.data) {
    return existingStudentQuery.data;
  }

  // If no student exists, create a new one
  const newStudent = await client.create({
    _type: "student",
    authId,
    email,
    firstName,
    lastName,
    imageUrl,
  });

  return newStudent;
}