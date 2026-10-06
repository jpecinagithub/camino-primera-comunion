/**
 * GameHost — Camino a la Primera Comunión
 * ----------------------------------------------------------------------------
 * Resuelve el motor del juego por su clave `engine`, lo renderiza y persiste
 * el resultado con markGameComplete. Los 12 motores están registrados en
 * ENGINE_COMPONENTS.
 *
 * Props: gameId (string). Se usa en la ruta /ninos/juego/:id.
 */
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { GameEngineProps, GameMeta, GameResult } from './types';
import { getGame } from './registry';
import { markGameComplete } from '../db/hooks';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Gamepad2 } from 'lucide-react';
import { OrdenaMisaEngine } from './engines/ordena-misa';
import { AnoLiturgicoEngine } from './engines/ano-liturgico';
import { MemoryEngine } from './engines/memory';
import { QuienDijoQueEngine } from './engines/quien-dijo-que';
import { CompletaOracionEngine } from './engines/completa-oracion';
import { CaminoDecisionesEngine } from './engines/camino-decisiones';
import { SacramentosEngine } from './engines/sacramentos';
import { DetectiveEvangelioEngine } from './engines/detective-evangelio';
import { DescubreIglesiaEngine } from './engines/descubre-iglesia';
import { VerdaderoFalsoEngine } from './engines/verdadero-falso';
import { MapaTierraSantaEngine } from './engines/mapa-tierra-santa';
import { RetoSemanaEngine } from './engines/reto-semana';

/**
 * Registro clave engine → componente motor.
 * Cada motor recibe GameEngineProps y llama onComplete al terminar.
 * (Exportado para que los tests verifiquen que todo juego tiene motor.)
 */
export const ENGINE_COMPONENTS: Record<
  string,
  React.ComponentType<GameEngineProps<unknown>>
> = {
  'ordena-misa': OrdenaMisaEngine as React.ComponentType<GameEngineProps<unknown>>,
  'ano-liturgico': AnoLiturgicoEngine as React.ComponentType<GameEngineProps<unknown>>,
  'memory': MemoryEngine as React.ComponentType<GameEngineProps<unknown>>,
  'quien-dijo-que': QuienDijoQueEngine as React.ComponentType<GameEngineProps<unknown>>,
  'completa-oracion': CompletaOracionEngine as React.ComponentType<GameEngineProps<unknown>>,
  'camino-decisiones': CaminoDecisionesEngine as React.ComponentType<GameEngineProps<unknown>>,
  'sacramentos': SacramentosEngine as React.ComponentType<GameEngineProps<unknown>>,
  'detective-evangelio': DetectiveEvangelioEngine as React.ComponentType<GameEngineProps<unknown>>,
  'descubre-iglesia': DescubreIglesiaEngine as React.ComponentType<GameEngineProps<unknown>>,
  'verdadero-falso': VerdaderoFalsoEngine as React.ComponentType<GameEngineProps<unknown>>,
  'mapa-tierra-santa': MapaTierraSantaEngine as React.ComponentType<GameEngineProps<unknown>>,
  'reto-semana': RetoSemanaEngine as React.ComponentType<GameEngineProps<unknown>>,
};

interface GameHostProps {
  gameId: string;
  onExit?: () => void;
}

export function GameHost({ gameId, onExit }: GameHostProps) {
  const { t } = useTranslation();
  const [finished, setFinished] = useState<GameResult | null>(null);
  const meta: GameMeta | undefined = getGame(gameId);
  const Engine = meta ? ENGINE_COMPONENTS[meta.engine] : undefined;

  const handleComplete = useCallback(
    async (r: GameResult) => {
      setFinished(r);
      await markGameComplete(gameId, r.score, r.total);
    },
    [gameId],
  );

  if (!meta || !Engine) {
    return (
      <Card>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--space-4)',
            padding: 'var(--space-6)',
            textAlign: 'center',
          }}
        >
          <Gamepad2 size={48} aria-hidden="true" color="var(--color-sky-dark)" />
          <h2 style={{ margin: 0 }}>{t('game.underConstruction')}</h2>
          <p style={{ color: 'var(--color-ink-soft)', margin: 0 }}>
            {t('game.underConstructionHint')}
          </p>
          {onExit && (
            <Button variant="primary" onClick={onExit}>
              {t('common.back')}
            </Button>
          )}
        </div>
      </Card>
    );
  }

  if (finished) {
    return (
      <Card>
        <div style={{ textAlign: 'center', padding: 'var(--space-5)' }}>
          <h2>
            {t('game.finished', { score: finished.score, total: finished.total })}
          </h2>
          {onExit && (
            <Button variant="primary" onClick={onExit}>
              {t('common.continue')}
            </Button>
          )}
        </div>
      </Card>
    );
  }

  return <Engine config={{}} gameId={gameId} onComplete={handleComplete} />;
}
