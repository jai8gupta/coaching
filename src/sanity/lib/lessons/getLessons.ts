import { defineQuery } from "groq";
import { sanityFetch } from "../live";

const getLessons = async () => {
    const lesson = defineQuery(`*[_type == "lesson"]{
  _id,
  "slug": slug.current,
  _updatedAt,
  "course": course->{...}
}`)

  const result = await sanityFetch({
    query: lesson,
  });
  return result.data
}

export default getLessons;