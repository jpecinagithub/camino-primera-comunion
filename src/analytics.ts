/**
 * Analytics — Camino a la Primera Comunión
 * ----------------------------------------------------------------------------
 * Eventos de uso con @vercel/analytics. REGLA DE PRIVACIDAD INFANTIL:
 * NUNCA se envía el apodo, el avatar ni ningún dato personal. Solo
 * identificadores de contenido (ids de lección, juego, núcleo, área).
 *
 * Importar desde: `src/analytics.ts`
 */
import { track } from '@vercel/analytics';

/** Se abre una lección (id = Lesson.id). */
export function trackLessonOpened(lessonId: string): void {
  track('lesson_opened', { lessonId });
}

/** Se inicia un juego (id = GameMeta.id). */
export function trackGameStarted(gameId: string): void {
  track('game_started', { gameId });
}

/** Se completa un juego. Solo cifras, ningún dato personal. */
export function trackGameCompleted(
  gameId: string,
  score: number,
  total: number,
): void {
  track('game_completed', { gameId, score, total });
}

/** Se abre un área de padres (p. ej. 'guia', 'faq', 'tema'). */
export function trackParentAreaOpened(area: string): void {
  track('parent_area_opened', { area });
}

/** La PWA se instaló (evento 'appinstalled'). Llamar una vez. */
export function trackPwaInstalled(): void {
  track('pwa_installed');
}
