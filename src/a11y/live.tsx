/**
 * live — LiveRegion para anunciar feedback de juegos y quizzes.
 * ----------------------------------------------------------------------------
 * aria-live="polite": los lectores de pantalla anuncian el mensaje sin
 * interrumpir. Importar desde: `src/a11y/live.tsx`
 */

export interface LiveRegionProps {
  /** Mensaje anunciado. Al cambiar, el lector lo vuelve a anunciar. */
  message: string;
}

export function LiveRegion({ message }: LiveRegionProps) {
  return (
    <p className="sr-only" aria-live="polite" role="status">
      {message}
    </p>
  );
}
