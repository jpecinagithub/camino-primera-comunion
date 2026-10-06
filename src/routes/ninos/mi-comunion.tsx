/**
 * MiComunion — /ninos/mi-comunion.
 * ----------------------------------------------------------------------------
 * Preparación especial en 3 bloques: Mi Confesión (→ reconciliación),
 * La Misa (→ misa paso a paso) y Recibir a Jesús (→ lecciones
 * preparacion-primera-comunion y eucaristia).
 *
 * Checklist amable NO punitiva: el niño marca solo lo que ya ha repasado;
 * se guarda en localStorage (no es progreso oficial, es un recordatorio
 * cariñoso).
 */
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, Church, HandHeart, Heart } from 'lucide-react';
import { SectionTitle } from '../../components/SectionTitle';
import { Button } from '../../components/Button';
import { trackLessonOpened } from '../../analytics';
import { getLessonBySlug } from '../../data/lessons/index';
import './ninos.css';

const STORAGE_KEY = 'cpc:mi-comunion-checklist';

const CHECK_ITEMS = [
  'He ido a catequesis con alegría',
  'Sé rezar el Padrenuestro',
  'Sé rezar el Avemaría',
  'Sé cómo es la Misa paso a paso',
  'Sé qué pasará cuando me confiese',
  'He hablado con mi familia de la Primera Comunión',
];

function loadChecklist(): boolean[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return CHECK_ITEMS.map(() => false);
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return CHECK_ITEMS.map((_, i) => parsed[i] === true);
    }
  } catch {
    // Si algo falla, empezamos de cero.
  }
  return CHECK_ITEMS.map(() => false);
}

export function MiComunion() {
  const navigate = useNavigate();
  const [checks, setChecks] = useState<boolean[]>(() => loadChecklist());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checks));
    } catch {
      // Sin almacenamiento, la checklist sigue funcionando en memoria.
    }
  }, [checks]);

  const toggle = (i: number) =>
    setChecks((c) => c.map((v, idx) => (idx === i ? !v : v)));

  const irALeccion = (slug: string) => {
    const lesson = getLessonBySlug(slug);
    if (lesson) {
      trackLessonOpened(lesson.id);
      navigate(`/ninos/leccion/${lesson.slug}`);
    }
  };

  const marcados = checks.filter(Boolean).length;

  return (
    <div className="ninos">
      <section className="ninos-hero" aria-label="Mi Primera Comunión">
        <span
          className="ninos-avatar-circulo"
          style={{ background: 'var(--color-gold)', borderColor: 'var(--color-gold-dark)' }}
          aria-hidden="true"
        >
          <Heart size={44} color="var(--color-gold-dark)" />
        </span>
        <h1>Mi Primera Comunión</h1>
        <p>El gran día se acerca: ¡prepárate por dentro!</p>
      </section>

      <SectionTitle title="Tres pasos para prepararte" />

      <Link to="/ninos/reconciliacion" className="ninos-sendero__tarjeta">
        <span
          className="ninos-sendero__icono"
          style={{ background: 'var(--color-green)' }}
          aria-hidden="true"
        >
          <HandHeart size={28} color="var(--color-green-dark)" />
        </span>
        <span style={{ flex: 1 }}>
          <h3>1. Mi Confesión</h3>
          <p>Descubre cómo será, sin miedo y con alegría.</p>
        </span>
      </Link>

      <Link to="/ninos/misa" className="ninos-sendero__tarjeta">
        <span
          className="ninos-sendero__icono"
          style={{ background: 'var(--color-gold)' }}
          aria-hidden="true"
        >
          <Church size={28} color="var(--color-gold-dark)" />
        </span>
        <span style={{ flex: 1 }}>
          <h3>2. La Misa</h3>
          <p>Recorre la Misa paso a paso y ensaya su orden.</p>
        </span>
      </Link>

      <div className="ninos-card">
        <div className="ninos-fila">
          <span
            className="ninos-sendero__icono"
            style={{ background: 'var(--color-coral)' }}
            aria-hidden="true"
          >
            <Heart size={28} color="var(--color-coral-dark)" />
          </span>
          <h3 style={{ margin: 0 }}>3. Recibir a Jesús</h3>
        </div>
        <p style={{ margin: 0 }}>
          Dos lecciones para tu corazón antes del gran día.
        </p>
        <Button variant="secondary" onClick={() => irALeccion('preparacion-primera-comunion')}>
          Lección: Preparación para recibir la Primera Comunión
        </Button>
        <Button variant="secondary" onClick={() => irALeccion('eucaristia')}>
          Lección: La Eucaristía
        </Button>
      </div>

      <SectionTitle
        title="Mi lista de preparación"
        subtitle="Marca solo lo que ya has repasado. Sin prisas: cada cosa a su tiempo."
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        {CHECK_ITEMS.map((item, i) => (
          <button
            key={item}
            type="button"
            className={`ninos-check${checks[i] ? ' ninos-check--marcado' : ''}`}
            onClick={() => toggle(i)}
            aria-pressed={checks[i]}
            aria-label={`${checks[i] ? 'Ya repasado' : 'Marcar como repasado'}: ${item}`}
          >
            <span
              className="ninos-numero"
              style={{
                width: 36,
                height: 36,
                background: checks[i] ? 'var(--color-green-dark)' : '#fff',
                border: '2px solid var(--color-border)',
              }}
              aria-hidden="true"
            >
              {checks[i] && <Check size={20} color="#fff" />}
            </span>
            {item}
          </button>
        ))}
      </div>

      <div className="ninos-card" style={{ textAlign: 'center' }}>
        <p className="ninos-parrafo" style={{ margin: 0 }}>
          {marcados === CHECK_ITEMS.length
            ? '¡Tu corazón está listo! Qué alegría tan grande. 🎉'
            : `Llevas ${marcados} de ${CHECK_ITEMS.length}. ¡Vas por buen camino!`}
        </p>
      </div>

      <div className="ninos-aviso">
        <p style={{ margin: 0 }}>
          Esta lista es solo un recordatorio cariñoso. Lo importante no es
          tenerlo todo marcado, sino preparar el corazón con alegría.
        </p>
      </div>
    </div>
  );
}
