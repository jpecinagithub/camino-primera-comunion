/**
 * Motor «Descubre la iglesia» — descubre-iglesia
 * ----------------------------------------------------------------------------
 * Ilustración SVG original de una iglesia con zonas clicables (botones
 * transparentes numerados sobre el dibujo + modo lista alternativo para
 * teclado). El juego pide «toca el ambón» y el niño localiza la zona.
 * Puntuación: aciertos al primer intento.
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
import { DESCUBRE_IGLESIA_DATA } from '../data/descubre-iglesia';

export interface ChurchPart {
  id: string;
  name: string;
  description: string;
  hint?: string;
}

export interface DescubreIglesiaConfig {
  parts?: ChurchPart[];
}

/** Zona clicable: rectángulo (%) + posición de la insignia numerada (%). */
export interface ChurchZone {
  x: number;
  y: number;
  w: number;
  h: number;
  lx: number;
  ly: number;
}

/** Geometría de las zonas sobre el SVG (viewBox 0 0 400 300). Testeable. */
export const PART_ZONES: Record<string, ChurchZone> = {
  nave: { x: 8, y: 10, w: 84, h: 78, lx: 15, ly: 16 },
  cruz: { x: 43, y: 28, w: 14, h: 24, lx: 50, ly: 36 },
  altar: { x: 40, y: 62, w: 20, h: 14, lx: 50, ly: 68 },
  ambon: { x: 20, y: 56, w: 14, h: 22, lx: 27, ly: 65 },
  sagrario: { x: 72, y: 58, w: 16, h: 20, lx: 80, ly: 65 },
  pila: { x: 9, y: 74, w: 17, h: 16, lx: 17, ly: 81 },
  bancos: { x: 32, y: 77, w: 36, h: 13, lx: 50, ly: 85 },
};

/** Dibujo SVG original y sencillo del interior de una iglesia. */
function ChurchDrawing() {
  return (
    <svg viewBox="0 0 400 300" role="img" aria-label="Dibujo del interior de una iglesia">
      {/* nave */}
      <rect x="30" y="30" width="340" height="240" fill="#f3e8d2" stroke="#6b5b45" strokeWidth="3" />
      <path d="M30,270 L30,130 Q30,45 200,45 Q370,45 370,130 L370,270" fill="none" stroke="#6b5b45" strokeWidth="4" />
      <line x1="20" y1="272" x2="380" y2="272" stroke="#6b5b45" strokeWidth="3" />
      {/* cruz sobre el altar */}
      <rect x="194" y="92" width="12" height="60" fill="#8a6410" />
      <rect x="176" y="110" width="48" height="12" fill="#8a6410" />
      {/* altar */}
      <rect x="172" y="204" width="10" height="34" fill="#8a5a2b" />
      <rect x="218" y="204" width="10" height="34" fill="#8a5a2b" />
      <rect x="164" y="192" width="72" height="12" rx="2" fill="#a9743f" />
      <rect x="164" y="192" width="72" height="7" fill="#fffdf8" />
      {/* ambón */}
      <polygon points="96,186 122,186 112,234 104,234" fill="#a9743f" />
      <rect x="92" y="178" width="34" height="9" rx="2" fill="#1e6fa8" />
      {/* sagrario */}
      <rect x="300" y="188" width="46" height="44" fill="#efd9a0" stroke="#8a6410" strokeWidth="3" />
      <rect x="314" y="202" width="18" height="26" fill="#8a6410" />
      <circle cx="323" cy="180" r="6" fill="#c0392b" />
      <path d="M323,170 l5,9 h-10 z" fill="#f6a08c" />
      {/* pila bautismal */}
      <ellipse cx="66" cy="236" rx="24" ry="9" fill="#bfe3f7" stroke="#1e6fa8" strokeWidth="3" />
      <rect x="60" y="245" width="12" height="18" fill="#8a5a2b" />
      <rect x="50" y="263" width="32" height="7" rx="2" fill="#8a5a2b" />
      {/* bancos */}
      <rect x="136" y="240" width="128" height="11" rx="4" fill="#a9743f" />
      <rect x="136" y="254" width="128" height="11" rx="4" fill="#a9743f" />
    </svg>
  );
}

