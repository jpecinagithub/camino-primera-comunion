/**
 * Lecciones 9–15 (Parte 2: corazón sacramental) — Camino a la Primera Comunión
 * ----------------------------------------------------------------------------
 * El coordinador las integrará en src/data/lessons/index.ts.
 */
import type { Lesson } from '../model';
import { lessonBautismo } from './bautismo';
import { lessonMandamientoAmor } from './mandamiento-amor';
import { lessonPerdonReconciliacion } from './perdon-reconciliacion';
import { lessonComoConfesarse } from './como-confesarse';
import { lessonMisaPasoAPaso } from './misa-paso-a-paso';
import { lessonEucaristia } from './eucaristia';
import { lessonPreparacionPrimeraComunion } from './preparacion-primera-comunion';

export const LESSONS_PART2: Lesson[] = [
  lessonBautismo,
  lessonMandamientoAmor,
  lessonPerdonReconciliacion,
  lessonComoConfesarse,
  lessonMisaPasoAPaso,
  lessonEucaristia,
  lessonPreparacionPrimeraComunion,
];
