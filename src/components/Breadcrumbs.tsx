/**
 * Breadcrumbs — migas de pan para pantallas profundas (profundidad ≥ 3).
 * ----------------------------------------------------------------------------
 * Se renderiza desde AppShell (debajo de la cabecera) con los items de
 * `getBreadcrumbs(pathname)` (src/navigation.ts). La página actual lleva
 * `aria-current="page"` y no es un enlace.
 * Importar desde: `src/components/Breadcrumbs.tsx`
 */
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { Crumb } from '../navigation';
import './Breadcrumbs.css';

export interface BreadcrumbsProps {
  items: Crumb[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const { t } = useTranslation();
  if (items.length < 2) return null;

  return (
    <nav aria-label={t('nav.breadcrumbs')} className="breadcrumbs">
      <ol className="breadcrumbs__list">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="breadcrumbs__item">
              {isLast || !item.to ? (
                <span aria-current="page" className="breadcrumbs__current">
                  {item.label}
                </span>
              ) : (
                <Fragment>
                  <Link to={item.to} className="breadcrumbs__link">
                    {item.label}
                  </Link>
                  <span aria-hidden="true" className="breadcrumbs__sep">
                    ›
                  </span>
                </Fragment>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
