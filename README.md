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

## Navegación

Mapa central en `src/navigation.ts` (`getBackTarget`, `getBreadcrumbs`):
- **Botón "volver" contextual** en todas las pantallas anidadas
  ("← {etiqueta}" con navegación directa, sin depender del historial).
- **Migas de pan** bajo la cabecera en pantallas de profundidad ≥ 3
  (lección, núcleo, juego, tema de padres).
- **Cambio de modo visible** en la cabecera: "Soy padre o madre" ⇄
  "Soy niño o niña" (el logo-iglesia ya no es la única vía).
- Sin callejones sin salida: fin de lección (Continuar mi camino / Ver mi
  núcleo / Jugar) y fin de juego (Repetir / Jugar a otro juego / Volver al
  camino). Detalle completo en [`docs/navigation.md`](docs/navigation.md).

## PWA

`vite-plugin-pwa` con `registerType: 'autoUpdate'`, `navigateFallback` para
navegación offline, precache del shell y runtime caching de contenidos. Sin
conexión se muestra "Estás sin conexión. Puedes seguir aprendiendo." Iconos
generados con `tools/generate_icons.py`. Los MP3 de narración
(`public/audio/*.mp3`) también quedan precacheados: el niño escucha sin conexión.

## Audios de narración

Todas las narraciones de la zona de niños se **pre-generan en tiempo de
autoría** como MP3 y se sirven con el reproductor propio `AudioPlayer`
(`src/components/AudioPlayer.tsx`): sin IA en runtime, contenido determinista
y revisable, funciona offline. El botón "Leer en voz alta" (SpeechSynthesis)
queda solo como reserva donde no exista audio pre-generado (zona de padres).

Inventario completo (213 ficheros, `public/audio/`):

| Prefijo | Contenido | Nº |
|---|---|---|
| `escucha-<slug>.mp3` | Bloques `escucha` de las lecciones | 17 |
| `oracion-<id>.mp3` | Oraciones de lección + fundamentales | 19 |
| `bloque-<id>.mp3` | Bloques `descubre` / `piensa` / `reza` | 61 |
| `familia-<slug>.mp3` | Paso "En familia" de cada lección | 15 |
| `quiz-<slug>-<n>.mp3` | Cada pregunta del quiz con sus opciones | 62 |
| `misa-<nn>.mp3` | Cada momento de la Misa (01–24) | 24 |
| `reconciliacion-paso-<n>.mp3` | Simulación "¿Qué ocurrirá cuando vaya a confesarme?" | 8 |
| `ano-<id>.mp3` | Tiempos del año litúrgico | 6 |
| `paso-juega.mp3` | Paso estático "Es hora de jugar" | 1 |

El botón "Escuchar todo el recorrido" de la Misa reproduce los 24 momentos
**en secuencia** (playlist con el evento `ended`), no un audio gigante.

- Voz elegida por el usuario (2026-10-06): **"Vivacious Fountain"**
  (`avocado_v2:vd2_r8_rep5k_2623_v068_28k_g5k`), femenina, español peninsular,
  joven y alegre; idioma `es_ES`.
- Groq TTS se descartó: verificado en su documentación oficial, solo ofrece
  inglés y árabe, sin español.
- Generar: `node tools/generate-audio.mjs` (idempotente; `--force` regenera,
  `--inventory` muestra el manifiesto sin generar). Guarda en `public/audio/`
  y registra el manifiesto en `tools/audio-manifest.json`. Después, ejecuta
  `node tools/apply-audio-src.mjs` para rellenar los campos `audioSrc` en los
  datos (`ContentBlock`, `QuizQuestion`, `FamilyBlock`, `Prayer`,
  `MomentoMisa`, pasos de Reconciliación y tiempos del año litúrgico).
- Si añades una lección con bloques nuevos, genera sus audios y añade el
  campo `audioSrc` correspondiente en los datos.
- Nota técnica (2026-10-06): los caracteres `·` `•` `▪` **rompen el backend
  TTS** (devuelve audio vacío/truncado). `sanitizeSpoken()` en
  `tools/generate-audio.mjs` los elimina de todo texto enviado al CLI,
  incluidos los títulos. No envíes nunca esos caracteres al TTS.

## Progreso: qué se guarda y dónde

Todo el progreso vive en **IndexedDB local** (Dexie, base `caminoDB`),
sin cuentas y sin datos personales. Tablas:

| Tabla      | Clave        | Qué guarda                                              |
|------------|--------------|---------------------------------------------------------|
| `lessons`  | `id`         | Lecciones completadas (`completedAt`). Regla pedagógica: una lección solo se marca al **terminar su quiz**. |
| `quizzes`  | `id`         | Resultado de cada quiz (`score`, `total`).              |
| `games`    | `id`         | Juegos completados (`score`, `total`).                  |
| `nuclei`   | `id`         | Núcleos completados.                                    |
| `resume`   | `lessonSlug` | **Punto de reanudación exacto**: `{ stepIndex, updatedAt }`. Se guarda con debounce de 500 ms cada vez que el niño cambia de paso en el player de lección. |
| `listened` | `audioId`    | **Audios escuchados hasta el final** (`listenedAt`, idempotente). El `audioId` es el nombre del fichero sin extensión (p. ej. `escucha-ser-cristiano`), derivado con `audioIdFromSrc()`. |
| `profile`  | `'profile'`  | Apodo ficticio + avatar.                                |

**Continuidad (2026-10-06):**
- Al abrir una lección con `resume`, se reanuda en el paso exacto con el
  aviso «Seguimos donde lo dejaste · Paso X de Y» y la opción
  «Empezar desde el principio» (limpia el `resume`).
- «Continuar mi camino» lleva al paso exacto si hay `resume` pendiente;
  el botón muestra «Continuar: {título} · Paso X de Y».
- Al completar la lección (quiz terminado), el `resume` se borra.
- Lección con `resume` pero sin completar → estado **«En curso»**
  (distinto de «¡Hecha!»): sello dorado en la tarjeta del Núcleo y
  mención «En curso» en Mi Camino.
- `AudioPlayer` acepta `audioId` (por defecto, derivado del `src`) y al
  evento `ended` llama a `markListened()`. Muestra la píldora
  «✓ Escuchado» cuando el audio consta; también la lista de Oraciones
  (check «Escuchada») y la playlist de la Misa registran cada momento.
- Pantalla **Mi progreso**: contadores grandes (lecciones X/15, juegos
  X/12, audios escuchados), barras por núcleo, estrellas, vitral y jardín.
- Tarjetas de juegos: sello verde «¡Jugado!» con check cuando el juego
  consta en `games`.

**Nota de tests (2026-10-06):** `src/__tests__/flujo-progreso.test.tsx`
cubre el flujo completo (resume → reanudar → quiz → ¡Hecha!, ¡Jugado!,
escuchado). Patrón obligatorio en este repo con React 19 + jsdom:
montajes con `createRoot`+`render()` **sin** `act()` (un segundo
`await act(async …)` en el mismo test se cuelga), eventos y unmount con
`act(() => …)` síncrono, y esperas con sondeo fuera de `act()`.

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
5. Genera los audios de sus bloques, paso "En familia", quiz y oración:
   `node tools/generate-audio.mjs` y luego `node tools/apply-audio-src.mjs`
   (rellena `audioSrc` en los datos).
6. Aparecerá automáticamente en Mi Camino, Orar y la zona de padres.

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
