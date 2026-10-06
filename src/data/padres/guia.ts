/**
 * Guía de Primera Comunión para padres.
 * Contenido original, pastoral y práctico. Cada sección combina párrafos
 * cortos (3–6) y, cuando ayuda, viñetas.
 *
 * Importar desde: `src/data/padres/guia.ts`
 */

export interface GuideSection {
  id: string;
  title: string;
  /** Nombre del icono en lucide-react. */
  icon: string;
  paragraphs: string[];
  bullets: string[];
}

export const GUIDE_SECTIONS: GuideSection[] = [
  {
    id: 'sentido',
    title: 'El sentido de la Primera Comunión',
    icon: 'Wheat',
    paragraphs: [
      'La Primera Comunión no es una fiesta de paso ni un acto social: es el momento en que tu hijo recibe por primera vez a Jesús en la Eucaristía. A partir de ese día, podrá comulgar siempre que participe en la Misa.',
      'Para entenderlo, piensa en una comida familiar: no vamos a comer solo por el hambre, sino para estar juntos. En la Misa, Jesús nos invita a su mesa y se nos da como alimento. Comulgar es decirle "sí, quiero estar contigo".',
      'Por eso la Primera Comunión es un comienzo, no una meta. El día de la celebración abre una etapa: la de un niño que ya puede encontrarse con Jesús en cada Misa, domingo tras domingo.',
      'A tu hijo no se le pide que lo entienda todo, sino que lo desee. Tu papel no es explicarle teología, sino transmitirle que esto es importante para ti: si él percibe que a ti te importa, a él también le importará.',
    ],
    bullets: [],
  },
  {
    id: 'acompanar',
    title: 'Cómo acompañar a tu hijo: antes, durante y después',
    icon: 'Footprints',
    paragraphs: [
      'Antes: la preparación dura meses, y tú eres el catequista de casa. No hace falta dar lecciones: basta con hablar del tema de vez en cuando, rezar juntos y vivir con naturalidad lo que aprende en catequesis.',
      'Durante: en los días previos a la celebración, baja el ritmo. Evita los nervios de última hora (traje, fotos, invitados) y reserva un momento tranquilo con tu hijo: un paseo, una conversación sobre lo que va a vivir, una oración juntos la víspera.',
      'Después: el domingo siguiente, volved a Misa como si fuera lo más normal del mundo, porque lo es. Si la Primera Comunión se convierte en "la última", el mensaje que recibe el niño es que era solo una fiesta.',
      'A lo largo de todo el camino, tu testimonio pesa más que tus palabras. Un padre o una madre que reza, que pide perdón, que va a Misa con alegría, enseña sin darse cuenta.',
    ],
    bullets: [
      'Pregunta cada semana qué han hecho en catequesis, con curiosidad de verdad.',
      'Reza con él: aunque sea un minuto al día, la constancia crea el hábito.',
      'Id a Misa juntos también fuera de las celebraciones "obligatorias".',
      'Habla de Jesús con naturalidad, como se habla de alguien a quien se quiere.',
    ],
  },
  {
    id: 'reconciliacion',
    title: 'La Primera Reconciliación: preparar sin meter miedo',
    icon: 'HeartHandshake',
    paragraphs: [
      'Antes de la Primera Comunión, tu hijo celebrará su primera confesión. Es normal que sienta vergüenza o nervios: también los sentimos los adultos. Tu misión es que llegue tranquilo, no asustado.',
      'Cuéntale la verdad sencilla: confesarse es contarle a Jesús, a través del sacerdote, las cosas que hemos hecho mal, y recibir su perdón. Es como pedir perdón a un amigo: cuesta un poco, pero después te sientes en paz.',
      'Evita el lenguaje del miedo: nada de "Dios se va a enfadar", "tienes que contarlo todo" dicho como amenaza, ni interrogarle después sobre lo que dijo. La confesión es un secreto entre él y Dios.',
      'Practica en casa con un examen de conciencia amable: "¿A quién he ayudado esta semana? ¿A quién he hecho daño sin querer o queriendo? ¿Qué quiero mejorar?". Si él te ve a ti confesarte con naturalidad, perderá el miedo.',
      'Y recuérdale lo esencial: el sacerdote no está para reñirle, sino para ayudarle; y Dios no deja de quererle nunca, haga lo que haga. Esa certeza es el mejor antídoto contra el miedo.',
    ],
    bullets: [],
  },
  {
    id: 'misa-familia',
    title: 'Participar en la Misa en familia',
    icon: 'Church',
    paragraphs: [
      'La Misa dominical es el corazón de la vida cristiana, y también el mejor "aula" de catequesis: allí tu hijo ve, escucha y vive lo que aprende. Ir en familia, con regularidad, es la preparación más eficaz.',
      'Llegad con un poco de antelación, sin prisas. Unos minutos de silencio antes de empezar ayudan a "aterrizar" y enseñan que aquello que va a pasar merece calma.',
      'Durante la celebración, ayúdale a seguirla: señálale el momento de la consagración, cantad juntos, responded a las aclamaciones. No pasa nada si se distrae; lo importante es estar allí, juntos.',
      'Después, comentad algo breve: qué os ha gustado, qué habéis escuchado en el Evangelio, por quién habéis rezado. Dos minutos de conversación convierten la Misa en algo compartido.',
      'Si tu hijo aún no ha hecho la Primera Comunión, explícale que de momento recibe una bendición o se queda en el banco contigo, y que pronto podrá comulgar. Que lo viva como una espera ilusionada, no como un castigo.',
    ],
    bullets: [],
  },
  {
    id: 'espiritual-casa',
    title: 'Preparación espiritual en casa',
    icon: 'Flame',
    paragraphs: [
      'La catequesis parroquial es imprescindible, pero la fe se cocina en casa. No necesitas ser teólogo: necesitas ser testigo. Tu hijo creerá lo que vea creer en ti.',
      'Crea pequeños rituales que se repitan: la señal de la cruz al salir de casa, una oración breve antes de cenar, dar gracias por algo bueno antes de dormir. Lo repetido se vuelve hábito, y el hábito sostiene la fe.',
      'Habla de Dios con naturalidad en la vida diaria: "Mira qué bonito el cielo, gracias a Dios", "Vamos a rezar por el abuelo que está enfermo". Dios no vive solo en la iglesia de los domingos.',
      'Ten a mano lo esencial: una Biblia adaptada a niños, algún libro de oraciones sencillo, y esta misma app para repasar juntos lo que aprende. No hace falta una biblioteca: hace falta usar lo que hay.',
      'Y no olvides tu propia vida espiritual: si tú rezas, si tú te confiesas, si tú vives la fe con alegría, tu hijo recibirá la mejor preparación posible sin que tengas que decir una palabra.',
    ],
    bullets: [],
  },
  {
    id: 'dia-celebracion',
    title: 'El día de la celebración',
    icon: 'Sparkles',
    paragraphs: [
      'La víspera, procura que sea un día tranquilo: evita el ajetreo de última hora y reserva un rato a solas con tu hijo. Una conversación sencilla ("¿cómo te sientes?", "¿sabes lo que va a pasar mañana?") y una oración juntos valen más que mil preparativos.',
      'El día de la celebración, llegad con tiempo y ayúdale a estar sereno: que sepa dónde se sienta, cuándo se levanta, qué va a decir. Los niños se ponen nerviosos ante lo desconocido; la información calma.',
      'Durante la Misa, vive tú también la celebración: canta, reza, comulga si puedes. Tu hijo te mirará más de una vez; que lo que vea en tu cara le confirme que esto es lo más importante del día.',
      'Después de comulgar, deja un momento de silencio y acción de gracias antes de las fotos. Una frase susurrada ("¿le has dado las gracias a Jesús?") orienta su corazón mejor que cualquier discurso.',
      'Celebrad después en familia con alegría: la fiesta también es buena y necesaria. Solo recuerda el orden: primero el encuentro con Jesús, después la fiesta por ese encuentro.',
    ],
    bullets: [],
  },
  {
    id: 'fiesta-no-tape',
    title: 'Que la fiesta no tape lo importante',
    icon: 'Gift',
    paragraphs: [
      'Digámoslo claro: es fácil que los regalos, el traje o el banquete acaben siendo lo protagonista del día, y que Jesús quede en un segundo plano. No pasa por mala intención: pasa porque lo exterior es lo que más se ve y lo que más se comenta.',
      'Los regalos no son malos: son una forma de celebrar y de querer. El problema empieza cuando el niño espera la Primera Comunión por los regalos, o cuando la conversación familiar de esos meses gira solo en torno a la ropa y el restaurante.',
      'Un criterio sencillo: que lo más comentado en casa sea el encuentro con Jesús, no el menú. Habla con tu hijo de lo que va a vivir más veces de las que hablas de lo que va a llevar puesto.',
      'Cuida también las comparaciones: "el traje de fulanito", "el banquete de menganita". Cada familia celebra según sus posibilidades, y ninguna celebración es "mejor" por ser más cara. Enséñale que la alegría no se compra.',
      'El mejor regalo que puedes hacerle ese día no se envuelve: es tu presencia atenta, tu emoción sincera y tu compromiso de seguir acompañándole cada domingo. Eso es lo que recordará dentro de veinte años.',
      'Y una idea práctica: dedica un momento de la fiesta a dar gracias juntos, en voz alta, por lo vivido en la Misa. Así la celebración familiar nace de la celebración eucarística, y no al revés.',
    ],
    bullets: [],
  },
];
