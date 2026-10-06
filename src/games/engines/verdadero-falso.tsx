/**
 * Motor «¿Verdadero o falso?» — verdadero-falso
 * ----------------------------------------------------------------------------
 * 8 afirmaciones con dos grandes botones. Tras cada respuesta se muestra la
 * explicación, acierte o no (siempre en tono amable).
 */
import { useState } from 'react';
import { CircleCheck, X } from 'lucide-react';
import type { GameEngineProps } from '../types';
import {
  FeedbackCard,
  GENTLE_TITLE,
  GameShell,
  useFinishOnce,
} from './shared';
import { VERDADERO_FALSO_DATA } from '../data/verdadero-falso';

export interface TrueFalseStatement {
  id: string;
  text: string;
  isTrue: boolean;
  explanation: string;
}

export interface VerdaderoFalsoConfig {
  statements?: TrueFalseStatement[];
}

export function VerdaderoFalsoEngine({
  config,
  onComplete,
}: GameEngineProps<VerdaderoFalsoConfig>) {
  const finish = useFinishOnce(onComplete);
  const statements = config.statements ?? VERDADERO_FALSO_DATA.statements;
  const total = statements.length;

  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const statement = statements[idx];
  const wasRight = chosen !== null && statement !== undefined && chosen === statement.isTrue;

  function answer(value: boolean) {
    if (chosen !== null || !statement) return;
    setChosen(value);
    if (value === statement.isTrue) setScore((s) => s + 1);
  }

  function next() {
    setChosen(null);
    if (idx + 1 >= total) {
      setDone(true);
      return;
    }
    setIdx(idx + 1);
  }

  if (!statement) {
    return (
      <GameShell
        title="¿Verdadero o falso?"
        instructions="No hay afirmaciones para jugar."
      >
        <p className="gx-note">Vuelve pronto: estamos preparando nuevas preguntas.</p>
      </GameShell>
    );
  }

  return (
    <GameShell
      title="¿Verdadero o falso?"
      instructions="Lee cada frase y decide: ¿es verdadera o falsa? Después te explicamos por qué."
      progress={{ current: Math.min(idx + 1, total), total, label: 'Afirmaciones' }}
    >
      {!done && (
        <>
          <p className="gx-quiz-q">{statement.text}</p>

          {chosen === null && (
            <div className="gx-grid gx-grid--2" role="group" aria-label="Tu respuesta">
              <button
                type="button"
                className="gx-tile"
                onClick={() => answer(true)}
              >
                <CircleCheck size={32} aria-hidden="true" color="var(--color-green-dark)" />
                <span>Verdadero</span>
              </button>
              <button
                type="button"
                className="gx-tile"
                onClick={() => answer(false)}
              >
                <X size={32} aria-hidden="true" color="var(--color-coral-dark)" />
                <span>Falso</span>
              </button>
            </div>
          )}

          {chosen !== null && (
            <FeedbackCard
              tone={wasRight ? 'success' : 'gentle'}
              title={wasRight ? '¡Muy bien!' : GENTLE_TITLE}
              message={
                wasRight
                  ? '¡Acertaste!'
                  : `Era ${statement.isTrue ? 'verdadero' : 'falso'}. ¡No pasa nada!`
              }
              explanation={statement.explanation}
              primary={{
                label: idx + 1 >= total ? 'Ver resultado' : 'Siguiente',
                onClick: next,
              }}
            />
          )}
        </>
      )}

      {done && (
        <FeedbackCard
          tone="success"
          title="¡Buen trabajo!"
          message={`Has acertado ${score} de ${total}. Cada día sabes un poquito más.`}
          primary={{
            label: 'Continuar',
            onClick: () => finish({ score, total }),
          }}
        />
      )}
    </GameShell>
  );
}
