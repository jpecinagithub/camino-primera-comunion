/**
 * Motor «Los siete sacramentos» — sacramentos
 * ----------------------------------------------------------------------------
 * Por cada sacramento, dos preguntas: su símbolo y su significado.
 * Tap/click/teclado con botones reales. Puntuación: aciertos a la primera.
 */
import { useState } from 'react';
import type { GameEngineProps } from '../types';
import {
  FeedbackCard,
  GENTLE_TITLE,
  GameIcon,
  GameShell,
  shuffle,
  useFinishOnce,
} from './shared';
import { SACRAMENTOS_DATA } from '../data/sacramentos';

export interface Sacrament {
  id: string;
  name: string;
  symbol: string;
  meaning: string;
}

export interface SacramentosConfig {
  sacraments?: Sacrament[];
}

export type SacramentQuizKind = 'symbol' | 'meaning';

export interface SacramentQuestion {
  sacramentId: string;
  kind: SacramentQuizKind;
}

/** Dos preguntas por sacramento (símbolo y significado), mezcladas. Puro. */
export function buildSacramentQuestions(
  sacraments: readonly Sacrament[],
  rand: () => number = Math.random,
): SacramentQuestion[] {
  const qs: SacramentQuestion[] = [];
  for (const s of sacraments) {
    qs.push({ sacramentId: s.id, kind: 'symbol' });
    qs.push({ sacramentId: s.id, kind: 'meaning' });
  }
  return shuffle(qs, rand);
}

/** Palabra sencilla para cada símbolo (pistas amables). */
export const SYMBOL_WORDS: Record<string, string> = {
  Droplets: 'el agua',
  Flame: 'la llama',
  Wheat: 'el trigo',
  Heart: 'el corazón',
  HandHeart: 'las manos que cuidan',
  Church: 'la iglesia',
  HeartHandshake: 'las manos unidas',
};

export function SacramentosEngine({
  config,
  onComplete,
}: GameEngineProps<SacramentosConfig>) {
  const finish = useFinishOnce(onComplete);
  const sacraments = config.sacraments ?? SACRAMENTOS_DATA.sacraments;
  const byId = new Map(sacraments.map((s) => [s.id, s]));

  const [questions] = useState<SacramentQuestion[]>(() =>
    buildSacramentQuestions(sacraments),
  );
  const [qIndex, setQIndex] = useState(0);
  const [wrongTried, setWrongTried] = useState<Set<number>>(new Set());
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'ok' | 'retry' | null>(null);
  const [done, setDone] = useState(false);

  const total = questions.length;
  const question = questions[qIndex];
  const sacrament = question ? byId.get(question.sacramentId) : undefined;

  function optionsFor(q: SacramentQuestion): string[] {
    const s = byId.get(q.sacramentId);
    if (!s) return [];
    if (q.kind === 'symbol') {
      const others = shuffle(sacraments.filter((x) => x.id !== s.id)).slice(0, 3);
      return shuffle([s.symbol, ...others.map((x) => x.symbol)]);
    }
    const others = shuffle(sacraments.filter((x) => x.id !== s.id)).slice(0, 3);
    return shuffle([s.meaning, ...others.map((x) => x.meaning)]);
  }
  const [qOptions, setQOptions] = useState<string[]>(() =>
    questions[0] ? optionsFor(questions[0]) : [],
  );

  function answer(key: string) {
    if (!question || !sacrament || feedback) return;
    const correct =
      question.kind === 'symbol' ? key === sacrament.symbol : key === sacrament.meaning;
    if (correct) {
      if (!wrongTried.has(qIndex)) setScore((s) => s + 1);
      setFeedback('ok');
    } else {
      setWrongTried((prev) => new Set(prev).add(qIndex));
      setFeedback('retry');
    }
  }

  function next() {
    setFeedback(null);
    if (qIndex + 1 >= total) {
      setDone(true);
      return;
    }
    const nq = questions[qIndex + 1];
    setQIndex(qIndex + 1);
    setQOptions(optionsFor(nq));
  }

  const hint =
    sacrament && question
      ? question.kind === 'symbol'
        ? `Pista: ${sacrament.meaning}`
        : `Pista: piensa en su símbolo (${SYMBOL_WORDS[sacrament.symbol] ?? 'su dibujo'}).`
      : undefined;

  return (
    <GameShell
      title="Los siete sacramentos"
      instructions="Para cada sacramento descubrirás su símbolo y su significado. Sin prisa: piensa bien cada respuesta."
      progress={{ current: Math.min(qIndex + 1, total), total, label: 'Preguntas' }}
    >
      {!done && sacrament && question && (
        <>
          <p className="gx-quiz-q">
            {question.kind === 'symbol' ? (
              <>¿Cuál es el símbolo del sacramento de <strong>{sacrament.name}</strong>?</>
            ) : (
              <>¿Qué significa el sacramento de <strong>{sacrament.name}</strong>?</>
            )}
          </p>

          {feedback === null && (
            <div className="gx-grid gx-grid--2" role="group" aria-label="Opciones">
              {qOptions.map((key, oi) => (
                <button
                  key={key}
                  type="button"
                  className="gx-tile"
                  onClick={() => answer(key)}
                  aria-label={
                    question.kind === 'symbol' ? `Símbolo, opción ${oi + 1}` : undefined
                  }
                >
                  {question.kind === 'symbol' ? (
                    <GameIcon name={key} size={36} />
                  ) : (
                    <span>{key}</span>
                  )}
                </button>
              ))}
            </div>
          )}

          {feedback === 'ok' && (
            <FeedbackCard
              tone="success"
              title="¡Muy bien!"
              message={
                question.kind === 'symbol'
                  ? `El símbolo del ${sacrament.name} es este.`
                  : `El sacramento de ${sacrament.name}: ${sacrament.meaning}`
              }
              explanation={
                question.kind === 'symbol' ? sacrament.meaning : undefined
              }
              primary={{
                label: qIndex + 1 >= total ? 'Ver resultado' : 'Siguiente',
                onClick: next,
              }}
            />
          )}

          {feedback === 'retry' && (
            <FeedbackCard
              tone="gentle"
              title={GENTLE_TITLE}
              message="Fíjate en la pista y vuelve a intentarlo."
              hint={hint}
              primary={{ label: 'Probar otra vez', onClick: () => setFeedback(null) }}
            />
          )}
        </>
      )}

      {done && (
        <FeedbackCard
          tone="success"
          title="¡Ya conoces los siete sacramentos!"
          message={`Has acertado ${score} de ${total} a la primera. Los sacramentos son regalos de Jesús para toda la vida.`}
          primary={{
            label: 'Continuar',
            onClick: () => finish({ score, total }),
          }}
        />
      )}
    </GameShell>
  );
}
