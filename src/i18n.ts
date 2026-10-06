/**
 * i18n — Camino a la Primera Comunión
 * ----------------------------------------------------------------------------
 * Solo español ('es'). La infraestructura react-i18next queda lista por si
 * algún día se decide ampliar idiomas, pero hoy el idioma es fijo.
 * Importar desde: `src/i18n.ts` (importación lateral en main.tsx).
 */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  es: {
    translation: {
      'app.title': 'Camino a la Primera Comunión',
      'app.tagline': 'Un camino para preparar el corazón',

      'common.continue': 'Continuar',
      'common.back': 'Volver',
      'common.play': 'Jugar',
      'common.pray': 'Orar',
      'common.learn': 'Aprender',
      'common.loading': 'Cargando…',
      'common.close': 'Cerrar',
      'common.save': 'Guardar',
      'common.start': 'Empezar',
      'common.next': 'Siguiente',

      'mode.kids': 'Soy niño o niña',
      'mode.parents': 'Soy padre, madre o catequista',
      'mode.choose': '¿Quién va a usar la app?',

      'offline.banner': 'Estás sin conexión. Puedes seguir aprendiendo.',
      'offline.title': 'Sin conexión',
      'offline.description':
        'No hay internet ahora mismo, pero todo lo que ya visitaste sigue disponible. ¡Puedes seguir aprendiendo!',

      'notfound.title': 'Esta página se ha perdido por el camino',
      'notfound.description': 'La dirección que buscas no existe. Volvamos al camino.',

      'selector.firstTime': '¿Primera vez por aquí? Mira la bienvenida',

      'offline.cta': 'Seguir aprendiendo',

      'onboarding.step1.title': '¡Hola! Este es tu camino',
      'onboarding.step1.text':
        'Te acompaño mientras preparas tu Primera Comunión: lecciones, juegos y oraciones.',
      'onboarding.step2.title': 'Un juego que suma',
      'onboarding.step2.text':
        'No sustituye a la catequesis: es una ayuda más, junto a tu catequista y tu familia.',
      'onboarding.step3.title': 'Tu apodo te espera',
      'onboarding.step3.text':
        'Después podrás elegir un apodo divertido y tu avatar. ¡Empezamos!',
      'onboarding.start': '¡Empezar!',

      'ano.title': 'El año litúrgico',
      'ano.subtitle':
        'La Iglesia celebra a Jesús durante todo el año. Toca cada tiempo de la rueda y descúbrelo.',

      'placeholder.building': 'En construcción',
      'placeholder.hint':
        'Esta pantalla la está preparando su equipo. El router y el diseño ya están listos.',

      'game.underConstruction': 'Juego en construcción',
      'game.underConstructionHint':
        'El equipo de juegos está preparando esta actividad. ¡Vuelve pronto!',
      'game.finished': '¡Bien hecho! Has conseguido {{score}} de {{total}}.',

      'error.title': '¡Vaya! Algo no ha salido bien',
      'error.description': 'Prueba de nuevo. Si sigue fallando, recarga la página.',
      'error.retry': 'Reintentar',

      'profile.nicknameLabel': 'Tu apodo',
      'profile.nicknameHint': 'Inventa un apodo divertido. No uses tu nombre real.',

      'nav.backTo': 'Volver a {{label}}',
      'nav.changeMode': 'Cambiar de modo',
      'nav.switchToParents': 'Soy padre o madre',
      'nav.switchToKids': 'Soy niño o niña',
      'nav.breadcrumbs': 'Migas de pan',
      'nav.exitLesson': 'Salir de la lección',
      'nav.finish.continuePath': 'Continuar mi camino',
      'nav.finish.viewNucleus': 'Ver mi núcleo',
      'nav.finish.play': 'Jugar',
      'nav.game.repeat': 'Repetir',
      'nav.game.otherGames': 'Jugar a otro juego',
      'nav.game.backToPath': 'Volver al camino',
      'nav.notfound.ninos': 'Zona de niños',
      'nav.notfound.padres': 'Zona de padres',
      'nav.notfound.mode': 'Cambiar de modo',

      'progress.resume.title': 'Seguimos donde lo dejaste',
      'progress.resume.restart': 'Empezar desde el principio',
      'progress.resume.step': 'Paso {{x}} de {{y}}',
      'progress.continueWith': 'Continuar: {{title}} · Paso {{x}} de {{y}}',
      'progress.inProgress': 'En curso · Continuar',
      'progress.done': '¡Hecha!',
      'progress.pending': 'Pendiente',
      'progress.played': '¡Jugado!',
      'progress.counters.lessons': 'lecciones hechas',
      'progress.counters.games': 'juegos jugados',
      'progress.counters.audios': 'audios escuchados',

      'audio.listened': 'Escuchado',
      'audio.listenedFeminine': 'Escuchada',
    },
  },
} as const;

void i18n.use(initReactI18next).init({
  resources,
  lng: 'es',
  fallbackLng: 'es',
  supportedLngs: ['es'],
  interpolation: { escapeValue: false },
});

export default i18n;
