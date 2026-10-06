/**
 * Lección 15 — Preparación para recibir la Primera Comunión (núcleo n9)
 * ----------------------------------------------------------------------------
 * Contenido original en español, para niños de 9 años.
 */
import type { Lesson } from '../model';

export const lessonPreparacionPrimeraComunion: Lesson = {
  id: 'l-preparacion-primera-comunion',
  slug: 'preparacion-primera-comunion',
  title: 'Preparación para recibir la Primera Comunión',
  subtitle: 'El gran día se acerca: ¡prepárate por dentro!',
  nucleusId: 'n9',
  estimatedMinutes: 10,
  objectives: [
    'Saber qué va a pasar el día de la Primera Comunión.',
    'Prepararse por dentro: reconciliación, oración y corazón en paz.',
    'Descubrir que lo importante de ese día es Jesús, no los regalos.',
  ],
  blocks: [
    {
      id: 'pc1',
      kind: 'descubre',
      title: 'CREEMOS · El gran día se acerca',
      paragraphs: [
        '¡Tu Primera Comunión está cada vez más cerca! Será el día en que recibas a Jesús por primera vez en la Eucaristía.',
        'Toda la parroquia lo celebrará contigo: tu familia, tus amigos y tus catequistas.',
        'Es un día de fiesta… pero la fiesta más importante ocurre dentro de tu corazón.',
      ],
    },
    {
      id: 'pc2',
      kind: 'piensa',
      title: 'VIVIMOS · Prepararse por dentro',
      paragraphs: [
        'Como cuando preparamos la casa para una visita importante, preparamos el corazón para recibir a Jesús:',
        '• RECONCILIACIÓN: confesarse antes es como limpiar y ordenar la casa para el invitado.',
        '• ORACIÓN: hablar cada día con Jesús, contarle tus cosas y escucharle en silencio.',
        '• PAZ: estar en paz con todos, perdonando y pidiendo perdón si hace falta.',
      ],
    },
    {
      id: 'pc3',
      kind: 'piensa',
      title: 'CELEBRAMOS · Al comulgar',
      paragraphs: [
        'Cuando llegue tu turno, acércate con calma y con alegría: ¡vas al encuentro de Jesús!',
        'Pregunta a tu catequista cómo se hace en tu parroquia, para hacerlo con tranquilidad y respeto.',
        'Al recibirlo, respóndele con un «Amén» dicho de corazón: significa «sí, lo creo».',
        'Después, vuelve a tu sitio y habla con Él en silencio: dale gracias por venir a ti.',
      ],
    },
    {
      id: 'pc4',
      kind: 'descubre',
      title: 'VIVIMOS · Lo importante es Jesús',
      paragraphs: [
        'Ese día habrá fotos, trajes bonitos, comida en familia y quizá algún regalo. Todo eso está bien.',
        'Pero recuerda: lo importante no son los regalos ni la fiesta de fuera, sino el Regalo de dentro: Jesús.',
        'Los regalos se rompen o se olvidan; Jesús se queda contigo para siempre.',
      ],
    },
    {
      id: 'pc5',
      kind: 'reza',
      title: 'ORAMOS · Ya casi estás aquí',
      paragraphs: [
        'Cuenta los días que faltan con ilusión, como se cuenta atrás una fiesta esperada.',
        'Reza cada día la oración de esta lección y pídele a Jesús que prepare tu corazón para recibirle.',
      ],
    },
  ],
  gameIds: ['reto-semana', 'ano-liturgico'],
  quiz: {
    id: 'quiz-preparacion-primera-comunion',
    title: '¿Qué has aprendido?',
    questions: [
      {
        id: 'qpc1',
        question: '¿Qué es lo más importante del día de la Primera Comunión?',
        options: [
          'Recibir a Jesús por primera vez en la Eucaristía',
          'Estrenar un traje muy bonito',
          'Recibir muchos regalos',
        ],
        correctIndex: 0,
        hint: 'La fiesta más importante ocurre dentro del corazón.',
        explanation:
          'Lo más importante es recibir a Jesús en la Eucaristía: Él es el verdadero Regalo, que se queda para siempre.',
      },
      {
        id: 'qpc2',
        question: '¿Cómo nos preparamos por dentro?',
        options: [
          'Con reconciliación, oración y paz con los demás',
          'Memorizando un discurso para la fiesta',
          'Comprando la tarta más grande',
        ],
        correctIndex: 0,
        hint: 'Es como preparar la casa para una visita importante.',
        explanation:
          'Nos preparamos con la reconciliación (el corazón limpio), la oración diaria y estando en paz con todos.',
      },
      {
        id: 'qpc3',
        question: 'Al recibir a Jesús, ¿qué respondemos?',
        options: [
          '«Amén», que significa «sí, lo creo»',
          '«Muchas gracias, hasta luego»',
          'No hay que decir nada',
        ],
        correctIndex: 0,
        hint: 'Es una palabra muy corta que significa «sí, lo creo».',
        explanation:
          'Respondemos «Amén» de corazón: es nuestro «sí» a Jesús, que viene a vivir dentro de nosotros.',
      },
      {
        id: 'qpc4',
        question: 'Después de comulgar, ¿qué hacemos?',
        options: [
          'Hablamos con Jesús en silencio y le damos gracias',
          'Salimos corriendo a jugar',
          'Nos ponemos a charlar con los amigos',
        ],
        correctIndex: 0,
        hint: 'Es el momento de la acción de gracias.',
        explanation:
          'Después de comulgar hablamos con Jesús en silencio y le damos gracias por haber venido a nosotros.',
      },
    ],
  },
  prayer: {
    id: 'oracion-preparacion',
    title: 'Prepárame, Jesús',
    lines: [
      'Jesús, ya falta poco',
      'para recibirte por primera vez.',
      'Limpia mi corazón,',
      'llénalo de tu paz',
      'y prepáralo para tu llegada.',
      'Quiero recibirte con alegría',
      'y amarte para siempre.',
      'Amén.',
    ],
  },
  family: {
    activityTitle: 'La cuenta atrás del corazón',
    activity:
      'Haced juntos un calendario de cuenta atrás hasta el día de la Primera Comunión. Cada día, una pequeña preparación: una oración juntos, un gesto de amor, un perdón pedido. El día anterior, id a confesaros en familia (los padres también, si podéis) y cenad tranquilos hablando de lo que vais a celebrar.',
  },
  parentNotes: {
    oneMinute:
      'La Primera Comunión es recibir a Jesús por primera vez: nos preparamos por dentro con la reconciliación, la oración y la paz con los demás. Lo importante de ese día es Jesús, no los regalos.',
    fiveMinutes: [
      'El riesgo pastoral de esta lección es el consumismo: trajes, banquetes, regalos y fotos pueden eclipsar el sacramento. La lección lo dice con claridad y sin culpabilizar: «todo eso está bien, pero lo importante es Jesús». Los padres son los primeros que deben creérselo para transmitirlo.',
      'La preparación interior se concreta en tres gestos: reconciliación, oración y paz. La confesión previa no es un trámite: es la que permite al niño llegar al gran día con el corazón ligero. Si los padres también se confiesan, el ejemplo multiplica el efecto.',
      'El «Amén» al comulgar merece ensayarse en casa: no como un loro, sino entendiendo que es un «sí, lo creo» personal. Practicadlo con naturalidad, sin solemnidad impostada.',
      'La cuenta atrás familiar convierte la espera en catequesis diaria: un gesto de amor al día es más formativo que cualquier charla. Y la víspera, vivida con calma (sin prisas de última hora), marca la diferencia entre un día estresante y un día de fiesta.',
    ],
    familyQuestions: [
      '¿Qué es lo que más ilusión te hace del día de tu Primera Comunión?',
      '¿Cómo quieres preparar tu corazón en estos días que faltan?',
      'Si un amigo te preguntara por qué haces la Primera Comunión, ¿qué le dirías?',
    ],
    dailyExample:
      'Durante la cuenta atrás, cada noche un miembro de la familia dice en voz alta por qué tiene ganas de que llegue el gran día. Escuchar a los padres ilusionados por la comunión de su hijo es la mejor preparación.',
    familyActivity:
      'El día anterior, después de la confesión, haced una «cena de la víspera»: algo sencillo y tranquilo, con una vela encendida en la mesa. Cada uno dice en voz alta una cosa que le pide a Jesús para el día siguiente.',
    familyPrayer: [
      'Jesús, que vas a venir por primera vez',
      'al corazón de nuestro hijo,',
      'prepáralo con tu amor,',
      'llénalo de tu paz y tu alegría,',
      'y quédate con él para siempre.',
      'Amén.',
    ],
  },
};
