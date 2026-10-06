/**
 * Motor «Parejas de la Misa» — memory
 * ----------------------------------------------------------------------------
 * Memory clásico de 8 parejas (icono Lucide + palabra en cada carta).
 * Toca una carta y luego otra: si coinciden, se quedan descubiertas.
 * Sin prisas ni contadores de presión.
 */
import { useEffect, useState } from 'react';
import type { GameEngineProps } from '../types';
import { GameIcon, GameShell, shuffle, useFinishOnce } from './shared';
import { MEMORY_DATA } from '../data/memory';

export interface MemoryPair {
  id: string;
  label: string;
  icon: string;
}

export interface MemoryConfig {
  pairs?: MemoryPair[];
}

export interface MemoryCard {
  uid: number;
  pairId: string;
}

/** Construye el mazo: 2 cartas por pareja, mezcladas. Helper puro testeable. */
export function buildDeck(
  pairs: readonly MemoryPair[],
  rand: () => number = Math.random,
): MemoryCard[] {
  const cards: MemoryCard[] = [];
  pairs.forEach((p, pi) => {
    cards.push({ uid: pi * 2, pairId: p.id });
    cards.push({ uid: pi * 2 + 1, pairId: p.id });
  });
  return shuffle(cards, rand);
}

export function MemoryEngine({ config, onComplete }: GameEngineProps<MemoryConfig>) {
  const finish = useFinishOnce(onComplete);
  const pairs = config.pairs ?? MEMORY_DATA.pairs;
  const total = pairs.length;
  const byId = new Map(pairs.map((p) => [p.id, p]));

  const [deck] = useState<MemoryCard[]>(() => buildDeck(pairs));
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [locked, setLocked] = useState(false);

  // Resolver la jugada cuando hay dos cartas boca arriba.
  useEffect(() => {
    if (flipped.length !== 2) return;
    setLocked(true);
    const [a, b] = flipped;
    const cardA = deck.find((c) => c.uid === a);
    const cardB = deck.find((c) => c.uid === b);
    const isMatch = cardA !== undefined && cardB !== undefined && cardA.pairId === cardB.pairId;
    const timer = window.setTimeout(
      () => {
        if (isMatch && cardA) {
          setMatched((prev) => (prev.includes(cardA.pairId) ? prev : [...prev, cardA.pairId]));
        }
        setFlipped([]);
        setLocked(false);
      },
      isMatch ? 550 : 950,
    );
    return () => window.clearTimeout(timer);
  }, [flipped, deck]);

  // Terminar cuando se encuentran todas las parejas.
  useEffect(() => {
    if (total > 0 && matched.length === total) {
      finish({ score: total, total });
    }
  }, [matched, total, finish]);

  function tap(uid: number) {
    if (locked) return;
    const card = deck.find((c) => c.uid === uid);
    if (!card || matched.includes(card.pairId) || flipped.includes(uid)) return;
    if (flipped.length >= 2) return;
    setFlipped((prev) => [...prev, uid]);
  }

  const finished = matched.length === total && total > 0;

  return (
    <GameShell
      title="Parejas de la Misa"
      instructions="Toca una carta para verla y busca su pareja. Cuando encuentres las ocho, ¡habrás terminado!"
      progress={{ current: matched.length, total, label: 'Parejas encontradas' }}
    >
      <div className="gx-memory" role="group" aria-label="Cartas del memory">
        {deck.map((card, i) => {
          const pair = byId.get(card.pairId);
          const isUp = flipped.includes(card.uid) || matched.includes(card.pairId);
          const isMatched = matched.includes(card.pairId);
          return (
            <button
              key={card.uid}
              type="button"
              className={`gx-mcard${isUp ? ' gx-mcard--up' : ''}${isMatched ? ' gx-mcard--matched' : ''}`}
              onClick={() => tap(card.uid)}
              disabled={isMatched || finished}
              aria-label={
                isUp && pair
                  ? `${pair.label}`
                  : `Carta ${i + 1}, sin descubrir`
              }
            >
              {isUp && pair ? (
                <>
                  <GameIcon name={pair.icon} size={30} />
                  <span className="gx-mcard__label">{pair.label}</span>
                </>
              ) : (
                <span className="gx-mcard__back" aria-hidden="true">?</span>
              )}
            </button>
          );
        })}
      </div>
      {finished && (
        <p className="gx-note" role="status">
          ¡Increíble! Has encontrado las ocho parejas. ¡Qué buena memoria!
        </p>
      )}
    </GameShell>
  );
}
