/**
 * Oraciones fundamentales — Camino a la Primera Comunión
 * ----------------------------------------------------------------------------
 * Las cuatro oraciones tradicionales que todo niño aprende para su Primera
 * Comunión. Textos tradicionales de dominio público. No editar el texto
 * sagrado; se puede cambiar el acompañamiento ('nota').
 */

export interface OracionFundamental {
  id: string;
  title: string;
  /** Texto tradicional, dividido en líneas para la lectura serena. */
  lines: string[];
  /** Nota corta para el niño (cómo/cuándo rezarla). */
  note: string;
}

export const ORACIONES_FUNDAMENTALES: OracionFundamental[] = [
  {
    id: 'padrenuestro',
    title: 'Padrenuestro',
    lines: [
      'Padre nuestro, que estás en el cielo,',
      'santificado sea tu Nombre;',
      'venga a nosotros tu reino;',
      'hágase tu voluntad, en la tierra como en el cielo.',
      'Danos hoy nuestro pan de cada día;',
      'perdona nuestras ofensas,',
      'como también nosotros perdonamos a los que nos ofenden;',
      'no nos dejes caer en la tentación,',
      'y líbranos del mal.',
      'Amén.',
    ],
    note: 'La oración que Jesús nos enseñó. La rezamos en cada Misa.',
  },
  {
    id: 'avemaria',
    title: 'Avemaría',
    lines: [
      'Dios te salve, María,',
      'llena eres de gracia,',
      'el Señor es contigo;',
      'bendita Tú eres entre todas las mujeres,',
      'y bendito es el fruto de tu vientre, Jesús.',
      'Santa María, Madre de Dios,',
      'ruega por nosotros, pecadores,',
      'ahora y en la hora de nuestra muerte.',
      'Amén.',
    ],
    note: 'El saludo a María, nuestra Madre del cielo.',
  },
  {
    id: 'gloria',
    title: 'Gloria',
    lines: [
      'Gloria al Padre, y al Hijo, y al Espíritu Santo.',
      'Como era en el principio,',
      'ahora y siempre,',
      'por los siglos de los siglos.',
      'Amén.',
    ],
    note: 'Una alabanza corta a Dios Padre, Hijo y Espíritu Santo.',
  },
  {
    id: 'angel-de-la-guarda',
    title: 'Ángel de mi guarda',
    lines: [
      'Ángel de mi guarda,',
      'dulce compañía,',
      'no me desampares,',
      'ni de noche ni de día.',
      'No me dejes solo,',
      'que me perdería.',
      'Amén.',
    ],
    note: 'Para pedirle a tu ángel que te cuide cada día.',
  },
];
