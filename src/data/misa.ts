/**
 * La Misa paso a paso — Camino a la Primera Comunión
 * ----------------------------------------------------------------------------
 * Módulo estrella del área de niños: el recorrido de la Misa en ~24 momentos,
 * cada uno con qué pasa, dónde mirar y qué hace el niño.
 *
 * Donde una costumbre pueda variar por parroquia, el momento lleva
 * `preguntaCatequista: true` y la pantalla muestra la nota
 * "Pregunta a tu catequista cómo se hace en tu parroquia."
 *
 * ENSAYO_IDS: 8 momentos clave para el Modo Ensayo (ordenarlos).
 */

export type LugarMisa = 'altar' | 'ambon' | 'sagrario' | 'bancos';

export interface MomentoMisa {
  id: string;
  /** Nº de orden en la Misa. */
  orden: number;
  titulo: string;
  quePasa: string;
  dondeMirar: LugarMisa;
  /** Qué hace el niño en ese momento. */
  gesto: string;
  /** La costumbre puede variar por parroquia. */
  preguntaCatequista?: boolean;
}

export const LUGARES_MISA: Record<
  LugarMisa,
  { titulo: string; descripcion: string }
> = {
  altar: { titulo: 'Altar', descripcion: 'La mesa de Jesús' },
  ambon: { titulo: 'Ambón', descripcion: 'Donde se lee la Palabra' },
  sagrario: { titulo: 'Sagrario', descripcion: 'La casita de Jesús' },
  bancos: { titulo: 'Bancos', descripcion: 'Tu sitio con la familia' },
};

