/**
 * Tests de audios de narración — Camino a la Primera Comunión
 * ----------------------------------------------------------------------------
 * Verifica que todo `audioSrc` referenciado en los datos (bloques de lección,
 * familia, quiz, oraciones, momentos de la Misa, pasos de Reconciliación y
 * tiempos del año litúrgico) existe como fichero real en `public/audio/`
 * y sigue la convención de nombres del manifiesto (tools/generate-audio.mjs).
 */
/// <reference types="node" />
import { existsSync, statSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { describe, expect, it } from 'vitest';
import { LESSONS } from '../lessons/index';
import { ORACIONES_FUNDAMENTALES } from '../oraciones';
import { MISA_MOMENTOS } from '../misa';
import { PASOS_SIMULACION } from '../../routes/ninos/reconciliacion';
import { TIEMPOS } from '../../routes/ano-liturgico';

/** Audio del paso estático "Juega" (definido en leccion.tsx). */
const JUEGA_AUDIO_SRC = '/audio/paso-juega.mp3';

const THIS_DIR = dirname(fileURLToPath(import.meta.url));
const AUDIO_DIR = join(THIS_DIR, '..', '..', '..', 'public', 'audio');

function audioPath(src: string): string {
  // src es '/audio/<nombre>.mp3' → public/audio/<nombre>.mp3
  return join(AUDIO_DIR, src.replace(/^\//, '').replace(/^audio\//, ''));
}

function collectAudioSrc(): { src: string; where: string }[] {
  const out: { src: string; where: string }[] = [];
  for (const lesson of LESSONS) {
    for (const b of lesson.blocks) {
      if (b.audioSrc) out.push({ src: b.audioSrc, where: `lección ${lesson.slug} / bloque ${b.id}` });
    }
    if (lesson.prayer.audioSrc) {
      out.push({ src: lesson.prayer.audioSrc, where: `lección ${lesson.slug} / oración ${lesson.prayer.id}` });
    }
    if (lesson.family.audioSrc) {
      out.push({ src: lesson.family.audioSrc, where: `lección ${lesson.slug} / familia` });
    }
    for (const q of lesson.quiz.questions) {
      if (q.audioSrc) out.push({ src: q.audioSrc, where: `lección ${lesson.slug} / quiz ${q.id}` });
    }
  }
  for (const o of ORACIONES_FUNDAMENTALES) {
    if (o.audioSrc) out.push({ src: o.audioSrc, where: `fundamental ${o.id}` });
  }
  for (const m of MISA_MOMENTOS) {
    if (m.audioSrc) out.push({ src: m.audioSrc, where: `misa / ${m.id}` });
  }
  PASOS_SIMULACION.forEach((p, i) => {
    if (p.audioSrc) out.push({ src: p.audioSrc, where: `reconciliación / paso ${i + 1}` });
  });
  for (const t of TIEMPOS) {
    if (t.audioSrc) out.push({ src: t.audioSrc, where: `año litúrgico / ${t.id}` });
  }
  out.push({ src: JUEGA_AUDIO_SRC, where: 'lección / paso juega (estático)' });
  return out;
}

describe('audios de narración', () => {
  it('todas las escuchas tienen audioSrc', () => {
    const sinAudio = LESSONS.flatMap((l) =>
      l.blocks.filter((b) => b.kind === 'escucha' && !b.audioSrc).map((b) => `${l.slug}/${b.id}`),
    );
    expect(sinAudio).toEqual([]);
  });

  it('todas las oraciones tienen audioSrc', () => {
    const sinAudioLecciones = LESSONS.filter((l) => !l.prayer.audioSrc).map((l) => l.slug);
    const sinAudioFund = ORACIONES_FUNDAMENTALES.filter((o) => !o.audioSrc).map((o) => o.id);
    expect(sinAudioLecciones).toEqual([]);
    expect(sinAudioFund).toEqual([]);
  });

  it('todos los bloques descubre/piensa/reza tienen audioSrc', () => {
    const sinAudio = LESSONS.flatMap((l) =>
      l.blocks
        .filter((b) => ['descubre', 'piensa', 'reza'].includes(b.kind) && !b.audioSrc)
        .map((b) => `${l.slug}/${b.id} (${b.kind})`),
    );
    expect(sinAudio).toEqual([]);
  });

  it('todos los pasos "En familia" tienen audioSrc', () => {
    const sinAudio = LESSONS.filter((l) => !l.family.audioSrc).map((l) => l.slug);
    expect(sinAudio).toEqual([]);
  });

  it('todas las preguntas del quiz tienen audioSrc', () => {
    const sinAudio = LESSONS.flatMap((l) =>
      l.quiz.questions.filter((q) => !q.audioSrc).map((q) => `${l.slug}/${q.id}`),
    );
    expect(sinAudio).toEqual([]);
  });

  it('todos los momentos de la Misa tienen audioSrc', () => {
    const sinAudio = MISA_MOMENTOS.filter((m) => !m.audioSrc).map((m) => m.id);
    expect(sinAudio).toEqual([]);
    // Ordenados y con el nombre esperado (misa-01 … misa-24).
    MISA_MOMENTOS.forEach((m, i) => {
      expect(m.orden).toBe(i + 1);
      expect(m.audioSrc).toBe(`/audio/misa-${String(i + 1).padStart(2, '0')}.mp3`);
    });
  });

  it('todos los pasos de Reconciliación tienen audioSrc', () => {
    expect(PASOS_SIMULACION.length).toBe(8);
    const sinAudio = PASOS_SIMULACION.map((p, i) => ({ p, i })).filter(
      ({ p }) => !p.audioSrc,
    );
    expect(sinAudio.map(({ i }) => `paso ${i + 1}`)).toEqual([]);
  });

  it('todos los tiempos del año litúrgico tienen audioSrc', () => {
    expect(TIEMPOS.length).toBe(6);
    const sinAudio = TIEMPOS.filter((t) => !t.audioSrc).map((t) => t.id);
    expect(sinAudio).toEqual([]);
  });

  it('cada audioSrc apunta a un MP3 existente en public/audio', () => {
    const refs = collectAudioSrc();
    // 36 (escucha+oración) + 61 bloques + 15 familia + 62 quiz + 24 misa
    // + 8 reconciliación + 6 año litúrgico + 1 paso juega = 213
    expect(refs.length).toBe(213);
    const faltan = refs.filter(({ src }) => {
      expect(src.startsWith('/audio/')).toBe(true);
      expect(src.endsWith('.mp3')).toBe(true);
      return !existsSync(audioPath(src));
    });
    expect(faltan.map((f) => `${f.src} (${f.where})`)).toEqual([]);
  });

  it('los MP3 no están vacíos', () => {
    for (const { src, where } of collectAudioSrc()) {
      expect(statSync(audioPath(src)).size, `${src} (${where})`).toBeGreaterThan(1024);
    }
  });

  it('no hay nombres de fichero duplicados', () => {
    const names = collectAudioSrc().map(({ src }) => src);
    expect(new Set(names).size).toBe(names.length);
  });
});
