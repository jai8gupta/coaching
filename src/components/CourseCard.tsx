import Link from 'next/link';
import React from 'react'
import { GetCoursesQueryResult } from '../../sanity.types';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { Loader } from './loader';
import { BookOpen } from 'lucide-react';
interface CourseCardProps {
    course: GetCoursesQueryResult[number];
    href: string
}

const CourseCard = (props: CourseCardProps) => {
  const { course, href } = props || {};
    return (
      <Link
      href={href || "/"}
      prefetch={false}
      className="group hover:no-underline flex"
    >
      
    </Link>
    )
}

export default CourseCard
