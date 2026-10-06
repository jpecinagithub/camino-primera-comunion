# Camino a la Primera Comunión

Web app educativa (nombre provisional "Camino a la Primera Comunión") que acompaña
a niños de unos 9 años en la catequesis de preparación para la Primera Comunión
en España. Herramienta **complementaria**: no sustituye a la parroquia, al
catequista ni al catecismo oficial.

- **Modo Niños**: Mi Camino (10 núcleos), Jugar (12 minijuegos), Orar, Mi
  Primera Comunión; lecciones interactivas Descubre → Escucha → Juega →
  Piensa → Reza → En familia → Comprueba; Misa paso a paso con modo ensayo;
  módulo de Primera Reconciliación con simulación didáctica.
- **Modo Padres**: qué está aprendiendo mi hijo (1 min / 5 min por tema),
  "Hablemos en casa", Guía de Primera Comunión, FAQ pastoral, Recursos,
  Privacidad.

Todo el contenido es **original en español**, redactado para este proyecto e
inspirado en el itinerario de "Jesús es el Señor" (CEE). La app **no** es
oficial de la Conferencia Episcopal Española (ver aviso en "Acerca de").

## Stack

Vite + React + TypeScript (strict) + React Router · `vite-plugin-pwa`
(manifest, iconos 192/512 + maskable, service worker offline-first) ·
Dexie (IndexedDB, todo local) · Zod (validación del modelo de datos) ·
Lucide React · Framer Motion (puntual) · react-i18next (solo `es`) ·
@vercel/analytics (eventos genéricos). Sin backend, sin cuentas, sin IA.

## Instalación y desarrollo

```bash
npm install
npm run dev        # servidor de desarrollo
npm run typecheck  # tsc --noEmit -p tsconfig.app.json (¡importante! el tsc
                   # del raíz es solution-style y no comprueba nada)
npm test           # vitest run
npm run build      # build de producción + PWA en dist/
npm run preview    # servir el build
```

> ⚠️ Lección aprendida en este workspace: verifica siempre con
> `npx tsc --noEmit -p tsconfig.app.json`. `npx tsc --noEmit` a secas
> sale con 0 errores sin comprobar ningún fichero.

## Arquitectura

```
src/
├── data/           model.ts (tipos) · schemas.ts (Zod) · nuclei.ts (10 núcleos)
│   ├── lessons/    15 lecciones (un fichero por lección) + part1/2 + index.ts
│   ├── misa.ts     24 momentos de la Misa · oraciones.ts · juegos.ts
│   └── padres/     faq.ts · guia.ts · recursos.ts
├── games/          types.ts · registry.ts · GameHost.tsx
│   ├── engines/    12 motores reutilizables (GameEngineProps<TConfig>)
│   └── data/       datos de cada juego
├── routes/         ninos/ (12 pantallas) · padres/ (8 pantallas) · misc.tsx
├── db/             Dexie (lessons, games, quizzes, nuclei, profile) + hooks
├── gamification/   estrellas, vitral, jardín, huellas, insignias (derivado)
├── components/     Button, Card, Badge, ProgressBar, AppShell, ErrorBoundary…
├── a11y/           ReadAloud (SpeechSynthesis), useReducedMotion, LiveRegion
├── styles/         tokens.css (design tokens, contraste AA verificado)
└── analytics.ts    eventos genéricos (nunca apodo ni datos personales)
```

Separación UI / lógica / contenido / datos: el contenido vive en `src/data`
como objetos `Lesson` validados con Zod, nunca incrustado en JSX.

## PWA

`vite-plugin-pwa` con `registerType: 'autoUpdate'`, `navigateFallback` para
navegación offline, precache del shell (37 entradas) y runtime caching de
contenidos. Sin conexión se muestra "Estás sin conexión. Puedes seguir
aprendiendo." Iconos generados con `tools/generate_icons.py`.

## Privacidad infantil (privacy by design)

- Solo se guarda en local: apodo **ficticio**, avatar elegido, progreso.
- Nunca se pide ni se guarda: nombre real, apellidos, dirección, ubicación,
  colegio, parroquia, teléfono, email, fotografía, fecha de nacimiento.
- La simulación "¿Qué ocurrirá cuando vaya a confesarme?" es didáctica: no
  pide ni almacena nada de conciencia (sin inputs de texto libre).
- Sin cuentas, sin chat, sin rankings, sin publicidad. Analytics solo con
  eventos genéricos (`lesson_opened`, `game_started`, `game_completed`,
  `parent_area_opened`, `pwa_installed`).

## Cómo añadir una lección

1. Crea `src/data/lessons/mi-leccion.ts` con `export const lessonMiLeccion: Lesson`
   (ver `src/data/model.ts`; usa `import type`).
2. Incluye `blocks` (kinds `descubre|escucha|piensa|reza`), `gameIds` (ids del
   catálogo de `src/games/registry.ts`), `quiz` (3–5 preguntas con `hint` y
   `explanation`), `prayer`, `family` y `parentNotes` completo.
3. Añádela al array correspondiente (`part1.ts`/`part2.ts` o uno nuevo);
   `src/data/lessons/index.ts` la incluye en `LESSONS` automáticamente.
4. Valídala: `validateLesson(leccion)` y añade un test en `__tests__/`.
5. Aparecerá automáticamente en Mi Camino, Orar y la zona de padres.

## Cómo añadir un juego

1. Crea el motor en `src/games/engines/mi-juego.tsx` recibiendo
   `GameEngineProps<MiConfig>`; llama `onComplete({score, total})` una vez.
2. Interacción: botones reales (tap-para-seleccionar + tap-en-destino),
   targets ≥44px, feedback amable ("Casi. Mira esta pista y prueba otra vez."),
   sin temporizadores ni presión. Nunca exigir solo-drag.
3. Pon sus datos en `src/games/data/mi-juego.ts`.
4. Regístralo en `GAMES` (`src/games/registry.ts`) y en `ENGINE_COMPONENTS`
   (`src/games/GameHost.tsx`). Aparecerá en "Jugar".

## Despliegue en Vercel

1. Sube el repo a GitHub (el import en Vercel lo hace el usuario desde el
   dashboard, seleccionando su equipo).
2. Framework preset: **Vite**. Build command: `npm run build`. Output: `dist/`.
3. La PWA funciona servida por HTTPS; el service worker se genera en el build.

## Estado del MVP

- 15 lecciones completas (62 preguntas de quiz), 12 motores de juego, 10
  núcleos (el núcleo 10 aún sin lecciones: se muestra como "Próximamente").
- Typecheck 0 errores · 80 tests Vitest en verde · `npm run build` verde.
- Ver `docs/content-sources.md` para las fuentes.
