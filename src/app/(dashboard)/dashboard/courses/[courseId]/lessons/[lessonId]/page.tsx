import { redirect } from "next/navigation";
import { getLessonById } from "@/sanity/lib/lessons/getLessonById";
import { PortableText } from "@portabletext/react";
import { PortableTextReactComponents } from "@portabletext/react";

interface LessonPageProps {
  params: Promise<{
    courseId: string;
    lessonId: string;
  }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { courseId, lessonId } = await params;

  const lesson = await getLessonById(lessonId);
    console.log("lesson", lesson);
    
  if (!lesson) {
    return redirect(`/dashboard/courses/${courseId}`);
  }
  console.log("lesson.description is", lesson.description);

const components: PortableTextReactComponents = {
  types: {
    image: ({ value }) => (
      <img
        src={value.asset?.url}
        alt={value.alt || "Sanity Image"}
        className="rounded-lg"
      />
    ),
    code: ({ value }) => (
      <pre className="bg-gray-900 text-white p-4 rounded-lg">
        <code>{value.code}</code>
      </pre>
    ),
  },
  block: {
    h1: ({ children }) => <h1 className="text-3xl font-bold">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-semibold">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-medium">{children}</h3>,
    h4: ({ children }) => <h4 className="text-lg font-medium">{children}</h4>,
    normal: ({ children }) => <p className="text-base">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-500 italic pl-4">{children}</blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <span className="underline">{children}</span>,
    code: ({ children }) => (
      <code className="bg-gray-200 text-red-600 p-1 rounded">{children}</code>
    ),
    link: ({ value, children }) => (
      <a href={value.href} className="text-blue-500 underline">
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="mb-2">{children}</li>,
    number: ({ children }) => <li className="mb-2">{children}</li>,
  },
  hardBreak: () => <br />,
  unknownMark: ({ children }) => <span className="text-gray-500">{children}</span>,
  unknownType: ({ value }) => <span className="text-red-500">Unknown type: {JSON.stringify(value)}</span>,
  unknownBlockStyle: ({ children }) => <p className="text-gray-400">{children}</p>,
  unknownList: ({ children }) => <ul className="text-gray-400">{children}</ul>,
  unknownListItem: ({ children }) => <li className="text-gray-400">{children}</li>,
};
;
  
  

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto pt-12 pb-20 px-4">
          <h1 className="text-2xl font-bold mb-4">{lesson.title}</h1>

          {lesson.description && (
            <p className="text-muted-foreground mb-8">{lesson.description}</p>
          )}

          <div className="space-y-8">
            {/* Lesson Content */}
            {lesson.description && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Lesson Notes</h2>
                  <div className="prose prose-blue dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: lesson?.description}} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}