/**
 * AppShell — layout base: cabecera sencilla + banner offline + contenido.
 * Las rutas hijas se renderizan con <Outlet />.
 * Importar desde: `src/components/AppShell.tsx`
 */
import type { ReactNode } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Church } from 'lucide-react';
import { OfflineBanner } from './OfflineBanner';
import './AppShell.css';

export interface AppShellProps {
  /** Muestra el botón "volver" (navega atrás en el historial). */
  showBack?: boolean;
  /** Acciones extra en la cabecera (máx 2-3, regla de 3-5 acciones). */
  headerActions?: ReactNode;
}

export function AppShell({ showBack = false, headerActions }: AppShellProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="app-shell">
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <OfflineBanner />
      <header className="app-shell__header">
        {showBack ? (
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
            aria-label={t('app.title')}
          >
            <Church size={28} aria-hidden="true" />
          </Link>
        )}
        <span className="app-shell__title">{t('app.title')}</span>
        {headerActions && (
          <div className="app-shell__actions">{headerActions}</div>
        )}
      </header>
      <main className="app-shell__main" id="contenido">
        <Outlet />
      </main>
    </div>
  );
}
