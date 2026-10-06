import type { Lesson } from '../model';

export const lessonSerCristiano: Lesson = {
  id: 'l-ser-cristiano',
  slug: 'ser-cristiano',
  title: '¿Qué significa ser cristiano?',
  subtitle: 'Descubre la gran familia de los que siguen a Jesús',
  nucleusId: 'n1',
  estimatedMinutes: 8,
  objectives: [
    'Descubrir que ser cristiano es seguir a Jesús, que nos llama por nuestro nombre.',
    'Reconocer a la Iglesia como la gran familia de los cristianos.',
    'Identificar el amor como la señal que distingue a los amigos de Jesús.',
  ],
  blocks: [
    {
      id: 'l-ser-cristiano-b1',
      kind: 'descubre',
      title: 'Ser cristiano es seguir a Jesús',
      imageLabel: 'Niños y niñas siguiendo a Jesús por un camino',
      paragraphs: [
        'Ser cristiano es ser amigo de Jesús y seguirle cada día.',
        '• En el Bautismo, Jesús nos llama por nuestro nombre y nos hace parte de su familia.\n• No estamos solos: formamos una familia enorme que se llama la Iglesia.',
      ],
    },
    {
      id: 'l-ser-cristiano-b2',
      audioSrc: '/audio/escucha-ser-cristiano.mp3',
      kind: 'escucha',
      title: 'La primera familia de Jesús',
      imageLabel: 'Los primeros cristianos compartiendo el pan',
      paragraphs: [
        'Después de que Jesús resucitara, sus amigos se reunieron. Comían juntos, rezaban juntos y se ayudaban en todo.',
        '• Compartían lo que tenían con los que más lo necesitaban.\n• Los domingos se reunían para recordar a Jesús, como hacemos nosotros en la misa.',
      ],
    },
    {
      id: 'l-ser-cristiano-b3',
      kind: 'descubre',
      title: 'Nuestra señal: el amor',
      paragraphs: [
        '¿Cómo se nota que somos cristianos? Jesús nos dio la respuesta: por el amor.',
        '• "Amaos unos a otros como yo os he amado": esa es la señal de los amigos de Jesús.\n• Amar es ayudar, perdonar, compartir y tratar bien a todos.',
      ],
    },
    {
      id: 'l-ser-cristiano-b4',
      kind: 'piensa',
      title: 'Cristiano cada día',
      paragraphs: [
        'Ser cristiano no es solo cosa de los domingos. Es una forma de vivir todos los días.',
        '• En casa: ayudando sin que me lo pidan.\n• En el cole: incluyendo a quien está solo y perdonando a quien me ofende.\n• En la parroquia: participando en la misa con alegría.',
        '¿Qué gesto de amor puedes hacer hoy?',
      ],
    },
    {
      id: 'l-ser-cristiano-b5',
      kind: 'reza',
      title: 'Jesús, enséñame a amar',
      paragraphs: [
        'Jesús, amigo mío, gracias por llamarme a tu familia.',
        'Ayúdame a amar como tú amas: en casa, en el cole y con mis amigos. Amén.',
      ],
    },
  ],
  gameIds: ['completa-oracion', 'descubre-iglesia'],
  quiz: {
    id: 'l-ser-cristiano-quiz',
    title: '¿Eres un buen amigo de Jesús?',
    questions: [
      {
        id: 'l-ser-cristiano-q1',
        question: '¿Qué significa ser cristiano?',
        options: [
          'Ir de vez en cuando a la iglesia',
          'Ser amigo de Jesús y seguirle cada día',
          'Saberse muchas oraciones de memoria',
        ],
        correctIndex: 1,
        hint: 'Piensa en lo que hace un buen amigo.',
        explanation:
          '¡Exacto! Ser cristiano es ser amigo de Jesús: conocerle, quererle y seguirle cada día.',
      },
      {
        id: 'l-ser-cristiano-q2',
        question: '¿Qué es la Iglesia?',
        options: [
          'Solo el edificio donde se celebra la misa',
          'La gran familia de todos los que siguen a Jesús',
          'Un grupo de personas perfectas',
        ],
        correctIndex: 1,
        hint: 'No es un edificio: son personas.',
        explanation:
          '¡Muy bien! La Iglesia es la gran familia de los cristianos. El edificio es solo la casa donde nos reunimos.',
      },
      {
        id: 'l-ser-cristiano-q3',
        question: '¿Cuál es la señal que distingue a los cristianos?',
        options: [
          'El amor a los demás',
          'Vestir de una forma especial',
          'No equivocarse nunca',
        ],
        correctIndex: 0,
        hint: 'Jesús lo dijo claramente: "Amaos unos a otros".',
        explanation:
          '¡Perfecto! Jesús dijo que nos reconocerían por el amor. Amar es la señal de sus amigos.',
      },
      {
        id: 'l-ser-cristiano-q4',
        question: '¿Cuándo vivimos como cristianos?',
        options: [
          'Solo los domingos en misa',
          'Solo cuando rezamos',
          'Todos los días, en casa, en el cole y con los amigos',
        ],
        correctIndex: 2,
        hint: 'Ser cristiano es una forma de vivir.',
        explanation:
          '¡Genial! Ser cristiano se vive todos los días: en casa, en el cole, en el juego y en la misa.',
      },
    ],
  },
  prayer: {
    id: 'l-ser-cristiano-prayer',
    audioSrc: '/audio/oracion-l-ser-cristiano-prayer.mp3',
    title: 'Amigo de Jesús',
    lines: [
      'Jesús, gracias por llamarme por mi nombre.',
      'Gracias por tu familia, la Iglesia.',
      'Enséñame a amar como tú amas,',
      'hoy y todos los días. Amén.',
    ],
  },
  family: {
    activityTitle: 'El árbol de nuestra familia cristiana',
    activity:
      'Dibujad en un papel grande un árbol con muchas ramas. En cada rama escribid el nombre de alguien de vuestra familia o parroquia. Pegadlo en la nevera y recordad: ¡formamos parte de la gran familia de Jesús!',
  },
  parentNotes: {
    oneMinute:
      'Ser cristiano es ser amigo de Jesús y formar parte de su gran familia, la Iglesia. La señal de los cristianos es el amor, vivido cada día en casa, en el cole y con los amigos.',
    fiveMinutes: [
      'Esta lección introduce la identidad cristiana desde la amistad con Jesús, no desde normas. El Bautismo aparece como la puerta de entrada a la familia de la Iglesia: Dios nos llama por nuestro nombre.',
      'La primera comunidad cristiana (Hechos de los Apóstoles) es el modelo: compartir, rezar juntos y reunirse el domingo. Sin idealizar: se presenta como una familia real que se ayuda.',
      'El criterio de discernimiento es el mandato del amor ("amaos unos a otros"). Es importante que el niño entienda que ser cristiano se nota en los gestos concretos, no en saber muchas cosas.',
      'La dimensión de CELEBRAR aparece con la misa dominical; la de VIVIR con los gestos cotidianos; la de ORAR con la pequeña oración final; la de CREER con la fe en Jesús que nos llama.',
      'En casa podéis reforzar nombrando gestos de amor concretos que veáis durante la semana ("eso que hiciste fue muy de amigo de Jesús").',
    ],
    familyQuestions: [
      '¿Quién te enseñó a conocer a Jesús? ¿Qué le agradeces?',
      '¿Qué gesto de amor has visto hoy en casa o en el cole?',
      '¿Qué podemos hacer esta semana como familia para ayudar a alguien?',
    ],
    dailyExample:
      'Cuando tu hijo comparte su merienda sin que se lo pidan, o perdona a su hermano después de una pelea, puedes decirle: "Eso es ser amigo de Jesús". Conecta el gesto con la identidad.',
    familyActivity:
      'Elegid juntos una pequeña obra de amor para esta semana (visitar a los abuelos, preparar una sorpresa para un vecino, donar juguetes). Hacedla en familia y contadla en la próxima comida.',
    familyPrayer: [
      'Jesús, gracias por nuestra familia',
      'y por la gran familia de tu Iglesia.',
      'Ayúdanos a amarnos como tú nos amas. Amén.',
    ],
  },
};
