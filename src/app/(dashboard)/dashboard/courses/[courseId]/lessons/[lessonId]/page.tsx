import { redirect } from "next/navigation";
import { Metadata } from "next";
import getCourseBySlugAsId from "@/sanity/lib/courses/getCourseBySlugAsId";
import { urlFor } from "@/sanity/lib/image";
import { getLessonBySlug } from "@/sanity/lib/lessons/getLessonBySlug";
export const revalidate = 60

interface LessonPageProps {
  params: Promise<{
    courseId: string;
    lessonId: string;
  }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { courseId, lessonId } = await params;  
  const lesson = await getLessonBySlug(lessonId);
    
  if (!lesson) {
    return <>
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto pt-12 pb-20 px-4">
          <h1 className="text-2xl font-bold mb-4">We will be back soon</h1>
        </div>
      </div>
    </div>
    </>
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto pt-12 pb-20 px-4">
          <h1 className="text-2xl font-bold mb-4">{lesson?.title}</h1>

          {lesson?.description && (
            <p className="text-muted-foreground mb-8">{lesson?.description}</p>
          )}

          <div className="space-y-8">
            {/* Lesson Content */}
            {lesson?.content && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Lesson Notes</h2>
                  <div className="prose prose-blue dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: lesson?.content!}} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const generateMetadata = async (props: LessonPageProps): Promise<Metadata> => {
  const { courseId, lessonId } = await props?.params || {};
  const course = await getCourseBySlugAsId(courseId);  
  
  return {
    title: `${course?.title} – The Prototype Studio`,
    description: course?.description || "Excellet course for beginners and working professionals",
    keywords: course?.keyword || "",
    openGraph: {
      title: `${course?.title} – The Prototype Studio`,
      description: course?.description || "Excellet course for beginners and working professionals",
      url: `https://www.theprototypestudio.in/courses/${courseId}/lessons/${lessonId}`,
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