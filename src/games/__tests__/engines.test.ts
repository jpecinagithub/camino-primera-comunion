/**
 * Tests de los 12 motores de juego.
 * ----------------------------------------------------------------------------
 * - Lógica pura extraída de los motores (mezcla, puntuación, construcción de
 *   preguntas) con tests deterministas.
 * - Invariantes de los datos de ejemplo (con Zod donde aporta valor):
 *   arrays no vacíos, ids únicos, respuestas válidas, iconos existentes.
 */
import { describe, expect, it } from 'vitest';
import * as lucide from 'lucide-react';
import { z } from 'zod';

import { GAMES } from '../registry';
import { ENGINE_COMPONENTS } from '../GameHost';
import {
  shuffle,
  countMatches,
  seededRand,
} from '../engines/shared';
import { misplacedIds } from '../engines/ordena-misa';
import {
  buildQuizQuestions,
  distinctColors,
} from '../engines/ano-liturgico';
import { buildDeck } from '../engines/memory';
import { checkAnswers } from '../engines/completa-oracion';
import {
  buildSacramentQuestions,
  SYMBOL_WORDS,
} from '../engines/sacramentos';
import { revealClues } from '../engines/detective-evangelio';
import { PART_ZONES } from '../engines/descubre-iglesia';

import { ORDENA_MISA_DATA } from '../data/ordena-misa';
import { ANO_LITURGICO_DATA } from '../data/ano-liturgico';
import { MEMORY_DATA } from '../data/memory';
import { QUIEN_DIJO_QUE_DATA } from '../data/quien-dijo-que';
import { COMPLETA_ORACION_DATA } from '../data/completa-oracion';
import { CAMINO_DECISIONES_DATA } from '../data/camino-decisiones';
import { SACRAMENTOS_DATA } from '../data/sacramentos';
import { DETECTIVE_EVANGELIO_DATA } from '../data/detective-evangelio';
import { DESCUBRE_IGLESIA_DATA } from '../data/descubre-iglesia';
import { VERDADERO_FALSO_DATA } from '../data/verdadero-falso';
import { MAPA_TIERRA_SANTA_DATA } from '../data/mapa-tierra-santa';
import { RETO_SEMANA_DATA } from '../data/reto-semana';

/* ==========================================================================
 * Ayudas
 * ========================================================================== */

const LUCIDE_EXPORTS = new Set(Object.keys(lucide));

function expectIconsExist(names: readonly string[], label: string) {
  for (const n of names) {
    expect(LUCIDE_EXPORTS.has(n), `${label}: el icono «${n}» no existe en lucide-react`).toBe(true);
  }
}

function expectUniqueIds(items: readonly { id: string }[], label: string) {
  const ids = items.map((i) => i.id);
  expect(new Set(ids).size, `${label}: hay ids duplicados`).toBe(ids.length);
  for (const id of ids) {
    expect(id.trim().length, `${label}: id vacío`).toBeGreaterThan(0);
  }
}

const nonEmpty = z.string().min(1);

/* ==========================================================================
 * shared: shuffle / countMatches / seededRand
 * ========================================================================== */

describe('shuffle', () => {
  it('conserva todos los elementos y la longitud', () => {
    const input = ['a', 'b', 'c', 'd', 'e'];
    const out = shuffle(input, seededRand(1));
    expect(out).toHaveLength(input.length);
    expect([...out].sort()).toEqual([...input].sort());
  });

  it('no muta el array original', () => {
    const input = [1, 2, 3, 4];
    const copy = [...input];
    shuffle(input, seededRand(7));
    expect(input).toEqual(copy);
  });

  it('es determinista con la misma semilla', () => {
    const input = ['a', 'b', 'c', 'd', 'e', 'f'];
    expect(shuffle(input, seededRand(42))).toEqual(shuffle(input, seededRand(42)));
  });

  it('maneja el array vacío', () => {
    expect(shuffle([], seededRand(3))).toEqual([]);
  });
});

describe('countMatches', () => {
  it('cuenta las posiciones correctas', () => {
    expect(countMatches(['a', 'b', 'c'], ['a', 'x', 'c'])).toBe(2);
    expect(countMatches(['a', 'b', 'c'], ['a', 'b', 'c'])).toBe(3);
    expect(countMatches(['a', 'b', 'c'], ['x', 'y', 'z'])).toBe(0);
  });

  it('ignora las ranuras vacías', () => {
    expect(countMatches(['a', null, 'c'], ['a', 'b', 'c'])).toBe(2);
  });
});

