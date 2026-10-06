/**
 * Zona de padres (/padres/*).
 * Pantallas reales que sustituyen a los placeholders de Fase 0,
 * manteniendo los nombres de export que App.tsx importa con lazy().
 */
import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Baby,
  BookOpenText,
  ChevronRight,
  Church,
  CircleHelp,
  Clock,
  HeartHandshake,
  Info,
  Lightbulb,
  MessagesSquare,
  MoonStar,
  ShieldCheck,
  Sparkles,
  Sun,
  Users,
} from 'lucide-react';
import { NUCLEI, NUCLEUS_COLOR_TOKENS, getNucleus } from '../data/nuclei';
import { LESSONS, getLessonsByNucleus } from '../data/lessons';
import { FAQ } from '../data/padres/faq';
import { GUIDE_SECTIONS } from '../data/padres/guia';
import { RESOURCES, RESOURCES_NOTE } from '../data/padres/recursos';
import { trackParentAreaOpened } from '../analytics';
import { Card } from '../components/Card';
import { EmptyState } from '../components/EmptyState';
import { ReadAloud } from '../a11y/ReadAloud';
import { Accordion } from './padres/Accordion';
import { NucleusIcon } from './padres/NucleusIcon';
import './padres.css';

/* ------------------------------------------------------------------ */
/* Utilidades                                                          */
/* ------------------------------------------------------------------ */

/** Enlace "volver" común a las pantallas interiores de padres. */
function BackLink({ to = '/padres', label = 'Zona de padres' }: { to?: string; label?: string }) {
  return (
    <Link to={to} className="padres-back">
      <ArrowLeft size={20} aria-hidden="true" />
      <span>{label}</span>
    </Link>
  );
}

