import { isEnrolledInCourse } from "@/sanity/lib/student/isEnrolledInCourse";
import getCourseBySlugAsId from "@/sanity/lib/courses/getCourseBySlugAsId";
import { getStudentByAuthId } from "@/sanity/lib/student/getStudentByAuthId";

interface AuthResult {
  isAuthorized: boolean;
  redirect?: string;
  studentId?: string;
}

export async function checkCourseAccess(
  clerkId: string | null,
  courseId: string
): Promise<AuthResult> {
  if (!clerkId) {
    return {
      isAuthorized: false,
      redirect: "/",
    };
  }

  const student = await getStudentByAuthId(clerkId);
  if (!student?._id) {
    return {
      isAuthorized: false,
      redirect: "/",
    };
  }

  const isEnrolled = await isEnrolledInCourse(clerkId, courseId);
  const course = await getCourseBySlugAsId(courseId);
  if (!isEnrolled) {
    return {
      isAuthorized: false,
      redirect: `/courses/${course?.slug?.current}`,
    };
  }

  return {
    isAuthorized: true,
    studentId: student?._id,
  };
}