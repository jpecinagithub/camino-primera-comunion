/**
 * ProgressBar — barra de progreso accesible (role=progressbar).
 * Importar desde: `src/components/ProgressBar.tsx`
 */
import './ProgressBar.css';

export interface ProgressBarProps {
  /** Valor actual (p. ej. lecciones completadas). */
  value: number;
  /** Valor máximo. */
  max: number;
  /** Etiqueta accesible, p. ej. "Progreso del núcleo 3". */
  label: string;
  className?: string;
}

export function ProgressBar({ value, max, label, className = '' }: ProgressBarProps) {
  const safeMax = Math.max(1, max);
  const clamped = Math.min(Math.max(0, value), safeMax);
  const pct = Math.round((clamped / safeMax) * 100);
  return (
    <div
      className={`progressbar${className ? ` ${className}` : ''}`}
      role="progressbar"
      aria-label={label}
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={safeMax}
      aria-valuetext={`${pct} %`}
    >
      <div className="progressbar__fill" style={{ width: `${pct}%` }} />
    </div>
  );
}
