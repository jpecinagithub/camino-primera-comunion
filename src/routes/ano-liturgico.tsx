/**
 * AnoLiturgico — ruta /ninos/ano-liturgico (protegida por ModeGate).
 * ----------------------------------------------------------------------------
 * Rueda del año litúrgico en modo exploración libre: se toca cada tiempo
 * y se muestra su tarjeta. Pantalla standalone; el juego «El año litúrgico»
 * (src/games/engines/ano-liturgico.tsx) reutiliza estos mismos 6 tiempos.
 *
 * Importar desde: `src/routes/ano-liturgico.tsx`
 */
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Church, Cross, Flame, Gift, Heart, Sun } from 'lucide-react';
import { SectionTitle } from '../components/SectionTitle';
import { Card } from '../components/Card';
import { ReadAloud } from '../a11y/ReadAloud';
import { AudioPlayer } from '../components/AudioPlayer';
import './ano-liturgico.css';

interface Tiempo {
  id: string;
  nombre: string;
  /** semanas aproximadas (para el tamaño del gajo en la rueda) */
  semanas: number;
  color: string;
  icon: typeof Sun;
  texto: string;
  /** Ruta al MP3 de narración pre-generado. */
  audioSrc?: string;
}

/** Tiempos del año litúrgico (exportado para tests de audios). */
export const TIEMPOS: Tiempo[] = [
  {
    id: 'adviento',
    audioSrc: '/audio/ano-adviento.mp3',
    nombre: 'Adviento',
    semanas: 4,
    color: '#6b4e9b',
    icon: Flame,
    texto: 'Cuatro semanas para preparar el corazón: ¡viene Jesús! Encendemos una vela cada domingo.',
  },
  {
    id: 'navidad',
    audioSrc: '/audio/ano-navidad.mp3',
    nombre: 'Navidad',
    semanas: 3,
    color: 'var(--color-gold-dark)',
    icon: Gift,
    texto: 'Celebramos que Jesús nace en Belén. Dios se hace niño para estar con nosotros.',
  },
  {
    id: 'cuaresma',
    audioSrc: '/audio/ano-cuaresma.mp3',
    nombre: 'Cuaresma',
    semanas: 5,
    color: '#6b4e9b',
    icon: Heart,
    texto: 'Cuarenta días para cambiar por dentro: rezar más, compartir y pedir perdón.',
  },
  {
    id: 'semana-santa',
    audioSrc: '/audio/ano-semana-santa.mp3',
    nombre: 'Semana Santa',
    semanas: 1,
    color: '#d95d4e',
    icon: Cross,
    texto:
      'La semana más importante del año: acompañamos a Jesús en su Pasión con amor, esperando la gran alegría de la Pascua.',
  },
  {
    id: 'pascua',
    audioSrc: '/audio/ano-pascua.mp3',
    nombre: 'Pascua',
    semanas: 7,
    color: 'var(--color-green-dark)',
    icon: Sun,
    texto: '¡Jesús ha resucitado! Es la fiesta más grande: la vida vence a la muerte. ¡Aleluya!',
  },
  {
    id: 'ordinario',
    audioSrc: '/audio/ano-ordinario.mp3',
    nombre: 'Tiempo Ordinario',
    semanas: 32,
    color: 'var(--color-sky-dark)',
    icon: Church,
    texto: 'El resto del año: aprendemos cada domingo a vivir como amigos de Jesús.',
  },
];

const CX = 120;
const CY = 120;
const R = 100;

function wedgePath(startAngle: number, sweep: number): string {
  const a0 = ((startAngle - 90) * Math.PI) / 180;
  const a1 = (((startAngle + sweep) * Math.PI) / 180) - Math.PI / 2;
  const x0 = CX + R * Math.cos(a0);
  const y0 = CY + R * Math.sin(a0);
  const x1 = CX + R * Math.cos(a1);
  const y1 = CY + R * Math.sin(a1);
  const large = sweep > 180 ? 1 : 0;
  return `M ${CX} ${CY} L ${x0.toFixed(2)} ${y0.toFixed(2)} A ${R} ${R} 0 ${large} 1 ${x1.toFixed(2)} ${y1.toFixed(2)} Z`;
}

export function AnoLiturgico() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<Tiempo>(TIEMPOS[3]);

  const totalSemanas = TIEMPOS.reduce((acc, tm) => acc + tm.semanas, 0);
  let angle = 0;
  const wedges = TIEMPOS.map((tm) => {
    const sweep = (tm.semanas / totalSemanas) * 360;
    const wedge = { tiempo: tm, start: angle, sweep };
    angle += sweep;
    return wedge;
  });

  const SelectedIcon = selected.icon;

  return (
    <div className="ano">
      <SectionTitle
        title={t('ano.title')}
        subtitle={t('ano.subtitle')}
      />
      <div className="ano__rueda-wrap">
        <svg
          viewBox="0 0 240 240"
          className="ano__rueda"
          role="group"
          aria-label="Rueda del año litúrgico"
        >
          {wedges.map(({ tiempo, start, sweep }) => (
            <g key={tiempo.id}>
              <path
                d={wedgePath(start, sweep)}
                fill={tiempo.color}
                stroke="var(--color-cream)"
                strokeWidth={3}
                opacity={selected.id === tiempo.id ? 1 : 0.55}
                onClick={() => setSelected(tiempo)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelected(tiempo);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={tiempo.nombre}
                className="ano__gajo"
              />
            </g>
          ))}
          <circle
            cx={CX}
            cy={CY}
            r={44}
            fill="var(--color-cream)"
            stroke="var(--color-border)"
            strokeWidth={3}
          />
          <text
            x={CX}
            y={CY - 4}
            textAnchor="middle"
            className="ano__centro-num"
            aria-hidden="true"
          >
            6
          </text>
          <text
            x={CX}
            y={CY + 16}
            textAnchor="middle"
            className="ano__centro-txt"
            aria-hidden="true"
          >
            tiempos
          </text>
        </svg>
      </div>
      <Card>
        <div className="ano__tarjeta">
          <span className="ano__icono" aria-hidden="true" style={{ backgroundColor: selected.color }}>
            <SelectedIcon size={36} color="#ffffff" />
          </span>
          <h2 className="ano__nombre">{selected.nombre}</h2>
          <p className="ano__texto">{selected.texto}</p>
          {selected.audioSrc ? (
            <AudioPlayer
              src={selected.audioSrc}
              label={`Escuchar la narración: ${selected.nombre}`}
            />
          ) : (
            <ReadAloud text={`${selected.nombre}. ${selected.texto}`} />
          )}
        </div>
      </Card>
    </div>
  );
}
