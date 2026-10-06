import type { Lesson } from '../model';

export const lessonDiosPadreCreador: Lesson = {
  id: 'l-dios-padre-creador',
  slug: 'dios-padre-creador',
  title: 'Dios es nuestro Padre y Creador',
  subtitle: 'Todo lo que existe es un regalo de su amor',
  nucleusId: 'n2',
  estimatedMinutes: 8,
  objectives: [
    'Descubrir a Dios como Padre bueno que nos quiere y nos cuida.',
    'Reconocer la creación como un regalo de Dios que hay que cuidar.',
    'Dar gracias a Dios por la vida y por todo lo que nos rodea.',
  ],
  blocks: [
    {
      id: 'l-dios-padre-creador-b1',
      kind: 'descubre',
      audioSrc: '/audio/bloque-dios-padre-creador-b1.mp3',
      title: 'Dios, nuestro Padre',
      imageLabel: 'Un padre abrazando a su hijo al atardecer',
      paragraphs: [
        'Dios no es un desconocido lejano: es nuestro Padre. Nos conoce por nuestro nombre y nos quiere muchísimo.',
        '• Como un buen padre, nos cuida cada día.\n• Podemos hablar con Él siempre que queramos: eso es rezar.',
      ],
    },
    {
      id: 'l-dios-padre-creador-b2',
      audioSrc: '/audio/escucha-dios-padre-creador.mp3',
      kind: 'escucha',
      title: 'Al principio, Dios creó todo',
      imageLabel: 'El sol, las estrellas, los animales y la naturaleza',
      paragraphs: [
        'La Biblia nos cuenta que, al principio, Dios creó el cielo y la tierra, el sol y las estrellas, los animales y las plantas. Y vio que todo era bueno.',
        '• Al final creó al ser humano, a cada uno de nosotros, y nos confió el cuidado de su obra.\n• Todo lo que existe es un regalo de su amor.',
      ],
    },
    {
      id: 'l-dios-padre-creador-b3',
      kind: 'descubre',
      audioSrc: '/audio/bloque-dios-padre-creador-b3.mp3',
      title: 'Cuidamos el regalo',
      paragraphs: [
        'Cuando alguien nos hace un regalo bonito, lo cuidamos. La creación es el regalo más grande de Dios.',
        '• Cuidar el agua, las plantas y los animales es cuidar el regalo de Dios.\n• No tirar basura y no desperdiciar también es amar a Dios.',
      ],
    },
    {
      id: 'l-dios-padre-creador-b4',
      kind: 'piensa',
      audioSrc: '/audio/bloque-dios-padre-creador-b4.mp3',
      title: 'Gracias, Padre',
      paragraphs: [
        'Mira a tu alrededor: ¿cuántas cosas buenas te ha regalado Dios?',
        '• Tu familia, tus amigos, tu casa, la comida de cada día.\n• El sol que calienta, la lluvia que riega, las estrellas de la noche.',
        'Elige tres regalos de Dios y dale las gracias por cada uno.',
      ],
    },
    {
      id: 'l-dios-padre-creador-b5',
      kind: 'reza',
      audioSrc: '/audio/bloque-dios-padre-creador-b5.mp3',
      title: 'Padre nuestro, gracias',
      paragraphs: [
        'Padre bueno, gracias por crear el mundo tan bonito.',
        'Gracias por mi vida y por quererme tanto.',
        'Ayúdame a cuidar tu regalo cada día. Amén.',
      ],
    },
  ],
  gameIds: ['verdadero-falso', 'camino-decisiones'],
  quiz: {
    id: 'l-dios-padre-creador-quiz',
    title: '¿Conoces a Dios Padre?',
    questions: [
      {
        id: 'l-dios-padre-creador-q1',
        audioSrc: '/audio/quiz-dios-padre-creador-1.mp3',
        question: '¿Cómo nos quiere Dios?',
        options: [
          'Como un Padre bueno que nos cuida',
          'Como un juez que solo vigila',
          'Como un desconocido lejano',
        ],
        correctIndex: 0,
        hint: 'Jesús nos enseñó a llamarle "Padre".',
        explanation:
          '¡Exacto! Dios es nuestro Padre: nos conoce por nuestro nombre y nos quiere con un amor inmenso.',
      },
      {
        id: 'l-dios-padre-creador-q2',
        audioSrc: '/audio/quiz-dios-padre-creador-2.mp3',
        question: '¿Qué hizo Dios al principio?',
        options: [
          'Creó el cielo, la tierra y todo lo que existe',
          'Se quedó mirando sin hacer nada',
          'Solo creó a las personas',
        ],
        correctIndex: 0,
        hint: 'Piensa en todo lo bonito que ves a tu alrededor.',
        explanation:
          '¡Muy bien! Dios creó todo: el sol, las estrellas, los animales, las plantas... y a cada uno de nosotros.',
      },
      {
        id: 'l-dios-padre-creador-q3',
        audioSrc: '/audio/quiz-dios-padre-creador-3.mp3',
        question: '¿Qué nos pide Dios con su creación?',
        options: [
          'Que la usemos sin pensar',
          'Que la cuidemos como un regalo suyo',
          'Que no la toquemos nunca',
        ],
        correctIndex: 1,
        hint: '¿Qué haces tú con un regalo bonito?',
        explanation:
          '¡Perfecto! La creación es un regalo de Dios, y los regalos se cuidan: no desperdiciar, no ensuciar, respetar a los animales.',
      },
      {
        id: 'l-dios-padre-creador-q4',
        audioSrc: '/audio/quiz-dios-padre-creador-4.mp3',
        question: '¿Cuándo podemos hablar con Dios?',
        options: [
          'Solo en la iglesia',
          'Solo por la noche',
          'Siempre que queramos, porque nos escucha',
        ],
        correctIndex: 2,
        hint: 'Un buen padre siempre escucha a sus hijos.',
        explanation:
          '¡Genial! Podemos rezar en cualquier momento y en cualquier lugar: Dios Padre siempre nos escucha.',
      },
    ],
  },
  prayer: {
    id: 'l-dios-padre-creador-prayer',
    audioSrc: '/audio/oracion-l-dios-padre-creador-prayer.mp3',
    title: 'Gracias, Padre Creador',
    lines: [
      'Padre bueno, Creador del cielo y de la tierra,',
      'gracias por el sol, por el agua y por las flores,',
      'gracias por mi familia y por mi vida.',
      'Enséñame a cuidar tus regalos. Amén.',
    ],
  },
  family: {
    audioSrc: '/audio/familia-dios-padre-creador.mp3',
    activityTitle: 'Paseo de los regalos de Dios',
    activity:
      'Salid a pasear juntos (al parque, al campo o por el barrio). Cada uno va señalando "regalos de Dios" que ve: un árbol, un pájaro, una nube bonita... Al volver, dibujad vuestro regalo favorito y colgadlo en casa.',
  },
  parentNotes: {
    oneMinute:
      'Dios es nuestro Padre: nos quiere, nos conoce por nuestro nombre y nos escucha siempre. Creó todo lo que existe como un regalo de su amor, y nos confía su cuidado.',
    fiveMinutes: [
      'La lección presenta a Dios desde la paternidad, la imagen que Jesús nos enseñó. Para un niño de 9 años, "Padre" es una palabra cercana: conviene anclarla en la experiencia de ser querido y cuidado.',
      'El relato de la creación (Génesis) se narra como historia de amor, no como explicación científica. El mensaje central: todo es bueno porque viene de Dios, y el ser humano recibe la misión de cuidar.',
      'La dimensión ecológica surge de forma natural: cuidar la creación es una forma de amar a Dios. Evitad el tono de culpa; mejor el de gratitud y responsabilidad alegre.',
      'CREER: Dios Padre Creador. CELEBRAR: la gratitud que se expresa en la oración. VIVIR: cuidar el regalo. ORAR: dar gracias cada día.',
      'Un buen hábito: antes de dormir, nombrar tres "regalos de Dios" del día. Convierte la gratitud en rutina familiar.',
    ],
    familyQuestions: [
      '¿Qué es lo que más te gusta de todo lo que Dios ha creado?',
      '¿Cómo podemos cuidar mejor la creación en nuestra casa?',
      '¿Cuándo sientes que Dios te cuida como un Padre?',
    ],
    dailyExample:
      'Al regar una planta, recoger un papel del suelo o apagar una luz que no se usa, podéis decir: "Cuidamos el regalo de Dios". Pequeños gestos, gran mensaje.',
    familyActivity:
      'Plantad juntos una semilla en una maceta (lentejas o una flor). Cuidadla cada día y observad cómo crece: es un recordatorio vivo de que Dios hace crecer la vida.',
    familyPrayer: [
      'Padre bueno, gracias por este día,',
      'por nuestra casa y por nuestra familia.',
      'Ayúdanos a cuidar tu creación',
      'y a querernos como tú nos quieres. Amén.',
    ],
  },
};
