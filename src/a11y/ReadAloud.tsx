/**
 * ReadAloud — botón "Leer en voz alta".
 * ----------------------------------------------------------------------------
 * Usa SpeechSynthesis (es-ES) para leer el texto recibido por props.
 * Si el navegador no lo soporta, el botón se oculta de forma elegante
 * (no se muestra nada en su lugar).
 * Importar desde: `src/a11y/ReadAloud.tsx`
 */
import { useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import './ReadAloud.css';

export interface ReadAloudProps {
  /** Texto que se leerá en voz alta. */
  text: string;
  /** Etiqueta del botón cuando no está leyendo. */
  label?: string;
}

function isSupported(): boolean {
  return (
    typeof window !== 'undefined' &&
    'speechSynthesis' in window &&
    typeof window.speechSynthesis?.speak === 'function'
  );
}

export function ReadAloud({ text, label = 'Leer en voz alta' }: ReadAloudProps) {
  const [speaking, setSpeaking] = useState(false);
  const [supported] = useState(isSupported);

  // Si el usuario sale de la pantalla, callamos la lectura.
  useEffect(() => {
    return () => {
      if (isSupported()) window.speechSynthesis.cancel();
    };
  }, []);

  if (!supported) return null;

  const toggle = (): void => {
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 0.95;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  };

  return (
    <button
      type="button"
      className="read-aloud"
      onClick={toggle}
      aria-pressed={speaking}
      aria-label={speaking ? 'Dejar de leer' : label}
    >
      {speaking ? (
        <VolumeX size={22} aria-hidden="true" />
      ) : (
        <Volume2 size={22} aria-hidden="true" />
      )}
      <span>{speaking ? 'Dejar de leer' : label}</span>
    </button>
  );
}
