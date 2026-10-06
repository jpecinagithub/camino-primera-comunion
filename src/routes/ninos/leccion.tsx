/**
 * Leccion — /ninos/leccion/:slug.
 * ----------------------------------------------------------------------------
 * Flujo por pasos con las 7 secciones: Descubre → Escucha → Juega → Piensa →
 * Reza → En familia → Comprueba. Cada ContentBlock es un paso; el paso
 * "Juega" enlaza a los juegos de la lección; "En familia" muestra
 * lesson.family; "Comprueba" es el quiz (una pregunta por pantalla, 3
 * opciones, feedback amable con pista y segundo intento; nunca
 * "INCORRECTO" a secas).
 *
 * Al terminar el quiz: markQuizComplete + markLessonComplete y celebración
 * con estrellas. Barra de pasos, "Leer en voz alta" por paso y navegación
 * Atrás / Siguiente.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Check,
  ClipboardCheck,
  Ear,
  Footprints,
  Gamepad2,
  Lightbulb,
  Sparkles,
  Star,
  Users,
  X,
} from 'lucide-react';
import type { ContentBlock, Lesson, QuizQuestion } from '../../data/model';
import { getLessonBySlug } from '../../data/lessons/index';
import { JUEGOS } from '../../data/juegos';
import {
  clearResume,
  markLessonComplete,
  markQuizComplete,
  saveResume,
  useLessonProgress,
} from '../../db/hooks';
import { db } from '../../db/db';
import { Celebracion } from '../../gamification/Celebracion';
import { ReadAloud } from '../../a11y/ReadAloud';
import { AudioPlayer } from '../../components/AudioPlayer';
import { LiveRegion } from '../../a11y/live';
import { Button } from '../../components/Button';
import { EmptyState } from '../../components/EmptyState';
import { getGameIcon } from './shared';
import { trackLessonOpened } from '../../analytics';
import './ninos.css';

/* --------------------------------- Pasos ---------------------------------- */

type SectionKey =
  | 'descubre'
  | 'escucha'
  | 'juega'
  | 'piensa'
  | 'reza'
  | 'familia'
  | 'comprueba';

interface Step {
  key: string;
  section: SectionKey;
  title: string;
  paragraphs: string[];
  block?: ContentBlock;
  /** Ruta al MP3 de narración pre-generado (si existe, se usa AudioPlayer). */
  audioSrc?: string;
}

/** Audio del paso estático "Juega" (texto fijo, no viene de datos). */
const JUEGA_AUDIO_SRC = '/audio/paso-juega.mp3';

/** Retardo para guardar el punto de reanudación tras cambiar de paso. */
const RESUME_DEBOUNCE_MS = 500;

const SECTION_META: Record<
  SectionKey,
  { label: string; icon: typeof Sparkles }
> = {
  descubre: { label: 'Descubre', icon: Sparkles },
  escucha: { label: 'Escucha', icon: Ear },
  juega: { label: 'Juega', icon: Gamepad2 },
  piensa: { label: 'Piensa', icon: Lightbulb },
  reza: { label: 'Reza', icon: Check },
  familia: { label: 'En familia', icon: Users },
  comprueba: { label: 'Comprueba', icon: ClipboardCheck },
};

export function buildSteps(lesson: Lesson): Step[] {
  const steps: Step[] = [];
  const byKind = (kind: ContentBlock['kind']) =>
    lesson.blocks.filter((b) => b.kind === kind);

  for (const b of byKind('descubre'))
    steps.push({
      key: `block-${b.id}`,
      section: 'descubre',
      title: b.title,
      paragraphs: b.paragraphs,
      block: b,
      audioSrc: b.audioSrc,
    });
  for (const b of byKind('escucha'))
    steps.push({
      key: `block-${b.id}`,
      section: 'escucha',
      title: b.title,
      paragraphs: b.paragraphs,
      block: b,
      audioSrc: b.audioSrc,
    });

  if (lesson.gameIds.length > 0) {
    steps.push({
      key: 'juega',
      section: 'juega',
      title: 'Es hora de jugar',
      paragraphs: [
        'Lo que acabas de aprender también se puede jugar. Elige un juego y diviértete.',
      ],
      audioSrc: JUEGA_AUDIO_SRC,
    });
  }

  for (const b of byKind('piensa'))
    steps.push({
      key: `block-${b.id}`,
      section: 'piensa',
      title: b.title,
      paragraphs: b.paragraphs,
      block: b,
      audioSrc: b.audioSrc,
    });
  for (const b of byKind('reza'))
    steps.push({
      key: `block-${b.id}`,
      section: 'reza',
      title: b.title,
      paragraphs: b.paragraphs,
      block: b,
      audioSrc: b.audioSrc,
    });

  // La oración de la lección cierra la sección "Reza".
  steps.push({
    key: 'oracion',
    section: 'reza',
    title: lesson.prayer.title,
    paragraphs: lesson.prayer.lines,
    audioSrc: lesson.prayer.audioSrc,
  });

  steps.push({
    key: 'familia',
    section: 'familia',
    title: lesson.family.activityTitle,
    paragraphs: [lesson.family.activity],
    audioSrc: lesson.family.audioSrc,
  });

  steps.push({
    key: 'quiz',
    section: 'comprueba',
    title: lesson.quiz.title,
    paragraphs: [],
  });

  return steps;
}

