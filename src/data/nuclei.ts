/**
 * Los 10 núcleos del itinerario — Camino a la Primera Comunión
 * ----------------------------------------------------------------------------
 * CONTRATO: los ids (n1..n10) y los títulos son FIJOS. Las lecciones de cada
 * núcleo las añade el equipo de contenido rellenando `lessonIds` con los
 * `id` de cada Lesson (y deben validar con validateLesson / validateNucleus).
 *
 * `color`: clave de paleta ('sky' | 'gold' | 'green' | 'coral'). Mapeo a
 * variables CSS en NUCLEUS_COLOR_TOKENS.
 * `icon`: nombre del icono en lucide-react (p. ej. `Church`).
 *
 * Importar desde: `src/data/nuclei.ts`
 */
import type { Nucleus } from './model';

/** Mapeo clave de color → variables CSS (fondo suave + acento oscuro). */
export const NUCLEUS_COLOR_TOKENS: Record<string, { bg: string; fg: string }> = {
  sky: { bg: 'var(--color-sky)', fg: 'var(--color-sky-dark)' },
  gold: { bg: 'var(--color-gold)', fg: 'var(--color-gold-dark)' },
  green: { bg: 'var(--color-green)', fg: 'var(--color-green-dark)' },
  coral: { bg: 'var(--color-coral)', fg: 'var(--color-coral-dark)' },
};

export const NUCLEI: Nucleus[] = [
  {
    id: 'n1',
    number: 1,
    title: 'La Iglesia y los cristianos',
    description:
      'Descubrimos que la Iglesia es la gran familia de los que siguen a Jesús.',
    icon: 'Church',
    color: 'sky',
    lessonIds: [],
  },
  {
    id: 'n2',
    number: 2,
    title: 'Dios es nuestro Padre',
    description:
      'Dios nos quiere como un Padre bueno que nos cuida cada día.',
    icon: 'Heart',
    color: 'gold',
    lessonIds: [],
  },
  {
    id: 'n3',
    number: 3,
    title: 'Jesús viene a salvarnos',
    description:
      'Dios cumple su promesa y nos envía a Jesús, nuestro Salvador.',
    icon: 'Star',
    color: 'coral',
    lessonIds: [],
  },
  {
    id: 'n4',
    number: 4,
    title: 'Jesús, el Hijo de Dios, vivió entre nosotros',
    description:
      'Jesús creció como nosotros y nos enseñó a amar con sus palabras y sus gestos.',
    icon: 'Footprints',
    color: 'green',
    lessonIds: [],
  },
  {
    id: 'n5',
    number: 5,
    title: 'Jesús entrega su vida por nosotros',
    description:
      'En la cruz y en la resurrección, Jesús nos muestra hasta dónde llega su amor.',
    icon: 'Cross',
    color: 'coral',
    lessonIds: [],
  },
  {
    id: 'n6',
    number: 6,
    title: 'El Espíritu Santo y la Iglesia',
    description:
      'El Espíritu Santo da fuerza a la Iglesia y nos ayuda a ser amigos de Jesús.',
    icon: 'Flame',
    color: 'gold',
    lessonIds: [],
  },
  {
    id: 'n7',
    number: 7,
    title: 'Por el Bautismo nacemos a la vida nueva',
    description:
      'En el Bautismo Dios nos hace sus hijos y entramos en su familia.',
    icon: 'Droplets',
    color: 'sky',
    lessonIds: [],
  },
  {
    id: 'n8',
    number: 8,
    title: 'La Reconciliación: recibimos el perdón que nos renueva',
    description:
      'Cuando nos equivocamos, Dios Padre siempre nos perdona y nos abraza de nuevo.',
    icon: 'HeartHandshake',
    color: 'green',
    lessonIds: [],
  },
  {
    id: 'n9',
    number: 9,
    title: 'La Eucaristía: nos alimentamos con el Cuerpo y la Sangre del Señor',
    description:
      'En la Misa Jesús se nos da como alimento para estar siempre con nosotros.',
    icon: 'Wheat',
    color: 'gold',
    lessonIds: [],
  },
  {
    id: 'n10',
    number: 10,
    title: 'Con Jesús, por siempre, en la Casa del Padre',
    description:
      'Caminamos con Jesús hacia el cielo, la casa donde nos espera el Padre.',
    icon: 'House',
    color: 'sky',
    lessonIds: [],
  },
];

/** Busca un núcleo por id. */
export function getNucleus(id: string): Nucleus | undefined {
  return NUCLEI.find((n) => n.id === id);
}
