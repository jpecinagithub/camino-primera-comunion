# Navegación — mapa de la app

Fuente de verdad: `src/navigation.ts` (`getBackTarget`, `getBreadcrumbs`).
La cabecera (`src/components/AppShell.tsx`) lo consume en cada render:
botón "← {etiqueta}" con navegación directa al destino (sin depender del
historial) y migas de pan bajo la cabecera en pantallas de profundidad ≥ 3.

## Botón "volver" contextual (ruta → destino + etiqueta)

| Ruta | Destino del volver | Etiqueta |
|---|---|---|
| `/` | — (raíz, sin volver) | — |
| `/selector` | — (raíz, sin volver) | — |
| `/bienvenida` | — (raíz, sin volver) | — |
| `/ninos` | — (raíz, sin volver) | — |
| `/ninos/camino` | `/ninos` | Inicio |
| `/ninos/nucleo/:id` | `/ninos/camino` | Mi Camino |
| `/ninos/leccion/:slug` | `/ninos/nucleo/{nucleusId de la lección}` (slug desconocido → `/ninos/camino`) | El núcleo |
| `/ninos/jugar` | `/ninos` | Inicio |
| `/ninos/juego/:id` | `/ninos/jugar` | Jugar |
| `/ninos/orar` | `/ninos` | Inicio |
| `/ninos/misa` | `/ninos/mi-comunion` | Mi Primera Comunión |
| `/ninos/reconciliacion` | `/ninos/mi-comunion` | Mi Primera Comunión |
| `/ninos/mi-comunion` | `/ninos` | Inicio |
| `/ninos/avatar` | `/ninos` | Inicio |
| `/ninos/progreso` | `/ninos` | Inicio |
| `/ninos/ano-liturgico` | `/ninos` | Inicio |
| `/padres` | — (raíz, sin volver) | — |
| `/padres/*` (tema/:id, actividades, guia, faq, recursos, privacidad) | `/padres` | Inicio de padres |
| `/acerca` | modo `ninos` → `/ninos`; modo `padres` → `/padres`; sin modo → `/selector` | Inicio / Inicio de padres / Cambiar de modo |
| `/offline` | igual que `/acerca` | igual que `/acerca` |
| cualquier otra | — (sin destino seguro) | — |

Detalles:
- El volver navega **directo** a `to` (no `navigate(-1)`): funciona aunque se
  entre a una ruta profunda por enlace directo o recarga.
- `navigate(-1)` solo sobrevive como último recurso vía la prop heredada
  `showBack` de AppShell (hoy ninguna ruta la necesita).
- Los segmentos dinámicos se resuelven con los datos reales
  (`getLessonBySlug`, `getGame`, `getNucleus`); si el id no existe, el volver
  cae a un destino seguro (nunca a una pantalla rota).

## Migas de pan (profundidad ≥ 3)

Renderizadas por `Breadcrumbs.tsx` bajo la cabecera, con `aria-current="page"`
en la página actual:

| Ruta | Migas |
|---|---|
| `/ninos/leccion/:slug` | Mi Camino › {título del núcleo} › {título de la lección} |
| `/ninos/nucleo/:id` | Mi Camino › {título del núcleo} |
| `/ninos/juego/:id` | Jugar › {título del juego} |
| `/padres/tema/:id` | Padres › {título del núcleo} |

Decisión de integración: las migas viven en **AppShell** (no al inicio de
cada pantalla) para que sean automáticas y consistentes; los datos
desconocidos devuelven `null` y simplemente no se muestran.

## Flujos de cierre (sin callejones sin salida)

- **Fin de lección** (`Celebracion` en `src/routes/ninos/leccion.tsx`):
  botón principal **"Continuar mi camino"** → `/ninos/camino`, más
  **"Ver mi núcleo"** → `/ninos/nucleo/:id` y **"Jugar"** → `/ninos/jugar`.
- **Fin de juego** (`GameHost` en `src/games/GameHost.tsx`):
  **"Repetir"** (remonta el motor con estado limpio), **"Jugar a otro juego"**
  → `/ninos/jugar`, **"Volver al camino"** → `/ninos/camino`.
  `GameHost` acepta `onExit` y `onGoCamino` opcionales; sin ellos (p. ej.
  el juego "ordena-misa" incrustado en la pantalla Misa) solo muestra "Repetir".
- **"✕ Salir de la lección"** (arriba en el player de lección) → el núcleo de
  la lección. Atrás/Siguiente entre pasos se mantiene como estaba.

## Cambio de modo

Píldora visible en la cabecera (no escondida tras el logo):
- En zona de niños: **"Soy padre o madre"** (icono libro) → `setMode('padres')` + `/padres`.
- En zona de padres: **"Soy niño o niña"** (icono bebé) → `setMode('ninos')` + `/ninos`.
- El logo-iglesia sigue existiendo en las pantallas raíz con
  `aria-label="Cambiar de modo"` (va a `/selector`), pero ya no es la única vía.

## 404

La pantalla NotFound (`src/routes/misc.tsx`) ofrece tres recuperaciones:
**"Zona de niños"** → `/ninos`, **"Zona de padres"** → `/padres`,
**"Cambiar de modo"** → `/selector`. (Sin modo guardado, `/ninos` y
`/padres` redirigen a `/selector` vía ModeGate: siempre hay salida.)

## Accesibilidad y responsive

- Botón volver con etiqueta de texto (no solo icono), `aria-label`
  "Volver a {etiqueta}"; migas con `aria-label="Migas de pan"`.
- Objetivos táctiles ≥ 44px (botón volver, píldora de modo, enlaces de migas).
- A ≤ 480px se oculta el título de la cabecera (cada pantalla ya tiene el
  suyo) y las etiquetas se truncan con ellipsis: caben volver + píldora de
  modo en 360px.
