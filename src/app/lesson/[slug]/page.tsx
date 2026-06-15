import { notFound } from "next/navigation";
import { LessonView } from "@/components/LessonView";
import { ROADMAP, findLesson, adjacentLessons } from "@/data/roadmap";

export function generateStaticParams() {
  return ROADMAP.flatMap((s) => s.lessons.map((l) => ({ slug: l.slug })));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const found = findLesson(params.slug);
  return { title: found ? `${found.lesson.title} · Compose Quest` : "Lesson · Compose Quest" };
}

export default function LessonPage({ params }: { params: { slug: string } }) {
  const found = findLesson(params.slug);
  if (!found) notFound();
  const { prev, next } = adjacentLessons(params.slug);

  return (
    <LessonView
      lesson={found.lesson}
      stage={found.stage}
      prevSlug={prev?.slug ?? null}
      nextSlug={next?.slug ?? null}
    />
  );
}
