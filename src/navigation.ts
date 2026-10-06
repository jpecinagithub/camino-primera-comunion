/**
 * navigation — mapa central de navegación.
 * ----------------------------------------------------------------------------
 * `getBackTarget(pathname)` devuelve el destino del botón "volver"
 * contextual de AppShell: `{ to, label }`, o `null` en las pantallas raíz
 * (/, /selector, /ninos, /padres), que no llevan volver.
 *
 * `getBreadcrumbs(pathname)` devuelve las migas de pan para las pantallas
 * de profundidad ≥ 3 segmentos (lección, núcleo, juego, tema de padres).
 * Devuelve `null` si la ruta no tiene migas o si el segmento dinámico no
 * existe en los datos.
 *
 * Los títulos de segmentos dinámicos se resuelven desde los datos
 * (lecciones, juegos, núcleos); las etiquetas estáticas están en español.
 * Importar desde: `src/navigation.ts`
 */
import { getLessonBySlug } from './data/lessons';
import { getGame } from './games/registry';
import { getNucleus } from './data/nuclei';
import { getMode } from './mode';

/** Destino del botón "volver": ruta + etiqueta legible. */
export interface BackTarget {
  /** Ruta a la que navega (navegación directa, sin depender del historial). */
  to: string;
  /** Etiqueta visible del botón: "← {label}". */
  label: string;
}

/** Una miga de pan. Solo la última (página actual) puede omitir `to`. */
export interface Crumb {
  label: string;
  to?: string;
}

const INICIO: BackTarget = { to: '/ninos', label: 'Inicio' };
const MI_CAMINO: BackTarget = { to: '/ninos/camino', label: 'Mi Camino' };
const PADRES_HOME: BackTarget = { to: '/padres', label: 'Inicio de padres' };

/** Destino de /acerca y /offline: el inicio del modo activo, o el selector. */
function modeHomeTarget(): BackTarget {
  const mode = getMode();
  if (mode === 'padres') return PADRES_HOME;
  if (mode === 'ninos') return INICIO;
  return { to: '/selector', label: 'Cambiar de modo' };
}

/**
 * Destino del botón "volver" para un pathname.
 * Las pantallas raíz (/, /selector, /bienvenida, /ninos, /padres) → null.
 */
export function getBackTarget(pathname: string): BackTarget | null {
  let m: RegExpMatchArray | null;

  // Raíces: sin botón volver.
  if (
    pathname === '/' ||
    pathname === '/selector' ||
    pathname === '/bienvenida' ||
    pathname === '/ninos' ||
    pathname === '/padres'
  ) {
    return null;
  }

  // --- Zona de niños ---
  if (pathname === '/ninos/camino') return INICIO;
  if (/^\/ninos\/nucleo\/[^/]+$/.test(pathname)) return MI_CAMINO;
  if ((m = pathname.match(/^\/ninos\/leccion\/([^/]+)$/))) {
    const lesson = getLessonBySlug(decodeURIComponent(m[1]));
    return lesson
      ? { to: `/ninos/nucleo/${lesson.nucleusId}`, label: 'El núcleo' }
      : MI_CAMINO; // slug desconocido: al menos salir de la lección rota
  }
  if (pathname === '/ninos/jugar') return INICIO;
  if (/^\/ninos\/juego\/[^/]+$/.test(pathname))
    return { to: '/ninos/jugar', label: 'Jugar' };
  if (pathname === '/ninos/orar') return INICIO;
  if (pathname === '/ninos/misa' || pathname === '/ninos/reconciliacion')
    return { to: '/ninos/mi-comunion', label: 'Mi Primera Comunión' };
  if (
    pathname === '/ninos/mi-comunion' ||
    pathname === '/ninos/avatar' ||
    pathname === '/ninos/progreso' ||
    pathname === '/ninos/ano-liturgico'
  ) {
    return INICIO;
  }

  // --- Zona de padres ---
  if (pathname.startsWith('/padres/')) return PADRES_HOME;

  // --- Páginas sueltas ---
  if (pathname === '/acerca' || pathname === '/offline') {
    return modeHomeTarget();
  }

  // Ruta no contemplada: sin destino seguro (AppShell usa showBack/historial).
  return null;
}

/**
 * Migas de pan para pantallas de profundidad ≥ 3.
 * `/ninos/leccion/:slug` → Mi Camino › {núcleo} › {lección}
 * `/ninos/nucleo/:id`   → Mi Camino › {núcleo}
 * `/ninos/juego/:id`    → Jugar › {juego}
 * `/padres/tema/:id`    → Padres › {núcleo}
 */
export function getBreadcrumbs(pathname: string): Crumb[] | null {
  let m: RegExpMatchArray | null;

  if ((m = pathname.match(/^\/ninos\/leccion\/([^/]+)$/))) {
    const lesson = getLessonBySlug(decodeURIComponent(m[1]));
    if (!lesson) return null;
    const nucleus = getNucleus(lesson.nucleusId);
    return [
      { label: 'Mi Camino', to: '/ninos/camino' },
      {
        label: nucleus?.title ?? 'El núcleo',
        to: `/ninos/nucleo/${lesson.nucleusId}`,
      },
      { label: lesson.title },
    ];
  }

  if ((m = pathname.match(/^\/ninos\/nucleo\/([^/]+)$/))) {
    const nucleus = getNucleus(decodeURIComponent(m[1]));
    if (!nucleus) return null;
    return [{ label: 'Mi Camino', to: '/ninos/camino' }, { label: nucleus.title }];
  }

  if ((m = pathname.match(/^\/ninos\/juego\/([^/]+)$/))) {
    const game = getGame(decodeURIComponent(m[1]));
    if (!game) return null;
    return [{ label: 'Jugar', to: '/ninos/jugar' }, { label: game.title }];
  }

  if ((m = pathname.match(/^\/padres\/tema\/([^/]+)$/))) {
    const nucleus = getNucleus(decodeURIComponent(m[1]));
    if (!nucleus) return null;
    return [{ label: 'Padres', to: '/padres' }, { label: nucleus.title }];
  }

  return null;
}
