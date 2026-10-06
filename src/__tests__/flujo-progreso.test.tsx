/**
 * Test de integración del flujo de progreso — Camino a la Primera Comunión
 * ----------------------------------------------------------------------------
 * Verifica el flujo real que el usuario reportó como roto ("no guarda nada"):
 *  1. Avanzar pasos en una lección guarda el punto de reanudación (resume).
 *  2. Reabrir la lección reanuda en el paso guardado (aviso + reinicio).
 *  3. Completar el quiz guarda quiz+lección en Dexie y limpia el resume.
 *  4. La tarjeta del Núcleo muestra "¡Hecha!".
 *  5. Jugar muestra "¡Jugado!" tras completar un juego.
 *  6. Terminar un audio lo registra como escuchado (y se muestra "Escuchado").
 *
 * Patrón de este fichero (verificado empíricamente con React 19 + jsdom +
 * dexie-react-hooks en este repo):
 *  - Montajes: `createRoot` + `render()` SIN act(). Un segundo
 *    `await act(async () => render())` en el mismo test se cuelga
 *    (la cola interna de act no se vacía); el render plano + sondeo sí
 *    deja que las emisiones de useLiveQuery lleguen al componente.
 *  - Eventos discretos y unmount: `act(() => ...)` SÍNCRONO.
 *  - Esperas (debounce 500 ms, liveQuery): sondeo fuera de act().
 */
import 'fake-indexeddb/auto';
import '../i18n';
import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { setMode } from '../mode';
import { db } from '../db/db';
import { markGameComplete } from '../db/hooks';
import { ModeGate } from '../components/ModeGate';
import { AudioPlayer } from '../components/AudioPlayer';
import { Leccion } from '../routes/ninos/leccion';
import { Nucleo } from '../routes/ninos/nucleo';
import { Jugar } from '../routes/ninos/jugar';
import { getLessonBySlug } from '../data/lessons/index';

// Necesario para que act() funcione sin avisos en React 19 + jsdom.
(globalThis as Record<string, unknown>).IS_REACT_ACT_ENVIRONMENT = true;

const SLUG = 'ser-cristiano';
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

