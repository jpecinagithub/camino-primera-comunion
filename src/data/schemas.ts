/**
 * Schemas Zod espejo del modelo — Camino a la Primera Comunión
 * ----------------------------------------------------------------------------
 * Todo contenido (lecciones, núcleos) debe validarse con estos schemas antes
 * de integrarse. Usar `validateLesson` / `validateNucleus`.
 *
 * Importar desde: `src/data/schemas.ts`
 */
import { z } from 'zod';
import type {
  ContentBlock,
  FamilyBlock,
  Lesson,
  Nucleus,
  ParentNotes,
  Prayer,
  Quiz,
  QuizQuestion,
} from './model';

export const BlockKindSchema = z.enum(['descubre', 'escucha', 'piensa', 'reza']);

export const ContentBlockSchema = z.object({
  id: z.string().min(1),
  kind: BlockKindSchema,
  title: z.string().min(1),
  paragraphs: z.array(z.string().min(1)).min(1),
  imageLabel: z.string().optional(),
});

export const QuizQuestionSchema = z.object({
  id: z.string().min(1),
  question: z.string().min(1),
  options: z.array(z.string().min(1)).min(2),
  correctIndex: z.number().int().min(0),
  hint: z.string().min(1),
  explanation: z.string().min(1),
}).refine((q) => q.correctIndex < q.options.length, {
  message: 'correctIndex debe apuntar a una opción existente',
  path: ['correctIndex'],
});

export const QuizSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  questions: z.array(QuizQuestionSchema).min(1),
});

export const PrayerSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  lines: z.array(z.string().min(1)).min(1),
});

export const FamilyBlockSchema = z.object({
  activityTitle: z.string().min(1),
  activity: z.string().min(1),
});

export const ParentNotesSchema = z.object({
  oneMinute: z.string().min(1),
  fiveMinutes: z.array(z.string().min(1)).min(1),
  familyQuestions: z.array(z.string().min(1)).min(1),
  dailyExample: z.string().min(1),
  familyActivity: z.string().min(1),
  familyPrayer: z.array(z.string().min(1)).min(1),
});

export const LessonSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, 'slug en minúsculas con guiones'),
  title: z.string().min(1),
  subtitle: z.string().min(1),
  nucleusId: z.string().min(1),
  estimatedMinutes: z.number().int().positive(),
  objectives: z.array(z.string().min(1)).min(1),
  blocks: z.array(ContentBlockSchema).min(1),
  gameIds: z.array(z.string().min(1)),
  quiz: QuizSchema,
  prayer: PrayerSchema,
  family: FamilyBlockSchema,
  parentNotes: ParentNotesSchema,
});

export const NucleusSchema = z.object({
  id: z.string().min(1),
  number: z.number().int().min(1).max(10),
  title: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().min(1),
  color: z.string().min(1),
  lessonIds: z.array(z.string().min(1)),
});

// Tipos inferidos (equivalentes a los de model.ts; model.ts manda)
export type LessonInput = z.infer<typeof LessonSchema>;
export type NucleusInput = z.infer<typeof NucleusSchema>;
export type ContentBlockInput = z.infer<typeof ContentBlockSchema>;
export type QuizQuestionInput = z.infer<typeof QuizQuestionSchema>;
export type QuizInput = z.infer<typeof QuizSchema>;
export type PrayerInput = z.infer<typeof PrayerSchema>;
export type FamilyBlockInput = z.infer<typeof FamilyBlockSchema>;
export type ParentNotesInput = z.infer<typeof ParentNotesSchema>;

// Re-export de tipos canónicos para quien prefiera un solo import
export type {
  ContentBlock,
  FamilyBlock,
  Lesson,
  Nucleus,
  ParentNotes,
  Prayer,
  Quiz,
  QuizQuestion,
};

/** Valida una lección. Devuelve el resultado de safeParse (ok / error). */
export function validateLesson(data: unknown) {
  return LessonSchema.safeParse(data);
}

/** Valida un núcleo. Devuelve el resultado de safeParse (ok / error). */
export function validateNucleus(data: unknown) {
  return NucleusSchema.safeParse(data);
}
