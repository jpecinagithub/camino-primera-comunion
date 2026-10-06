/**
 * Tests de la capa de persistencia (Dexie sobre fake-indexeddb).
 * fake-indexeddb se instala ANTES de importar el módulo de la db.
 */
import 'fake-indexeddb/auto';
import { beforeEach, describe, expect, it } from 'vitest';
import { db } from '../db';
import {
  markGameComplete,
  markLessonComplete,
  markNucleusComplete,
  markQuizComplete,
  saveProfile,
} from '../hooks';

beforeEach(async () => {
  await db.lessons.clear();
  await db.games.clear();
  await db.quizzes.clear();
  await db.nuclei.clear();
  await db.profile.clear();
});

describe('progreso de lecciones', () => {
  it('markLessonComplete guarda completedAt', async () => {
    await markLessonComplete('l-1');
    const row = await db.lessons.get('l-1');
    expect(row).toBeDefined();
    expect(row?.id).toBe('l-1');
    expect(row?.completedAt).toBeGreaterThan(0);
  });

  it('marcar dos veces actualiza el registro sin duplicar', async () => {
    await markLessonComplete('l-1');
    await markLessonComplete('l-1');
    expect(await db.lessons.count()).toBe(1);
  });
});

describe('progreso de juegos y quizzes', () => {
  it('markGameComplete guarda score/total', async () => {
    await markGameComplete('memoria', 8, 10);
    const row = await db.games.get('memoria');
    expect(row?.score).toBe(8);
    expect(row?.total).toBe(10);
  });

  it('markQuizComplete guarda score/total', async () => {
    await markQuizComplete('quiz:l-1', 4, 5);
    const row = await db.quizzes.get('quiz:l-1');
    expect(row?.score).toBe(4);
    expect(row?.total).toBe(5);
  });
});

describe('progreso de núcleos', () => {
  it('markNucleusComplete guarda el núcleo', async () => {
    await markNucleusComplete('n3');
    const row = await db.nuclei.get('n3');
    expect(row?.id).toBe('n3');
    expect(row?.completedAt).toBeGreaterThan(0);
  });
});

describe('perfil', () => {
  it('saveProfile crea el perfil con apodo y avatar', async () => {
    await saveProfile('Estrellita', 'dove');
    const p = await db.profile.get('profile');
    expect(p?.nickname).toBe('Estrellita');
    expect(p?.avatar).toBe('dove');
    expect(p?.createdAt).toBeGreaterThan(0);
  });

  it('saveProfile conserva createdAt al actualizar', async () => {
    await saveProfile('Estrellita', 'dove');
    const first = await db.profile.get('profile');
    await saveProfile('Lucerito', 'chalice');
    const second = await db.profile.get('profile');
    expect(second?.nickname).toBe('Lucerito');
    expect(second?.createdAt).toBe(first?.createdAt);
  });
});
