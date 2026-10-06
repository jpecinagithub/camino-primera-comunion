/**
 * Tests de accesibilidad: ReadAloud, useReducedMotion y LiveRegion.
 * No dependen de matchMedia ni speechSynthesis reales: se mockean.
 */
import { act } from 'react';
import type { ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, expect, it, vi, afterEach } from 'vitest';
import { ReadAloud } from '../ReadAloud';
import { LiveRegion } from '../live';
import { useReducedMotion } from '../useReducedMotion';

function renderInto(ui: ReactElement): {
  container: HTMLDivElement;
  unmount: () => void;
} {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => {
    root.render(ui);
  });
  return {
    container,
    unmount: () => {
      act(() => root.unmount());
      container.remove();
    },
  };
}

function mockMatchMedia(matches: boolean): () => void {
  const listeners = new Set<(e: MediaQueryListEvent) => void>();
  const mql = {
    matches,
    media: '(prefers-reduced-motion: reduce)',
    addEventListener: (_t: string, fn: (e: MediaQueryListEvent) => void) => {
      listeners.add(fn);
    },
    removeEventListener: (_t: string, fn: (e: MediaQueryListEvent) => void) => {
      listeners.delete(fn);
    },
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
    onchange: null,
  } as unknown as MediaQueryList;
  const original = window.matchMedia;
  window.matchMedia = vi.fn().mockReturnValue(mql);
  return () => {
    window.matchMedia = original;
  };
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe('useReducedMotion', () => {
  it('devuelve true cuando matchMedia indica movimiento reducido', () => {
    const restore = mockMatchMedia(true);
    function Probe() {
      return <span data-testid="v">{useReducedMotion() ? 'si' : 'no'}</span>;
    }
    const { container, unmount } = renderInto(<Probe />);
    expect(container.querySelector('[data-testid="v"]')?.textContent).toBe('si');
    unmount();
    restore();
  });

  it('devuelve false cuando no hay preferencia de movimiento reducido', () => {
    const restore = mockMatchMedia(false);
    function Probe() {
      return <span data-testid="v">{useReducedMotion() ? 'si' : 'no'}</span>;
    }
    const { container, unmount } = renderInto(<Probe />);
    expect(container.querySelector('[data-testid="v"]')?.textContent).toBe('no');
    unmount();
    restore();
  });

  it('no revienta si matchMedia no existe', () => {
    const original = window.matchMedia;
    // @ts-expect-error - simulamos un entorno sin matchMedia
    delete window.matchMedia;
    function Probe() {
      return <span data-testid="v">{useReducedMotion() ? 'si' : 'no'}</span>;
    }
    const { container, unmount } = renderInto(<Probe />);
    expect(container.querySelector('[data-testid="v"]')?.textContent).toBe('no');
    unmount();
    window.matchMedia = original;
  });
});

describe('ReadAloud', () => {
  it('se oculta elegantemente si no hay speechSynthesis', () => {
    // jsdom no trae speechSynthesis: el botón no debe aparecer.
    const { container, unmount } = renderInto(<ReadAloud text="Hola" />);
    expect(container.innerHTML).toBe('');
    unmount();
  });

  it('muestra el botón cuando speechSynthesis existe y alterna lectura', () => {
    const speak = vi.fn();
    const cancel = vi.fn();
    class FakeUtterance {
      text: string;
      lang = '';
      rate = 1;
      onend: (() => void) | null = null;
      onerror: (() => void) | null = null;
      constructor(text: string) {
        this.text = text;
      }
    }
    Object.defineProperty(window, 'speechSynthesis', {
      value: { speak, cancel },
      configurable: true,
      writable: true,
    });
    Object.defineProperty(window, 'SpeechSynthesisUtterance', {
      value: FakeUtterance,
      configurable: true,
      writable: true,
    });

    const { container, unmount } = renderInto(<ReadAloud text="Jesús nos quiere" />);
    const button = container.querySelector('button');
    expect(button).not.toBeNull();
    expect(button?.textContent).toContain('Leer en voz alta');

    act(() => {
      button?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(speak).toHaveBeenCalledTimes(1);
    expect(button?.getAttribute('aria-pressed')).toBe('true');

    act(() => {
      button?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(cancel).toHaveBeenCalled();

    unmount();
    // @ts-expect-error - limpiamos los mocks globales
    delete window.speechSynthesis;
    // @ts-expect-error - limpiamos los mocks globales
    delete window.SpeechSynthesisUtterance;
  });
});

describe('LiveRegion', () => {
  it('renderiza con aria-live polite y role status', () => {
    const { container, unmount } = renderInto(<LiveRegion message="¡Correcto!" />);
    const region = container.querySelector('[aria-live="polite"]');
    expect(region).not.toBeNull();
    expect(region?.getAttribute('role')).toBe('status');
    expect(region?.textContent).toBe('¡Correcto!');
    unmount();
  });
});
