/**
 * Tests de AudioPlayer — Camino a la Primera Comunión
 * ----------------------------------------------------------------------------
 * Renderiza el reproductor, alterna play/pausa y verifica que no hay errores
 * de consola. El elemento <audio> se simula (jsdom no reproduce audio real).
 */
import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AudioPlayer } from '../AudioPlayer';

// Necesario para que act() funcione sin avisos en React 19 + jsdom.
(globalThis as Record<string, unknown>).IS_REACT_ACT_ENVIRONMENT = true;

describe('AudioPlayer', () => {
  let container: HTMLDivElement;
  let root: Root | null = null;
  let consoleError: ReturnType<typeof vi.spyOn>;
  let playSpy: ReturnType<typeof vi.spyOn>;
  let pauseSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    playSpy = vi
      .spyOn(window.HTMLMediaElement.prototype, 'play')
      .mockImplementation(() => Promise.resolve());
    pauseSpy = vi.spyOn(window.HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
  });

  afterEach(async () => {
    consoleError.mockRestore();
    playSpy.mockRestore();
    pauseSpy.mockRestore();
    if (root) {
      await act(async () => {
        root!.unmount();
      });
      root = null;
    }
    container.remove();
  });

  async function renderPlayer(src = '/audio/escucha-ser-cristiano.mp3') {
    await act(async () => {
      root = createRoot(container);
      root.render(<AudioPlayer src={src} label="Escuchar la narración" />);
    });
  }

  it('renderiza el botón de reproducir con su etiqueta ARIA', async () => {
    await renderPlayer();
    const btn = container.querySelector('button');
    expect(btn).not.toBeNull();
    expect(btn!.getAttribute('aria-label')).toBe('Reproducir la narración');
    expect(btn!.getAttribute('aria-pressed')).toBe('false');
  });

  it('alterna play/pausa al pulsar', async () => {
    await renderPlayer();
    const btn = container.querySelector('button')!;
    await act(async () => {
      btn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(playSpy).toHaveBeenCalledTimes(1);
    // Simula el evento play del elemento <audio>
    const audio = container.querySelector('audio')!;
    await act(async () => {
      audio.dispatchEvent(new Event('play'));
    });
    expect(btn.getAttribute('aria-label')).toBe('Pausar la narración');
    expect(btn.getAttribute('aria-pressed')).toBe('true');
    await act(async () => {
      btn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(pauseSpy).toHaveBeenCalledTimes(1);
  });

  it('muestra la barra de progreso con etiqueta accesible', async () => {
    await renderPlayer();
    const slider = container.querySelector('input[type="range"]');
    expect(slider).not.toBeNull();
    expect(slider!.getAttribute('aria-label')).toBe('Posición de la narración');
  });

  it('no produce errores de consola', async () => {
    await renderPlayer();
    expect(consoleError).not.toHaveBeenCalled();
  });
});
