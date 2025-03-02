import { defineQuery } from "groq";
import { sanityFetch } from "../live";

export async function getCourseBySlug(slug: string) {
    const getCourseBySlugQuery = defineQuery(`*[_type == "course" && slug.current == $slug][0] {
        ...,
        "slug": slug.current,
        "category": category->{...},
        "instructor": instructor->{...},
        "modules": modules[]->{
        ...,
        "lessons": lessons[]->{...}
        }
        }`)

    const courses = await sanityFetch({ query: getCourseBySlugQuery, params: { slug } });
    return courses.data;
}