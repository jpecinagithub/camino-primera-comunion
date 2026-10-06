/**
 * SectionTitle — titular de sección con icono opcional y subtítulo.
 * Importar desde: `src/components/SectionTitle.tsx`
 */
import type { ReactNode } from 'react';
import './SectionTitle.css';

export interface SectionTitleProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
}

export function SectionTitle({ title, subtitle, icon }: SectionTitleProps) {
  return (
    <div className="section-title">
      {icon && (
        <span className="section-title__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <div>
        <h2 className="section-title__title">{title}</h2>
        {subtitle && <p className="section-title__subtitle">{subtitle}</p>}
      </div>
    </div>
  );
}
