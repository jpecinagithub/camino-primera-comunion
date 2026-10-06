/**
 * Tests del mapa central de navegación (src/navigation.ts).
 * ----------------------------------------------------------------------------
 * Verifica que cada ruta tiene destino de volver contextual y que las migas
 * se resuelven con los datos reales (lecciones, juegos, núcleos).
 */
import { beforeEach, describe, expect, it } from 'vitest';
import { getBackTarget, getBreadcrumbs } from '../navigation';
import { setMode, clearMode } from '../mode';

// navigation.ts lee el modo desde localStorage (jsdom lo soporta).
beforeEach(() => {
  clearMode();
});

describe('getBackTarget', () => {
  it('devuelve null en las pantallas raíz', () => {
    for (const p of ['/', '/selector', '/bienvenida', '/ninos', '/padres']) {
      expect(getBackTarget(p)).toBeNull();
    }
  });

  it('camino → Inicio', () => {
    expect(getBackTarget('/ninos/camino')).toEqual({ to: '/ninos', label: 'Inicio' });
  });

  it('nucleo → Mi Camino', () => {
    expect(getBackTarget('/ninos/nucleo/n1')).toEqual({
      to: '/ninos/camino',
      label: 'Mi Camino',
    });
  });

  it('leccion → el núcleo de la lección (dato real)', () => {
    // ser-cristiano pertenece al núcleo n1
    expect(getBackTarget('/ninos/leccion/ser-cristiano')).toEqual({
      to: '/ninos/nucleo/n1',
      label: 'El núcleo',
    });
  });

  it('leccion con slug desconocido → Mi Camino (sin callejón)', () => {
    expect(getBackTarget('/ninos/leccion/no-existe')).toEqual({
      to: '/ninos/camino',
      label: 'Mi Camino',
    });
  });

  it('juego → Jugar', () => {
    expect(getBackTarget('/ninos/juego/ordena-misa')).toEqual({
      to: '/ninos/jugar',
      label: 'Jugar',
    });
  });

  it('jugar y orar → Inicio', () => {
    expect(getBackTarget('/ninos/jugar')).toEqual({ to: '/ninos', label: 'Inicio' });
    expect(getBackTarget('/ninos/orar')).toEqual({ to: '/ninos', label: 'Inicio' });
  });

  it('misa y reconciliacion → Mi Primera Comunión', () => {
    const expected = { to: '/ninos/mi-comunion', label: 'Mi Primera Comunión' };
    expect(getBackTarget('/ninos/misa')).toEqual(expected);
    expect(getBackTarget('/ninos/reconciliacion')).toEqual(expected);
  });

  it('mi-comunion, avatar, progreso, ano-liturgico → Inicio', () => {
    for (const p of [
      '/ninos/mi-comunion',
      '/ninos/avatar',
      '/ninos/progreso',
      '/ninos/ano-liturgico',
    ]) {
      expect(getBackTarget(p)).toEqual({ to: '/ninos', label: 'Inicio' });
    }
  });

  it('zona de padres → Inicio de padres', () => {
    for (const p of [
      '/padres/tema/n1',
      '/padres/actividades',
      '/padres/guia',
      '/padres/faq',
      '/padres/recursos',
      '/padres/privacidad',
    ]) {
      expect(getBackTarget(p)).toEqual({ to: '/padres', label: 'Inicio de padres' });
    }
  });

  it('acerca/offline → inicio del modo activo o selector', () => {
    expect(getBackTarget('/acerca')).toEqual({
      to: '/selector',
      label: 'Cambiar de modo',
    });
    setMode('ninos');
    expect(getBackTarget('/acerca')).toEqual({ to: '/ninos', label: 'Inicio' });
    expect(getBackTarget('/offline')).toEqual({ to: '/ninos', label: 'Inicio' });
    setMode('padres');
    expect(getBackTarget('/acerca')).toEqual({
      to: '/padres',
      label: 'Inicio de padres',
    });
  });

  it('ruta desconocida → null', () => {
    expect(getBackTarget('/esto/no/existe')).toBeNull();
  });
});

describe('getBreadcrumbs', () => {
  it('leccion → Mi Camino › núcleo › lección (datos reales)', () => {
    expect(getBreadcrumbs('/ninos/leccion/ser-cristiano')).toEqual([
      { label: 'Mi Camino', to: '/ninos/camino' },
      { label: 'La Iglesia y los cristianos', to: '/ninos/nucleo/n1' },
      { label: '¿Qué significa ser cristiano?' },
    ]);
  });

  it('nucleo → Mi Camino › núcleo', () => {
    expect(getBreadcrumbs('/ninos/nucleo/n2')).toEqual([
      { label: 'Mi Camino', to: '/ninos/camino' },
      { label: 'Dios es nuestro Padre' },
    ]);
  });

  it('juego → Jugar › juego', () => {
    expect(getBreadcrumbs('/ninos/juego/ordena-misa')).toEqual([
      { label: 'Jugar', to: '/ninos/jugar' },
      { label: 'Ordena la Misa' },
    ]);
  });

  it('tema de padres → Padres › núcleo', () => {
    expect(getBreadcrumbs('/padres/tema/n1')).toEqual([
      { label: 'Padres', to: '/padres' },
      { label: 'La Iglesia y los cristianos' },
    ]);
  });

  it('devuelve null en rutas sin migas o con id desconocido', () => {
    expect(getBreadcrumbs('/ninos')).toBeNull();
    expect(getBreadcrumbs('/ninos/camino')).toBeNull();
    expect(getBreadcrumbs('/ninos/leccion/no-existe')).toBeNull();
    expect(getBreadcrumbs('/ninos/nucleo/n99')).toBeNull();
    expect(getBreadcrumbs('/ninos/juego/no-existe')).toBeNull();
  });
});
