/**
 * Tests de las funciones puras de gamificación (sin Dexie).
 */
import { describe, expect, it } from 'vitest';
import {
  GARDEN_SLOTS,
  TOTAL_LESSONS,
  completedInOrder,
  computeBadges,
  countCompleted,
} from '../hooks';

describe('countCompleted', () => {
  it('cuenta las claves del mapa de progreso', () => {
    expect(countCompleted({})).toBe(0);
    expect(countCompleted({ a: 1, b: 2, c: 3 })).toBe(3);
  });
});

describe('completedInOrder', () => {
  it('ordena por completedAt ascendente', () => {
    const map = {
      'l-3': { completedAt: 300 },
      'l-1': { completedAt: 100 },
      'l-2': { completedAt: 200 },
    };
    expect(completedInOrder(map)).toEqual(['l-1', 'l-2', 'l-3']);
  });
});

describe('computeBadges', () => {
  it('sin progreso, todo bloqueado', () => {
    const badges = computeBadges(0, 0, 0, 0);
    expect(badges).toHaveLength(6);
    expect(badges.every((b) => !b.unlocked)).toBe(true);
  });

  it('desbloquea los hitos en orden', () => {
    expect(computeBadges(1, 0, 0, 0).find((b) => b.id === 'primera-leccion')?.unlocked).toBe(true);
    expect(computeBadges(4, 0, 0, 0).find((b) => b.id === 'cinco-lecciones')?.unlocked).toBe(false);
    expect(computeBadges(5, 0, 0, 0).find((b) => b.id === 'cinco-lecciones')?.unlocked).toBe(true);
    expect(computeBadges(0, 1, 0, 0).find((b) => b.id === 'primer-juego')?.unlocked).toBe(true);
    expect(computeBadges(0, 0, 1, 0).find((b) => b.id === 'primer-quiz')?.unlocked).toBe(true);
    expect(computeBadges(0, 0, 0, 1).find((b) => b.id === 'nucleo-completo')?.unlocked).toBe(true);
    expect(computeBadges(TOTAL_LESSONS, 0, 0, 0).find((b) => b.id === 'todo-el-camino')?.unlocked).toBe(true);
  });

  it('las insignias tienen textos en español y sin contenido punitivo', () => {
    const badges = computeBadges(0, 0, 0, 0);
    for (const b of badges) {
      expect(b.title.length).toBeGreaterThan(0);
      expect(b.hint.length).toBeGreaterThan(0);
      expect(b.hint.toLowerCase()).not.toMatch(/racha|castigo|pierdes|fallo/);
    }
  });
});

describe('constantes', () => {
  it('el jardín tiene 12 flores y el camino 15 lecciones', () => {
    expect(GARDEN_SLOTS).toBe(12);
    expect(TOTAL_LESSONS).toBe(15);
  });
});
