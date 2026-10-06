/**
 * Lección 13 — La Misa paso a paso (núcleo n9)
 * ----------------------------------------------------------------------------
 * Contenido original en español, para niños de 9 años.
 */
import type { Lesson } from '../model';

export const lessonMisaPasoAPaso: Lesson = {
  id: 'l-misa-paso-a-paso',
  slug: 'misa-paso-a-paso',
  title: 'La Misa paso a paso',
  subtitle: 'Un recorrido por la gran fiesta de los domingos',
  nucleusId: 'n9',
  estimatedMinutes: 11,
  objectives: [
    'Conocer las partes de la Misa: ritos iniciales, Liturgia de la Palabra, Liturgia eucarística, rito de la Comunión y despedida.',
    'Reconocer el altar, el ambón y el sagrario y saber qué significan.',
    'Vivir la Misa con más atención, sabiendo qué pasa en cada momento.',
  ],
  blocks: [
    {
      id: 'ms1',
      kind: 'descubre',
      title: 'CREEMOS · La fiesta de cada domingo',
      paragraphs: [
        'La Misa es la gran fiesta semanal de la familia de Jesús: nos reunimos para escucharle y para recibirle.',
        'Cada Misa es como una cena de amigos donde Jesús es el anfitrión y nos invita a su mesa.',
        'Vamos a recorrerla paso a paso, para que la vivas con los ojos bien abiertos.',
      ],
      imageLabel: 'El interior de una iglesia',
    },
    {
      id: 'ms2',
      kind: 'escucha',
      title: 'CELEBRAMOS · Ritos iniciales: nos reunimos',
      paragraphs: [
        '• ENTRADA: entramos en la iglesia, nos persignamos con agua bendita y cantamos juntos.',
        '• SALUDO: el sacerdote nos saluda en el nombre del Padre, del Hijo y del Espíritu Santo.',
        '• PERDÓN: pedimos perdón a Dios por nuestras faltas, para empezar con el corazón limpio.',
        '• GLORIA: cantamos una canción de alegría a Dios (en Cuaresma y Adviento no se canta, para esperarla con más ganas).',
      ],
    },
    {
      id: 'ms3',
      kind: 'descubre',
      title: 'CELEBRAMOS · Liturgia de la Palabra: Dios nos habla',
      paragraphs: [
        '• LECTURAS: escuchamos la Palabra de Dios desde el AMBÓN, que es como el atril de la iglesia.',
        '• SALMO: respondemos cantando, como un diálogo con Dios.',
        '• EVANGELIO: escuchamos de pie las palabras de Jesús, lo más importante de esta parte.',
        '• HOMILÍA: el sacerdote nos explica la Palabra con palabras sencillas.',
        '• CREDO: decimos juntos lo que creemos.',
        '• ORACIÓN DE LOS FIELES: pedimos a Dios por la Iglesia, por el mundo y por nuestras necesidades.',
      ],
    },
    {
      id: 'ms4',
      kind: 'descubre',
      title: 'CELEBRAMOS · Liturgia eucarística: el gran regalo',
      paragraphs: [
        '• OFERTORIO: llevamos al ALTAR el pan y el vino, y también nuestra vida y nuestras ofrendas.',
        '• CONSAGRACIÓN: el sacerdote repite las palabras de Jesús en la Última Cena, y el pan y el vino se convierten en su Cuerpo y su Sangre.',
        '• El altar es la mesa del banquete: allí Jesús se entrega por nosotros.',
        '• Rezamos el Padrenuestro y nos damos la paz, como hermanos de una misma familia.',
      ],
    },
    {
      id: 'ms5',
      kind: 'piensa',
      title: 'CELEBRAMOS Y VIVIMOS · Comunión y despedida',
      paragraphs: [
        '• COMUNIÓN: recibimos a Jesús con el corazón preparado. Pregunta a tu catequista cómo se hace en tu parroquia: en cada lugar puede haber costumbres distintas.',
        '• ACCIÓN DE GRACIAS: después de comulgar, hablamos con Jesús en silencio y le damos gracias.',
        '• DESPEDIDA: el sacerdote nos bendice y nos envía: «Podéis ir en paz». La Misa termina, ¡pero la misión empieza!',
        '• EL SAGRARIO: es la capillita donde se guarda a Jesús después de la Misa. La lucecita roja nos dice: «Jesús está aquí».',
      ],
    },
    {
      id: 'ms6',
      kind: 'reza',
      title: 'ORAMOS · Gracias por invitarme',
      paragraphs: [
        'La Misa es una invitación de Jesús: Él te espera cada domingo en su mesa.',
        'Dale gracias en silencio por invitarte a su fiesta y pídele que te ayude a vivir cada Misa con atención y alegría.',
      ],
    },
  ],
  gameIds: ['ordena-misa', 'descubre-iglesia'],
  quiz: {
    id: 'quiz-misa-paso-a-paso',
    title: '¿Qué has aprendido?',
    questions: [
      {
        id: 'qmi1',
        question: '¿Cuáles son las grandes partes de la Misa?',
        options: [
          'Ritos iniciales, Liturgia de la Palabra, Liturgia eucarística, Comunión y despedida',
          'Entrada, sermón largo, colecta y salida corriendo',
          'Cantos, anuncios, fotos y merienda',
        ],
        correctIndex: 0,
        hint: 'Son cinco momentos: empieza reuniéndonos y termina enviándonos.',
        explanation:
          'La Misa tiene ritos iniciales, Liturgia de la Palabra, Liturgia eucarística, rito de la Comunión y despedida.',
      },
      {
        id: 'qmi2',
        question: '¿Qué es el ambón?',
        options: [
          'El atril desde donde se proclama la Palabra de Dios',
          'La campana más grande de la torre',
          'El armario donde se guardan las velas',
        ],
        correctIndex: 0,
        hint: 'Desde allí se leen las lecturas y el Evangelio.',
        explanation:
          'El ambón es como el atril de la iglesia: desde él se proclama la Palabra de Dios en la Liturgia de la Palabra.',
      },
      {
        id: 'qmi3',
        question: '¿Qué ocurre en la consagración?',
        options: [
          'El pan y el vino se convierten en el Cuerpo y la Sangre de Jesús',
          'Se apagan todas las luces de la iglesia',
          'Todo el mundo sale a tomar el aire',
        ],
        correctIndex: 0,
        hint: 'El sacerdote repite las palabras de Jesús en la Última Cena.',
        explanation:
          'En la consagración, por las palabras de Jesús que repite el sacerdote, el pan y el vino se convierten en su Cuerpo y su Sangre.',
      },
      {
        id: 'qmi4',
        question: '¿Qué es el sagrario?',
        options: [
          'La capillita donde se guarda a Jesús después de la Misa',
          'El libro más antiguo de la parroquia',
          'La silla especial del sacerdote',
        ],
        correctIndex: 0,
        hint: 'La lucecita roja nos dice que Jesús está allí.',
        explanation:
          'El sagrario es donde se reserva a Jesús después de la Misa; la lucecita roja nos recuerda su presencia.',
      },
      {
        id: 'qmi5',
        question: '¿Con qué palabras nos envía el sacerdote al final de la Misa?',
        options: [
          '«Podéis ir en paz»',
          '«Nos vemos el año que viene»',
          '«Salid en silencio y deprisa»',
        ],
        correctIndex: 0,
        hint: 'La Misa termina, pero la misión empieza.',
        explanation:
          'La despedida nos envía con la bendición: «Podéis ir en paz». La Misa termina, pero nuestra misión de amar empieza.',
      },
    ],
  },
  prayer: {
    id: 'oracion-misa',
    title: 'Gracias por tu fiesta',
    lines: [
      'Jesús, gracias por invitarme',
      'cada domingo a tu fiesta.',
      'Ayúdame a escucharte con atención,',
      'a cantar con alegría',
      'y a llevar tu paz',
      'a todos los que me encuentre.',
      'Amén.',
    ],
  },
  family: {
    activityTitle: 'Exploradores de la Misa',
    activity:
      'Id juntos a Misa el domingo con «misión de exploradores»: cada uno se fija en un detalle (el ambón, el altar, el sagrario, la lucecita roja). Al salir, compartid lo que habéis descubierto y preguntad al sacerdote o al catequista lo que no entendáis.',
  },
  parentNotes: {
    oneMinute:
      'La Misa es la fiesta semanal donde Jesús nos habla (Liturgia de la Palabra) y se nos entrega (Liturgia eucarística). Conocer sus partes —ritos iniciales, Palabra, Eucaristía, Comunión y despedida— ayuda al niño a vivirla con atención.',
    fiveMinutes: [
      'Esta lección es un mapa, no un manual de rúbricas. El objetivo es que el niño reconozca qué está pasando en cada momento de la Misa, no que memorice términos litúrgicos. Si al salir de Misa sabe decir «ahora viene la consagración», la lección ha funcionado.',
      'El altar, el ambón y el sagrario son los tres «muebles» que el niño debe saber localizar en su parroquia. Una visita tranquila a la iglesia vacía, tocando y mirando de cerca, vale más que diez explicaciones.',
      'Hay costumbres que varían entre parroquias (cómo se recibe la comunión, el gesto de la paz, las posturas). La lección remite expresamente al catequista en esos puntos: no deis por sentado que «en todas partes se hace como aquí».',
      'La despedida —«Podéis ir en paz»— es una oportunidad preciosa para conectar Misa y vida: la Misa no termina en la puerta de la iglesia, sino que nos envía a amar durante la semana. Preguntad el domingo al mediodía: «¿a quién vas a llevar hoy la paz de Jesús?».',
    ],
    familyQuestions: [
      '¿Qué parte de la Misa te gusta más? ¿Por qué?',
      '¿Qué crees que siente Jesús cuando nos ve llegar a su fiesta del domingo?',
      '¿A quién podrías invitar alguna vez a venir a Misa contigo?',
    ],
    dailyExample:
      'Al pasar delante de una iglesia, haced juntos la señal de la cruz o un pequeño saludo a Jesús del sagrario: «Hola, Jesús». Es un gesto mínimo que mantiene viva la presencia eucarística entre domingo y domingo.',
    familyActivity:
      'Dibujad juntos un «mapa de la Misa» en una cartulina: cinco casillas con las partes y un dibujo en cada una. Llevadlo algún domingo (discretamente) y marcad en qué parte estáis. Los niños adoran seguir el recorrido.',
    familyPrayer: [
      'Jesús, gracias por la Misa del domingo,',
      'tu fiesta con nosotros.',
      'Ayúdanos a escucharte, a recibirte',
      'y a llevar tu alegría a los demás.',
      'Amén.',
    ],
  },
};
