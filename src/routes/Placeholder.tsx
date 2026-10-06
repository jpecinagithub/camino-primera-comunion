/**
 * Placeholder — pantalla temporal para rutas pendientes de su equipo.
 * Los equipos la sustituyen por la pantalla real manteniendo la ruta.
 * Importar desde: `src/routes/Placeholder.tsx`
 */
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Hammer } from 'lucide-react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import './Placeholder.css';

export interface PlaceholderProps {
  title: string;
  description?: string;
  /** Equipo responsable, p. ej. 'Equipo de contenido'. */
  team: string;
}

export function Placeholder({ title, description, team }: PlaceholderProps) {
  const { t } = useTranslation();
  const location = useLocation();
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Card>
        <div className="placeholder">
          <span className="placeholder__icon" aria-hidden="true">
            <Hammer size={40} />
          </span>
          <Badge tone="gold">{t('placeholder.building')}</Badge>
          <h1 className="placeholder__title">{title}</h1>
          {description && (
            <p className="placeholder__description">{description}</p>
          )}
          <p className="placeholder__team">{team}</p>
          <code className="placeholder__path">{location.pathname}</code>
        </div>
      </Card>
    </motion.div>
  );
}
