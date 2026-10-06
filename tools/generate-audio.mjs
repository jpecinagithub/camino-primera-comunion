#!/usr/bin/env node
/**
 * generate-audio.mjs — Generación reproducible de los audios de narración.
 * ----------------------------------------------------------------------------
 * Genera los MP3 de las narraciones (bloques `escucha` de las lecciones y
 * oraciones) con la voz elegida por el usuario y los guarda en `public/audio/`.
 *
 *   Voz:      avocado_v2:vd2_r8_rep5k_2623_v068_28k_g5k ("Vivacious Fountain",
 *             femenina, acento español peninsular, joven y alegre)
 *   Idioma:   es_ES
 *   Motor:    /opt/hatch/bin/tts speak (texto por stdin, nunca en el comando)
 *
 * Uso:
 *   node tools/generate-audio.mjs --inventory   # muestra el manifiesto sin generar
 *   node tools/generate-audio.mjs               # genera lo que falte (idempotente)
 *   node tools/generate-audio.mjs --force       # regenera todo
 *
 * Reintentos (según las reglas del skill tts): ante un error transitorio se
 * reintenta LA MISMA petición con backoff (5m, 10m, 30m); nunca se cambia de
 * voz ni de motor. Si tras ~45 min sigue fallando, se para y se reporta.
 * Los errores permanentes (auth, parámetros inválidos) abortan de inmediato.
 */
import { spawnSync } from 'child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync, mkdtempSync } from 'fs';
import { tmpdir } from 'os';
import { join, dirname, resolve } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const ts = require('typescript');

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = join(ROOT, 'public', 'audio');
const MANIFEST_PATH = join(ROOT, 'tools', 'audio-manifest.json');
const TTS_BIN = '/opt/hatch/bin/tts';

const VOICE = 'avocado_v2:vd2_r8_rep5k_2623_v068_28k_g5k';
const LANG = 'es_ES';

// Backoff entre reintentos de una misma petición (segundos): 5m, 10m, 30m.
const RETRY_DELAYS = [300, 600, 1800];

const args = new Set(process.argv.slice(2));
const FORCE = args.has('--force');
const INVENTORY_ONLY = args.has('--inventory');

/* ------------------------- carga de los datos TS ------------------------- */

function transpileTree() {
  const tmp = mkdtempSync(join(tmpdir(), 'audio-gen-'));
  const files = [];
  const walk = (dir) => {
    for (const e of require('fs').readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith('.ts') && !e.name.endsWith('.test.ts') && !e.name.endsWith('.d.ts')) files.push(p);
    }
  };
  walk(join(ROOT, 'src', 'data'));
  for (const f of files) {
    const src = readFileSync(f, 'utf8');
    let { outputText } = ts.transpileModule(src, {
      compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 },
      fileName: f,
    });
    // Node ESM exige extensión explícita en los imports relativos.
    outputText = outputText.replace(/(from\s+['"])(\.{1,2}\/[^'"]+)(['"])/g, (m, a, p, b) =>
      /\.\w+$/.test(p) ? m : `${a}${p}.js${b}`,
    );
    const rel = f.slice(join(ROOT, 'src', 'data').length);
    const out = join(tmp, 'data', rel).replace(/\.ts$/, '.js');
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, outputText);
  }
  return join(tmp, 'data');
}

async function loadData() {
  const dataDir = transpileTree();
  const lessons = await import(pathToFileURL(join(dataDir, 'lessons', 'index.js')).href);
  const oraciones = await import(pathToFileURL(join(dataDir, 'oraciones.js')).href);
  return { LESSONS: lessons.LESSONS, ORACIONES_FUNDAMENTALES: oraciones.ORACIONES_FUNDAMENTALES };
}

/* --------------------------- forma hablada ------------------------------- */

const UNIDADES = ['cero','uno','dos','tres','cuatro','cinco','seis','siete','ocho','nueve','diez','once','doce','trece','catorce','quince','dieciséis','diecisiete','dieciocho','diecinueve','veinte'];
const DECENAS = { 3: 'treinta', 4: 'cuarenta', 5: 'cincuenta', 6: 'sesenta', 7: 'setenta', 8: 'ochenta', 9: 'noventa' };

function numeroALetras(n) {
  if (n <= 20) return UNIDADES[n];
  if (n < 30) return 'veinti' + UNIDADES[n - 20];
  const d = Math.floor(n / 10), r = n % 10;
  return r === 0 ? DECENAS[d] : `${DECENAS[d]} y ${UNIDADES[r]}`;
}

/** Convierte párrafos con viñetas a texto corrido apto para TTS. */
function spokenForm(paragraphs) {
  let t = paragraphs.join('\n');
  t = t.replace(/[•·▪]/g, '. ');          // viñetas → pausa
  t = t.replace(/\s*\n\s*/g, '. ');       // saltos de línea → pausa
  t = t.replace(/\s{2,}/g, ' ');          // colapsa espacios
  t = t.replace(/\.\s*\./g, '.');         // evita puntos dobles
  // Números con letra (0-99); avisa si hay algo mayor.
  t = t.replace(/\b\d+\b/g, (m) => {
    const n = parseInt(m, 10);
    if (n <= 99) return numeroALetras(n);
    console.warn(`  [aviso] número >99 sin convertir: ${m}`);
    return m;
  });
  t = t.trim();
  if (t && !/[.!?…:]$/.test(t)) t += '.';
  return t;
}

/* ------------------------------ manifiesto ------------------------------- */

