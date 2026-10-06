/**
 * Tests de la Parte 2 (lecciones 9–15) — Camino a la Primera Comunión
 * ----------------------------------------------------------------------------
 * Valida cada lección con validateLesson y comprueba los invariantes
 * de contenido acordados por el equipo.
 */
import { describe, expect, it } from 'vitest';
import { validateLesson } from '../../schemas';
import { LESSONS_PART2 } from '../part2';
import type { Lesson } from '../../model';

const EXPECTED: Array<{ id: string; slug: string; nucleusId: string }> = [
  { id: 'l-bautismo', slug: 'bautismo', nucleusId: 'n7' },
  { id: 'l-mandamiento-amor', slug: 'mandamiento-amor', nucleusId: 'n8' },
  { id: 'l-perdon-reconciliacion', slug: 'perdon-reconciliacion', nucleusId: 'n8' },
  { id: 'l-como-confesarse', slug: 'como-confesarse', nucleusId: 'n8' },
  { id: 'l-misa-paso-a-paso', slug: 'misa-paso-a-paso', nucleusId: 'n9' },
  { id: 'l-eucaristia', slug: 'eucaristia', nucleusId: 'n9' },
  {
    id: 'l-preparacion-primera-comunion',
    slug: 'preparacion-primera-comunion',
    nucleusId: 'n9',
  },
];

const ALLOWED_GAME_IDS = new Set([
  'ordena-misa',
  'ano-liturgico',
  'memory',
  'quien-dijo-que',
  'completa-oracion',
  'camino-decisiones',
  'sacramentos',
  'detective-evangelio',
  'descubre-iglesia',
  'verdadero-falso',
  'mapa-tierra-santa',
  'reto-semana',
]);

const BLOCK_KINDS = new Set(['descubre', 'escucha', 'piensa', 'reza']);

function expectValidLesson(lesson: Lesson) {
  const r = validateLesson(lesson);
  expect(r.success, `lección ${lesson.id}: ${!r.success ? r.error.message : ''}`).toBe(true);
}

describe('Parte 2: lecciones 9–15', () => {
  it('contiene exactamente las 7 lecciones esperadas, en orden', () => {
    expect(LESSONS_PART2).toHaveLength(7);
    expect(LESSONS_PART2.map((l) => l.id)).toEqual(EXPECTED.map((e) => e.id));
  });

  it('ids, slugs y nucleusId coinciden con lo asignado', () => {
    for (let i = 0; i < EXPECTED.length; i++) {
      const lesson = LESSONS_PART2[i];
      expect(lesson.slug).toBe(EXPECTED[i].slug);
      expect(lesson.nucleusId).toBe(EXPECTED[i].nucleusId);
      expect(lesson.slug).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it('todas validan contra LessonSchema', () => {
    for (const lesson of LESSONS_PART2) {
      expectValidLesson(lesson);
    }
  });

  it('bloques: 4–6 por lección, kinds válidos e ids únicos', () => {
    for (const lesson of LESSONS_PART2) {
      expect(lesson.blocks.length, `${lesson.id} bloques`).toBeGreaterThanOrEqual(4);
      expect(lesson.blocks.length, `${lesson.id} bloques`).toBeLessThanOrEqual(6);
      const ids = new Set<string>();
      for (const b of lesson.blocks) {
        expect(BLOCK_KINDS.has(b.kind), `${lesson.id} kind ${b.kind}`).toBe(true);
        expect(b.paragraphs.length, `${lesson.id}/${b.id} párrafos`).toBeGreaterThanOrEqual(1);
        expect(ids.has(b.id), `${lesson.id} bloque duplicado ${b.id}`).toBe(false);
        ids.add(b.id);
      }
    }
  });

  it('quiz: 3–5 preguntas, 3 opciones, correctIndex válido, hint y explanation', () => {
    for (const lesson of LESSONS_PART2) {
      const qs = lesson.quiz.questions;
      expect(qs.length, `${lesson.id} preguntas`).toBeGreaterThanOrEqual(3);
      expect(qs.length, `${lesson.id} preguntas`).toBeLessThanOrEqual(5);
      const ids = new Set<string>();
      for (const q of qs) {
        expect(q.options).toHaveLength(3);
        expect(q.correctIndex, `${lesson.id}/${q.id}`).toBeGreaterThanOrEqual(0);
        expect(q.correctIndex, `${lesson.id}/${q.id}`).toBeLessThan(3);
        expect(q.hint.trim().length, `${lesson.id}/${q.id} hint`).toBeGreaterThan(0);
        expect(q.explanation.trim().length, `${lesson.id}/${q.id} explanation`).toBeGreaterThan(0);
        expect(ids.has(q.id), `${lesson.id} pregunta duplicada ${q.id}`).toBe(false);
        ids.add(q.id);
      }
    }
  });

  it('parentNotes completos: oneMinute, 3–5 párrafos de fiveMinutes, 3 preguntas, resto', () => {
    for (const lesson of LESSONS_PART2) {
      const pn = lesson.parentNotes;
      expect(pn.oneMinute.trim().length, `${lesson.id} oneMinute`).toBeGreaterThan(0);
      expect(pn.fiveMinutes.length, `${lesson.id} fiveMinutes`).toBeGreaterThanOrEqual(3);
      expect(pn.fiveMinutes.length, `${lesson.id} fiveMinutes`).toBeLessThanOrEqual(5);
      expect(pn.familyQuestions, `${lesson.id} familyQuestions`).toHaveLength(3);
      expect(pn.dailyExample.trim().length, `${lesson.id} dailyExample`).toBeGreaterThan(0);
      expect(pn.familyActivity.trim().length, `${lesson.id} familyActivity`).toBeGreaterThan(0);
      expect(pn.familyPrayer.length, `${lesson.id} familyPrayer`).toBeGreaterThanOrEqual(1);
    }
  });

  it('objectives 2–3, estimatedMinutes 5–12, oración y familia presentes', () => {
    for (const lesson of LESSONS_PART2) {
      expect(lesson.objectives.length, `${lesson.id} objectives`).toBeGreaterThanOrEqual(2);
      expect(lesson.objectives.length, `${lesson.id} objectives`).toBeLessThanOrEqual(3);
      expect(lesson.estimatedMinutes, `${lesson.id} minutos`).toBeGreaterThanOrEqual(5);
      expect(lesson.estimatedMinutes, `${lesson.id} minutos`).toBeLessThanOrEqual(12);
      expect(lesson.prayer.lines.length, `${lesson.id} oración`).toBeGreaterThanOrEqual(1);
      expect(lesson.family.activityTitle.trim().length, `${lesson.id} familia`).toBeGreaterThan(0);
    }
  });

  it('gameIds pertenecen al catálogo asignado', () => {
    for (const lesson of LESSONS_PART2) {
      for (const g of lesson.gameIds) {
        expect(ALLOWED_GAME_IDS.has(g), `${lesson.id} juego ${g}`).toBe(true);
      }
    }
  });

  it('ids de quiz, oración y bloques no colisionan entre lecciones', () => {
    const seen = new Set<string>();
    for (const lesson of LESSONS_PART2) {
      for (const key of [
        `quiz:${lesson.quiz.id}`,
        `prayer:${lesson.prayer.id}`,
        ...lesson.blocks.map((b) => `block:${b.id}`),
        ...lesson.quiz.questions.map((q) => `q:${q.id}`),
      ]) {
        expect(seen.has(key), `id duplicado ${key}`).toBe(false);
        seen.add(key);
      }
    }
  });
});
