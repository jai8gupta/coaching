import getCourseBySlugAsId from "@/sanity/lib/courses/getCourseBySlugAsId";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { urlFor } from '@/sanity/lib/image';

interface CoursePageProps {
  params: Promise<{
    courseId: string;
  }>;
}
export const revalidate = 60

export default async function CoursePage({ params }: CoursePageProps) {
  const { courseId } = await params;
  const course = await getCourseBySlugAsId(courseId);  
  if (!course) {
    return redirect("/");
  }

  // Redirect to the first lesson of the first module if available
  if (course.modules[0].lessons[0].slug?.current) {    
    return redirect(
      `/dashboard/courses/${course?.slug?.current}/lessons/${course.modules[0].lessons[0].slug?.current}`
    );
  }

  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Welcome to {course.title}</h2>
        <p className="text-muted-foreground">
          This course has no content yet. Please check back later.
        </p>
      </div>
    </div>
  );
}

export const generateMetadata = async (props: CoursePageProps): Promise<Metadata> => {
  const { courseId } = await props?.params || {};
  const course = await getCourseBySlugAsId(courseId);    
  return {
    title: `${course?.title} – The Prototype Studio`,
    description: course?.description || "Excellet course for beginners and working professionals",
    keywords: course?.keyword || "",
    openGraph: {
      title: `${course?.title} – The Prototype Studio`,
      description: course?.description || "Excellet course for beginners and working professionals",
      url: `https://www.theprototypestudio.in/courses/${courseId}`,
      siteName: "The Prototype Studio",
      images: [
        {
          url: urlFor(course?.image!).url() || "",
          width: 1200,
          height: 630,
          alt: course?.title || "",
        },
      ],
      type: "article",
    },
    twitter: {
      title: `${course?.title} – The Prototype Studio`,
      description:  course?.description || "Excellet course for beginners and working professionals",
      images: [urlFor(course?.image!).url() || ""],
    },
  }
}