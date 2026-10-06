/**
 * Preguntas frecuentes de la zona de padres.
 * Respuestas pastorales y prácticas, de 4 a 8 líneas cada una.
 *
 * Importar desde: `src/data/padres/faq.ts`
 */

export interface FaqItem {
  id: string;
  question: string;
  /** Párrafos cortos de la respuesta, en orden. */
  answer: string[];
}

export const FAQ: FaqItem[] = [
  {
    id: 'aburrimiento-misa',
    question: 'Mi hijo se aburre en Misa. ¿Qué puedo hacer?',
    answer: [
      'Es normal: a los 9 años una hora de Misa es un reto. Lo primero es no culpabilizarle ni culparte; el aburrimiento no es pecado ni falta de fe.',
      'Siéntate con él donde vea bien y dale pequeñas "misiones": escuchar una palabra del Evangelio para contarla luego, observar el momento de la consagración, buscar la señal de la cruz al principio y al final.',
      'Evita premiarlo con el móvil en plena Misa: le enseña que "lo importante" está en la pantalla. En cambio, tras la Misa cuéntale qué parte te gustó a ti y pregúntale qué le llamó la atención.',
      'La clave eres tú: si él ve que participas, cantas y comulgas con recogimiento, aprende más que con cien explicaciones. La Misa se "contagia" antes de entenderse.',
      'Si algún domingo es especialmente duro, no pasa nada: habla con tu catequista o párroco. Muchos preparan celebraciones con niños donde se sienten más parte.',
    ],
  },
  {
    id: 'presencia-real',
    question: '¿Cómo le explico la presencia real de Jesús en la Eucaristía?',
    answer: [
      'No empieces por la palabra "transubstanciación": los niños la aprenden por el corazón antes que por el diccionario. Parte de lo que ya creen: Jesús está vivo, y las personas que se quieren quieren estar juntas.',
      'Puedes decirle algo así: "Cuando el sacerdote repite las palabras de Jesús en la Última Cena, el pan y el vino siguen pareciendo pan y vino, pero Jesús se hace presente de verdad para entrar en nosotros. Es como un abrazo que se puede comer".',
      'Ayudan los gestos: enseñarle a mirar al sacerdote en la elevación, a poner las manos en el pecho en silencio antes de comulgar, a dar gracias después. Los gestos graban lo que las palabras aún no alcanzan.',
      'Y evita la trampa de convertirlo en un examen: no necesita "defender" el dogma. Basta con que sepa que en la comunión se encuentra con Jesús, que le quiere y le espera.',
      'Si tienes dudas tú mismo, dilo sin miedo ("también a mí me cuesta entenderlo") y buscad juntos la respuesta en la catequesis o con el catequista. La fe se comparte, también la fe que duda.',
    ],
  },
  {
    id: 'confesion-sin-miedo',
    question: '¿Cómo preparo a mi hijo para confesarse sin meterle miedo?',
    answer: [
      'La primera confesión debe saber a abrazo, no a juicio. Evita expresiones como "díselo todo al cura" o "si no te confiesas, Dios se enfada": presentan a Dios como un policía, justo lo contrario de la parábola del hijo pródigo.',
      'Explícaselo con una imagen cercana: "Es como cuando te peleas con un amigo y le pides perdón: al principio da vergüenza, pero después os sentís mejor. Pues con Dios es igual, solo que Él siempre perdona y siempre nos espera".',
      'Practica en casa el examen de conciencia en positivo: "¿A quién he ayudado? ¿A quién he hecho daño? ¿Qué puedo mejorar?". Y recuérdale que el sacerdote está allí para ayudarle, no para reñirle.',
      'No le pidas que te cuente lo que confesó: es su secreto con Dios. Lo que sí puedes compartir es cómo te sientes tú cuando te confiesas, para que vea que los adultos también lo necesitamos.',
      'Si tiene miedo, pregúntale qué le asusta exactamente. A veces basta con acompañarle hasta la puerta del confesionario la primera vez y esperarle fuera.',
    ],
  },
  {
    id: 'oraciones-no-sabe',
    question: '¿Qué pasa si todavía no sabe todas las oraciones?',
    answer: [
      'Que no cunda el pánico: saber oraciones de memoria es una ayuda, no el objetivo. Lo importante es que sepa hablar con Dios con sus propias palabras.',
      'El Padrenuestro es la prioridad, porque nos lo enseñó Jesús. Después, el Avemaría y el Gloria. No hace falta memorizarlas todas de golpe ni recitarlas perfectas.',
      'En casa, reza con él cada noche en voz alta y deja que él complete frases: "Padre nuestro, que estás en el cielo…". Repetir juntos, sin presión, es más eficaz que un examen.',
      'Comenta con el catequista qué oraciones se esperan y en qué momento: así sabéis los dos en qué apoyar. Y recuerda que también los adultos olvidamos fórmulas; lo que cuenta es rezar, no recitar.',
    ],
  },
  {
    id: 'empezar-a-rezar',
    question: 'En casa casi nunca rezamos. ¿Cómo empezamos?',
    answer: [
      'Empieza pequeño y empieza hoy: dos minutos cuentan. La oración familiar no necesita solemnidad, necesita constancia. Un minuto diario durante un mes vale más que una hora solemne una vez al año.',
      'Busca un ancla que ya exista: antes de cenar, al acostar al niño, al salir de casa. En ese momento, una señal de la cruz despacio, una frase de agradecimiento ("gracias por este día") y una petición ("cuida a la abuela").',
      'Deja que los niños dirijan a veces: ellos rezan con una naturalidad que a los adultos se nos olvida. Si se ríen o se distraen, ríete con ellos y sigue: la oración en familia también se aprende equivocándose.',
      'No compares tu casa con otras familias ni intentes copiar un modelo perfecto. Dios no pide una liturgia impecable; pide que le dejéis entrar en vuestra vida tal como es.',
      'Si te cuesta, dilo en voz alta: "A mí también me da vergüenza, pero lo intentamos juntos". Tu honestidad le enseña más que una oración perfecta.',
    ],
  },
  {
    id: 'despues-catequesis',
    question: '¿Qué podemos hacer juntos después de la catequesis?',
    answer: [
      'Pregunta primero y sermonea después. "¿Qué habéis hecho hoy?" funciona mejor que "¿Qué has aprendido?": la primera pregunta invita a contar, la segunda suena a examen.',
      'Busca un puente con la vida de la semana: si hablaron del perdón, recordad juntos a alguien a quien pedir perdón; si hablaron de la Misa, buscad un momento para ir el domingo.',
      'Esta app te ayuda: cada lección incluye el apartado "Hablemos en casa" con preguntas, un ejemplo cotidiano, una actividad y una oración breve. Elegid una cosa, solo una, y vividla esa semana.',
      'Lo más importante: que vea que la catequesis no es una extraescolar más. Si preguntas con interés genuino cada semana, le dices sin palabras que lo que aprende allí importa en casa.',
    ],
  },
  {
    id: 'ayuno-eucaristico',
    question: '¿Qué es el ayuno eucarístico? ¿Cómo se lo explico a un niño?',
    answer: [
      'Es muy sencillo: la Iglesia pide no comer ni beber nada (salvo agua y medicinas) durante una hora antes de comulgar. Es una forma de preparar el cuerpo, igual que preparamos el corazón.',
      'A un niño se lo puedes explicar así: "Cuando viene un invitado muy importante a casa, ponemos la mesa y no picamos antes, ¿verdad? Pues comulgar es recibir a Jesús, así que dejamos el estómago «en ayunas» para darle el mejor sitio".',
      'En la práctica: si la Misa es a las 12, que el último bocado sea antes de las 11. Planifícalo sin dramatismo: un desayuno un poco antes resuelve el día.',
      'No lo presentes como una prueba ni como un castigo: es un gesto de cariño. Y si un día se os olvida, no pasa nada grave; coméntadlo con el catequista o el párroco con naturalidad.',
    ],
  },
  {
    id: 'comulgar-en-pecado',
    question: 'Mi hijo pregunta qué pasa si comulga "en pecado". ¿Qué le digo?',
    answer: [
      'Primero, tranquilízale: Dios no es un francotirador esperando que se equivoque. La comunión es un encuentro de amor, y el miedo no es la puerta de entrada.',
      'Explícale la lógica sencilla que enseña la Iglesia: comulgar es recibir a un amigo muy querido; si nos hemos peleado con Él de verdad (algo grave, hecho a propósito), lo honesto es pedirle perdón antes, en la confesión.',
      'Con niños de 9 años, casi siempre basta con esta regla práctica: "Si te pesa algo en el corazón, cuéntaselo primero a Jesús en la confesión y luego comulga contento". Sin listas de pecados mortales ni terrores.',
      'Si la pregunta viene de un caso concreto (se peleó con su hermano, mintió…), ayúdale a pedir perdón a quien corresponda y a rezar. Eso es ya una pequeña reconciliación, y le prepara para entender el sacramento.',
      'Ante dudas serias, habla con tu párroco o catequista: ellos conocen a tu hijo y te darán un criterio ajustado a su edad.',
    ],
  },
  {
    id: 'necesidades-especiales',
    question: 'Mi hijo tiene necesidades especiales. ¿Puede recibir la Primera Comunión?',
    answer: [
      'Sí, en principio sí. La Iglesia enseña que los niños con discapacidad intelectual o del desarrollo pueden recibir la Eucaristía si distinguen, a su manera, que reciben a Jesús: no se les exige el mismo nivel de comprensión que a otros niños, sino una fe proporcionada a su capacidad.',
      'Habla cuanto antes con tu párroco y con el catequista: ellos adaptarán la preparación al ritmo y a las necesidades de tu hijo, y te dirán qué pasos seguir en tu diócesis.',
      'En casa, apuesta por lo concreto y repetido: los mismos gestos, las mismas oraciones cortas, ir a Misa con regularidad para que el lugar le resulte familiar. La rutina es una gran catequista.',
      'No compares su camino con el de otros niños ni te angusties por los plazos: cada niño llega a Jesús por su propio camino, y la Iglesia lo sabe.',
      'Y un consejo de corazón: que nadie te haga sentir que tu hijo es un problema para la catequesis. Si alguna vez lo sientes, habla con el párroco; la comunidad está para acoger, no para filtrar.',
    ],
  },
  {
    id: 'padrinos',
    question: '¿Qué papel tienen los padrinos? En nuestra familia casi no tenemos trato con ellos.',
    answer: [
      'Los padrinos no son un adorno del Bautismo: son las personas que prometieron ayudaros a educar a vuestro hijo en la fe. Su papel es acompañar, rezar por él y ser un referente cristiano cercano.',
      'Si la relación se ha enfriado, la preparación de la Primera Comunión es un buen momento para retomarla: una llamada, contarle al niño quiénes son, invitarles a la celebración. A veces basta un gesto para reavivar el vínculo.',
      'Cuéntale a tu hijo cosas concretas de ellos: cómo se llaman, qué hacen, alguna anécdota del día del Bautismo. Para un niño, un padrino "real" es mucho más que un nombre en un papel.',
      'Si la distancia es insalvable, no te culpes: busca otras figuras de referencia (abuelos, tíos, el catequista) que le muestren la fe vivida. Dios se las apaña con los acompañantes que haya.',
      'Para el futuro, elige padrinos por su fe y su cercanía, no por compromiso familiar: es un regalo que le haces a tu hijo para toda la vida.',
    ],
  },
];
