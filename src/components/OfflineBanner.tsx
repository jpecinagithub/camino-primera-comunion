/**
 * OfflineBanner — aviso cuando no hay conexión.
 * Texto fijo: "Estás sin conexión. Puedes seguir aprendiendo."
 * Importar desde: `src/components/OfflineBanner.tsx`
 */
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { WifiOff } from 'lucide-react';
import './OfflineBanner.css';

export function OfflineBanner() {
  const { t } = useTranslation();
  const [online, setOnline] = useState<boolean>(
    typeof navigator === 'undefined' ? true : navigator.onLine,
  );

  useEffect(() => {
    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  if (online) return null;

  return (
    <div className="offline-banner" role="status" aria-live="polite">
      <WifiOff size={20} aria-hidden="true" />
      <span>{t('offline.banner')}</span>
    </div>
  );
}
