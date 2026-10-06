/**
 * Orar — /ninos/orar.
 * ----------------------------------------------------------------------------
 * Lista de oraciones: las `prayer` de cada lección (título + a qué lección
 * pertenece) + las 4 fundamentales (src/data/oraciones.ts). Cada oración se
 * lee en una pantalla serena con "Leer en voz alta".
 */
import { useState } from 'react';
import { BookHeart, HandHeart } from 'lucide-react';
import { LESSONS } from '../../data/lessons/index';
import { ORACIONES_FUNDAMENTALES } from '../../data/oraciones';
import { ReadAloud } from '../../a11y/ReadAloud';
import { AudioPlayer } from '../../components/AudioPlayer';
import { SectionTitle } from '../../components/SectionTitle';
import { Button } from '../../components/Button';
import { getNucleus } from '../../data/nuclei';
import './ninos.css';

interface OracionVista {
  id: string;
  title: string;
  lines: string[];
  origen: string;
  audioSrc?: string;
}

function buildOraciones(): OracionVista[] {
  const deLecciones: OracionVista[] = LESSONS.map((l) => ({
    id: `leccion-${l.id}`,
    title: l.prayer.title,
    lines: l.prayer.lines,
    origen: `De la lección «${l.title}»`,
    audioSrc: l.prayer.audioSrc,
  }));
  const fundamentales: OracionVista[] = ORACIONES_FUNDAMENTALES.map((o) => ({
    id: `fund-${o.id}`,
    title: o.title,
    lines: o.lines,
    origen: o.note,
    audioSrc: o.audioSrc,
  }));
  return [...fundamentales, ...deLecciones];
}

export function Orar() {
  const [seleccionada, setSeleccionada] = useState<OracionVista | null>(null);
  const oraciones = buildOraciones();

  if (seleccionada) {
    const texto = `${seleccionada.title}. ${seleccionada.lines.join(' ')}`;
    return (
      <div className="ninos">
        <div className="ninos-oracion" aria-label={`Oración: ${seleccionada.title}`}>
          <span
            className="ninos-avatar-circulo"
            style={{
              background: 'var(--color-gold)',
              borderColor: 'var(--color-gold-dark)',
              margin: '0 auto',
            }}
            aria-hidden="true"
          >
            <HandHeart size={40} color="var(--color-gold-dark)" />
          </span>
          <h1 style={{ margin: 0 }}>{seleccionada.title}</h1>
          {seleccionada.lines.map((linea, i) => (
            <p key={i}>{linea}</p>
          ))}
          <p style={{ fontStyle: 'normal', fontSize: 'var(--font-size-sm)', color: 'var(--color-ink-soft)' }}>
            {seleccionada.origen}
          </p>
          {seleccionada.audioSrc ? (
            <AudioPlayer
              src={seleccionada.audioSrc}
              label={`Escuchar la oración: ${seleccionada.title}`}
            />
          ) : (
            <ReadAloud text={texto} />
          )}
          <Button variant="ghost" onClick={() => setSeleccionada(null)}>
            ← Todas las oraciones
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="ninos">
      <SectionTitle
        title="Orar"
        subtitle="Hablar con Dios es lo más bonito del día. Elige una oración."
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {oraciones.map((o) => (
          <button
            key={o.id}
            type="button"
            className="ninos-sendero__tarjeta"
            onClick={() => setSeleccionada(o)}
            aria-label={`Rezar: ${o.title}. ${o.origen}.`}
          >
            <span
              className="ninos-sendero__icono"
              style={{ background: 'var(--color-gold)' }}
              aria-hidden="true"
            >
              <BookHeart size={28} color="var(--color-gold-dark)" />
            </span>
            <span style={{ flex: 1 }}>
              <h3>{o.title}</h3>
              <p>{o.origen}</p>
            </span>
          </button>
        ))}
      </div>

      <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-ink-soft)' }}>
        Las oraciones de las lecciones pertenecen a cada lección del camino: las
        encontrarás también al final de cada una. Núcleo de{' '}
        {getNucleus('n9')?.title ?? 'la Eucaristía'}: allí rezarás con Jesús de
        una forma muy especial.
      </p>
    </div>
  );
}
