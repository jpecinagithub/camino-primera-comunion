/**
 * Tests del contrato de datos: schemas Zod + núcleos.
 * Los equipos de contenido deben mantener estos tests en verde.
 */
import { describe, expect, it } from 'vitest';
import * as lucide from 'lucide-react';
import { validateLesson, validateNucleus } from '../schemas';
import { NUCLEI, getNucleus } from '../nuclei';
import type { Lesson } from '../model';

const SAMPLE_LESSON: Lesson = {
  id: 'l-ejemplo',
  slug: 'leccion-de-ejemplo',
  title: 'Lección de ejemplo',
  subtitle: 'Un subtítulo breve',
  nucleusId: 'n1',
  estimatedMinutes: 15,
  objectives: ['Descubrir algo nuevo'],
  blocks: [
    {
      id: 'b1',
      kind: 'descubre',
      title: 'Descubrimos',
      paragraphs: ['Primer párrafo del bloque.'],
    },
  ],
  gameIds: [],
  quiz: {
    id: 'q1',
    title: '¿Qué has aprendido?',
    questions: [
      {
        id: 'qq1',
        question: '¿Pregunta de ejemplo?',
        options: ['Opción A', 'Opción B'],
        correctIndex: 0,
        hint: 'Piensa bien.',
        explanation: 'Porque sí.',
      },
    ],
  },
  prayer: {
    id: 'p1',
    title: 'Oración de ejemplo',
    lines: ['Primera línea.', 'Segunda línea.'],
  },
  family: {
    activityTitle: 'Actividad en familia',
    activity: 'Hablad de lo aprendido.',
  },
  parentNotes: {
    oneMinute: 'Resumen en un minuto.',
    fiveMinutes: ['Punto uno.'],
    familyQuestions: ['¿Qué te ha gustado más?'],
    dailyExample: 'Un ejemplo de la vida diaria.',
    familyActivity: 'Una actividad para hacer juntos.',
    familyPrayer: ['Una petición breve.'],
  },
};

describe('validateLesson', () => {
  it('acepta una lección válida', () => {
    const r = validateLesson(SAMPLE_LESSON);
    expect(r.success).toBe(true);
  });

  it('rechaza una lección sin bloques', () => {
    const r = validateLesson({ ...SAMPLE_LESSON, blocks: [] });
    expect(r.success).toBe(false);
  });

  it('rechaza correctIndex fuera de rango', () => {
    const bad = {
      ...SAMPLE_LESSON,
      quiz: {
        ...SAMPLE_LESSON.quiz,
        questions: [
          { ...SAMPLE_LESSON.quiz.questions[0], correctIndex: 5 },
        ],
      },
    };
    const r = validateLesson(bad);
    expect(r.success).toBe(false);
  });

  it('rechaza un slug con mayúsculas o espacios', () => {
    const r = validateLesson({ ...SAMPLE_LESSON, slug: 'Lección Mala' });
    expect(r.success).toBe(false);
  });

  it('rechaza un kind de bloque desconocido', () => {
    const bad = {
      ...SAMPLE_LESSON,
      blocks: [{ ...SAMPLE_LESSON.blocks[0], kind: 'inventa' }],
    };
    const r = validateLesson(bad);
    expect(r.success).toBe(false);
  });
});

const EXPECTED_TITLES = [
  'La Iglesia y los cristianos',
  'Dios es nuestro Padre',
  'Jesús viene a salvarnos',
  'Jesús, el Hijo de Dios, vivió entre nosotros',
  'Jesús entrega su vida por nosotros',
  'El Espíritu Santo y la Iglesia',
  'Por el Bautismo nacemos a la vida nueva',
  'La Reconciliación: recibimos el perdón que nos renueva',
  'La Eucaristía: nos alimentamos con el Cuerpo y la Sangre del Señor',
  'Con Jesús, por siempre, en la Casa del Padre',
];

describe('NUCLEI (contrato de los 10 núcleos)', () => {
  it('hay exactamente 10 núcleos con ids n1..n10', () => {
    expect(NUCLEI).toHaveLength(10);
    expect(NUCLEI.map((n) => n.id)).toEqual([
      'n1', 'n2', 'n3', 'n4', 'n5',
      'n6', 'n7', 'n8', 'n9', 'n10',
    ]);
    expect(NUCLEI.map((n) => n.number)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it('los títulos son los oficiales (no cambiar sin avisar)', () => {
    expect(NUCLEI.map((n) => n.title)).toEqual(EXPECTED_TITLES);
  });

  it('todos validan contra NucleusSchema', () => {
    for (const n of NUCLEI) {
      const r = validateNucleus(n);
      expect(r.success, `núcleo ${n.id}`).toBe(true);
    }
  });

  it('los iconos existen en lucide-react', () => {
    const exported = new Set(Object.keys(lucide));
    for (const n of NUCLEI) {
      expect(exported.has(n.icon), `icono ${n.icon} (${n.id})`).toBe(true);
    }
  });

  it('los colores usan claves de paleta válidas', () => {
    for (const n of NUCLEI) {
      expect(['sky', 'gold', 'green', 'coral']).toContain(n.color);
    }
  });

  it('getNucleus encuentra por id', () => {
    expect(getNucleus('n9')?.title).toBe(EXPECTED_TITLES[8]);
    expect(getNucleus('n99')).toBeUndefined();
  });
});
