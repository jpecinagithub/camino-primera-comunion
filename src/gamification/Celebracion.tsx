/**
 * Celebracion — animación alegre al completar una lección o un juego.
 * ----------------------------------------------------------------------------
 * Entrada con muelle suave + explosión de partículas (estrellas/confetti) en
 * los colores de la paleta: salen del centro, suben un poco, caen con
 * "gravedad" y se desvanecen (~1.6s). Las partículas son decorativas
 * (aria-hidden) y deterministas (ángulo dorado por índice: sin aleatoriedad).
 * Si el usuario prefiere movimiento reducido (useReducedMotion), se muestra
 * el contenido estático SIN partículas: mismo mensaje, sin animación.
 * Importar desde: `src/gamification/Celebracion.tsx`
 */
import { useMemo } from 'react';
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

/** Colores de la paleta (decorativos, sin texto sobre ellos). */
const PARTICLE_COLORS = [
  'var(--color-gold)',
  'var(--color-coral)',
  'var(--color-sky)',
  'var(--color-green)',
] as const;

const PARTICLE_COUNT = 24;

interface Particle {
  angleDeg: number;
  distance: number;
  peak: number;
  fall: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
  spin: number;
  round: boolean;
}

/** Especificaciones deterministas: ángulo dorado para repartir en círculo. */
function buildParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    angleDeg: (i * 137.508) % 360,
    distance: 80 + ((i * 53) % 70),
    peak: -(36 + ((i * 41) % 56)),
    fall: 150 + ((i * 47) % 90),
    size: 6 + ((i * 29) % 5),
    color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
    delay: (i % 7) * 0.03,
    duration: 1.3 + ((i * 37) % 50) / 100,
    spin: ((i * 91) % 360) - 180,
    round: i % 3 !== 0,
  }));
}

function Confetti() {
  const particles = useMemo(() => buildParticles(PARTICLE_COUNT), []);
  return (
    <div className="celebracion__confetti" aria-hidden="true">
      {particles.map((p, i) => {
        const rad = (p.angleDeg * Math.PI) / 180;
        const dx = Math.cos(rad) * p.distance;
        return (
          <motion.span
            key={i}
            className="celebracion__particula"
            style={{
              width: p.size,
              height: p.size,
              left: `calc(50% - ${p.size / 2}px)`,
              backgroundColor: p.color,
              borderRadius: p.round ? '50%' : 2,
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
            animate={{
              x: dx,
              y: [0, p.peak, p.fall],
              opacity: [1, 1, 0],
              scale: [1, 1, 0.5],
              rotate: p.spin,
            }}
            transition={{
              duration: p.duration,
              delay: 0.15 + p.delay,
              times: [0, 0.35, 1],
              ease: 'easeOut',
            }}
          />
        );
      })}
    </div>
  );
}

export function Celebracion({ title, message, cta = 'Seguir', onContinue }: CelebracionProps) {
  const reduced = useReducedMotion();

  const content = (
    <>
      {!reduced && <Confetti />}
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
