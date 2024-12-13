Cypress.Commands.add('login', (email, password) => {
    cy.visit('/login');
    cy.wait(2000);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
  });

  // cy.login('sool@mail.com','contraseña');
  
  Cypress.Commands.add('verifyErrorMessage', (message) => {
    cy.get('.swal2-popup').should('be.visible');
    cy.get('.swal2-popup').should('contain', message);
  });
  
    // cy.verifyErrorMessage('Credenciales incorrectas');
   