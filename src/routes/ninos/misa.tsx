/**
 * Misa — /ninos/misa. MÓDULO ESTRELLA.
 * ----------------------------------------------------------------------------
 * Iglesia ilustrada (SVG original sencillo: altar, ambón, sagrario, cruz) +
 * recorrido por los 24 momentos de la Misa (qué pasa, dónde mirar, gesto del
 * niño). Modo Ensayo: ordenar 8 momentos clave con un mini-ordenador propio
 * (los motores de juegos aún no están registrados en GameHost).
 *
 * Nota de parroquia: donde una costumbre pueda variar, el momento lleva
 * "Pregunta a tu catequista cómo se hace en tu parroquia."
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Eye, Hand, Play, RotateCcw, Sparkles, Square } from 'lucide-react';
import {
  LUGARES_MISA,
  MISA_MOMENTOS,
  getMomentosEnsayo,
} from '../../data/misa';
import type { LugarMisa, MomentoMisa } from '../../data/misa';
import { getGame } from '../../games/registry';
import { GameHost } from '../../games/GameHost';
import { ReadAloud } from '../../a11y/ReadAloud';
import { AudioPlayer } from '../../components/AudioPlayer';
import { audioIdFromSrc, markListened } from '../../db/hooks';
import { LiveRegion } from '../../a11y/live';
import { SectionTitle } from '../../components/SectionTitle';
import { Button } from '../../components/Button';
import { Celebracion } from '../../gamification/Celebracion';
import { trackLessonOpened } from '../../analytics';
import { getLessonBySlug } from '../../data/lessons/index';
import './ninos.css';

/* --------------------------- Iglesia (SVG) -------------------------------- */

function IglesiaSVG() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="ninos-misa-svg"
      role="img"
      aria-label="Iglesia dibujada: altar en el centro, ambón a la izquierda y sagrario a la derecha"
    >
      {/* Pared */}
      <rect x="0" y="0" width="400" height="300" fill="var(--color-cream-dark)" />
      {/* Arco sobre el altar */}
      <path
        d="M120 250 L120 110 A80 80 0 0 1 280 110 L280 250"
        fill="none"
        stroke="var(--color-gold-dark)"
        strokeWidth="6"
      />
      {/* Vidriera */}
      <circle cx="200" cy="60" r="26" fill="var(--color-sky)" stroke="var(--color-ink)" strokeWidth="3" />
      <line x1="200" y1="34" x2="200" y2="86" stroke="var(--color-ink)" strokeWidth="2" />
      <line x1="174" y1="60" x2="226" y2="60" stroke="var(--color-ink)" strokeWidth="2" />
      {/* Cruz sobre el altar */}
      <rect x="196" y="118" width="8" height="52" fill="var(--color-gold-dark)" />
      <rect x="180" y="134" width="40" height="8" fill="var(--color-gold-dark)" />
      {/* Altar */}
      <rect x="150" y="196" width="100" height="54" fill="#fff" stroke="var(--color-ink)" strokeWidth="3" />
      <rect x="150" y="196" width="100" height="14" fill="var(--color-gold)" stroke="var(--color-ink)" strokeWidth="3" />
      {/* Velas del altar */}
      <rect x="140" y="168" width="6" height="28" fill="var(--color-ink)" />
      <ellipse cx="143" cy="162" rx="5" ry="8" fill="var(--color-gold-dark)" />
      <rect x="254" y="168" width="6" height="28" fill="var(--color-ink)" />
      <ellipse cx="257" cy="162" rx="5" ry="8" fill="var(--color-gold-dark)" />
      {/* Ambón (izquierda) */}
      <rect x="78" y="206" width="10" height="44" fill="var(--color-ink)" />
      <rect x="64" y="186" width="38" height="22" rx="2" fill="var(--color-gold)" stroke="var(--color-ink)" strokeWidth="3" transform="rotate(-8 83 197)" />
      <text x="83" y="262" textAnchor="middle" fontSize="13" fill="var(--color-ink)" fontWeight="bold">Ambón</text>
      {/* Sagrario (derecha) */}
      <rect x="292" y="188" width="56" height="62" fill="var(--color-coral)" stroke="var(--color-ink)" strokeWidth="3" rx="4" />
      <rect x="312" y="212" width="16" height="38" fill="var(--color-gold)" stroke="var(--color-ink)" strokeWidth="2" />
      <circle cx="320" cy="180" r="7" fill="#e74c3c" stroke="var(--color-ink)" strokeWidth="2" />
      <line x1="320" y1="187" x2="320" y2="196" stroke="var(--color-ink)" strokeWidth="2" />
      <text x="320" y="262" textAnchor="middle" fontSize="13" fill="var(--color-ink)" fontWeight="bold">Sagrario</text>
      <text x="200" y="262" textAnchor="middle" fontSize="13" fill="var(--color-ink)" fontWeight="bold">Altar</text>
      {/* Bancos */}
      <rect x="30" y="278" width="150" height="12" rx="4" fill="var(--color-ink-soft)" />
      <rect x="220" y="278" width="150" height="12" rx="4" fill="var(--color-ink-soft)" />
    </svg>
  );
}

