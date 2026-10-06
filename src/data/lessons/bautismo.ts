/**
 * Lección 9 — El Bautismo (núcleo n7)
 * ----------------------------------------------------------------------------
 * Contenido original en español, para niños de 9 años.
 */
import type { Lesson } from '../model';

export const lessonBautismo: Lesson = {
  id: 'l-bautismo',
  slug: 'bautismo',
  title: 'El Bautismo',
  subtitle: 'El día en que nacimos a la vida nueva',
  nucleusId: 'n7',
  estimatedMinutes: 8,
  objectives: [
    'Descubrir que el Bautismo nos hace hijos de Dios y nos da una vida nueva.',
    'Conocer los signos del Bautismo: el agua, el óleo, el vestido blanco y la vela.',
    'Alegrarse de formar parte de la gran familia de la Iglesia.',
  ],
  blocks: [
    {
      id: 'bt1',
      kind: 'descubre',
      title: 'CREEMOS · Nacer a la vida nueva',
      paragraphs: [
        'El Bautismo es el primer regalo de Jesús: por él somos hijos de Dios de verdad.',
        'En el Bautismo empezamos una vida nueva, como amigos de Jesús para siempre.',
        'Aunque lo recibimos cuando éramos bebés, ¡es la fiesta más importante de nuestra vida cristiana!',
      ],
      imageLabel: 'El agua del Bautismo',
    },
    {
      id: 'bt2',
      audioSrc: '/audio/escucha-bautismo.mp3',
      kind: 'escucha',
      title: 'CREEMOS · El río Jordán',
      paragraphs: [
        'Cuando Jesús ya era mayor, quiso bautizarse en el río Jordán, como hacían muchas personas de su pueblo.',
        'Al salir del agua, el cielo se abrió y se escuchó la voz del Padre: «Este es mi Hijo amado».',
        'Desde entonces sabemos que Dios nos quiere como hijos suyos y nos acoge con alegría.',
      ],
    },
    {
      id: 'bt3',
      kind: 'descubre',
      title: 'CELEBRAMOS · Los signos del Bautismo',
      paragraphs: [
        'En el Bautismo hay signos preciosos que hablan sin palabras:',
        '• El AGUA: el sacerdote la derrama sobre la cabeza diciendo: «Yo te bautizo en el nombre del Padre, y del Hijo, y del Espíritu Santo».',
        '• El ÓLEO: nos ungen con un perfume especial, como se hacía con los reyes y los ganadores.',
        '• El VESTIDO BLANCO: nos vestimos de fiesta, como hijos nuevos de Dios.',
        '• La VELA: encendida del cirio pascual, es la luz de Jesús que nos acompaña siempre.',
      ],
    },
    {
      id: 'bt4',
      kind: 'piensa',
      title: 'CELEBRAMOS · Mi Bautismo',
      paragraphs: [
        'El día de tu Bautismo, tus papás y tus padrinos dijeron «sí» a Jesús por ti.',
        'Los padrinos prometieron ayudarte a conocer a Jesús, como hacen los mejores amigos.',
        '¿En casa hay alguna foto o recuerdo de ese día? Es tu cumpleaños cristiano.',
      ],
    },
    {
      id: 'bt5',
      kind: 'piensa',
      title: 'VIVIMOS · La Iglesia nos acoge',
      paragraphs: [
        'Por el Bautismo entramos en la gran familia de la Iglesia: ¡somos muchos hermanos y hermanas!',
        'La Iglesia nos acoge, nos enseña y nos acompaña, como hace una familia de verdad.',
        'Ser bautizados es una alegría: cada día podemos vivir como hijos de Dios.',
      ],
    },
    {
      id: 'bt6',
      kind: 'reza',
      title: 'ORAMOS · Gracias por la vida nueva',
      paragraphs: [
        'Cierra los ojos y piensa en el agua del Bautismo que te hizo hijo de Dios.',
        'Da gracias a Jesús por este regalo tan grande y pidele que te ayude a vivirlo cada día.',
      ],
    },
  ],
  gameIds: ['sacramentos', 'memory'],
  quiz: {
    id: 'quiz-bautismo',
    title: '¿Qué has aprendido?',
    questions: [
      {
        id: 'qb1',
        question: '¿Qué nos regala el Bautismo?',
        options: [
          'Ser hijos de Dios y empezar una vida nueva',
          'Poder ir de excursión con la parroquia',
          'Aprender a leer mucho más rápido',
        ],
        correctIndex: 0,
        hint: 'Piensa en lo que pasó cuando Jesús salió del río Jordán.',
        explanation:
          'En el Bautismo Dios nos hace sus hijos de verdad y nos da una vida nueva como amigos de Jesús.',
      },
      {
        id: 'qb2',
        question: '¿Qué palabras dice el sacerdote al derramar el agua?',
        options: [
          '«Bienvenido a nuestro grupo»',
          '«Yo te bautizo en el nombre del Padre, y del Hijo, y del Espíritu Santo»',
          '«Que seas muy feliz toda la vida»',
        ],
        correctIndex: 1,
        hint: 'Nombra a las tres personas de la Trinidad.',
        explanation:
          'El sacerdote bautiza en el nombre del Padre, del Hijo y del Espíritu Santo, porque el Bautismo es obra de Dios.',
      },
      {
        id: 'qb3',
        question: '¿Qué nos dice el vestido blanco?',
        options: [
          'Que en la iglesia hace frío',
          'Que empezamos una vida nueva y limpia',
          'Que hay que vestir elegante los domingos',
        ],
        correctIndex: 1,
        hint: 'El blanco es el color de la fiesta y de lo nuevo.',
        explanation:
          'El vestido blanco significa que en el Bautismo empezamos una vida nueva, limpia y llena de alegría.',
      },
      {
        id: 'qb4',
        question: '¿Quiénes prometieron ayudarte a conocer a Jesús el día de tu Bautismo?',
        options: [
          'Tus vecinos',
          'Tus padrinos',
          'Tus profesores de música',
        ],
        correctIndex: 1,
        hint: 'Estuvieron contigo ese día y rezan por ti.',
        explanation:
          'Los padrinos dijeron «sí» a Jesús por ti y prometieron ayudarte a conocerlo, como los mejores amigos.',
      },
    ],
  },
  prayer: {
    id: 'oracion-bautismo',
    audioSrc: '/audio/oracion-oracion-bautismo.mp3',
    title: 'Gracias por mi Bautismo',
    lines: [
      'Jesús, gracias por mi Bautismo,',
      'el día en que me hiciste tu amigo.',
      'Gracias por el agua, por la luz',
      'y por la fiesta de ser tu hijo.',
      'Ayúdame a vivir cada día',
      'con alegría de hijo de Dios.',
      'Amén.',
    ],
  },
  family: {
    activityTitle: 'Nuestro día del Bautismo',
    activity:
      'Buscad juntos alguna foto o recuerdo del Bautismo del niño. Contadle cómo fue ese día: quién vino, qué dijo el sacerdote, qué sintieron. Terminad rezando un Padrenuestro dando gracias a Dios por ese regalo.',
  },
  parentNotes: {
    oneMinute:
      'El Bautismo nos hace hijos de Dios y nos acoge en la Iglesia, su gran familia. Los signos —el agua, el óleo, el vestido blanco y la vela— cuentan esa vida nueva sin necesidad de palabras.',
    fiveMinutes: [
      'El Bautismo es el primero de los sacramentos: por él nacemos a la vida nueva en Cristo. La mayoría de los niños lo recibieron de bebés, y por eso les puede parecer algo lejano; esta lección quiere convertirlo en una fiesta personal: su «cumpleaños cristiano».',
      'Los signos son el corazón pedagógico de la lección. No hace falta explicarlos con tecnicismos: el agua que lava y da vida, el óleo que fortalece, el vestido blanco de la fiesta y la vela encendida del cirio pascual hablan por sí solos y los niños los recuerdan fácilmente.',
      'Los padrinos merecen una mención especial. En muchas familias la relación con ellos se ha enfriado; recuperar su memoria es una oportunidad preciosa para que el niño sienta que hay más personas que rezan por él y le ayudan a conocer a Jesús.',
      'La dimensión eclesial también es importante: el Bautismo no nos hace «clientes» de una parroquia, sino miembros de una familia. Si es posible, visitad juntos la pila bautismal de vuestra parroquia algún domingo; verla de cerca suele emocionar a los niños.',
    ],
    familyQuestions: [
      '¿Quiénes fueron tus padrinos? ¿Qué recuerdas de ellos?',
      '¿Qué crees que sintieron papá y mamá el día de tu Bautismo?',
      '¿Cómo se nota en la vida de cada día que somos hijos de Dios?',
    ],
    dailyExample:
      'Al levantarte o al acostarte, haz la señal de la cruz despacio, recordando tu Bautismo: «Soy hijo de Dios, y Dios me quiere». Es un gesto de dos segundos que arraiga la identidad cristiana.',
    familyActivity:
      'Colocad esta semana en un lugar visible la foto o el recuerdo del Bautismo del niño, como quien pone las fotos de un cumpleaños. Cada noche, antes de cenar, uno da gracias en voz alta por algo bueno de ese día.',
    familyPrayer: [
      'Padre bueno, gracias por el Bautismo de nuestro hijo,',
      'porque desde ese día es también hijo tuyo.',
      'Ayúdanos a acompañarle para que viva con alegría',
      'su vida nueva de amigo de Jesús.',
      'Amén.',
    ],
  },
};
