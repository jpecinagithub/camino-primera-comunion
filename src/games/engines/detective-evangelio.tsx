/**
 * Motor «Detective del Evangelio» — detective-evangelio
 * ----------------------------------------------------------------------------
 * 5 casos: se descubren pistas una a una y se elige entre 4 opciones qué
 * parábola o acontecimiento es. Puntuación: casos resueltos al primer intento.
 */
import { useState } from 'react';
import type { GameEngineProps } from '../types';
import {
  FeedbackCard,
  GENTLE_TITLE,
  GameShell,
  useFinishOnce,
} from './shared';
import { Button } from '../../components/Button';
import { Badge } from '../../components/Badge';
import { DETECTIVE_EVANGELIO_DATA } from '../data/detective-evangelio';

export interface GospelCase {
  id: string;
  clues: string[];
  options: string[];
  answer: string;
  hint: string;
  explanation: string;
}

export interface DetectiveEvangelioConfig {
  cases?: GospelCase[];
}

/** Devuelve las primeras `n` pistas (helper puro, testeable). */
export function revealClues(clues: readonly string[], n: number): string[] {
  return clues.slice(0, Math.max(0, Math.min(n, clues.length)));
}

export function DetectiveEvangelioEngine({
  config,
  onComplete,
}: GameEngineProps<DetectiveEvangelioConfig>) {
  const finish = useFinishOnce(onComplete);
  const cases = config.cases ?? DETECTIVE_EVANGELIO_DATA.cases;
  const total = cases.length;

  const [caseIdx, setCaseIdx] = useState(0);
  const [cluesShown, setCluesShown] = useState(1);
  const [wrongTried, setWrongTried] = useState<Set<string>>(new Set());
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'ok' | 'retry' | null>(null);
  const [done, setDone] = useState(false);

  const gospelCase = cases[caseIdx];
  const visibleClues = gospelCase ? revealClues(gospelCase.clues, cluesShown) : [];

  function answer(option: string) {
    if (!gospelCase || feedback) return;
    if (option === gospelCase.answer) {
      if (!wrongTried.has(gospelCase.id)) setScore((s) => s + 1);
      setFeedback('ok');
    } else {
      setWrongTried((prev) => new Set(prev).add(gospelCase.id));
      setFeedback('retry');
    }
  }

  function next() {
    setFeedback(null);
    setCluesShown(1);
    if (caseIdx + 1 >= total) {
      setDone(true);
      return;
    }
    setCaseIdx(caseIdx + 1);
  }

  if (!gospelCase) {
    return (
      <GameShell
        title="Detective del Evangelio"
        instructions="No hay casos para investigar."
      >
        <p className="gx-note">Vuelve pronto: estamos preparando nuevos casos.</p>
      </GameShell>
    );
  }

  return (
    <GameShell
      title="Detective del Evangelio"
      instructions="Lee las pistas y adivina de qué parábola o momento del Evangelio se trata. Puedes descubrir más pistas si las necesitas."
      progress={{ current: Math.min(caseIdx + 1, total), total, label: 'Casos' }}
    >
      {!done && (
        <>
          <div className="gx-prompt">
            <Badge tone="gold">Caso {caseIdx + 1} de {total}</Badge>
          </div>

          <ol className="gx-clues">
            {visibleClues.map((clue, i) => (
              <li key={i} className="gx-clue">
                <span className="gx-clue__num" aria-hidden="true">{i + 1}</span>
                <span>{clue}</span>
              </li>
            ))}
          </ol>

          {feedback === null && cluesShown < gospelCase.clues.length && (
            <div>
              <Button
                variant="ghost"
                onClick={() => setCluesShown((n) => n + 1)}
              >
                Descubrir otra pista
              </Button>
            </div>
          )}

          {feedback === null && (
            <div className="gx-grid gx-grid--2" role="group" aria-label="¿Qué historia es?">
              {gospelCase.options.map((option) => (
                <button
                  key={option}
                  type="button"
                  className="gx-tile"
                  onClick={() => answer(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {feedback === 'ok' && (
            <FeedbackCard
              tone="success"
              title="¡Caso resuelto!"
              message={`Era: ${gospelCase.answer}.`}
              explanation={gospelCase.explanation}
              primary={{
                label: caseIdx + 1 >= total ? 'Ver resultado' : 'Siguiente caso',
                onClick: next,
              }}
            />
          )}

          {feedback === 'retry' && (
            <FeedbackCard
              tone="gentle"
              title={GENTLE_TITLE}
              message="Esa historia no encaja con las pistas. Mira esta ayuda."
              hint={gospelCase.hint}
              primary={{ label: 'Probar otra vez', onClick: () => setFeedback(null) }}
            />
          )}
        </>
      )}

      {done && (
        <FeedbackCard
          tone="success"
          title="¡Detective de primera!"
          message={`Has resuelto ${score} de ${total} casos a la primera. ¡Qué bien conoces el Evangelio!`}
          primary={{
            label: 'Continuar',
            onClick: () => finish({ score, total }),
          }}
        />
      )}
    </GameShell>
  );
}
