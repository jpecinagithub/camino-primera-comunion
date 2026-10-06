/**
 * Rutas generales: Splash, Selector, Acerca, Offline, NotFound.
 * Se cargan con lazy() desde App.tsx (code splitting por módulo).
 */
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Baby, BookOpenText, Church, WifiOff, Sparkles } from 'lucide-react';
import { getMode, setMode } from '../mode';
import { useReducedMotion } from '../a11y/useReducedMotion';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { EmptyState } from '../components/EmptyState';
import './misc.css';

/**
 * Pantalla inicial: muestra el logo y redirige según el modo guardado.
 * Con movimiento reducido se omite la animación de entrada.
 */
export function Splash() {
  const navigate = useNavigate();
  const reduced = useReducedMotion();
  const { t } = useTranslation();

  useEffect(() => {
    const mode = getMode();
    const target = mode === 'ninos' ? '/ninos' : mode === 'padres' ? '/padres' : '/selector';
    const timer = window.setTimeout(() => navigate(target, { replace: true }), 1400);
    return () => window.clearTimeout(timer);
  }, [navigate]);

  const content = (
    <>
      <span className="splash__icon" aria-hidden="true">
        <Church size={88} color="var(--color-gold-dark)" />
      </span>
      <h1 className="splash__title">{t('app.title')}</h1>
      <p className="splash__tagline">{t('app.tagline')}</p>
      <span className="splash__loading" aria-hidden="true">
        <Sparkles size={24} color="var(--color-sky-dark)" />
      </span>
      <span className="sr-only">{t('common.loading')}</span>
    </>
  );

  if (reduced) {
    return <div className="splash">{content}</div>;
  }
  return (
    <motion.div
      className="splash"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      {content}
    </motion.div>
  );
}

/** Elige quién usa la app: niños o padres/catequistas. */
export function Selector() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const choose = (mode: 'ninos' | 'padres') => {
    setMode(mode);
    navigate(mode === 'ninos' ? '/ninos' : '/padres');
  };
  return (
    <div className="selector">
      <h1 className="selector__title">{t('mode.choose')}</h1>
      <div className="selector__options">
        <Card>
          <button
            type="button"
            className="selector__option"
            onClick={() => choose('ninos')}
            aria-label={t('mode.kids')}
          >
            <Baby size={56} aria-hidden="true" color="var(--color-sky-dark)" />
            <span className="selector__label">{t('mode.kids')}</span>
          </button>
        </Card>
        <Card>
          <button
            type="button"
            className="selector__option"
            onClick={() => choose('padres')}
            aria-label={t('mode.parents')}
          >
            <BookOpenText size={56} aria-hidden="true" color="var(--color-gold-dark)" />
            <span className="selector__label">{t('mode.parents')}</span>
          </button>
        </Card>
      </div>
      <Link to="/bienvenida" className="selector__welcome">
        {t('selector.firstTime')}
      </Link>
      <Link to="/acerca" className="selector__about">
        {t('app.title')} · + info
      </Link>
    </div>
  );
}

/** Página "Acerca del proyecto" (ruta /acerca). */
export function Acerca() {
  const { t } = useTranslation();
  return (
    <div className="acerca">
      <h1 className="acerca__title">{t('app.title')}</h1>
      <p className="acerca__lead">
        App educativa católica para preparar la Primera Comunión. Funciona sin
        internet, sin cuentas y sin datos personales: solo un apodo ficticio y
        el progreso, guardados en este dispositivo.
      </p>
      <section className="acerca__aviso" aria-label="Aviso importante">
        <p>
          Proyecto educativo independiente. No es una aplicación oficial de la
          Conferencia Episcopal Española ni sustituye la catequesis parroquial.
        </p>
        <p>
          Para cuestiones pastorales o sacramentales concretas, sigue las
          indicaciones de tu parroquia, catequista o diócesis.
        </p>
      </section>
      <section className="acerca__autor" aria-label="Sobre el autor">
        <h2 className="acerca__autor-title">Sobre el autor</h2>
        <p>
          Jon Peciña Iturbe — creador de proyectos educativos digitales y
          herramientas de aprendizaje. Este proyecto nace con el objetivo de
          poner la tecnología al servicio de una catequesis más visual,
          participativa y familiar.
        </p>
      </section>
    </div>
  );
}

/** Página offline dedicada (ruta /offline). */
export function OfflinePage() {
  const { t } = useTranslation();
  const mode = getMode();
  const target = mode === 'padres' ? '/padres' : mode === 'ninos' ? '/ninos' : '/selector';
  return (
    <EmptyState
      title={t('offline.title')}
      description={t('offline.description')}
      icon={<WifiOff size={48} aria-hidden="true" />}
      action={
        <Link to={target}>
          <Button variant="primary">{t('offline.cta')}</Button>
        </Link>
      }
    />
  );
}

/** 404 — ruta no encontrada. */
export function NotFound() {
  const { t } = useTranslation();
  return (
    <EmptyState
      title={t('notfound.title')}
      description={t('notfound.description')}
      action={
        <Link to="/">
          <Button variant="primary">{t('notfound.cta')}</Button>
        </Link>
      }
    />
  );
}
