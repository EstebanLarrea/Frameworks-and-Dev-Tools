describe('Flujo de Compras End-to-End', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173'); // El puerto de Vite
    cy.clearLocalStorage();
  });

  it('agrega, marca comprado y verifica persistencia', () => {
    // 1. Escribir y agregar
    cy.get('[data-testid="input-producto"]').type('Café');
    cy.get('[data-testid="btn-agregar"]').click();
    cy.get('[data-testid="input-producto"]').type('Manzanas');
    cy.get('[data-testid="btn-agregar"]').click();

    // 2. Validar contadores iniciales
    cy.get('[data-testid="count-total"]').should('have.text', '2');
    cy.get('[data-testid="count-pendientes"]').should('have.text', '2');

    // 3. Marcar el café como comprado
    cy.get('[data-testid="checkbox-Café"]').check();

    // 4. Validar que la matemática funcionó en el DOM
    cy.get('[data-testid="count-comprados"]').should('have.text', '1');
    cy.get('[data-testid="count-pendientes"]').should('have.text', '1');

    // 5. Prueba de Fuego del useEffect (Recargar página)
    cy.reload();
    cy.get('[data-testid="count-total"]').should('have.text', '2');
    cy.get('[data-testid="checkbox-Café"]').should('be.checked');
  });
});