/**
 * Datos de ejemplo — «¿Quién dijo qué?».
 * Personajes del Evangelio y sus palabras o gestos.
 */
import type { QuienDijoQueConfig } from '../engines/quien-dijo-que';

export const QUIEN_DIJO_QUE_DATA: Required<QuienDijoQueConfig> = {
  pairs: [
    {
      id: 'jesus',
      left: 'Jesús',
      right: '«Dejad que los niños se acerquen a mí»',
      hint: 'Lo dijo el Maestro, que quiere muchísimo a los niños.',
    },
    {
      id: 'maria',
      left: 'María',
      right: '«Haced lo que Él os diga»',
      hint: 'Lo dijo la Madre de Jesús en las bodas de Caná.',
    },
    {
      id: 'pedro',
      left: 'Pedro',
      right: '«Tú eres el Cristo, el Hijo de Dios vivo»',
      hint: 'Lo dijo un apóstol cuando Jesús les preguntó quién era Él.',
    },
    {
      id: 'samaritano',
      left: 'El Buen Samaritano',
      right: 'Cuidó del herido del camino',
      hint: 'No lo dijo con palabras: lo hizo con sus manos y su corazón.',
    },
    {
      id: 'gabriel',
      left: 'El ángel Gabriel',
      right: '«Alégrate, María, el Señor está contigo»',
      hint: 'Lo dijo un ángel cuando anunció a María que sería Madre de Jesús.',
    },
    {
      id: 'juan',
      left: 'Juan el Bautista',
      right: '«Este es el Cordero de Dios»',
      hint: 'Lo dijo señalando a Jesús junto al río Jordán.',
    },
  ],
};
