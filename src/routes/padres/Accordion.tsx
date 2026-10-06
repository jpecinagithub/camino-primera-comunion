/**
 * Accordion accesible de la zona de padres.
 * Botón + aria-expanded + aria-controls, icono ChevronDown que rota.
 */
import { useId, useState } from 'react';
import type { ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

export interface AccordionProps {
  /** Título visible en el botón del acordeón. */
  title: string;
  /** Subtítulo opcional bajo el título. */
  subtitle?: string;
  /** Icono opcional a la izquierda del título. */
  icon?: ReactNode;
  /** Contenido desplegable. */
  children: ReactNode;
  /** Abierto al montar (por defecto, cerrado). */
  defaultOpen?: boolean;
}

export function Accordion({
  title,
  subtitle,
  icon,
  children,
  defaultOpen = false,
}: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  return (
    <div className={`acc${open ? ' acc--open' : ''}`}>
      <button
        type="button"
        className="acc__button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        {icon && (
          <span className="acc__icon" aria-hidden="true">
            {icon}
          </span>
        )}
        <span className="acc__text">
          <span className="acc__title">{title}</span>
          {subtitle && <span className="acc__subtitle">{subtitle}</span>}
        </span>
        <ChevronDown
          size={22}
          aria-hidden="true"
          className="acc__chevron"
        />
      </button>
      {open && (
        <div className="acc__panel" id={panelId} role="region">
          {children}
        </div>
      )}
    </div>
  );
}