/* ==========================================================================
 * ordena-misa
 * ========================================================================== */

describe('ordena-misa', () => {
  it('misplacedIds detecta las tarjetas mal colocadas', () => {
    expect(misplacedIds(['a', 'b', 'c'], ['a', 'x', 'c'])).toEqual(['b']);
    expect(misplacedIds(['a', 'b', null], ['a', 'b', 'c'])).toEqual([]);
  });

  it('los datos tienen 5 pasos con ids únicos y pistas', () => {
    const items = ORDENA_MISA_DATA.items ?? [];
    expect(items).toHaveLength(5);
    expectUniqueIds(items, 'ordena-misa');
    for (const i of items) {
      expect(i.label.trim().length).toBeGreaterThan(0);
      expect(i.hint.trim().length).toBeGreaterThan(0);
    }
  });
});

/* ==========================================================================
 * ano-liturgico
 * ========================================================================== */

describe('ano-liturgico', () => {
  const seasons = ANO_LITURGICO_DATA.seasons ?? [];

  it('buildQuizQuestions crea una pregunta por tiempo, sin repetir', () => {
    const qs = buildQuizQuestions(seasons, seededRand(5));
    expect(qs).toHaveLength(seasons.length);
    expectUniqueIds(qs.map((q) => ({ id: q.seasonId })), 'preguntas');
    for (const q of qs) {
      expect(['color', 'symbol']).toContain(q.kind);
    }
  });

  it('distinctColors elimina duplicados (morado y blanco se repiten)', () => {
    const colors = distinctColors(seasons);
    const names = colors.map((c) => c.name);
    expect(new Set(names).size).toBe(names.length);
    expect(names.sort()).toEqual(['blanco', 'morado', 'rojo', 'verde']);
  });

  it('los datos tienen 6 tiempos con iconos válidos', () => {
    expect(seasons).toHaveLength(6);
    expectUniqueIds(seasons, 'ano-liturgico');
    expectIconsExist(seasons.map((s) => s.symbol), 'ano-liturgico');
    for (const s of seasons) {
      expect(s.description.trim().length).toBeGreaterThan(0);
    }
  });
});

/* ==========================================================================
 * memory
 * ========================================================================== */

describe('memory', () => {
  it('buildDeck crea 2 cartas por pareja con uids únicos', () => {
    const pairs = MEMORY_DATA.pairs ?? [];
    const deck = buildDeck(pairs, seededRand(9));
    expect(deck).toHaveLength(pairs.length * 2);
    const uids = deck.map((c) => c.uid);
    expect(new Set(uids).size).toBe(uids.length);
    for (const p of pairs) {
      expect(deck.filter((c) => c.pairId === p.id)).toHaveLength(2);
    }
  });

  it('los datos tienen 8 parejas con iconos válidos', () => {
    const pairs = MEMORY_DATA.pairs ?? [];
    expect(pairs).toHaveLength(8);
    expectUniqueIds(pairs, 'memory');
    expectIconsExist(pairs.map((p) => p.icon), 'memory');
  });
});

/* ==========================================================================
 * quien-dijo-que
 * ========================================================================== */

describe('quien-dijo-que', () => {
  it('los datos tienen parejas completas con pista', () => {
    const pairs = QUIEN_DIJO_QUE_DATA.pairs ?? [];
    expect(pairs.length).toBeGreaterThanOrEqual(4);
    expectUniqueIds(pairs, 'quien-dijo-que');
    for (const p of pairs) {
      expect(p.left.trim().length).toBeGreaterThan(0);
      expect(p.right.trim().length).toBeGreaterThan(0);
      expect(p.hint.trim().length).toBeGreaterThan(0);
    }
  });
});

/* ==========================================================================
 * completa-oracion
 * ========================================================================== */

