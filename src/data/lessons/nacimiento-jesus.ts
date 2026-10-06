import type { Lesson } from '../model';

export const lessonNacimientoJesus: Lesson = {
  id: 'l-nacimiento-jesus',
  slug: 'nacimiento-jesus',
  title: 'El nacimiento de Jesús',
  subtitle: 'Dios se hace niño en Belén',
  nucleusId: 'n3',
  estimatedMinutes: 9,
  objectives: [
    'Conocer el nacimiento de Jesús en Belén: María, José, los pastores y los magos.',
    'Descubrir que Jesús es Dios que se hace hombre por amor a nosotros.',
    'Vivir la Navidad con alegría y con gestos de amor.',
  ],
  blocks: [
    {
      id: 'l-nacimiento-jesus-b1',
      kind: 'escucha',
      title: 'Un viaje a Belén',
      imageLabel: 'María y José caminando hacia Belén al atardecer',
      paragraphs: [
        'María y José tuvieron que viajar a Belén. Cuando llegaron, no encontraron sitio en la posada y se quedaron en un establo.',
        '• Allí nació Jesús, el Hijo de Dios, en la noche más bonita de la historia.\n• María lo envolvió en pañales y lo acostó en un pesebre.',
      ],
    },
    {
      id: 'l-nacimiento-jesus-b2',
      kind: 'escucha',
      title: 'Pastores y magos',
      imageLabel: 'Pastores y magos adorando al Niño Jesús',
      paragraphs: [
        'Un ángel avisó a unos pastores, que corrieron a ver al Niño y se llenaron de alegría.',
        '• Unos sabios de Oriente, los magos, siguieron una estrella hasta Belén y le llevaron regalos: oro, incienso y mirra.\n• Todos, pobres y sabios, adoraron al Niño: Jesús viene para todos.',
      ],
    },
    {
      id: 'l-nacimiento-jesus-b3',
      kind: 'descubre',
      title: 'Dios se hace niño',
      paragraphs: [
        '¿Por qué Dios se hizo un bebé pequeñito? ¡Por amor! Quiso estar cerquita de nosotros y vivir como nosotros.',
        '• Jesús es verdadero Dios y verdadero hombre.\n• Siendo Dios, eligió nacer pobre, en un pesebre, para estar con los más sencillos.',
      ],
    },
    {
      id: 'l-nacimiento-jesus-b4',
      kind: 'piensa',
      title: 'Preparo mi corazón',
      paragraphs: [
        'En Navidad ponemos el belén y el árbol, pero lo más importante es preparar el corazón para recibir a Jesús.',
        '• Puedo hacerle sitio perdonando a alguien.\n• Puedo regalarle mi ayuda a quien lo necesita.\n• Puedo darle gracias por venir a salvarnos.',
        '¿Qué regalo le vas a hacer tú a Jesús esta Navidad?',
      ],
    },
    {
      id: 'l-nacimiento-jesus-b5',
      kind: 'reza',
      title: 'Ven, Niño Jesús',
      paragraphs: [
        'Niño Jesús, gracias por nacer por mí.',
        'Ven a mi corazón y quédate siempre conmigo.',
        'Enséñame a ser bueno y a querer a todos. Amén.',
      ],
    },
  ],
  gameIds: ['mapa-tierra-santa', 'verdadero-falso'],
  quiz: {
    id: 'l-nacimiento-jesus-quiz',
    title: 'La noche de Belén',
    questions: [
      {
        id: 'l-nacimiento-jesus-q1',
        question: '¿En qué ciudad nació Jesús?',
        options: ['En Nazaret', 'En Belén', 'En Jerusalén'],
        correctIndex: 1,
        hint: 'María y José viajaron hasta allí.',
        explanation:
          '¡Exacto! Jesús nació en Belén, en un establo, porque no había sitio en la posada.',
      },
      {
        id: 'l-nacimiento-jesus-q2',
        question: '¿Quiénes fueron los primeros en visitar al Niño Jesús?',
        options: [
          'Los reyes de otros países',
          'Unos pastores avisados por un ángel',
          'Los soldados romanos',
        ],
        correctIndex: 1,
        hint: 'Cuidaban ovejas en el campo.',
        explanation:
          '¡Muy bien! Unos humildes pastores fueron los primeros en adorar al Niño. Jesús viene para los sencillos.',
      },
      {
        id: 'l-nacimiento-jesus-q3',
        question: '¿Cómo encontraron los magos el camino hasta Belén?',
        options: [
          'Siguiendo una estrella',
          'Preguntando en cada pueblo',
          'Con un mapa muy antiguo',
        ],
        correctIndex: 0,
        hint: 'Brillaba en el cielo de noche.',
        explanation:
          '¡Perfecto! Una estrella los guio hasta Belén, donde adoraron al Niño y le ofrecieron sus regalos.',
      },
      {
        id: 'l-nacimiento-jesus-q4',
        question: '¿Por qué Dios se hizo un niño pequeñito?',
        options: [
          'Porque no tenía otra opción',
          'Por amor, para estar cerquita de nosotros',
          'Para que le hiciéramos regalos',
        ],
        correctIndex: 1,
        hint: 'Todo lo que hace Dios lo hace por amor.',
        explanation:
          '¡Genial! Dios se hizo hombre por amor: quiso vivir como nosotros para salvarnos y estar siempre con nosotros.',
      },
    ],
  },
  prayer: {
    id: 'l-nacimiento-jesus-prayer',
    title: 'Gracias por nacer',
    lines: [
      'Niño Jesús, qué alegría que nacieras,',
      'pobre en un pesebre, por amor a mí.',
      'Quédate en mi corazón',
      'hoy y siempre. Amén.',
    ],
  },
  family: {
    activityTitle: 'Nuestro belén familiar',
    activity:
      'Montad juntos el belén en casa, colocando las figuras poco a poco durante el Adviento. Cada noche, al poner una figura, cada uno dice en voz alta un "regalo" que quiere hacerle al Niño Jesús (un perdón, una ayuda, una sonrisa).',
  },
  parentNotes: {
    oneMinute:
      'Jesús nació en Belén, pobre en un pesebre. Pastores y magos le adoraron: Él viene para todos. Dios se hizo niño por amor, para estar cerquita de nosotros.',
    fiveMinutes: [
      'El relato del nacimiento se narra siguiendo a Lucas (pastores) y Mateo (magos), sin mezclar con rigidez: lo importante es el mensaje de que Jesús viene para todos, pobres y sabios.',
      'La verdad central: Jesús es verdadero Dios y verdadero hombre. Para un niño de 9 años basta la idea de "Dios que se hace niño por amor para estar con nosotros".',
      'El pesebre como signo de humildad: Dios elige lo pequeño. Es una buena ocasión para hablar en familia de la sencillez frente al consumismo navideño.',
      'CREER: la Encarnación (Dios se hace hombre). CELEBRAR: la Navidad y el belén. VIVIR: preparar el corazón con gestos de amor. ORAR: la alegría y la gratitud ante el Niño.',
      'Propuesta: vivir el Adviento como "cuenta atrás del corazón", con un pequeño propósito cada día, en lugar de solo contar los días para los regalos.',
    ],
    familyQuestions: [
      '¿Por qué crees que Jesús quiso nacer pobre en un pesebre?',
      '¿Qué es lo que más te gusta de la Navidad en nuestra familia?',
      '¿Qué regalo le vamos a hacer a Jesús este año?',
    ],
    dailyExample:
      'Al poner el belén o ver las luces de Navidad, podéis recordar: "Todo esto es porque Dios nos quiere tanto que se hizo niño". La fiesta tiene un porqué.',
    familyActivity:
      'Elegid juntos una familia necesitada o una causa solidaria y preparad una caja de Navidad (comida, juguetes). Llevadla antes del 24: es el regalo de vuestra familia al Niño Jesús.',
    familyPrayer: [
      'Niño Jesús, gracias por venir a nuestro mundo.',
      'Llena nuestra casa de tu alegría y tu paz.',
      'Ayúdanos a querernos como tú nos quieres. Amén.',
    ],
  },
};
