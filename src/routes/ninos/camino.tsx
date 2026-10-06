/**
 * Camino — /ninos/camino.
 * ----------------------------------------------------------------------------
 * Los 10 núcleos como tarjetas en un sendero vertical. Un núcleo está
 * bloqueado hasta completar el anterior. Muestra CaminoHuellas.
 *
 * Fase 2 (efectos): un camino punteado dorado se "dibuja" de arriba abajo
 * (reveal con clipPath de Framer Motion) pasando por detrás de los números,
 * y las 10 tarjetas aparecen en cascada (stagger). Los núcleos completados
 * llevan un sello dorado con check. Con movimiento reducido: todo estático
 * (línea punteada visible sin animación, tarjetas sin cascada).
 */
import { useNavigate } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import { Check, Lock } from 'lucide-react';
import { NUCLEI, NUCLEUS_COLOR_TOKENS } from '../../data/nuclei';
import type { Nucleus } from '../../data/model';
import { getLessonsByNucleus } from '../../data/lessons/index';
import { useLessonProgress, useResume } from '../../db/hooks';
import { useFootprints } from '../../gamification/hooks';
import { CaminoHuellas } from '../../gamification/CaminoHuellas';
import { SectionTitle } from '../../components/SectionTitle';
import { ProgressBar } from '../../components/ProgressBar';
import { useReducedMotion } from '../../a11y/useReducedMotion';
import {
  getNucleusIcon,
  isNucleusUnlocked,
  nucleusCompletedCount,
} from './shared';
import './ninos.css';

const listaVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};

const tarjetaVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: 'easeOut' },
  },
};

interface TarjetaProps {
  nucleus: Nucleus;
  unlocked: boolean;
  done: number;
  complete: boolean;
  inProgress: boolean;
  lessonCount: number;
  animated: boolean;
  onOpen: () => void;
}

function TarjetaCamino({
  nucleus,
  unlocked,
  done,
  complete,
  inProgress,
  lessonCount,
  animated,
  onOpen,
}: TarjetaProps) {
  const Icon = getNucleusIcon(nucleus.icon);
  const tokens =
    NUCLEUS_COLOR_TOKENS[nucleus.color] ?? NUCLEUS_COLOR_TOKENS.sky;

  const className =
    `ninos-sendero__tarjeta` +
    (unlocked ? '' : ' ninos-sendero__tarjeta--bloqueada') +
    (complete ? ' ninos-sendero__tarjeta--completa' : '');

  const inner = (
    <>
      <span
        className="ninos-numero"
        style={{ background: tokens.bg, color: tokens.fg }}
        aria-hidden="true"
      >
        {nucleus.number}
      </span>
      <span
        className="ninos-sendero__icono"
        style={{ background: tokens.bg }}
        aria-hidden="true"
      >
        {unlocked ? (
          <Icon size={28} color={tokens.fg} />
        ) : (
          <Lock size={28} color={tokens.fg} />
        )}
      </span>
      <span style={{ flex: 1 }}>
        <h3>{nucleus.title}</h3>
        <p>
          {lessonCount} {lessonCount === 1 ? 'lección' : 'lecciones'} ·{' '}
          {complete
            ? '¡Completado!'
            : inProgress
              ? `${done} de ${lessonCount} hechas · En curso`
              : `${done} de ${lessonCount} hechas`}
        </p>
        <ProgressBar
          value={done}
          max={Math.max(1, lessonCount)}
          label={`Progreso del núcleo ${nucleus.number}`}
        />
      </span>
      {complete && (
        <span
          className="ninos-sendero__check"
          aria-hidden="true"
          title="Núcleo completado"
        >
          <Check size={18} strokeWidth={3} />
        </span>
      )}
    </>
  );

  if (!animated) {
    return (
      <button
        type="button"
        className={className}
        onClick={() => unlocked && onOpen()}
        disabled={!unlocked}
        aria-label={
          unlocked
            ? `Núcleo ${nucleus.number}: ${nucleus.title}. ${done} de ${lessonCount} lecciones.${complete ? ' Completado.' : inProgress ? ' En curso.' : ''}`
            : `Núcleo ${nucleus.number} bloqueado: termina el anterior para abrirlo.`
        }
      >
        {inner}
      </button>
    );
  }

  return (
    <motion.button
      type="button"
      className={className}
      variants={tarjetaVariants}
      onClick={() => unlocked && onOpen()}
      disabled={!unlocked}
      aria-label={
        unlocked
          ? `Núcleo ${nucleus.number}: ${nucleus.title}. ${done} de ${lessonCount} lecciones.${complete ? ' Completado.' : inProgress ? ' En curso.' : ''}`
          : `Núcleo ${nucleus.number} bloqueado: termina el anterior para abrirlo.`
      }
    >
      {inner}
    </motion.button>
  );
}

