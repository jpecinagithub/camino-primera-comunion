import type { Lesson } from '../model';

export const lessonBuenaNoticia: Lesson = {
  id: 'l-buena-noticia',
  slug: 'buena-noticia',
  title: 'La Buena Noticia',
  subtitle: 'Jesús nos enseña a amar con sus palabras y sus milagros',
  nucleusId: 'n4',
  estimatedMinutes: 10,
  objectives: [
    'Descubrir que Jesús nos trae la Buena Noticia del amor de Dios.',
    'Conocer alguna parábola y algún milagro de Jesús.',
    'Aprender que Jesús quiere especialmente a los niños.',
  ],
  blocks: [
    {
      id: 'l-buena-noticia-b1',
      kind: 'descubre',
      title: 'Jesús anuncia la Buena Noticia',
      imageLabel: 'Jesús hablando a una multitud junto al lago',
      paragraphs: [
        'Cuando Jesús creció, empezó a recorrer los pueblos anunciando la Buena Noticia: ¡Dios nos quiere y quiere que nos queramos!',
        '• Hablaba del Reino de Dios: un mundo donde reina el amor.\n• Mucha gente le seguía porque sus palabras llenaban el corazón.',
      ],
    },
    {
      id: 'l-buena-noticia-b2',
      audioSrc: '/audio/escucha-buena-noticia.mp3',
      kind: 'escucha',
      title: 'El Buen Pastor',
      imageLabel: 'Jesús pastor cargando una ovejita sobre sus hombros',
      paragraphs: [
        'Jesús contaba parábolas, historias sencillas para explicar cosas grandes. Una de las más bonitas es la del Buen Pastor.',
        '• El pastor cuida a sus cien ovejas, y si una se pierde, la busca hasta encontrarla.\n• Así es Jesús con nosotros: no se olvida de nadie y nos busca cuando nos alejamos.',
      ],
    },
    {
      id: 'l-buena-noticia-b3',
      audioSrc: '/audio/escucha-buena-noticia-2.mp3',
      kind: 'escucha',
      title: 'Jesús hace milagros',
      imageLabel: 'Jesús curando a un enfermo rodeado de gente',
      paragraphs: [
        'Jesús no solo hablaba: también hacía milagros para mostrar el amor de Dios.',
        '• Curaba a los enfermos y devolvía la vista a los ciegos.\n• Calmó una tormenta en el lago y dio de comer a una multitud con unos pocos panes y peces.',
        'Cada milagro era una caricia de Dios.',
      ],
    },
    {
      id: 'l-buena-noticia-b4',
      kind: 'descubre',
      title: 'Jesús quiere a los niños',
      paragraphs: [
        'Un día, unos niños quisieron acercarse a Jesús y los discípulos querían apartarlos. Pero Jesús dijo: "Dejad que los niños vengan a mí".',
        '• Jesús te quiere cerquita de Él, tal como eres.\n• Le encanta cuando rezas, cuando le cuentas tus cosas y cuando vienes a verle.',
      ],
    },
    {
      id: 'l-buena-noticia-b5',
      kind: 'piensa',
      title: 'Yo también anuncio la Buena Noticia',
      paragraphs: [
        'Anunciar la Buena Noticia no es solo cosa de curas y misioneros: tú también puedes.',
        '• Con una sonrisa a quien está triste.\n• Ayudando a un compañero que lo necesita.\n• Contando a otros lo bueno que es Jesús.',
        '¿A quién le vas a llevar hoy una buena noticia?',
      ],
    },
    {
      id: 'l-buena-noticia-b6',
      kind: 'reza',
      title: 'Gracias por tu amor',
      paragraphs: [
        'Jesús, Buen Pastor, gracias por buscarme siempre.',
        'Gracias por tus palabras y por tus milagros.',
        'Ayúdame a llevar tu amor a los demás. Amén.',
      ],
    },
  ],
  gameIds: ['detective-evangelio', 'quien-dijo-que'],
  quiz: {
    id: 'l-buena-noticia-quiz',
    title: 'Amigos de la Buena Noticia',
    questions: [
      {
        id: 'l-buena-noticia-q1',
        question: '¿Qué anunciaba Jesús por los pueblos?',
        options: [
          'La Buena Noticia del amor de Dios',
          'Que había que tener miedo',
          'Noticias de otros países',
        ],
        correctIndex: 0,
        hint: '"Evangelio" significa "buena noticia".',
        explanation:
          '¡Exacto! Jesús anunciaba la Buena Noticia: Dios nos quiere y nos invita a vivir en su amor.',
      },
      {
        id: 'l-buena-noticia-q2',
        question: 'En la parábola del Buen Pastor, ¿qué hace el pastor si se pierde una oveja?',
        options: [
          'La olvida y sigue con las demás',
          'La busca hasta encontrarla',
          'Se enfada con ella',
        ],
        correctIndex: 1,
        hint: 'El Buen Pastor no se olvida de nadie.',
        explanation:
          '¡Muy bien! El Buen Pastor busca a la oveja perdida hasta encontrarla. Así nos busca Jesús a nosotros.',
      },
      {
        id: 'l-buena-noticia-q3',
        question: '¿Para qué hacía Jesús milagros?',
        options: [
          'Para presumir de sus poderes',
          'Para mostrar el amor de Dios a las personas',
          'Para que le pagaran',
        ],
        correctIndex: 1,
        hint: 'Cada milagro era una caricia de Dios.',
        explanation:
          '¡Perfecto! Con sus milagros, Jesús mostraba que Dios nos quiere y se preocupa por nosotros.',
      },
      {
        id: 'l-buena-noticia-q4',
        question: '¿Qué dijo Jesús de los niños?',
        options: [
          '"Dejad que los niños vengan a mí"',
          '"Los niños, que no molesten"',
          '"Primero los mayores"',
        ],
        correctIndex: 0,
        hint: 'Jesús quiere a los niños cerquita.',
        explanation:
          '¡Genial! Jesús quiere a los niños muy cerquita de Él: te quiere tal como eres.',
      },
      {
        id: 'l-buena-noticia-q5',
        question: '¿Cómo puedes anunciar tú la Buena Noticia?',
        options: [
          'Solo yendo a misa',
          'Con gestos de amor: sonreír, ayudar, perdonar',
          'No puedo, soy muy pequeño',
        ],
        correctIndex: 1,
        hint: 'Piensa en lo que haces cada día.',
        explanation:
          '¡Fantástico! Tú anuncias la Buena Noticia con tus gestos de amor cada día: nunca eres demasiado pequeño.',
      },
    ],
  },
  prayer: {
    id: 'l-buena-noticia-prayer',
    audioSrc: '/audio/oracion-l-buena-noticia-prayer.mp3',
    title: 'Buen Pastor',
    lines: [
      'Jesús, mi Buen Pastor,',
      'gracias por cuidarme y buscarme siempre.',
      'Que nunca me aleje de ti,',
      'y que lleve tu amor a los demás. Amén.',
    ],
  },
  family: {
    activityTitle: 'Parábolas en familia',
    activity:
      'Leed juntos la parábola del Buen Pastor (Evangelio de Lucas, capítulo 15). Después, cada uno dibuja su escena favorita. Hablad de las veces en que os habéis sentido "buscados y encontrados" por el amor de Dios.',
  },
  parentNotes: {
    oneMinute:
      'Jesús anunció la Buena Noticia del amor de Dios con parábolas (como la del Buen Pastor) y con milagros. Quiere especialmente a los niños y nos invita a llevar su amor a los demás.',
    fiveMinutes: [
      'La lección presenta la vida pública de Jesús desde dos ejes: su palabra (parábolas) y sus obras (milagros). La parábola elegida, el Buen Pastor, es muy accesible para niños de 9 años y transmite la misericordia de Dios.',
      'Los milagros se presentan como "caricias de Dios", evitando el sensacionalismo. Conviene subrayar que Jesús hacía milagros por compasión, no para impresionar.',
      'El episodio de "dejad que los niños vengan a mí" es clave en este itinerario hacia la Primera Comunión: el niño debe sentirse personalmente invitado por Jesús a acercarse.',
      'CREER: Jesús, verdadero Dios y verdadero hombre, nos revela el amor del Padre. CELEBRAR: la Palabra que escuchamos en misa. VIVIR: anunciar con gestos. ORAR: la gratitud.',
      'En casa: leer juntos una parábola corta a la semana (el hijo pródigo, el buen samaritano) crea un precioso hábito de lectura del Evangelio en familia.',
    ],
    familyQuestions: [
      '¿Qué parábola de Jesús te gusta más? ¿Qué te enseña?',
      '¿Cuándo has sentido que Jesús te "buscaba" como el Buen Pastor?',
      '¿Cómo podemos llevar la Buena Noticia a alguien esta semana?',
    ],
    dailyExample:
      'Cuando tu hijo consuele a un amigo triste o ayude a un compañero, dile: "Acabas de anunciar la Buena Noticia". Así entiende que evangelizar es amar.',
    familyActivity:
      'Haced una "caja de buenas noticias": cada noche, cada miembro escribe en un papel algo bueno que le ha pasado o que ha hecho por otro. Leedlos juntos el domingo.',
    familyPrayer: [
      'Jesús, Buen Pastor,',
      'gracias por tu Palabra y tus milagros.',
      'Cuida a nuestra familia',
      'y ayúdanos a llevar tu amor a todos. Amén.',
    ],
  },
};
