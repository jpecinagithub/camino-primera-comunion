# Camino a la Primera Comunión — Contratos de Fase 0

Andamiaje listo. Los equipos de contenido, juegos, niños, padres y polish
trabajan sobre estos contratos **sin cambiarlos sin avisar**.

## Estructura

```
src/
├── main.tsx            # i18n + App + tracking 'appinstalled'
├── App.tsx             # Router (lazy por área) + ErrorBoundary + <Analytics/>
├── mode.ts             # getMode/setMode ('ninos'|'padres', localStorage)
├── i18n.ts             # Solo español ('es'). Claves en src/i18n.ts
├── analytics.ts        # trackLessonOpened, trackGameStarted, trackGameCompleted,
│                       # trackParentAreaOpened, trackPwaInstalled (SIN datos personales)
├── data/
│   ├── model.ts        # TIPOS CANÓNICOS: Lesson, Nucleus, ContentBlock, Quiz…
│   ├── schemas.ts      # Schemas Zod + validateLesson / validateNucleus
│   ├── nuclei.ts       # Los 10 núcleos (ids n1..n10, títulos FIJOS)
│   └── __tests__/schemas.test.ts
├── db/
│   ├── db.ts           # Dexie 'caminoDB': lessons, games, quizzes, nuclei, profile
│   ├── hooks.ts        # useProfile, use*Progress, mark*Complete, saveProfile
│   └── __tests__/progress.test.ts
├── games/
│   ├── types.ts        # GameResult, GameEngineProps, GameMeta (CONTRATO)
│   ├── registry.ts     # GAMES: GameMeta[] (+ getGame)
│   └── GameHost.tsx    # Resuelve engine → persiste con markGameComplete
├── components/         # Button, Card, Badge, ProgressBar, SectionTitle,
│                       # EmptyState, LoadingState, ErrorState, OfflineBanner,
│                       # AppShell, ModeGate, ErrorBoundary (+ CSS por componente)
├── routes/
│   ├── misc.tsx        # Splash, Selector, Acerca, OfflinePage, NotFound
│   ├── ninos.tsx       # 12 pantallas del área de niños (placeholders)
│   ├── padres.tsx      # 7 pantallas del área de padres (placeholders)
│   └── Placeholder.tsx # Pantalla temporal que cada equipo sustituye
└── styles/
    ├── tokens.css      # Variables CSS (paleta, radios, sombras, espaciados)
    └── README.md       # Combinaciones de color APROBADAS (AA verificado)
```

## Reglas para todos los equipos

1. **TypeScript strict.** Verificar SIEMPRE con
   `npm run typecheck` (= `tsc --noEmit -p tsconfig.app.json`).
   El `tsc --noEmit` del raíz NO comprueba nada (solution-style).
2. **Tipos de contenido**: importar de `src/data/model.ts`; validar con
   `validateLesson` / `validateNucleus` antes de integrar.
3. **Juegos**: registrar en `GAMES` (`src/games/registry.ts`), implementar
   `GameEngineProps` y llamar `onComplete({score, total})` una vez.
   El `GameHost` ya persiste el resultado. Registrar el motor en
   `ENGINE_COMPONENTS` (`src/games/GameHost.tsx`).
4. **Progreso**: usar los hooks de `src/db/hooks.ts`. No crear otras tablas
   sin avisar (migraciones Dexie).
5. **Colores**: solo combinaciones de `src/styles/README.md`. Texto normal
   ≥ 4.5:1. Los claros (`sky/green/gold/coral`) no llevan texto blanco.
6. **Táctil**: controles ≥ 44px (`Button` ya cumple: 48px). Máx 3-5 acciones
   por pantalla. Icono + texto siempre.
7. **Privacidad infantil**: solo apodo ficticio + avatar local (tabla
   `profile`). Analytics NUNCA lleva apodo ni datos personales.
8. **Rutas**: están todas creadas en `App.tsx` con lazy loading. Sustituir
   los `Placeholder` manteniendo el nombre del export.
9. **PWA**: iconos en `public/icons/`, manifest en `vite.config.ts`,
   offline-first (precache + navigateFallback a /index.html).
10. **i18n**: `useTranslation()` con claves existentes; solo 'es'.

## Comandos

- `npm run dev` · `npm run typecheck` · `npm test` (`vitest run`) · `npm run build`
- Iconos: `python3 tools/generate_icons.py`
