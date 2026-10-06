/**
 * Recursos recomendados para padres.
 * REGLA: solo referencias orientativas, SIN enlaces inventados.
 * La app no es oficial de la CEE; estos recursos se citan como marco
 * de referencia, no como aval.
 *
 * Importar desde: `src/data/padres/recursos.ts`
 */

export interface ParentResource {
  id: string;
  name: string;
  /** Tipo de recurso (catecismo, documento, libro, persona…). */
  kind: string;
  description: string;
}

/** Nota aclaratoria que se muestra junto a la lista. */
export const RESOURCES_NOTE =
  'Estas referencias son orientativas: te señalan dónde profundizar, no sustituyen el acompañamiento de tu parroquia ni de tu catequista. Ante cualquier duda concreta, pregunta siempre en tu parroquia.';

export const RESOURCES: ParentResource[] = [
  {
    id: 'cee-comision',
    name: 'Comisión Episcopal para la Evangelización, Catequesis y Catecumenado',
    kind: 'Organismo de la Conferencia Episcopal Española',
    description:
      'Es la comisión de los obispos españoles encargada de la catequesis. Publica orientaciones y materiales para la iniciación cristiana. Su marco de referencia para estas edades es el catecismo «Jesús es el Señor».',
  },
  {
    id: 'jesus-es-el-senor',
    name: '«Jesús es el Señor», catecismo de la CEE',
    kind: 'Catecismo',
    description:
      'El catecismo que la Conferencia Episcopal Española propone para la infancia. Esta app sigue su itinerario de contenidos como marco de referencia.',
  },
  {
    id: 'directorio-catequesis',
    name: 'Directorio para la Catequesis',
    kind: 'Documento de la Iglesia universal',
    description:
      'Publicado por el Pontificio Consejo para la Promoción de la Nueva Evangelización, recoge los criterios de la Iglesia para la catequesis de todas las edades, incluida la familiar.',
  },
  {
    id: 'cec',
    name: 'Catecismo de la Iglesia Católica',
    kind: 'Catecismo',
    description:
      'La exposición completa y ordenada de la fe católica. Útil cuando quieras profundizar en algún tema concreto que surja en casa.',
  },
  {
    id: 'biblia',
    name: 'La Biblia',
    kind: 'Libro',
    description:
      'La Palabra de Dios, el libro de cabecera de toda familia cristiana. Para leer con niños existen ediciones adaptadas con ilustraciones que mantienen la fidelidad al texto.',
  },
  {
    id: 'parroquia',
    name: 'Tu parroquia: el párroco y los catequistas',
    kind: 'Personas',
    description:
      'El recurso más importante no es un libro, sino las personas que acompañan a tu hijo: su catequista y tu párroco. Ellos conocen vuestra realidad y pueden responder a tus dudas concretas mejor que ninguna app.',
  },
];
