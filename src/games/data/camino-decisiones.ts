/**
 * Datos de ejemplo — «El camino de las decisiones».
 * Enfoque amable: amar y pedir perdón. Sin tremendismo.
 * Cada situación tiene 3 opciones y exactamente una `isBest`.
 */
import type { CaminoDecisionesConfig } from '../engines/camino-decisiones';

export const CAMINO_DECISIONES_DATA: Required<CaminoDecisionesConfig> = {
  situations: [
    {
      id: 'jarron',
      text: 'He roto un jarrón en casa y nadie me ha visto.',
      options: [
        {
          label: 'Lo escondo y no digo nada.',
          feedback:
            'Sería lo más fácil, pero la mentira pesa en el corazón. ¿Qué te daría más paz?',
          isBest: false,
        },
        {
          label: 'Lo cuento y pido perdón.',
          feedback:
            '¡Qué valiente! Decir la verdad nos deja el corazón en paz y nos ayuda a crecer.',
          isBest: true,
        },
        {
          label: 'Echo la culpa a mi hermano.',
          feedback:
            'Culpar a otro no es justo y hace daño. ¿Qué haría Jesús en tu lugar?',
          isBest: false,
        },
      ],
    },
    {
      id: 'recreo',
      text: 'En el recreo hay un compañero que siempre está solo.',
      options: [
        {
          label: 'Me acerco y le invito a jugar.',
          feedback:
            '¡Qué bonito! Jesús se acercaba a los que estaban solos. Seguro que le alegras el día.',
          isBest: true,
        },
        {
          label: 'Paso de largo, no es mi problema.',
          feedback:
            'A veces da un poco de vergüenza acercarse, pero un pequeño gesto puede cambiarle el día. ¿Lo intentas?',
          isBest: false,
        },
        {
          label: 'Me río de él con otros.',
          feedback:
            'Reírse de alguien duele mucho. Jesús nos pide cuidar a los demás. ¿Qué podrías hacer en su lugar?',
          isBest: false,
        },
      ],
    },
    {
      id: 'hermano',
      text: 'Me he enfadado con mi hermano y le he gritado.',
      options: [
        {
          label: 'Me encierro en mi cuarto sin hablarle.',
          feedback:
            'Estar enfadado cansa el corazón. Hablar y perdonar nos hace sentir mejor. ¿Lo intentas?',
          isBest: false,
        },
        {
          label: 'Le grito más fuerte.',
          feedback:
            'Gritar más solo hace más daño. Respira hondo: ¿qué te ayudaría a hacer las paces?',
          isBest: false,
        },
        {
          label: 'Le pido perdón y hacemos las paces.',
          feedback:
            'Pedir perdón cuesta, pero devuelve la alegría a casa. ¡Muy bien!',
          isBest: true,
        },
      ],
    },
    {
      id: 'cartera',
      text: 'Encuentro una cartera con dinero en el patio del cole.',
      options: [
        {
          label: 'Me quedo el dinero.',
          feedback:
            'Ese dinero tiene dueño y seguro que lo está buscando. ¿Qué haría Jesús? Piénsalo otra vez.',
          isBest: false,
        },
        {
          label: 'La llevo a un profesor para encontrar a su dueño.',
          feedback:
            '¡Qué honrado! Devolver lo que no es nuestro es una forma de cuidar a los demás.',
          isBest: true,
        },
        {
          label: 'La escondo para que nadie la encuentre.',
          feedback:
            'Esconderla no ayuda a su dueño. Hay una opción mejor: ¿cuál será?',
          isBest: false,
        },
      ],
    },
    {
      id: 'examen',
      text: 'Un amigo me pide que le deje copiar en el examen.',
      options: [
        {
          label: 'Le digo que no con cariño y le ayudo a estudiar después.',
          feedback:
            '¡Buena decisión! Ayudar de verdad es mucho mejor que copiar.',
          isBest: true,
        },
        {
          label: 'Le dejo copiar para no perder su amistad.',
          feedback:
            'Un buen amigo no nos pide hacer trampas. ¿Cómo podrías ayudarle de verdad?',
          isBest: false,
        },
        {
          label: 'Le digo que no y dejo de hablarle.',
          feedback:
            'Decir que no está bien, pero sin dejar de ser su amigo. ¿Hay una forma más cariñosa?',
          isBest: false,
        },
      ],
    },
  ],
};
