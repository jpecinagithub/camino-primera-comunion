/**
 * Vitral — vidriera circular que se ilumina por piezas.
 * ----------------------------------------------------------------------------
 * 10 piezas = los 10 núcleos del itinerario (NUCLEI). Cada pieza se ilumina
 * con el color del núcleo cuando está completado.
 * Importar desde: `src/gamification/Vitral.tsx`
 */
import { NUCLEI, NUCLEUS_COLOR_TOKENS } from '../data/nuclei';
import './Vitral.css';

const R = 90; // radio de la vidriera
const CX = 100;
const CY = 100;

function wedgePath(index: number, total: number): string {
  const a0 = (index / total) * Math.PI * 2 - Math.PI / 2;
  const a1 = ((index + 1) / total) * Math.PI * 2 - Math.PI / 2;
  const x0 = CX + R * Math.cos(a0);
  const y0 = CY + R * Math.sin(a0);
  const x1 = CX + R * Math.cos(a1);
  const y1 = CY + R * Math.sin(a1);
  return `M ${CX} ${CY} L ${x0.toFixed(2)} ${y0.toFixed(2)} A ${R} ${R} 0 0 1 ${x1.toFixed(2)} ${y1.toFixed(2)} Z`;
}

export interface VitralProps {
  /** 10 booleanos: pieza i iluminada si el núcleo i está completado. */
  lit: boolean[];
}

export function Vitral({ lit }: VitralProps) {
  const litCount = lit.filter(Boolean).length;
  return (
    <figure className="vitral" role="img" aria-label={`Vidriera: ${litCount} de 10 piezas iluminadas`}>
      <svg viewBox="0 0 200 200" className="vitral__svg" aria-hidden="true">
        {NUCLEI.map((nucleus, i) => {
          const tokens = NUCLEUS_COLOR_TOKENS[nucleus.color] ?? NUCLEUS_COLOR_TOKENS.sky;
          const isLit = lit[i] === true;
          return (
            <path
              key={nucleus.id}
              d={wedgePath(i, NUCLEI.length)}
              className="vitral__piece"
              fill={isLit ? tokens.fg : 'var(--color-cream-dark)'}
              opacity={isLit ? 1 : 0.55}
              stroke="var(--color-ink)"
              strokeWidth={2}
            />
          );
        })}
        <circle
          cx={CX}
          cy={CY}
          r={22}
          fill="var(--color-gold)"
          stroke="var(--color-ink)"
          strokeWidth={2}
        />
        <circle cx={CX} cy={CY} r={R} fill="none" stroke="var(--color-ink)" strokeWidth={3} />
      </svg>
      <figcaption className="vitral__caption">
        {litCount} de {NUCLEI.length} piezas iluminadas
      </figcaption>
    </figure>
  );
}
