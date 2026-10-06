/**
 * Motor «Completa la oración» — completa-oracion
 * ----------------------------------------------------------------------------
 * Frase con huecos y banco de palabras: tap en la palabra + tap en el hueco.
 * Puntuación: huecos correctos al primer intento de comprobación.
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
import { COMPLETA_ORACION_DATA } from '../data/completa-oracion';

export interface OracionBlank {
  blank: string;
  answer: string;
  hint: string;
}

export type OracionSegment = string | OracionBlank;

export interface CompletaOracionConfig {
  prayerTitle?: string;
  segments?: OracionSegment[];
  wordBank?: string[];
}

function isBlank(seg: OracionSegment): seg is OracionBlank {
  return typeof seg !== 'string';
}

export interface BlankCheck {
  correct: number;
  wrongIds: string[];
}

/** Comprueba los huecos rellenos (helper puro, testeable). */
export function checkAnswers(
  filled: Readonly<Record<string, string>>,
  blanks: readonly OracionBlank[],
): BlankCheck {
  const wrongIds: string[] = [];
  let correct = 0;
  for (const b of blanks) {
    if (filled[b.blank] === b.answer) correct++;
    else wrongIds.push(b.blank);
  }
  return { correct, wrongIds };
}

export function CompletaOracionEngine({
  config,
  onComplete,
}: GameEngineProps<CompletaOracionConfig>) {
  const finish = useFinishOnce(onComplete);
  const prayerTitle = config.prayerTitle ?? COMPLETA_ORACION_DATA.prayerTitle ?? 'Oración';
  const segments = config.segments ?? COMPLETA_ORACION_DATA.segments ?? [];
  const wordBank = config.wordBank ?? COMPLETA_ORACION_DATA.wordBank ?? [];
  const blanks = segments.filter(isBlank);
  const total = blanks.length;
  const blankById = new Map(blanks.map((b) => [b.blank, b]));

  const [bank, setBank] = useState<string[]>(() => shuffle(wordBank));
  const [filled, setFilled] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [firstScore, setFirstScore] = useState<number | null>(null);
  const [wrongHints, setWrongHints] = useState<OracionBlank[]>([]);
  const [done, setDone] = useState(false);

  const filledCount = Object.keys(filled).length;

  function tapWord(word: string) {
    if (done) return;
    setWrongHints([]);
    setSelected((prev) => (prev === word ? null : word));
  }

  function tapBlank(blankId: string) {
    if (done) return;
    setWrongHints([]);
    const current = filled[blankId];
    if (current !== undefined) {
      // Devolver la palabra al banco.
      setFilled((prev) => {
        const next = { ...prev };
        delete next[blankId];
        return next;
      });
      setBank((prev) => [...prev, current]);
      return;
    }
    if (selected === null) return;
    setFilled((prev) => ({ ...prev, [blankId]: selected }));
    setBank((prev) => prev.filter((w) => w !== selected));
    setSelected(null);
  }

  function check() {
    const { correct, wrongIds } = checkAnswers(filled, blanks);
    if (firstScore === null) setFirstScore(correct);
    if (wrongIds.length === 0) {
      setDone(true);
      return;
    }
    const wrongBlanks = wrongIds
      .map((id) => blankById.get(id))
      .filter((b): b is OracionBlank => b !== undefined);
    setWrongHints(wrongBlanks);
    // Las palabras mal colocadas vuelven al banco.
    const wrongWords = wrongIds.map((id) => filled[id]).filter((w) => w !== undefined);
    setFilled((prev) => {
      const next = { ...prev };
      for (const id of wrongIds) delete next[id];
      return next;
    });
    setBank((prev) => [...prev, ...wrongWords]);
    setSelected(null);
  }

  return (
    <GameShell
      title={prayerTitle}
      instructions="Toca una palabra del banco y después el hueco donde crees que va. Cuando estén todos, pulsa «Comprobar»."
      progress={{ current: filledCount, total, label: 'Huecos rellenados' }}
    >
      <p className="gx-text-flow" aria-label={`${prayerTitle}, texto con huecos`}>
        {segments.map((seg, i) =>
          typeof seg === 'string' ? (
            <span key={i}>{seg}</span>
          ) : (
            <button
              key={i}
              type="button"
              className={`gx-blank${filled[seg.blank] ? ' gx-blank--filled' : ''}${selected && !filled[seg.blank] ? ' gx-blank--active' : ''}`}
              onClick={() => tapBlank(seg.blank)}
              aria-label={
                filled[seg.blank]
                  ? `Hueco con «${filled[seg.blank]}». Toca para devolver la palabra al banco.`
                  : selected
                    ? `Hueco vacío. Toca para colocar «${selected}».`
                    : 'Hueco vacío. Elige primero una palabra del banco.'
              }
            >
              {filled[seg.blank] ?? '···'}
            </button>
          ),
        )}
      </p>

      <div className="gx-bank" role="group" aria-label="Banco de palabras">
        {bank.map((word) => (
          <button
            key={word}
            type="button"
            className={`gx-word${selected === word ? ' gx-word--selected' : ''}`}
            aria-pressed={selected === word}
            onClick={() => tapWord(word)}
          >
            {word}
          </button>
        ))}
        {bank.length === 0 && (
          <span className="gx-note">Banco vacío: todas las palabras están colocadas.</span>
        )}
      </div>

      {wrongHints.length > 0 && (
        <FeedbackCard
          tone="gentle"
          title={GENTLE_TITLE}
          message="Alguna palabra no está en su sitio. Vuelve al banco: mira las pistas."
          hint={wrongHints.map((b) => `«${b.answer}»: ${b.hint}`).join(' ')}
          primary={{ label: 'Probar otra vez', onClick: () => setWrongHints([]) }}
        />
      )}

      {done ? (
        <FeedbackCard
          tone="success"
          title="¡Precioso! Ya sabes el Ave María."
          message="Qué bonito es hablar con María, nuestra Madre del cielo."
          primary={{
            label: 'Continuar',
            onClick: () => finish({ score: firstScore ?? total, total }),
          }}
        />
      ) : (
        <div className="gx-actions">
          <Button variant="primary" onClick={check} disabled={filledCount < total}>
            Comprobar
          </Button>
        </div>
      )}
    </GameShell>
  );
}
