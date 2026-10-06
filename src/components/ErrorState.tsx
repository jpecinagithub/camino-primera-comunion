/**
 * ErrorState — error recuperable con botón de reintentar.
 * Importar desde: `src/components/ErrorState.tsx`
 */
import { useTranslation } from 'react-i18next';
import { TriangleAlert } from 'lucide-react';
import { Button } from './Button';
import './ErrorState.css';

export interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({ title, description, onRetry }: ErrorStateProps) {
  const { t } = useTranslation();
  return (
    <div className="error-state" role="alert">
      <span className="error-state__icon" aria-hidden="true">
        <TriangleAlert size={40} />
      </span>
      <h2 className="error-state__title">{title ?? t('error.title')}</h2>
      <p className="error-state__description">
        {description ?? t('error.description')}
      </p>
      {onRetry && (
        <Button variant="primary" onClick={onRetry}>
          {t('error.retry')}
        </Button>
      )}
    </div>
  );
}
