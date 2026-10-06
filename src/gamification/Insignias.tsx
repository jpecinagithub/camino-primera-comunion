/**
 * Insignias — colección de insignias por hitos (gamificación positiva).
 * ----------------------------------------------------------------------------
 * Las desbloqueadas se ven a todo color; las pendientes, en gris con su
 * pista ("Completa 5 lecciones"). Sin rankings ni competición.
 * Importar desde: `src/gamification/Insignias.tsx`
 */
import { Award, Brain, Church, Compass, Gamepad2, Star } from 'lucide-react';
import type { Badge, BadgeIcon } from './model';
import './Insignias.css';

const ICONS: Record<BadgeIcon, typeof Star> = {
  Star,
  Compass,
  Gamepad2,
  Brain,
  Church,
  Award,
};

export interface InsigniasProps {
  /** Insignias calculadas con useBadges() / computeBadges(). */
  badges: Badge[];
}

export function Insignias({ badges }: InsigniasProps) {
  const unlocked = badges.filter((b) => b.unlocked).length;
  return (
    <section className="insignias" aria-label={`Insignias: ${unlocked} de ${badges.length} conseguidas`}>
      <div className="insignias__grid">
        {badges.map((badge) => {
          const Icon = ICONS[badge.icon];
          return (
            <figure
              key={badge.id}
              className={`insignia ${badge.unlocked ? 'insignia--lograda' : 'insignia--pendiente'}`}
            >
              <span className="insignia__icono">
                <Icon size={36} aria-hidden="true" />
              </span>
              <figcaption>
                <strong className="insignia__titulo">{badge.title}</strong>
                <span className="insignia__pista">
                  {badge.unlocked ? '¡Conseguida!' : badge.hint}
                </span>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
