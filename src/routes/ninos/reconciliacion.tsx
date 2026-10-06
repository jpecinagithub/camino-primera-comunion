/**
 * Reconciliacion — /ninos/reconciliacion.
 * ----------------------------------------------------------------------------
 * Explicación cuidada del perdón + experiencia didáctica paso a paso
 * ("¿Qué ocurrirá cuando vaya a confesarme?") con iconos y tono
 * tranquilizador.
 *
 * AVISO VISIBLE: esto es solo para ver cómo será; no es una confesión de
 * verdad. NUNCA se pide ni se guarda nada de conciencia: ningún input de
 * texto libre, ningún almacenamiento.
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Church,
  Ear,
  HandHeart,
  Heart,
  MessageCircleHeart,
  Sparkles,
  Sun,
  Users,
} from 'lucide-react';
import { SectionTitle } from '../../components/SectionTitle';
import { Button } from '../../components/Button';
import { ReadAloud } from '../../a11y/ReadAloud';
import { NUCLEUS_COLOR_TOKENS } from '../../data/nuclei';
import { trackLessonOpened } from '../../analytics';
import { getLessonBySlug } from '../../data/lessons/index';
import './ninos.css';

const EXPLICACION = [
  {
    icon: Heart,
    color: 'coral' as const,
    titulo: '¿Qué es reconciliarse?',
    texto:
      'Cuando nos peleamos con un amigo, pedimos perdón y volvemos a estar bien. Con Dios pasa lo mismo: reconciliarse es volver a sus brazos.',
  },
  {
    icon: Sun,
    color: 'gold' as const,
    titulo: 'Dios siempre perdona',
    texto:
      'Dios es misericordioso: eso significa que su corazón es grande y siempre está dispuesto a perdonarnos. ¡Siempre, siempre!',
  },
  {
    icon: MessageCircleHeart,
    color: 'sky' as const,
    titulo: 'El pecado es no amar',
    texto:
      'Pecar es cuando elegimos no amar: cuando somos egoístas, mentimos o hacemos daño. Duele, pero tiene remedio: el perdón.',
  },
  {
    icon: HandHeart,
    color: 'green' as const,
    titulo: 'Arrepentirse y proponerse',
    texto:
      'Arrepentirse es decirle a Jesús «lo siento de corazón» y proponerse hacerlo mejor la próxima vez. Él nos ayuda.',
  },
];

interface PasoSimu {
  icon: typeof Church;
  color: 'sky' | 'gold' | 'green' | 'coral';
  titulo: string;
  texto: string;
}

const PASOS_SIMULACION: PasoSimu[] = [
  {
    icon: Church,
    color: 'sky',
    titulo: 'Llego a la iglesia',
    texto:
      'Voy a la iglesia tranquilo. Puedo rezar un ratito antes y pensar: «Jesús, quiero estar en paz contigo».',
  },
  {
    icon: Users,
    color: 'gold',
    titulo: 'Saludo al sacerdote',
    texto:
      'Me acerco, le saludo con una sonrisa y me santiguo. El sacerdote está ahí para ayudarme, no para reñirme.',
  },
  {
    icon: Sparkles,
    color: 'coral',
    titulo: '«Ave María Purísima…»',
    texto:
      'Digo: «Ave María Purísima» y él responde: «Sin pecado concebida». Así empezamos, con María de nuestra parte.',
  },
  {
    icon: BookOpen,
    color: 'green',
    titulo: 'Cuento con sencillez',
    texto:
      'Le cuento a Jesús, a través del sacerdote, las veces que no amé. Con palabras sencillas, como se lo contaría a un amigo.',
  },
  {
    icon: Ear,
    color: 'sky',
    titulo: 'Escucho su consejo',
    texto:
      'El sacerdote me da un consejo cariñoso para hacerlo mejor. Lo escucho con atención: ¡es Jesús quien me habla!',
  },
  {
    icon: HandHeart,
    color: 'gold',
    titulo: 'Rezo la penitencia',
    texto:
      'Me propone una oración o un gesto bonito como penitencia. La rezo con alegría: es mi forma de decir «gracias».',
  },
  {
    icon: Sun,
    color: 'coral',
    titulo: 'Recibo la absolución',
    texto:
      'El sacerdote extiende la mano y dice las palabras del perdón. En ese momento, Jesús me abraza y mi corazón queda limpio.',
  },
  {
    icon: Heart,
    color: 'green',
    titulo: 'Doy gracias',
    texto:
      'Salgo contento y le doy gracias a Jesús. ¡Estoy en paz! Ahora a amar mucho a los demás.',
  },
];

export function Reconciliacion() {
  const navigate = useNavigate();
  const [paso, setPaso] = useState(0);
  const actual = PASOS_SIMULACION[paso];
  const Icon = actual.icon;
  const tokens =
    NUCLEUS_COLOR_TOKENS[actual.color] ?? NUCLEUS_COLOR_TOKENS.sky;
  const esUltimo = paso === PASOS_SIMULACION.length - 1;

  const irALeccion = () => {
    const lesson = getLessonBySlug('como-confesarse');
    if (lesson) {
      trackLessonOpened(lesson.id);
      navigate(`/ninos/leccion/${lesson.slug}`);
    }
  };

  return (
    <div className="ninos">
      <SectionTitle
        title="Mi Primera Reconciliación"
        subtitle="Antes de recibir a Jesús, preparamos el corazón con su perdón."
      />

      <div className="ninos-aviso" role="note">
        <p style={{ margin: 0, fontWeight: 700 }}>
          ⚠️ Esto es solo para que veas cómo será.
        </p>
        <p style={{ margin: 0 }}>
          No es una confesión de verdad: aquí no tienes que contar nada.
        </p>
      </div>

      <SectionTitle title="¿Qué es reconciliarse?" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {EXPLICACION.map((e) => {
          const EIcon = e.icon;
          const t = NUCLEUS_COLOR_TOKENS[e.color] ?? NUCLEUS_COLOR_TOKENS.sky;
          return (
            <article key={e.titulo} className="ninos-card ninos-momento">
              <span
                className="ninos-paso-simu__icono"
                style={{ background: t.bg }}
                aria-hidden="true"
              >
                <EIcon size={32} color={t.fg} />
              </span>
              <div>
                <h3 style={{ margin: 0 }}>{e.titulo}</h3>
                <p style={{ margin: 0 }}>{e.texto}</p>
              </div>
            </article>
          );
        })}
      </div>

      <SectionTitle
        title="¿Qué ocurrirá cuando vaya a confesarme?"
        subtitle={`Paso ${paso + 1} de ${PASOS_SIMULACION.length}`}
      />

      <div className="ninos-card" aria-label={`Paso ${paso + 1}: ${actual.titulo}`}>
        <span
          className="ninos-avatar-circulo"
          style={{ background: tokens.bg, borderColor: tokens.fg, margin: '0 auto' }}
          aria-hidden="true"
        >
          <Icon size={40} color={tokens.fg} />
        </span>
        <h2 style={{ margin: 0, textAlign: 'center' }}>{actual.titulo}</h2>
        <p className="ninos-parrafo">{actual.texto}</p>
        <ReadAloud text={`${actual.titulo}. ${actual.texto}`} />

        <div
          className="ninos-pasos"
          role="img"
          aria-label={`Paso ${paso + 1} de ${PASOS_SIMULACION.length}`}
        >
          {PASOS_SIMULACION.map((_, i) => (
            <span
              key={i}
              className={`ninos-paso__punto${i < paso ? ' ninos-paso__punto--hecho' : ''}${i === paso ? ' ninos-paso__punto--actual' : ''}`}
              aria-hidden="true"
            />
          ))}
        </div>

        <div className="ninos-navegacion">
          <Button
            variant="ghost"
            onClick={() => setPaso((p) => Math.max(0, p - 1))}
            disabled={paso === 0}
          >
            ← Atrás
          </Button>
          {!esUltimo ? (
            <Button variant="primary" onClick={() => setPaso((p) => p + 1)}>
              Siguiente →
            </Button>
          ) : (
            <Button variant="primary" onClick={() => setPaso(0)}>
              Verlo otra vez
            </Button>
          )}
        </div>
      </div>

      <div className="ninos-card">
        <p className="ninos-parrafo" style={{ margin: 0 }}>
          La lección <strong>«Cómo confesarse»</strong> te lo explica todo con
          más detalle, con su juego y su quiz.
        </p>
        <Button variant="secondary" onClick={irALeccion}>
          Ir a la lección «Cómo confesarse»
        </Button>
      </div>
    </div>
  );
}
