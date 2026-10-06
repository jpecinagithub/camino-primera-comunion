# Design tokens — combinaciones de color aprobadas

Paleta cálida (crema, azul cielo, verde suave, dorado tenue, coral).
**Regla de oro:** los colores claros (`sky`, `green`, `gold`, `coral`) son
**decorativos / fondos suaves**: nunca llevan texto encima salvo `--color-ink`,
que sí contrasta sobre ellos.

## Combinaciones APROBADAS (WCAG AA, texto normal ≥ 4.5:1)

Ratios verificados por cálculo el 2026-10-06:

| Texto | Fondo | Ratio | Uso |
|---|---|---|---|
| `--color-ink` `#3A2E1F` | `--color-cream` `#FDF6E9` | 12.28:1 | Texto principal |
| `--color-ink-soft` `#6B5B45` | `--color-cream` `#FDF6E9` | 6.09:1 | Texto secundario |
| blanco `#FFFFFF` | `--color-sky-dark` `#1E6FA8` | 5.39:1 | Botones/encabezados azules |
| blanco `#FFFFFF` | `--color-green-dark` `#2E7D4F` | 5.05:1 | Botones/encabezados verdes |
| blanco `#FFFFFF` | `--color-gold-dark` `#8A6410` | 5.37:1 | Botones/encabezados dorados |
| blanco `#FFFFFF` | `--color-coral-dark` `#C0392B` | 5.44:1 | Botones/acentos coral |
| `--color-ink` | `--color-sky` `#BFE3F7` | 9.77:1 | Tarjetas azules claras |
| `--color-ink` | `--color-green` `#CDEAC0` | 10.14:1 | Tarjetas verdes claras |
| `--color-ink` | `--color-gold` `#EFD9A0` | 9.50:1 | Tarjetas doradas claras |
| `--color-ink` | `--color-coral` `#F6A08C` | 6.49:1 | Tarjetas coral claras |
| `--color-sky-dark` | `--color-cream` | 5.02:1 | Enlaces/texto destacado azul |
| `--color-gold-dark` | `--color-cream` | 5.00:1 | Texto destacado dorado |

## Combinaciones PROHIBIDAS

- Texto blanco sobre `sky`, `green`, `gold`, `coral` (claros) → no llega a AA.
- Texto `ink-soft` sobre fondos claros que no sean `cream` → verificar antes de usar.
- Cualquier texto sobre imágenes sin velo oscuro que garantice el contraste.

## Notas para los equipos

- `--touch-min: 44px` es el alto mínimo de cualquier control táctil.
- El anillo de foco (`--focus-ring`) es obligatorio en todos los
  interactivos; no lo quites con `outline: none` sin sustituto.
- `prefers-reduced-motion`: las animaciones se desactivan en
  `src/index.css`; no añadas animaciones esenciales solo con movimiento.
