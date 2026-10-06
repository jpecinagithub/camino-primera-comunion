/**
 * Registro de juegos — Camino a la Primera Comunión
 * ----------------------------------------------------------------------------
 * Los 12 minijuegos del equipo de juegos, cada uno con su motor registrado
 * en ENGINE_COMPONENTS (src/games/GameHost.tsx).
 *
 * Importar desde: `src/games/registry.ts`
 */
import type { GameMeta } from './types';

export const GAMES: GameMeta[] = [
  {
    id: 'ordena-misa',
    title: 'Ordena la Misa',
    description: 'Coloca en orden las cinco partes de la Misa.',
    icon: 'ListOrdered',
    engine: 'ordena-misa',
  },
  {
    id: 'ano-liturgico',
    title: 'La rueda del año',
    description: 'Descubre los tiempos litúrgicos y empareja cada uno con su color y su símbolo.',
    icon: 'CalendarDays',
    engine: 'ano-liturgico',
  },
  {
    id: 'memory',
    title: 'Parejas de la Misa',
    description: 'Encuentra las ocho parejas de símbolos de la Misa.',
    icon: 'LayoutGrid',
    engine: 'memory',
  },
  {
    id: 'quien-dijo-que',
    title: '¿Quién dijo qué?',
    description: 'Une cada personaje del Evangelio con sus palabras.',
    icon: 'MessagesSquare',
    engine: 'quien-dijo-que',
  },
  {
    id: 'completa-oracion',
    title: 'Completa la oración',
    description: 'Rellena los huecos del Ave María con las palabras correctas.',
    icon: 'PenLine',
    engine: 'completa-oracion',
  },
  {
    id: 'camino-decisiones',
    title: 'El camino de las decisiones',
    description: 'Elige con el corazón en situaciones de cada día.',
    icon: 'Footprints',
    engine: 'camino-decisiones',
  },
  {
    id: 'sacramentos',
    title: 'Los siete sacramentos',
    description: 'Une cada sacramento con su símbolo y su significado.',
    icon: 'Sparkles',
    engine: 'sacramentos',
  },
  {
    id: 'detective-evangelio',
    title: 'Detective del Evangelio',
    description: 'Sigue las pistas y descubre la parábola o el momento del Evangelio.',
    icon: 'Search',
    engine: 'detective-evangelio',
  },
  {
    id: 'descubre-iglesia',
    title: 'Descubre la iglesia',
    description: 'Toca cada rincón de la iglesia y aprende para qué sirve.',
    icon: 'Church',
    engine: 'descubre-iglesia',
  },
  {
    id: 'verdadero-falso',
    title: '¿Verdadero o falso?',
    description: 'Pon a prueba lo que sabes con ocho afirmaciones.',
    icon: 'CircleCheck',
    engine: 'verdadero-falso',
  },
  {
    id: 'mapa-tierra-santa',
    title: 'Mapa de Tierra Santa',
    description: 'Localiza Belén, Nazaret, Jerusalén y los lugares de Jesús.',
    icon: 'Map',
    engine: 'mapa-tierra-santa',
  },
  {
    id: 'reto-semana',
    title: 'Reto de la semana',
    description: 'Elige pequeños retos de amor y márcalos cuando los hagas.',
    icon: 'Trophy',
    engine: 'reto-semana',
  },
];

/** Busca un juego por id. */
export function getGame(id: string): GameMeta | undefined {
  return GAMES.find((g) => g.id === id);
}
