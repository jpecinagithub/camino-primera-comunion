/**
 * Lección 14 — La Eucaristía (núcleo n9)
 * ----------------------------------------------------------------------------
 * Contenido original en español, para niños de 9 años.
 */
import type { Lesson } from '../model';

export const lessonEucaristia: Lesson = {
  id: 'l-eucaristia',
  slug: 'eucaristia',
  title: 'La Eucaristía',
  subtitle: 'Jesús se queda con nosotros para siempre',
  nucleusId: 'n9',
  estimatedMinutes: 9,
  objectives: [
    'Descubrir que en la Última Cena Jesús nos dejó el regalo de la Eucaristía.',
    'Creer que Jesús está de verdad en la Eucaristía, aunque nuestros ojos vean pan.',
    'Preparar el corazón para recibirle en la Comunión y darle gracias.',
  ],
  blocks: [
    {
      id: 'eu1',
      audioSrc: '/audio/escucha-eucaristia.mp3',
      kind: 'escucha',
      title: 'CREEMOS · La Última Cena',
      paragraphs: [
        'La noche antes de entregar su vida por nosotros, Jesús cenó por última vez con sus amigos, los apóstoles.',
        'Tomó el pan, dio gracias a Dios, lo partió y dijo: «Tomad y comed, esto es mi Cuerpo».',
        'Y con la copa de vino dijo: «Esto es mi Sangre». Así nos dejó el regalo más grande: Él mismo.',
      ],
    },
    {
      id: 'eu2',
      kind: 'descubre',
      title: 'CREEMOS · Jesús está de verdad',
      paragraphs: [
        'En cada Misa, cuando el sacerdote repite las palabras de Jesús, el pan y el vino se convierten en su Cuerpo y su Sangre.',
        'Nuestros ojos siguen viendo pan, pero la fe nos dice la verdad más bonita: ¡Jesús está ahí de verdad!',
        'Es un misterio de amor: Jesús se hace pequeño para entrar en nuestro corazón.',
      ],
    },
    {
      id: 'eu3',
      kind: 'piensa',
      title: 'CELEBRAMOS · Recibir a Jesús en la Comunión',
      paragraphs: [
        'Comulgar es recibir a Jesús mismo, que viene a vivir dentro de nosotros.',
        'Por eso nos preparamos por dentro: con el corazón limpio, en paz con Dios y con los demás, y con mucha alegría.',
        'Cuando lo recibimos, Él nos da su fuerza para amar como Él ama.',
      ],
    },
    {
      id: 'eu4',
      kind: 'piensa',
      title: 'VIVIMOS · El domingo y el sagrario',
      paragraphs: [
        'Los cristianos nos reunimos cada domingo para celebrar la Eucaristía: es el día de la fiesta con Jesús.',
        'Y Jesús no se va cuando termina la Misa: se queda en el sagrario, esperándonos.',
        'Podemos visitarle, hablarle en silencio y contarle nuestras cosas, como al mejor amigo.',
      ],
    },
    {
      id: 'eu5',
      kind: 'reza',
      title: 'ORAMOS · Gracias, Jesús, por quedarte',
      paragraphs: [
        'Después de comulgar, hay un momento precioso: la acción de gracias.',
        'Quédate un rato en silencio con Jesús dentro de ti y dale gracias por haberse quedado contigo para siempre.',
      ],
    },
  ],
  gameIds: ['sacramentos', 'detective-evangelio'],
  quiz: {
    id: 'quiz-eucaristia',
    title: '¿Qué has aprendido?',
    questions: [
      {
        id: 'qe1',
        question: '¿Cuándo nos dejó Jesús el regalo de la Eucaristía?',
        options: [
          'En la Última Cena, la noche antes de entregar su vida',
          'En su cumpleaños número treinta',
          'En una fiesta del pueblo de Nazaret',
        ],
        correctIndex: 0,
        hint: 'Fue en una cena muy especial con sus apóstoles.',
        explanation:
          'En la Última Cena Jesús tomó el pan y el vino y dijo: «Esto es mi Cuerpo… Esto es mi Sangre», dejándonos la Eucaristía.',
      },
      {
        id: 'qe2',
        question: '¿Qué ocurre en la consagración?',
        options: [
          'El pan se convierte en un pan más bonito',
          'El pan y el vino se convierten en el Cuerpo y la Sangre de Jesús',
          'El sacerdote cuenta un cuento a los niños',
        ],
        correctIndex: 1,
        hint: 'Nuestros ojos ven pan, pero la fe nos dice algo más grande.',
        explanation:
          'En la consagración el pan y el vino se convierten de verdad en el Cuerpo y la Sangre de Jesús, aunque sigamos viendo pan.',
      },
      {
        id: 'qe3',
        question: '¿Qué significa comulgar?',
        options: [
          'Recibir a Jesús mismo, que viene a vivir dentro de nosotros',
          'Tomar un tentempié a media mañana',
          'Aprenderse una oración nueva',
        ],
        correctIndex: 0,
        hint: 'Es el encuentro más íntimo con Jesús.',
        explanation:
          'Comulgar es recibir a Jesús mismo: Él entra en nuestro corazón y nos da su fuerza para amar como Él.',
      },
      {
        id: 'qe4',
        question: '¿Dónde se queda Jesús después de la Misa?',
        options: [
          'En el sagrario, esperándonos',
          'En la sacristía, guardado en un armario',
          'Se marcha hasta el domingo siguiente',
        ],
        correctIndex: 0,
        hint: 'La lucecita roja nos dice que está allí.',
        explanation:
          'Jesús se queda en el sagrario después de la Misa: podemos visitarle y hablarle como al mejor amigo.',
      },
    ],
  },
  prayer: {
    id: 'oracion-eucaristia',
    audioSrc: '/audio/oracion-oracion-eucaristia.mp3',
    title: 'Quédate conmigo, Jesús',
    lines: [
      'Jesús, creo que estás aquí,',
      'aunque mis ojos vean pan.',
      'Quédate conmigo para siempre,',
      'vive dentro de mi corazón.',
      'Hazme bueno y generoso,',
      'como lo eres tú.',
      'Amén.',
    ],
  },
  family: {
    activityTitle: 'Una visita a Jesús',
    activity:
      'Id juntos a la iglesia un día entre semana, cuando esté tranquila, a visitar a Jesús en el sagrario. Sentáos un rato en silencio delante de Él, contadle vuestras cosas en voz baja y rezad juntos la oración de esta lección. Descubrid qué paz se siente.',
  },
  parentNotes: {
    oneMinute:
      'En la Última Cena Jesús nos dejó la Eucaristía: en cada Misa el pan y el vino se convierten de verdad en su Cuerpo y su Sangre. Comulgar es recibirle en el corazón; el sagrario nos recuerda que se queda con nosotros.',
    fiveMinutes: [
      'La presencia real es el misterio central de la fe eucarística y hay que presentarlo con sencillez y sin rebajarlo: «Jesús está de verdad, aunque nuestros ojos vean pan». A los nueve años, los niños aceptan el misterio con naturalidad si los adultos lo presentan con convicción serena, sin tecnicismos.',
      'La Última Cena es el relato fundante: conviene que el niño la visualice como una cena de amigos donde Jesús hace un gesto definitivo de amor. No hace falta entrar en detalles históricos; lo esencial es el «esto es mi Cuerpo» dicho por amor.',
      'La preparación interior para comulgar (corazón limpio, en paz con Dios y con los demás) conecta directamente con la lección de la Reconciliación. Si el niño se confiesa antes de su Primera Comunión, vivirá la comunión como una fiesta completa.',
      'El sagrario es un tesoro pastoral infrautilizado: enseñar al niño a «visitar a Jesús» entre semana crea una relación personal que dura toda la vida. Una visita breve y tranquila, sin prisas ni sermones, suele dejar más huella que muchas explicaciones.',
    ],
    familyQuestions: [
      '¿Qué crees que siente Jesús cuando lo recibimos en la Comunión?',
      '¿Qué le contarías a Jesús si lo visitaras en el sagrario esta semana?',
      '¿Por qué crees que Jesús quiso quedarse con nosotros en la Eucaristía?',
    ],
    dailyExample:
      'Al bendecir la mesa, añadid alguna vez: «Gracias, Jesús, porque en cada Misa te nos das como alimento». Conectar la comida diaria con la Eucaristía ayuda al niño a entender que Jesús nos alimenta de verdad.',
    familyActivity:
      'Preparad juntos una «visita al sagrario»: elegid el día, id en silencio, llevaos la oración de esta lección escrita en un papel bonito. Al salir, cada uno dice una cosa que le ha pedido o agradecido a Jesús.',
    familyPrayer: [
      'Jesús, presente en la Eucaristía,',
      'gracias por quedarte con nosotros.',
      'Prepara el corazón de nuestro hijo',
      'para recibirte con alegría',
      'y para amarte cada día más.',
      'Amén.',
    ],
  },
};
