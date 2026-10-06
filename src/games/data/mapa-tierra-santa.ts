/**
 * Datos de ejemplo — «Mapa de Tierra Santa».
 * Coordenadas x/y relativas (0–100) sobre el SVG del motor.
 */
import type { MapaTierraSantaConfig } from '../engines/mapa-tierra-santa';

export const MAPA_TIERRA_SANTA_DATA: Required<MapaTierraSantaConfig> = {
  places: [
    {
      id: 'belen',
      name: 'Belén',
      hint: 'Está al sur de Jerusalén.',
      fact: 'En Belén nació Jesús, en un pesebre, porque no había sitio en la posada.',
      x: 44,
      y: 68,
    },
    {
      id: 'nazaret',
      name: 'Nazaret',
      hint: 'Está en el norte, en la región de Galilea.',
      fact: 'En Nazaret creció Jesús con María y José, trabajando como carpintero.',
      x: 46,
      y: 30,
    },
    {
      id: 'jerusalen',
      name: 'Jerusalén',
      hint: 'Está casi en el centro del mapa.',
      fact: 'En Jerusalén Jesús murió y resucitó por nosotros.',
      x: 50,
      y: 56,
    },
    {
      id: 'jordan',
      name: 'El río Jordán',
      hint: 'Es la línea azul que baja hasta el mar Muerto.',
      fact: 'En el río Jordán bautizó Juan a Jesús.',
      x: 63,
      y: 48,
    },
    {
      id: 'galilea',
      name: 'El lago de Galilea',
      hint: 'Es el lago azul del norte.',
      fact: 'Junto a este lago Jesús llamó a sus apóstoles, que eran pescadores.',
      x: 60,
      y: 30,
    },
  ],
};
