import { sanityFetch } from "../live";
import { defineQuery } from "groq";

async function getCourseBySlugAsId(slug: string) {
  const getCourseBySlugAsId =
    defineQuery(`*[_type == "course" && slug.current == $slug][0] {
      ...,  // Spread all course fields
      "category": category->{...},  // Expand the category reference, including all its fields
      "instructor": instructor->{...},  // Expand the instructor reference, including all its fields
      "modules": modules[]-> {  // Expand the array of module references
        ...,  // Include all module fields
        "lessons": lessons[]-> {...}  // For each module, expand its array of lesson references
      }
    }`);

  const course = await sanityFetch({
    query: getCourseBySlugAsId,
    params: { slug },
  });

  // Return just the data portion of the response
  return course.data;
}

export default getCourseBySlugAsId;