/**
 * AnimatedOutlet — transición suave entre páginas del router.
 * ----------------------------------------------------------------------------
 * Envuelve <Outlet/> en AnimatePresence (mode="wait") con un motion.div
 * cuya key es el pathname: cada cambio de ruta sale con fade + leve
 * desplazamiento y entra igual (~0.25s, easeOut).
 *
 * Si el usuario prefiere movimiento reducido (useReducedMotion), renderiza
 * <Outlet/> sin animación ni envoltorio extra.
 *
 * INTEGRACIÓN (la hace el coordinador en src/components/AppShell.tsx):
 *   import { AnimatedOutlet } from './AnimatedOutlet';
 *   ...
 *   <main className="app-shell__main" id="contenido">
 *     <AnimatedOutlet />   // en lugar de <Outlet />
 *   </main>
 * NO sustituyas el <main> de AppShell por este componente: el landmark y el
 * skip-link (#contenido) dependen de él. AnimatedOutlet es solo el contenido
 * animado que vive dentro.
 */
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useReducedMotion } from '../a11y/useReducedMotion';
import './AnimatedOutlet.css';

export function AnimatedOutlet() {
  const location = useLocation();
  const reduced = useReducedMotion();

  if (reduced) {
    return <Outlet />;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        className="animated-outlet"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
}
