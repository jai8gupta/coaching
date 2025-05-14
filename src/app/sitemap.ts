// app/sitemap.ts

import { getCourses } from '@/sanity/lib/courses/getCourses'
import getLessons from '@/sanity/lib/lessons/getLessons'
import { MetadataRoute } from 'next'


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const courses = await getCourses()
    const lessons = await getLessons()
    
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.theprototypestudio.in"
    
    const courseRoutes = courses.map((course) => ({
        url: `${BASE_URL}/courses/${course.slug}`,
        lastModified: course._updatedAt,
    }))

    const lessonRoutes = lessons.map((lesson:any) => ({
        url: `${BASE_URL}/dashboard/courses/${lesson?.course?.slug?.current}/lessons/${lesson?.slug}`,
        lastModified: lesson._updatedAt,
    }))

    return [...lessonRoutes, ...courseRoutes]
}
