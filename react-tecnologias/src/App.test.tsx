import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('Smart Shopping List - Interfaz', () => {
  beforeEach(() => {
    localStorage.clear(); // Limpiamos la BD local antes de cada prueba
  });

  it('debería agregar un producto, mostrarlo en pantalla y regresar el focus al input', () => {
    render(<App />);

    const input = screen.getByTestId('input-producto');
    const btnAgregar = screen.getByTestId('btn-agregar');

    // El usuario fantasma escribe y da clic
    fireEvent.change(input, { target: { value: 'Huevos' } });
    fireEvent.click(btnAgregar);

    // 1. Verificamos que RTL encuentra el texto en pantalla (Prueba de useState)
    expect(screen.getByText('Huevos')).toBeInTheDocument();

    // 2. Verificamos que el input se limpió y tiene el cursor activo (Prueba de useRef)
    expect(input).toHaveValue('');
    expect(input).toHaveFocus();
  });
});