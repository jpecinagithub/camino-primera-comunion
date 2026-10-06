/**
 * Motor «Mapa de Tierra Santa» — mapa-tierra-santa
 * ----------------------------------------------------------------------------
 * Mapa SVG simplificado y original con puntos numerados. Se muestra un nombre
 * y el niño toca el punto correcto. Botones transparentes sobre el SVG + modo
 * lista alternativo para teclado. Puntuación: aciertos al primer intento.
 */
import { useState } from 'react';
import type { GameEngineProps } from '../types';
import {
  FeedbackCard,
  GENTLE_TITLE,
  GameShell,
  shuffle,
  useFinishOnce,
} from './shared';
import { Button } from '../../components/Button';
import { MAPA_TIERRA_SANTA_DATA } from '../data/mapa-tierra-santa';

export interface HolyPlace {
  id: string;
  name: string;
  hint: string;
  fact: string;
  /** Coordenadas relativas 0–100 sobre el SVG. */
  x: number;
  y: number;
}

export interface MapaTierraSantaConfig {
  places?: HolyPlace[];
}

/** Mapa simplificado y original: mar, tierra, lago, río Jordán y mar Muerto. */
function HolyLandMap({ places, foundIds }: { places: HolyPlace[]; foundIds: string[] }) {
  return (
    <svg viewBox="0 0 400 300" role="img" aria-label="Mapa simplificado de Tierra Santa">
      {/* mar Mediterráneo */}
      <rect x="0" y="0" width="95" height="300" fill="#bfe3f7" />
      {/* tierra */}
      <path
        d="M95,8 C170,-2 300,15 340,70 C365,120 350,200 315,245 C280,285 180,292 120,265 C85,245 80,180 88,120 C92,70 90,30 95,8 Z"
        fill="#f3e8d2"
        stroke="#6b5b45"
        strokeWidth="3"
      />
      {/* lago de Galilea */}
      <ellipse cx="240" cy="92" rx="17" ry="25" fill="#bfe3f7" stroke="#1e6fa8" strokeWidth="3" />
      {/* río Jordán */}
      <path
        d="M242,117 C250,140 258,165 262,195 C264,210 266,220 268,230"
        fill="none"
        stroke="#1e6fa8"
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* mar Muerto */}
      <ellipse cx="270" cy="240" rx="11" ry="17" fill="#bfe3f7" stroke="#1e6fa8" strokeWidth="2" />
      {places.map((p) => {
        const px = (p.x / 100) * 400;
        const py = (p.y / 100) * 300;
        const found = foundIds.includes(p.id);
        return (
          <g key={p.id}>
            <circle
              cx={px}
              cy={py}
              r="7"
              fill={found ? '#2e7d4f' : '#c0392b'}
              stroke="#fffdf8"
              strokeWidth="2"
            />
            {found && (
              <text x={px + 12} y={py - 8} className="gx-map-label">
                {p.name}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export function MapaTierraSantaEngine({
  config,
  onComplete,
}: GameEngineProps<MapaTierraSantaConfig>) {
  const finish = useFinishOnce(onComplete);
  const places = config.places ?? MAPA_TIERRA_SANTA_DATA.places;
  const total = places.length;
  const byId = new Map(places.map((p) => [p.id, p]));

  const [order] = useState<string[]>(() => shuffle(places.map((p) => p.id)));
  const [pos, setPos] = useState(0);
  const [listMode, setListMode] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [foundIds, setFoundIds] = useState<string[]>([]);
  const [wrongTried, setWrongTried] = useState<Set<string>>(new Set());
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'ok' | 'retry' | null>(null);
  const [done, setDone] = useState(false);

  const targetId = order[pos];
  const target = targetId ? byId.get(targetId) : undefined;

  function tapPlace(id: string) {
    if (!target || feedback || done) return;
    if (id === target.id) {
      if (!wrongTried.has(target.id)) setScore((s) => s + 1);
      setFoundIds((prev) => [...prev, target.id]);
      setFeedback('ok');
    } else {
      setWrongTried((prev) => new Set(prev).add(target.id));
      setFeedback('retry');
    }
  }

  function next() {
    setFeedback(null);
    setShowHint(false);
    if (pos + 1 >= total) {
      setDone(true);
      return;
    }
    setPos(pos + 1);
  }

  return (
    <GameShell
      title="Mapa de Tierra Santa"
      instructions="Te diremos un lugar y tendrás que tocar su punto en el mapa. Los puntos están numerados."
      progress={{ current: Math.min(pos + 1, total), total, label: 'Lugares encontrados' }}
      badge={
        <Button
          variant="ghost"
          onClick={() => setListMode((m) => !m)}
          aria-pressed={listMode}
        >
          {listMode ? 'Ver mapa' : 'Ver como lista'}
        </Button>
      }
    >
      {!done && target && (
        <>
          <div className="gx-prompt">
            <span>Toca: <strong>{target.name}</strong></span>
            {!showHint && feedback === null && (
              <Button variant="ghost" onClick={() => setShowHint(true)}>
                Ver pista
              </Button>
            )}
          </div>
          {(showHint || feedback === 'retry') && (
            <p className="gx-note" role="status">Pista: {target.hint}</p>
          )}

          {feedback === null && !listMode && (
            <div className="gx-svg-wrap">
              <HolyLandMap places={places} foundIds={foundIds} />
              {order.map((id, oi) => {
                const p = byId.get(id);
                if (!p) return null;
                const found = foundIds.includes(id);
                return (
                  <button
                    key={id}
                    type="button"
                    className={`gx-zone${found ? ' gx-zone--found' : ''}`}
                    style={{
                      left: `${p.x - 4}%`,
                      top: `${p.y - 5.5}%`,
                      width: '8%',
                      height: '11%',
                    }}
                    onClick={() => tapPlace(id)}
                    disabled={found}
                    aria-label={found ? `${p.name}, ya encontrado` : `Punto ${oi + 1}`}
                  >
                    <span className="gx-zone__num" aria-hidden="true">{oi + 1}</span>
                  </button>
                );
              })}
            </div>
          )}

          {feedback === null && listMode && (
            <div className="gx-stack" role="group" aria-label="Puntos numerados">
              {order.map((id, oi) => {
                const p = byId.get(id);
                if (!p) return null;
                const found = foundIds.includes(id);
                return (
                  <button
                    key={id}
                    type="button"
                    className={`gx-tile${found ? ' gx-tile--done' : ''}`}
                    onClick={() => tapPlace(id)}
                    disabled={found}
                  >
                    Punto {oi + 1}{found ? ` — ${p.name}` : ''}
                  </button>
                );
              })}
            </div>
          )}

          {feedback === 'ok' && (
            <FeedbackCard
              tone="success"
              title={`¡Eso es ${target.name}!`}
              message={target.fact}
              primary={{
                label: pos + 1 >= total ? 'Ver resultado' : 'Siguiente',
                onClick: next,
              }}
            />
          )}

          {feedback === 'retry' && (
            <FeedbackCard
              tone="gentle"
              title={GENTLE_TITLE}
              message="Ese punto no es. Mira la pista del mapa."
              hint={target.hint}
              primary={{ label: 'Probar otra vez', onClick: () => setFeedback(null) }}
            />
          )}
        </>
      )}

      {done && (
        <FeedbackCard
          tone="success"
          title="¡Ya conoces Tierra Santa!"
          message={`Has encontrado ${score} de ${total} lugares a la primera. Por allí caminó Jesús.`}
          primary={{
            label: 'Continuar',
            onClick: () => finish({ score, total }),
          }}
        />
      )}
    </GameShell>
  );
}
