import type { Lesson } from '../model';
import { lessonSerCristiano } from './ser-cristiano';
import { lessonDiosPadreCreador } from './dios-padre-creador';
import { lessonLaBiblia } from './la-biblia';
import { lessonMaria } from './maria';
import { lessonNacimientoJesus } from './nacimiento-jesus';
import { lessonBuenaNoticia } from './buena-noticia';
import { lessonPasionResurreccion } from './pasion-resurreccion';
import { lessonPentecostes } from './pentecostes';

/**
 * Lecciones 1–8 — Camino a la Primera Comunión.
 * Equipo de contenido. Cada fichero exporta su lección; este módulo
 * las agrupa en orden para que el coordinador las registre en index.ts.
 */
export const LESSONS_PART1: Lesson[] = [
  lessonSerCristiano,
  lessonDiosPadreCreador,
  lessonLaBiblia,
  lessonMaria,
  lessonNacimientoJesus,
  lessonBuenaNoticia,
  lessonPasionResurreccion,
  lessonPentecostes,
];
