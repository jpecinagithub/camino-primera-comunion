import type { Lesson } from '../model';

export const lessonPasionResurreccion: Lesson = {
  id: 'l-pasion-resurreccion',
  slug: 'pasion-resurreccion',
  title: 'Pasión y Resurrección',
  subtitle: 'Jesús nos ama hasta el final... ¡y vence a la muerte!',
  nucleusId: 'n5',
  estimatedMinutes: 10,
  objectives: [
    'Conocer con delicadeza la Pasión y muerte de Jesús por amor a nosotros.',
    'Descubrir la alegría de la Resurrección: Jesús está vivo.',
    'Entender que la cruz es signo del amor más grande.',
  ],
  blocks: [
    {
      id: 'l-pasion-resurreccion-b1',
      audioSrc: '/audio/escucha-pasion-resurreccion.mp3',
      kind: 'escucha',
      title: 'La Última Cena',
      imageLabel: 'Jesús compartiendo el pan con sus amigos',
      paragraphs: [
        'La noche antes de morir, Jesús cenó con sus amigos. Tomó pan y vino y les dijo que eran su Cuerpo y su Sangre, entregados por amor.',
        '• Nos dejó el regalo más grande: la Eucaristía.\n• Cada vez que comulgamos, Jesús viene a nuestro corazón, como en aquella cena.',
      ],
    },
    {
      id: 'l-pasion-resurreccion-b2',
      audioSrc: '/audio/escucha-pasion-resurreccion-2.mp3',
      kind: 'escucha',
      title: 'Jesús entrega su vida',
      imageLabel: 'La cruz al atardecer, con luz suave y serena',
      paragraphs: [
        'Unos hombres malos prendieron a Jesús y le hicieron sufrir mucho. Él no se defendió: aceptó la cruz por amor a nosotros, para salvarnos.',
        '• María, su Madre, estuvo a su lado hasta el final.\n• Antes de morir, Jesús perdonó a todos. Su amor fue más fuerte que el odio.',
      ],
    },
    {
      id: 'l-pasion-resurreccion-b3',
      kind: 'descubre',
      title: '¡Jesús ha resucitado!',
      imageLabel: 'Amanecer luminoso: el sepulcro vacío y luz de Pascua',
      paragraphs: [
        'Pero la muerte no pudo con Jesús. Al tercer día, ¡resucitó! Sus amigos le vieron vivo, les habló y comió con ellos.',
        '• La Resurrección es la fiesta más grande de los cristianos: la Pascua.\n• Jesús está vivo y está con nosotros todos los días.',
      ],
    },
    {
      id: 'l-pasion-resurreccion-b4',
      kind: 'piensa',
      title: 'La cruz, signo de amor',
      paragraphs: [
        'Cuando ves una cruz, no veas solo sufrimiento: ve el amor más grande del mundo.',
        '• Jesús dio su vida por ti, porque te quiere muchísimo.\n• Ante la cruz puedo decirle: "Gracias, Jesús, por amarme tanto".',
        '¿Qué le quieres decir tú a Jesús ante su cruz?',
      ],
    },
    {
      id: 'l-pasion-resurreccion-b5',
      kind: 'reza',
      title: 'Gracias por tu amor',
      paragraphs: [
        'Jesús, gracias por entregar tu vida por mí.',
        'Gracias porque resucitaste y estás vivo.',
        'Quédate siempre a mi lado. Amén.',
      ],
    },
  ],
  gameIds: ['verdadero-falso', 'reto-semana'],
  quiz: {
    id: 'l-pasion-resurreccion-quiz',
    title: 'La Pascua de Jesús',
    questions: [
      {
        id: 'l-pasion-resurreccion-q1',
        question: '¿Qué nos regaló Jesús en la Última Cena?',
        options: ['La Eucaristía', 'Una fiesta', 'Un viaje'],
        correctIndex: 0,
        hint: 'Es el regalo que recibimos en la Primera Comunión.',
        explanation:
          '¡Exacto! En la Última Cena Jesús nos regaló la Eucaristía: su Cuerpo y su Sangre por amor a nosotros.',
      },
      {
        id: 'l-pasion-resurreccion-q2',
        question: '¿Por qué aceptó Jesús la cruz?',
        options: [
          'Porque no pudo evitarlo',
          'Por amor a nosotros, para salvarnos',
          'Porque estaba enfadado',
        ],
        correctIndex: 1,
        hint: 'Todo lo que hace Jesús lo hace por amor.',
        explanation:
          '¡Muy bien! Jesús entregó su vida libremente, por amor: su amor fue más fuerte que el odio y que la muerte.',
      },
      {
        id: 'l-pasion-resurreccion-q3',
        question: '¿Qué pasó al tercer día?',
        options: [
          'Sus amigos se olvidaron de Él',
          'Jesús resucitó: ¡está vivo!',
          'Todo terminó para siempre',
        ],
        correctIndex: 1,
        hint: 'Es la fiesta más grande: la Pascua.',
        explanation:
          '¡Perfecto! Al tercer día Jesús resucitó. La muerte no pudo con Él: ¡está vivo y está con nosotros!',
      },
      {
        id: 'l-pasion-resurreccion-q4',
        question: '¿Qué significa la cruz para los cristianos?',
        options: [
          'Un adorno bonito',
          'El signo del amor más grande: Jesús dio su vida por nosotros',
          'Algo para tener miedo',
        ],
        correctIndex: 1,
        hint: 'Piensa en cuánto nos quiere Jesús.',
        explanation:
          '¡Genial! La cruz es el signo del amor más grande del mundo: Jesús entregó su vida por cada uno de nosotros.',
      },
    ],
  },
  prayer: {
    id: 'l-pasion-resurreccion-prayer',
    audioSrc: '/audio/oracion-l-pasion-resurreccion-prayer.mp3',
    title: 'Jesús vivo',
    lines: [
      'Jesús, que moriste por amor',
      'y resucitaste lleno de vida,',
      'gracias por quererme tanto.',
      'Vive siempre en mi corazón. Amén.',
    ],
  },
  family: {
    activityTitle: 'Nuestro rincón de Pascua',
    activity:
      'En casa, colocad una cruz en un lugar visible con una vela (de mentira) o una flor. Durante la Semana Santa, rezad juntos ante ella cada noche dando gracias a Jesús por su amor. El Domingo de Pascua, celebrad con alegría: ¡Cristo ha resucitado!',
  },
  parentNotes: {
    oneMinute:
      'En la Última Cena Jesús nos regaló la Eucaristía. Entregó su vida en la cruz por amor a nosotros, y al tercer día resucitó: está vivo y con nosotros. La cruz es el signo del amor más grande.',
    fiveMinutes: [
      'Esta es la lección más delicada del itinerario. El relato de la Pasión se narra sin tremendismo: se nombra el sufrimiento con sobriedad ("le hicieron sufrir mucho") y el acento está en el amor que lo sostiene todo.',
      'La Última Cena conecta directamente con la Primera Comunión que el niño se prepara a recibir: "cada vez que comulgamos, Jesús viene a nuestro corazón". Es el puente natural hacia los sacramentos.',
      'La Resurrección se presenta como victoria y fiesta, no como epílogo triste. El mensaje para el niño: Jesús está vivo y le acompaña cada día.',
      'CREER: Pasión, muerte y Resurrección de Jesús. CELEBRAR: la Semana Santa y la Pascua; la Eucaristía. VIVIR: agradecer y corresponder al amor. ORAR: ante la cruz, con confianza.',
      'Si el niño pregunta por qué Jesús tuvo que sufrir, responded con sencillez: porque nos quiere tanto que quiso pasar por todo lo nuestro para salvarnos. No hace falta más teología a esta edad.',
    ],
    familyQuestions: [
      '¿Qué sientes cuando miras una cruz?',
      '¿Por qué la Resurrección es una fiesta tan grande?',
      '¿Cómo podemos corresponder al amor de Jesús?',
    ],
    dailyExample:
      'Al persignaros o al pasar ante una iglesia, podéis recordar: "Jesús nos quiere hasta dar su vida". Pequeños gestos que siembran gratitud.',
    familyActivity:
      'Vivid juntos algún momento de la Semana Santa en vuestra parroquia (el Via Crucis, la Vigilia Pascual). Preparadlo en casa explicando qué vais a ver, con calma y sin prisas.',
    familyPrayer: [
      'Jesús, gracias por tu amor en la cruz',
      'y por tu Resurrección gloriosa.',
      'Llena nuestra familia de tu alegría pascual',
      'hoy y siempre. Amén.',
    ],
  },
};
