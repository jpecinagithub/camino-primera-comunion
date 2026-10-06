/**
 * ModeGate — protege las secciones /ninos y /padres.
 * Si no hay modo elegido (o no coincide), redirige a /selector.
 * Importar desde: `src/components/ModeGate.tsx`
 */
import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { getMode, type Mode } from '../mode';

export interface ModeGateProps {
  mode: Mode;
  children: ReactNode;
}

export function ModeGate({ mode, children }: ModeGateProps) {
  if (getMode() !== mode) {
    return <Navigate to="/selector" replace />;
  }
  return <>{children}</>;
}
