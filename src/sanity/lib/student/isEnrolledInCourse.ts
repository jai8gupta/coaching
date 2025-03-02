import groq from "groq";
import { sanityFetch } from "../live";

export async function isEnrolledInCourse(authId: string, courseId: string) {
  try {
    // First get the student document using authId
    const studentQuery = groq`*[_type == "student" && authId == $authId][0]._id`;
    const studentId = await sanityFetch({
      query: studentQuery,
      params: { authId },
    });

    if (!studentId) {
      console.log("No student found with authId:", authId);
      return false;
    }

    // Then check for enrollment using the student's Sanity document ID
    const enrollmentQuery = groq`*[_type == "enrollment" && student._ref == $studentId && course._ref == $courseId][0]`;
    const enrollment = await sanityFetch({
      query: enrollmentQuery,
      params: { studentId: studentId.data, courseId },
    });

    return !!enrollment.data;
  } catch (error) {
    console.error("Error checking enrollment status:", error);
    return false;
  }
}