"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Library,
  ChevronRight,
  PlayCircle,
  X,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/providers/sidebar-provider";
import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DarkModeToggle } from "../DarkModeToggle";
import { usePathname } from "next/navigation";

interface SidebarProps {
  course: any;
}

export function Sidebar({ course }: SidebarProps) {
  const pathname = usePathname();
  
  const { isOpen, toggle, close } = useSidebar();
  const [openModules, setOpenModules] = useState<string[]>([]);
  if(!course){
    return (
      <></>
    )
  }

  const SidebarContent = () => (
    <div className="h-full flex flex-col">
      <div className="p-4 lg:p-6 border-b flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <Link
            href="/my-courses"
            className="flex items-center gap-x-2 text-sm hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <div className="flex items-center gap-x-2">
              <Library className="h-4 w-4" />
              <span>Course Library</span>
            </div>
          </Link>
          <div className="space-x-2">
            <DarkModeToggle />

            <Button
              onClick={close}
              variant="ghost"
              className="lg:hidden -mr-2"
              size="icon"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2 lg:p-4">
          <Accordion
            type="multiple"
            className="w-full space-y-4"
            value={openModules}
            onValueChange={setOpenModules}
          >
            {course.modules?.map((module: { _id: any; title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | Iterable<ReactNode> | null | undefined; lessons: any[]; }, moduleIndex: number) => (
              <AccordionItem
                key={module._id}
                value={module._id}
                className={cn(
                  "border-none",
                  moduleIndex % 2 === 0 ? "bg-muted/30" : "bg-background"
                )}
              >
                <AccordionTrigger className="px-2 py-2 hover:no-underline transition-colors">
                  <div className="flex items-center gap-x-2 lg:gap-x-4 w-full">
                    <span className="text-sm font-medium text-muted-foreground min-w-[28px]">
                      {String(moduleIndex + 1).padStart(2, "0")}
                    </span>
                    <div className="flex flex-col gap-y-1 text-left flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {module.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {module.lessons?.length || 0} lessons
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2">
                  <div className="flex flex-col space-y-1">
                    {module.lessons?.map((lesson, lessonIndex) => {
                      const isActive =
                        pathname ===
                        `/dashboard/courses/${course?.slug?.current}/lessons/${lesson?.slug?.current}`;
                      return (
                        <Link
                          key={lesson?.slug?.current}
                          prefetch={false}
                          href={`/dashboard/courses/${course?.slug?.current}/lessons/${lesson?.slug?.current}`}
                          onClick={close}
                          className={cn(
                            "flex items-center pl-8 lg:pl-10 pr-2 lg:pr-4 py-2 gap-x-2 lg:gap-x-4 group hover:bg-muted/50 transition-colors relative",
                            isActive && "bg-muted",
                          )}
                        >
                          <span className="text-xs font-medium text-muted-foreground min-w-[28px]">
                            {String(lessonIndex + 1).padStart(2, "0")}
                          </span>
                            <PlayCircle
                              className={cn(
                                "h-4 w-4 shrink-0",
                                isActive
                                  ? "text-primary"
                                  : "text-muted-foreground group-hover:text-primary/80"
                              )}
                            />
                          <span
                            className={cn(
                              "text-sm line-clamp-2 min-w-0",
                            )}
                          >
                            {lesson.title}
                          </span>
                          {isActive && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-8 bg-primary" />
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </ScrollArea>
    </div>
  );

  return (
    <>
      {/* Thin Mobile Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 flex flex-col items-center w-[60px] border-r bg-background lg:hidden py-4 gap-y-4">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/" prefetch={false}>
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <Library className="h-5 w-5" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Course Library</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={toggle}
                variant="ghost"
                size="icon"
                className="h-10 w-10"
              >
                <ChevronRight
                  className={cn(
                    "h-5 w-5 transition-transform",
                    isOpen && "rotate-180"
                  )}
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Toggle Sidebar</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </aside>

      {/* Main Sidebar - Desktop & Mobile */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 bg-background transition-all duration-300 ease-in-out",
          "lg:z-50 lg:block lg:w-96 lg:border-r",
          isOpen
            ? "w-[calc(100%-60px)] translate-x-[60px] lg:translate-x-0 lg:w-96"
            : "translate-x-[-100%] lg:translate-x-0"
        )}
      >
        <div className="h-full">
          <SidebarContent />
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={close}
        />
      )}
    </>
  );
}