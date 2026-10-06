/**
 * Modelo de gamificación (tipos, sin enums).
 * Importar desde: `src/gamification/model.ts`
 */

/** Nombre de icono Lucide que representa la insignia. */
export type BadgeIcon = 'Star' | 'Compass' | 'Gamepad2' | 'Brain' | 'Church' | 'Award';

export interface Badge {
  /** id estable de la insignia. */
  id: string;
  /** Nombre corto que ve el niño/a. */
  title: string;
  /** Cómo se consigue (texto infantil). */
  hint: string;
  /** Icono Lucide. */
  icon: BadgeIcon;
  /** true si ya se ha desbloqueado. */
  unlocked: boolean;
}
