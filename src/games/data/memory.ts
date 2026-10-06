/**
 * Datos de ejemplo — «Parejas de la Misa» (memory).
 * Cada pareja lleva icono Lucide + palabra (no se depende solo del color).
 */
import type { MemoryConfig } from '../engines/memory';

export const MEMORY_DATA: Required<MemoryConfig> = {
  pairs: [
    { id: 'cruz', label: 'La cruz', icon: 'Cross' },
    { id: 'biblia', label: 'La Biblia', icon: 'BookOpen' },
    { id: 'agua', label: 'El agua', icon: 'Droplets' },
    { id: 'pan', label: 'El pan', icon: 'Wheat' },
    { id: 'caliz', label: 'El cáliz', icon: 'Wine' },
    { id: 'luz', label: 'La luz', icon: 'Lightbulb' },
    { id: 'paloma', label: 'La paloma', icon: 'Bird' },
    { id: 'campana', label: 'La campana', icon: 'Bell' },
  ],
};
