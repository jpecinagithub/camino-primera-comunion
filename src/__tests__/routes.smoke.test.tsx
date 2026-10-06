/**
 * Smoke test de rutas — Camino a la Primera Comunión
 * ----------------------------------------------------------------------------
 * Renderiza las pantallas principales en jsdom (con fake-indexeddb) y
 * verifica que cada ruta produce contenido real y no provoca errores de
 * consola. Es el sustituto automatizado de la pasada visual con navegador.
 */
import 'fake-indexeddb/auto';
import '../i18n';
import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { setMode } from '../mode';
import { AppShell } from '../components/AppShell';
import { ModeGate } from '../components/ModeGate';
import { ErrorBoundary } from '../components/ErrorBoundary';
import {
  NinosHome,
  Camino,
  Nucleo,
  Leccion,
  Jugar,
  Juego,
  Orar,
  Misa,
  Reconciliacion,
  MiComunion,
  Avatar,
  Progreso,
} from '../routes/ninos';
import {
  PadresHome,
  Tema,
  Actividades,
  Guia,
  Faq,
  Recursos,
  Privacidad,
} from '../routes/padres';
import { Splash, Selector, Acerca, OfflinePage, NotFound } from '../routes/misc';
import { Bienvenida } from '../routes/bienvenida';
import { AnoLiturgico } from '../routes/ano-liturgico';


const routes = [
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
  { path: '/acerca', element: <Acerca /> },
  { path: '/offline', element: <OfflinePage /> },
  { path: '*', element: <NotFound /> },
];

interface Case {
  path: string;
  mode: 'ninos' | 'padres' | null;
  /** Fragmento de texto que debe aparecer (prueba de contenido real). */
  contains: string;
  /** Longitud mínima de texto (las páginas muy visuales tienen menos texto). */
  minLength?: number;
  /** Etiqueta esperada del botón volver contextual (pantallas anidadas). */
  backLabel?: string;
}

const CASES: Case[] = [
  { path: '/', mode: null, contains: 'Comunión', minLength: 20 },
  { path: '/selector', mode: null, contains: 'niño', minLength: 40 },
  { path: '/ninos', mode: 'ninos', contains: 'Mi Camino' },
  { path: '/ninos/camino', mode: 'ninos', contains: 'Iglesia', backLabel: 'Inicio' },
  { path: '/ninos/nucleo/n1', mode: 'ninos', contains: 'cristianos', backLabel: 'Mi Camino' },
  { path: '/ninos/leccion/ser-cristiano', mode: 'ninos', contains: 'cristiano', backLabel: 'El núcleo' },
  { path: '/ninos/jugar', mode: 'ninos', contains: 'Jugar', backLabel: 'Inicio' },
  { path: '/ninos/juego/memory', mode: 'ninos', contains: 'parejas', backLabel: 'Jugar' },
  { path: '/ninos/orar', mode: 'ninos', contains: 'Orar', backLabel: 'Inicio' },
  { path: '/ninos/misa', mode: 'ninos', contains: 'Misa', backLabel: 'Mi Primera Comunión' },
  { path: '/ninos/reconciliacion', mode: 'ninos', contains: 'reconcili', backLabel: 'Mi Primera Comunión' },
  { path: '/ninos/mi-comunion', mode: 'ninos', contains: 'Comunión', backLabel: 'Inicio' },
  { path: '/ninos/avatar', mode: 'ninos', contains: 'avatar', backLabel: 'Inicio' },
  { path: '/ninos/progreso', mode: 'ninos', contains: 'progreso', backLabel: 'Inicio' },
  { path: '/ninos/ano-liturgico', mode: 'ninos', contains: 'Pascua', minLength: 100, backLabel: 'Inicio' },
  { path: '/padres', mode: 'padres', contains: 'padres' },
  { path: '/padres/tema/n1', mode: 'padres', contains: 'cristianos', backLabel: 'Inicio de padres' },
  { path: '/padres/actividades', mode: 'padres', contains: 'familia', backLabel: 'Inicio de padres' },
  { path: '/padres/guia', mode: 'padres', contains: 'Comunión', backLabel: 'Inicio de padres' },
  { path: '/padres/faq', mode: 'padres', contains: 'Misa', backLabel: 'Inicio de padres' },
  { path: '/padres/recursos', mode: 'padres', contains: 'Recursos', backLabel: 'Inicio de padres' },
  { path: '/padres/privacidad', mode: 'padres', contains: 'privacidad', backLabel: 'Inicio de padres' },
  { path: '/acerca', mode: null, contains: 'Conferencia Episcopal' },
  { path: '/ruta-que-no-existe', mode: null, contains: 'camino', minLength: 30 },
];

describe('smoke de rutas', () => {
  let container: HTMLDivElement;
  let root: Root | null = null;
  let consoleError: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    localStorage.clear();
    container = document.createElement('div');
    document.body.appendChild(container);
    consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(async () => {
    consoleError.mockRestore();
    if (root) {
      await act(async () => {
        root!.unmount();
      });
      root = null;
    }
    container.remove();
  });

  for (const c of CASES) {
    it(`renderiza ${c.path} con contenido real`, async () => {
      if (c.mode) setMode(c.mode);
      const router = createMemoryRouter(routes, { initialEntries: [c.path] });
      await act(async () => {
        root = createRoot(container);
        root.render(
          <ErrorBoundary>
            <RouterProvider router={router} />
          </ErrorBoundary>,
        );
        // Deja que efectos asíncronos (Dexie, datos) se asienten.
        await new Promise((r) => setTimeout(r, 400));
      });
      const text = container.textContent ?? '';
      const minLength = c.minLength ?? 150;
      expect(
        text.length,
        `la ruta ${c.path} no renderizó contenido (texto vacío)`,
      ).toBeGreaterThan(minLength);
      expect(
        text.toLowerCase(),
        `la ruta ${c.path} no contiene «${c.contains}»`,
      ).toContain(c.contains.toLowerCase());
      const reactErrors = consoleError.mock.calls.filter((call: unknown[]) =>
        String(call[0]).match(/Error|error|Warning: /),
      );
      expect(
        reactErrors,
        `errores de consola en ${c.path}: ${reactErrors.map((call: unknown[]) => String(call[0]).slice(0, 120)).join(' | ')}`,
      ).toHaveLength(0);
      if (c.backLabel) {
        const backBtn = container.querySelector('.app-shell__back');
        expect(
          backBtn,
          `la ruta ${c.path} no muestra botón volver contextual`,
        ).not.toBeNull();
        expect(
          backBtn!.textContent ?? '',
          `el botón volver de ${c.path} no lleva la etiqueta «${c.backLabel}»`,
        ).toContain(c.backLabel);
      }
    });
  }
});
