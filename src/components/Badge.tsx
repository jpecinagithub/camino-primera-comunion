/**
 * Badge — píldora de estado/categoría. Texto ink sobre fondos claros (AA).
 * Importar desde: `src/components/Badge.tsx`
 */
import type { ReactNode } from 'react';
import './Badge.css';

export type BadgeTone = 'sky' | 'gold' | 'green' | 'coral' | 'neutral';

export interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
}

export function Badge({ children, tone = 'neutral' }: BadgeProps) {
  return <span className={`badge badge--${tone}`}>{children}</span>;
}
