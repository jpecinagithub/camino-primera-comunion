/**
 * useReducedMotion — hook que refleja `prefers-reduced-motion: reduce`.
 * ----------------------------------------------------------------------------
 * Combina matchMedia con un listener para reaccionar a cambios en caliente.
 * Los componentes con animación (Framer Motion, Splash, Celebracion…)
 * lo consultan para ofrecer una versión estática de la animación.
 * Importar desde: `src/a11y/useReducedMotion.ts`
 */
import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

function current(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }
  return window.matchMedia(QUERY).matches;
}

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(current);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }
    const mql = window.matchMedia(QUERY);
    const onChange = (event: MediaQueryListEvent): void => {
      setReduced(event.matches);
    };
    setReduced(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
