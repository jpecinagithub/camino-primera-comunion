/**
 * ErrorBoundary — captura errores de render y muestra una pantalla amable
 * en lugar de una página en blanco. Envuelve al router en App.tsx.
 * Importar desde: `src/components/ErrorBoundary.tsx`
 */
import { Component, type ErrorInfo, type ReactNode } from 'react';
import { TriangleAlert } from 'lucide-react';
import './ErrorBoundary.css';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // Solo consola local: ningún dato sale del dispositivo.
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  private handleReload = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="error-boundary" role="alert">
          <span className="error-boundary__icon" aria-hidden="true">
            <TriangleAlert size={48} />
          </span>
          <h1 className="error-boundary__title">¡Vaya! Algo no ha salido bien</h1>
          <p className="error-boundary__description">
            No te preocupes: tu progreso está a salvo en este dispositivo.
            Prueba a recargar la página.
          </p>
          <button
            type="button"
            className="btn btn--primary"
            onClick={this.handleReload}
          >
            Recargar
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
