import { describe, expect, it } from 'vitest';
import { validateLesson } from '../../schemas';
import { LESSONS_PART1 } from '../part1';

const EXPECTED_IDS = [
  'l-ser-cristiano',
  'l-dios-padre-creador',
  'l-la-biblia',
  'l-maria',
  'l-nacimiento-jesus',
  'l-buena-noticia',
  'l-pasion-resurreccion',
  'l-pentecostes',
];

describe('LESSONS_PART1', () => {
  it('contiene las 8 lecciones esperadas, en orden', () => {
    expect(LESSONS_PART1).toHaveLength(8);
    expect(LESSONS_PART1.map((l) => l.id)).toEqual(EXPECTED_IDS);
  });

  it('todas las lecciones validan con validateLesson', () => {
    for (const lesson of LESSONS_PART1) {
      const result = validateLesson(lesson);
      expect(result.success, `validateLesson falló para ${lesson.id}`).toBe(true);
    }
  });

  it('cada quiz tiene 3–5 preguntas con 3 opciones y correctIndex válido', () => {
    for (const lesson of LESSONS_PART1) {
      const { questions } = lesson.quiz;
      expect(
        questions.length,
        `quiz de ${lesson.id} debe tener 3–5 preguntas`,
      ).toBeGreaterThanOrEqual(3);
      expect(
        questions.length,
        `quiz de ${lesson.id} debe tener 3–5 preguntas`,
      ).toBeLessThanOrEqual(5);
      for (const q of questions) {
        expect(q.options, `pregunta ${q.id} debe tener 3 opciones`).toHaveLength(3);
        expect(
          q.correctIndex,
          `correctIndex de ${q.id} debe apuntar a una opción existente`,
        ).toBeGreaterThanOrEqual(0);
        expect(
          q.correctIndex,
          `correctIndex de ${q.id} debe apuntar a una opción existente`,
        ).toBeLessThan(3);
        expect(q.hint.trim().length).toBeGreaterThan(0);
        expect(q.explanation.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it('cada lección tiene blocks no vacíos con párrafos', () => {
    for (const lesson of LESSONS_PART1) {
      expect(lesson.blocks.length, `blocks de ${lesson.id}`).toBeGreaterThan(0);
      for (const block of lesson.blocks) {
        expect(block.paragraphs.length, `párrafos de ${block.id}`).toBeGreaterThan(0);
        for (const p of block.paragraphs) {
          expect(p.trim().length, `párrafo vacío en ${block.id}`).toBeGreaterThan(0);
        }
      }
    }
  });

  it('parentNotes completos en todas las lecciones', () => {
    for (const lesson of LESSONS_PART1) {
      const pn = lesson.parentNotes;
      expect(pn.oneMinute.trim().length, `oneMinute de ${lesson.id}`).toBeGreaterThan(0);
      expect(
        pn.fiveMinutes.length,
        `fiveMinutes de ${lesson.id} debe tener 3–5 párrafos`,
      ).toBeGreaterThanOrEqual(3);
      expect(
        pn.fiveMinutes.length,
        `fiveMinutes de ${lesson.id} debe tener 3–5 párrafos`,
      ).toBeLessThanOrEqual(5);
      expect(
        pn.familyQuestions.length,
        `familyQuestions de ${lesson.id} debe tener 3 preguntas`,
      ).toBe(3);
      expect(pn.dailyExample.trim().length, `dailyExample de ${lesson.id}`).toBeGreaterThan(0);
      expect(pn.familyActivity.trim().length, `familyActivity de ${lesson.id}`).toBeGreaterThan(0);
      expect(
        pn.familyPrayer.length,
        `familyPrayer de ${lesson.id} debe tener 3–5 líneas`,
      ).toBeGreaterThanOrEqual(3);
      expect(
        pn.familyPrayer.length,
        `familyPrayer de ${lesson.id} debe tener 3–5 líneas`,
      ).toBeLessThanOrEqual(5);
    }
  });

  it('slugs únicos y con formato válido', () => {
    const slugs = LESSONS_PART1.map((l) => l.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) {
      expect(slug).toMatch(/^[a-z0-9-]+$/);
    }
  });
});
