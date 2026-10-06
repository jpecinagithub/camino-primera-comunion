/**
 * AudioPlayer — reproductor de narración pre-generada (MP3).
 * ----------------------------------------------------------------------------
 * Reproduce los audios generados en tiempo de autoría (public/audio/*.mp3).
 * Sin autoplay: el niño pulsa para escuchar. Controles de 48px, etiquetas
 * ARIA en español y barra de progreso operable con teclado.
 * Importar desde: `src/components/AudioPlayer.tsx`
 */
import { useEffect, useRef, useState } from 'react';
import { Pause, Play, Volume2 } from 'lucide-react';
import './AudioPlayer.css';

export interface AudioPlayerProps {
  /** Ruta al MP3 (p. ej. '/audio/escucha-ser-cristiano.mp3'). */
  src: string;
  /** Etiqueta visible y ARIA. Por defecto "Escuchar la narración". */
  label?: string;
}

function formatTime(totalSeconds: number): string {
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) return '0:00';
  const m = Math.floor(totalSeconds / 60);
  const s = Math.floor(totalSeconds % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

export function AudioPlayer({ src, label = 'Escuchar la narración' }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setFailed(false);
  }, [src]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio || failed) return;
    if (playing) {
      audio.pause();
    } else {
      void audio.play().catch(() => setFailed(true));
    }
  };

  const seek = (value: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value;
    setCurrentTime(value);
  };

  if (failed) {
    return (
      <p className="audio-player__error" role="alert">
        No se ha podido cargar el audio. Puedes usar «Leer en voz alta».
      </p>
    );
  }

  return (
    <div className="audio-player" role="group" aria-label={label}>
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          setPlaying(false);
          setCurrentTime(0);
        }}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onError={() => setFailed(true)}
      />
      <button
        type="button"
        className="audio-player__boton"
        onClick={toggle}
        aria-label={playing ? 'Pausar la narración' : 'Reproducir la narración'}
        aria-pressed={playing}
      >
        {playing ? <Pause size={24} aria-hidden="true" /> : <Play size={24} aria-hidden="true" />}
      </button>
      <Volume2 size={20} aria-hidden="true" className="audio-player__icono" />
      <input
        type="range"
        className="audio-player__barra"
        min={0}
        max={duration || 0}
        step={0.1}
        value={currentTime}
        onChange={(e) => seek(Number(e.target.value))}
        aria-label="Posición de la narración"
        aria-valuetext={`${formatTime(currentTime)} de ${formatTime(duration)}`}
      />
      <span className="audio-player__tiempo" aria-hidden="true">
        {formatTime(currentTime)} / {formatTime(duration)}
      </span>
      <span className="audio-player__etiqueta">{label}</span>
    </div>
  );
}
