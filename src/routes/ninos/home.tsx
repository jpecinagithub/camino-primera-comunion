/**
 * NinosHome — portada del área de niños (/ninos).
 * ----------------------------------------------------------------------------
 * Saludo con el apodo, botón "Continuar mi camino", 4 accesos grandes y una
 * fila de gamificación (estrellas + mini vitral).
 */
import { Link, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Footprints, Gamepad2, HandHeart, Map, PartyPopper, Star } from 'lucide-react';
import { useLessonProgress, useProfile, useResume } from '../../db/hooks';
import { useStars, useVitral } from '../../gamification/hooks';
import { Vitral } from '../../gamification/Vitral';
import { Button } from '../../components/Button';
import { SectionTitle } from '../../components/SectionTitle';
import { getAvatarOption, getContinueLesson, isEverythingComplete } from './shared';
import { getLessonBySlug } from '../../data/lessons/index';
import { buildSteps } from './leccion';
import { NUCLEUS_COLOR_TOKENS } from '../../data/nuclei';
import './ninos.css';

const ACCESOS = [
  { to: '/ninos/camino', icon: Map, label: 'Mi Camino', color: 'sky' as const },
  { to: '/ninos/jugar', icon: Gamepad2, label: 'Jugar', color: 'green' as const },
  { to: '/ninos/orar', icon: HandHeart, label: 'Orar', color: 'gold' as const },
  { to: '/ninos/mi-comunion', icon: PartyPopper, label: 'Mi Primera Comunión', color: 'coral' as const },
];

export function NinosHome() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const profile = useProfile();
  const lessonProgress = useLessonProgress();
  const resume = useResume();
  const stars = useStars();
  const vitral = useVitral();

  const nickname = profile?.nickname?.trim() || '¡Hola!';
  const avatar = getAvatarOption(profile?.avatar ?? 'estrella');
  const tokens = NUCLEUS_COLOR_TOKENS[avatar.color] ?? NUCLEUS_COLOR_TOKENS.sky;
  const AvatarIcon = avatar.icon;
  const nextLesson = getContinueLesson(lessonProgress);
  const allDone = isEverythingComplete(lessonProgress);

  // Punto de reanudación más reciente (lección empezada pero sin terminar).
  const resumeTarget = useMemo(() => {
    const entries = Object.values(resume)
      .map((r) => ({ resume: r, lesson: getLessonBySlug(r.lessonSlug) }))
      .filter(
        (e): e is { resume: (typeof resume)[string]; lesson: NonNullable<ReturnType<typeof getLessonBySlug>> } =>
          !!e.lesson && !(e.lesson.id in lessonProgress),
      )
      .sort((a, b) => b.resume.updatedAt - a.resume.updatedAt);
    return entries[0];
  }, [resume, lessonProgress]);

  const handleContinue = () => {
    if (resumeTarget) {
      navigate(`/ninos/leccion/${resumeTarget.lesson.slug}`);
    } else if (nextLesson) {
      navigate(`/ninos/leccion/${nextLesson.slug}`);
    }
  };

  return (
    <div className="ninos">
      <section className="ninos-hero" aria-label="Saludo">
        <button
          type="button"
          className="ninos-avatar-circulo"
          style={{ background: tokens.bg, borderColor: tokens.fg }}
          onClick={() => navigate('/ninos/avatar')}
          aria-label="Cambiar mi avatar y apodo"
        >
          <AvatarIcon size={44} color={tokens.fg} aria-hidden="true" />
        </button>
        <h1>{profile?.nickname?.trim() ? `¡Hola, ${nickname}!` : nickname}</h1>
        <p>Este es tu camino hacia la Primera Comunión.</p>
      </section>

      {allDone ? (
        <div className="ninos-card" style={{ textAlign: 'center' }}>
          <p className="ninos-parrafo">
            ¡Increíble! Has recorrido <strong>todo el camino</strong>. ¡Eres una
            estrella! 🌟
          </p>
          <Button variant="primary" onClick={() => navigate('/ninos/progreso')}>
            Ver mi progreso
          </Button>
        </div>
      ) : resumeTarget ? (
        <Button
          variant="primary"
          className="ninos-boton-grande"
          onClick={handleContinue}
          aria-label={t('progress.continueWith', {
            title: resumeTarget.lesson.title,
            x: resumeTarget.resume.stepIndex + 1,
            y: buildSteps(resumeTarget.lesson).length,
          })}
        >
          <Footprints size={28} aria-hidden="true" />
          {t('progress.continueWith', {
            title: resumeTarget.lesson.title,
            x: resumeTarget.resume.stepIndex + 1,
            y: buildSteps(resumeTarget.lesson).length,
          })}
        </Button>
      ) : (
        <Button
          variant="primary"
          className="ninos-boton-grande"
          onClick={handleContinue}
        >
          <Footprints size={28} aria-hidden="true" />
          Continuar mi camino
          {nextLesson && (
            <span style={{ fontWeight: 400, fontSize: 'var(--font-size-sm)' }}>
              · {nextLesson.title}
            </span>
          )}
        </Button>
      )}

      <nav className="ninos-tiles" aria-label="Accesos principales">
        {ACCESOS.map((a) => {
          const Icon = a.icon;
          const t = NUCLEUS_COLOR_TOKENS[a.color] ?? NUCLEUS_COLOR_TOKENS.sky;
          return (
            <Link key={a.to} to={a.to} className="ninos-tile">
              <span
                className="ninos-tile__icono"
                style={{ background: t.bg }}
                aria-hidden="true"
              >
                <Icon size={34} color={t.fg} />
              </span>
              {a.label}
            </Link>
          );
        })}
      </nav>

      <section aria-label="Mi gamificación">
        <SectionTitle title="Mis logros" />
        <div className="ninos-card">
          <div className="ninos-fila ninos-fila--entre">
            <div className="ninos-fila">
              <Star size={28} color="var(--color-gold-dark)" aria-hidden="true" />
              <strong style={{ fontSize: 'var(--font-size-lg)' }}>
                {stars} {stars === 1 ? 'estrella' : 'estrellas'}
              </strong>
            </div>
            <Link
              to="/ninos/progreso"
              className="ninos-etiqueta"
              style={{ background: 'var(--color-gold)', color: 'var(--color-gold-dark)' }}
            >
              Ver todo
            </Link>
          </div>
          <Vitral lit={vitral} />
        </div>
      </section>
    </div>
  );
}
