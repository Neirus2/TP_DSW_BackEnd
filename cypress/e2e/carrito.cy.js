describe('Prueba de carrito', () => {
  const userEmail = Cypress.env('TEST_USER'); 
  const userPassword = Cypress.env('TEST_PASS'); 

  beforeEach(() => {
    cy.intercept('POST', `${Cypress.env('apiUrl')}/login`).as('loginRequest');
    cy.getUsers();
    cy.get('@users').then(({ userEmail, userPassword }) => {
      cy.login(userEmail, userPassword);
      cy.url().should('include', '/'); 
    });
  });

  it('Debería agregar productos al carrito y realizar pedido', () => {
        cy.contains('button', 'Comprar').click();
        cy.location('pathname').should('include', '/product');
        cy.contains('button', 'Agregar al carrito').click();
        cy.get('button.cart-btn').find('i.fa-cart-shopping').click();
        cy.location('pathname').should('include', '/cart');
        cy.contains('button', 'Confirmar Pedido').click();
        cy.get('.swal2-popup.swal2-show').should('be.visible').contains('¡Estado actualizado!');
  });
  it('Debería poder eliminar productos del carrito', () => {
    cy.contains('button', 'Comprar').click();
    cy.location('pathname').should('include', '/product');
    cy.contains('button', 'Agregar al carrito').click();
    cy.get('button.cart-btn').find('i.fa-cart-shopping').click();
    cy.location('pathname').should('include', '/cart');
    cy.get('button.btn.btn-danger').click();
});


});
