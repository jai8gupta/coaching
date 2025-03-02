import { type SchemaTypeDefinition } from 'sanity'
import { studentType } from './studentType'
import { lessontType } from './lessonType'
import { blockContent } from './blockContent'
import { categoryType } from './categoryType'
import { enrollmentType } from './enrollmentType'
import { lessonCompletionType } from './lessonCompletionType'
import { courseType } from './courseType'
import { instructorType } from './instructorType'
import { moduleType } from './moduleType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    studentType,
    lessontType,
    blockContent,
    categoryType,
    enrollmentType,
    lessonCompletionType,
    courseType,
    instructorType,
    moduleType,
  ],
}
