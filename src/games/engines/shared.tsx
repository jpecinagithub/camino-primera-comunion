/**
 * Componentes y utilidades compartidas por los 12 motores de juego.
 * ----------------------------------------------------------------------------
 * - Helpers puros testeables: `shuffle`, `countMatches`.
 * - `useFinishOnce`: garantiza que `onComplete` se llama UNA sola vez.
 * - `GameShell`: cabecera común (título, instrucciones, progreso).
 * - `FeedbackCard`: feedback amable (nunca "incorrecto" a secas).
 * - `GameIcon`: icono Lucide por nombre, con alternativa segura.
 *
 * Importar desde: `src/games/engines/shared.tsx`
 */
import { useCallback, useRef } from 'react';
import type { ReactNode } from 'react';
import * as lucideIcons from 'lucide-react';
import { Lightbulb, PartyPopper, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { GameResult } from '../types';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Badge } from '../../components/Badge';
import { ProgressBar } from '../../components/ProgressBar';
import './engines.css';

/* ==========================================================================
 * Helpers puros (testeables con Vitest)
 * ========================================================================== */

/**
 * Mezcla una lista (Fisher–Yates) sin mutar la original.
 * Acepta un generador aleatorio inyectable para tests deterministas.
 */
export function shuffle<T>(
  items: readonly T[],
  rand: () => number = Math.random,
): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Cuenta cuántas posiciones de `placed` coinciden con `correct` (por índice). */
export function countMatches(
  placed: readonly (string | null)[],
  correct: readonly string[],
): number {
  let n = 0;
  const len = Math.min(placed.length, correct.length);
  for (let i = 0; i < len; i++) {
    if (placed[i] !== null && placed[i] === correct[i]) n++;
  }
  return n;
}

/** Generador pseudoaleatorio determinista (para tests). */
export function seededRand(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/* ==========================================================================
 * useFinishOnce — onComplete se llama UNA vez, aunque el motor re-renderice
 * ========================================================================== */

export function useFinishOnce(
  onComplete: (r: GameResult) => void,
): (r: GameResult) => void {
  const finishedRef = useRef(false);
  return useCallback(
    (r: GameResult) => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      onComplete(r);
    },
    [onComplete],
  );
}

/* ==========================================================================
 * GameIcon — icono Lucide por nombre (datos) con alternativa segura
 * ========================================================================== */

export function GameIcon({ name, size = 28 }: { name: string; size?: number }) {
  const icons = lucideIcons as unknown as Record<string, LucideIcon | undefined>;
  const Cmp: LucideIcon = icons[name] ?? Sparkles;
  return (
    <span aria-hidden="true" className="gx-icon">
      <Cmp size={size} />
    </span>
  );
}

/* ==========================================================================
 * GameShell — cabecera común de todos los motores
 * ========================================================================== */

export interface GameShellProgress {
  current: number;
  total: number;
  label: string;
}

export interface GameShellProps {
  title: string;
  instructions: string;
  progress?: GameShellProgress;
  badge?: ReactNode;
  children: ReactNode;
}

export function GameShell({
  title,
  instructions,
  progress,
  badge,
  children,
}: GameShellProps) {
  return (
    <div className="game">
      <Card className="game__card">
        <div className="game__head">
          <h2 className="game__title">{title}</h2>
          {badge}
        </div>
        <p className="game__instructions">{instructions}</p>
        {progress && (
          <div className="game__progress">
            <ProgressBar
              value={progress.current}
              max={progress.total}
              label={progress.label}
            />
            <span className="game__progress-text" aria-hidden="true">
              {progress.current} de {progress.total}
            </span>
          </div>
        )}
        <div className="game__body">{children}</div>
      </Card>
    </div>
  );
}

/* ==========================================================================
 * FeedbackCard — feedback siempre amable + pista + explicación + acción
 * ========================================================================== */

export interface FeedbackAction {
  label: string;
  onClick: () => void;
}

export interface FeedbackCardProps {
  tone: 'success' | 'gentle';
  title: string;
  message: string;
  hint?: string;
  explanation?: string;
  primary: FeedbackAction;
  secondary?: FeedbackAction;
}

/**
 * Tarjeta de feedback. En tono 'gentle' el título por defecto invita a
 * intentarlo de nuevo con una pista (nunca un "incorrecto" seco).
 */
export function FeedbackCard({
  tone,
  title,
  message,
  hint,
  explanation,
  primary,
  secondary,
}: FeedbackCardProps) {
  const Icon = tone === 'success' ? PartyPopper : Lightbulb;
  return (
    <div
      className={`gx-feedback gx-feedback--${tone}`}
      role="status"
      aria-live="polite"
    >
      <div className="gx-feedback__head">
        <Icon size={30} aria-hidden="true" />
        <h3 className="gx-feedback__title">{title}</h3>
      </div>
      <p className="gx-feedback__message">{message}</p>
      {hint && (
        <p className="gx-feedback__hint">
          <Badge tone="gold">Pista</Badge> {hint}
        </p>
      )}
      {explanation && (
        <p className="gx-feedback__explanation">{explanation}</p>
      )}
      <div className="gx-feedback__actions">
        <Button variant="primary" onClick={primary.onClick}>
          {primary.label}
        </Button>
        {secondary && (
          <Button variant="secondary" onClick={secondary.onClick}>
            {secondary.label}
          </Button>
        )}
      </div>
    </div>
  );
}

/** Título estándar para el tono amable cuando algo no sale a la primera. */
export const GENTLE_TITLE = 'Casi. Mira esta pista y prueba otra vez.';