export function DescubreIglesiaEngine({
  config,
  onComplete,
}: GameEngineProps<DescubreIglesiaConfig>) {
  const finish = useFinishOnce(onComplete);
  const parts = config.parts ?? DESCUBRE_IGLESIA_DATA.parts;
  const total = parts.length;
  const byId = new Map(parts.map((p) => [p.id, p]));

  const [order] = useState<string[]>(() => shuffle(parts.map((p) => p.id)));
  const [pos, setPos] = useState(0);
  const [listMode, setListMode] = useState(false);
  const [wrongTried, setWrongTried] = useState<Set<string>>(new Set());
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'ok' | 'retry' | null>(null);
  const [done, setDone] = useState(false);

  const targetId = order[pos];
  const target = targetId ? byId.get(targetId) : undefined;

  function tapZone(id: string) {
    if (!target || feedback || done) return;
    if (id === target.id) {
      if (!wrongTried.has(target.id)) setScore((s) => s + 1);
      setFeedback('ok');
    } else {
      setWrongTried((prev) => new Set(prev).add(target.id));
      setFeedback('retry');
    }
  }

  function next() {
    setFeedback(null);
    if (pos + 1 >= total) {
      setDone(true);
      return;
    }
    setPos(pos + 1);
  }

  // La nave es el fondo: se pinta primero para quedar debajo.
  const zoneOrder = [...order].sort((a, b) =>
    a === 'nave' ? -1 : b === 'nave' ? 1 : 0,
  );

  return (
    <GameShell
      title="Descubre la iglesia"
      instructions="Te pediremos que toques una parte de la iglesia. Toca la zona numerada que creas que es."
      progress={{ current: Math.min(pos + 1, total), total, label: 'Partes descubiertas' }}
      badge={
        <Button
          variant="ghost"
          onClick={() => setListMode((m) => !m)}
          aria-pressed={listMode}
        >
          {listMode ? 'Ver dibujo' : 'Ver como lista'}
        </Button>
      }
    >
      {!done && target && (
        <>
          <div className="gx-prompt">
            <span>Toca: <strong>{target.name}</strong></span>
          </div>

          {feedback === null && !listMode && (
            <div className="gx-svg-wrap">
              <ChurchDrawing />
              {zoneOrder.map((id, zi) => {
                const zone = PART_ZONES[id];
                if (!zone) return null;
                return (
                  <button
                    key={id}
                    type="button"
                    className="gx-zone"
                    style={{
                      left: `${zone.x}%`,
                      top: `${zone.y}%`,
                      width: `${zone.w}%`,
                      height: `${zone.h}%`,
                    }}
                    onClick={() => tapZone(id)}
                    aria-label={`Zona ${zi + 1}`}
                  >
                    <span
                      className="gx-zone__num"
                      style={{ left: `${(zone.lx - zone.x) / zone.w * 100}%`, top: `${(zone.ly - zone.y) / zone.h * 100}%` }}
                      aria-hidden="true"
                    >
                      {zi + 1}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {feedback === null && listMode && (
            <div className="gx-stack" role="group" aria-label="Zonas numeradas">
              {zoneOrder.map((id, zi) => (
                <button
                  key={id}
                  type="button"
                  className="gx-tile"
                  onClick={() => tapZone(id)}
                >
                  Zona {zi + 1}
                </button>
              ))}
            </div>
          )}

          {feedback === 'ok' && (
            <FeedbackCard
              tone="success"
              title={`¡Eso es ${target.name}!`}
              message={target.description}
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
              message="Esa zona no es. Fíjate en la pista."
              hint={target.hint ?? target.description}
              primary={{ label: 'Probar otra vez', onClick: () => setFeedback(null) }}
            />
          )}
        </>
      )}

      {done && (
        <FeedbackCard
          tone="success"
          title="¡Ya conoces la iglesia!"
          message={`Has encontrado ${score} de ${total} partes a la primera. La iglesia es la casa de todos.`}
          primary={{
            label: 'Continuar',
            onClick: () => finish({ score, total }),
          }}
        />
      )}
    </GameShell>
  );
}
