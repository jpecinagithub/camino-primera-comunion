/**
 * Datos de ejemplo — «¿Verdadero o falso?».
 * 8 afirmaciones con su explicación amable.
 */
import type { VerdaderoFalsoConfig } from '../engines/verdadero-falso';

export const VERDADERO_FALSO_DATA: Required<VerdaderoFalsoConfig> = {
  statements: [
    {
      id: 'misa-importante',
      text: 'La Misa es la celebración más importante de los cristianos.',
      isTrue: true,
      explanation:
        'En la Misa celebramos la Eucaristía: Jesús se hace presente y nos alimenta. Por eso vamos cada domingo.',
    },
    {
      id: 'comunion-jesus',
      text: 'En la Comunión recibimos de verdad a Jesús.',
      isTrue: true,
      explanation:
        'No es un símbolo: en la Comunión recibimos el Cuerpo de Cristo, que nos une a Él y entre nosotros.',
    },
    {
      id: 'solo-adultos',
      text: 'Solo los adultos pueden rezar.',
      isTrue: false,
      explanation:
        'Los niños también podéis rezar, y a Jesús le encanta escucharos. La oración no tiene edad.',
    },
    {
      id: 'bautismo-hijos',
      text: 'Por el Bautismo nos hacemos hijos de Dios.',
      isTrue: true,
      explanation:
        'En el Bautismo nacemos a la vida nueva: Dios nos hace sus hijos y entramos en su familia, la Iglesia.',
    },
    {
      id: 'cuaresma-40',
      text: 'La Cuaresma dura cuarenta días.',
      isTrue: true,
      explanation:
        'Como los cuarenta días que Jesús pasó en el desierto, la Cuaresma nos prepara para la Pascua.',
    },
    {
      id: 'navidad-belen',
      text: 'En Navidad celebramos que Jesús nació en Belén.',
      isTrue: true,
      explanation:
        'Dios se hizo niño en Belén por amor a nosotros. La Navidad es la fiesta de ese nacimiento.',
    },
    {
      id: 'perdon-magico',
      text: 'Pedir perdón es decir una palabra mágica que lo arregla todo.',
      isTrue: false,
      explanation:
        'Pedir perdón es reconocer de corazón que nos hemos equivocado y querer cambiar. Eso es lo que sana.',
    },
    {
      id: 'maria-madre',
      text: 'María es la Madre de Jesús y también Madre nuestra.',
      isTrue: true,
      explanation:
        'Jesús nos regaló a su Madre desde la cruz. María nos cuida y nos lleva siempre a su Hijo.',
    },
  ],
};
