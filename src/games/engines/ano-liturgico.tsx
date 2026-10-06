/**
 * Motor «La rueda del año litúrgico» — ano-liturgico
 * ----------------------------------------------------------------------------
 * Fase 1 (descubrir): rueda circular; al tocar cada tiempo se muestra su
 * tarjeta con color, símbolo y explicación. Fase 2 (reto): emparejar cada
 * tiempo con su color o su símbolo. Tap/click/teclado (botones reales).
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
import { Button } from '../../components/Button';
import { ANO_LITURGICO_DATA } from '../data/ano-liturgico';

export interface LiturgicalSeason {
  id: string;
  name: string;
  color: string;
  colorHex: string;
  symbol: string;
  description: string;
}

export interface AnoLiturgicoConfig {
  seasons?: LiturgicalSeason[];
}

export type QuizKind = 'color' | 'symbol';

export interface QuizQuestion {
  seasonId: string;
  kind: QuizKind;
}

/** Una pregunta por tiempo (color o símbolo, al azar). Helper puro testeable. */
export function buildQuizQuestions(
  seasons: readonly LiturgicalSeason[],
  rand: () => number = Math.random,
): QuizQuestion[] {
  return shuffle(
    seasons.map((s) => ({
      seasonId: s.id,
      kind: (rand() < 0.5 ? 'color' : 'symbol') as QuizKind,
    })),
    rand,
  );
}

/** Colores sin duplicar (varios tiempos comparten color litúrgico). */
export function distinctColors(
  seasons: readonly LiturgicalSeason[],
): { name: string; hex: string }[] {
  const seen = new Map<string, string>();
  for (const s of seasons) {
    if (!seen.has(s.color)) seen.set(s.color, s.colorHex);
  }
  return [...seen.entries()].map(([name, hex]) => ({ name, hex }));
}

