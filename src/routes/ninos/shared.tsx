/**
 * Utilidades compartidas de las pantallas de niños (/ninos/*).
 * ----------------------------------------------------------------------------
 * Lógica sencilla de desbloqueo de núcleos, iconos de núcleos/juegos/avatar
 * y pequeños componentes (EstadoLeccion, TarjetaAcceso).
 */
import type { ComponentType } from 'react';
import {
  Bird,
  Cat,
  Church,
  CircleCheck,
  CircleDashed,
  Dog,
  Droplets,
  Fish,
  Flame,
  Flower2,
  Footprints,
  Gamepad2,
  Grid2x2,
  Heart,
  HeartHandshake,
  House,
  ListOrdered,
  Map as MapIcon,
  MessagesSquare,
  Moon,
  PenLine,
  Rabbit,
  Rainbow,
  Rocket,
  RotateCw,
  Search,
  Signpost,
  Star,
  Sun,
  Target,
  Turtle,
  Wheat,
  Cross,
} from 'lucide-react';
import { NUCLEI } from '../../data/nuclei';
import { getLessonsByNucleus, LESSONS } from '../../data/lessons/index';
import type { Lesson } from '../../data/model';

/* ------------------------- Iconos de núcleos ------------------------------ */

const NUCLEUS_ICONS: Record<string, ComponentType<{ size?: number | string; className?: string; color?: string }>> = {
  Church,
  Heart,
  Star,
  Footprints,
  Cross,
  Flame,
  Droplets,
  HeartHandshake,
  Wheat,
  House,
};

/** Devuelve el componente icono de un núcleo por su campo `icon`. */
export function getNucleusIcon(name: string) {
  return NUCLEUS_ICONS[name] ?? Church;
}

/* --------------------------- Iconos de juegos ----------------------------- */

const GAME_ICONS: Record<string, ComponentType<{ size?: number | string; className?: string; color?: string }>> = {
  Grid2x2,
  ListOrdered,
  CircleCheck,
  Droplets,
  Search,
  MessagesSquare,
  Signpost,
  PenLine,
  Church,
  Map: MapIcon,
  Target,
  RotateCw,
};

/** Devuelve el componente icono de un juego por nombre. */
export function getGameIcon(name: string) {
  return GAME_ICONS[name] ?? Gamepad2;
}

/* --------------------------- Desbloqueo ---------------------------------- */

/**
 * Un núcleo está desbloqueado si es el primero o si el anterior tiene
 * TODAS sus lecciones completadas.
 */
export function isNucleusUnlocked(
  nucleusId: string,
  lessonProgress: Record<string, unknown>,
): boolean {
  const idx = NUCLEI.findIndex((n) => n.id === nucleusId);
  if (idx < 0) return false;
  if (idx === 0) return true;
  const prevLessons = getLessonsByNucleus(NUCLEI[idx - 1].id);
  return prevLessons.length > 0 && prevLessons.every((l) => l.id in lessonProgress);
}

/** Nº de lecciones completadas de un núcleo. */
export function nucleusCompletedCount(
  nucleusId: string,
  lessonProgress: Record<string, unknown>,
): number {
  return getLessonsByNucleus(nucleusId).filter((l) => l.id in lessonProgress).length;
}

/** La próxima lección por hacer (en orden del itinerario), o undefined si todo está completo. */
export function getContinueLesson(
  lessonProgress: Record<string, unknown>,
): Lesson | undefined {
  return LESSONS.find((l) => !(l.id in lessonProgress));
}

/** ¿Está todo el itinerario completo? */
export function isEverythingComplete(
  lessonProgress: Record<string, unknown>,
): boolean {
  return getContinueLesson(lessonProgress) === undefined;
}

/* ------------------------------ Avatares ---------------------------------- */

export interface AvatarOption {
  id: string;
  label: string;
  icon: ComponentType<{ size?: number | string; className?: string; color?: string }>;
  /** Clave de color de la paleta (fondo suave + acento). */
  color: 'sky' | 'gold' | 'green' | 'coral';
}

export const AVATAR_OPTIONS: AvatarOption[] = [
  { id: 'estrella', label: 'Estrella', icon: Star, color: 'gold' },
  { id: 'sol', label: 'Sol', icon: Sun, color: 'gold' },
  { id: 'luna', label: 'Luna', icon: Moon, color: 'sky' },
  { id: 'arcoiris', label: 'Arcoíris', icon: Rainbow, color: 'sky' },
  { id: 'flor', label: 'Flor', icon: Flower2, color: 'coral' },
  { id: 'cohete', label: 'Cohete', icon: Rocket, color: 'coral' },
  { id: 'gato', label: 'Gato', icon: Cat, color: 'green' },
  { id: 'perro', label: 'Perro', icon: Dog, color: 'gold' },
  { id: 'pez', label: 'Pez', icon: Fish, color: 'sky' },
  { id: 'pajaro', label: 'Pájaro', icon: Bird, color: 'green' },
  { id: 'tortuga', label: 'Tortuga', icon: Turtle, color: 'green' },
  { id: 'conejo', label: 'Conejo', icon: Rabbit, color: 'coral' },
];

/** Devuelve la opción de avatar por id (o la primera si no existe). */
export function getAvatarOption(id: string): AvatarOption {
  return AVATAR_OPTIONS.find((a) => a.id === id) ?? AVATAR_OPTIONS[0];
}

/* ------------------------- Pequeños componentes --------------------------- */

export function EstadoLeccion({ done }: { done: boolean }) {
  return done ? (
    <CircleCheck size={24} aria-hidden="true" color="var(--color-green-dark)" />
  ) : (
    <CircleDashed size={24} aria-hidden="true" color="var(--color-ink-soft)" />
  );
}
