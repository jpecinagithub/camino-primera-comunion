import type { Lesson } from '../model';

export const lessonMaria: Lesson = {
  id: 'l-maria',
  slug: 'maria',
  title: 'María',
  subtitle: 'La Madre de Jesús y madre nuestra',
  nucleusId: 'n3',
  estimatedMinutes: 8,
  objectives: [
    'Conocer a María como la Madre de Jesús, que dijo "sí" a Dios.',
    'Descubrir que María también es nuestra madre y nos cuida.',
    'Aprender a rezar el Ave María con el corazón.',
  ],
  blocks: [
    {
      id: 'l-maria-b1',
      kind: 'escucha',
      title: 'El "sí" de María',
      imageLabel: 'María escuchando al ángel con alegría',
      paragraphs: [
        'Un día, el ángel Gabriel visitó a una joven llamada María y le dijo que Dios la había elegido para ser la madre de Jesús.',
        '• María se sorprendió, pero confió en Dios y dijo: "Hágase en mí según tu palabra".\n• Su "sí" fue el comienzo de la historia más bonita: la llegada de Jesús.',
      ],
    },
    {
      id: 'l-maria-b2',
      kind: 'descubre',
      title: 'María, Madre de Jesús',
      paragraphs: [
        'María cuidó a Jesús como todas las madres cuidan a sus hijos: le enseñó a hablar, a rezar y a amar.',
        '• Estuvo con Él desde el pesebre de Belén hasta la cruz.\n• Jesús, desde la cruz, nos la dio también a nosotros como madre.',
      ],
    },
    {
      id: 'l-maria-b3',
      kind: 'descubre',
      title: 'Nuestra Madre del cielo',
      paragraphs: [
        'María no solo es la Madre de Jesús: también es nuestra madre. Nos quiere, nos escucha y nos lleva siempre a su Hijo.',
        '• Cuando estamos tristes o tenemos miedo, podemos acudir a ella.\n• Los cristianos la queremos mucho y la celebramos en muchas fiestas, como la Inmaculada.',
      ],
    },
    {
      id: 'l-maria-b4',
      kind: 'piensa',
      title: 'Como María, digo "sí"',
      paragraphs: [
        'María nos enseña a decir "sí" a Dios con alegría, aunque a veces cueste.',
        '• Decir "sí" es obedecer a papá y mamá con buena cara.\n• Decir "sí" es ayudar cuando me lo piden, aunque esté jugando.',
        '¿A qué "sí" te está invitando Dios hoy?',
      ],
    },
    {
      id: 'l-maria-b5',
      kind: 'reza',
      title: 'Ave María',
      paragraphs: [
        'La oración más bonita para hablar con María es el Ave María. Rézala despacio, pensando cada palabra.',
        'Dios te salve, María, llena eres de gracia, el Señor es contigo. Bendita tú eres entre todas las mujeres, y bendito es el fruto de tu vientre, Jesús. Santa María, Madre de Dios, ruega por nosotros, pecadores, ahora y en la hora de nuestra muerte. Amén.',
      ],
    },
  ],
  gameIds: ['completa-oracion', 'quien-dijo-que'],
  quiz: {
    id: 'l-maria-quiz',
    title: '¿Conoces a María?',
    questions: [
      {
        id: 'l-maria-q1',
        question: '¿Qué respondió María cuando el ángel le anunció que sería la Madre de Jesús?',
        options: ['Dijo que no', 'Dijo "sí" a Dios con confianza', 'Pidió pensárselo un año'],
        correctIndex: 1,
        hint: 'Su respuesta fue un "sí" valiente.',
        explanation:
          '¡Exacto! María dijo "sí" a Dios con total confianza, y así comenzó la historia de la salvación.',
      },
      {
        id: 'l-maria-q2',
        question: '¿Quién es María para nosotros?',
        options: [
          'Solo un personaje del pasado',
          'También nuestra Madre del cielo, que nos cuida',
          'Una amiga lejana de Jesús',
        ],
        correctIndex: 1,
        hint: 'Jesús nos la dio como madre desde la cruz.',
        explanation:
          '¡Muy bien! Jesús nos dio a María como madre: nos quiere, nos escucha y nos lleva siempre a Él.',
      },
      {
        id: 'l-maria-q3',
        question: '¿Cómo se llama la oración más conocida para hablar con María?',
        options: ['El Padrenuestro', 'El Ave María', 'El Gloria'],
        correctIndex: 1,
        hint: 'Empieza con "Dios te salve, María...".',
        explanation:
          '¡Perfecto! El Ave María es la oración con la que saludamos a María y le pedimos que rece por nosotros.',
      },
      {
        id: 'l-maria-q4',
        question: '¿Qué nos enseña María con su vida?',
        options: [
          'A decir "sí" a Dios con alegría',
          'A tener miedo de todo',
          'A pensar solo en nosotros',
        ],
        correctIndex: 0,
        hint: 'Piensa en su respuesta al ángel.',
        explanation:
          '¡Genial! María nos enseña a confiar en Dios y a decirle "sí" con alegría cada día.',
      },
    ],
  },
  prayer: {
    id: 'l-maria-prayer',
    title: 'Madre mía',
    lines: [
      'María, Madre de Jesús y madre mía,',
      'gracias por tu "sí" valiente.',
      'Cuídame como cuidaste a Jesús',
      'y llévame siempre a Él. Amén.',
    ],
  },
  family: {
    activityTitle: 'Un ramo para María',
    activity:
      'En mayo (o cualquier día), preparad juntos un pequeño altar a María con una imagen suya y flores (de verdad o de papel hechas por los niños). Rezad juntos un Ave María y ponedle una intención de la familia.',
  },
  parentNotes: {
    oneMinute:
      'María es la Madre de Jesús, que dijo "sí" a Dios con confianza. Jesús nos la dio también a nosotros como Madre del cielo: nos quiere, nos escucha y nos lleva a Él.',
    fiveMinutes: [
      'La Anunciación es el centro de la lección: el "sí" de María como modelo de confianza. Para un niño, es clave entender que María era una persona real, joven, que se fio de Dios.',
      'La maternidad espiritual de María (entregada por Jesús en la cruz) se presenta con sencillez: "también es nuestra madre". Evitad tecnicismos; la experiencia de ser cuidado por una madre lo explica todo.',
      'El Ave María se incluye en su forma tradicional (dominio público). Animar a rezarlo despacio, no de carrerilla: cada palabra es un piropo a María.',
      'CREER: María, Madre de Dios y madre nuestra. CELEBRAR: las fiestas marianas (la Inmaculada, el mes de mayo). VIVIR: decir "sí" como ella. ORAR: el Ave María y la confianza en su intercesión.',
      'En casa: tener una imagen de María en un lugar visible ayuda a que el niño la sienta cercana. Rezarle por la noche es un hábito precioso.',
    ],
    familyQuestions: [
      '¿Qué crees que sintió María cuando el ángel la visitó?',
      '¿Cuándo le pides ayuda a María? ¿En qué momentos?',
      '¿A qué "sí" nos está invitando Dios como familia?',
    ],
    dailyExample:
      'Cuando tu hijo tenga miedo por la noche o antes de un examen, proponle: "Pídeselo a María, ella te acompaña". Convertirla en refugio cotidiano es la mejor catequesis mariana.',
    familyActivity:
      'Rezad juntos un misterio del rosario (solo un misterio, con calma) una noche a la semana. Que cada uno ponga una intención antes de empezar.',
    familyPrayer: [
      'Madre nuestra, María,',
      'gracias por cuidarnos cada día.',
      'Enséñanos a decir "sí" a Dios',
      'como tú lo hiciste. Amén.',
    ],
  },
};
