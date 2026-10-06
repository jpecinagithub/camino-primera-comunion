/**
 * AppShell — layout base.
 * ----------------------------------------------------------------------------
 * Cabecera con:
 *  - botón "volver" contextual "← {etiqueta}" (destino directo desde
 *    `getBackTarget(pathname)`, src/navigation.ts; no depende del historial),
 *  - logo-iglesia con aria-label "Cambiar de modo" (solo en pantallas raíz),
 *  - cambio de modo visible: "Soy padre o madre" ⇄ "Soy niño o niña",
 *  - migas de pan (Breadcrumbs) en pantallas de profundidad ≥ 3,
 * más banner offline y contenido (<Outlet />).
 * Importar desde: `src/components/AppShell.tsx`
 */
import type { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Baby, BookOpenText, Church } from 'lucide-react';
import { getBackTarget, getBreadcrumbs } from '../navigation';
import { getMode, setMode, type Mode } from '../mode';
import { AnimatedOutlet } from './AnimatedOutlet';
import { OfflineBanner } from './OfflineBanner';
import { Breadcrumbs } from './Breadcrumbs';
import './AppShell.css';

export interface AppShellProps {
  /**
   * Fuerza el botón "volver" al historial (navigate(-1)) cuando no hay
   * destino contextual. Uso heredado; hoy todas las rutas con shell tienen
   * destino contextual en `getBackTarget`.
   */
  showBack?: boolean;
  /** Acciones extra en la cabecera (máx 2-3, regla de 3-5 acciones). */
  headerActions?: ReactNode;
}

/**
 * Cambio de modo visible en la cabecera. En la zona de niños ofrece
 * "Soy padre o madre" (→ /padres); en la de padres, "Soy niño o niña"
 * (→ /ninos). Guarda el modo antes de navegar (ModeGate lo exige).
 */
function ModeSwitch({ mode }: { mode: Mode | null }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (mode === 'ninos') {
    const go = () => {
      setMode('padres');
      navigate('/padres');
    };
    return (
      <button
        type="button"
        className="app-shell__mode"
        onClick={go}
        aria-label={t('nav.switchToParents')}
      >
        <BookOpenText size={20} aria-hidden="true" />
        <span className="app-shell__mode-label">{t('nav.switchToParents')}</span>
      </button>
    );
  }
  if (mode === 'padres') {
    const go = () => {
      setMode('ninos');
      navigate('/ninos');
    };
    return (
      <button
        type="button"
        className="app-shell__mode"
        onClick={go}
        aria-label={t('nav.switchToKids')}
      >
        <Baby size={20} aria-hidden="true" />
        <span className="app-shell__mode-label">{t('nav.switchToKids')}</span>
      </button>
    );
  }
  return null;
}

export function AppShell({ showBack = false, headerActions }: AppShellProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const back = getBackTarget(pathname);
  const crumbs = getBreadcrumbs(pathname);
  const mode: Mode | null = pathname.startsWith('/padres')
    ? 'padres'
    : pathname.startsWith('/ninos')
      ? 'ninos'
      : getMode();

  return (
    <div className="app-shell">
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <OfflineBanner />
      <header
        className={`app-shell__header${back ? ' app-shell__header--back' : ''}`}
      >
        {back ? (
          <button
            type="button"
            className="app-shell__back"
            onClick={() => navigate(back.to)}
            aria-label={t('nav.backTo', { label: back.label })}
          >
            <ArrowLeft size={22} aria-hidden="true" />
            <span className="app-shell__back-label">{back.label}</span>
          </button>
        ) : showBack ? (
          <button
            type="button"
            className="app-shell__back"
            onClick={() => navigate(-1)}
            aria-label={t('common.back')}
          >
            <ArrowLeft size={24} aria-hidden="true" />
          </button>
        ) : (
          <Link
            to="/selector"
            className="app-shell__home"
            aria-label={t('nav.changeMode')}
            title={t('nav.changeMode')}
          >
            <Church size={28} aria-hidden="true" />
          </Link>
        )}
        <span className="app-shell__title">{t('app.title')}</span>
        <ModeSwitch mode={mode} />
        {headerActions && (
          <div className="app-shell__actions">{headerActions}</div>
        )}
      </header>
      {crumbs && crumbs.length >= 2 && (
        <div className="app-shell__crumbs">
          <Breadcrumbs items={crumbs} />
        </div>
      )}
      <main className="app-shell__main" id="contenido">
        <AnimatedOutlet />
      </main>
    </div>
  );
}
