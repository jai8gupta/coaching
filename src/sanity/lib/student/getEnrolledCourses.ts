import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live"


export const getEnrolledCourses = async (authId: string) => {
    const getEnrolledCoursesQuery =
    defineQuery(`*[_type == "student" && authId == $authId][0] {
    "enrolledCourses": *[_type == "enrollment" && student._ref == ^._id] {
      ...,
      "course": course-> {
        ...,
        "slug": slug.current,
        "category": category->{...},
        "instructor": instructor->{...}
      }
    }
  }`);

  const result = await sanityFetch({
    query: getEnrolledCoursesQuery,
    params: { authId },
  });

  return result?.data?.enrolledCourses || [];


}