/* ------------------------------ Recorrido --------------------------------- */

const LUGAR_ICONOS: Record<LugarMisa, typeof Eye> = {
  altar: Eye,
  ambon: Eye,
  sagrario: Eye,
  bancos: Eye,
};

function MomentoCard({ momento }: { momento: MomentoMisa }) {
  const lugar = LUGARES_MISA[momento.dondeMirar];
  const Icon = LUGAR_ICONOS[momento.dondeMirar];
  return (
    <article className="ninos-card ninos-momento" aria-label={`Momento ${momento.orden}: ${momento.titulo}`}>
      <span className="ninos-momento__numero" aria-hidden="true">
        {momento.orden}
      </span>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        <h3 style={{ margin: 0 }}>{momento.titulo}</h3>
        <p style={{ margin: 0 }}>{momento.quePasa}</p>
        <p style={{ margin: 0 }}>
          <span
            className="ninos-etiqueta"
            style={{ background: 'var(--color-sky)', color: 'var(--color-sky-dark)' }}
          >
            <Icon size={16} aria-hidden="true" />
            Mira: {lugar.titulo} · {lugar.descripcion}
          </span>
        </p>
        <p style={{ margin: 0 }}>
          <Hand size={16} aria-hidden="true" style={{ verticalAlign: '-2px' }} />{' '}
          <strong>Tú:</strong> {momento.gesto}
        </p>
        {momento.preguntaCatequista && (
          <p className="ninos-aviso" style={{ margin: 0 }}>
            Pregunta a tu catequista cómo se hace en tu parroquia.
          </p>
        )}
        {momento.audioSrc ? (
          <AudioPlayer
            src={momento.audioSrc}
            label={`Escuchar la narración: ${momento.titulo}`}
          />
        ) : (
          <ReadAloud
            text={`${momento.titulo}. ${momento.quePasa} Tú: ${momento.gesto}`}
          />
        )}
      </div>
    </article>
  );
}

/* --------------------- Playlist: todo el recorrido ------------------------ */
/* Reproduce los 25 momentos EN SECUENCIA con un solo <audio> (evento 'ended'
 * avanza al siguiente). Sin autoplay: el niño pulsa para empezar. */

