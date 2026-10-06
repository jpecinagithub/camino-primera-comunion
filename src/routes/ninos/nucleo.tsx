/**
 * Nucleo — /ninos/nucleo/:id.
 * ----------------------------------------------------------------------------
 * Cabecera del núcleo + lista de sus lecciones (título, subtítulo, minutos,
 * estado). Al completar TODAS las lecciones del núcleo → markNucleusComplete
 * + Celebracion.
 */
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Clock, Check } from 'lucide-react';
import { getNucleus, NUCLEUS_COLOR_TOKENS } from '../../data/nuclei';
import { getLessonsByNucleus } from '../../data/lessons/index';
import {
  markNucleusComplete,
  useLessonProgress,
  useNucleusProgress,
  useResume,
} from '../../db/hooks';
import { Celebracion } from '../../gamification/Celebracion';
import { EmptyState } from '../../components/EmptyState';
import { Button } from '../../components/Button';
import { EstadoLeccion, getNucleusIcon, nucleusCompletedCount } from './shared';
import { trackLessonOpened } from '../../analytics';
import './ninos.css';

export function Nucleo() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const lessonProgress = useLessonProgress();
  const nucleusProgress = useNucleusProgress();
  const resume = useResume();
  const [celebrating, setCelebrating] = useState(false);
  const markedRef = useRef(false);

  const nucleus = id ? getNucleus(id) : undefined;
  const lessons = nucleus ? getLessonsByNucleus(nucleus.id) : [];
  const done = nucleus ? nucleusCompletedCount(nucleus.id, lessonProgress) : 0;
  const allDone = lessons.length > 0 && done === lessons.length;

  // Al completar todas las lecciones del núcleo: persistir + celebrar (una vez).
  useEffect(() => {
    if (
      nucleus &&
      allDone &&
      !markedRef.current &&
      !(nucleus.id in nucleusProgress)
    ) {
      markedRef.current = true;
      void markNucleusComplete(nucleus.id).then(() => setCelebrating(true));
    }
  }, [nucleus, allDone, nucleusProgress]);

  if (!nucleus) {
    return (
      <div className="ninos">
        <EmptyState
          title="Este núcleo no existe"
          description="Vuelve al camino y elige otra parada."
        />
        <Button variant="primary" onClick={() => navigate('/ninos/camino')}>
          Volver al camino
        </Button>
      </div>
    );
  }

  const Icon = getNucleusIcon(nucleus.icon);
  const tokens =
    NUCLEUS_COLOR_TOKENS[nucleus.color] ?? NUCLEUS_COLOR_TOKENS.sky;

  if (celebrating) {
    return (
      <div className="ninos">
        <Celebracion
          title="¡Núcleo completado!"
          message={`Has terminado «${nucleus.title}». ¡Tu vitral brilla un poco más!`}
          cta="Seguir caminando"
          onContinue={() => {
            setCelebrating(false);
            navigate('/ninos/camino');
          }}
        />
      </div>
    );
  }

  return (
    <div className="ninos">
      <section className="ninos-hero" aria-label="Cabecera del núcleo">
        <span
          className="ninos-avatar-circulo"
          style={{ background: tokens.bg, borderColor: tokens.fg }}
          aria-hidden="true"
        >
          <Icon size={44} color={tokens.fg} />
        </span>
        <h1>
          {nucleus.number}. {nucleus.title}
        </h1>
        <p>{nucleus.description}</p>
        <span className="ninos-etiqueta" style={{ background: tokens.bg, color: tokens.fg }}>
          {done} de {lessons.length} lecciones
        </span>
      </section>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {lessons.map((lesson) => {
          const isDone = lesson.id in lessonProgress;
          const inProgress = !isDone && lesson.slug in resume;
          const cardClass =
            `ninos-sendero__tarjeta` +
            (isDone ? ' ninos-sendero__tarjeta--hecha' : '') +
            (inProgress ? ' ninos-sendero__tarjeta--curso' : '');
          const estado = isDone
            ? t('progress.done')
            : inProgress
              ? t('progress.inProgress')
              : t('progress.pending');
          return (
            <button
              key={lesson.id}
              type="button"
              className={cardClass}
              onClick={() => {
                trackLessonOpened(lesson.id);
                navigate(`/ninos/leccion/${lesson.slug}`);
              }}
              aria-label={`Lección: ${lesson.title}. ${estado}.`}
            >
              <span aria-hidden="true">
                <EstadoLeccion done={isDone} />
              </span>
              <span style={{ flex: 1 }}>
                <h3>{lesson.title}</h3>
                <p>{lesson.subtitle}</p>
                <p>
                  <Clock size={14} aria-hidden="true" /> {lesson.estimatedMinutes}{' '}
                  minutos
                </p>
                {isDone ? (
                  <span className="ninos-sello ninos-sello--hecha">
                    <Check size={18} aria-hidden="true" strokeWidth={3} />
                    {t('progress.done')}
                  </span>
                ) : inProgress ? (
                  <span className="ninos-sello ninos-sello--curso">
                    {t('progress.inProgress')}
                  </span>
                ) : null}
              </span>
            </button>
          );
        })}
      </div>

      <Button variant="ghost" onClick={() => navigate('/ninos/camino')}>
        ← Mi Camino
      </Button>
    </div>
  );
}
