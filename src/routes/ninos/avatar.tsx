/**
 * Avatar — /ninos/avatar.
 * ----------------------------------------------------------------------------
 * Elegir un apodo FICTICIO (máx 20 caracteres; texto que explica que es un
 * nombre inventado, no el real) + elegir avatar entre 12 opciones (iconos
 * Lucide con fondos de colores). Guarda con saveProfile. Sin foto, sin
 * datos reales.
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { saveProfile, useProfile } from '../../db/hooks';
import { NUCLEUS_COLOR_TOKENS } from '../../data/nuclei';
import { SectionTitle } from '../../components/SectionTitle';
import { Button } from '../../components/Button';
import { LiveRegion } from '../../a11y/live';
import { AVATAR_OPTIONS } from './shared';
import './ninos.css';

export function Avatar() {
  const navigate = useNavigate();
  const profile = useProfile();
  const [nickname, setNickname] = useState(profile?.nickname ?? '');
  const [avatarId, setAvatarId] = useState(profile?.avatar ?? 'estrella');
  const [saved, setSaved] = useState(false);
  const [live, setLive] = useState('');

  const guardar = async () => {
    const limpio = nickname.trim().slice(0, 20);
    await saveProfile(limpio, avatarId);
    setSaved(true);
    setLive(
      limpio
        ? `¡Listo! A partir de ahora te llamaremos ${limpio}.`
        : '¡Listo! Avatar guardado.',
    );
  };

  const valido = nickname.trim().length > 0;

  return (
    <div className="ninos">
      <SectionTitle
        title="Tu avatar"
        subtitle="Elige cómo te llamaremos por aquí."
      />

      <div className="ninos-card">
        <label htmlFor="apodo" style={{ fontWeight: 700, fontSize: 'var(--font-size-lg)' }}>
          Mi apodo
        </label>
        <input
          id="apodo"
          type="text"
          className="ninos-input"
          maxLength={20}
          value={nickname}
          onChange={(e) => {
            setNickname(e.target.value);
            setSaved(false);
          }}
          placeholder="p. ej. Estrella del Mar"
          autoComplete="off"
        />
        <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: 'var(--color-ink-soft)' }}>
          Es un nombre <strong>inventado</strong>, como el de un personaje de
          cuento. No pongas tu nombre de verdad.
        </p>
      </div>

      <SectionTitle
        title="Elige tu dibujo"
        subtitle="12 amigos para acompañarte en el camino."
      />

      <div
        className="ninos-avatar-grid"
        role="radiogroup"
        aria-label="Elige tu dibujo"
      >
        {AVATAR_OPTIONS.map((opt) => {
          const Icon = opt.icon;
          const tokens =
            NUCLEUS_COLOR_TOKENS[opt.color] ?? NUCLEUS_COLOR_TOKENS.sky;
          const elegido = opt.id === avatarId;
          return (
            <button
              key={opt.id}
              type="button"
              role="radio"
              aria-checked={elegido}
              aria-label={opt.label}
              className={`ninos-avatar-opcion${elegido ? ' ninos-avatar-opcion--elegido' : ''}`}
              style={{ background: tokens.bg }}
              onClick={() => {
                setAvatarId(opt.id);
                setSaved(false);
              }}
            >
              <Icon size={36} color={tokens.fg} aria-hidden="true" />
            </button>
          );
        })}
      </div>

      <LiveRegion message={live} />

      <Button
        variant="primary"
        className="ninos-boton-grande"
        onClick={guardar}
        disabled={!valido}
      >
        <Check size={24} aria-hidden="true" /> Guardar
      </Button>

      {saved && (
        <div className="ninos-card" style={{ textAlign: 'center' }}>
          <p className="ninos-parrafo" style={{ margin: 0 }}>
            ¡Perfecto! Ya tienes tu apodo y tu dibujo. 🎉
          </p>
          <Button variant="secondary" onClick={() => navigate('/ninos')}>
            Volver al inicio
          </Button>
        </div>
      )}
    </div>
  );
}
