/**
 * Jugar — /ninos/jugar · catálogo de juegos.
 * ----------------------------------------------------------------------------
 * Parrilla de los 12 juegos (src/data/juegos.ts). Un juego se marca como
 * "Próximamente" y queda desactivado si `getGame(id)` no existe o su motor
 * no está registrado (GameHost muestra entonces el placeholder).
 *
 * Juego — /ninos/juego/:id · GameHost + botón volver. onExit → /ninos/jugar.
 */
import { useNavigate, useParams } from 'react-router-dom';
import { Gamepad2 } from 'lucide-react';
import { getGame } from '../../games/registry';
import { GameHost } from '../../games/GameHost';
import { JUEGOS } from '../../data/juegos';
import { NUCLEUS_COLOR_TOKENS } from '../../data/nuclei';
import { SectionTitle } from '../../components/SectionTitle';
import { Button } from '../../components/Button';
import { getGameIcon } from './shared';
import './ninos.css';

/** Disponibilidad real: registrado en GAMES (el motor lo resuelve GameHost). */
function isAvailable(gameId: string): boolean {
  return getGame(gameId) !== undefined;
}

export function Jugar() {
  const navigate = useNavigate();
  const todosDisponibles = JUEGOS.every((j) => isAvailable(j.id));

  return (
    <div className="ninos">
      <SectionTitle
        title="Jugar"
        subtitle="Juega y aprende: cada juego te ayuda a preparar el corazón."
      />

      <div className="ninos-tiles">
        {JUEGOS.map((juego) => {
          const available = isAvailable(juego.id);
          const Icon = getGameIcon(juego.icon);
          const tokens =
            NUCLEUS_COLOR_TOKENS[juego.color] ?? NUCLEUS_COLOR_TOKENS.sky;
          return (
            <button
              key={juego.id}
              type="button"
              className={`ninos-tile${available ? '' : ' ninos-proximamente'}`}
              disabled={!available}
              onClick={() => navigate(`/ninos/juego/${juego.id}`)}
              aria-label={
                available
                  ? `Jugar a ${juego.title}`
                  : `${juego.title}: próximamente`
              }
            >
              <span
                className="ninos-tile__icono"
                style={{ background: tokens.bg }}
                aria-hidden="true"
              >
                <Icon size={34} color={tokens.fg} />
              </span>
              {juego.title}
              <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 400, color: 'var(--color-ink-soft)' }}>
                {available ? juego.description : 'Próximamente'}
              </span>
            </button>
          );
        })}
      </div>

      {!todosDisponibles && (
        <div className="ninos-aviso">
          <p style={{ margin: 0 }}>
            Algunos juegos están en camino: nuestros amigos los están preparando
            con mucho cariño. Mientras tanto, ¡sigue descubriendo lecciones!
          </p>
        </div>
      )}
    </div>
  );
}

export function Juego() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!id) return null;

  return (
    <div className="ninos">
      <Button
        variant="ghost"
        onClick={() => navigate('/ninos/jugar')}
        aria-label="Volver a la lista de juegos"
      >
        <Gamepad2 size={22} aria-hidden="true" /> ← Volver a Jugar
      </Button>
      <GameHost gameId={id} onExit={() => navigate('/ninos/jugar')} />
    </div>
  );
}
