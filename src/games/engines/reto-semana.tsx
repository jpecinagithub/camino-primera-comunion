/**
 * Motor «Reto de la semana» — reto-semana
 * ----------------------------------------------------------------------------
 * 6 tarjetas de pequeñas acciones. El niño elige 1–3 retos y marca «¡Lo hice!»
 * cuando los cumple (todo local, sin presión). onComplete con
 * total = retos elegidos y score = retos marcados como hechos.
 */
import { useState } from 'react';
import { Check } from 'lucide-react';
import type { GameEngineProps } from '../types';
import { GameIcon, GameShell, useFinishOnce } from './shared';
import { Button } from '../../components/Button';
import { Badge } from '../../components/Badge';
import { RETO_SEMANA_DATA } from '../data/reto-semana';

export interface WeeklyChallenge {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface RetoSemanaConfig {
  challenges?: WeeklyChallenge[];
}

const MAX_PICK = 3;

export function RetoSemanaEngine({
  config,
  onComplete,
}: GameEngineProps<RetoSemanaConfig>) {
  const finish = useFinishOnce(onComplete);
  const challenges = config.challenges ?? RETO_SEMANA_DATA.challenges;

  const [picked, setPicked] = useState<string[]>([]);
  const [started, setStarted] = useState(false);
  const [doneIds, setDoneIds] = useState<string[]>([]);

  const byId = new Map(challenges.map((c) => [c.id, c]));

  function toggle(id: string) {
    setPicked((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length < MAX_PICK
          ? [...prev, id]
          : prev,
    );
  }

  function markDone(id: string) {
    setDoneIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }

  return (
    <GameShell
      title="Reto de la semana"
      instructions={
        started
          ? 'Marca «¡Lo hice!» en cada reto cuando lo hayas hecho de verdad. Sin prisa: termina cuando quieras.'
          : `Elige ${MAX_PICK} retos (o menos) para esta semana. Son pequeñas acciones para querer más y mejor.`
      }
      badge={
        !started ? (
          <Badge tone="sky">
            Has elegido {picked.length} de {MAX_PICK}
          </Badge>
        ) : undefined
      }
    >
      {!started && (
        <>
          <div className="gx-grid gx-grid--2" role="group" aria-label="Retos para elegir">
            {challenges.map((c) => {
              const isPicked = picked.includes(c.id);
              return (
                <button
                  key={c.id}
                  type="button"
                  className={`gx-tile gx-challenge${isPicked ? ' gx-challenge--picked' : ''}`}
                  aria-pressed={isPicked}
                  onClick={() => toggle(c.id)}
                >
                  <span className="gx-challenge__head">
                    <GameIcon name={c.icon} size={30} />
                    <strong>{c.title}</strong>
                  </span>
                  <p>{c.description}</p>
                </button>
              );
            })}
          </div>
          <div className="gx-actions">
            <Button
              variant="primary"
              onClick={() => setStarted(true)}
              disabled={picked.length === 0}
            >
              Empezar mis retos
            </Button>
          </div>
          <p className="gx-note">
            Puedes elegir entre 1 y {MAX_PICK} retos. Si cambias de idea, toca la tarjeta otra vez.
          </p>
        </>
      )}

      {started && (
        <>
          <div className="gx-stack" role="group" aria-label="Mis retos">
            {picked.map((id) => {
              const c = byId.get(id);
              if (!c) return null;
              const isDone = doneIds.includes(id);
              return (
                <div
                  key={id}
                  className={`gx-tile gx-challenge${isDone ? ' gx-tile--done' : ''}`}
                  style={{ cursor: 'default' }}
                >
                  <span className="gx-challenge__head">
                    <GameIcon name={c.icon} size={30} />
                    <strong>{c.title}</strong>
                    {isDone && (
                      <span className="gx-check-row">
                        <Check size={20} aria-hidden="true" /> ¡Hecho!
                      </span>
                    )}
                  </span>
                  <p>{c.description}</p>
                  {!isDone && (
                    <Button variant="secondary" onClick={() => markDone(id)}>
                      ¡Lo hice!
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
          <div className="gx-actions">
            <Button
              variant="primary"
              onClick={() => finish({ score: doneIds.length, total: picked.length })}
            >
              Terminar
            </Button>
          </div>
          <p className="gx-note">
            Has hecho {doneIds.length} de {picked.length} retos. Lo importante es intentarlo con alegría.
          </p>
        </>
      )}
    </GameShell>
  );
}
