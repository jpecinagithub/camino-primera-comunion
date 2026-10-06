/**
 * Catálogo de juegos (área de niños) — Camino a la Primera Comunión
 * ----------------------------------------------------------------------------
 * Los 12 juegos del itinerario: los ids coinciden con los `gameIds` de las
 * lecciones (ver src/data/lessons). La disponibilidad real la marca el
 * equipo de juegos registrando motores en `src/games/registry.ts`; aquí
 * definimos los metadatos para mostrar (título, descripción, icono).
 *
 * Regla: una tarjeta se muestra como "Próximamente" si `getGame(id)` no
 * devuelve meta o si el motor no está registrado (GameHost muestra entonces
 * el placeholder "en construcción").
 */

export interface JuegoInfo {
  id: string;
  title: string;
  description: string;
  /** Nombre del icono en lucide-react. */
  icon: string;
  /** Clave de color de la paleta: 'sky' | 'gold' | 'green' | 'coral'. */
  color: string;
}

export const JUEGOS: JuegoInfo[] = [
  {
    id: 'memory',
    title: 'Memoria de símbolos',
    description: 'Encuentra las parejas de símbolos de nuestra fe.',
    icon: 'Grid2x2',
    color: 'sky',
  },
  {
    id: 'ordena-misa',
    title: 'Ordena la Misa',
    description: 'Pon en orden las partes de la Misa, paso a paso.',
    icon: 'ListOrdered',
    color: 'gold',
  },
  {
    id: 'verdadero-falso',
    title: '¿Verdadero o falso?',
    description: '¿Es verdad lo que dice esta frase? ¡Adivínalo!',
    icon: 'CircleCheck',
    color: 'green',
  },
  {
    id: 'sacramentos',
    title: 'Los sacramentos',
    description: 'Descubre los 7 sacramentos jugando.',
    icon: 'Droplets',
    color: 'coral',
  },
  {
    id: 'detective-evangelio',
    title: 'Detective del Evangelio',
    description: 'Investiga las pistas y resuelve el misterio.',
    icon: 'Search',
    color: 'sky',
  },
  {
    id: 'quien-dijo-que',
    title: '¿Quién dijo qué?',
    description: 'Une cada frase con quien la dijo.',
    icon: 'MessagesSquare',
    color: 'gold',
  },
  {
    id: 'camino-decisiones',
    title: 'El camino de las decisiones',
    description: 'Elige bien en cada cruce del camino.',
    icon: 'Signpost',
    color: 'green',
  },
  {
    id: 'completa-oracion',
    title: 'Completa la oración',
    description: 'Faltan palabras en la oración… ¡complétala tú!',
    icon: 'PenLine',
    color: 'coral',
  },
  {
    id: 'descubre-iglesia',
    title: 'Descubre la iglesia',
    description: 'Explora la iglesia y encuentra sus rincones.',
    icon: 'Church',
    color: 'sky',
  },
  {
    id: 'mapa-tierra-santa',
    title: 'Mapa de Tierra Santa',
    description: 'Viaja por los lugares donde vivió Jesús.',
    icon: 'Map',
    color: 'gold',
  },
  {
    id: 'reto-semana',
    title: 'El reto de la semana',
    description: 'Una pequeña misión para vivir lo aprendido.',
    icon: 'Target',
    color: 'green',
  },
  {
    id: 'ano-liturgico',
    title: 'La rueda del año',
    description: 'Gira la rueda y descubre los tiempos de la Iglesia.',
    icon: 'RotateCw',
    color: 'coral',
  },
];
