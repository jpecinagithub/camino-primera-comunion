/**
 * Datos de ejemplo — «Detective del Evangelio».
 * 5 casos con 2–3 pistas para adivinar la parábola o el acontecimiento.
 */
import type { DetectiveEvangelioConfig } from '../engines/detective-evangelio';

export const DETECTIVE_EVANGELIO_DATA: Required<DetectiveEvangelioConfig> = {
  cases: [
    {
      id: 'samaritano',
      clues: [
        'Un hombre fue asaltado en un camino y quedó herido.',
        'Un sacerdote y un levita pasaron de largo.',
        'Un extranjero se detuvo, curó sus heridas y pagó su cuidado.',
      ],
      options: [
        'El Buen Samaritano',
        'El hijo pródigo',
        'La oveja perdida',
        'El sembrador',
      ],
      answer: 'El Buen Samaritano',
      hint: 'El protagonista no era del mismo pueblo que el herido… y aun así lo ayudó.',
      explanation:
        'Es la parábola del Buen Samaritano: Jesús nos enseña que el prójimo es toda persona que necesita ayuda.',
    },
    {
      id: 'prodigo',
      clues: [
        'Un joven pidió su herencia y se marchó lejos de casa.',
        'Gastó todo y pasó mucha hambre.',
        'Su padre lo vio de lejos, corrió a abrazarlo e hizo una fiesta.',
      ],
      options: [
        'El hijo pródigo',
        'El Buen Samaritano',
        'Zaqueo',
        'La pesca milagrosa',
      ],
      answer: 'El hijo pródigo',
      hint: 'El padre de esta historia perdona con una alegría enorme.',
      explanation:
        'Es la parábola del hijo pródigo: Dios Padre siempre nos espera con los brazos abiertos cuando volvemos a Él.',
    },
    {
      id: 'panes',
      clues: [
        'Mucha gente seguía a Jesús y tenía hambre.',
        'Un niño ofreció cinco panes y dos peces.',
        'Todos comieron y sobraron doce cestos.',
      ],
      options: [
        'La multiplicación de los panes',
        'Las bodas de Caná',
        'La pesca milagrosa',
        'La oveja perdida',
      ],
      answer: 'La multiplicación de los panes',
      hint: 'Jesús dio de comer a una multitud con lo poco que ofreció un niño.',
      explanation:
        'Es la multiplicación de los panes y los peces: Jesús alimenta a la multitud y nos prepara para la Eucaristía.',
    },
    {
      id: 'zaqueo',
      clues: [
        'Era bajo de estatura y quería ver a Jesús.',
        'Se subió a un árbol para verle pasar.',
        'Jesús se quedó en su casa y él repartió sus bienes.',
      ],
      options: [
        'Zaqueo',
        'El hijo pródigo',
        'Pedro',
        'El Buen Samaritano',
      ],
      answer: 'Zaqueo',
      hint: 'Este hombre se subió a un sicómoro para ver a Jesús.',
      explanation:
        'Es Zaqueo: cuando Jesús entra en su casa, su corazón cambia y comparte lo que tiene con alegría.',
    },
    {
      id: 'pesca',
      clues: [
        'Pedro y sus amigos no habían pescado nada en toda la noche.',
        'Jesús les dijo que echaran las redes una vez más.',
        'Pescaron tantos peces que las redes se rompían.',
      ],
      options: [
        'La pesca milagrosa',
        'La tempestad calmada',
        'La multiplicación de los panes',
        'Zaqueo',
      ],
      answer: 'La pesca milagrosa',
      hint: 'Ocurrió en el lago de Galilea, después de una noche sin pescar nada.',
      explanation:
        'Es la pesca milagrosa: Pedro confía en la palabra de Jesús y luego lo deja todo para seguirle.',
    },
  ],
};
