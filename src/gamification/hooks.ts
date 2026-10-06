/**
 * Gamificación positiva — Camino a la Primera Comunión
 * ----------------------------------------------------------------------------
 * Todo deriva SOLO del progreso local (hooks de `src/db/hooks.ts`).
 * No se crean tablas nuevas, no hay rankings ni competición, ni rachas
 * punitivas, ni temporizadores, ni loot boxes, ni monedas.
 *
 *   useStars()      nº de lecciones completadas (estrellas)
 *   useVitral()     núcleos completados → piezas del vitral (10)
 *   useGarden()     juegos completados → flores del jardín (12)
 *   useFootprints() lecciones completadas en orden de finalización
 *   useBadges()     insignias por hitos
 *
 * Las funciones puras (compute*) se exportan para tests.
 * Importar desde: `src/gamification/hooks.ts`
 */
import {
  useGameProgress,
  useLessonProgress,
  useNucleusProgress,
  useQuizProgress,
} from '../db/hooks';
import { NUCLEI } from '../data/nuclei';
import type { Badge } from './model';

/** Nº total de lecciones del itinerario (plan de contenido de la app). */
export const TOTAL_LESSONS = 15;

/** Nº de flores del jardín (semillas que crecen con cada juego completado). */
export const GARDEN_SLOTS = 12;

export function countCompleted(map: Record<string, unknown>): number {
  return Object.keys(map).length;
}

/** ids completados ordenados por fecha de finalización (ascendente). */
export function completedInOrder(
  map: Record<string, { completedAt: number }>,
): string[] {
  return Object.entries(map)
    .sort((a, b) => a[1].completedAt - b[1].completedAt)
    .map(([id]) => id);
}

/* ---------------------------------- Hooks --------------------------------- */

/** Nº de estrellas = nº de lecciones completadas. */
export function useStars(): number {
  return countCompleted(useLessonProgress());
}

/**
 * Piezas del vitral: un booleano por cada núcleo (NUCLEI), true si completado.
 */
export function useVitral(): boolean[] {
  const nuclei = useNucleusProgress();
  return NUCLEI.map((n) => n.id in nuclei);
}

/** Flores del jardín: una por juego completado, hasta GARDEN_SLOTS. */
export function useGarden(): number {
  return Math.min(countCompleted(useGameProgress()), GARDEN_SLOTS);
}

/** Huellas del camino: ids de lección en orden de finalización. */
export function useFootprints(): string[] {
  return completedInOrder(useLessonProgress());
}

/** Insignias desbloqueadas por hitos (ver computeBadges). */
export function useBadges(): Badge[] {
  return computeBadges(
    countCompleted(useLessonProgress()),
    countCompleted(useGameProgress()),
    countCompleted(useQuizProgress()),
    countCompleted(useNucleusProgress()),
  );
}

/* ------------------------------ Insignias --------------------------------- */

/**
 * Calcula las insignias a partir de los conteos. Función pura: los hooks
 * le pasan los conteos y los tests pueden invocarla directamente.
 */
export function computeBadges(
  lessons: number,
  games: number,
  quizzes: number,
  nuclei: number,
): Badge[] {
  const badges: Badge[] = [
    {
      id: 'primera-leccion',
      title: 'Primera estrella',
      hint: 'Completa tu primera lección',
      icon: 'Star',
      unlocked: lessons >= 1,
    },
    {
      id: 'cinco-lecciones',
      title: 'Explorador',
      hint: 'Completa 5 lecciones',
      icon: 'Compass',
      unlocked: lessons >= 5,
    },
    {
      id: 'primer-juego',
      title: 'Jugador alegre',
      hint: 'Juega a tu primer juego',
      icon: 'Gamepad2',
      unlocked: games >= 1,
    },
    {
      id: 'primer-quiz',
      title: 'Buena memoria',
      hint: 'Responde tu primer quiz',
      icon: 'Brain',
      unlocked: quizzes >= 1,
    },
    {
      id: 'nucleo-completo',
      title: 'Constructor',
      hint: 'Completa un núcleo entero',
      icon: 'Church',
      unlocked: nuclei >= 1,
    },
    {
      id: 'todo-el-camino',
      title: '¡Todo el camino!',
      hint: `Completa las ${TOTAL_LESSONS} lecciones`,
      icon: 'Award',
      unlocked: lessons >= TOTAL_LESSONS,
    },
  ];
  return badges;
}