/** Playlist del recorrido completo (exportada para tests). */
export function PlaylistRecorrido() {
  const total = MISA_MOMENTOS.length;
  const [playing, setPlaying] = useState(false);
  const [index, setIndex] = useState(0);
  const [live, setLive] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const start = () => {
    setIndex(0);
    setPlaying(true);
    setLive(`Escuchando el recorrido de la Misa: momento 1 de ${total}.`);
  };
  const stop = () => {
    setPlaying(false);
    setLive('Reproducción detenida.');
  };

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      void a.play().catch(() => {
        setPlaying(false);
        setLive('No se ha podido reproducir el audio.');
      });
    } else {
      a.pause();
    }
  }, [playing, index]);

  useEffect(() => {
    const a = audioRef.current;
    return () => {
      a?.pause();
    };
  }, []);

  const onEnded = () => {
    // El momento que acaba de terminar queda registrado como escuchado.
    const terminado = MISA_MOMENTOS[index];
    if (terminado?.audioSrc) {
      void markListened(audioIdFromSrc(terminado.audioSrc));
    }
    if (index + 1 < total) {
      const next = index + 1;
      setIndex(next);
      setLive(`Momento ${next + 1} de ${total}: ${MISA_MOMENTOS[next].titulo}.`);
    } else {
      setPlaying(false);
      setLive('Has escuchado todo el recorrido de la Misa. ¡Muy bien!');
    }
  };

  const momento = MISA_MOMENTOS[index];

  return (
    <div className="ninos-card" aria-label="Escuchar todo el recorrido de la Misa">
      <audio
        ref={audioRef}
        src={momento?.audioSrc}
        preload="none"
        onEnded={onEnded}
      />
      {!playing ? (
        <Button
          variant="secondary"
          onClick={start}
          className="ninos-boton-grande"
        >
          <Play size={26} aria-hidden="true" />
          Escuchar todo el recorrido
        </Button>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-2)',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <p style={{ margin: 0, fontWeight: 700 }}>
            🔊 Momento {index + 1} de {total}: {momento?.titulo}
          </p>
          <Button variant="secondary" onClick={stop}>
            <Square size={22} aria-hidden="true" /> Detener
          </Button>
        </div>
      )}
      <LiveRegion message={live} />
    </div>
  );
}

function Recorrido() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      <IglesiaSVG />
      <PlaylistRecorrido />
      {MISA_MOMENTOS.map((m) => (
        <MomentoCard key={m.id} momento={m} />
      ))}
    </div>
  );
}

/* ------------------------------- Ensayo ----------------------------------- */

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function Ensayo() {
  // Si el motor del equipo de juegos está registrado, se usa vía GameHost;
  // si no, se muestra el mini-ordenador propio de respaldo.
  if (getGame('ordena-misa')) {
    return <GameHost gameId="ordena-misa" />;
  }
  return <EnsayoRespaldo />;
}

/* ------------------------- Mini-ordenador (respaldo) ---------------------- */