/** Cabecera de pantalla interior: volver + título + subtítulo opcional. */
function ScreenHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="padres-screenhead">
      <BackLink />
      <h1 className="padres-title">{title}</h1>
      {subtitle && <p className="padres-subtitle">{subtitle}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* PadresHome — /padres                                                */
/* ------------------------------------------------------------------ */

/** Acceso principal de la home de padres. */
function HomeCard({
  to,
  icon,
  title,
  description,
}: {
  to: string;
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="home-card">
      <Link to={to} className="home-card__link">
        <span className="home-card__icon" aria-hidden="true">
          {icon}
        </span>
        <span className="home-card__text">
          <span className="home-card__title">{title}</span>
          <span className="home-card__desc">{description}</span>
        </span>
        <ChevronRight size={24} aria-hidden="true" className="home-card__arrow" />
      </Link>
    </Card>
  );
}

export function PadresHome() {
  useEffect(() => {
    trackParentAreaOpened('padres');
  }, []);

  return (
    <div className="padres">
      <header className="padres-hero">
        <span className="padres-hero__icon" aria-hidden="true">
          <Users size={40} />
        </span>
        <h1 className="padres-title">Zona de padres</h1>
        <p className="padres-subtitle">
          Acompaña a tu hijo en su camino a la Primera Comunión: descubre qué
          aprende, habladlo en casa y resuelve tus dudas con calma.
        </p>
      </header>

      <nav aria-label="Secciones de la zona de padres">
        <div className="padres-cards">
          <HomeCard
            to="#nucleos"
            icon={<BookOpenText size={32} />}
            title="Qué está aprendiendo mi hijo"
            description="Los 10 núcleos del itinerario y cómo acompañar cada lección en casa."
          />
          <HomeCard
            to="/padres/actividades"
            icon={<Users size={32} />}
            title="Hablemos en casa"
            description="Actividades familiares sencillas para vivir la fe entre semana."
          />
          <HomeCard
            to="/padres/guia"
            icon={<Church size={32} />}
            title="Guía de Primera Comunión"
            description="El sentido de la celebración y cómo acompañarle antes, durante y después."
          />
          <HomeCard
            to="/padres/faq"
            icon={<CircleHelp size={32} />}
            title="Preguntas frecuentes"
            description="Respuestas prácticas a las dudas más comunes de las familias."
          />
        </div>
      </nav>

      <section id="nucleos" className="padres-section" aria-label="Qué está aprendiendo mi hijo">
        <h2 className="padres-h2">
          <BookOpenText size={24} aria-hidden="true" />
          Qué está aprendiendo mi hijo
        </h2>
        <p className="padres-lead">
          Elige un núcleo para ver sus lecciones y descubrir cómo hablar de
          cada tema en casa: en 1 minuto, en 5 minutos y con preguntas para
          compartir en familia.
        </p>
        <ul className="nucleos-grid">
          {NUCLEI.map((n) => {
            const tokens = NUCLEUS_COLOR_TOKENS[n.color] ?? NUCLEUS_COLOR_TOKENS.sky;
            const count = getLessonsByNucleus(n.id).length;
            return (
              <li key={n.id}>
                <Link
                  to={`/padres/tema/${n.id}`}
                  className="nucleo-card"
                  style={{ backgroundColor: tokens.bg }}
                >
                  <span className="nucleo-card__icon" aria-hidden="true">
                    <NucleusIcon name={n.icon} size={30} />
                  </span>
                  <span className="nucleo-card__text">
                    <span className="nucleo-card__num">Núcleo {n.number}</span>
                    <span className="nucleo-card__title">{n.title}</span>
                    <span className="nucleo-card__count">
                      {count === 0
                        ? 'Próximamente'
                        : `${count} ${count === 1 ? 'lección' : 'lecciones'}`}
                    </span>
                  </span>
                  <ChevronRight size={22} aria-hidden="true" className="nucleo-card__arrow" />
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="padres-section" aria-label="Más recursos">
        <h2 className="padres-h2">
          <Sparkles size={24} aria-hidden="true" />
          Más recursos
        </h2>
        <ul className="padres-links">
          <li>
            <Link to="/padres/recursos" className="padres-link">
              <BookOpenText size={20} aria-hidden="true" />
              <span>Recursos recomendados</span>
            </Link>
          </li>
          <li>
            <Link to="/padres/privacidad" className="padres-link">
              <ShieldCheck size={20} aria-hidden="true" />
              <span>Privacidad: qué guarda la app</span>
            </Link>
          </li>
          <li>
            <Link to="/acerca" className="padres-link">
              <Info size={20} aria-hidden="true" />
              <span>Acerca del proyecto</span>
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Tema — /padres/tema/:nucleusId                                       */
/* ------------------------------------------------------------------ */

export function Tema() {
  const { nucleusId } = useParams<{ nucleusId: string }>();
  const nucleus = nucleusId ? getNucleus(nucleusId) : undefined;
  const lessons = useMemo(
    () => (nucleusId ? getLessonsByNucleus(nucleusId) : []),
    [nucleusId],
  );

  useEffect(() => {
    trackParentAreaOpened('tema');
  }, []);

  if (!nucleus) {
    return (
      <div className="padres">
        <ScreenHeader title="Tema no encontrado" />
        <EmptyState
          title="No hemos encontrado ese núcleo"
          description="Vuelve a la zona de padres y elige uno de los 10 núcleos del itinerario."
          action={
            <Link to="/padres" className="btn btn--primary">
              Volver a la zona de padres
            </Link>
          }
        />
      </div>
    );
  }

  const tokens = NUCLEUS_COLOR_TOKENS[nucleus.color] ?? NUCLEUS_COLOR_TOKENS.sky;

  return (
    <div className="padres">
      <ScreenHeader
        title={`Núcleo ${nucleus.number}: ${nucleus.title}`}
        subtitle={nucleus.description}
      />
      {lessons.length === 0 ? (
        <EmptyState
          title="Lecciones en preparación"
          description="Este núcleo aún no tiene lecciones disponibles. Vuelve pronto: el itinerario se completa poco a poco."
          icon={<NucleusIcon name={nucleus.icon} size={40} />}
        />
      ) : (
        <div className="padres-accs">
          {lessons.map((lesson) => {
            const pn = lesson.parentNotes;
            const speakText = [
              lesson.title,
              `En un minuto: ${pn.oneMinute}`,
              `En cinco minutos: ${pn.fiveMinutes.join(' ')}`,
              `Preguntas para hablar en casa: ${pn.familyQuestions.join(' ')}`,
              `Ejemplo cotidiano: ${pn.dailyExample}`,
              `Actividad familiar: ${pn.familyActivity}`,
              `Oración familiar: ${pn.familyPrayer.join(' ')}`,
            ].join(' ');
            return (
              <Accordion
                key={lesson.id}
                title={lesson.title}
                subtitle={lesson.subtitle}
                icon={
                  <span
                    className="tema__lesson-icon"
                    style={{ backgroundColor: tokens.bg }}
                    aria-hidden="true"
                  >
                    <NucleusIcon name={nucleus.icon} size={22} />
                  </span>
                }
              >
                <div className="tema-lesson">
                  <ReadAloud text={speakText} label="Escuchar esta lección" />

                  <section aria-label="En 1 minuto">
                    <h3 className="tema-h3">
                      <Clock size={18} aria-hidden="true" />
                      En 1 minuto
                    </h3>
                    <p>{pn.oneMinute}</p>
                  </section>

                  <section aria-label="En 5 minutos">
                    <h3 className="tema-h3">
                      <Clock size={18} aria-hidden="true" />
                      En 5 minutos
                    </h3>
                    <ul className="tema-list">
                      {pn.fiveMinutes.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </section>

                  <section aria-label="Hablemos en casa" className="tema-hablemos">
                    <h3 className="tema-h3">
                      <MessagesSquare size={18} aria-hidden="true" />
                      Hablemos en casa
                    </h3>

                    <h4 className="tema-h4">Preguntas para compartir</h4>
                    <ol className="tema-list tema-list--numbered">
                      {pn.familyQuestions.map((q, i) => (
                        <li key={i}>{q}</li>
                      ))}
                    </ol>

                    <h4 className="tema-h4">
                      <Sun size={16} aria-hidden="true" /> Un ejemplo de cada día
                    </h4>
                    <p>{pn.dailyExample}</p>

                    <h4 className="tema-h4">
                      <Users size={16} aria-hidden="true" /> Actividad en familia
                    </h4>
                    <p>{pn.familyActivity}</p>

                    <h4 className="tema-h4">
                      <MoonStar size={16} aria-hidden="true" /> Oración en familia
                    </h4>
                    <blockquote className="tema-prayer">
                      {pn.familyPrayer.map((line, i) => (
                        <span key={i} className="tema-prayer__line">
                          {line}
                        </span>
                      ))}
                    </blockquote>
                  </section>
                </div>
              </Accordion>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Actividades — /padres/actividades                                    */
/* ------------------------------------------------------------------ */

export function Actividades() {
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    trackParentAreaOpened('actividades');
  }, []);

  const items = useMemo(
    () =>
      LESSONS.filter((l) => filter === 'all' || l.nucleusId === filter).map(
        (l) => ({
          lesson: l,
          nucleus: getNucleus(l.nucleusId),
        }),
      ),
    [filter],
  );

  return (
    <div className="padres">
      <ScreenHeader
        title="Hablemos en casa"
        subtitle="Actividades familiares de las 15 lecciones: una idea sencilla por tema para vivir la fe entre semana."
      />

      <div className="padres-filter">
        <label htmlFor="filtro-nucleo" className="padres-filter__label">
          Filtrar por núcleo
        </label>
        <select
          id="filtro-nucleo"
          className="padres-filter__select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">Todos los núcleos</option>
          {NUCLEI.map((n) => (
            <option key={n.id} value={n.id}>
              Núcleo {n.number} · {n.title}
            </option>
          ))}
        </select>
      </div>

      {items.length === 0 ? (
        <EmptyState
          title="Sin actividades para este filtro"
          description="Prueba con otro núcleo o muestra todos."
          action={
            <button
              type="button"
              className="btn btn--secondary"
              onClick={() => setFilter('all')}
            >
              Mostrar todas
            </button>
          }
        />
      ) : (
        <ul className="act-list">
          {items.map(({ lesson, nucleus }) => (
            <li key={lesson.id}>
              <Card className="act-card">
                <h2 className="act-card__title">
                  <Lightbulb size={20} aria-hidden="true" />
                  {lesson.family.activityTitle}
                </h2>
                <p className="act-card__origin">
                  <Baby size={16} aria-hidden="true" />
                  Lección «{lesson.title}»
                  {nucleus && ` · Núcleo ${nucleus.number}: ${nucleus.title}`}
                </p>
                <p className="act-card__desc">{lesson.family.activity}</p>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Guia — /padres/guia                                                  */
/* ------------------------------------------------------------------ */

export function Guia() {
  useEffect(() => {
    trackParentAreaOpened('guia');
  }, []);

  return (
    <div className="padres">
      <ScreenHeader
        title="Guía de Primera Comunión"
        subtitle="Lo esencial para acompañar a tu hijo antes, durante y después de la celebración."
      />
      <div className="padres-accs">
        {GUIDE_SECTIONS.map((section, idx) => {
          const speakText = [
            section.title,
            ...section.paragraphs,
            ...section.bullets,
          ].join(' ');
          return (
            <Accordion
              key={section.id}
              title={section.title}
              icon={<NucleusIcon name={section.icon} size={22} />}
              defaultOpen={idx === 0}
            >
              <div className="guia-section">
                <ReadAloud text={speakText} label="Escuchar esta sección" />
                {section.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                {section.bullets.length > 0 && (
                  <ul className="tema-list">
                    {section.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Faq — /padres/faq                                                    */
/* ------------------------------------------------------------------ */

export function Faq() {
  useEffect(() => {
    trackParentAreaOpened('faq');
  }, []);

  return (
    <div className="padres">
      <ScreenHeader
        title="Preguntas frecuentes"
        subtitle="Respuestas cercanas y prácticas a las dudas que más nos hacen las familias."
      />
      <div className="padres-accs">
        {FAQ.map((item) => (
          <Accordion key={item.id} title={item.question}>
            <div className="faq-answer">
              <ReadAloud
                text={[item.question, ...item.answer].join(' ')}
                label="Escuchar la respuesta"
              />
              {item.answer.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Accordion>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Recursos — /padres/recursos                                          */
/* ------------------------------------------------------------------ */

export function Recursos() {
  useEffect(() => {
    trackParentAreaOpened('recursos');
  }, []);

  return (
    <div className="padres">
      <ScreenHeader
        title="Recursos recomendados"
        subtitle="Dónde seguir profundizando cuando surjan preguntas en casa."
      />
      <p className="padres-note">{RESOURCES_NOTE}</p>
      <ul className="rec-list">
        {RESOURCES.map((r) => (
          <li key={r.id}>
            <Card className="rec-card">
              <h2 className="rec-card__name">{r.name}</h2>
              <p className="rec-card__kind">{r.kind}</p>
              <p className="rec-card__desc">{r.description}</p>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Privacidad — /padres/privacidad                                      */
/* ------------------------------------------------------------------ */

export function Privacidad() {
  useEffect(() => {
    trackParentAreaOpened('privacidad');
  }, []);

  return (
    <div className="padres">
      <ScreenHeader
        title="Privacidad"
        subtitle="Qué guarda esta app, qué no guarda y por qué puedes estar tranquilo."
      />

      <Card className="priv-card">
        <h2 className="priv-card__title">
          <ShieldCheck size={22} aria-hidden="true" />
          Lo que sí se guarda (solo en este dispositivo)
        </h2>
        <ul className="tema-list">
          <li>
            <strong>Apodo inventado:</strong> el nombre de fantasía que el niño
            elige para su perfil. No tiene por qué parecerse a su nombre real.
          </li>
          <li>
            <strong>Avatar:</strong> el dibujo o icono que elige para
            representarse. Nunca una foto.
          </li>
          <li>
            <strong>Progreso:</strong> qué lecciones ha visto, qué juegos ha
            jugado y los resultados de los quizzes, para retomar donde lo dejó.
          </li>
        </ul>
        <p className="priv-card__note">
          Todo esto vive únicamente en este dispositivo, en su almacenamiento
          local. No se envía a ningún servidor.
        </p>
      </Card>

      <Card className="priv-card">
        <h2 className="priv-card__title">
          <ShieldCheck size={22} aria-hidden="true" />
          Lo que NUNCA se pide ni se guarda
        </h2>
        <ul className="tema-list">
          <li>Nombre real, apellidos o fecha de nacimiento.</li>
          <li>Dirección, ubicación, colegio o parroquia.</li>
          <li>Teléfono, correo electrónico o cualquier dato de contacto.</li>
          <li>Fotografías del niño o de la familia.</li>
          <li>
            Nada relacionado con la confesión: ni pecados, ni examen de
            conciencia, ni contenido sacramental personal. La app no sustituye
            ni registra la vida sacramental.
          </li>
        </ul>
      </Card>

      <Card className="priv-card">
        <h2 className="priv-card__title">
          <ShieldCheck size={22} aria-hidden="true" />
          Sin cuentas, sin publicidad, sin chat
        </h2>
        <ul className="tema-list">
          <li>No hay registro ni inicio de sesión: la app se usa directamente.</li>
          <li>No hay publicidad de ningún tipo.</li>
          <li>
            No hay chat ni mensajería: el niño no puede contactar con nadie ni
            nadie puede contactar con él desde la app.
          </li>
        </ul>
      </Card>

      <Card className="priv-card">
        <h2 className="priv-card__title">
          <ShieldCheck size={22} aria-hidden="true" />
          Estadísticas de uso anónimas
        </h2>
        <p>
          La app registra eventos genéricos de uso (por ejemplo, que se ha
          abierto una lección o un área de padres) para saber qué funciona y
          qué no. Estos eventos no incluyen ningún identificador personal: ni
          el apodo, ni el avatar, ni nada que permita saber quién usa la app.
        </p>
      </Card>

      <Card className="priv-card">
        <h2 className="priv-card__title">
          <ShieldCheck size={22} aria-hidden="true" />
          ¿Y si algún día hubiera sincronización?
        </h2>
        <p>
          Hoy no existe ninguna sincronización en la nube. Si en el futuro se
          añadiera (por ejemplo, para continuar en otro dispositivo), solo
          podría activarla un adulto y siempre con su consentimiento explícito.
          Sin tu permiso, nada sale de este dispositivo.
        </p>
      </Card>

      <p className="padres-note">
        <MessagesSquare size={16} aria-hidden="true" /> Si tienes cualquier duda sobre la
        privacidad, habla con nosotros a través de tu parroquia o catequista:
        ellos conocen el proyecto y te ayudarán.
      </p>
      <p className="padres-note">
        <HeartHandshake size={16} aria-hidden="true" /> Gracias por confiar en
        nosotros para acompañar a tu hijo en este camino tan bonito.
      </p>
      <p className="padres-note">
        <Sparkles size={16} aria-hidden="true" /> Hecho con cariño para las familias
        que preparan la Primera Comunión.
      </p>
    </div>
  );
}
