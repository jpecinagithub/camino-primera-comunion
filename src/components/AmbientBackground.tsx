/**
 * AmbientBackground — fondo ambiental decorativo y muy sutil.
 * ----------------------------------------------------------------------------
 * Tres manchas de degradado radial (cielo, dorado, verde de la paleta) que
 * flotan despacio con animación CSS. position: fixed, pointer-events: none,
 * z-index 0 (el contenido de la app queda por encima), opacidad baja.
 * aria-hidden: puramente decorativo.
 * Con prefers-reduced-motion: reduce → display: none (ver el CSS).
 *
 * INTEGRACIÓN (la hace el coordinador en src/App.tsx):
 *   import { AmbientBackground } from './components/AmbientBackground';
 *   export default function App() {
 *     return (
 *       <ErrorBoundary>
 *         <AmbientBackground />   // fuera del RouterProvider, lo primero
 *         <Suspense fallback={<LoadingState />}>
 *           <RouterProvider router={router} />
 *         </Suspense>
 *         <Analytics />
 *       </ErrorBoundary>
 *     );
 *   }
 * Montarlo fuera del RouterProvider (no depende de la ruta) para que el
 * fondo sea estable entre navegaciones.
 */
import './AmbientBackground.css';

export function AmbientBackground() {
  return (
    <div className="ambient-background" aria-hidden="true">
      <span className="ambient-background__mancha ambient-background__mancha--cielo" />
      <span className="ambient-background__mancha ambient-background__mancha--dorada" />
      <span className="ambient-background__mancha ambient-background__mancha--verde" />
    </div>
  );
}