export const MISA_MOMENTOS: MomentoMisa[] = [
  {
    id: 'entrada',
    orden: 1,
    titulo: 'Entrada',
    quePasa: 'El sacerdote entra con los monaguillos mientras todos cantamos el canto de entrada.',
    dondeMirar: 'altar',
    gesto: 'Ponte de pie y canta con alegría.',
  },
  {
    id: 'senal-cruz',
    orden: 2,
    titulo: 'Señal de la cruz',
    quePasa: 'El sacerdote nos saluda y nos persignamos: «En el nombre del Padre y del Hijo y del Espíritu Santo».',
    dondeMirar: 'altar',
    gesto: 'Persígnate despacio y con respeto.',
  },
  {
    id: 'acto-penitencial',
    orden: 3,
    titulo: 'Acto penitencial',
    quePasa: 'Pedimos perdón a Dios por las veces que no hemos amado. «Yo confieso…».',
    dondeMirar: 'altar',
    gesto: 'Piensa en silencio: ¿a quién quiero pedir perdón?',
  },
  {
    id: 'gloria',
    orden: 4,
    titulo: 'Gloria',
    quePasa: 'Cantamos el himno de alabanza: «Gloria a Dios en el cielo». (En Cuaresma y Adviento no se canta.)',
    dondeMirar: 'altar',
    gesto: 'Canta fuerte: ¡es una fiesta de alabanza!',
  },
  {
    id: 'oracion-colecta',
    orden: 5,
    titulo: 'Oración colecta',
    quePasa: 'El sacerdote recoge en una oración todo lo que le queremos decir a Dios.',
    dondeMirar: 'altar',
    gesto: 'Escucha en silencio y responde «Amén».',
  },
  {
    id: 'primera-lectura',
    orden: 6,
    titulo: 'Primera lectura',
    quePasa: 'Desde el ambón se lee un texto de la Biblia, normalmente del Antiguo Testamento.',
    dondeMirar: 'ambon',
    gesto: 'Siéntate, escucha y mira al lector.',
  },
  {
    id: 'salmo',
    orden: 7,
    titulo: 'Salmo',
    quePasa: 'Respondemos a la lectura cantando o recitando el salmo: es una oración con música.',
    dondeMirar: 'ambon',
    gesto: 'Repite el estribillo con todos.',
  },
  {
    id: 'segunda-lectura',
    orden: 8,
    titulo: 'Segunda lectura',
    quePasa: 'Los domingos y fiestas hay otra lectura, de las cartas de los apóstoles.',
    dondeMirar: 'ambon',
    gesto: 'Sigue escuchando con atención.',
  },
  {
    id: 'evangelio',
    orden: 9,
    titulo: 'Evangelio',
    quePasa: '¡Lo más importante de la Palabra! El sacerdote lee lo que hizo y dijo Jesús. Nos ponemos de pie.',
    dondeMirar: 'ambon',
    gesto: 'Ponte de pie y haz la crucecita en la frente, la boca y el pecho.',
  },
  {
    id: 'homilia',
    orden: 10,
    titulo: 'Homilía',
    quePasa: 'El sacerdote nos explica lo que acabamos de escuchar para que lo entendamos mejor.',
    dondeMirar: 'ambon',
    gesto: 'Escucha: busca una idea para llevarte a casa.',
  },
  {
    id: 'credo',
    orden: 11,
    titulo: 'Credo',
    quePasa: 'Decimos juntos lo que creemos: «Creo en Dios, Padre todopoderoso…».',
    dondeMirar: 'altar',
    gesto: 'Ponte de pie y recítalo con toda la asamblea.',
  },
  {
    id: 'oracion-fieles',
    orden: 12,
    titulo: 'Oración de los fieles',
    quePasa: 'Pedimos por la Iglesia, por el mundo y por quienes lo necesitan. Cada petición termina con una respuesta.',
    dondeMirar: 'altar',
    gesto: 'Responde a cada petición y piensa en alguien por quien pedir.',
  },
  {
    id: 'presentacion-dones',
    orden: 13,
    titulo: 'Presentación de los dones',
    quePasa: 'Se llevan al altar el pan y el vino: los dones que se convertirán en Jesús.',
    dondeMirar: 'altar',
    gesto: 'Mira la procesión de los dones en silencio.',
    preguntaCatequista: true,
  },
  {
    id: 'plegaria-eucaristica',
    orden: 14,
    titulo: 'Plegaria eucarística',
    quePasa: 'El sacerdote da gracias a Dios con la gran oración de la Misa.',
    dondeMirar: 'altar',
    gesto: 'Escucha con mucho respeto: algo grande va a pasar.',
  },
  {
    id: 'santo',
    orden: 15,
    titulo: 'Santo',
    quePasa: 'Cantamos: «Santo, Santo, Santo es el Señor». ¡Los ángeles también cantan con nosotros!',
    dondeMirar: 'altar',
    gesto: 'Canta el Santo con alegría.',
  },
  {
    id: 'consagracion',
    orden: 16,
    titulo: 'Consagración',
    quePasa: 'El momento más importante: el pan y el vino se convierten en el Cuerpo y la Sangre de Jesús.',
    dondeMirar: 'altar',
    gesto: 'Mira al altar en silencio y adóralo en tu corazón.',
  },
  {
    id: 'padrenuestro',
    orden: 17,
    titulo: 'Padrenuestro',
    quePasa: 'Rezamos juntos la oración que Jesús nos enseñó, cogidos de la mano.',
    dondeMirar: 'altar',
    gesto: 'Reza el Padrenuestro despacio.',
    preguntaCatequista: true,
  },
  {
    id: 'rito-paz',
    orden: 18,
    titulo: 'Rito de la paz',
    quePasa: 'Nos deseamos la paz de Jesús unos a otros.',
    dondeMirar: 'bancos',
    gesto: 'Saluda con un gesto de paz a quienes tienes cerca.',
    preguntaCatequista: true,
  },
  {
    id: 'cordero-dios',
    orden: 19,
    titulo: 'Cordero de Dios',
    quePasa: 'Cantamos «Cordero de Dios, que quitas el pecado del mundo, ten piedad de nosotros».',
    dondeMirar: 'altar',
    gesto: 'Canta y prepárate: ¡vas a recibir a Jesús!',
  },
  {
    id: 'comunion',
    orden: 20,
    titulo: 'Comunión',
    quePasa: 'Recibimos el Cuerpo de Jesús. Es el momento más feliz: ¡Jesús viene a ti!',
    dondeMirar: 'altar',
    gesto: 'Acércate con calma, recibe a Jesús y responde «Amén».',
    preguntaCatequista: true,
  },
  {
    id: 'silencio',
    orden: 21,
    titulo: 'Silencio',
    quePasa: 'Después de comulgar hay un rato de silencio para hablar con Jesús en el corazón.',
    dondeMirar: 'bancos',
    gesto: 'Vuelve a tu sitio y háblale en silencio: dale gracias.',
  },
  {
    id: 'accion-gracias',
    orden: 22,
    titulo: 'Acción de gracias',
    quePasa: 'El sacerdote reza una oración de gracias por todo lo que hemos recibido.',
    dondeMirar: 'altar',
    gesto: 'Escucha y di «Amén» con el corazón contento.',
  },
  {
    id: 'bendicion',
    orden: 23,
    titulo: 'Bendición',
    quePasa: 'El sacerdote nos bendice en el nombre del Padre, del Hijo y del Espíritu Santo.',
    dondeMirar: 'altar',
    gesto: 'Recibe la bendición persignándote.',
  },
  {
    id: 'envio',
    orden: 24,
    titulo: 'Envío',
    quePasa: '«Podéis ir en paz». La Misa termina, pero nuestra misión de amar empieza.',
    dondeMirar: 'bancos',
    gesto: 'Sal contento: lleva a Jesús a los demás.',
  },
];

/** Los 8 momentos clave del Modo Ensayo (se muestran desordenados para ordenar). */
export const ENSAYO_IDS = [
  'entrada',
  'evangelio',
  'credo',
  'presentacion-dones',
  'consagracion',
  'padrenuestro',
  'comunion',
  'envio',
];

/** Devuelve los 8 momentos clave del Modo Ensayo, en orden correcto. */
export function getMomentosEnsayo(): MomentoMisa[] {
  const byId = new Map(MISA_MOMENTOS.map((m) => [m.id, m]));
  return ENSAYO_IDS.map((id) => byId.get(id)).filter(
    (m): m is MomentoMisa => m !== undefined,
  );
}