function EnsayoRespaldo() {
  const correctos = useMemo(() => getMomentosEnsayo(), []);
  const [mezclados] = useState(() => shuffle(correctos));
  const [orden, setOrden] = useState<MomentoMisa[]>([]);
  const [resultado, setResultado] = useState<'ok' | 'ko' | null>(null);
  const [live, setLive] = useState('');

  const disponibles = mezclados.filter((m) => !orden.includes(m));

  const agregar = (m: MomentoMisa) => {
    if (resultado === 'ok') return;
    setResultado(null);
    setOrden((o) => [...o, m]);
  };

  const quitar = (m: MomentoMisa) => {
    if (resultado === 'ok') return;
    setResultado(null);
    setOrden((o) => o.filter((x) => x.id !== m.id));
  };

  const comprobar = () => {
    const bien =
      orden.length === correctos.length &&
      orden.every((m, i) => m.id === correctos[i].id);
    setResultado(bien ? 'ok' : 'ko');
    setLive(
      bien
        ? '¡Perfecto! Has ordenado los 8 momentos de la Misa.'
        : 'Casi. Mira el orden, quita las tarjetas y prueba otra vez.',
    );
  };

  const reiniciar = () => {
    setOrden([]);
    setResultado(null);
    setLive('Empieza de nuevo: toca las tarjetas en el orden de la Misa.');
  };

  if (resultado === 'ok') {
    return (
      <Celebracion
        title="¡Ensayo superado!"
        message="Ya conoces el orden de los momentos más importantes de la Misa. ¡El día de tu Primera Comunión lo vivirás con calma!"
        cta="Jugar otra vez"
        onContinue={reiniciar}
      />
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      <p className="ninos-parrafo">
        Toca las tarjetas <strong>en el orden en que ocurren en la Misa</strong>.
      </p>
      <LiveRegion message={live} />

      <h3 style={{ margin: 0 }}>Mi orden ({orden.length} de {correctos.length})</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', minHeight: 64 }}>
        {orden.length === 0 && (
          <p style={{ color: 'var(--color-ink-soft)', margin: 0 }}>
            Aquí aparecerán las tarjetas que toques…
          </p>
        )}
        {orden.map((m, i) => (
          <button
            key={m.id}
            type="button"
            className="ninos-opcion ninos-opcion--intento"
            onClick={() => quitar(m)}
            aria-label={`Quitar ${m.titulo}, posición ${i + 1}`}
          >
            <span className="ninos-numero" style={{ width: 36, height: 36, fontSize: 'var(--font-size-md)', background: '#fff' }} aria-hidden="true">
              {i + 1}
            </span>
            {m.titulo}
          </button>
        ))}
      </div>

      <h3 style={{ margin: 0 }}>Tarjetas</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        {disponibles.map((m) => (
          <button
            key={m.id}
            type="button"
            className="ninos-opcion"
            onClick={() => agregar(m)}
            aria-label={`Añadir ${m.titulo}`}
          >
            <Sparkles size={22} aria-hidden="true" color="var(--color-gold-dark)" />
            {m.titulo}
          </button>
        ))}
      </div>

      {resultado === 'ko' && (
        <div className="ninos-feedback ninos-feedback--pista">
          <RotateCcw size={28} aria-hidden="true" color="var(--color-gold-dark)" />
          <div>
            <p style={{ margin: 0, fontWeight: 700 }}>Casi, casi.</p>
            <p style={{ margin: 0 }}>
              Revisa el orden, quita las tarjetas tocándolas y prueba otra vez.
            </p>
          </div>
        </div>
      )}

      <div className="ninos-navegacion">
        <Button variant="ghost" onClick={reiniciar}>
          <RotateCcw size={22} aria-hidden="true" /> Empezar de nuevo
        </Button>
        <Button
          variant="primary"
          onClick={comprobar}
          disabled={orden.length !== correctos.length}
        >
          <Check size={22} aria-hidden="true" /> Comprobar
        </Button>
      </div>
    </div>
  );
}

/* --------------------------------- Misa ----------------------------------- */

export function Misa() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'recorrido' | 'ensayo'>('recorrido');

  const irALeccionMisa = () => {
    const lesson = getLessonBySlug('misa-paso-a-paso');
    if (lesson) {
      trackLessonOpened(lesson.id);
      navigate(`/ninos/leccion/${lesson.slug}`);
    }
  };

  return (
    <div className="ninos">
      <SectionTitle
        title="La Misa paso a paso"
        subtitle="Descubre qué pasa en la Misa, dónde mirar y qué haces tú."
      />

      <div className="ninos-tabs" role="tablist" aria-label="Modos">
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'recorrido'}
          className={`ninos-tab${tab === 'recorrido' ? ' ninos-tab--activa' : ''}`}
          onClick={() => setTab('recorrido')}
        >
          Recorrido
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'ensayo'}
          className={`ninos-tab${tab === 'ensayo' ? ' ninos-tab--activa' : ''}`}
          onClick={() => setTab('ensayo')}
        >
          Modo Ensayo
        </button>
      </div>

      {tab === 'recorrido' ? <Recorrido /> : <Ensayo />}

      <div className="ninos-card">
        <p className="ninos-parrafo" style={{ margin: 0 }}>
          ¿Quieres aprender más? La lección <strong>«La Misa paso a paso»</strong>{' '}
          te espera con su juego y su quiz.
        </p>
        <Button variant="secondary" onClick={irALeccionMisa}>
          Ir a la lección
        </Button>
      </div>
    </div>
  );
}