/* ---------------------------------- Quiz ---------------------------------- */

const CHEER = [
  '¡Muy bien!',
  '¡Genial!',
  '¡Fantástico!',
  '¡Bravo!',
  '¡Qué alegría!',
];

function QuizRunner({
  lesson,
  onFinish,
}: {
  lesson: Lesson;
  onFinish: (score: number, total: number) => void;
}) {
  const questions = lesson.quiz.questions;
  const [qIndex, setQIndex] = useState(0);
  const [attempt, setAttempt] = useState(1);
  const [tried, setTried] = useState<number[]>([]);
  const [phase, setPhase] = useState<'answer' | 'good' | 'hint' | 'explain'>(
    'answer',
  );
  const [score, setScore] = useState(0);
  const [live, setLive] = useState('');
  const cheerRef = useRef(0);

  const q: QuizQuestion = questions[qIndex];
  const total = questions.length;

  const choose = (idx: number) => {
    if (phase !== 'answer' || tried.includes(idx)) return;
    if (idx === q.correctIndex) {
      if (attempt === 1) setScore((s) => s + 1);
      const cheer = CHEER[cheerRef.current % CHEER.length];
      cheerRef.current += 1;
      setLive(`${cheer} ${q.explanation}`);
      setPhase('good');
    } else if (attempt === 1) {
      setTried((t) => [...t, idx]);
      setAttempt(2);
      setLive(`Casi. Mira esta pista y prueba otra vez: ${q.hint}`);
      setPhase('hint');
    } else {
      setLive(`Buen intento. ${q.explanation}`);
      setPhase('explain');
    }
  };

  const next = () => {
    if (qIndex + 1 >= total) {
      onFinish(score, total);
    } else {
      setQIndex((i) => i + 1);
      setAttempt(1);
      setTried([]);
      setPhase('answer');
      setLive('');
    }
  };

  const retry = () => {
    setPhase('answer');
    setLive('Prueba otra vez, tú puedes.');
  };

  const readText = `${q.question}. Opciones: ${q.options.join('. ')}.`;

  return (
    <div className="ninos-card" aria-label={`Pregunta ${qIndex + 1} de ${total}`}>
      <span className="ninos-etiqueta" style={{ background: 'var(--color-gold)', color: 'var(--color-ink)' }}>
        Pregunta {qIndex + 1} de {total}
      </span>
      <h2 style={{ margin: 0 }}>{q.question}</h2>
      {q.audioSrc ? (
        <AudioPlayer
          src={q.audioSrc}
          label={`Escuchar la pregunta ${qIndex + 1}`}
        />
      ) : (
        <ReadAloud text={readText} />
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        {q.options.map((opt, idx) => {
          const isTried = tried.includes(idx);
          const showCorrect = phase === 'good' && idx === q.correctIndex;
          return (
            <button
              key={idx}
              type="button"
              className={`ninos-opcion${showCorrect ? ' ninos-opcion--correcta' : ''}${isTried ? ' ninos-opcion--intento' : ''}`}
              disabled={phase !== 'answer' || isTried}
              onClick={() => choose(idx)}
              aria-label={`Opción ${idx + 1}: ${opt}`}
            >
              {showCorrect ? (
                <Check size={22} aria-hidden="true" color="var(--color-green-dark)" />
              ) : (
                <Star size={22} aria-hidden="true" color="var(--color-gold-dark)" />
              )}
              <span>{opt}</span>
            </button>
          );
        })}
      </div>

      <LiveRegion message={live} />

      {phase === 'good' && (
        <div className="ninos-feedback ninos-feedback--bien">
          <Star size={28} aria-hidden="true" color="var(--color-gold-dark)" />
          <div>
            <p style={{ margin: 0, fontWeight: 700 }}>¡Muy bien! 🌟</p>
            <p style={{ margin: 0 }}>{q.explanation}</p>
          </div>
        </div>
      )}
      {phase === 'hint' && (
        <div className="ninos-feedback ninos-feedback--pista">
          <Lightbulb size={28} aria-hidden="true" color="var(--color-gold-dark)" />
          <div>
            <p style={{ margin: 0, fontWeight: 700 }}>
              Casi. Mira esta pista y prueba otra vez.
            </p>
            <p style={{ margin: 0 }}>{q.hint}</p>
            <Button variant="primary" onClick={retry} style={{ marginTop: 'var(--space-2)' }}>
              Probar otra vez
            </Button>
          </div>
        </div>
      )}
      {phase === 'explain' && (
        <div className="ninos-feedback ninos-feedback--bien">
          <Lightbulb size={28} aria-hidden="true" color="var(--color-green-dark)" />
          <div>
            <p style={{ margin: 0, fontWeight: 700 }}>Buen intento.</p>
            <p style={{ margin: 0 }}>{q.explanation}</p>
          </div>
        </div>
      )}

      {(phase === 'good' || phase === 'explain') && (
        <Button variant="primary" onClick={next} className="ninos-boton-grande">
          {qIndex + 1 >= total ? 'Terminar' : 'Siguiente pregunta'}
        </Button>
      )}
    </div>
  );
}

/* --------------------------------- Lección -------------------------------- */

export function Leccion() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const lesson = slug ? getLessonBySlug(slug) : undefined;
  const lessonProgress = useLessonProgress();
  const [stepIndex, setStepIndex] = useState(0);
  const [finished, setFinished] = useState<{ score: number; total: number } | null>(null);
  /** Paso reanudado (para mostrar el aviso "seguimos donde lo dejaste"). */
  const [resumeNotice, setResumeNotice] = useState<number | null>(null);
  const trackedRef = useRef(false);
  const slugRef = useRef(slug);

  const steps = useMemo(() => (lesson ? buildSteps(lesson) : []), [lesson]);

  useEffect(() => {
    if (lesson && !trackedRef.current) {
      trackedRef.current = true;
      trackLessonOpened(lesson.id);
    }
  }, [lesson]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [stepIndex]);

  // Reanudar donde se dejó: al abrir la lección, recupera el paso guardado.
  useEffect(() => {
    if (!slug || !lesson) return;
    slugRef.current = slug;
    setResumeNotice(null);
    // Si la lección ya está completada, el resume no tiene sentido.
    if (lesson.id in lessonProgress) {
      void clearResume(slug);
      return;
    }
    void db.resume.get(slug).then((r) => {
      if (slugRef.current !== slug) return;
      if (r && r.stepIndex > 0 && r.stepIndex < steps.length) {
        setStepIndex(r.stepIndex);
        setResumeNotice(r.stepIndex);
      }
    });
  }, [slug, lesson, steps.length, lessonProgress]);

  // Guardar el punto de reanudación con debounce al cambiar de paso.
  useEffect(() => {
    if (!slug || !lesson || finished) return;
    if (lesson.id in lessonProgress) return;
    const timer = setTimeout(() => {
      void saveResume(slug, stepIndex);
    }, RESUME_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [slug, lesson, stepIndex, finished, lessonProgress]);

  if (!lesson) {
    return (
      <div className="ninos">
        <EmptyState
          title="Esta lección no existe"
          description="Vuelve al camino y elige otra lección."
        />
        <Button variant="primary" onClick={() => navigate('/ninos/camino')}>
          Volver al camino
        </Button>
      </div>
    );
  }

  const handleQuizFinish = async (score: number, total: number) => {
    await markQuizComplete(lesson.quiz.id, score, total);
    await markLessonComplete(lesson.id);
    await clearResume(lesson.slug);
    setFinished({ score, total });
  };

  const restartFromBeginning = () => {
    if (!slug) return;
    void clearResume(slug);
    setResumeNotice(null);
    setStepIndex(0);
  };

  const goStep = (next: number) => {
    setResumeNotice(null);
    setStepIndex(next);
  };

  if (finished) {
    return (
      <div className="ninos">
        <Celebracion
          title="¡Lección completada!"
          message={`Has ganado ${finished.score} de ${finished.total} estrellas en esta lección. ¡Sigue así!`}
          cta={t('nav.finish.continuePath')}
          onContinue={() => navigate('/ninos/camino')}
        />
        <div
          className="ninos-navegacion"
          style={{ justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <Button
            variant="secondary"
            onClick={() => navigate(`/ninos/nucleo/${lesson.nucleusId}`)}
          >
            {t('nav.finish.viewNucleus')}
          </Button>
          <Button variant="secondary" onClick={() => navigate('/ninos/jugar')}>
            {t('nav.finish.play')}
          </Button>
        </div>
      </div>
    );
  }

  const step = steps[stepIndex];
  const SectionIcon = SECTION_META[step.section].icon;
  const readText = `${step.title}. ${step.paragraphs.join(' ')}`;
  const isQuizStep = step.key === 'quiz';

  const juegoInfo = (id: string) => JUEGOS.find((j) => j.id === id);

  return (
    <div className="ninos">
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="ghost"
          onClick={() => navigate(`/ninos/nucleo/${lesson.nucleusId}`)}
          aria-label={t('nav.exitLesson')}
        >
          <X size={20} aria-hidden="true" />
          {t('nav.exitLesson')}
        </Button>
      </div>

      <p style={{ margin: 0, color: 'var(--color-ink-soft)' }}>{lesson.title}</p>

      <div
        className="ninos-pasos"
        role="img"
        aria-label={`Paso ${stepIndex + 1} de ${steps.length}`}
      >
        {steps.map((s, i) => (
          <span
            key={s.key}
            className={`ninos-paso__punto${i < stepIndex ? ' ninos-paso__punto--hecho' : ''}${i === stepIndex ? ' ninos-paso__punto--actual' : ''}`}
            aria-hidden="true"
          />
        ))}
      </div>

      <span
        className="ninos-etiqueta"
        style={{ background: 'var(--color-sky)', color: 'var(--color-sky-dark)', alignSelf: 'flex-start' }}
      >
        <SectionIcon size={18} aria-hidden="true" />
        {SECTION_META[step.section].label} · Paso {stepIndex + 1} de {steps.length}
      </span>

      {resumeNotice !== null && stepIndex === resumeNotice && (
        <div className="ninos-aviso ninos-aviso--resume" role="status">
          <Footprints size={22} aria-hidden="true" />
          <span style={{ flex: 1 }}>
            <strong>{t('progress.resume.title')}</strong>
            {' · '}
            {t('progress.resume.step', { x: stepIndex + 1, y: steps.length })}
          </span>
          <Button variant="ghost" onClick={restartFromBeginning}>
            {t('progress.resume.restart')}
          </Button>
        </div>
      )}

      {isQuizStep ? (
        <QuizRunner lesson={lesson} onFinish={handleQuizFinish} />
      ) : (
        <div className="ninos-card">
          <h2 style={{ margin: 0 }}>{step.title}</h2>
          {step.paragraphs.map((p, i) => (
            <p key={i} className="ninos-parrafo">
              {p}
            </p>
          ))}

          {step.key === 'juega' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {lesson.gameIds.map((gid) => {
                const info = juegoInfo(gid);
                const Icon = getGameIcon(info?.icon ?? 'Gamepad2');
                return (
                  <Button
                    key={gid}
                    variant="secondary"
                    className="ninos-boton-grande"
                    onClick={() => navigate(`/ninos/juego/${gid}`)}
                  >
                    <Icon size={26} aria-hidden="true" />
                    {info?.title ?? gid}
                  </Button>
                );
              })}
            </div>
          )}

          {step.audioSrc ? (
            <AudioPlayer
              src={step.audioSrc}
              label={`Escuchar la narración: ${step.title}`}
            />
          ) : (
            <ReadAloud text={readText} />
          )}
        </div>
      )}

      {!isQuizStep && (
        <div className="ninos-navegacion">
          <Button
            variant="ghost"
            onClick={() => goStep(Math.max(0, stepIndex - 1))}
            disabled={stepIndex === 0}
          >
            ← Atrás
          </Button>
          <Button
            variant="primary"
            onClick={() => goStep(Math.min(steps.length - 1, stepIndex + 1))}
          >
            Siguiente →
          </Button>
        </div>
      )}
    </div>
  );
}