export function AnoLiturgicoEngine({
  config,
  onComplete,
}: GameEngineProps<AnoLiturgicoConfig>) {
  const finish = useFinishOnce(onComplete);
  const seasons = config.seasons ?? ANO_LITURGICO_DATA.seasons;
  const byId = new Map(seasons.map((s) => [s.id, s]));

  const [phase, setPhase] = useState<'explore' | 'quiz'>('explore');
  const [selectedId, setSelectedId] = useState<string | null>(seasons[0]?.id ?? null);
  const [questions] = useState<QuizQuestion[]>(() => buildQuizQuestions(seasons));
  const [qIndex, setQIndex] = useState(0);
  const [wrongTried, setWrongTried] = useState<Set<number>>(new Set());
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'ok' | 'retry' | null>(null);
  const [done, setDone] = useState(false);

  const selected = selectedId ? byId.get(selectedId) : undefined;
  const total = questions.length;
  const question = questions[qIndex];
  const season = question ? byId.get(question.seasonId) : undefined;

  function optionsFor(q: QuizQuestion): { key: string; label: string }[] {
    const s = byId.get(q.seasonId);
    if (!s) return [];
    if (q.kind === 'color') {
      const colors = distinctColors(seasons);
      const others = shuffle(colors.filter((c) => c.name !== s.color)).slice(0, 3);
      return shuffle([
        { key: s.color, label: s.color },
        ...others.map((c) => ({ key: c.name, label: c.name })),
      ]);
    }
    const others = shuffle(seasons.filter((x) => x.id !== s.id)).slice(0, 3);
    return shuffle([
      { key: s.symbol, label: '' },
      ...others.map((x) => ({ key: x.symbol, label: '' })),
    ]);
  }
  const [qOptions, setQOptions] = useState(() =>
    questions[0] ? optionsFor(questions[0]) : [],
  );

  function answer(key: string) {
    if (!question || !season || feedback) return;
    const correct =
      question.kind === 'color' ? key === season.color : key === season.symbol;
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

  function colorHex(name: string): string {
    return distinctColors(seasons).find((c) => c.name === name)?.hex ?? '#ffffff';
  }

  return (
    <GameShell
      title="La rueda del año"
      instructions={
        phase === 'explore'
          ? 'Toca cada tiempo de la rueda para descubrirlo. Cuando los conozcas, pulsa «¡A jugar!» para el reto.'
          : 'Empareja cada tiempo con su color o su símbolo. Sin prisa: piensa bien cada respuesta.'
      }
      progress={
        phase === 'quiz'
          ? { current: Math.min(qIndex + 1, total), total, label: 'Preguntas del reto' }
          : undefined
      }
    >
      {phase === 'explore' && (
        <div className="gx-wheel-wrap">
          <div
            className="gx-wheel"
            role="group"
            aria-label="Rueda del año litúrgico"
          >
            <div className="gx-wheel__center">Toca cada tiempo</div>
            {seasons.map((s, i) => {
              const angle = (i / seasons.length) * 2 * Math.PI - Math.PI / 2;
              const x = 50 + 37 * Math.cos(angle);
              const y = 50 + 37 * Math.sin(angle);
              return (
                <button
                  key={s.id}
                  type="button"
                  className={`gx-wheel__btn${selectedId === s.id ? ' gx-wheel__btn--selected' : ''}`}
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: s.colorHex,
                  }}
                  aria-pressed={selectedId === s.id}
                  aria-label={s.name}
                  onClick={() => setSelectedId(s.id)}
                >
                  <GameIcon name={s.symbol} size={26} />
                </button>
              );
            })}
          </div>

          {selected && (
            <div className="gx-season-card">
              <span
                className="gx-swatch"
                style={{ backgroundColor: selected.colorHex }}
                aria-hidden="true"
              />
              <div>
                <h3>{selected.name}</h3>
                <p>{selected.description}</p>
              </div>
            </div>
          )}

          <div className="gx-center">
            <Button variant="primary" onClick={() => setPhase('quiz')}>
              ¡A jugar!
            </Button>
          </div>
        </div>
      )}

      {phase === 'quiz' && !done && season && question && (
        <>
          <p className="gx-quiz-q">
            {question.kind === 'color'
              ? <>¿De qué color es el tiempo de <strong>{season.name}</strong>?</>
              : <>¿Cuál es el símbolo del tiempo de <strong>{season.name}</strong>?</>}
          </p>

          {feedback === null && (
            <div className="gx-grid gx-grid--2" role="group" aria-label="Opciones">
              {qOptions.map((o, oi) => (
                <button
                  key={o.key}
                  type="button"
                  className="gx-tile"
                  onClick={() => answer(o.key)}
                  aria-label={
                    question.kind === 'color'
                      ? `Color ${o.label}`
                      : `Símbolo, opción ${oi + 1}`
                  }
                >
                  {question.kind === 'color' ? (
                    <>
                      <span
                        className="gx-swatch"
                        style={{ backgroundColor: colorHex(o.key) }}
                        aria-hidden="true"
                      />
                      <span>{o.label}</span>
                    </>
                  ) : (
                    <GameIcon name={o.key} size={36} />
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
                question.kind === 'color'
                  ? `El tiempo de ${season.name} es de color ${season.color}.`
                  : `El símbolo de ${season.name} es este.`
              }
              explanation={season.description}
              primary={{ label: qIndex + 1 >= total ? 'Ver resultado' : 'Siguiente', onClick: next }}
            />
          )}

          {feedback === 'retry' && (
            <FeedbackCard
              tone="gentle"
              title={GENTLE_TITLE}
              message={`¿Seguro? Piensa en lo que aprendiste del tiempo de ${season.name}.`}
              hint={season.description}
              primary={{ label: 'Probar otra vez', onClick: () => setFeedback(null) }}
            />
          )}
        </>
      )}

      {done && (
        <FeedbackCard
          tone="success"
          title="¡Ya conoces el año litúrgico!"
          message={`Has acertado ${score} de ${total} a la primera. Adviento, Navidad, Tiempo Ordinario, Cuaresma, Semana Santa y Pascua: todo el año caminamos con Jesús.`}
          primary={{
            label: 'Continuar',
            onClick: () => finish({ score, total }),
          }}
        />
      )}
    </GameShell>
  );
}
