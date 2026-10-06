/**
 * Modo de la app: 'ninos' | 'padres'. Se guarda en localStorage (no es
 * dato personal: solo indica qué sección se está usando).
 * Importar desde: `src/mode.ts`
 */

export type Mode = 'ninos' | 'padres';

const KEY = 'camino:mode';

export function getMode(): Mode | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'ninos' || v === 'padres' ? v : null;
  } catch {
    return null;
  }
}

export function setMode(mode: Mode): void {
  try {
    localStorage.setItem(KEY, mode);
  } catch {
    // almacenamiento no disponible: la app sigue funcionando
  }
}

export function clearMode(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // sin almacenamiento no hay nada que limpiar
  }
}
