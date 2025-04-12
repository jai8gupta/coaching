import { redirect } from "next/navigation";
import getCourseById from "@/sanity/lib/courses/getCourseById";
// import { Sidebar } from "@/components/dashboard/Sidebar";
import { auth } from "../../../../../../auth";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { checkCourseAccess } from "@/lib/checkCourseAuth";
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
  const session = await auth();
  const { courseId } = await params;

  if (!session?.user?.id) {
    return redirect("/");
  }

  const authResult = await checkCourseAccess(session?.user?.id || null, courseId);
  if (!authResult.isAuthorized || !session?.user?.id) {
    return redirect(authResult.redirect!);
  }

  const course = await getCourseById(courseId);

  if (!course) {
    return redirect("/my-courses");
  }

  return (
    <div className="h-full">
      <Sidebar course={course} />
      <main className="h-full lg:pt-[64px] pl-20 lg:pl-96">{children}</main>
    </div>
  );
}