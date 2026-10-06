/**
 * Motor «Ordena la Misa» — ordena-misa
 * ----------------------------------------------------------------------------
 * 5 tarjetas desordenadas para colocar en orden: tap en la tarjeta + tap en
 * la ranura. Teclado: todo son botones reales. Puntuación: aciertos al
 * primer intento de comprobación.
 */
import { useState } from 'react';
import type { GameEngineProps } from '../types';
import {
  FeedbackCard,
  GENTLE_TITLE,
  GameShell,
  shuffle,
  countMatches,
  useFinishOnce,
} from './shared';
import { Button } from '../../components/Button';
import { ORDENA_MISA_DATA } from '../data/ordena-misa';

export interface OrdenaMisaItem {
  id: string;
  label: string;
  hint: string;
}

export interface OrdenaMisaConfig {
  items?: OrdenaMisaItem[];
}

/** Ids de las ranuras mal colocadas (helper puro, testeable). */
export function misplacedIds(
  slots: readonly (string | null)[],
  correctIds: readonly string[],
): string[] {
  const wrong: string[] = [];
  const len = Math.min(slots.length, correctIds.length);
  for (let i = 0; i < len; i++) {
    const id = slots[i];
    if (id !== null && id !== correctIds[i]) wrong.push(id);
  }
  return wrong;
}

export function OrdenaMisaEngine({
  config,
  onComplete,
}: GameEngineProps<OrdenaMisaConfig>) {
  const finish = useFinishOnce(onComplete);
  const items = config.items ?? ORDENA_MISA_DATA.items;
  const correctIds = items.map((i) => i.id);
  const total = items.length;

  const [bank, setBank] = useState<string[]>(() => shuffle(correctIds));
  const [slots, setSlots] = useState<(string | null)[]>(() =>
    Array<string | null>(total).fill(null),
  );
  const [selected, setSelected] = useState<string | null>(null);
  const [firstScore, setFirstScore] = useState<number | null>(null);
  const [wrongHints, setWrongHints] = useState<OrdenaMisaItem[]>([]);
  const [done, setDone] = useState(false);

  const byId = new Map(items.map((i) => [i.id, i]));
  const filled = slots.filter((s) => s !== null).length;

  function tapBank(id: string) {
    if (done) return;
    setWrongHints([]);
    setSelected((prev) => (prev === id ? null : id));
  }

  function tapSlot(index: number) {
    if (done) return;
    setWrongHints([]);
    const current = slots[index];
    if (current !== null) {
      // Devolver la tarjeta al banco.
      setSlots((prev) => prev.map((s, i) => (i === index ? null : s)));
      setBank((prev) => [...prev, current]);
      return;
    }
    if (selected === null) return;
    setSlots((prev) => prev.map((s, i) => (i === index ? selected : s)));
    setBank((prev) => prev.filter((id) => id !== selected));
    setSelected(null);
  }

  function check() {
    const score = countMatches(slots, correctIds);
    if (firstScore === null) setFirstScore(score);
    if (score === total) {
      setDone(true);
      return;
    }
    const wrong = misplacedIds(slots, correctIds);
    setWrongHints(wrong.map((id) => byId.get(id)).filter((i) => i !== undefined));
    // Las tarjetas mal colocadas vuelven al banco para intentarlo de nuevo.
    setSlots((prev) =>
      prev.map((s, i) => (s !== null && s !== correctIds[i] ? null : s)),
    );
    setBank((prev) => [...prev, ...wrong]);
    setSelected(null);
  }

  return (
    <GameShell
      title="Ordena la Misa"
      instructions="Toca una tarjeta y después toca la ranura donde crees que va. Cuando estén las cinco, pulsa «Comprobar»."
      progress={{ current: filled, total, label: 'Partes colocadas' }}
    >
      <div className="gx-grid gx-grid--2" role="group" aria-label="Tarjetas desordenadas">
        {bank.map((id) => {
          const item = byId.get(id);
          if (!item) return null;
          return (
            <button
              key={id}
              type="button"
              className={`gx-tile${selected === id ? ' gx-tile--selected' : ''}`}
              aria-pressed={selected === id}
              onClick={() => tapBank(id)}
            >
              <span>{item.label}</span>
              <span className="gx-tile__sub">{item.hint}</span>
            </button>
          );
        })}
        {bank.length === 0 && (
          <p className="gx-note">Todas las tarjetas están colocadas. ¡Comprueba el orden!</p>
        )}
      </div>

      <div className="gx-slots" role="group" aria-label="Orden de la Misa">
        {slots.map((slotId, i) => {
          const item = slotId ? byId.get(slotId) : undefined;
          return (
            <button
              key={i}
              type="button"
              className={`gx-slot${item ? ' gx-slot--filled' : ''}`}
              onClick={() => tapSlot(i)}
              aria-label={
                item
                  ? `Puesto ${i + 1}: ${item.label}. Toca para devolverla al banco.`
                  : selected
                    ? `Puesto ${i + 1} vacío. Toca para colocar la tarjeta elegida.`
                    : `Puesto ${i + 1} vacío. Elige primero una tarjeta.`
              }
            >
              <span className="gx-slot__num" aria-hidden="true">{i + 1}</span>
              <span>{item ? item.label : 'Toca aquí para colocar'}</span>
            </button>
          );
        })}
      </div>

      {wrongHints.length > 0 && (
        <FeedbackCard
          tone="gentle"
          title={GENTLE_TITLE}
          message="Algunas tarjetas no están en su sitio. Vuelven al banco: fíjate en las pistas."
          hint={wrongHints.map((w) => `${w.label}: ${w.hint}`).join(' ')}
          primary={{ label: 'Probar otra vez', onClick: () => setWrongHints([]) }}
        />
      )}

      {done ? (
        <FeedbackCard
          tone="success"
          title="¡Muy bien! La Misa ya está en orden."
          message="Ritos iniciales, Liturgia de la Palabra, Liturgia eucarística, Rito de la Comunión y Despedida: así celebramos cada domingo."
          primary={{
            label: 'Continuar',
            onClick: () => finish({ score: firstScore ?? total, total }),
          }}
        />
      ) : (
        <div className="gx-actions">
          <Button
            variant="primary"
            onClick={check}
            disabled={filled < total}
          >
            Comprobar
          </Button>
        </div>
      )}
    </GameShell>
  );
}
