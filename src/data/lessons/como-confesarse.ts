/**
 * Lección 12 — Cómo confesarse (núcleo n8)
 * ----------------------------------------------------------------------------
 * Contenido original en español, para niños de 9 años.
 * Tono tranquilizador: el sacerdote ayuda y guarda secreto.
 */
import type { Lesson } from '../model';

export const lessonComoConfesarse: Lesson = {
  id: 'l-como-confesarse',
  slug: 'como-confesarse',
  title: 'Cómo confesarse',
  subtitle: 'Un encuentro de alegría con Jesús que perdona',
  nucleusId: 'n8',
  estimatedMinutes: 8,
  objectives: [
    'Conocer los pasos de la confesión sin miedo, como un encuentro con Jesús.',
    'Descubrir que el sacerdote ayuda, escucha con cariño y guarda secreto.',
    'Aprender el acto de contrición y vivir la alegría del perdón.',
  ],
  blocks: [
    {
      id: 'cf1',
      kind: 'descubre',
      title: 'CREEMOS · No tengas miedo',
      paragraphs: [
        'Confesarse es ir al encuentro de Jesús, que nos espera para perdonarnos y abrazarnos.',
        'El sacerdote está allí para ayudarte: te escucha con cariño, te aconseja y guarda secreto de todo lo que le cuentes.',
        'Nadie tiene que tener miedo de confesarse: es una fiesta del perdón, no un examen.',
      ],
    },
    {
      id: 'cf2',
      audioSrc: '/audio/escucha-como-confesarse.mp3',
      kind: 'escucha',
      title: 'CELEBRAMOS · Paso a paso',
      paragraphs: [
        'La confesión tiene unos pasos muy sencillos; el sacerdote te guía en cada uno:',
        '• 1. EXAMEN DE CONCIENCIA: antes de ir, piensas en silencio en los momentos en que no amaste.',
        '• 2. ACERCARTE AL SACERDOTE: vas al confesionario o a la capilla, con tranquilidad.',
        '• 3. CONFESAR: le cuentas a Jesús, a través del sacerdote, aquello que te pesa en el corazón.',
        '• 4. CONSEJO: el sacerdote te dice unas palabras para ayudarte a amar mejor.',
        '• 5. PENITENCIA: te propone algo sencillo (una oración, un gesto bueno) para reparar.',
        '• 6. ACTO DE CONTRICIÓN: le dices a Jesús que lo sientes y que quieres hacerlo mejor.',
        '• 7. ABSOLUCIÓN: el sacerdote, en nombre de Jesús, te perdona y te bendice.',
        '• 8. ACCIÓN DE GRACIAS: sales contento y das gracias a Dios por su perdón.',
      ],
    },
    {
      id: 'cf3',
      kind: 'piensa',
      title: 'VIVIMOS · El examen de conciencia',
      paragraphs: [
        'El examen de conciencia se hace en silencio, con calma, hablando con Jesús en el corazón.',
        'Puedes preguntarte despacio: ¿he ayudado en casa? ¿he dicho la verdad? ¿he tratado bien a mis amigos?',
        'No hace falta recordar una lista perfecta: Jesús ya conoce tu corazón y solo quiere abrazarte.',
      ],
    },
    {
      id: 'cf4',
      kind: 'piensa',
      title: 'CELEBRAMOS · El abrazo del perdón',
      paragraphs: [
        'Cuando el sacerdote te da la absolución, es Jesús mismo quien te perdona y te dice: «empieza de nuevo».',
        'Sales de la confesión con el corazón ligero y contento, como después de un gran abrazo.',
        'Por eso muchos cristianos se confiesan a menudo: ¡es una alegría que se puede repetir!',
      ],
    },
    {
      id: 'cf5',
      kind: 'reza',
      title: 'ORAMOS · Lo siento, Jesús',
      paragraphs: [
        'El acto de contrición es decirle a Jesús, con palabras sencillas, que lo sientes y que lo quieres.',
        'Reza despacio la oración de esta lección y guárdala en el corazón para el día de tu confesión.',
      ],
    },
  ],
  gameIds: ['completa-oracion', 'verdadero-falso'],
  quiz: {
    id: 'quiz-como-confesarse',
    title: '¿Qué has aprendido?',
    questions: [
      {
        id: 'qc1',
        question: '¿Qué es lo primero que hacemos antes de confesarnos?',
        options: [
          'El examen de conciencia: pensar en silencio en los momentos en que no amamos',
          'Aprenderse de memoria un discurso largo',
          'Pedirle permiso a toda la clase',
        ],
        correctIndex: 0,
        hint: 'Se hace en silencio, hablando con Jesús en el corazón.',
        explanation:
          'El examen de conciencia es pensar con calma en los momentos en que no amamos, para contarle a Jesús lo que nos pesa.',
      },
      {
        id: 'qc2',
        question: '¿Cómo te trata el sacerdote en la confesión?',
        options: [
          'Te escucha con cariño, te ayuda y guarda secreto de todo',
          'Te regaña muy fuerte para que no lo olvides',
          'Se lo cuenta a tus padres al salir',
        ],
        correctIndex: 0,
        hint: 'El sacerdote está allí para ayudarte, no para asustarte.',
        explanation:
          'El sacerdote te escucha con cariño, te aconseja y guarda secreto: la confesión es un encuentro de confianza con Jesús.',
      },
      {
        id: 'qc3',
        question: '¿Qué es la absolución?',
        options: [
          'El momento en que el sacerdote, en nombre de Jesús, te perdona y te bendice',
          'La propina que se deja en la iglesia',
          'La canción que se canta al final de la Misa',
        ],
        correctIndex: 0,
        hint: 'Es el abrazo del perdón de Jesús.',
        explanation:
          'En la absolución es Jesús mismo quien te perdona a través del sacerdote y te dice: «empieza de nuevo».',
      },
      {
        id: 'qc4',
        question: 'Después de confesarte, ¿qué haces?',
        options: [
          'Sales corriendo sin decir nada',
          'Das gracias a Dios por su perdón, contento y en paz',
          'Te escondes porque te da vergüenza',
        ],
        correctIndex: 1,
        hint: 'Es el último paso: la acción de gracias.',
        explanation:
          'La confesión termina con la acción de gracias: salimos contentos, con el corazón ligero, dando gracias a Dios.',
      },
    ],
  },
  prayer: {
    id: 'oracion-acto-contricion',
    audioSrc: '/audio/oracion-oracion-acto-contricion.mp3',
    title: 'Acto de contrición',
    lines: [
      'Jesús, lo siento de corazón',
      'por las veces que no he amado.',
      'Perdóname y ayúdame',
      'a hacerlo mejor cada día.',
      'Te quiero mucho, Jesús.',
      'Amén.',
    ],
  },
  family: {
    activityTitle: 'Practicar la confianza',
    activity:
      'Hablad en familia de cómo fue vuestra primera confesión (los padres pueden contar la suya con cariño y humor). Representad juntos, como un juego tranquilo, cómo se saluda al sacerdote y cómo se empieza («Bendígame, padre…»). Lo importante es que el niño sienta que confesarse es algo bueno y sencillo.',
  },
  parentNotes: {
    oneMinute:
      'La confesión es un encuentro de alegría con Jesús que perdona: el sacerdote ayuda, escucha con cariño y guarda secreto. Sus pasos son sencillos: examen, confesar, consejo, penitencia, contrición, absolución y acción de gracias.',
    fiveMinutes: [
      'El objetivo pastoral es desdramatizar. Muchos niños llegan a su primera confesión con miedo, a menudo por comentarios bienintencionados («a ver qué le cuentas al cura»). Esta lección insiste en tres ideas: el sacerdote ayuda, guarda secreto y la confesión es una fiesta.',
      'El examen de conciencia se presenta como un diálogo silencioso con Jesús, con preguntas-guía muy sencillas. Importante: nunca se le pide al niño que escriba sus pecados ni que los enumere en voz alta en casa; el examen es un momento íntimo entre él y Dios.',
      'La penitencia merece una explicación tranquila: no es un castigo, es un gesto sencillo (una oración, una buena acción) para reparar y empezar de nuevo. Si el niño pregunta «¿y si se me olvida algo?», responded con naturalidad: Jesús conoce el corazón y perdona todo lo que le presentamos con sinceridad.',
      'El acto de contrición de esta lección es breve y original, pensado para que un niño de nueve años lo rece de verdad, no solo lo memorice. Podéis rezarlo juntos alguna noche para que le resulte familiar el día de la confesión.',
    ],
    familyQuestions: [
      '¿Hay algo de la confesión que te dé un poco de reparo? Hablemos de ello.',
      '¿Qué crees que se siente al salir de confesarse con el corazón en paz?',
      '¿A quién te gustaría pedirle perdón esta semana, además de a Dios?',
    ],
    dailyExample:
      'Cuando el niño se equivoque en casa, evitad frases como «eso se lo cuentas al cura». En su lugar: «¿quieres pedir perdón? Verás qué bien sienta». Así la confesión queda asociada al alivio, no al miedo.',
    familyActivity:
      'Visitad juntos el confesionario o el lugar de la parroquia donde se celebran las confesiones, un día tranquilo. Que el niño lo vea de cerca, se siente si quiere y pregunte lo que necesite. Lo desconocido asusta; lo conocido, no.',
    familyPrayer: [
      'Jesús, que perdonas siempre con amor,',
      'acompaña a nuestro hijo en su primera confesión.',
      'Que sienta tu abrazo y tu alegría,',
      'y salga de ella con el corazón en paz.',
      'Amén.',
    ],
  },
};
