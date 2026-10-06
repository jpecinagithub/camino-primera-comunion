/**
 * App — router principal con code splitting por área.
 * ErrorBoundary envuelve todo el router. <Analytics /> de Vercel.
 */
import { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoadingState } from './components/LoadingState';
import { AppShell } from './components/AppShell';
import { ModeGate } from './components/ModeGate';

// Code splitting: un chunk por área (misc / ninos / padres).
const Splash = lazy(() => import('./routes/misc').then((m) => ({ default: m.Splash })));
const Selector = lazy(() => import('./routes/misc').then((m) => ({ default: m.Selector })));
const Acerca = lazy(() => import('./routes/misc').then((m) => ({ default: m.Acerca })));
const OfflinePage = lazy(() =>
  import('./routes/misc').then((m) => ({ default: m.OfflinePage })),
);
const NotFound = lazy(() => import('./routes/misc').then((m) => ({ default: m.NotFound })));
const Bienvenida = lazy(() =>
  import('./routes/bienvenida').then((m) => ({ default: m.Bienvenida })),
);
const AnoLiturgico = lazy(() =>
  import('./routes/ano-liturgico').then((m) => ({ default: m.AnoLiturgico })),
);

const NinosHome = lazy(() => import('./routes/ninos').then((m) => ({ default: m.NinosHome })));
const Camino = lazy(() => import('./routes/ninos').then((m) => ({ default: m.Camino })));
const Nucleo = lazy(() => import('./routes/ninos').then((m) => ({ default: m.Nucleo })));
const Leccion = lazy(() => import('./routes/ninos').then((m) => ({ default: m.Leccion })));
const Jugar = lazy(() => import('./routes/ninos').then((m) => ({ default: m.Jugar })));
const Juego = lazy(() => import('./routes/ninos').then((m) => ({ default: m.Juego })));
const Orar = lazy(() => import('./routes/ninos').then((m) => ({ default: m.Orar })));
const Misa = lazy(() => import('./routes/ninos').then((m) => ({ default: m.Misa })));
const Reconciliacion = lazy(() =>
  import('./routes/ninos').then((m) => ({ default: m.Reconciliacion })),
);
const MiComunion = lazy(() =>
  import('./routes/ninos').then((m) => ({ default: m.MiComunion })),
);
const Avatar = lazy(() => import('./routes/ninos').then((m) => ({ default: m.Avatar })));
const Progreso = lazy(() => import('./routes/ninos').then((m) => ({ default: m.Progreso })));

const PadresHome = lazy(() =>
  import('./routes/padres').then((m) => ({ default: m.PadresHome })),
);
const Tema = lazy(() => import('./routes/padres').then((m) => ({ default: m.Tema })));
const Actividades = lazy(() =>
  import('./routes/padres').then((m) => ({ default: m.Actividades })),
);
const Guia = lazy(() => import('./routes/padres').then((m) => ({ default: m.Guia })));
const Faq = lazy(() => import('./routes/padres').then((m) => ({ default: m.Faq })));
const Recursos = lazy(() =>
  import('./routes/padres').then((m) => ({ default: m.Recursos })),
);
const Privacidad = lazy(() =>
  import('./routes/padres').then((m) => ({ default: m.Privacidad })),
);

function ShellWithBack() {
  return <AppShell showBack />;
}

const router = createBrowserRouter([
  { path: '/', element: <Splash /> },
  { path: '/selector', element: <Selector /> },
  { path: '/bienvenida', element: <Bienvenida /> },
  {
    path: '/ninos',
    element: (
      <ModeGate mode="ninos">
        <AppShell />
      </ModeGate>
    ),
    children: [
      { index: true, element: <NinosHome /> },
      { path: 'camino', element: <Camino /> },
      { path: 'nucleo/:id', element: <Nucleo /> },
      { path: 'leccion/:slug', element: <Leccion /> },
      { path: 'jugar', element: <Jugar /> },
      { path: 'juego/:id', element: <Juego /> },
      { path: 'orar', element: <Orar /> },
      { path: 'misa', element: <Misa /> },
      { path: 'reconciliacion', element: <Reconciliacion /> },
      { path: 'mi-comunion', element: <MiComunion /> },
      { path: 'avatar', element: <Avatar /> },
      { path: 'progreso', element: <Progreso /> },
      { path: 'ano-liturgico', element: <AnoLiturgico /> },
    ],
  },
  {
    path: '/padres',
    element: (
      <ModeGate mode="padres">
        <AppShell />
      </ModeGate>
    ),
    children: [
      { index: true, element: <PadresHome /> },
      { path: 'tema/:nucleusId', element: <Tema /> },
      { path: 'actividades', element: <Actividades /> },
      { path: 'guia', element: <Guia /> },
      { path: 'faq', element: <Faq /> },
      { path: 'recursos', element: <Recursos /> },
      { path: 'privacidad', element: <Privacidad /> },
    ],
  },
  {
    path: '/acerca',
    element: <ShellWithBack />,
    children: [{ index: true, element: <Acerca /> }],
  },
  {
    path: '/offline',
    element: <ShellWithBack />,
    children: [{ index: true, element: <OfflinePage /> }],
  },
  { path: '*', element: <NotFound /> },
]);

// Redirige /index.html (fallback del SW) a la SPA sin romper el historial.
if (window.location.pathname === '/index.html') {
  window.history.replaceState(null, '', '/');
}

export default function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingState />}>
        <RouterProvider router={router} />
      </Suspense>
      <Analytics />
    </ErrorBoundary>
  );
}
