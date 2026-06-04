import { calculateProgress, type Item } from './utils';

describe('calculateProgress', () => {
  it('debería retornar 0% si la lista de compras está vacía', () => {
    expect(calculateProgress([])).toBe(0);
  });

  it('debería calcular correctamente el 50% de progreso', () => {
    const items: Item[] = [
      { id: '1', text: 'Pan', completed: true },
      { id: '2', text: 'Leche', completed: false },
    ];
    expect(calculateProgress(items)).toBe(50);
  });
});