import { redirect } from "next/navigation";
import Link from "next/link";
import { GraduationCap } from "lucide-react";
import CourseCard from "@/components/CourseCard";
import { auth } from "../../../../auth";
import { getEnrolledCourses } from "@/sanity/lib/student/getEnrolledCourses";
export const revalidate = 60

export default async function MyCoursesPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return redirect("/");
  }

  const enrolledCourses = await getEnrolledCourses(session?.user?.id);

  return (
    <div className="h-full pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <GraduationCap className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">My Courses</h1>
        </div>

        {enrolledCourses.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">No courses yet</h2>
            <p className="text-muted-foreground mb-8">
              You haven&apos;t enrolled in any courses yet. Browse our courses
              to get started!
            </p>
            <Link
              href="/"
              prefetch={false}
              className="inline-flex items-center justify-center rounded-lg px-6 py-3 font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {enrolledCourses.map((item: any) => {
              if (!item || !item.course) return null;

              return (
                <CourseCard
                  key={item.course._id}
                  course={item.course}
                  progress={item.progress}
                  href={`/dashboard/courses/${item.course._id}`}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}