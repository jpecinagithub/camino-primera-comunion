/**
 * Motor «El camino de las decisiones» — camino-decisiones
 * ----------------------------------------------------------------------------
 * Situaciones de la vida diaria con 3 opciones. Al elegir, explicación amable
 * (enfoque: amar y pedir perdón). Se puede reintentar hasta dar con la mejor.
 * Puntuación: situaciones resueltas a la primera.
 */
import { useState } from 'react';
import type { GameEngineProps } from '../types';
import {
  FeedbackCard,
  GENTLE_TITLE,
  GameShell,
  useFinishOnce,
} from './shared';
import { CAMINO_DECISIONES_DATA } from '../data/camino-decisiones';

export interface DecisionOption {
  label: string;
  feedback: string;
  isBest: boolean;
}

export interface DecisionSituation {
  id: string;
  text: string;
  options: DecisionOption[];
}

export interface CaminoDecisionesConfig {
  situations?: DecisionSituation[];
}

export function CaminoDecisionesEngine({
  config,
  onComplete,
}: GameEngineProps<CaminoDecisionesConfig>) {
  const finish = useFinishOnce(onComplete);
  const situations = config.situations ?? CAMINO_DECISIONES_DATA.situations;
  const total = situations.length;

  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState<DecisionOption | null>(null);
  const [wrongTried, setWrongTried] = useState<Set<string>>(new Set());
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const situation = situations[idx];

  function choose(opt: DecisionOption) {
    if (!situation || chosen) return;
    setChosen(opt);
    if (opt.isBest) {
      if (!wrongTried.has(situation.id)) setScore((s) => s + 1);
    } else {
      setWrongTried((prev) => new Set(prev).add(situation.id));
    }
  }

  function next() {
    setChosen(null);
    if (idx + 1 >= total) {
      setDone(true);
      return;
    }
    setIdx(idx + 1);
  }

  if (!situation) {
    return (
      <GameShell
        title="El camino de las decisiones"
        instructions="No hay situaciones para jugar."
      >
        <p className="gx-note">Vuelve pronto: estamos preparando nuevas situaciones.</p>
      </GameShell>
    );
  }

  return (
    <GameShell
      title="El camino de las decisiones"
      instructions="Lee cada situación y elige lo que harías. No hay prisa: piensa con el corazón."
      progress={{ current: Math.min(idx + 1, total), total, label: 'Situaciones' }}
    >
      <p className="gx-quiz-q">{situation.text}</p>

      {!chosen && !done && (
        <div className="gx-stack" role="group" aria-label="Opciones">
          {situation.options.map((opt) => (
            <button
              key={opt.label}
              type="button"
              className="gx-tile"
              onClick={() => choose(opt)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      {chosen?.isBest && !done && (
        <FeedbackCard
          tone="success"
          title="¡Qué buena decisión!"
          message={chosen.feedback}
          primary={{
            label: idx + 1 >= total ? 'Ver resultado' : 'Siguiente situación',
            onClick: next,
          }}
        />
      )}

      {chosen && !chosen.isBest && (
        <FeedbackCard
          tone="gentle"
          title={GENTLE_TITLE}
          message={chosen.feedback}
          primary={{ label: 'Probar otra vez', onClick: () => setChosen(null) }}
        />
      )}

      {done && (
        <FeedbackCard
          tone="success"
          title="¡Qué camino tan bonito!"
          message={`Has elegido con el corazón en ${score} de ${total} situaciones a la primera. Amar y pedir perdón nos hace crecer cada día.`}
          primary={{
            label: 'Continuar',
            onClick: () => finish({ score, total }),
          }}
        />
      )}
    </GameShell>
  );
}
