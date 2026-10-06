/**
 * LoadingState — indicador de carga accesible (role=status + aria-live).
 * Importar desde: `src/components/LoadingState.tsx`
 */
import { useTranslation } from 'react-i18next';
import './LoadingState.css';

export interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message }: LoadingStateProps) {
  const { t } = useTranslation();
  return (
    <div className="loading-state" role="status" aria-live="polite">
      <span className="loading-state__puntos" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      <p className="loading-state__message">{message ?? t('common.loading')}</p>
    </div>
  );
}
