/**
 * NucleusIcon — resuelve el nombre de icono guardado en `Nucleus.icon`
 * al componente de lucide-react correspondiente.
 */
import {
  Church,
  Heart,
  Star,
  Footprints,
  Cross,
  Flame,
  Droplets,
  HeartHandshake,
  Wheat,
  House,
  Sparkles,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const ICONS: Record<string, LucideIcon> = {
  Church,
  Heart,
  Star,
  Footprints,
  Cross,
  Flame,
  Droplets,
  HeartHandshake,
  Wheat,
  House,
};

export interface NucleusIconProps {
  /** Nombre del icono (p. ej. 'Church'). */
  name: string;
  size?: number;
}

export function NucleusIcon({ name, size = 24 }: NucleusIconProps) {
  const Icon: LucideIcon = ICONS[name] ?? Sparkles;
  return <Icon size={size} aria-hidden="true" />;
}
