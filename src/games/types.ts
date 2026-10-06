/**
 * Contrato de motores de juego — Camino a la Primera Comunión
 * ----------------------------------------------------------------------------
 * CONTRATO ESTABLE (Fase 0). Cada juego que cree el equipo de juegos debe:
 *  1. Registrar su metadata en `src/games/registry.ts` (array GAMES).
 *  2. Implementar un componente que reciba `GameEngineProps` y llame a
 *     `onComplete({ score, total })` UNA vez al terminar la partida.
 *  3. No guardar nada por su cuenta: el `GameHost` persiste el resultado
 *     con `markGameComplete` (ver src/db/hooks.ts).
 *
 * Importar desde: `src/games/types.ts`
 */

/** Resultado que todo motor debe entregar al terminar. */
export interface GameResult {
  score: number;
  total: number;
}

/**
 * Props que recibe todo motor de juego.
 * TConfig: configuración específica del juego (dificultad, items...).
 */
export interface GameEngineProps<TConfig = unknown> {
  config: TConfig;
  gameId: string;
  onComplete: (r: GameResult) => void;
}

/** Metadata para el catálogo de juegos (`/ninos/jugar`). */
export interface GameMeta {
  /** Identificador único, p. ej. 'memoria-parejas'. Se usa como gameId. */
  id: string;
  title: string;
  description: string;
  /** Nombre del icono en lucide-react, p. ej. 'Puzzle'. */
  icon: string;
  /**
   * Clave del motor que lo renderiza. El GameHost la resuelve contra
   * ENGINE_COMPONENTS (ver src/games/GameHost.tsx).
   */
  engine: string;
}
