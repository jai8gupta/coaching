import { redirect } from "next/navigation";
import getCourseBySlugAsId from "@/sanity/lib/courses/getCourseBySlugAsId";
import { Sidebar } from "@/components/dashboard/Sidebar";
export const revalidate = 60

interface CourseLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    courseId: string;
  }>;
}

export default async function CourseLayout({
  children,
  params,
}: CourseLayoutProps) {
  const { courseId } = await params;

  const course = await getCourseBySlugAsId(courseId);

  if (!course) {
    return redirect("/");
  }

  return (
    <div className="h-full">
      <Sidebar course={course} />
      <main className="h-full lg:pt-[64px] pl-20 lg:pl-96">{children}</main>
    </div>
  );
}