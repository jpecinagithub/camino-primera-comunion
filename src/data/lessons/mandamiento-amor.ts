/**
 * Lección 10 — El Mandamiento del Amor (núcleo n8)
 * ----------------------------------------------------------------------------
 * Contenido original en español, para niños de 9 años.
 */
import type { Lesson } from '../model';

export const lessonMandamientoAmor: Lesson = {
  id: 'l-mandamiento-amor',
  slug: 'mandamiento-amor',
  title: 'El Mandamiento del Amor',
  subtitle: 'Amar a Dios y amar a los demás',
  nucleusId: 'n8',
  estimatedMinutes: 9,
  objectives: [
    'Descubrir que Jesús resume todo en un mandamiento: amar a Dios y al prójimo.',
    'Conocer los Diez Mandamientos presentados en positivo, como un camino de amor.',
    'Pensar cada día en una forma concreta de amar a los demás.',
  ],
  blocks: [
    {
      id: 'ma1',
      kind: 'descubre',
      title: 'CREEMOS · La pregunta más importante',
      paragraphs: [
        'Un día le preguntaron a Jesús: «¿Cuál es el mandamiento más importante?».',
        'Jesús respondió: «Amarás al Señor tu Dios con todo tu corazón, y a tu prójimo como a ti mismo».',
        '¡Todo lo que Dios nos pide cabe en una palabra: AMAR!',
      ],
    },
    {
      id: 'ma2',
      kind: 'escucha',
      title: 'CREEMOS · Dios nos enseña el camino',
      paragraphs: [
        'Hace muchísimo tiempo, Dios dio a su pueblo los Diez Mandamientos para enseñarles a vivir felices.',
        'No son una lista de castigos: son como las señales de un camino que nos lleva a la felicidad.',
        'Jesús nos enseñó a leerlos con el corazón: cada mandamiento es una forma de amar.',
      ],
    },
    {
      id: 'ma3',
      kind: 'descubre',
      title: 'VIVIMOS · Los Diez Mandamientos, en positivo',
      paragraphs: [
        'Mira qué bonitos son cuando los leemos como un camino de amor:',
        '• 1. Dios es lo primero en nuestra vida.',
        '• 2. Hablamos de Dios con respeto.',
        '• 3. El domingo celebramos la fiesta con Jesús.',
        '• 4. Queremos y obedecemos a papá y mamá.',
        '• 5. Cuidamos la vida de todas las personas.',
        '• 6 y 9. Cuidamos nuestro cuerpo, nuestro corazón y nuestros pensamientos.',
        '• 7. Respetamos las cosas de los demás.',
        '• 8. Decimos siempre la verdad.',
        '• 10. Nos alegramos con lo que tenemos, sin envidiar lo ajeno.',
      ],
    },
    {
      id: 'ma4',
      kind: 'piensa',
      title: 'VIVIMOS · Amar de verdad, cada día',
      paragraphs: [
        'Amar no es solo una palabra bonita: es hacer cosas buenas por los demás.',
        'Ayudar en casa sin que te lo pidan, compartir tus juegos, perdonar a un amigo… ¡eso es amar!',
        'Piensa: ¿qué gesto de amor puedes hacer hoy por alguien de tu familia?',
      ],
    },
    {
      id: 'ma5',
      kind: 'reza',
      title: 'ORAMOS · Enséñanos a amar',
      paragraphs: [
        'Jesús nos pide amar a Dios con todo el corazón y a los demás como a nosotros mismos.',
        'Pídele en silencio que te enseñe a amar de verdad, con gestos pequeños cada día.',
      ],
    },
  ],
  gameIds: ['quien-dijo-que', 'camino-decisiones'],
  quiz: {
    id: 'quiz-mandamiento-amor',
    title: '¿Qué has aprendido?',
    questions: [
      {
        id: 'qm1',
        question: '¿Cuál es el mandamiento más importante según Jesús?',
        options: [
          'Amar a Dios con todo el corazón y al prójimo como a uno mismo',
          'Ir siempre bien peinado a la iglesia',
          'Aprenderse de memoria todos los salmos',
        ],
        correctIndex: 0,
        hint: 'Todo lo que Dios nos pide cabe en una sola palabra.',
        explanation:
          'Jesús resume todo en amar: «Amarás al Señor tu Dios con todo tu corazón, y a tu prójimo como a ti mismo».',
      },
      {
        id: 'qm2',
        question: '¿Qué son los Diez Mandamientos?',
        options: [
          'Una lista de castigos para los que se portan mal',
          'Las señales de un camino que nos lleva a la felicidad',
          'Diez normas que solo valen para los adultos',
        ],
        correctIndex: 1,
        hint: 'Dios los dio a su pueblo para enseñarles a vivir felices.',
        explanation:
          'Los Diez Mandamientos no son castigos: son como las señales de un camino que nos lleva a la felicidad, leídos como formas de amar.',
      },
      {
        id: 'qm3',
        question: 'El cuarto mandamiento nos invita a…',
        options: [
          'Querer y obedecer a papá y mamá',
          'Comer toda la verdura del plato',
          'Hacer los deberes antes de jugar',
        ],
        correctIndex: 0,
        hint: 'Habla de las dos personas que más te quieren.',
        explanation:
          '«Honrarás a tu padre y a tu madre» significa quererlos, obedecerlos y cuidarlos, porque ellos nos cuidan cada día.',
      },
      {
        id: 'qm4',
        question: '¿Cuál de estos gestos es amar de verdad?',
        options: [
          'Compartir tus juegos con un amigo',
          'Esconder los lápices de tu compañero',
          'Decirle a tu hermano que no le quieres',
        ],
        correctIndex: 0,
        hint: 'Amar es hacer cosas buenas por los demás.',
        explanation:
          'Amar no es solo una palabra bonita: es hacer cosas buenas por los demás, como compartir, ayudar y perdonar.',
      },
    ],
  },
  prayer: {
    id: 'oracion-mandamiento-amor',
    title: 'Enséñame a amar',
    lines: [
      'Jesús, tú me enseñas a amar:',
      'a Dios con todo mi corazón',
      'y a los demás como a mí mismo.',
      'Dame un corazón generoso',
      'para ayudar, compartir y perdonar.',
      'Que hoy alguien sea feliz',
      'por un gesto mío de amor.',
      'Amén.',
    ],
  },
  family: {
    activityTitle: 'El mandamiento de la semana',
    activity:
      'Elegid en familia un mandamiento para vivirlo de forma especial esta semana (por ejemplo, el cuarto: sorprender a papá y mamá con una ayuda en casa). Cada noche, contad qué gesto de amor habéis hecho y celebradlo juntos.',
  },
  parentNotes: {
    oneMinute:
      'Jesús resume toda la ley en amar a Dios y al prójimo. Los Diez Mandamientos, leídos en positivo, son el camino concreto de ese amor: amar no es una idea, son gestos de cada día.',
    fiveMinutes: [
      'La formulación en positivo no es un adorno pedagógico: cambia la imagen de Dios que el niño se forma. Un Dios que «prohíbe» genera miedo; un Dios que «enseña el camino de la felicidad» genera confianza. Por eso la lección presenta cada mandamiento como una forma de amar.',
      'Los mandamientos sexto y noveno se tratan con delicadeza: «cuidamos nuestro cuerpo, nuestro corazón y nuestros pensamientos». A los nueve años no hace falta más detalle; lo importante es sembrar la idea de que el amor también cuida lo íntimo.',
      'El mandamiento del amor no se aprende de memoria: se entrena. La actividad familiar propone elegir un mandamiento por semana y vivirlo con gestos concretos, porque los niños aprenden a amar viendo amar a sus padres.',
      'Ojo con no convertir los mandamientos en un examen de conducta («¿has cumplido hoy?»). El tono debe ser de camino y de alegría: celebrad cada gesto de amor como una pequeña victoria, sin sermones.',
    ],
    familyQuestions: [
      '¿Qué gesto de amor has recibido hoy de alguien? ¿Cómo te ha hecho sentir?',
      '¿Cuál de los Diez Mandamientos te parece más fácil de vivir? ¿Y el más difícil?',
      '¿A quién de nuestra familia le vendría bien hoy un gesto de amor?',
    ],
    dailyExample:
      'Antes de dormir, repasad juntos un gesto de amor del día: «Hoy he amado cuando…». Nombrarlo en voz alta enseña al niño a reconocer el amor en lo cotidiano.',
    familyActivity:
      'Escribid en un papel grande el mandamiento elegido de la semana y pegadlo en la nevera. Cada gesto de amor que haga alguien de la familia se apunta con una estrellita. El domingo, contadlas y celebradlo.',
    familyPrayer: [
      'Jesús, que nos enseñas a amar,',
      'bendice a nuestra familia:',
      'que en nuestra casa se ayude,',
      'se comparta y se perdone.',
      'Haznos un hogar donde se ame de verdad.',
      'Amén.',
    ],
  },
};
