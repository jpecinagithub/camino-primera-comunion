/**
 * Hooks y acciones de progreso — Camino a la Primera Comunión
 * ----------------------------------------------------------------------------
 * Hooks (lectura reactiva con dexie-react-hooks):
 *   useProfile, useLessonProgress, useGameProgress, useQuizProgress,
 *   useNucleusProgress
 * Acciones (escritura):
 *   markLessonComplete, markGameComplete, markQuizComplete,
 *   markNucleusComplete, saveProfile
 *
 * Importar desde: `src/db/hooks.ts`
 */
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from './db';
import type {
  GameProgress,
  LessonProgress,
  ListenedAudio,
  NucleusProgress,
  Profile,
  QuizProgress,
  ResumeState,
} from './db';

/* ------------------------------- Hooks ---------------------------------- */

/** Perfil del niño/a (undefined mientras carga o si aún no existe). */
export function useProfile(): Profile | undefined {
  return useLiveQuery(() => db.profile.get('profile'), []);
}

/** Mapa id → LessonProgress. */
export function useLessonProgress(): Record<string, LessonProgress> {
  const rows = useLiveQuery(() => db.lessons.toArray(), []);
  return toMap(rows, (r) => r.id);
}

/** Mapa id → GameProgress. */
export function useGameProgress(): Record<string, GameProgress> {
  const rows = useLiveQuery(() => db.games.toArray(), []);
  return toMap(rows, (r) => r.id);
}

/** Mapa id → QuizProgress. */
export function useQuizProgress(): Record<string, QuizProgress> {
  const rows = useLiveQuery(() => db.quizzes.toArray(), []);
  return toMap(rows, (r) => r.id);
}

/** Mapa id → NucleusProgress. */
export function useNucleusProgress(): Record<string, NucleusProgress> {
  const rows = useLiveQuery(() => db.nuclei.toArray(), []);
  return toMap(rows, (r) => r.id);
}

/** Mapa lessonSlug → ResumeState (punto de reanudación). */
export function useResume(): Record<string, ResumeState> {
  const rows = useLiveQuery(() => db.resume.toArray(), []);
  return toMap(rows, (r) => r.lessonSlug);
}

/** Mapa audioId → ListenedAudio (audios escuchados hasta el final). */
export function useListened(): Record<string, ListenedAudio> {
  const rows = useLiveQuery(() => db.listened.toArray(), []);
  return toMap(rows, (r) => r.id);
}

/**
 * Id estable de un audio a partir de su src.
 * '/audio/escucha-ser-cristiano.mp3' → 'escucha-ser-cristiano'.
 */
export function audioIdFromSrc(src: string): string {
  const base = src.split('/').pop() ?? src;
  return base.replace(/\.mp3$/i, '');
}

function toMap<T>(rows: T[] | undefined, key: (r: T) => string): Record<string, T> {
  const map: Record<string, T> = {};
  for (const r of rows ?? []) map[key(r)] = r;
  return map;
}

/* ------------------------------ Acciones --------------------------------- */

/** Marca una lección como completada (id = Lesson.id). */
export async function markLessonComplete(lessonId: string): Promise<void> {
  await db.lessons.put({ id: lessonId, completedAt: Date.now() });
}

/** Guarda el resultado de un juego (id = GameMeta.id). */
export async function markGameComplete(
  gameId: string,
  score: number,
  total: number,
): Promise<void> {
  await db.games.put({ id: gameId, completedAt: Date.now(), score, total });
}

/** Guarda el resultado de un quiz (id = quiz.id, p. ej. `quiz:<lessonId>`). */
export async function markQuizComplete(
  quizId: string,
  score: number,
  total: number,
): Promise<void> {
  await db.quizzes.put({ id: quizId, completedAt: Date.now(), score, total });
}

/** Marca un núcleo como completado (id = n1..n10). */
export async function markNucleusComplete(nucleusId: string): Promise<void> {
  await db.nuclei.put({ id: nucleusId, completedAt: Date.now() });
}

/**
 * Guarda el punto de reanudación de una lección (se llama con debounce
 * desde el player; ~500 ms tras cambiar de paso).
 */
export async function saveResume(
  lessonSlug: string,
  stepIndex: number,
): Promise<void> {
  await db.resume.put({ lessonSlug, stepIndex, updatedAt: Date.now() });
}

/** Borra el punto de reanudación (al completar la lección o reiniciarla). */
export async function clearResume(lessonSlug: string): Promise<void> {
  await db.resume.delete(lessonSlug);
}

/**
 * Registra un audio escuchado hasta el final. Idempotente: conserva la
 * primera fecha de escucha completa.
 */
export async function markListened(audioId: string): Promise<void> {
  const existing = await db.listened.get(audioId);
  if (!existing) {
    await db.listened.put({ id: audioId, listenedAt: Date.now() });
  }
}

/**
 * Crea o actualiza el perfil. nickname debe ser un apodo ficticio
 * (la validación de longitud/contenido la hace el equipo de avatar).
 */
export async function saveProfile(nickname: string, avatar: string): Promise<void> {
  const existing = await db.profile.get('profile');
  await db.profile.put({
    id: 'profile',
    nickname,
    avatar,
    createdAt: existing?.createdAt ?? Date.now(),
  });
}
