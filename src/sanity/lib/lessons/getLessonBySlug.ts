import { defineQuery } from "groq";
import { sanityFetch } from "../live";

export async function getLessonBySlug(slug: string) {
  const getLessonBySlug =
    defineQuery(`*[_type == "lesson" && slug.current == $slug][0] {
    ...,
    "module": module->{
      ...,
      "course": course->{...}
    }
  }`);

  const result = await sanityFetch({
    query: getLessonBySlug,
    params: { slug },
  });

  return result.data;
}