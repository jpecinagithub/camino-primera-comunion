/**
 * Lección 11 — Perdón y Reconciliación (núcleo n8)
 * ----------------------------------------------------------------------------
 * Contenido original en español, para niños de 9 años.
 */
import type { Lesson } from '../model';

export const lessonPerdonReconciliacion: Lesson = {
  id: 'l-perdon-reconciliacion',
  slug: 'perdon-reconciliacion',
  title: 'Perdón y Reconciliación',
  subtitle: 'El abrazo del Padre que siempre perdona',
  nucleusId: 'n8',
  estimatedMinutes: 8,
  objectives: [
    'Comprender qué es el pecado con lenguaje adecuado: cuando elegimos no amar.',
    'Descubrir que Dios Padre nos perdona siempre y nos abraza de nuevo.',
    'Aprender a arrepentirse de corazón y a proponerse amar mejor.',
  ],
  blocks: [
    {
      id: 'pr1',
      kind: 'descubre',
      audioSrc: '/audio/bloque-pr1.mp3',
      title: 'CREEMOS · Cuando elegimos no amar',
      paragraphs: [
        'A veces, en vez de amar, elegimos no amar: decimos una mentira, nos enfadamos con un amigo o no ayudamos en casa.',
        'Eso es el pecado: apartarnos del amor de Dios y de los demás, como quien se aleja de casa.',
        'Pero aunque nos alejemos, Dios no deja de querernos ni un momento.',
      ],
    },
    {
      id: 'pr2',
      audioSrc: '/audio/escucha-perdon-reconciliacion.mp3',
      kind: 'escucha',
      title: 'CREEMOS · El hijo que volvió a casa',
      paragraphs: [
        'Jesús contó la historia de un hijo que se marchó de casa y gastó todo lo que su padre le había dado.',
        'Cuando se quedó sin nada y estaba triste, pensó: «Volveré a casa de mi padre».',
        'Su padre lo vio venir de lejos, corrió a abrazarlo y preparó una fiesta. ¡Así nos espera Dios siempre!',
      ],
    },
    {
      id: 'pr3',
      kind: 'descubre',
      audioSrc: '/audio/bloque-pr3.mp3',
      title: 'CREEMOS · El abrazo que nos renueva',
      paragraphs: [
        'La misericordia de Dios es como ese abrazo del padre: nos perdona del todo y nos hace empezar de nuevo.',
        'Dios no nos quiere menos cuando nos equivocamos: nos quiere igual, y desea que volvamos a Él.',
        'Por eso la Reconciliación es una fiesta: volvemos a estar en paz con Dios y con los demás.',
      ],
    },
    {
      id: 'pr4',
      kind: 'piensa',
      audioSrc: '/audio/bloque-pr4.mp3',
      title: 'VIVIMOS · Volver a empezar',
      paragraphs: [
        'Cuando nos equivocamos, podemos hacer dos cosas muy importantes:',
        '• ARREPENTIRNOS: decirle a Dios en el corazón «lo siento, quiero hacerlo mejor».',
        '• PROPONERNOS: pensar en algo concreto para amar mejor la próxima vez.',
        'Y si hemos hecho daño a alguien, pedirle perdón también a él: el perdón cura el corazón.',
      ],
    },
    {
      id: 'pr5',
      kind: 'reza',
      audioSrc: '/audio/bloque-pr5.mp3',
      title: 'ORAMOS · Gracias por perdonarme',
      paragraphs: [
        'Piensa en el abrazo del padre de la historia: así te abraza Dios cada vez que vuelves a Él.',
        'Dale gracias en silencio porque su perdón siempre está esperando, como una fiesta preparada para ti.',
      ],
    },
  ],
  gameIds: ['camino-decisiones', 'completa-oracion'],
  quiz: {
    id: 'quiz-perdon-reconciliacion',
    title: '¿Qué has aprendido?',
    questions: [
      {
        id: 'qp1',
audioSrc: '/audio/quiz-perdon-reconciliacion-1.mp3',
        question: '¿Qué es el pecado?',
        options: [
          'Cuando elegimos no amar y nos apartamos de Dios y de los demás',
          'Cuando nos portamos mal sin querer',
          'Cuando nos castigan en el colegio',
        ],
        correctIndex: 0,
        hint: 'Tiene que ver con elegir no amar.',
        explanation:
          'El pecado es apartarnos del amor de Dios y de los demás, como quien se aleja de casa. Pero Dios no deja de querernos.',
      },
      {
        id: 'qp2',
audioSrc: '/audio/quiz-perdon-reconciliacion-2.mp3',
        question: 'En la historia del hijo que volvió a casa, ¿qué hizo el padre?',
        options: [
          'Le cerró la puerta para que aprendiera',
          'Corrió a abrazarlo y preparó una fiesta',
          'Le pidió que primero pagara todo lo gastado',
        ],
        correctIndex: 1,
        hint: 'Lo vio venir de lejos y salió corriendo.',
        explanation:
          'El padre corrió a abrazar a su hijo y preparó una fiesta: así nos espera Dios siempre, con los brazos abiertos.',
      },
      {
        id: 'qp3',
audioSrc: '/audio/quiz-perdon-reconciliacion-3.mp3',
        question: '¿Qué significa la misericordia de Dios?',
        options: [
          'Que Dios nos perdona del todo y nos ayuda a empezar de nuevo',
          'Que Dios se olvida de nosotros cuando nos equivocamos',
          'Que Dios solo perdona una vez',
        ],
        correctIndex: 0,
        hint: 'Piensa en el abrazo del padre.',
        explanation:
          'La misericordia de Dios es su perdón total: nos abraza, nos perdona del todo y nos hace empezar de nuevo.',
      },
      {
        id: 'qp4',
audioSrc: '/audio/quiz-perdon-reconciliacion-4.mp3',
        question: 'Cuando nos equivocamos, ¿qué dos cosas podemos hacer?',
        options: [
          'Esconderlo y no contárselo a nadie',
          'Arrepentirnos de corazón y proponernos amar mejor',
          'Enfadarnos con quien nos ha descubierto',
        ],
        correctIndex: 1,
        hint: 'Una es decirle a Dios «lo siento»; la otra mira al futuro.',
        explanation:
          'Podemos arrepentirnos («lo siento, quiero hacerlo mejor») y proponernos algo concreto para amar mejor la próxima vez.',
      },
    ],
  },
  prayer: {
    id: 'oracion-perdon-reconciliacion',
    audioSrc: '/audio/oracion-oracion-perdon-reconciliacion.mp3',
    title: 'El abrazo del Padre',
    lines: [
      'Padre bueno, como el hijo de la historia,',
      'a veces me alejo de tu amor.',
      'Gracias porque siempre me esperas',
      'con los brazos abiertos.',
      'Perdóname, renuévame',
      'y enséñame a amar mejor.',
      'Amén.',
    ],
  },
  family: {
    audioSrc: '/audio/familia-perdon-reconciliacion.mp3',
    activityTitle: 'La fiesta del perdón en casa',
    activity:
      'Contad en familia la historia del hijo que volvió a casa, cada uno con sus palabras. Después, cada uno pide perdón en voz alta por algo pequeño del día (un enfado, una palabra fea) y se dan un abrazo. Descubrid juntos qué bien sienta perdonar y ser perdonados.',
  },
  parentNotes: {
    oneMinute:
      'El pecado es elegir no amar; pero Dios Padre nos espera siempre con los brazos abiertos. Arrepentirse de corazón y proponerse amar mejor es el camino de vuelta a casa.',
    fiveMinutes: [
      'El lenguaje es la clave pastoral de esta lección: «cuando elegimos no amar» evita tanto el moralismo del «te portas mal» como la idea de un Dios enfadado. A los nueve años, el niño entiende perfectamente el amor y su ausencia; no necesita una teología del pecado más elaborada.',
      'La parábola del padre misericordioso (la contamos como «el hijo que volvió a casa») pone el acento donde debe estar: no en la culpa del hijo, sino en el abrazo del padre. La imagen que debe quedar grabada es la de Dios corriendo a nuestro encuentro, no la de Dios enfadado.',
      'Arrepentimiento y propósito se presentan como dos gestos sencillos y concretos, no como fórmulas. El propósito debe ser siempre una acción positiva («mañana ayudaré a…»), nunca una promesa imposible de «no volver a hacerlo nunca».',
      'Esta lección prepara la siguiente («Cómo confesarse»). Si el niño llega a la confesión con la imagen del Padre que abraza, el sacramento será una fiesta y no un examen. Evitad cualquier comentario que asocie la confesión con el miedo o el castigo.',
    ],
    familyQuestions: [
      '¿Te acuerdas de alguna vez en que te costó pedir perdón? ¿Qué pasó después?',
      '¿Qué parte de la historia del hijo que volvió a casa te gusta más?',
      '¿A quién te gustaría pedirle perdón esta semana?',
    ],
    dailyExample:
      'Cuando haya un enfado o una discusión en casa, no lo dejéis «enfriar» sin más: animad a pedir perdón antes de dormir. El perdón pedido y dado cada día es la mejor catequesis sobre la misericordia.',
    familyActivity:
      'Haced el «abrazo del perdón»: cada noche, antes de acostarse, cada miembro de la familia dice en voz alta algo por lo que pide perdón y recibe un abrazo. Empezad los padres, para que el niño vea que pedir perdón es de valientes.',
    familyPrayer: [
      'Padre misericordioso, gracias porque nos perdonas siempre.',
      'Enséñanos a pedir perdón sin miedo',
      'y a perdonar como tú nos perdonas.',
      'Que en nuestra casa reine tu abrazo.',
      'Amén.',
    ],
  },
};
