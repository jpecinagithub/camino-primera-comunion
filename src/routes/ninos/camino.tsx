/**
 * Camino — /ninos/camino.
 * ----------------------------------------------------------------------------
 * Los 10 núcleos como tarjetas en un sendero vertical. Un núcleo está
 * bloqueado hasta completar el anterior. Muestra CaminoHuellas.
 */
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { NUCLEI, NUCLEUS_COLOR_TOKENS } from '../../data/nuclei';
import { getLessonsByNucleus } from '../../data/lessons/index';
import { useLessonProgress } from '../../db/hooks';
import { useFootprints } from '../../gamification/hooks';
import { CaminoHuellas } from '../../gamification/CaminoHuellas';
import { SectionTitle } from '../../components/SectionTitle';
import { ProgressBar } from '../../components/ProgressBar';
import {
  getNucleusIcon,
  isNucleusUnlocked,
  nucleusCompletedCount,
} from './shared';
import './ninos.css';

export function Camino() {
  const navigate = useNavigate();
  const lessonProgress = useLessonProgress();
  const footprints = useFootprints();

  return (
    <div className="ninos">
      <SectionTitle
        title="Mi Camino"
        subtitle="10 paradas hasta la Primera Comunión. Completa una para abrir la siguiente."
      />

      <CaminoHuellas done={footprints} />

      <div className="ninos-sendero">
        {NUCLEI.map((nucleus) => {
          const lessons = getLessonsByNucleus(nucleus.id);
          const unlocked = isNucleusUnlocked(nucleus.id, lessonProgress);
          const done = nucleusCompletedCount(nucleus.id, lessonProgress);
          const complete = lessons.length > 0 && done === lessons.length;
          const Icon = getNucleusIcon(nucleus.icon);
          const tokens =
            NUCLEUS_COLOR_TOKENS[nucleus.color] ?? NUCLEUS_COLOR_TOKENS.sky;

          return (
            <button
              key={nucleus.id}
              type="button"
              className={`ninos-sendero__tarjeta${unlocked ? '' : ' ninos-sendero__tarjeta--bloqueada'}`}
              onClick={() =>
                unlocked && navigate(`/ninos/nucleo/${nucleus.id}`)
              }
              disabled={!unlocked}
              aria-label={
                unlocked
                  ? `Núcleo ${nucleus.number}: ${nucleus.title}. ${done} de ${lessons.length} lecciones.`
                  : `Núcleo ${nucleus.number} bloqueado: termina el anterior para abrirlo.`
              }
            >
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
                  {lessons.length} {lessons.length === 1 ? 'lección' : 'lecciones'} ·{' '}
                  {complete
                    ? '¡Completado!'
                    : `${done} de ${lessons.length} hechas`}
                </p>
                <ProgressBar
                  value={done}
                  max={Math.max(1, lessons.length)}
                  label={`Progreso del núcleo ${nucleus.number}`}
                />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
