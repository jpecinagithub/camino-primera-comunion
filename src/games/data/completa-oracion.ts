/**
 * Datos de ejemplo — «Completa la oración» (el Ave María).
 * `segments`: texto fijo o hueco {blank, answer, hint}.
 * Todas las respuestas están en `wordBank` (más 3 distractores).
 */
import type { CompletaOracionConfig } from '../engines/completa-oracion';

export const COMPLETA_ORACION_DATA: Required<CompletaOracionConfig> = {
  prayerTitle: 'El Ave María',
  segments: [
    'Dios te salve, ',
    { blank: 'b1', answer: 'María', hint: 'La Madre de Jesús.' },
    ', llena eres de ',
    { blank: 'b2', answer: 'gracia', hint: 'Un regalo de Dios que llena el corazón.' },
    ', el Señor es ',
    { blank: 'b3', answer: 'contigo', hint: 'Dios está muy cerca de ella.' },
    '. Bendita tú eres entre todas las ',
    { blank: 'b4', answer: 'mujeres', hint: 'Ella es la más bendita de todas.' },
    ' y bendito es el fruto de tu vientre, ',
    { blank: 'b5', answer: 'Jesús', hint: 'El Hijo de Dios.' },
    '. Santa María, ',
    { blank: 'b6', answer: 'Madre', hint: 'Así la llamamos: … de Dios.' },
    ' de Dios, ruega por nosotros, ',
    { blank: 'b7', answer: 'pecadores', hint: 'Todos necesitamos su ayuda.' },
    ', ahora y en la hora de nuestra muerte. Amén.',
  ],
  wordBank: [
    'María',
    'gracia',
    'contigo',
    'mujeres',
    'Jesús',
    'Madre',
    'pecadores',
    'cielo',
    'luz',
    'paz',
  ],
};