describe('completa-oracion', () => {
  it('checkAnswers puntúa los huecos', () => {
    const blanks = [
      { blank: 'b1', answer: 'María', hint: 'h' },
      { blank: 'b2', answer: 'gracia', hint: 'h' },
    ];
    expect(checkAnswers({ b1: 'María', b2: 'gracia' }, blanks)).toEqual({
      correct: 2,
      wrongIds: [],
    });
    expect(checkAnswers({ b1: 'María', b2: 'cielo' }, blanks)).toEqual({
      correct: 1,
      wrongIds: ['b2'],
    });
    expect(checkAnswers({}, blanks)).toEqual({ correct: 0, wrongIds: ['b1', 'b2'] });
  });

  it('los datos son coherentes (Zod): respuestas en el banco, sin duplicados', () => {
    const segmentSchema = z.union([
      z.string(),
      z.object({ blank: nonEmpty, answer: nonEmpty, hint: nonEmpty }),
    ]);
    const schema = z
      .object({
        prayerTitle: nonEmpty,
        segments: z.array(segmentSchema).min(1),
        wordBank: z.array(nonEmpty).min(1),
      })
      .refine(
        (d) => {
          const answers = d.segments
            .filter((s): s is { blank: string; answer: string; hint: string } => typeof s !== 'string')
            .map((s) => s.answer);
          return answers.length > 0 && answers.every((a) => d.wordBank.includes(a));
        },
        { message: 'todas las respuestas deben estar en wordBank' },
      )
      .refine((d) => new Set(d.wordBank).size === d.wordBank.length, {
        message: 'wordBank con duplicados',
      });
    const r = schema.safeParse(COMPLETA_ORACION_DATA);
    expect(r.success, JSON.stringify(!r.success ? r.error.issues : [])).toBe(true);
  });
});

/* ==========================================================================
 * camino-decisiones
 * ========================================================================== */

describe('camino-decisiones', () => {
  it('los datos son coherentes (Zod): 3 opciones y exactamente una mejor', () => {
    const optionSchema = z.object({
      label: nonEmpty,
      feedback: nonEmpty,
      isBest: z.boolean(),
    });
    const schema = z.object({
      situations: z
        .array(
          z
            .object({
              id: nonEmpty,
              text: nonEmpty,
              options: z.array(optionSchema).length(3),
            })
            .refine((s) => s.options.filter((o) => o.isBest).length === 1, {
              message: 'cada situación debe tener exactamente una opción isBest',
            }),
        )
        .min(4),
    });
    const r = schema.safeParse(CAMINO_DECISIONES_DATA);
    expect(r.success, JSON.stringify(!r.success ? r.error.issues : [])).toBe(true);
    expectUniqueIds(CAMINO_DECISIONES_DATA.situations ?? [], 'camino-decisiones');
  });
});

/* ==========================================================================
 * sacramentos
 * ========================================================================== */

describe('sacramentos', () => {
  it('buildSacramentQuestions crea 2 preguntas por sacramento', () => {
    const sacraments = SACRAMENTOS_DATA.sacraments ?? [];
    const qs = buildSacramentQuestions(sacraments, seededRand(11));
    expect(qs).toHaveLength(sacraments.length * 2);
    for (const s of sacraments) {
      const mine = qs.filter((q) => q.sacramentId === s.id);
      expect(mine).toHaveLength(2);
      expect(mine.map((q) => q.kind).sort()).toEqual(['meaning', 'symbol']);
    }
  });

  it('los datos tienen los 7 sacramentos con iconos y palabras de pista', () => {
    const sacraments = SACRAMENTOS_DATA.sacraments ?? [];
    expect(sacraments).toHaveLength(7);
    expectUniqueIds(sacraments, 'sacramentos');
    expectIconsExist(sacraments.map((s) => s.symbol), 'sacramentos');
    for (const s of sacraments) {
      expect(s.meaning.trim().length).toBeGreaterThan(0);
      expect(SYMBOL_WORDS[s.symbol], `falta palabra para ${s.symbol}`).toBeDefined();
    }
  });
});

/* ==========================================================================
 * detective-evangelio
 * ========================================================================== */

describe('detective-evangelio', () => {
  it('revealClues muestra las primeras n pistas', () => {
    const clues = ['a', 'b', 'c'];
    expect(revealClues(clues, 1)).toEqual(['a']);
    expect(revealClues(clues, 5)).toEqual(['a', 'b', 'c']);
    expect(revealClues(clues, 0)).toEqual([]);
  });

  it('los datos son coherentes (Zod): respuesta entre las opciones', () => {
    const caseSchema = z
      .object({
        id: nonEmpty,
        clues: z.array(nonEmpty).min(2).max(3),
        options: z.array(nonEmpty).min(3),
        answer: nonEmpty,
        hint: nonEmpty,
        explanation: nonEmpty,
      })
      .refine((c) => c.options.includes(c.answer), {
        message: 'la respuesta debe estar entre las opciones',
      })
      .refine((c) => new Set(c.options).size === c.options.length, {
        message: 'opciones duplicadas',
      });
    const schema = z.object({ cases: z.array(caseSchema).length(5) });
    const r = schema.safeParse(DETECTIVE_EVANGELIO_DATA);
    expect(r.success, JSON.stringify(!r.success ? r.error.issues : [])).toBe(true);
    expectUniqueIds(DETECTIVE_EVANGELIO_DATA.cases ?? [], 'detective-evangelio');
  });
});

