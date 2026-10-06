/**
 * Tests de la playlist "Escuchar todo el recorrido" — Camino a la Primera Comunión
 * ----------------------------------------------------------------------------
 * Verifica que la playlist reproduce los momentos de la Misa EN SECUENCIA:
 * al terminar un audio (evento 'ended') avanza al siguiente, y al terminar
 * el último se detiene. El elemento <audio> se simula (jsdom no reproduce).
 */
import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { PlaylistRecorrido } from '../ninos/misa';
import { MISA_MOMENTOS } from '../../data/misa';

// Necesario para que act() funcione sin avisos en React 19 + jsdom.
(globalThis as Record<string, unknown>).IS_REACT_ACT_ENVIRONMENT = true;

describe('PlaylistRecorrido', () => {
  let container: HTMLDivElement;
  let root: Root | null = null;
  let consoleError: ReturnType<typeof vi.spyOn>;
  let playSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    playSpy = vi
      .spyOn(window.HTMLMediaElement.prototype, 'play')
      .mockImplementation(() => Promise.resolve());
    vi.spyOn(window.HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
  });

  afterEach(async () => {
    consoleError.mockRestore();
    vi.restoreAllMocks();
    if (root) {
      await act(async () => {
        root!.unmount();
      });
      root = null;
    }
    container.remove();
  });

  function audioEl(): HTMLAudioElement {
    const el = container.querySelector('audio');
    if (!el) throw new Error('no hay <audio> renderizado');
    return el;
  }

  function endCurrent() {
    act(() => {
      audioEl().dispatchEvent(new Event('ended'));
    });
  }

  it('avanza en secuencia con cada ended y se detiene al final', async () => {
    await act(async () => {
      root = createRoot(container);
      root.render(<PlaylistRecorrido />);
    });

    // Estado inicial: botón para empezar, sin reproducir.
    const startBtn = container.querySelector('button');
    expect(startBtn?.textContent).toMatch(/Escuchar todo el recorrido/);

    // Pulsa empezar → se reproduce el momento 1.
    await act(async () => {
      startBtn!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(playSpy).toHaveBeenCalled();
    expect(audioEl().getAttribute('src')).toBe(MISA_MOMENTOS[0].audioSrc);
    expect(container.textContent).toMatch(/Momento 1 de 24/);

    // Simula el fin del momento 1 → avanza al 2.
    playSpy.mockClear();
    endCurrent();
    expect(audioEl().getAttribute('src')).toBe(MISA_MOMENTOS[1].audioSrc);
    expect(container.textContent).toMatch(/Momento 2 de 24/);

    // Avanza hasta el último.
    for (let i = 2; i < MISA_MOMENTOS.length; i++) {
      endCurrent();
    }
    expect(container.textContent).toMatch(/Momento 24 de 24/);

    // Fin del último → se detiene y vuelve al botón inicial.
    endCurrent();
    expect(container.textContent).toMatch(/Escuchar todo el recorrido/);
    expect(container.textContent).toMatch(/todo el recorrido de la Misa/);
  });

  it('el botón Detener para la reproducción', async () => {
    await act(async () => {
      root = createRoot(container);
      root.render(<PlaylistRecorrido />);
    });
    const startBtn = container.querySelector('button');
    await act(async () => {
      startBtn!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(container.textContent).toMatch(/Momento 1 de 24/);

    const stopBtn = Array.from(container.querySelectorAll('button')).find((b) =>
      /Detener/.test(b.textContent ?? ''),
    );
    expect(stopBtn).toBeDefined();
    await act(async () => {
      stopBtn!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(container.textContent).toMatch(/Escuchar todo el recorrido/);
  });

  it('no hay errores de consola', () => {
    const reactErrors = consoleError.mock.calls.filter((call: unknown[]) =>
      String(call[0]).match(/Error|error|Warning: /),
    );
    expect(reactErrors).toHaveLength(0);
  });
});
