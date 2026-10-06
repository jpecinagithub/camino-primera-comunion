import type { Lesson } from '../model';
import { LESSONS_PART1 } from './part1';
import { LESSONS_PART2 } from './part2';

/** Las 15 lecciones del MVP, en orden del itinerario. */
export const LESSONS: Lesson[] = [...LESSONS_PART1, ...LESSONS_PART2];

export function getLessonBySlug(slug: string): Lesson | undefined {
  return LESSONS.find((l) => l.slug === slug);
}

export function getLessonById(id: string): Lesson | undefined {
  return LESSONS.find((l) => l.id === id);
}

export function getLessonsByNucleus(nucleusId: string): Lesson[] {
  return LESSONS.filter((l) => l.nucleusId === nucleusId);
}

/** Mapa nucleusId -> ids de lección (derivado; nuclei.ts mantiene lessonIds: []). */
export function nucleusLessonIds(nucleusId: string): string[] {
  return getLessonsByNucleus(nucleusId).map((l) => l.id);
}
