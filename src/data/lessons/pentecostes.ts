import type { Lesson } from '../model';

export const lessonPentecostes: Lesson = {
  id: 'l-pentecostes',
  slug: 'pentecostes',
  title: 'Pentecostés y el Espíritu Santo',
  subtitle: 'El regalo que nos da fuerza para ser amigos de Jesús',
  nucleusId: 'n6',
  estimatedMinutes: 8,
  objectives: [
    'Conocer qué pasó en Pentecostés: la venida del Espíritu Santo.',
    'Descubrir que el Espíritu Santo nos da fuerza y nos ayuda cada día.',
    'Reconocer a la Iglesia como la familia nacida en Pentecostés.',
  ],
  blocks: [
    {
      id: 'l-pentecostes-b1',
      kind: 'escucha',
      title: 'Un viento muy especial',
      imageLabel: 'Lenguas de fuego sobre los apóstoles reunidos',
      paragraphs: [
        'Cincuenta días después de la Pascua, los amigos de Jesús estaban reunidos con María. De repente llegó un viento fuerte y unas llamas de fuego se posaron sobre cada uno.',
        '• Era el Espíritu Santo, el regalo prometido por Jesús.\n• Llenos de su fuerza, salieron a contar a todos la Buena Noticia.',
      ],
    },
    {
      id: 'l-pentecostes-b2',
      kind: 'descubre',
      title: 'Nace la Iglesia',
      paragraphs: [
        'Aquel día, muchísima gente escuchó a los apóstoles y quiso seguir a Jesús. Así nació la Iglesia.',
        '• Pentecostés es el cumpleaños de la Iglesia.\n• Desde entonces, el Espíritu Santo no ha dejado de acompañarla.',
      ],
    },
    {
      id: 'l-pentecostes-b3',
      kind: 'descubre',
      title: 'El Espíritu Santo, nuestro ayudante',
      paragraphs: [
        'El Espíritu Santo no se quedó en el pasado: también viene a nosotros.',
        '• Nos da fuerza para hacer el bien cuando cuesta.\n• Nos ayuda a rezar, a perdonar y a querer a los demás.\n• En la Confirmación lo recibiremos de una forma muy especial.',
      ],
    },
    {
      id: 'l-pentecostes-b4',
      kind: 'piensa',
      title: 'Pídele ayuda hoy',
      paragraphs: [
        '¿Cuándo puedes pedir ayuda al Espíritu Santo?',
        '• Antes de un examen, para estar tranquilo.\n• Cuando te cuesta perdonar a alguien.\n• Cuando quieres hacer el bien pero te da pereza.',
        'Basta con decirle: "Ven, Espíritu Santo, ayúdame".',
      ],
    },
    {
      id: 'l-pentecostes-b5',
      kind: 'reza',
      title: 'Ven, Espíritu Santo',
      paragraphs: [
        'Ven, Espíritu Santo, llena mi corazón.',
        'Dame tu fuerza para ser amigo de Jesús.',
        'Ayúdame a querer y a hacer el bien. Amén.',
      ],
    },
  ],
  gameIds: ['memory', 'sacramentos'],
  quiz: {
    id: 'l-pentecostes-quiz',
    title: 'El día de Pentecostés',
    questions: [
      {
        id: 'l-pentecostes-q1',
        question: '¿Qué pasó en Pentecostés?',
        options: [
          'Vino el Espíritu Santo sobre los apóstoles',
          'Jesús nació en Belén',
          'Los apóstoles se fueron de viaje',
        ],
        correctIndex: 0,
        hint: 'Viento fuerte y llamas de fuego.',
        explanation:
          '¡Exacto! En Pentecostés, el Espíritu Santo bajó sobre los apóstoles con un viento fuerte y lenguas de fuego.',
      },
      {
        id: 'l-pentecostes-q2',
        question: '¿Por qué decimos que en Pentecostés nace la Iglesia?',
        options: [
          'Porque se construyó la primera iglesia',
          'Porque mucha gente empezó a seguir a Jesús',
          'Porque fue un día de fiesta',
        ],
        correctIndex: 1,
        hint: 'La Iglesia son las personas, no el edificio.',
        explanation:
          '¡Muy bien! Aquel día muchísima gente quiso seguir a Jesús: así nació su gran familia, la Iglesia.',
      },
      {
        id: 'l-pentecostes-q3',
        question: '¿Cómo nos ayuda el Espíritu Santo?',
        options: [
          'Haciendo los deberes por nosotros',
          'Dándonos fuerza para hacer el bien y querer a los demás',
          'Solo en los días de fiesta',
        ],
        correctIndex: 1,
        hint: 'Es nuestro ayudante interior.',
        explanation:
          '¡Perfecto! El Espíritu Santo nos da fuerza para hacer el bien, perdonar, rezar y amar cada día.',
      },
      {
        id: 'l-pentecostes-q4',
        question: '¿Qué puedes decir cuando necesitas ayuda?',
        options: [
          '"No puedo con esto"',
          '"Ven, Espíritu Santo, ayúdame"',
          'Nada, hay que aguantarse',
        ],
        correctIndex: 1,
        hint: 'Es una oración cortita y muy poderosa.',
        explanation:
          '¡Genial! "Ven, Espíritu Santo" es una oración sencilla que puedes rezar siempre que necesites fuerza.',
      },
    ],
  },
  prayer: {
    id: 'l-pentecostes-prayer',
    title: 'Ven, Espíritu Santo',
    lines: [
      'Ven, Espíritu Santo,',
      'llena mi corazón de tu amor.',
      'Dame fuerza para seguir a Jesús',
      'hoy y siempre. Amén.',
    ],
  },
  family: {
    activityTitle: 'La llama de Pentecostés',
    activity:
      'Recortad en cartulina roja, naranja y amarilla llamas de fuego. En cada una, escribid un don que queréis pedir al Espíritu Santo (alegría, paciencia, valentía...). Pegadlas en una ventana de casa como recordatorio de que Él está con vosotros.',
  },
  parentNotes: {
    oneMinute:
      'En Pentecostés, cincuenta días después de Pascua, el Espíritu Santo bajó sobre los apóstoles y nació la Iglesia. El Espíritu Santo también nos ayuda hoy: nos da fuerza para hacer el bien y amar.',
    fiveMinutes: [
      'El relato de Pentecostés (Hechos 2) se narra con sus signos: viento y fuego. Para el niño, son imágenes potentes que conviene no "explicar" en exceso, sino contemplar.',
      'La idea de "cumpleaños de la Iglesia" es muy pegadiza y ayuda a situar a la Iglesia en la historia: no es una institución abstracta, sino una familia nacida de un don.',
      'El Espíritu Santo se presenta como ayudante cotidiano, no como concepto teológico. La oración "Ven, Espíritu Santo" es un recurso que el niño puede usar toda la vida.',
      'CREER: el Espíritu Santo, tercera persona de la Trinidad (sin desarrollar la teología trinitaria). CELEBRAR: la fiesta de Pentecostés. VIVIR: dejarse guiar. ORAR: invocar al Espíritu.',
      'Puente hacia la Confirmación: se menciona como el sacramento en que se recibe al Espíritu de forma especial, sembrando expectación para el futuro.',
    ],
    familyQuestions: [
      '¿Qué signos acompañaron la venida del Espíritu Santo?',
      '¿En qué momentos necesitas tú la fuerza del Espíritu Santo?',
      '¿Cómo notamos que el Espíritu Santo actúa en nuestra familia?',
    ],
    dailyExample:
      'Antes de un momento difícil (un examen, una disculpa que cuesta, una decisión), rezad juntos: "Ven, Espíritu Santo". El niño aprenderá a acudir a Él de forma natural.',
    familyActivity:
      'Celebrad el "cumpleaños de la Iglesia" en Pentecostés con una tarta o una merienda especial en familia. Contad la historia y dad gracias por formar parte de ella.',
    familyPrayer: [
      'Ven, Espíritu Santo,',
      'llena de tu amor nuestra casa.',
      'Danos fuerza para querernos',
      'y para hacer el bien. Amén.',
    ],
  },
};
