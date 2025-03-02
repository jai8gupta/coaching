import { defineQuery } from "groq";
import { sanityFetch } from "../live";

export async function getStudentByAuthId(authId: string) {
     const getStudentByAuthIdQuery = defineQuery(`*[_type == "student" && authId == $authId][0]`)
     const student = await sanityFetch({
        query: getStudentByAuthIdQuery,
        params: {authId},
     })

     return student.data;
}