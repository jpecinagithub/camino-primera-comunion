#!/usr/bin/env node
/**
 * apply-audio-src.mjs — Añade `audioSrc` a los datos de narración.
 * ----------------------------------------------------------------------------
 * Inserta las rutas de los MP3 generados por tools/generate-audio.mjs en:
 *   - src/data/lessons/*.ts: bloques descubre/piensa/reza, family y quiz
 *   - src/data/misa.ts: MomentoMisa
 *   - src/routes/ninos/reconciliacion.tsx: PASOS_SIMULACION
 *   - src/routes/ano-liturgico.tsx: TIEMPOS
 *
 * Idempotente: no inserta un audioSrc que ya exista en el fichero.
 * No toca ningún texto de contenido: solo añade líneas `audioSrc`.
 */
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
let changed = 0;

function save(path, before, after) {
  if (before !== after) {
    writeFileSync(path, after);
    changed++;
    console.log(`  actualizado: ${path.replace(ROOT + '/', '')}`);
  }
}

/* ------------------------------- lecciones -------------------------------- */

const lessonFiles = readdirSync(join(ROOT, 'src', 'data', 'lessons')).filter(
  (f) => f.endsWith('.ts') && !/index|part|__tests__/.test(f),
);

for (const file of lessonFiles) {
  const path = join(ROOT, 'src', 'data', 'lessons', file);
  const slug = file.replace(/\.ts$/, '');
  let src = readFileSync(path, 'utf8');

  // Bloques descubre / piensa / reza: inserta tras la línea `kind:`.
  // (los ids varían por fichero: 'l-<slug>-b1' o formas cortas como 'bt1')
  src = src.replace(
    /(id: '([a-z0-9-]+)',\n(\s*)kind: '(descubre|piensa|reza)',)/g,
    (m, _all, id, indent) => {
      const shortId = id.replace(/^l-/, '');
      const line = `${indent}audioSrc: '/audio/bloque-${shortId}.mp3',`;
      if (src.includes(line)) return m;
      return `${m}\n${line}`;
    },
  );

  // Bloque family.
  {
    const line = `    audioSrc: '/audio/familia-${slug}.mp3',`;
    if (!src.includes(line)) {
      src = src.replace(/(\n  family: \{\n)/, `$1${line}\n`);
    }
  }

  // Preguntas del quiz: índice secuencial en orden de aparición.
  // (los ids varían: 'l-<slug>-q1' o formas cortas como 'qb1')
  {
    let n = 0;
    src = src.replace(
      /(id: '[a-z0-9-]+',)(\n[ \t]*question: ')/g,
      (m, idPart, qPart) => {
        n++;
        const indent = idPart.match(/^[ \t]*/)[0];
        const line = `${indent}audioSrc: '/audio/quiz-${slug}-${n}.mp3',`;
        if (src.includes(line)) return m;
        return `${idPart}\n${line}${qPart}`;
      },
    );
  }

  save(path, readFileSync(path, 'utf8'), src);
}

/* ---------------------------------- misa ---------------------------------- */

{
  const path = join(ROOT, 'src', 'data', 'misa.ts');
  let src = readFileSync(path, 'utf8');
  src = src.replace(/^([ \t]*)orden: (\d+),$/gm, (m, indent, orden) => {
    const nn = String(orden).padStart(2, '0');
    const line = `${indent}audioSrc: '/audio/misa-${nn}.mp3',`;
    if (src.includes(line)) return m;
    return `${m}\n${line}`;
  });
  save(path, readFileSync(path, 'utf8'), src);
}

/* ------------------------------ reconciliación ---------------------------- */

{
  const path = join(ROOT, 'src', 'routes', 'ninos', 'reconciliacion.tsx');
  const full = readFileSync(path, 'utf8');
  const marker = 'const PASOS_SIMULACION';
  const at = full.indexOf(marker);
  if (at < 0) throw new Error('No se encontró PASOS_SIMULACION');
  let head = full.slice(0, at);
  const endMarker = '\n];';
  const end = full.indexOf(endMarker, at);
  if (end < 0) throw new Error('No se encontró el fin de PASOS_SIMULACION');
  let body = full.slice(at, end);
  const tail = full.slice(end);
  let n = 0;
  body = body.replace(/^([ \t]*)titulo: '[^']*',$/gm, (m, indent) => {
    n++;
    const line = `${indent}audioSrc: '/audio/reconciliacion-paso-${n}.mp3',`;
    if (body.includes(line)) return m;
    return `${m}\n${line}`;
  });
  if (n !== 8) throw new Error(`Se esperaban 8 pasos, procesados ${n}`);
  save(path, full, head + body + tail);
}

/* ------------------------------ año litúrgico ----------------------------- */

{
  const path = join(ROOT, 'src', 'routes', 'ano-liturgico.tsx');
  const full = readFileSync(path, 'utf8');
  const marker = 'const TIEMPOS';
  const at = full.indexOf(marker);
  if (at < 0) throw new Error('No se encontró TIEMPOS');
  const endMarker = '\n];';
  const end = full.indexOf(endMarker, at);
  let head = full.slice(0, at);
  let body = full.slice(at, end);
  const tail = full.slice(end);
  let nT = 0;
  body = body.replace(/^([ \t]*)id: '([a-z-]+)',$/gm, (m, indent, id) => {
    nT++;
    const line = `${indent}audioSrc: '/audio/ano-${id}.mp3',`;
    if (body.includes(line)) return m;
    return `${m}\n${line}`;
  });
  if (nT !== 6) throw new Error(`Se esperaban 6 tiempos, procesados ${nT}`);
  save(path, full, head + body + tail);
}

console.log(changed === 0 ? 'Sin cambios (todo ya tenía audioSrc).' : `\n${changed} ficheros actualizados.`);
