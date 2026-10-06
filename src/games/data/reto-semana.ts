/**
 * Datos de ejemplo — «Reto de la semana».
 * Pequeñas acciones de amor para elegir (1–3) y marcar al hacerlas.
 */
import type { RetoSemanaConfig } from '../engines/reto-semana';

export const RETO_SEMANA_DATA: Required<RetoSemanaConfig> = {
  challenges: [
    {
      id: 'ayuda-casa',
      title: 'Ayuda en casa',
      description: 'Ayuda sin que te lo pidan: pon la mesa, recoge tu cuarto u ordena los zapatos.',
      icon: 'HandHeart',
    },
    {
      id: 'perdon',
      title: 'Perdón de corazón',
      description: 'Si te enfadas con alguien, pide perdón antes de ir a dormir.',
      icon: 'Heart',
    },
    {
      id: 'gracias',
      title: 'Gracias, gracias',
      description: 'Da las gracias de corazón a tres personas durante el día.',
      icon: 'Sparkles',
    },
    {
      id: 'oracion',
      title: 'Un ratito con Jesús',
      description: 'Reza un padrenuestro pensando en alguien que lo necesite.',
      icon: 'Flame',
    },
    {
      id: 'compartir',
      title: 'Compartir es querer',
      description: 'Comparte un juguete o tu merienda con alguien que lo necesite.',
      icon: 'Gift',
    },
    {
      id: 'abuelos',
      title: 'Alegra a los abuelos',
      description: 'Llama o visita a tus abuelos y cuéntales algo bonito de tu semana.',
      icon: 'Users',
    },
  ],
};