/* ==========================================================================
 * descubre-iglesia
 * ========================================================================== */

describe('descubre-iglesia', () => {
  it('cada parte tiene su zona en el SVG y dentro de 0–100', () => {
    const parts = DESCUBRE_IGLESIA_DATA.parts ?? [];
    expect(parts.length).toBeGreaterThanOrEqual(5);
    expectUniqueIds(parts, 'descubre-iglesia');
    for (const p of parts) {
      const zone = PART_ZONES[p.id];
      expect(zone, `falta zona para «${p.id}»`).toBeDefined();
      if (zone) {
        for (const [k, v] of Object.entries(zone)) {
          expect(v, `zona ${p.id}.${k}`).toBeGreaterThanOrEqual(0);
          expect(v, `zona ${p.id}.${k}`).toBeLessThanOrEqual(100);
        }
        expect(p.description.trim().length).toBeGreaterThan(0);
      }
    }
  });
});

/* ==========================================================================
 * verdadero-falso
 * ========================================================================== */

describe('verdadero-falso', () => {
  it('los datos tienen 8 afirmaciones con explicación', () => {
    const statements = VERDADERO_FALSO_DATA.statements ?? [];
    expect(statements).toHaveLength(8);
    expectUniqueIds(statements, 'verdadero-falso');
    for (const s of statements) {
      expect(s.text.trim().length).toBeGreaterThan(0);
      expect(typeof s.isTrue).toBe('boolean');
      expect(s.explanation.trim().length).toBeGreaterThan(0);
    }
  });
});

/* ==========================================================================
 * mapa-tierra-santa
 * ========================================================================== */

describe('mapa-tierra-santa', () => {
  it('los datos son coherentes (Zod): coordenadas 0–100', () => {
    const schema = z.object({
      places: z
        .array(
          z.object({
            id: nonEmpty,
            name: nonEmpty,
            hint: nonEmpty,
            fact: nonEmpty,
            x: z.number().min(0).max(100),
            y: z.number().min(0).max(100),
          }),
        )
        .min(4),
    });
    const r = schema.safeParse(MAPA_TIERRA_SANTA_DATA);
    expect(r.success, JSON.stringify(!r.success ? r.error.issues : [])).toBe(true);
    expectUniqueIds(MAPA_TIERRA_SANTA_DATA.places ?? [], 'mapa-tierra-santa');
  });
});

/* ==========================================================================
 * reto-semana
 * ========================================================================== */

describe('reto-semana', () => {
  it('los datos tienen 6 retos con iconos válidos', () => {
    const challenges = RETO_SEMANA_DATA.challenges ?? [];
    expect(challenges).toHaveLength(6);
    expectUniqueIds(challenges, 'reto-semana');
    expectIconsExist(challenges.map((c) => c.icon), 'reto-semana');
    for (const c of challenges) {
      expect(c.title.trim().length).toBeGreaterThan(0);
      expect(c.description.trim().length).toBeGreaterThan(0);
    }
  });
});

/* ==========================================================================
 * registry + GameHost: los 12 juegos tienen motor registrado
 * ========================================================================== */

describe('registro de juegos', () => {
  it('hay 12 juegos con ids únicos y motores registrados', () => {
    expect(GAMES).toHaveLength(12);
    expectUniqueIds(GAMES, 'registry');
    for (const g of GAMES) {
      expect(g.title.trim().length, `${g.id}: título`).toBeGreaterThan(0);
      expect(g.description.trim().length, `${g.id}: descripción`).toBeGreaterThan(0);
      expect(
        ENGINE_COMPONENTS[g.engine],
        `${g.id}: falta el motor «${g.engine}» en ENGINE_COMPONENTS`,
      ).toBeDefined();
    }
  });

  it('los iconos del catálogo existen en lucide-react', () => {
    expectIconsExist(GAMES.map((g) => g.icon), 'registry');
  });
});
