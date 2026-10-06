/**
 * Datos de ejemplo — «Ordena la Misa».
 * El orden del array es el orden correcto de la celebración.
 */
import type { OrdenaMisaConfig } from '../engines/ordena-misa';

export const ORDENA_MISA_DATA: Required<OrdenaMisaConfig> = {
  items: [
    {
      id: 'ritos-iniciales',
      label: 'Ritos iniciales',
      hint: 'Es lo primero: nos reunimos, cantamos y pedimos perdón a Dios.',
    },
    {
      id: 'liturgia-palabra',
      label: 'Liturgia de la Palabra',
      hint: 'Escuchamos con atención las lecturas y el Evangelio.',
    },
    {
      id: 'liturgia-eucaristica',
      label: 'Liturgia eucarística',
      hint: 'El sacerdote ofrece el pan y el vino, que se convierten en el Cuerpo y la Sangre de Jesús.',
    },
    {
      id: 'rito-comunion',
      label: 'Rito de la Comunión',
      hint: 'Rezamos el Padrenuestro y recibimos a Jesús con alegría.',
    },
    {
      id: 'despedida',
      label: 'Despedida',
      hint: 'Es lo último: recibimos la bendición y salimos a vivir lo celebrado.',
    },
  ],
};