export function Camino() {
  const navigate = useNavigate();
  const lessonProgress = useLessonProgress();
  const resume = useResume();
  const footprints = useFootprints();
  const reduced = useReducedMotion();
  const animated = !reduced;

  /** ¿Tiene el núcleo alguna lección empezada (con resume) sin terminar? */
  const nucleusInProgress = (nucleusId: string): boolean =>
    getLessonsByNucleus(nucleusId).some(
      (l) => !(l.id in lessonProgress) && l.slug in resume,
    );

  return (
    <div className="ninos">
      <SectionTitle
        title="Mi Camino"
        subtitle="10 paradas hasta la Primera Comunión. Completa una para abrir la siguiente."
      />

      <CaminoHuellas done={footprints} />

      <div className="ninos-sendero">
        {/* Camino punteado: se dibuja de arriba abajo; estático si hay
            movimiento reducido. aria-hidden: puramente decorativo. */}
        <div className="ninos-sendero__linea" aria-hidden="true">
          {animated ? (
            <motion.div
              className="ninos-sendero__trazo"
              initial={{ clipPath: 'inset(0 0 100% 0)' }}
              animate={{ clipPath: 'inset(0 0 0% 0)' }}
              transition={{ duration: 1.1, ease: 'easeInOut', delay: 0.2 }}
            />
          ) : (
            <div className="ninos-sendero__trazo" />
          )}
        </div>

        {animated ? (
          <motion.div
            className="ninos-sendero__lista"
            variants={listaVariants}
            initial="hidden"
            animate="show"
          >
            {NUCLEI.map((nucleus) => {
              const lessons = getLessonsByNucleus(nucleus.id);
              return (
                <TarjetaCamino
                  key={nucleus.id}
                  nucleus={nucleus}
                  unlocked={isNucleusUnlocked(nucleus.id, lessonProgress)}
                  done={nucleusCompletedCount(nucleus.id, lessonProgress)}
                  complete={
                    lessons.length > 0 &&
                    nucleusCompletedCount(nucleus.id, lessonProgress) ===
                      lessons.length
                  }
                  inProgress={nucleusInProgress(nucleus.id)}
                  lessonCount={lessons.length}
                  animated
                  onOpen={() => navigate(`/ninos/nucleo/${nucleus.id}`)}
                />
              );
            })}
          </motion.div>
        ) : (
          <>
            {NUCLEI.map((nucleus) => {
              const lessons = getLessonsByNucleus(nucleus.id);
              return (
                <TarjetaCamino
                  key={nucleus.id}
                  nucleus={nucleus}
                  unlocked={isNucleusUnlocked(nucleus.id, lessonProgress)}
                  done={nucleusCompletedCount(nucleus.id, lessonProgress)}
                  complete={
                    lessons.length > 0 &&
                    nucleusCompletedCount(nucleus.id, lessonProgress) ===
                      lessons.length
                  }
                  inProgress={nucleusInProgress(nucleus.id)}
                  lessonCount={lessons.length}
                  animated={false}
                  onOpen={() => navigate(`/ninos/nucleo/${nucleus.id}`)}
                />
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
