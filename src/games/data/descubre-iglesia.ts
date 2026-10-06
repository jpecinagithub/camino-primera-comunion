/**
 * Datos de ejemplo — «Descubre la iglesia».
 * Las zonas clicables del SVG viven en el motor (PART_ZONES),
 * vinculadas por `id` con estas partes.
 */
import type { DescubreIglesiaConfig } from '../engines/descubre-iglesia';

export const DESCUBRE_IGLESIA_DATA: Required<DescubreIglesiaConfig> = {
  parts: [
    {
      id: 'nave',
      name: 'La nave',
      description:
        'Es la sala grande de la iglesia, donde nos reunimos todos para celebrar la Misa en comunidad.',
      hint: 'Es la parte más grande de la iglesia, donde están los bancos.',
    },
    {
      id: 'altar',
      name: 'El altar',
      description:
        'La mesa donde el sacerdote celebra la Eucaristía: allí el pan y el vino se convierten en el Cuerpo y la Sangre de Jesús.',
      hint: 'Es la mesa del centro, la más importante de todas.',
    },
    {
      id: 'ambon',
      name: 'El ambón',
      description:
        'El atril desde donde se leen las lecturas y el Evangelio: es la mesa de la Palabra de Dios.',
      hint: 'Busca el atril desde donde se lee la Palabra.',
    },
    {
      id: 'sagrario',
      name: 'El sagrario',
      description:
        'La pequeña capilla donde se guarda a Jesús Eucaristía. La lamparilla encendida nos dice que Él está ahí.',
      hint: 'Es como una casita pequeña con una lucecita encendida.',
    },
    {
      id: 'cruz',
      name: 'La cruz',
      description:
        'Nos recuerda que Jesús nos ama tanto que dio su vida por nosotros.',
      hint: 'Mira hacia lo alto, sobre el altar.',
    },
    {
      id: 'pila',
      name: 'La pila bautismal',
      description:
        'La pila con agua bendita donde se celebra el Bautismo y nacemos a la vida de hijos de Dios.',
      hint: 'Está cerca de la entrada: es una pila con agua.',
    },
    {
      id: 'bancos',
      name: 'Los bancos',
      description:
        'Los asientos donde nos sentamos para escuchar, rezar y cantar juntos como familia.',
      hint: 'Son las filas de asientos de la nave.',
    },
  ],
};