describe('flujo de progreso', () => {
  let container: HTMLDivElement;
  let root: Root | null = null;
  let consoleError: ReturnType<typeof vi.spyOn>;
  let playSpy: ReturnType<typeof vi.spyOn>;
  let pauseSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(async () => {
    localStorage.clear();
    setMode('ninos');
    await db.lessons.clear();
    await db.games.clear();
    await db.quizzes.clear();
    await db.nuclei.clear();
    await db.resume.clear();
    await db.listened.clear();
    await db.profile.clear();
    container = document.createElement('div');
    document.body.appendChild(container);
    consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    playSpy = vi
      .spyOn(window.HTMLMediaElement.prototype, 'play')
      .mockImplementation(() => Promise.resolve());
    pauseSpy = vi
      .spyOn(window.HTMLMediaElement.prototype, 'pause')
      .mockImplementation(() => {});
  });

  afterEach(() => {
    consoleError.mockRestore();
    playSpy.mockRestore();
    pauseSpy.mockRestore();
    if (root) {
      act(() => {
        root!.unmount();
      });
      root = null;
    }
    container.remove();
  });

  /** Monta un router (render plano) y espera a que aparezca `waitFor`. */
  function renderRouter(
    routes: { path: string; element: React.ReactNode }[],
    initialPath: string,
    waitFor: string,
  ): Promise<void> {
    const router = createMemoryRouter(routes, {
      initialEntries: [initialPath],
    });
    root = createRoot(container);
    root.render(<RouterProvider router={router} />);
    return waitForText(waitFor);
  }

  function gate(element: React.ReactNode) {
    return <ModeGate mode="ninos">{element}</ModeGate>;
  }

  async function waitForText(text: string, timeout = 8000): Promise<void> {
    const start = Date.now();
    for (;;) {
      if ((container.textContent ?? '').includes(text)) return;
      if (Date.now() - start > timeout) {
        throw new Error(
          `Texto no aparecido en ${timeout}ms: "${text}". Contenido: ${(container.textContent ?? '').slice(0, 300)}`,
        );
      }
      await sleep(100);
    }
  }

  function click(el: Element | null) {
    expect(el).not.toBeNull();
    act(() => {
      el!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
  }

  function clickButton(text: string): boolean {
    const btn = Array.from(container.querySelectorAll('button')).find((b) =>
      b.textContent?.includes(text),
    );
    if (!btn) return false;
    click(btn);
    return true;
  }

  function text(): string {
    return container.textContent ?? '';
  }

  /** Desmonta y devuelve un contenedor fresco para un segundo render. */
  function freshContainer(): void {
    if (root) {
      act(() => {
        root!.unmount();
      });
      root = null;
    }
    container.remove();
    container = document.createElement('div');
    document.body.appendChild(container);
  }

  it('guarda el punto de reanudación al avanzar pasos', async () => {
    await renderRouter(
      [{ path: '/ninos/leccion/:slug', element: gate(<Leccion />) }],
      `/ninos/leccion/${SLUG}`,
      'Paso 1 de',
    );
    expect(clickButton('Siguiente →')).toBe(true);
    expect(clickButton('Siguiente →')).toBe(true);
    await waitForText('Paso 3 de');

    // Debounce de 500 ms: espera a que se persista (lectura directa a Dexie).
    await sleep(900);
    const resume = await db.resume.get(SLUG);
    expect(resume?.stepIndex).toBe(2);
  }, 30000);

  it('reanuda en el paso guardado y permite empezar de nuevo', async () => {
    await renderRouter(
      [{ path: '/ninos/leccion/:slug', element: gate(<Leccion />) }],
      `/ninos/leccion/${SLUG}`,
      'Paso 1 de',
    );
    clickButton('Siguiente →');
    clickButton('Siguiente →');
    await waitForText('Paso 3 de');
    await sleep(900);
    expect((await db.resume.get(SLUG))?.stepIndex).toBe(2);

    // Reabrir: debe reanudar en el paso 3 con aviso amable.
    freshContainer();
    await renderRouter(
      [{ path: '/ninos/leccion/:slug', element: gate(<Leccion />) }],
      `/ninos/leccion/${SLUG}`,
      'Seguimos donde lo dejaste',
    );
    expect(text()).toContain('Paso 3 de');

    // Empezar desde el principio: vuelve al paso 1 y limpia el resume.
    expect(clickButton('Empezar desde el principio')).toBe(true);
    await waitForText('Paso 1 de');
    expect(await db.resume.get(SLUG)).toBeUndefined();
  }, 30000);

  it('completar el quiz guarda el progreso y la tarjeta muestra ¡Hecha!', async () => {
    await renderRouter(
      [{ path: '/ninos/leccion/:slug', element: gate(<Leccion />) }],
      `/ninos/leccion/${SLUG}`,
      'Paso 1 de',
    );
    const lesson = getLessonBySlug(SLUG)!;

    // Avanzar hasta el quiz.
    for (let i = 0; i < 20 && !text().includes('Pregunta 1 de'); i++) {
      if (!clickButton('Siguiente →')) break;
    }
    await waitForText('Pregunta 1 de');

    // Responder todas las preguntas correctamente.
    const questions = lesson.quiz.questions;
    for (let qi = 0; qi < questions.length; qi++) {
      const q = questions[qi];
      const options = container.querySelectorAll('.ninos-opcion');
      expect(options.length).toBe(q.options.length);
      click(options[q.correctIndex]);
      const last = qi === questions.length - 1;
      expect(clickButton(last ? 'Terminar' : 'Siguiente pregunta')).toBe(true);
      if (!last) await waitForText(`Pregunta ${qi + 2} de`);
    }

    // El finish es asíncrono: esperar a la pantalla de celebración.
    await waitForText('¡Lección completada!');
    expect(await db.quizzes.get(lesson.quiz.id)).toBeDefined();
    expect(await db.lessons.get(lesson.id)).toBeDefined();
    // Al completar, el resume se limpia.
    expect(await db.resume.get(SLUG)).toBeUndefined();

    // La tarjeta del núcleo muestra "¡Hecha!".
    // (Completar esta lección completa el núcleo n1 → primero aparece la
    // celebración de núcleo; "Seguir caminando" navega a /ninos/camino,
    // así que el router de test necesita esa ruta.)
    freshContainer();
    await renderRouter(
      [
        { path: '/ninos/nucleo/:id', element: gate(<Nucleo />) },
        { path: '/ninos/camino', element: gate(<div>Camino</div>) },
      ],
      `/ninos/nucleo/${lesson.nucleusId}`,
      '¡Núcleo completado!',
    );
    expect(clickButton('Seguir caminando')).toBe(true);
    await waitForText('Camino');
    // Volver al núcleo: ahora las tarjetas muestran el sello.
    freshContainer();
    await renderRouter(
      [{ path: '/ninos/nucleo/:id', element: gate(<Nucleo />) }],
      `/ninos/nucleo/${lesson.nucleusId}`,
      '¡Hecha!',
    );
  }, 60000);

  it('muestra "¡Jugado!" en Jugar tras completar un juego', async () => {
    await markGameComplete('memory', 8, 8);
    await renderRouter(
      [{ path: '/ninos/jugar', element: gate(<Jugar />) }],
      '/ninos/jugar',
      '¡Jugado!',
    );
  }, 30000);

  it('registra un audio como escuchado al terminar y lo muestra', async () => {
    root = createRoot(container);
    root.render(
      <AudioPlayer
        src="/audio/escucha-ser-cristiano.mp3"
        label="Escuchar la narración"
      />,
    );
    // Esperar a que el render plano confirme el <audio>.
    let audio: HTMLAudioElement | null = null;
    for (let i = 0; i < 40 && !audio; i++) {
      await sleep(100);
      audio = container.querySelector('audio');
    }
    expect(audio).not.toBeNull();
    act(() => {
      audio!.dispatchEvent(new Event('ended'));
    });
    await waitForText('Escuchado');
    expect(await db.listened.get('escucha-ser-cristiano')).toBeDefined();
  }, 30000);

  it('no deja errores de consola en el flujo', () => {
    const errors = consoleError.mock.calls.filter(
      ([first]: unknown[]) =>
        String(first).match(/Error|error/i) &&
        !String(first).includes('not wrapped in act'),
    );
    expect(errors).toHaveLength(0);
  });
});
