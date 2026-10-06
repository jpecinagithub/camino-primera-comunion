import type { Lesson } from '../model';

export const lessonLaBiblia: Lesson = {
  id: 'l-la-biblia',
  slug: 'la-biblia',
  title: 'La Biblia',
  subtitle: 'La carta de amor que Dios nos escribió',
  nucleusId: 'n2',
  estimatedMinutes: 9,
  objectives: [
    'Descubrir que la Biblia es la Palabra de Dios escrita para nosotros.',
    'Distinguir el Antiguo Testamento y el Nuevo Testamento.',
    'Reconocer los Evangelios como el corazón de la Biblia.',
  ],
  blocks: [
    {
      id: 'l-la-biblia-b1',
      kind: 'descubre',
      title: 'Un libro muy especial',
      imageLabel: 'Una Biblia abierta con luz suave',
      paragraphs: [
        'La Biblia no es un libro cualquiera: es la Palabra de Dios. En ella, Dios nos cuenta cuánto nos quiere y cómo quiere que vivamos.',
        '• La escribieron muchas personas, pero es Dios quien habla en ella.\n• Es como una carta de amor que Dios nos escribió a cada uno.',
      ],
    },
    {
      id: 'l-la-biblia-b2',
      kind: 'descubre',
      title: 'Dos grandes partes',
      paragraphs: [
        'La Biblia tiene dos partes, como dos capítulos de una misma historia.',
        '• El Antiguo Testamento cuenta la historia del pueblo de Israel antes de Jesús: la creación, Noé, Abrahán, Moisés... Dios preparaba la llegada de su Hijo.\n• El Nuevo Testamento cuenta la vida de Jesús y de los primeros cristianos.',
      ],
    },
    {
      id: 'l-la-biblia-b3',
      kind: 'escucha',
      title: 'Los cuatro Evangelios',
      imageLabel: 'Cuatro amigos escribiendo la historia de Jesús',
      paragraphs: [
        'En el corazón de la Biblia están los Evangelios: cuatro libros que cuentan la vida, las palabras y los milagros de Jesús.',
        '• Los escribieron Mateo, Marcos, Lucas y Juan.\n• "Evangelio" significa "buena noticia": ¡la mejor noticia es que Jesús nos salva!',
        'En la misa escuchamos el Evangelio cada domingo.',
      ],
    },
    {
      id: 'l-la-biblia-b4',
      kind: 'piensa',
      title: 'Dios me habla hoy',
      paragraphs: [
        'La Biblia no es un libro del pasado: Dios me habla a mí, hoy, cuando la leo o la escucho.',
        '• Puedo leer un poquito cada día, aunque sean unas líneas.\n• Puedo preguntarme: "¿Qué me dice Dios a mí con estas palabras?"',
        '¿Tienes una Biblia en casa? Búscala y mírala con cariño: es un tesoro.',
      ],
    },
    {
      id: 'l-la-biblia-b5',
      kind: 'reza',
      title: 'Háblame, Señor',
      paragraphs: [
        'Señor, gracias por tu Palabra.',
        'Cuando lea la Biblia, abre mi corazón para escucharte.',
        'Que tus palabras me acompañen cada día. Amén.',
      ],
    },
  ],
  gameIds: ['detective-evangelio', 'memory'],
  quiz: {
    id: 'l-la-biblia-quiz',
    title: 'Exploradores de la Biblia',
    questions: [
      {
        id: 'l-la-biblia-q1',
        question: '¿Qué es la Biblia?',
        options: [
          'Un libro de cuentos antiguos',
          'La Palabra de Dios escrita para nosotros',
          'Un libro de historia como los demás',
        ],
        correctIndex: 1,
        hint: 'Es Dios quien nos habla en ella.',
        explanation:
          '¡Exacto! La Biblia es la Palabra de Dios: en ella Dios nos cuenta cuánto nos quiere.',
      },
      {
        id: 'l-la-biblia-q2',
        question: '¿Cuáles son las dos grandes partes de la Biblia?',
        options: [
          'El Antiguo Testamento y el Nuevo Testamento',
          'El principio y el final',
          'Los salmos y las cartas',
        ],
        correctIndex: 0,
        hint: 'Una cuenta lo de antes de Jesús y la otra lo de Jesús.',
        explanation:
          '¡Muy bien! El Antiguo Testamento prepara la llegada de Jesús y el Nuevo Testamento cuenta su vida y la de los primeros cristianos.',
      },
      {
        id: 'l-la-biblia-q3',
        question: '¿Qué cuentan los Evangelios?',
        options: [
          'La historia de los reyes de Israel',
          'La vida, las palabras y los milagros de Jesús',
          'Cómo se construyó el templo',
        ],
        correctIndex: 1,
        hint: '"Evangelio" significa "buena noticia".',
        explanation:
          '¡Perfecto! Los Evangelios son el corazón de la Biblia: Mateo, Marcos, Lucas y Juan nos cuentan quién es Jesús.',
      },
      {
        id: 'l-la-biblia-q4',
        question: '¿Cuándo escuchamos el Evangelio en la misa?',
        options: [
          'Nunca',
          'Solo en Navidad',
          'Cada domingo',
        ],
        correctIndex: 2,
        hint: 'Piensa en lo que pasa cada domingo en la iglesia.',
        explanation:
          '¡Genial! Cada domingo, en la misa, escuchamos un trocito del Evangelio: es Jesús quien nos habla.',
      },
    ],
  },
  prayer: {
    id: 'l-la-biblia-prayer',
    title: 'Tu Palabra, mi luz',
    lines: [
      'Señor Jesús,',
      'tu Palabra es una luz en mi camino.',
      'Ayúdame a escucharla con el corazón',
      'y a vivirla con alegría. Amén.',
    ],
  },
  family: {
    activityTitle: 'Nuestro rincón de la Palabra',
    activity:
      'Preparad en casa un rincón bonito con la Biblia (una mesita, una vela de mentira o una flor). Cada noche, leed juntos un versículo corto y comentadlo. Empezad por el Evangelio de Marcos: es el más corto.',
  },
  parentNotes: {
    oneMinute:
      'La Biblia es la Palabra de Dios: una carta de amor escrita para nosotros. Tiene dos partes (Antiguo y Nuevo Testamento) y su corazón son los cuatro Evangelios, que nos cuentan la vida de Jesús.',
    fiveMinutes: [
      'La lección presenta la Biblia como Palabra de Dios con un lenguaje afectivo ("carta de amor"), adecuado para niños de 9 años. Conviene tener una Biblia física en casa: el objeto ayuda a la reverencia.',
      'La distinción Antiguo/Nuevo Testamento se explica como dos capítulos de la misma historia de salvación. No hace falta memorizar números de libros; basta la idea de "antes de Jesús / con Jesús".',
      'Los cuatro evangelistas se nombran (Mateo, Marcos, Lucas y Juan). El significado de "evangelio" como "buena noticia" conecta con la lección 6.',
      'CREER: la Biblia como Palabra de Dios. CELEBRAR: la escucha del Evangelio en la misa dominical. VIVIR: dejarse guiar por la Palabra. ORAR: pedir un corazón que escucha.',
      'Sugerencia práctica: leer el Evangelio del domingo en casa antes de ir a misa. El niño lo reconocerá y participará con más atención.',
    ],
    familyQuestions: [
      '¿Qué historia de la Biblia te gusta más? ¿Por qué?',
      '¿Qué crees que Dios quiere decirte cuando escuchas el Evangelio?',
      '¿Cómo podemos hacer sitio en casa para leer la Palabra juntos?',
    ],
    dailyExample:
      'Antes de una decisión pequeña (perdonar, ayudar, decir la verdad), podéis preguntar: "¿Qué nos diría Jesús en el Evangelio?". Así la Palabra entra en la vida diaria.',
    familyActivity:
      'Elegid un versículo corto para la semana (por ejemplo: "Amaos unos a otros") y escribidlo en un papel bonito para la nevera. Al final de la semana, contad cuándo lo habéis vivido.',
    familyPrayer: [
      'Señor, gracias por hablarnos en tu Palabra.',
      'Abre nuestros oídos y nuestro corazón',
      'para escucharte cada día',
      'y vivir lo que nos dices. Amén.',
    ],
  },
};
