/**
 * Modelo de datos — Camino a la Primera Comunión
 * ----------------------------------------------------------------------------
 * CONTRATO ESTABLE (Fase 0). Estos tipos los importan los equipos de
 * contenido, juegos y padres. No cambiar sin avisar al arquitecto.
 *
 * Importar desde: `src/data/model.ts`
 */

export type BlockKind = 'descubre' | 'escucha' | 'piensa' | 'reza';

export interface ContentBlock {
  id: string;
  kind: BlockKind;
  title: string;
  paragraphs: string[];
  imageLabel?: string;
  /** Ruta al MP3 de narración pre-generado (p. ej. '/audio/escucha-ser-cristiano.mp3'). */
  audioSrc?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  hint: string;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
}

export interface Prayer {
  id: string;
  title: string;
  lines: string[];
  /** Ruta al MP3 de narración pre-generado (p. ej. '/audio/oracion-padrenuestro.mp3'). */
  audioSrc?: string;
}

export interface FamilyBlock {
  activityTitle: string;
  activity: string;
}

export interface ParentNotes {
  oneMinute: string;
  fiveMinutes: string[];
  familyQuestions: string[];
  dailyExample: string;
  familyActivity: string;
  familyPrayer: string[];
}

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  nucleusId: string;
  estimatedMinutes: number;
  objectives: string[];
  blocks: ContentBlock[];
  gameIds: string[];
  quiz: Quiz;
  prayer: Prayer;
  family: FamilyBlock;
  parentNotes: ParentNotes;
}

export interface Nucleus {
  id: string;
  number: number;
  title: string;
  description: string;
  /** Nombre del icono en lucide-react, p. ej. 'Church'. Ver src/data/nuclei.ts */
  icon: string;
  /**
   * Clave de color de la paleta: 'sky' | 'gold' | 'green' | 'coral'.
   * Mapeo a tokens en src/data/nuclei.ts (NUCLEUS_COLOR_TOKENS).
   */
  color: string;
  /** Slugs/ids de lecciones. Lo rellena el equipo de contenido. */
  lessonIds: string[];
}
