/**
 * Base de datos local (IndexedDB via Dexie) — Camino a la Primera Comunión
 * ----------------------------------------------------------------------------
 * Privacidad infantil: SOLO se guarda el apodo ficticio y el avatar elegido,
 * más el progreso (qué se completó y cuándo). Nada de datos personales,
 * nada sale del dispositivo.
 *
 * Importar desde: `src/db/db.ts`
 */
import Dexie, { type Table } from 'dexie';

/** Lección completada. */
export interface LessonProgress {
  /** id de la Lesson (ver src/data/model.ts) */
  id: string;
  completedAt: number; // epoch ms
}

/** Juego completado con puntuación. */
export interface GameProgress {
  /** id del juego (ver src/games/registry.ts) */
  id: string;
  completedAt: number;
  score: number;
  total: number;
}

/** Quiz completado con puntuación. */
export interface QuizProgress {
  /** id del quiz (normalmente `quiz:<lessonId>`) */
  id: string;
  completedAt: number;
  score: number;
  total: number;
}

/** Núcleo completado (todas sus lecciones). */
export interface NucleusProgress {
  /** id del núcleo: n1..n10 */
  id: string;
  completedAt: number;
}

/**
 * Perfil del niño/a. Un único registro con id 'profile'.
 * nickname = apodo FICTICIO elegido por el niño/a. avatar = clave del
 * avatar local (ver equipo de avatar). NUNCA nombre real ni fotos.
 */
export interface Profile {
  id: 'profile';
  nickname: string;
  avatar: string;
  createdAt: number;
}

export class CaminoDB extends Dexie {
  lessons!: Table<LessonProgress, string>;
  games!: Table<GameProgress, string>;
  quizzes!: Table<QuizProgress, string>;
  nuclei!: Table<NucleusProgress, string>;
  profile!: Table<Profile, string>;

  constructor() {
    super('caminoDB');
    this.version(1).stores({
      lessons: 'id',
      games: 'id',
      quizzes: 'id',
      nuclei: 'id',
      profile: 'id',
    });
  }
}

export const db = new CaminoDB();
