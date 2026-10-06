/**
 * Bienvenida — onboarding de 3 pasos para niños (ruta pública /bienvenida).
 * ----------------------------------------------------------------------------
 * 1) Qué es la app · 2) No sustituye la catequesis · 3) El apodo y el avatar
 * vienen después. Al terminar guarda `camino:onboarded` y va a /selector.
 * Importar desde: `src/routes/bienvenida.tsx`
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Church, HandHeart, Smile } from 'lucide-react';
import { Button } from '../components/Button';
import './bienvenida.css';

const ONBOARDED_KEY = 'camino:onboarded';

const STEPS = [
  {
    icon: Church,
    color: 'var(--color-sky-dark)',
    titleKey: 'onboarding.step1.title',
    textKey: 'onboarding.step1.text',
  },
  {
    icon: HandHeart,
    color: 'var(--color-coral-dark)',
    titleKey: 'onboarding.step2.title',
    textKey: 'onboarding.step2.text',
  },
  {
    icon: Smile,
    color: 'var(--color-green-dark)',
    titleKey: 'onboarding.step3.title',
    textKey: 'onboarding.step3.text',
  },
] as const;

export function Bienvenida() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const last = step === STEPS.length - 1;
  const { icon: Icon, color, titleKey, textKey } = STEPS[step];

  const finish = (): void => {
    try {
      localStorage.setItem(ONBOARDED_KEY, '1');
    } catch {
      // sin almacenamiento la app sigue funcionando
    }
    navigate('/selector', { replace: true });
  };

  return (
    <div className="bienvenida">
      <div className="bienvenida__tarjeta" role="group" aria-label={`${step + 1} de ${STEPS.length}`}>
        <span className="bienvenida__icono" aria-hidden="true">
          <Icon size={64} color={color} />
        </span>
        <h1 className="bienvenida__titulo">{t(titleKey)}</h1>
        <p className="bienvenida__texto">{t(textKey)}</p>
        <div className="bienvenida__puntos" aria-hidden="true">
          {STEPS.map((_, i) => (
            <span
              key={i}
              className={`bienvenida__punto ${i === step ? 'bienvenida__punto--activo' : ''}`}
            />
          ))}
        </div>
        <div className="bienvenida__acciones">
          {step > 0 && (
            <Button variant="secondary" onClick={() => setStep(step - 1)}>
              {t('common.back')}
            </Button>
          )}
          {last ? (
            <Button variant="primary" onClick={finish}>
              {t('onboarding.start')}
            </Button>
          ) : (
            <Button variant="primary" onClick={() => setStep(step + 1)}>
              {t('common.next')}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
