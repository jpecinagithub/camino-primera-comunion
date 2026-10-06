/**
 * Card — tarjeta de contenido sobre fondo crema.
 * Importar desde: `src/components/Card.tsx`
 */
import type { ReactNode } from 'react';
import './Card.css';

export interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`card${className ? ` ${className}` : ''}`}>{children}</div>
  );
}
