/**
 * CaminoHuellas — huellas del camino: lecciones completadas en orden.
 * ----------------------------------------------------------------------------
 * Un sendero de huellas (icono Footprints alternado) que crece en el orden
 * en que se completan las lecciones. Las pendientes se ven tenues.
 * Importar desde: `src/gamification/CaminoHuellas.tsx`
 */
import { Footprints } from 'lucide-react';
import { TOTAL_LESSONS } from './hooks';
import './CaminoHuellas.css';

export interface CaminoHuellasProps {
  /** ids de lección completadas, en orden de finalización. */
  done: string[];
  /** Total de huellas del camino (por defecto, las 15 lecciones). */
  total?: number;
}

export function CaminoHuellas({ done, total = TOTAL_LESSONS }: CaminoHuellasProps) {
  const steps = Math.max(0, total - done.length);
  return (
    <div
      className="camino-huellas"
      role="img"
      aria-label={`Camino: ${done.length} de ${total} huellas recorridas`}
    >
      {done.map((id, i) => (
        <span
          key={id}
          className={`camino-huellas__huella ${i % 2 === 0 ? 'camino-huellas__huella--izq' : 'camino-huellas__huella--der'}`}
        >
          <Footprints size={30} aria-hidden="true" color="var(--color-sky-dark)" />
          <span className="sr-only">Lección {i + 1} completada</span>
        </span>
      ))}
      {Array.from({ length: steps }, (_, i) => (
        <span
          key={`pending-${i}`}
          className={`camino-huellas__huella camino-huellas__huella--pendiente ${i % 2 === 0 ? 'camino-huellas__huella--izq' : 'camino-huellas__huella--der'}`}
          aria-hidden="true"
        >
          <Footprints size={30} />
        </span>
      ))}
      <p className="camino-huellas__caption">
        {done.length} de {total} huellas
      </p>
    </div>
  );
}
