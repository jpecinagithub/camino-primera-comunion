/**
 * Progreso — /ninos/progreso.
 * ----------------------------------------------------------------------------
 * Estrellas, Vitral (10 piezas), Jardin, Insignias y lista de núcleos con %.
 */
import { useTranslation } from 'react-i18next';
import { Star, BookOpen, Gamepad2, Headphones } from 'lucide-react';
import { NUCLEI, NUCLEUS_COLOR_TOKENS } from '../../data/nuclei';
import { getLessonsByNucleus } from '../../data/lessons/index';
import { JUEGOS } from '../../data/juegos';
import { useGameProgress, useLessonProgress, useListened } from '../../db/hooks';
import {
  TOTAL_LESSONS,
  countCompleted,
  useBadges,
  useGarden,
  useStars,
  useVitral,
} from '../../gamification/hooks';
import { Vitral } from '../../gamification/Vitral';
import { Jardin } from '../../gamification/Jardin';
import { Insignias } from '../../gamification/Insignias';
import { SectionTitle } from '../../components/SectionTitle';
import { ProgressBar } from '../../components/ProgressBar';
import { getNucleusIcon, nucleusCompletedCount } from './shared';
import './ninos.css';

export function Progreso() {
  const { t } = useTranslation();
  const lessonProgress = useLessonProgress();
  const gameProgress = useGameProgress();
  const listened = useListened();
  const stars = useStars();
  const vitral = useVitral();
  const garden = useGarden();
  const badges = useBadges();

  const lessonsDone = countCompleted(lessonProgress);
  const gamesDone = countCompleted(gameProgress);
  const audiosDone = countCompleted(listened);

  const contadores = [
    {
      icon: BookOpen,
      value: lessonsDone,
      total: TOTAL_LESSONS,
      label: t('progress.counters.lessons'),
      color: 'sky' as const,
    },
    {
      icon: Gamepad2,
      value: gamesDone,
      total: JUEGOS.length,
      label: t('progress.counters.games'),
      color: 'green' as const,
    },
    {
      icon: Headphones,
      value: audiosDone,
      total: null,
      label: t('progress.counters.audios'),
      color: 'gold' as const,
    },
  ];

  return (
    <div className="ninos">
      <SectionTitle
        title="Mi progreso"
        subtitle="Mira todo lo que ya has aprendido. ¡Sigue así!"
      />

      <div className="ninos-contadores" role="list" aria-label="Resumen de mi camino">
        {contadores.map((c) => {
          const Icon = c.icon;
          const tokens = NUCLEUS_COLOR_TOKENS[c.color] ?? NUCLEUS_COLOR_TOKENS.sky;
          return (
            <div key={c.label} className="ninos-contador" role="listitem">
              <span
                className="ninos-contador__icono"
                style={{ background: tokens.bg }}
                aria-hidden="true"
              >
                <Icon size={30} color={tokens.fg} />
              </span>
              <strong className="ninos-contador__numero">
                {c.value}
                {c.total !== null && (
                  <span className="ninos-contador__total">/{c.total}</span>
                )}
              </strong>
              <span className="ninos-contador__etiqueta">{c.label}</span>
            </div>
          );
        })}
      </div>

      <div className="ninos-card" style={{ textAlign: 'center' }}>
        <span
          className="ninos-avatar-circulo"
          style={{
            background: 'var(--color-gold)',
            borderColor: 'var(--color-gold-dark)',
            margin: '0 auto',
          }}
          aria-hidden="true"
        >
          <Star size={44} color="var(--color-gold-dark)" />
        </span>
        <p className="ninos-parrafo" style={{ margin: 0 }}>
          <strong style={{ fontSize: 'var(--font-size-2xl)' }}>{stars}</strong>
          <br />
          {stars === 1 ? 'estrella conseguida' : 'estrellas conseguidas'}
        </p>
      </div>

      <SectionTitle title="Mi vitral" subtitle="Cada núcleo completado ilumina una pieza." />
      <div className="ninos-card">
        <Vitral lit={vitral} />
      </div>

      <SectionTitle title="Mi jardín" subtitle="Cada juego completado hace brotar una flor." />
      <div className="ninos-card">
        <Jardin blooms={garden} />
      </div>

      <SectionTitle title="Mis insignias" />
      <div className="ninos-card">
        <Insignias badges={badges} />
      </div>

      <SectionTitle title="Mis núcleos" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        {NUCLEI.map((nucleus) => {
          const lessons = getLessonsByNucleus(nucleus.id);
          const done = nucleusCompletedCount(nucleus.id, lessonProgress);
          const pct =
            lessons.length > 0 ? Math.round((done / lessons.length) * 100) : 0;
          const Icon = getNucleusIcon(nucleus.icon);
          const tokens =
            NUCLEUS_COLOR_TOKENS[nucleus.color] ?? NUCLEUS_COLOR_TOKENS.sky;
          return (
            <div key={nucleus.id} className="ninos-card">
              <div className="ninos-fila">
                <span
                  className="ninos-sendero__icono"
                  style={{ background: tokens.bg, width: 48, height: 48 }}
                  aria-hidden="true"
                >
                  <Icon size={24} color={tokens.fg} />
                </span>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: 0, fontSize: 'var(--font-size-md)' }}>
                    {nucleus.number}. {nucleus.title}
                  </h3>
                  <ProgressBar
                    value={done}
                    max={Math.max(1, lessons.length)}
                    label={`Progreso del núcleo ${nucleus.number}: ${pct} por ciento`}
                  />
                </div>
                <strong aria-hidden="true">{pct} %</strong>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
