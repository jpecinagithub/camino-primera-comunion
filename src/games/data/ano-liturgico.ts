/**
 * Datos de ejemplo — «La rueda del año litúrgico».
 * Colores litúrgicos: Adviento y Cuaresma (morado), Navidad y Pascua (blanco),
 * Tiempo Ordinario (verde), Semana Santa (rojo).
 */
import type { AnoLiturgicoConfig } from '../engines/ano-liturgico';

export const ANO_LITURGICO_DATA: Required<AnoLiturgicoConfig> = {
  seasons: [
    {
      id: 'adviento',
      name: 'Adviento',
      color: 'morado',
      colorHex: '#8e6fb8',
      symbol: 'Flame',
      description:
        'Las cuatro semanas antes de Navidad. Preparamos el corazón para la venida de Jesús, con esperanza.',
    },
    {
      id: 'navidad',
      name: 'Navidad',
      color: 'blanco',
      colorHex: '#f7f3e6',
      symbol: 'Star',
      description:
        'Celebramos que Jesús nació en Belén: Dios se hace niño por amor a nosotros.',
    },
    {
      id: 'ordinario',
      name: 'Tiempo Ordinario',
      color: 'verde',
      colorHex: '#7fb069',
      symbol: 'Sprout',
      description:
        'Las semanas en las que caminamos con Jesús y aprendemos de su vida, poco a poco.',
    },
    {
      id: 'cuaresma',
      name: 'Cuaresma',
      color: 'morado',
      colorHex: '#8e6fb8',
      symbol: 'Heart',
      description:
        'Los cuarenta días antes de la Semana Santa. Rezamos más, compartimos y preparamos el corazón.',
    },
    {
      id: 'semana-santa',
      name: 'Semana Santa',
      color: 'rojo',
      colorHex: '#d95d4e',
      symbol: 'Cross',
      description:
        'Acompañamos a Jesús en su Pasión con amor, esperando la gran alegría de la Pascua.',
    },
    {
      id: 'pascua',
      name: 'Pascua',
      color: 'blanco',
      colorHex: '#f7f3e6',
      symbol: 'Sun',
      description:
        'Cincuenta días de fiesta: ¡Jesús ha resucitado y está vivo entre nosotros!',
    },
  ],
};
