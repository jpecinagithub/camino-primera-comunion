/**
 * Tests de audios de narración — Camino a la Primera Comunión
 * ----------------------------------------------------------------------------
 * Verifica que todo `audioSrc` referenciado en los datos (bloques escucha,
 * oraciones de lección y oraciones fundamentales) existe como fichero real
 * en `public/audio/` y sigue la convención de nombres del manifiesto
 * (tools/generate-audio.mjs).
 */
/// <reference types="node" />
import { existsSync, statSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { describe, expect, it } from 'vitest';
import { LESSONS } from '../lessons/index';
import { ORACIONES_FUNDAMENTALES } from '../oraciones';

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
  }
  for (const o of ORACIONES_FUNDAMENTALES) {
    if (o.audioSrc) out.push({ src: o.audioSrc, where: `fundamental ${o.id}` });
  }
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

  it('cada audioSrc apunta a un MP3 existente en public/audio', () => {
    const refs = collectAudioSrc();
    expect(refs.length).toBe(36);
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
