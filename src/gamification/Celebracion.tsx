/**
 * Celebracion — animación alegre al completar una lección o un juego.
 * ----------------------------------------------------------------------------
 * Framer Motion con muelle suave. Si el usuario prefiere movimiento reducido
 * (useReducedMotion), se muestra estática: mismo mensaje, sin animación.
 * Importar desde: `src/gamification/Celebracion.tsx`
 */
import { motion } from 'framer-motion';
import { PartyPopper } from 'lucide-react';
import { useReducedMotion } from '../a11y/useReducedMotion';
import { Button } from '../components/Button';
import './Celebracion.css';

export interface CelebracionProps {
  /** Título corto, p. ej. "¡Lección completada!" */
  title: string;
  /** Mensaje de ánimo. */
  message: string;
  /** Texto del botón para continuar. */
  cta?: string;
  /** Se llama al pulsar el botón. */
  onContinue: () => void;
}

export function Celebracion({ title, message, cta = 'Seguir', onContinue }: CelebracionProps) {
  const reduced = useReducedMotion();

  const content = (
    <>
      <span className="celebracion__icono" aria-hidden="true">
        <PartyPopper size={56} color="var(--color-coral-dark)" />
      </span>
      <h2 className="celebracion__titulo">{title}</h2>
      <p className="celebracion__mensaje">{message}</p>
      <Button variant="primary" onClick={onContinue}>
        {cta}
      </Button>
    </>
  );

  if (reduced) {
    return <div className="celebracion">{content}</div>;
  }

  return (
    <motion.div
      className="celebracion"
      role="dialog"
      aria-modal="false"
      aria-label={title}
      initial={{ opacity: 0, scale: 0.8, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
    >
      {content}
    </motion.div>
  );
}
