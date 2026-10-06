/**
 * Jardin — las semillas crecen: 12 flores, una por juego completado.
 * ----------------------------------------------------------------------------
 * Cada juego completado hace brotar una flor; las pendientes son macetas
 * con un brote pequeño. Sin temporizadores ni rachas: puro progreso.
 * Importar desde: `src/gamification/Jardin.tsx`
 */
import { GARDEN_SLOTS } from './hooks';
import './Jardin.css';

export interface JardinProps {
  /** Nº de flores que ya han brotado (0..12). */
  blooms: number;
}

const PETALS = [0, 60, 120, 180, 240, 300];

function Flower({ bloomed, index }: { bloomed: boolean; index: number }) {
  if (!bloomed) {
    // Brote sin abrir: solo tallo corto y maceta.
    return (
      <svg viewBox="0 0 60 80" className="jardin__plant" aria-hidden="true">
        <line x1="30" y1="52" x2="30" y2="64" stroke="var(--color-green-dark)" strokeWidth="4" strokeLinecap="round" />
        <path d="M30 64 L18 70 M30 64 L42 70" stroke="var(--color-green-dark)" strokeWidth="4" strokeLinecap="round" />
        <path d="M18 58 h24 l-4 18 h-16 z" fill="var(--color-coral)" />
      </svg>
    );
  }
  const hue = index % 2 === 0 ? 'var(--color-coral-dark)' : 'var(--color-gold-dark)';
  return (
    <svg viewBox="0 0 60 80" className="jardin__plant jardin__plant--bloom" aria-hidden="true">
      <line x1="30" y1="36" x2="30" y2="60" stroke="var(--color-green-dark)" strokeWidth="4" strokeLinecap="round" />
      <path d="M30 52 q-12 -2 -16 -12 M30 52 q12 -2 16 -12" stroke="var(--color-green-dark)" strokeWidth="3" fill="none" strokeLinecap="round" />
      {PETALS.map((angle) => (
        <ellipse
          key={angle}
          cx={30 + 10 * Math.cos((angle * Math.PI) / 180)}
          cy={22 + 10 * Math.sin((angle * Math.PI) / 180)}
          rx="6"
          ry="6"
          fill={hue}
          transform={`rotate(${angle} ${30 + 10 * Math.cos((angle * Math.PI) / 180)} ${22 + 10 * Math.sin((angle * Math.PI) / 180)})`}
        />
      ))}
      <circle cx="30" cy="22" r="6" fill="var(--color-gold)" stroke="var(--color-ink)" strokeWidth="1" />
      <path d="M18 58 h24 l-4 18 h-16 z" fill="var(--color-coral)" />
    </svg>
  );
}

export function Jardin({ blooms }: JardinProps) {
  const grown = Math.max(0, Math.min(blooms, GARDEN_SLOTS));
  return (
    <figure className="jardin" role="img" aria-label={`Jardín: ${grown} de ${GARDEN_SLOTS} flores han brotado`}>
      <div className="jardin__grid">
        {Array.from({ length: GARDEN_SLOTS }, (_, i) => (
          <Flower key={i} bloomed={i < grown} index={i} />
        ))}
      </div>
      <figcaption className="jardin__caption">
        {grown} de {GARDEN_SLOTS} flores han brotado
      </figcaption>
    </figure>
  );
}
