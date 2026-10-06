/**
 * Tests de los datos y la lógica del área de niños.
 */
import { describe, expect, it } from 'vitest';
import { MISA_MOMENTOS, ENSAYO_IDS, getMomentosEnsayo } from '../../../data/misa';
import { ORACIONES_FUNDAMENTALES } from '../../../data/oraciones';
import { JUEGOS } from '../../../data/juegos';
import { LESSONS } from '../../../data/lessons/index';
import { isNucleusUnlocked, getContinueLesson } from '../shared';

describe('misa', () => {
  it('tiene 24 momentos ordenados', () => {
    expect(MISA_MOMENTOS).toHaveLength(24);
    expect(MISA_MOMENTOS.map((m) => m.orden)).toEqual(
      Array.from({ length: 24 }, (_, i) => i + 1),
    );
  });

  it('los 8 momentos del ensayo existen y están en orden', () => {
    const ensayo = getMomentosEnsayo();
    expect(ensayo).toHaveLength(8);
    const ordenes = ensayo.map((m) => m.orden);
    expect([...ordenes].sort((a, b) => a - b)).toEqual(ordenes);
    for (const id of ENSAYO_IDS) {
      expect(MISA_MOMENTOS.some((m) => m.id === id)).toBe(true);
    }
  });
});

describe('oraciones', () => {
  it('hay 4 oraciones fundamentales con texto', () => {
    expect(ORACIONES_FUNDAMENTALES).toHaveLength(4);
    for (const o of ORACIONES_FUNDAMENTALES) {
      expect(o.lines.length).toBeGreaterThan(0);
    }
  });
});

describe('juegos', () => {
  it('hay 12 juegos con ids únicos', () => {
    expect(JUEGOS).toHaveLength(12);
    expect(new Set(JUEGOS.map((j) => j.id)).size).toBe(12);
  });

  it('los gameIds de las lecciones están en el catálogo', () => {
    const ids = new Set(JUEGOS.map((j) => j.id));
    for (const l of LESSONS) {
      for (const gid of l.gameIds) {
        expect(ids.has(gid)).toBe(true);
      }
    }
  });
});

describe('desbloqueo de núcleos', () => {
  it('el primer núcleo siempre está desbloqueado', () => {
    expect(isNucleusUnlocked('n1', {})).toBe(true);
  });

  it('el segundo núcleo se bloquea hasta completar el primero', () => {
    expect(isNucleusUnlocked('n2', {})).toBe(false);
    const done = Object.fromEntries(
      LESSONS.filter((l) => l.nucleusId === 'n1').map((l) => [l.id, {}]),
    );
    expect(isNucleusUnlocked('n2', done)).toBe(true);
  });
});

describe('continuar camino', () => {
  it('devuelve la primera lección no completada', () => {
    const next = getContinueLesson({});
    expect(next?.slug).toBe(LESSONS[0].slug);
  });
});
