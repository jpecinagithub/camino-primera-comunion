/**
 * Motor «¿Quién dijo qué?» — quien-dijo-que
 * ----------------------------------------------------------------------------
 * Dos columnas (personajes / frases): tap en un personaje + tap en su frase
 * para unirlos. Puntuación: uniones acertadas al primer intento.
 */
import { useEffect, useState } from 'react';
import type { GameEngineProps } from '../types';
import {
  FeedbackCard,
  GENTLE_TITLE,
  GameShell,
  shuffle,
  useFinishOnce,
} from './shared';
import { QUIEN_DIJO_QUE_DATA } from '../data/quien-dijo-que';

export interface QuienDijoQuePair {
  id: string;
  left: string;
  right: string;
  hint: string;
}

export interface QuienDijoQueConfig {
  pairs?: QuienDijoQuePair[];
}

type Feedback =
  | { kind: 'ok'; leftId: string }
  | { kind: 'retry'; leftId: string }
  | { kind: 'nudge' }
  | null;

export function QuienDijoQueEngine({
  config,
  onComplete,
}: GameEngineProps<QuienDijoQueConfig>) {
  const finish = useFinishOnce(onComplete);
  const pairs = config.pairs ?? QUIEN_DIJO_QUE_DATA.pairs;
  const total = pairs.length;
  const byId = new Map(pairs.map((p) => [p.id, p]));

  const [rightOrder] = useState<string[]>(() => shuffle(pairs.map((p) => p.id)));
  const [leftSel, setLeftSel] = useState<string | null>(null);
  const [links, setLinks] = useState<Record<string, string>>({});
  const [wrongTried, setWrongTried] = useState<Set<string>>(new Set());
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<Feedback>(null);

  useEffect(() => {
    if (total > 0 && Object.keys(links).length === total) {
      finish({ score, total });
    }
  }, [links, total, score, finish]);

  function tapLeft(id: string) {
    if (links[id] || feedback) return;
    setLeftSel((prev) => (prev === id ? null : id));
  }

  function tapRight(rightId: string) {
    if (feedback) return;
    if (leftSel === null) {
      setFeedback({ kind: 'nudge' });
      return;
    }
    if (Object.values(links).includes(rightId)) return;
    if (rightId === leftSel) {
      if (!wrongTried.has(leftSel)) setScore((s) => s + 1);
      setLinks((prev) => ({ ...prev, [leftSel]: rightId }));
      setFeedback({ kind: 'ok', leftId: leftSel });
    } else {
      setWrongTried((prev) => new Set(prev).add(leftSel));
      setFeedback({ kind: 'retry', leftId: leftSel });
    }
  }

  function closeFeedback() {
    setFeedback(null);
    setLeftSel(null);
  }

  const linkedCount = Object.keys(links).length;
  const okPair = feedback && feedback.kind !== 'nudge' ? byId.get(feedback.leftId) : undefined;

  return (
    <GameShell
      title="¿Quién dijo qué?"
      instructions="Toca un personaje de la izquierda y después la frase de la derecha que le corresponde."
      progress={{ current: linkedCount, total, label: 'Uniones correctas' }}
    >
      <div className="gx-columns">
        <div>
          <h3 className="gx-col-title">Personajes</h3>
          <div className="gx-stack" role="group" aria-label="Personajes">
            {pairs.map((p) => {
              const linked = links[p.id] !== undefined;
              return (
                <button
                  key={p.id}
                  type="button"
                  className={`gx-tile${leftSel === p.id ? ' gx-tile--selected' : ''}${linked ? ' gx-tile--done' : ''}`}
                  aria-pressed={leftSel === p.id}
                  disabled={linked}
                  onClick={() => tapLeft(p.id)}
                >
                  {p.left}
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <h3 className="gx-col-title">Palabras</h3>
          <div className="gx-stack" role="group" aria-label="Frases">
            {rightOrder.map((id) => {
              const p = byId.get(id);
              if (!p) return null;
              const used = Object.values(links).includes(id);
              return (
                <button
                  key={id}
                  type="button"
                  className={`gx-tile${used ? ' gx-tile--done' : ''}`}
                  disabled={used}
                  onClick={() => tapRight(id)}
                >
                  {p.right}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {feedback?.kind === 'ok' && okPair && (
        <FeedbackCard
          tone="success"
          title="¡Muy bien!"
          message={`${okPair.left}: ${okPair.right}`}
          primary={{ label: 'Continuar', onClick: closeFeedback }}
        />
      )}

      {feedback?.kind === 'retry' && okPair && (
        <FeedbackCard
          tone="gentle"
          title={GENTLE_TITLE}
          message="Esa frase no es de este personaje. Fíjate en la pista."
          hint={okPair.hint}
          primary={{ label: 'Probar otra vez', onClick: closeFeedback }}
        />
      )}

      {feedback?.kind === 'nudge' && (
        <FeedbackCard
          tone="gentle"
          title="Un paso cada vez"
          message="Primero elige un personaje de la columna de la izquierda."
          primary={{ label: 'Vale', onClick: closeFeedback }}
        />
      )}
    </GameShell>
  );
}