function buildManifest(LESSONS, ORACIONES_FUNDAMENTALES) {
  const items = [];
  for (const lesson of LESSONS) {
    const escuchas = lesson.blocks.filter((b) => b.kind === 'escucha');
    escuchas.forEach((b, i) => {
      const name = i === 0 ? `escucha-${lesson.slug}.mp3` : `escucha-${lesson.slug}-${i + 1}.mp3`;
      items.push({
        name,
        kind: 'escucha',
        source: `${lesson.slug} / ${b.id}`,
        text: `${b.title}. ${spokenForm(b.paragraphs)}`,
      });
    });
    const p = lesson.prayer;
    items.push({
      name: `oracion-${p.id}.mp3`,
      kind: 'oracion',
      source: `lección ${lesson.slug} / ${p.id}`,
      text: `${p.title}. ${spokenForm(p.lines)}`,
    });
  }
  for (const o of ORACIONES_FUNDAMENTALES) {
    items.push({
      name: `oracion-${o.id}.mp3`,
      kind: 'oracion',
      source: `fundamental / ${o.id}`,
      text: `${o.title}. ${spokenForm(o.lines)}`,
    });
  }
  return items;
}

/* ------------------------------ síntesis --------------------------------- */

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function isPermanentError(stderr) {
  return /auth|unauthorized|invalid|unsupported|not found|no such voice/i.test(stderr);
}

/** Llama al CLI tts una vez; devuelve {ok, error?}. */
function ttsOnce(text, outPath) {
  const res = spawnSync(TTS_BIN, ['speak', '--voice', VOICE, '--language', LANG, '--output', outPath, '--text-stdin'], {
    input: text,
    encoding: 'utf8',
    timeout: 180000,
    maxBuffer: 16 * 1024 * 1024,
  });
  const stdout = (res.stdout || '').trim();
  const stderr = (res.stderr || '').trim();
  if (res.status === 0) {
    try {
      const parsed = JSON.parse(stdout.split('\n').pop());
      if (parsed && parsed.ok) return { ok: true, bytes: parsed.bytes };
    } catch { /* sigue abajo */ }
    return { ok: true };
  }
  return { ok: false, error: stderr || stdout || `exit ${res.status}`, permanent: isPermanentError(stderr + stdout) };
}

async function synthesize(item, outPath) {
  for (let attempt = 0; ; attempt++) {
    const r = ttsOnce(item.text, outPath);
    if (r.ok) return r;
    console.error(`  [${item.name}] intento ${attempt + 1} fallido: ${(r.error || '').slice(0, 160)}`);
    if (r.permanent) {
      throw new Error(`Error permanente en ${item.name}: ${r.error}`);
    }
    if (attempt >= RETRY_DELAYS.length) {
      throw new Error(`${item.name}: sigue fallando tras ~45 min de reintentos. Último error: ${r.error}`);
    }
    const wait = RETRY_DELAYS[attempt];
    console.error(`  [${item.name}] reintentando en ${wait / 60} min (misma petición, misma voz)…`);
    await sleep(wait * 1000);
  }
}

/* --------------------------------- main ---------------------------------- */

async function main() {
  const { LESSONS, ORACIONES_FUNDAMENTALES } = await loadData();
  const items = buildManifest(LESSONS, ORACIONES_FUNDAMENTALES);

  // Chequeo de unicidad de nombres.
  const names = items.map((i) => i.name);
  const dupes = names.filter((n, i) => names.indexOf(n) !== i);
  if (dupes.length > 0) throw new Error(`Nombres duplicados: ${dupes.join(', ')}`);

  console.log(`Manifiesto: ${items.length} audios (${items.filter(i => i.kind === 'escucha').length} escuchas, ${items.filter(i => i.kind === 'oracion').length} oraciones)`);
  if (INVENTORY_ONLY) {
    for (const i of items) console.log(`  ${i.name}  (${i.text.length} caracteres)  ← ${i.source}`);
    const totalChars = items.reduce((a, i) => a + i.text.length, 0);
    console.log(`Total: ${totalChars} caracteres`);
    return;
  }

  mkdirSync(OUT_DIR, { recursive: true });
  let done = 0, skipped = 0;
  const results = [];
  for (const item of items) {
    const outPath = join(OUT_DIR, item.name);
    if (existsSync(outPath) && !FORCE) {
      skipped++;
      results.push({ name: item.name, status: 'skipped' });
      continue;
    }
    process.stdout.write(`[${done + skipped + 1}/${items.length}] ${item.name} (${item.text.length} car.)… `);
    const r = await synthesize(item, outPath);
    const bytes = require('fs').statSync(outPath).size;
    console.log(`ok (${bytes} bytes)`);
    done++;
    results.push({ name: item.name, status: 'generated', bytes, chars: item.text.length, at: new Date().toISOString() });
  }

  // Manifiesto de generación (para auditoría y regeneración selectiva).
  let prev = {};
  if (existsSync(MANIFEST_PATH)) {
    try { prev = JSON.parse(readFileSync(MANIFEST_PATH, 'utf8')); } catch { /* ignora */ }
  }
  const merged = { ...(prev.files || {} ) };
  for (const r of results) {
    if (r.status === 'generated') merged[r.name] = { bytes: r.bytes, chars: r.chars, at: r.at, voice: VOICE, language: LANG };
  }
  writeFileSync(MANIFEST_PATH, JSON.stringify({ voice: VOICE, language: LANG, files: merged }, null, 2));

  const totalBytes = items.reduce((a, i) => {
    const p = join(OUT_DIR, i.name);
    return a + (existsSync(p) ? require('fs').statSync(p).size : 0);
  }, 0);
  console.log(`\nHecho: ${done} generados, ${skipped} ya existían. Peso total: ${(totalBytes / 1024 / 1024).toFixed(1)} MB en ${OUT_DIR}`);
}

main().catch((e) => { console.error('FATAL:', e.message); process.exit(1); });
