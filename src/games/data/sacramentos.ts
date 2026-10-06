/**
 * Datos de ejemplo — «Los siete sacramentos».
 * Cada sacramento: nombre, símbolo (icono Lucide) y significado breve.
 */
import type { SacramentosConfig } from '../engines/sacramentos';

export const SACRAMENTOS_DATA: Required<SacramentosConfig> = {
  sacraments: [
    {
      id: 'bautismo',
      name: 'Bautismo',
      symbol: 'Droplets',
      meaning: 'Nacemos a la vida nueva como hijos de Dios.',
    },
    {
      id: 'confirmacion',
      name: 'Confirmación',
      symbol: 'Flame',
      meaning: 'El Espíritu Santo nos hace fuertes para seguir a Jesús.',
    },
    {
      id: 'eucaristia',
      name: 'Eucaristía',
      symbol: 'Wheat',
      meaning: 'Recibimos a Jesús, Pan de vida, en la Comunión.',
    },
    {
      id: 'reconciliacion',
      name: 'Reconciliación',
      symbol: 'Heart',
      meaning: 'Dios nos perdona y nos devuelve la alegría.',
    },
    {
      id: 'uncion',
      name: 'Unción de los enfermos',
      symbol: 'HandHeart',
      meaning: 'Jesús acompaña y consuela a los que están enfermos.',
    },
    {
      id: 'orden',
      name: 'Orden sacerdotal',
      symbol: 'Church',
      meaning: 'Algunos son llamados a servir a todos como sacerdotes.',
    },
    {
      id: 'matrimonio',
      name: 'Matrimonio',
      symbol: 'HeartHandshake',
      meaning: 'Dos personas se prometen amor para siempre ante Dios.',
    },
  ],
};
